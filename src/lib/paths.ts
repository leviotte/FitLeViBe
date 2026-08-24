import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathname } from "@/i18n/routing";
import type { AppLocale } from "@/i18n/locales";

/** Public pathname for a locale, never `/nl/...` (Dutch is unprefixed). */
export function publicPath(locale: AppLocale, href: AppPathname): string {
  const path = getPathname({ locale, href });
  const prefix = `/${routing.defaultLocale}`;
  if (
    locale === routing.defaultLocale &&
    (path === prefix || path.startsWith(`${prefix}/`))
  ) {
    const stripped = path.slice(prefix.length);
    return stripped.length > 0 ? stripped : "/";
  }
  return path;
}

export function publicHref(
  locale: AppLocale,
  href: AppPathname,
  query?: Record<string, string>,
): string {
  const path = publicPath(locale, href);
  if (!query) return path;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value) params.set(key, value);
  }
  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
}

function stripLocalePrefix(pathname: string): string {
  for (const locale of routing.locales) {
    if (locale === routing.defaultLocale) continue;
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1);
    }
  }
  return pathname || "/";
}

/** Map a public URL path to the internal pathname key. */
export function internalPathnameFromPublic(pathname: string): AppPathname {
  const stripped = stripLocalePrefix(pathname);
  const normalized = stripped.length > 1 && stripped.endsWith("/")
    ? stripped.slice(0, -1)
    : stripped || "/";

  for (const [internal, external] of Object.entries(routing.pathnames)) {
    if (typeof external === "string") {
      if (normalized === external) return internal as AppPathname;
      continue;
    }
    for (const locale of routing.locales) {
      const candidate = external[locale];
      if (candidate && normalized === candidate) {
        return internal as AppPathname;
      }
    }
  }

  return "/";
}
