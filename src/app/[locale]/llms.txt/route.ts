import { hasLocale } from "next-intl";
import { htmlLangOf, isAppLocale } from "@/i18n/locales";
import { publicPath } from "@/lib/paths";
import { pagePathnames, routing, type AppPathname } from "@/i18n/routing";
import { site } from "@/lib/site";
import en from "../../../../messages/en.json";
import fr from "../../../../messages/fr.json";
import nl from "../../../../messages/nl.json";

const catalogs = { nl, fr, en } as const;

const pageMetaKey = {
  "/": "home",
  "/start": "start",
  "/fitcheck": "fitcheck",
  "/programmas": "programs",
  "/over": "about",
  "/privacy": "privacy",
} as const satisfies Record<AppPathname, keyof (typeof nl)["Meta"]>;

const pageNavKey = {
  "/": "home",
  "/start": "start",
  "/fitcheck": "fitcheck",
  "/programmas": "programs",
  "/over": "about",
  "/privacy": "privacy",
} as const satisfies Record<AppPathname, keyof (typeof nl)["Nav"]>;

function url(locale: (typeof routing.locales)[number], href: AppPathname) {
  return `${site.url}${publicPath(locale, href)}`;
}

/** First sentence of an existing meta description — no new claims. */
function shortDesc(text: string) {
  const trimmed = text.trim();
  const m = trimmed.match(/^(.+?[.!?])(?:\s|$)/);
  return (m ? m[1] : trimmed).trim();
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale: raw } = await params;
  const locale = hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;
  const copy = catalogs[locale];
  const lang = isAppLocale(locale) ? htmlLangOf(locale) : "nl-BE";

  const pageLines = pagePathnames.map((href) => {
    const label = copy.Nav[pageNavKey[href]];
    const desc = shortDesc(copy.Meta[pageMetaKey[href]].description);
    return `- [${label}](${url(locale, href)}): ${desc}`;
  });

  const lines = [
    `# Fit met Levi`,
    ``,
    `> ${copy.Meta.site.defaultDescription}`,
    ``,
    `Public name: **Fit met Levi**. Person: **Levi Otte**. Handle: FitLeViBe.`,
    `NAP (Belgium only): ${site.address.street}, ${site.address.postalCode} ${site.address.city}, ${copy.Common.country}. ${site.phoneDisplay}.`,
    `Language of this file: ${lang}. Home market: Belgium. Other locales are language editions, not extra offices.`,
    `FitCheck, follow-up and coaching: online or offline, but always personal (by appointment). The address is the business location, not the only place coaching happens.`,
    ``,
    `## Locales`,
    `- [Dutch (nl-BE, default)](${url("nl", "/")}): Fit met Levi home in Dutch`,
    `- [French](${url("fr", "/")}): Fit met Levi en français`,
    `- [English](${url("en", "/")}): Fit met Levi in English`,
    ``,
    `## Pages (${lang})`,
    ...pageLines,
    ``,
    `## Contact`,
    `- [Telegram (only)](${site.social.telegram}): chat`,
    `- Instagram / Facebook: ${site.social.instagramHandle}`,
    `- [LinkedIn](${site.social.linkedin}): Levi Otte`,
    `- FitCheck inbox: ${site.email}`,
    ``,
    `Enroll uses the independent-member signup URL on /start (query locale stays nl-BE). Do not invent other Telegram bots, addresses, phones, or Herbalife corporate URLs.`,
    `No income claims. No medical or guaranteed weight-loss claims.`,
  ];

  return new Response(lines.join("\n") + "\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
