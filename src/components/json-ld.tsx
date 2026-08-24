import { headers } from "next/headers";
import { getLocale, getTranslations } from "next-intl/server";
import nl from "../../messages/nl.json";
import { htmlLangOf, isAppLocale } from "@/i18n/locales";
import { routing, type AppPathname } from "@/i18n/routing";
import { internalPathnameFromPublic, publicPath } from "@/lib/paths";
import { documentTitle, PAGE_META } from "@/lib/seo";
import { formatAddress, site } from "@/lib/site";

type FaqItem = { q: string; a: string };

function normalizePublicPath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname || "/";
}

async function publicPathname() {
  const headerList = await headers();
  const forwarded = headerList.get("x-public-url");
  if (forwarded) {
    try {
      return normalizePublicPath(new URL(forwarded).pathname);
    } catch {
      /* fall through */
    }
  }
  return normalizePublicPath(headerList.get("x-public-pathname") ?? "/");
}

async function currentPageUrl() {
  const path = await publicPathname();
  return path === "/" ? site.url : `${site.url}${path}`;
}

function isDutchHome(locale: string, pathname: string) {
  return (locale === "nl" || !isAppLocale(locale)) && pathname === "/";
}

function pageMatchesInternal(
  locale: string,
  pathname: string,
  internal: AppPathname,
) {
  const appLocale = isAppLocale(locale) ? locale : routing.defaultLocale;
  return normalizePublicPath(pathname) === publicPath(appLocale, internal);
}

export async function JsonLd() {
  const locale = await getLocale();
  const lang = isAppLocale(locale) ? htmlLangOf(locale) : "nl-BE";
  const t = await getTranslations();
  const metaT = await getTranslations("Meta");
  const jobTitle = t("Common.jobTitle");
  const pathname = await publicPathname();
  const internal = internalPathnameFromPublic(pathname);
  const knownPage = pageMatchesInternal(locale, pathname, internal);
  const meta = knownPage ? PAGE_META[internal] : null;
  const pageName = meta
    ? documentTitle(metaT(meta.titleKey), meta.absoluteTitle)
    : documentTitle(metaT("notFound.title"));
  const description = meta
    ? metaT(meta.descriptionKey)
    : metaT("notFound.description");

  const address = {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    postalCode: site.address.postalCode,
    addressCountry: site.address.countryCode,
  };

  const origin = site.url;
  const url = await currentPageUrl();

  const graph: Record<string, unknown>[] = [];

  if (isDutchHome(locale, pathname)) {
    graph.push({
      "@type": "LocalBusiness",
      "@id": `${origin}/#business`,
      name: site.publicName,
      alternateName: [site.legalHandle, site.personName],
      description: nl.Meta.site.defaultDescription,
      url: origin,
      telephone: site.phoneE164,
      image: `${origin}/opengraph-image`,
      address,
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Roosdaal",
        containedInPlace: {
          "@type": "Country",
          name: "Belgium",
        },
      },
      founder: { "@id": `${origin}/#person` },
      sameAs: [
        site.social.instagram,
        site.social.facebook,
        site.social.linkedin,
        site.social.telegram,
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        bestRating: "5",
        reviewCount: String(site.googleReviewCount),
      },
    });
  }

  graph.push(
    {
      "@type": "Person",
      "@id": `${origin}/#person`,
      name: site.personName,
      jobTitle,
      url: origin,
      telephone: site.phoneE164,
      address,
      sameAs: [site.social.instagram, site.social.facebook, site.social.linkedin],
      worksFor: { "@id": `${origin}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${origin}/#organization`,
      name: site.publicName,
      alternateName: site.legalHandle,
      url: origin,
      inLanguage: "nl-BE",
      description: nl.Meta.site.defaultDescription,
      address,
      telephone: site.phoneE164,
    },
    {
      "@type": "WebSite",
      "@id": `${origin}/#website`,
      url: origin,
      name: site.publicName,
      inLanguage: "nl-BE",
      description: nl.Meta.site.defaultDescription,
      publisher: { "@id": `${origin}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: pageName,
      description,
      inLanguage: lang,
      isPartOf: { "@id": `${origin}/#website` },
      about: { "@id": `${origin}/#person` },
    },
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }),
      }}
    />
  );
}

export async function FaqJsonLd() {
  const locale = await getLocale();
  const lang = isAppLocale(locale) ? htmlLangOf(locale) : "nl-BE";
  const t = await getTranslations("Faq");
  const faqs = t.raw("items") as FaqItem[];
  const url = await currentPageUrl();

  const graph = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    inLanguage: lang,
    isPartOf: { "@id": `${url}#webpage` },
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export async function Nap() {
  const t = await getTranslations("Common");
  return (
    <p className="sr-only">
      {site.personName}, {site.publicName}, {formatAddress(t("country"))},{" "}
      {site.phoneDisplay}
    </p>
  );
}
