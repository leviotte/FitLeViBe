import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["nl", "fr", "en", "es"],
  defaultLocale: "nl",
  localePrefix: "as-needed",
  /**
   * `/` is always Dutch. Explicit `/fr` `/en` `/es` are respected.
   * No Accept-Language or cookie redirects — humans and crawlers alike.
   */
  localeDetection: false,
  localeCookie: false,
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
