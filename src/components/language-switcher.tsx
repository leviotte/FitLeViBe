import { getLocale, getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { hreflangOf, localeSwitcherLabel } from "@/i18n/locales";
import { routing } from "@/i18n/routing";
import {
  internalPathnameFromPublic,
  publicHref,
} from "@/lib/paths";

export async function LanguageSwitcher() {
  const locale = await getLocale();
  const t = await getTranslations("Nav");
  const headerList = await headers();
  const publicPath = headerList.get("x-public-pathname") ?? "/";
  const search = headerList.get("x-public-search") ?? "";
  const internal = internalPathnameFromPublic(publicPath);
  const query = Object.fromEntries(new URLSearchParams(search).entries());

  return (
    <nav aria-label={t("language")} className="flex shrink-0 items-center gap-0.5">
      {routing.locales.map((code) => {
        const current = code === locale;
        return (
          <a
            key={code}
            href={publicHref(code, internal, query)}
            hrefLang={hreflangOf(code)}
            aria-current={current ? "true" : undefined}
            className={`inline-flex min-h-9 min-w-9 items-center justify-center rounded-full px-2 text-[11px] font-semibold tracking-wide transition ${
              current
                ? "bg-indigo text-cream"
                : "text-indigo/70 hover:bg-sand hover:text-indigo"
            }`}
          >
            {localeSwitcherLabel[code]}
          </a>
        );
      })}
    </nav>
  );
}
