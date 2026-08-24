import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "NotFound" });

  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="font-display text-4xl text-indigo">{t("title")}</h1>
      <p className="mt-4 text-muted">{t("body")}</p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-green px-6 font-semibold text-white"
      >
        {t("home")}
      </Link>
    </div>
  );
}
