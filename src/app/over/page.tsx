import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EnrollButton, EnrollDisclosure, TelegramButton } from "@/components/enroll";
import { pageMeta } from "@/lib/metadata";
import { photos, site } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Over Levi Otte",
  "Levi Otte is persoonlijk coach in Roosdaal sinds 2015. 20% training, 80% voeding, 100% mindset. Onafhankelijk Herbalife-lid.",
  "/over",
);

export default function OverPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green">
        Over mij
      </p>
      <h1 className="font-display mt-3 max-w-2xl text-4xl leading-tight text-indigo sm:text-6xl">
        Levi Otte
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
        Persoonlijk coach in {site.address.city}, België. Coach sinds{" "}
        {site.foundedYear}. Google-reviews rond {site.googleRating}.
      </p>

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-12">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sand lg:col-span-5">
          <Image
            src={photos.nutrition.src}
            alt={photos.nutrition.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
        <div className="lg:col-span-7">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { k: "20%", v: "Training" },
              { k: "80%", v: "Voeding" },
              { k: "100%", v: "Mindset" },
            ].map((item) => (
              <div
                key={item.v}
                className="rounded-3xl border border-indigo/10 bg-white px-5 py-6"
              >
                <p className="font-display text-3xl text-green">{item.k}</p>
                <p className="mt-1 text-sm text-muted">{item.v}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-xl text-base leading-7 text-muted">
            Als je efficiënt, gezond en gemotiveerd je doelen wilt bereiken, is
            het cruciaal om te bepalen wat je precies nodig hebt. Een aanpak die
            voeding, beweging en hoofd samen neemt, werkt beter dan alleen
            harder trainen. Sinds 2015 verfijn ik die aanpak — niet met hype,
            wel met ritme dat je volhoudt.
          </p>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted">
            Making you healthier and happier. Begeleiding kan ter plaatse in
            Roosdaal, buiten, of online, altijd na afspraak.
          </p>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted">
            Ik ben onafhankelijk Herbalife-lid. Deze website is van Fit met Levi
            / Levi Otte, niet de officiële Herbalife-site. Geen
            inkomensbeloftes, geen medische claims.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/fitcheck"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-green px-6 text-base font-semibold text-white hover:bg-green-dark"
            >
              Gratis FitCheck
            </Link>
            <EnrollButton variant="secondary" />
            <TelegramButton />
          </div>
          <EnrollDisclosure className="mt-4 text-sm leading-6 text-muted" />
        </div>
      </div>
    </div>
  );
}
