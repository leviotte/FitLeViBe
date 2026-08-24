import type { Metadata } from "next";
import { EnrollButton, EnrollDisclosure, TelegramButton } from "@/components/enroll";
import { pageMeta } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Starten",
  "Start met Fit met Levi: inschrijven of lid worden van de Telegram community. Levi Otte, persoonlijk coach in Roosdaal.",
  "/start",
);

export default function StartPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-5 py-16 sm:px-8 sm:py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green">
        {site.personName} · {site.address.city}
      </p>
      <h1 className="font-display mt-4 text-4xl leading-tight text-indigo sm:text-6xl">
        Klaar om te starten?
      </h1>
      <p className="mt-6 max-w-lg text-lg leading-8 text-muted">
        Twee duidelijke deuren. Inschrijven via mijn lid-link, of meevolgen in
        de publieke Telegram community. Liever eerst praten? Vraag een FitCheck.
      </p>

      <div className="mt-10 flex flex-col gap-3">
        <EnrollButton fullWidth>Starten / inschrijven</EnrollButton>
        <TelegramButton className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-indigo/20 bg-white px-6 text-center text-base font-semibold text-indigo transition hover:bg-sand" />
      </div>
      <EnrollDisclosure className="mt-5 text-sm leading-6 text-muted" />

      <p className="mt-10 text-sm leading-6 text-muted">
        Of{" "}
        <a href="/fitcheck" className="font-semibold text-green hover:text-green-dark">
          vraag een gratis FitCheck
        </a>{" "}
        — Levi neemt contact op.
      </p>
    </div>
  );
}
