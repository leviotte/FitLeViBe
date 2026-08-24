import { headers } from "next/headers";
import { getLocale, getTranslations } from "next-intl/server";
import nl from "../../messages/nl.json";
import { htmlLangOf, isAppLocale } from "@/i18n/locales";
import { formatAddress, site } from "@/lib/site";

type FaqItem = { q: string; a: string };

async function currentPageUrl() {
  const headerList = await headers();
  const forwarded = headerList.get("x-public-url");
  if (forwarded) {
    try {
      const parsed = new URL(forwarded);
      return `${site.url}${parsed.pathname === "/" ? "" : parsed.pathname}`;
    } catch {
      /* fall through */
    }
  }
  const path = headerList.get("x-public-pathname") ?? "/";
  return `${site.url}${path === "/" ? "" : path}`;
}

export async function JsonLd() {
  const locale = await getLocale();
  const lang = isAppLocale(locale) ? htmlLangOf(locale) : "nl-BE";
  const t = await getTranslations();
  const jobTitle = t("Common.jobTitle");
  const description = t("Meta.site.defaultDescription");

  const address = {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    postalCode: site.address.postalCode,
    addressCountry: site.address.countryCode,
  };

  const origin = site.url;
  const url = await currentPageUrl();
  const isDutch = locale === "nl" || !isAppLocale(locale);

  const graph: Record<string, unknown>[] = [];

  if (isDutch) {
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
      name: t("Meta.site.defaultTitle"),
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
