import { Resend } from "resend";
import { goals, site, type GoalId } from "@/lib/site";

export type FitCheckRecord = {
  name: string;
  phone: string;
  goal: GoalId;
  message?: string;
  createdAt: string;
};

export const FITCHECK_TO = site.email;

const OWNED_FROM = "Fit met Levi <noreply@fitlevibe.com>";
const RESEND_ONBOARDING_FROM = "Fit met Levi <onboarding@resend.dev>";

export type FitCheckMailResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "send_failed" };

function goalLabel(goal: GoalId): string {
  return goals[goal].title;
}

function timestampBrussels(iso: string): string {
  return new Intl.DateTimeFormat("nl-BE", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Europe/Brussels",
  }).format(new Date(iso));
}

export function buildFitCheckEmail(record: FitCheckRecord): {
  subject: string;
  text: string;
} {
  const lines = [
    `Naam: ${record.name}`,
    `Telefoon: ${record.phone}`,
    `Doel: ${goalLabel(record.goal)}`,
    `Tijd: ${timestampBrussels(record.createdAt)}`,
  ];

  if (record.message) {
    lines.push(`Bericht: ${record.message}`);
  }

  return {
    subject: `FitCheck: ${record.name}`,
    text: lines.join("\n"),
  };
}

function fromAddress(): string {
  return process.env.RESEND_FROM?.trim() || OWNED_FROM;
}

async function sendOnce(
  resend: Resend,
  from: string,
  record: FitCheckRecord,
  idempotencyKey: string,
) {
  const { subject, text } = buildFitCheckEmail(record);
  return resend.emails.send(
    {
      from,
      to: FITCHECK_TO,
      subject,
      text,
    },
    { idempotencyKey },
  );
}

export async function sendFitCheckEmail(
  record: FitCheckRecord,
): Promise<FitCheckMailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error(
      "FitCheck: RESEND_API_KEY is missing. Mail was not sent. Add it on Vercel to deliver leads to fitlevibe@icloud.com.",
    );
    return { ok: false, reason: "not_configured" };
  }

  const resend = new Resend(apiKey);
  const preferred = fromAddress();
  const keyBase = `fitcheck/${record.phone}/${record.createdAt}`.slice(0, 240);

  const first = await sendOnce(resend, preferred, record, keyBase);
  if (!first.error) return { ok: true };

  console.error("FitCheck Resend error:", first.error);

  if (preferred !== RESEND_ONBOARDING_FROM) {
    const retry = await sendOnce(
      resend,
      RESEND_ONBOARDING_FROM,
      record,
      `${keyBase}/onboarding`.slice(0, 256),
    );
    if (!retry.error) return { ok: true };
    console.error("FitCheck Resend onboarding-from error:", retry.error);
  }

  return { ok: false, reason: "send_failed" };
}
