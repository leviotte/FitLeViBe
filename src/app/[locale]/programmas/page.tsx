import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { StartButton } from "@/components/enroll";
import { Link } from "@/i18n/navigation";
import { isAppLocale } from "@/i18n/locales";
import { routing } from "@/i18n/routing";
import { photos } from "@/lib/photos";
import { localeMetadata } from "@/lib/seo";
import { GOAL_IDS, type GoalId } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isAppLocale(raw) ? raw : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return localeMetadata({
    locale,
    pathname: "/programmas",
    title: t("programs.title"),
    description: t("programs.description"),
  });
}

const photoByGoal: Record<GoalId, string> = {
  gewichtsverlies: photos.weight,
  spiermassa: photos.muscle,
  vitaliteit: photos.vitality,
};

const photoAltKey: Record<GoalId, "weight" | "muscle" | "vitality"> = {
  gewichtsverlies: "weight",
  spiermassa: "muscle",
  vitaliteit: "vitality",
};

export default async function ProgrammasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (isAppLocale(locale)) setRequestLocale(locale);
  const t = await getTranslations("Programs");
  const goals = await getTranslations("Goals");
  const photoAlts = await getTranslations("Photos");

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 pb-28 sm:px-8 sm:py-24">
      <p className="text-sm font-medium tracking-wide text-green">{t("eyebrow")}</p>
      <h1 className="font-display mt-4 max-w-2xl text-4xl leading-tight text-indigo sm:text-6xl">
        {t("title")}
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-muted">{t("intro")}</p>

      <div className="mt-16 grid gap-14">
        {GOAL_IDS.map((id) => (
          <article
            key={id}
            className="grid items-center gap-8 overflow-hidden rounded-[2rem] border border-indigo/10 bg-white lg:grid-cols-2"
          >
            <div className="relative aspect-[16/11] lg:aspect-auto lg:min-h-[22rem]">
              <Image
                src={photoByGoal[id]}
                alt={photoAlts(photoAltKey[id])}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="px-6 pb-10 lg:px-10 lg:py-12">
              <h2 className="font-display text-3xl text-indigo">
                {goals(`${id}.title`)}
              </h2>
              <p className="mt-4 text-base leading-7 text-muted">
                {goals(`${id}.body`)}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <StartButton className="text-sm shadow-none" />
                <Link
                  href={{ pathname: "/fitcheck", query: { doel: id } }}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-indigo/15 bg-white px-6 text-sm font-semibold text-indigo hover:bg-sand"
                >
                  {goals("cta")}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
