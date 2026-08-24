"use server";

import { headers } from "next/headers";
import { persistFitCheck } from "@/lib/persist-fitcheck";
import { tooManyRequests } from "@/lib/rate-limit";
import { normalizeBeMobile } from "@/lib/phone";
import { type GoalId, goals } from "@/lib/site";

export type FitCheckState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: {
    name?: string;
    phone?: string;
    goal?: string;
    message?: string;
  };
};

const GOAL_IDS = Object.keys(goals) as GoalId[];

function isGoal(value: string): value is GoalId {
  return (GOAL_IDS as string[]).includes(value);
}

function clientKey(headerList: Headers): string {
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return headerList.get("x-real-ip") || "unknown";
}

export async function submitFitCheckAction(
  _prev: FitCheckState,
  formData: FormData,
): Promise<FitCheckState> {
  const honeypot = String(formData.get("website") ?? "").trim();
  if (honeypot) {
    return { status: "success" };
  }

  const headerList = await headers();
  if (tooManyRequests(clientKey(headerList))) {
    return {
      status: "error",
      message: "Even geduld. Probeer over een paar minuten opnieuw.",
    };
  }

  const name = String(formData.get("name") ?? "").trim();
  const phoneRaw = String(formData.get("phone") ?? "").trim();
  const goalRaw = String(formData.get("goal") ?? "").trim();
  const messageRaw = String(formData.get("message") ?? "").trim();

  const fieldErrors: NonNullable<FitCheckState["fieldErrors"]> = {};

  if (name.length < 2 || name.length > 80) {
    fieldErrors.name = "Vul je voor- en achternaam in.";
  }

  const phone = normalizeBeMobile(phoneRaw);
  if (!phone) {
    fieldErrors.phone = "Vul een Belgisch gsm-nummer in, bijvoorbeeld 0475 34 44 02.";
  }

  if (!isGoal(goalRaw)) {
    fieldErrors.goal = "Kies een doel.";
  }

  if (messageRaw.length > 600) {
    fieldErrors.message = "Houd je bericht onder 600 tekens.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Controleer even de velden hieronder.",
      fieldErrors,
    };
  }

  try {
    await persistFitCheck({
      name,
      phone: phone!,
      goal: goalRaw as GoalId,
      message: messageRaw || undefined,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("FitCheck persist failed:", error);
  }

  return { status: "success" };
}
