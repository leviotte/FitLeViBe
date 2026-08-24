"use server";

import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { isAppLocale } from "@/i18n/locales";
import { routing } from "@/i18n/routing";
import { sendFitCheckEmail } from "@/lib/persist-fitcheck";
import { tooManyRequests } from "@/lib/rate-limit";
import { normalizeBeMobile } from "@/lib/phone";
import { isGoalId, site, type GoalId } from "@/lib/site";

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

function clientKey(headerList: Headers): string {
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return headerList.get("x-real-ip") || "unknown";
}

export async function submitFitCheckAction(
  _prev: FitCheckState,
  formData: FormData,
): Promise<FitCheckState> {
  const requestedLocale = String(formData.get("locale") ?? "").trim();
  const locale = isAppLocale(requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "FitCheck.errors" });

  const honeypot = String(formData.get("website") ?? "").trim();
  if (honeypot) {
    return { status: "success" };
  }

  const headerList = await headers();
  if (tooManyRequests(clientKey(headerList))) {
    return {
      status: "error",
      message: t("rateLimit"),
    };
  }

  const name = String(formData.get("name") ?? "").trim();
  const phoneRaw = String(formData.get("phone") ?? "").trim();
  const goalRaw = String(formData.get("goal") ?? "").trim();
  const messageRaw = String(formData.get("message") ?? "").trim();

  const fieldErrors: NonNullable<FitCheckState["fieldErrors"]> = {};

  if (name.length < 2 || name.length > 80) {
    fieldErrors.name = t("name");
  }

  const phone = normalizeBeMobile(phoneRaw);
  if (!phone) {
    fieldErrors.phone = t("phone");
  }

  if (!isGoalId(goalRaw)) {
    fieldErrors.goal = t("goal");
  }

  if (messageRaw.length > 600) {
    fieldErrors.message = t("message");
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: t("fields"),
      fieldErrors,
    };
  }

  try {
    const result = await sendFitCheckEmail({
      name,
      phone: phone!,
      goal: goalRaw as GoalId,
      message: messageRaw || undefined,
      locale,
      createdAt: new Date().toISOString(),
    });

    if (!result.ok) {
      const phoneHint = site.phoneDisplay;
      return {
        status: "error",
        message:
          result.reason === "not_configured"
            ? t("notConfigured", { phone: phoneHint })
            : t("sendFailed", { phone: phoneHint }),
      };
    }
  } catch (error) {
    console.error("FitCheck send failed:", error);
    return {
      status: "error",
      message: t("sendFailed", { phone: site.phoneDisplay }),
    };
  }

  return { status: "success" };
}
