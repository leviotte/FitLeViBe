import Image from "next/image";
import Link from "next/link";
import { EnrollButton, EnrollDisclosure } from "@/components/enroll";
import { photos, site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green">
            {site.personName} · {site.address.city}
          </p>
          <h1 className="font-display mt-4 max-w-[11ch] text-[2.75rem] leading-[1.05] text-indigo sm:text-6xl lg:text-[4.25rem]">
            Fit met Levi
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-muted">
            Gepersonaliseerde programma&apos;s voor wie gezonder wil leven — zonder
            hype. Eerst een gesprek. Daarna een plan dat bij jou past.
          </p>
          <p className="mt-3 max-w-md text-base text-indigo/80">{site.tagline}</p>
          <div className="mt-8 flex min-h-[3.25rem] flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/fitcheck"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-green px-6 text-base font-semibold text-white shadow-[0_8px_24px_rgba(30,145,83,0.22)] transition hover:bg-green-dark sm:w-auto"
            >
              Gratis FitCheck
            </Link>
            <EnrollButton variant="secondary" />
          </div>
          <EnrollDisclosure className="mt-4 max-w-md text-sm leading-6 text-muted" />
          <p className="mt-3 text-sm text-muted">
            Inschrijven of Telegram? Ga naar{" "}
            <Link href="/start" className="font-semibold text-green hover:text-green-dark">
              /start
            </Link>
            .
          </p>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sand sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src={photos.hero.src}
              alt={photos.hero.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <p className="mt-3 text-sm text-muted">Wat is jouw doel?</p>
        </div>
      </div>
    </section>
  );
}
