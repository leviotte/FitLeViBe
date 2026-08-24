import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StartButton } from "@/components/enroll";
import { pageMeta } from "@/lib/metadata";
import { goalList, photos } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Programma's",
  "Drie richtingen bij Fit met Levi: gewicht, spiermassa of vitaliteit. Begin op jouw ritme.",
  "/programmas",
);

const photoByGoal = {
  gewichtsverlies: photos.weight,
  spiermassa: photos.muscle,
  vitaliteit: photos.vitality,
} as const;

export default function ProgrammasPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 pb-28 sm:px-8 sm:py-24">
      <p className="text-sm font-medium tracking-wide text-green">Programma&apos;s</p>
      <h1 className="font-display mt-4 max-w-2xl text-4xl leading-tight text-indigo sm:text-6xl">
        Wat wil je nu voor jezelf?
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
        Drie duidelijke pistes. Geen catalogus van beloftes. Resultaten
        verschillen per persoon.
      </p>

      <div className="mt-16 grid gap-14">
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
              <div className="px-6 pb-10 lg:px-10 lg:py-12">
                <h2 className="font-display text-3xl text-indigo">{goal.title}</h2>
                <p className="mt-4 text-base leading-7 text-muted">{goal.body}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <StartButton className="text-sm shadow-none" />
                  <Link
                    href={goal.href}
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-indigo/15 bg-white px-6 text-sm font-semibold text-indigo hover:bg-sand"
                  >
                    Eerst een FitCheck
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
