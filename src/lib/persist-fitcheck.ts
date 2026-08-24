import type { GoalId } from "@/lib/site";

export type FitCheckRecord = {
  name: string;
  phone: string;
  goal: GoalId;
  message?: string;
  createdAt: string;
};

async function sendResend(record: FitCheckRecord): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.FITCHECK_TO_EMAIL;
  const from = process.env.RESEND_FROM;

  if (!apiKey || !to || !from) return false;

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const subject = `FitCheck: ${record.name} · ${record.goal}`;

  const { error } = await resend.emails.send({
    from,
    to,
    subject,
    text: [
      "Nieuwe FitCheck-aanvraag",
      `Naam: ${record.name}`,
      `GSM: ${record.phone}`,
      `Doel: ${record.goal}`,
      record.message ? `Bericht: ${record.message}` : "Bericht: —",
      `Tijd: ${record.createdAt}`,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend FitCheck error:", error);
    return false;
  }

  return true;
}

async function writeFirebase(record: FitCheckRecord): Promise<boolean> {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) return false;

  try {
    const admin = await import("firebase-admin");
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
    }

    await admin.firestore().collection("fitchecks").add(record);
    return true;
  } catch (error) {
    console.error("Firebase FitCheck error:", error);
    return false;
  }
}

export async function persistFitCheck(record: FitCheckRecord): Promise<void> {
  const emailed = await sendResend(record);
  if (emailed) return;

  const stored = await writeFirebase(record);
  if (stored) return;

  console.error(
    "FitCheck received but no RESEND_API_KEY/FITCHECK_TO_EMAIL/RESEND_FROM or Firebase admin env. Submission:",
    record,
  );
}
