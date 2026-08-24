import Image from "next/image";
import Link from "next/link";
import { photos, site } from "@/lib/site";

export function AboutLevi() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12">
      <div className="relative lg:col-span-5">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sand">
          <Image
            src={photos.about.src}
            alt={photos.about.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="lg:col-span-7 lg:pl-10">
        <p className="text-sm font-medium tracking-wide text-green">Over mij</p>
        <h2 className="font-display mt-4 max-w-lg text-4xl leading-tight text-indigo sm:text-5xl">
          Ik coach in Roosdaal, sinds 2015.
        </h2>
        <p className="mt-7 max-w-xl text-lg leading-8 text-muted">
          Ik ben {site.personName}. Als je gezonder en rustiger in je lijf wilt
          staan, loop ik met je mee — met voeding die het grootste deel doet,
          training die haalbaar is, en een hoofd dat blijft.
        </p>
        <blockquote className="mt-8 max-w-xl border-l-2 border-green pl-5 font-display text-2xl leading-snug text-indigo">
          {site.tagline}
        </blockquote>
        <p className="mt-7 max-w-xl text-base leading-7 text-muted">
          Ter plaatse, buiten of online, na afspraak. Ik ben onafhankelijk
          Herbalife-lid; deze site is van Fit met Levi, niet van Herbalife.
        </p>
        <Link
          href="/over"
          className="mt-8 inline-flex min-h-11 items-center font-semibold text-green hover:text-green-dark"
        >
          Meer over mij
        </Link>
      </div>
    </section>
  );
}
