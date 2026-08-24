import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Fraunces, Geist } from "next/font/google";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { StickyCta } from "@/components/sticky-cta";
import { htmlLangOf, isAppLocale, ogLocaleOf, otherOgLocales } from "@/i18n/locales";
import { routing } from "@/i18n/routing";
import { site } from "@/lib/site";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isAppLocale(raw) ? raw : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    metadataBase: new URL(site.url),
    applicationName: site.publicName,
    authors: [{ name: site.personName, url: site.social.linkedin }],
    creator: site.personName,
    keywords: t.raw("keywords") as string[],
    robots: { index: true, follow: true },
    title: {
      default: t("site.defaultTitle"),
      template: `%s · ${site.publicName}`,
    },
    description: t("site.defaultDescription"),
    openGraph: {
      type: "website",
      siteName: site.publicName,
      locale: ogLocaleOf(locale),
      alternateLocale: otherOgLocales(locale),
      images: [{ url: "/opengraph-image" }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={htmlLangOf(locale)}
      className={`${geist.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream pb-20 font-sans text-indigo md:pb-0">
        <NextIntlClientProvider messages={messages}>
          <JsonLd />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <StickyCta />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
