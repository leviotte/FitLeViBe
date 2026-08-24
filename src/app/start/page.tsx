import type { Metadata } from "next";
import { EnrollButton, EnrollDisclosure, TelegramButton } from "@/components/enroll";
import { pageMeta } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Starten",
  "Begin bij Fit met Levi. Inschrijven of meevolgen in Telegram. Levi Otte, persoonlijk coach in Roosdaal.",
  "/start",
);

export default function StartPage() {
  return (
    <div className="mx-auto flex min-h-[78vh] max-w-lg flex-col justify-center px-6 py-24 sm:px-8 sm:py-32">
      <p className="text-sm font-medium tracking-wide text-green">
        {site.personName} · {site.address.city}
      </p>
      <h1 className="font-display mt-6 text-[2.75rem] leading-[1.08] text-indigo sm:text-6xl">
        Begin hier.
      </h1>
      <p className="mt-8 text-xl leading-9 text-muted">
        Je hoeft nu niets te bewijzen. Kies wat het rustigst voelt.
      </p>

      <div className="mt-12 flex flex-col gap-4">
        <EnrollButton fullWidth className="min-h-14 text-lg">
          Inschrijven
        </EnrollButton>
        <EnrollDisclosure />
        <TelegramButton fullWidth className="inline-flex min-h-14 w-full items-center justify-center rounded-full border border-indigo/15 bg-white px-7 text-center text-lg font-semibold text-indigo transition hover:bg-sand" />
      </div>

      <p className="mt-14 text-sm leading-6 text-muted">
        {site.address.city} · sinds {site.foundedYear} · Google {site.googleRating}
      </p>
      <p className="mt-3 text-sm leading-6 text-muted">
        Geen druk. Geen beloftes over kilo&apos;s of inkomen. Een eerste stap,
        met mij.
      </p>
    </div>
  );
}
