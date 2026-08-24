import { Resend } from "resend";
import { goals, site, type GoalId } from "@/lib/site";

export type FitCheckRecord = {
  name: string;
  phone: string;
  goal: GoalId;
  message?: string;
  createdAt: string;
};

/** Levi's lead inbox. */
export const FITCHECK_TO = site.email;

/**
 * Verified Resend sending domain is myfiletracker.com.
 * Do not send from fitlevibe.com until that domain is verified.
 */
export const FITCHECK_FROM = "Fit met Levi <noreply@myfiletracker.com>";

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
  const { subject, text } = buildFitCheckEmail(record);
  const idempotencyKey = `fitcheck/${record.phone}/${record.createdAt}`.slice(
    0,
    256,
  );

  const { error } = await resend.emails.send(
    {
      from: FITCHECK_FROM,
      to: FITCHECK_TO,
      subject,
      text,
    },
    { idempotencyKey },
  );

  if (error) {
    console.error("FitCheck Resend error:", error);
    return { ok: false, reason: "send_failed" };
  }

  return { ok: true };
}
