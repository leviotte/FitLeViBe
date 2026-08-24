import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Privacy",
  "Hoe Fit met Levi FitCheck-gegevens gebruikt: naam, gsm en doel, om contact op te nemen.",
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
      <h1 className="font-display text-4xl text-indigo">Privacy</h1>
      <div className="mt-8 space-y-5 text-base leading-7 text-muted">
        <p>
          Verwerkingsverantwoordelijke: {site.personName} ({site.publicName}),{" "}
          {site.address.street}, {site.address.postalCode} {site.address.city},{" "}
          {site.address.country}. Tel. {site.phoneDisplay}.
        </p>
        <p>
          Via het FitCheck-formulier verzamel ik voornaam en naam, gsm-nummer,
          gekozen doel en optioneel een bericht. Doel: contact opnemen over
          lifestyle coaching. Rechtsgrond: jouw verzoek (precontractueel /
          gerechtvaardigd belang om te antwoorden).
        </p>
        <p>
          Gegevens gaan niet naar een openbare nieuwsbrief. Ze worden per e-mail
          of in een afgeschermde store bewaard zolang het gesprek loopt, daarna
          gewist of beperkt tot wat boekhouding of geschil vereist.
        </p>
        <p>
          Je hebt recht op inzage, verbetering, wissing en klacht bij de
          Gegevensbeschermingsautoriteit. Stuur een bericht via het nummer
          hierboven.
        </p>
        <p>
          Deze site is geen officiële Herbalife-website. Levi Otte is
          onafhankelijk lid. Er worden geen betaalkaartgegevens via FitCheck
          verzameld.
        </p>
      </div>
    </div>
  );
}
