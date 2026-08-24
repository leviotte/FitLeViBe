import { ImageResponse } from "next/og";
import { isAppLocale } from "@/i18n/locales";
import { routing } from "@/i18n/routing";
import en from "../../../messages/en.json";
import es from "../../../messages/es.json";
import fr from "../../../messages/fr.json";
import nl from "../../../messages/nl.json";

const catalogs = { nl, fr, en, es } as const;

export const alt = "Fit met Levi · Levi Otte";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isAppLocale(raw) ? raw : routing.defaultLocale;
  const copy = catalogs[locale];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F6F1E8",
          color: "#444566",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#1E9153",
            fontWeight: 600,
          }}
        >
          Levi Otte · Roosdaal
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 92,
              lineHeight: 0.95,
              fontWeight: 600,
            }}
          >
            Fit met Levi
          </div>
          <div style={{ fontSize: 28, color: "#5E5D72", maxWidth: 760 }}>
            {copy.Common.tagline}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#5E5D72" }}>
          fitlevibe.com
        </div>
      </div>
    ),
    { ...size },
  );
}
