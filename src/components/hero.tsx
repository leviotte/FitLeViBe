import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { FitCheckCta } from "@/components/fitcheck-cta";
import { Icon } from "@/components/icons";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

export async function Hero() {
  const t = await getTranslations("Hero");
  const photoAlts = await getTranslations("Photos");
  const points = t.raw("points") as string[];

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-14 pt-10 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-6">
          <p className="text-sm font-semibold tracking-wide text-green">
            {t("kicker", { name: site.personName, city: site.address.city })}
          </p>
          <h1 className="font-display mt-4 text-[2.6rem] leading-[1.05] text-indigo sm:text-6xl lg:text-[4.1rem]">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-[30rem] text-lg leading-8 text-muted sm:text-xl sm:leading-9">
            {t("body")}
          </p>
          <div className="mt-8">
            <FitCheckCta />
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-indigo">
            {points.map((point) => (
              <li key={point} className="inline-flex items-center gap-1.5">
                <Icon name="check" className="h-4 w-4 text-green" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-sand sm:aspect-[5/4] lg:aspect-auto lg:min-h-[32rem]">
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
