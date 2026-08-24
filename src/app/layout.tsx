import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { StickyCta } from "@/components/sticky-cta";
import { defaultMetadata } from "@/lib/metadata";
import "./globals.css";

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

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="nl-BE"
      className={`${geist.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream pb-20 font-sans text-indigo md:pb-0">
        <JsonLd />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyCta />
      </body>
    </html>
  );
}
