"use client";

import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { hreflangOf, localeSwitcherLabel } from "@/i18n/locales";
import { routing, type AppPathname } from "@/i18n/routing";

function LanguageSwitcherNav({ query }: { query?: Record<string, string> }) {
  const locale = useLocale();
  const pathname = usePathname() as AppPathname;
  const t = useTranslations("Nav");

  return (
    <nav aria-label={t("language")} className="flex shrink-0 items-center gap-0.5">
      {routing.locales.map((code) => {
        const current = code === locale;
        return (
          <Link
            key={code}
            href={query && Object.keys(query).length > 0 ? { pathname, query } : pathname}
            locale={code}
            hrefLang={hreflangOf(code)}
            aria-current={current ? "true" : undefined}
            className={`inline-flex min-h-9 min-w-9 items-center justify-center rounded-full px-2 text-[11px] font-semibold tracking-wide transition ${
              current
                ? "bg-indigo text-cream"
                : "text-indigo/70 hover:bg-sand hover:text-indigo"
            }`}
          >
            {localeSwitcherLabel[code]}
          </Link>
        );
      })}
    </nav>
  );
}

function LanguageSwitcherWithQuery() {
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());
  return <LanguageSwitcherNav query={query} />;
}

export function LanguageSwitcher() {
  return (
    <Suspense fallback={<LanguageSwitcherNav />}>
      <LanguageSwitcherWithQuery />
    </Suspense>
  );
}
