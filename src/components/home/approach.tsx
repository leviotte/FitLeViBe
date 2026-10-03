import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { SectionCta } from "@/components/fitcheck-cta";
import { photos } from "@/lib/photos";

export async function Approach() {
  const t = await getTranslations("Approach");
  const photoAlts = await getTranslations("Photos");

  return (
    <section className="bg-indigo text-cream" id="aanpak">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="text-sm font-semibold tracking-wide text-[#7fd6a4]">{t("eyebrow")}</p>
          <h2 className="font-display mt-3 text-4xl leading-tight text-cream sm:text-5xl">{t("title")}</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-cream/80">{t("body")}</p>

          <div className="mt-8 flex h-4 overflow-hidden rounded-full" aria-hidden="true">
            <span className="w-4/5 bg-green" />
            <span className="w-1/5 bg-cream/80" />
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-display text-4xl text-cream">
                80% <span className="text-2xl">{t("nutrition")}</span>
              </p>
              <p className="mt-2 text-base leading-7 text-cream/75">{t("nutritionBody")}</p>
            </div>
            <div>
              <p className="font-display text-4xl text-cream">
                20% <span className="text-2xl">{t("movement")}</span>
              </p>
              <p className="mt-2 text-base leading-7 text-cream/75">{t("movementBody")}</p>
            </div>
          </div>
          <blockquote className="mt-10 border-l-2 border-green pl-5 font-display text-2xl leading-snug text-cream">
            “{t("quote")}”
          </blockquote>
        </div>
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-sand lg:aspect-[4/5]">
            <Image
              src={photos.nutrition}
              alt={photoAlts("nutrition")}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 sm:pb-24 [&_p]:text-cream/70">
        <SectionCta />
      </div>
    </section>
  );
}
