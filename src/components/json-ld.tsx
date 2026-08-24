import { faqs, formatAddress, site } from "@/lib/site";

export function JsonLd() {
  const address = {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    postalCode: site.address.postalCode,
    addressCountry: site.address.countryCode,
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${site.url}/#business`,
        name: site.publicName,
        alternateName: [site.legalHandle, site.personName],
        description: site.description,
        url: site.url,
        telephone: site.phoneE164,
        image: `${site.url}/opengraph-image`,
        address,
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Roosdaal",
        },
        founder: { "@id": `${site.url}/#person` },
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
      },
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.personName,
        jobTitle: site.jobTitle,
        url: site.url,
        telephone: site.phoneE164,
        address,
        sameAs: [
          site.social.instagram,
          site.social.facebook,
          site.social.linkedin,
        ],
        worksFor: { "@id": `${site.url}/#business` },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.publicName,
        inLanguage: "nl-BE",
        publisher: { "@id": `${site.url}/#business` },
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}/#faq`,
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export function Nap() {
  return (
    <p className="sr-only">
      {site.personName}, {site.publicName}, {formatAddress()}, {site.phoneDisplay}
    </p>
  );
}
