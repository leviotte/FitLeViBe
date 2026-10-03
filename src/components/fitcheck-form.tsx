"use client";

import { useActionState } from "react";
import FormGuardFields from "@/components/FormGuardFields";
import { useLocale, useTranslations } from "next-intl";
import {
  submitFitCheckAction,
  type FitCheckState,
} from "@/lib/actions/fitcheck";
import { Link } from "@/i18n/navigation";
import { GOAL_IDS, type GoalId } from "@/lib/site";

const initial: FitCheckState = { status: "idle" };

const fieldClass =
  "mt-1.5 w-full rounded-2xl border border-indigo/15 bg-white px-4 py-3.5 text-base text-indigo outline-none transition placeholder:text-muted/60 focus:border-green focus:ring-2 focus:ring-green/20";

type FitCheckFormProps = {
  defaultGoal?: GoalId;
};

/** Two required fields (name, mobile) and one optional tap (goal). */
export function FitCheckForm({ defaultGoal }: FitCheckFormProps) {
  const [state, action, pending] = useActionState(submitFitCheckAction, initial);
  const t = useTranslations("FitCheck");
  const goals = useTranslations("Goals");
  const locale = useLocale();

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-green/20 bg-white px-6 py-10 text-center sm:px-10"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-green">
          {t("successKicker")}
        </p>
        <h3 className="font-display mt-3 text-3xl text-indigo">{t("successTitle")}</h3>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted">
          {t("successBody")}
        </p>
      </div>
    );
  }

  return (
    <form
      action={action}
      className="relative rounded-3xl border border-indigo/10 bg-white p-5 shadow-[0_12px_40px_rgba(68,69,102,0.08)] sm:p-8"
    >
      <input type="hidden" name="locale" value={locale} />
      <FormGuardFields honeypot={false} />
      <div className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-indigo">{t("name")}</span>
            <input
              required
              name="name"
              autoComplete="name"
              minLength={2}
              maxLength={80}
              placeholder={t("namePlaceholder")}
              className={fieldClass}
              aria-invalid={state.fieldErrors?.name ? true : undefined}
            />
            {state.fieldErrors?.name ? (
              <p className="mt-1.5 text-sm text-red-700">{state.fieldErrors.name}</p>
            ) : null}
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-indigo">{t("phone")}</span>
            <input
              required
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder={t("phonePlaceholder")}
              className={fieldClass}
              aria-invalid={state.fieldErrors?.phone ? true : undefined}
            />
            {state.fieldErrors?.phone ? (
              <p className="mt-1.5 text-sm text-red-700">{state.fieldErrors.phone}</p>
            ) : null}
          </label>
        </div>

        <fieldset>
          <legend className="text-sm font-semibold text-indigo">
            {t("goalLegend")} <span className="font-normal text-muted">{t("optional")}</span>
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {GOAL_IDS.map((id) => (
              <label
                key={id}
                className="cursor-pointer rounded-full border border-indigo/15 bg-cream/60 px-4 py-2.5 text-sm font-medium text-indigo transition has-[:checked]:border-green has-[:checked]:bg-green has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-green/40"
              >
                <input
                  type="radio"
                  name="goal"
                  value={id}
                  defaultChecked={defaultGoal === id}
                  className="sr-only"
                />
                {goals(`${id}.title`)}
              </label>
            ))}
          </div>
          {state.fieldErrors?.goal ? (
            <p className="mt-1.5 text-sm text-red-700">{state.fieldErrors.goal}</p>
          ) : null}
        </fieldset>

        <div className="sr-only" aria-hidden="true">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        {state.status === "error" && state.message ? (
          <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm leading-6 text-red-800">
            {state.message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-green px-6 text-lg font-semibold text-white shadow-[0_10px_28px_rgba(30,145,83,0.28)] transition hover:bg-green-dark disabled:opacity-70"
        >
          {pending ? t("pending") : t("submit")}
        </button>
        <p className="text-center text-sm leading-6 text-muted">
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
