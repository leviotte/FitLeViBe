import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { isAppLocale } from "@/i18n/locales";
import { routing } from "@/i18n/routing";
import { localeMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

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
    pathname: "/privacy",
    title: t("privacy.title"),
    description: t("privacy.description"),
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (isAppLocale(locale)) setRequestLocale(locale);
  const t = await getTranslations("Privacy");
  const country = await getTranslations("Common");

  const vars = {
    name: site.personName,
    publicName: site.publicName,
    street: site.address.street,
    postal: site.address.postalCode,
    city: site.address.city,
    country: country("country"),
    phone: site.phoneDisplay,
    email: site.email,
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
      <h1 className="font-display text-4xl text-indigo">{t("title")}</h1>
      <div className="mt-8 space-y-5 text-base leading-7 text-muted">
        <h2 className="pt-3 font-display text-xl text-indigo">{t("h1")}</h2>
        <p>{t("p1", vars)}</p>
        <h2 className="pt-3 font-display text-xl text-indigo">{t("h2")}</h2>
        <p>{t("p2")}</p>
        <h2 className="pt-3 font-display text-xl text-indigo">{t("h3")}</h2>
        <p>{t("p3", { email: site.email })}</p>
        <h2 id="thumbsupp" className="pt-3 font-display text-xl text-indigo">{t("h4")}</h2>
        <p>{t("pThumbsupp")}</p>
        <h2 className="pt-3 font-display text-xl text-indigo">{t("h5")}</h2>
        <p>{t("p4")}</p>
        <p>{t("p5")}</p>
      </div>
    </div>
  );
}
