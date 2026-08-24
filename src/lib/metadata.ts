import type { Metadata } from "next";
import { site } from "@/lib/site";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.publicName} · ${site.personName}, coach in Roosdaal`,
    template: `%s · ${site.publicName}`,
  },
  description: site.description,
  applicationName: site.publicName,
  authors: [{ name: site.personName, url: site.social.linkedin }],
  creator: site.personName,
  keywords: [
    "Fit met Levi",
    "Levi Otte",
    "persoonlijk coach Roosdaal",
    "FitCheck",
    "FitLeViBe",
    "coaching België",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "nl_BE",
    url: site.url,
    siteName: site.publicName,
    title: `${site.publicName} · ${site.personName}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.publicName} · ${site.personName}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function pageMeta(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${site.publicName}`,
      description,
      url: path,
      locale: "nl_BE",
    },
    twitter: {
      title: `${title} · ${site.publicName}`,
      description,
    },
  };
}
