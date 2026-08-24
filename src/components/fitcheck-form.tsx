"use client";

import { useActionState } from "react";
import {
  submitFitCheckAction,
  type FitCheckState,
} from "@/lib/actions/fitcheck";
import { goalList, type GoalId } from "@/lib/site";

const initial: FitCheckState = { status: "idle" };

const fieldClass =
  "mt-2 w-full rounded-2xl border border-indigo/15 bg-white px-4 py-3.5 text-base text-indigo outline-none transition placeholder:text-muted/70 focus:border-green focus:ring-2 focus:ring-green/20";

type FitCheckFormProps = {
  defaultGoal?: GoalId;
};

export function FitCheckForm({ defaultGoal }: FitCheckFormProps) {
  const [state, action, pending] = useActionState(submitFitCheckAction, initial);

  if (state.status === "success") {
    return (
      <div className="rounded-3xl border border-green/20 bg-white px-6 py-10 text-center sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-green">
          Ontvangen
        </p>
        <h2 className="font-display mt-3 text-3xl text-indigo">
          Ik neem contact op.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted">
          Bedankt. Ik bekijk wat je schreef en bel of bericht je op het nummer
          dat je achterliet.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="rounded-3xl border border-indigo/10 bg-white p-5 sm:p-8">
      <div className="grid gap-5">
        <label className="block">
          <span className="text-sm font-medium text-indigo">Voornaam &amp; naam</span>
          <input
            required
            name="name"
            autoComplete="name"
            maxLength={80}
            placeholder="Zoals je aangesproken wilt worden"
            className={fieldClass}
          />
          {state.fieldErrors?.name ? (
            <p className="mt-1.5 text-sm text-red-700">{state.fieldErrors.name}</p>
          ) : null}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-indigo">GSM-nummer</span>
          <input
            required
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0475 12 34 56"
            className={fieldClass}
          />
          {state.fieldErrors?.phone ? (
            <p className="mt-1.5 text-sm text-red-700">{state.fieldErrors.phone}</p>
          ) : null}
        </label>

        <fieldset>
          <legend className="text-sm font-medium text-indigo">Wat is jouw doel?</legend>
          {defaultGoal ? (
            <p className="mt-2 text-sm text-green">
              Voorkeuze: {goalList.find((goal) => goal.id === defaultGoal)?.title}.
            </p>
          ) : null}
          <div className="mt-3 grid gap-2">
            {goalList.map((goal) => (
              <label
                key={goal.id}
                className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 has-[:checked]:border-green has-[:checked]:bg-green/5 ${
                  defaultGoal === goal.id
                    ? "border-green bg-green/5"
                    : "border-indigo/10 bg-cream/60"
                }`}
              >
                <input
                  type="radio"
                  name="goal"
                  value={goal.id}
                  defaultChecked={defaultGoal === goal.id}
                  className="mt-1 accent-green"
                  required
                />
                <span>
                  <span className="block font-medium text-indigo">{goal.title}</span>
                  <span className="block text-sm text-muted">{goal.short}</span>
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
            Bericht <span className="font-normal text-muted">(optioneel)</span>
          </span>
          <textarea
            name="message"
            rows={4}
            maxLength={600}
            placeholder="Wat speelt er nu? Ritme, gezin, werk, blessure…"
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
          <p className="text-sm text-red-700">{state.message}</p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-green px-6 text-base font-semibold text-white transition hover:bg-green-dark disabled:opacity-70"
        >
          {pending ? "Even geduld…" : "Stuur mijn FitCheck"}
        </button>
        <p className="text-sm leading-6 text-muted">
          Ik neem contact op. Geen nieuwsbrief, geen medisch advies.{" "}
          <a href="/privacy" className="underline decoration-indigo/30 underline-offset-4">
            Privacy
          </a>
          .
        </p>
      </div>
    </form>
  );
}
