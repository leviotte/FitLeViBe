import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EnrollButton, EnrollDisclosure } from "@/components/enroll";
import { pageMeta } from "@/lib/metadata";
import { goalList, photos } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Programma's",
  "Drie gepersonaliseerde richtingen: gewichtsverlies en -beheersing, spiermassa en vitaliteit. Start met een gratis FitCheck.",
  "/programmas",
);

const photoByGoal = {
  gewichtsverlies: photos.weight,
  spiermassa: photos.muscle,
  vitaliteit: photos.vitality,
} as const;

export default function ProgrammasPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green">
        Programma&apos;s
      </p>
      <h1 className="font-display mt-3 max-w-2xl text-4xl leading-tight text-indigo sm:text-6xl">
        Wat is jouw doel?
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
        Geen catalogus van beloftes. Drie duidelijke pistes, elk met een
        FitCheck als eerste stap. Resultaten verschillen per persoon.
      </p>

      <div className="mt-14 grid gap-12">
        {goalList.map((goal) => {
          const photo = photoByGoal[goal.id];
          return (
            <article
              key={goal.id}
              className="grid items-center gap-8 overflow-hidden rounded-[2rem] border border-indigo/10 bg-white lg:grid-cols-2"
            >
              <div className="relative aspect-[16/11] lg:aspect-auto lg:min-h-[22rem]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="px-6 pb-8 lg:px-10 lg:py-10">
                <h2 className="font-display text-3xl text-indigo">{goal.title}</h2>
                <p className="mt-4 text-base leading-7 text-muted">{goal.body}</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href={`${goal.href}`}
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-green px-6 text-sm font-semibold text-white hover:bg-green-dark"
                  >
                    Gratis FitCheck
                  </Link>
                  <EnrollButton variant="secondary" className="text-sm" />
                </div>
                <EnrollDisclosure className="mt-4 text-sm leading-6 text-muted" />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
