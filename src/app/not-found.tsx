import Link from "next/link";
import type { Metadata } from "next";
import { headers } from "next/headers";
import NotFoundBeacon from "@/components/NotFoundBeacon";

const TITLES: Record<string, string> = {
  nl: "Pagina niet gevonden",
  fr: "Page introuvable",
  en: "Page not found",
  es: "Página no encontrada",
};

async function notFoundLang() {
  const h = await headers();
  // next-intl proxy sets the URL locale; dotted paths skip it, so fall back to Accept-Language.
  const al = `${h.get("x-next-intl-locale") || ""} ${h.get("accept-language") || ""}`.toLowerCase();
  const lang = al.match(/\b(nl|fr|en|es)\b/)?.[1] || "nl";
  return lang;
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await notFoundLang();
  return { title: { absolute: `${TITLES[lang]} | Fit met Levi` } };
}

export default function RootNotFound() {
  return (
    <html lang="nl-BE">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#F6F1E8", color: "#444566" }}>
        <NotFoundBeacon />
        <div style={{ maxWidth: 36 * 16, margin: "6rem auto", padding: "0 1.25rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "2rem" }}>Pagina niet gevonden</h1>
          <p style={{ marginTop: "1rem", color: "#5E5D72" }}>
            Die link bestaat niet (meer) op Fit met Levi.
          </p>
          <p style={{ marginTop: "2rem" }}>
            <Link href="/" style={{ color: "#1E9153", fontWeight: 600 }}>
              Terug naar home
            </Link>
            {" · "}
            <Link href="/fr" style={{ color: "#1E9153", fontWeight: 600 }}>
              Accueil
            </Link>
            {" · "}
            <Link href="/en" style={{ color: "#1E9153", fontWeight: 600 }}>
              Home
            </Link>
            {" · "}
            <Link href="/es" style={{ color: "#1E9153", fontWeight: 600 }}>
              Inicio
            </Link>
          </p>
        </div>
      </body>
    </html>
  );
}
