
import { createHmac } from "node:crypto";
import { headers } from "next/headers";

/**
 * Thumbsupp ops base (wave 2): server-to-server calls to thumbsupp-ingest.
 *  - /v1/contact classifies a contact submission (bug|feature|question|sales|spam); delivery is skipped
 *    only when the ingest says `deliver: false` (high-confidence spam).
 *  - /v1/gate rate-limits sensitive surfaces on hashed keys.
 * Every call has an 800 ms timeout and FAILS OPEN (no secret, timeout, error → allow / deliver).
 * Raw IPs and emails never leave this server: k = HMAC(secret, ip + day), ek = HMAC(secret, lower(email)),
 * both cut to 16 hex. Nothing here is stored locally.
 */
const SITE = "flv";
const INGEST_URL = (process.env.THUMBSUPP_INGEST_URL || "https://ingest.thumbsupp.com").replace(/\/+$/, "");
const TIMEOUT_MS = 800;

const secret = () => (process.env.THUMBSUPP_INGEST_SECRET || "").trim();
const h16 = (v: string) => createHmac("sha256", secret()).update(v).digest("hex").slice(0, 16);

export type GateSurface = "contact" | "login" | "register" | "reset" | "scrape" | "checkout";
export type GateResult = { allow: boolean; retryAfter: number };
const ALLOW: GateResult = { allow: true, retryAfter: 0 };

async function clientIp(): Promise<string> {
  try {
    const h = await headers();
    return (
      h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      h.get("x-real-ip")?.trim() ||
      ""
    );
  } catch {
    return "";
  }
}

/** Hashed per-client key for today (undefined when there is no secret or no client IP). */
export async function clientKey(ip?: string): Promise<string | undefined> {
  if (!secret()) return undefined;
  const addr = ip ?? (await clientIp());
  return addr ? h16(`${addr}${new Date().toISOString().slice(0, 10)}`) : undefined;
}

/** Hashed per-account key (lowercased email or `uid:<id>`). */
export function accountKey(v: string | null | undefined): string | undefined {
  const s = String(v ?? "").trim().toLowerCase();
  return s && secret() ? h16(s) : undefined;
}

async function post<T>(path: string, body: Record<string, unknown>): Promise<T | null> {
  const s = secret();
  if (!s) return null;
  try {
    const res = await fetch(`${INGEST_URL}${path}`, {
      method: "POST",
      headers: { authorization: `Bearer ${s}`, "content-type": "application/json" },
      body: JSON.stringify({ site: SITE, ...body }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

/** Rate-limit gate. `k` defaults to the hashed client IP; `ek` is an account key. Fails open. */
export async function gate(surface: GateSurface, opts: { k?: string; ek?: string } = {}): Promise<GateResult> {
  const k = opts.k ?? (await clientKey());
  if (!k) return ALLOW;
  const r = await post<GateResult>("/v1/gate", { surface, k, ...(opts.ek ? { ek: opts.ek } : {}) });
  return r && r.allow === false ? { allow: false, retryAfter: Math.max(1, Number(r.retryAfter) || 60) } : ALLOW;
}

/** Report a local block (honeypot, validation) so spikes raise an alert. Fire-and-forget, fails silently. */
export async function reportBlock(surface: GateSurface, reason: string): Promise<void> {
  await post("/v1/block", { surface, reason });
}

export type ContactVerdict = { class: string | null; deliver: boolean; allow: boolean; retryAfter: number };

/** Hidden form-guard fields (see FormGuardFields): honeypot `website` + client mount time `_ft`. */
export function readFormGuard(fd: FormData | Record<string, unknown>): { honeypotHit: boolean; elapsedMs?: number } {
  const get = (k: string) => (fd instanceof FormData ? fd.get(k) : (fd as Record<string, unknown>)[k]);
  const hp = get("website");
  const t = Number(get("_ft"));
  const elapsed = Number.isFinite(t) && t > 0 ? Date.now() - t : NaN;
  return {
    honeypotHit: typeof hp === "string" && hp.trim().length > 0,
    // negative / absurd values (client clock skew) are dropped rather than guessed
    elapsedMs: Number.isFinite(elapsed) && elapsed >= 0 && elapsed < 86_400_000 ? elapsed : undefined,
  };
}

/**
 * Classify a contact submission. Fails open: {deliver: true, allow: true} on timeout/error.
 * Only text fields are sent (never stored by the ingest); the IP is sent as its hashed key.
 */
export async function classifyContact(
  form: string,
  fields: { name?: string; email?: string; phone?: string; subject?: string; message?: string },
  guard: { honeypotHit: boolean; elapsedMs?: number }
): Promise<ContactVerdict> {
  const k = await clientKey();
  const r = await post<{ class?: string; deliver?: boolean; allow?: boolean; retryAfter?: number }>("/v1/contact", {
    form,
    ...fields,
    honeypotHit: guard.honeypotHit,
    ...(guard.elapsedMs !== undefined ? { elapsedMs: guard.elapsedMs } : {}),
    ...(k ? { k } : {}),
  });
  if (!r) return { class: null, deliver: true, allow: true, retryAfter: 0 };
  return {
    class: typeof r.class === "string" ? r.class : null,
    deliver: r.deliver !== false,
    allow: r.allow !== false,
    retryAfter: Number(r.retryAfter) || 0,
  };
}

const TOO_MANY: Record<string, (m: number) => string> = {
  nl: (m) => `Te veel pogingen. Probeer het over ${m} min opnieuw.`,
  en: (m) => `Too many attempts. Please try again in ${m} min.`,
  fr: (m) => `Trop de tentatives. Réessayez dans ${m} min.`,
  es: (m) => `Demasiados intentos. Inténtalo de nuevo en ${m} min.`,
  de: (m) => `Zu viele Versuche. Bitte in ${m} Min. erneut versuchen.`,
};

/** Friendly localized "too many attempts" text for a gate deny. */
export function tooManyMessage(locale: string | undefined, retryAfter: number): string {
  const m = Math.max(1, Math.ceil(retryAfter / 60));
  const l = String(locale || "").slice(0, 2).toLowerCase();
  return (TOO_MANY[l] || TOO_MANY.nl)(m);
}
