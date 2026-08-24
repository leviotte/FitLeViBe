import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { StartButton } from "@/components/enroll";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

export async function Hero() {
  const t = await getTranslations("Hero");
  const common = await getTranslations("Common");
  const photoAlts = await getTranslations("Photos");

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:pb-28 lg:pt-20">
        <div className="lg:col-span-6">
          <p className="text-sm font-medium tracking-wide text-green">
            {t("kicker", {
              name: site.personName,
              job: common("jobTitleLower"),
              city: site.address.city,
            })}
          </p>
          <h1 className="font-display mt-5 max-w-[10ch] text-[2.9rem] leading-[1.04] text-indigo sm:text-6xl lg:text-[4.35rem]">
            {t("title")}
          </h1>
          <p className="mt-7 max-w-[28rem] text-xl leading-9 text-muted">{t("body")}</p>
          <div className="mt-10">
            <StartButton className="min-h-14 px-8 text-lg" />
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sand sm:aspect-[5/4] lg:min-h-[32rem] lg:aspect-auto">
            <Image
              src={photos.hero}
              alt={photoAlts("hero")}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[center_20%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
