"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  submitFitCheckAction,
  type FitCheckState,
} from "@/lib/actions/fitcheck";
import { Link } from "@/i18n/navigation";
import { GOAL_IDS, type GoalId } from "@/lib/site";

const initial: FitCheckState = { status: "idle" };

const fieldClass =
  "mt-2 w-full rounded-2xl border border-indigo/15 bg-white px-4 py-3.5 text-base text-indigo outline-none transition placeholder:text-muted/70 focus:border-green focus:ring-2 focus:ring-green/20";

type FitCheckFormProps = {
  defaultGoal?: GoalId;
};

export function FitCheckForm({ defaultGoal }: FitCheckFormProps) {
  const [state, action, pending] = useActionState(submitFitCheckAction, initial);
  const t = useTranslations("FitCheck");
  const goals = useTranslations("Goals");
  const locale = useLocale();

  if (state.status === "success") {
    return (
      <div className="rounded-3xl border border-green/20 bg-white px-6 py-10 text-center sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-green">
          {t("successKicker")}
        </p>
        <h2 className="font-display mt-3 text-3xl text-indigo">{t("successTitle")}</h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted">
          {t("successBody")}
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="rounded-3xl border border-indigo/10 bg-white p-5 sm:p-8">
      <input type="hidden" name="locale" value={locale} />
      <div className="grid gap-5">
        <label className="block">
          <span className="text-sm font-medium text-indigo">{t("name")}</span>
          <input
            required
            name="name"
            autoComplete="name"
            maxLength={80}
            placeholder={t("namePlaceholder")}
            className={fieldClass}
          />
          {state.fieldErrors?.name ? (
            <p className="mt-1.5 text-sm text-red-700">{state.fieldErrors.name}</p>
          ) : null}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-indigo">{t("phone")}</span>
          <input
            required
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={t("phonePlaceholder")}
            className={fieldClass}
          />
          {state.fieldErrors?.phone ? (
            <p className="mt-1.5 text-sm text-red-700">{state.fieldErrors.phone}</p>
          ) : null}
        </label>

        <fieldset>
          <legend className="text-sm font-medium text-indigo">{t("goalLegend")}</legend>
          {defaultGoal ? (
            <p className="mt-2 text-sm text-green">
              {t("goalPrefill", { goal: goals(`${defaultGoal}.title`) })}
            </p>
          ) : null}
          <div className="mt-3 grid gap-2">
            {GOAL_IDS.map((id) => (
              <label
                key={id}
                className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 has-[:checked]:border-green has-[:checked]:bg-green/5 ${
                  defaultGoal === id
                    ? "border-green bg-green/5"
                    : "border-indigo/10 bg-cream/60"
                }`}
              >
                <input
                  type="radio"
                  name="goal"
                  value={id}
                  defaultChecked={defaultGoal === id}
                  className="mt-1 accent-green"
                  required
                />
                <span>
                  <span className="block font-medium text-indigo">
                    {goals(`${id}.title`)}
                  </span>
                  <span className="block text-sm text-muted">{goals(`${id}.short`)}</span>
                </span>
              </label>
            ))}
          </div>
          {state.fieldErrors?.goal ? (
            <p className="mt-1.5 text-sm text-red-700">{state.fieldErrors.goal}</p>
          ) : null}
        </fieldset>

        <label className="block">
          <span className="text-sm font-medium text-indigo">
            {t("message")}{" "}
            <span className="font-normal text-muted">{t("optional")}</span>
          </span>
          <textarea
            name="message"
            rows={4}
            maxLength={600}
            placeholder={t("messagePlaceholder")}
            className={`${fieldClass} resize-y`}
          />
          {state.fieldErrors?.message ? (
            <p className="mt-1.5 text-sm text-red-700">{state.fieldErrors.message}</p>
          ) : null}
        </label>

        <div className="sr-only" aria-hidden="true">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        {state.status === "error" && state.message ? (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm leading-6 text-red-800">
            {state.message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-green px-6 text-base font-semibold text-white transition hover:bg-green-dark disabled:opacity-70"
        >
          {pending ? t("pending") : t("submit")}
        </button>
        <p className="text-sm leading-6 text-muted">
          {t("fineprint")}{" "}
          <Link
            href="/privacy"
            className="underline decoration-indigo/30 underline-offset-4"
          >
            {t("privacy")}
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
