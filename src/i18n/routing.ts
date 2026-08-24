import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["nl", "fr", "en", "es"],
  defaultLocale: "nl",
  localePrefix: "as-needed",
  /**
   * Proxy enables detection for humans only. Crawlers always see Dutch at `/`
   * and keep explicit `/fr` `/en` `/es`.
   */
  localeDetection: true,
  localeCookie: {
    name: "NEXT_LOCALE",
    maxAge: 60 * 60 * 24 * 365,
  },
  /** We emit hreflang ourselves (nl-BE + x-default = Dutch sibling). */
  alternateLinks: false,
  pathnames: {
    "/": "/",
    "/start": "/start",
    "/fitcheck": "/fitcheck",
    "/programmas": {
      nl: "/programmas",
      fr: "/programmes",
      en: "/programs",
      es: "/programas",
    },
    "/over": {
      nl: "/over",
      fr: "/a-propos",
      en: "/about",
      es: "/sobre",
    },
    "/privacy": {
      nl: "/privacy",
      fr: "/confidentialite",
      en: "/privacy",
      es: "/privacidad",
    },
  },
});

export type AppPathname = keyof typeof routing.pathnames;

export const pagePathnames = [
  "/",
  "/start",
  "/fitcheck",
  "/programmas",
  "/over",
  "/privacy",
] as const satisfies readonly AppPathname[];
