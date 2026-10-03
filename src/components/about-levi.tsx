import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { SectionCta } from "@/components/fitcheck-cta";
import { Link } from "@/i18n/navigation";
import { photos } from "@/lib/photos";

export async function AboutLevi() {
  const t = await getTranslations("About");
  const approach = await getTranslations("Approach");
  const photoAlts = await getTranslations("Photos");

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24" id="over">
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="relative lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-sand lg:aspect-[4/5]">
            <Image
              src={photos.about}
              alt={photoAlts("about")}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="lg:col-span-7 lg:pl-10">
          <p className="text-sm font-semibold tracking-wide text-green">{t("eyebrow")}</p>
          <h2 className="font-display mt-3 text-4xl leading-tight text-indigo sm:text-5xl">
            {t("homeTitle")}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">{t("homeBody")}</p>
          <blockquote className="mt-7 max-w-xl border-l-2 border-green pl-5 font-display text-2xl leading-snug text-indigo">
            “{approach("quote")}”
          </blockquote>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted">{t("homeDisclosure")}</p>
          <Link
            href="/over"
            className="mt-4 inline-flex min-h-11 items-center font-semibold text-green hover:text-green-dark"
          >
            {t("more")} →
          </Link>
        </div>
      </div>
      <SectionCta />
    </section>
  );
}
