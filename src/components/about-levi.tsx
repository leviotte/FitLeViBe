import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

export async function AboutLevi() {
  const t = await getTranslations("About");
  const common = await getTranslations("Common");
  const photoAlts = await getTranslations("Photos");

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12">
      <div className="relative lg:col-span-5">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sand">
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
        <p className="text-sm font-medium tracking-wide text-green">{t("eyebrow")}</p>
        <h2 className="font-display mt-4 max-w-lg text-4xl leading-tight text-indigo sm:text-5xl">
          {t("homeTitle")}
        </h2>
        <p className="mt-7 max-w-xl text-lg leading-8 text-muted">
          {t("homeBody", { name: site.personName })}
        </p>
        <blockquote className="mt-8 max-w-xl border-l-2 border-green pl-5 font-display text-2xl leading-snug text-indigo">
          {common("tagline")}
        </blockquote>
        <p className="mt-7 max-w-xl text-base leading-7 text-muted">{t("homeDisclosure")}</p>
        <Link
          href="/over"
          className="mt-8 inline-flex min-h-11 items-center font-semibold text-green hover:text-green-dark"
        >
          {t("more")}
        </Link>
      </div>
    </section>
  );
}
