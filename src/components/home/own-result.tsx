import { getTranslations } from "next-intl/server";
import { SectionCta } from "@/components/fitcheck-cta";
import { ResponsivePicture } from "@/components/responsive-picture";
import { leviPhotos } from "@/lib/levi-photos";

/** Levi's own before/after. Trust element only: no claims for anyone else. */
export async function OwnResult() {
  const t = await getTranslations("Result");

  return (
    <section className="border-t border-indigo/10 bg-paper" id="resultaat">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6 lg:order-2">
            <p className="text-sm font-semibold tracking-wide text-green">{t("eyebrow")}</p>
            <h2 className="font-display mt-3 text-4xl leading-tight text-indigo sm:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-5 max-w-lg text-xl leading-8 text-indigo">{t("line")}</p>
          </div>
          <figure className="mx-auto w-full max-w-[26rem] lg:col-span-6 lg:order-1">
            <div className="overflow-hidden rounded-[2rem] border border-indigo/10 bg-sand">
              <ResponsivePicture
                {...leviPhotos.result}
                alt={t("alt")}
                sizes="(max-width: 480px) calc(100vw - 2.5rem), 416px"
                className="block h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 text-sm leading-6 text-muted">{t("caption")}</figcaption>
          </figure>
        </div>
        <SectionCta />
      </div>
    </section>
  );
}
