"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const base =
  "inline-flex items-center justify-center rounded-full bg-green text-center font-semibold text-white transition hover:bg-green-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green";

const sizes = {
  lg: "min-h-14 px-7 text-lg shadow-[0_10px_28px_rgba(30,145,83,0.28)]",
  md: "min-h-12 px-6 text-base",
  sm: "min-h-11 px-5 text-sm",
};

type Props = {
  className?: string;
  fullWidth?: boolean;
  short?: boolean;
  size?: keyof typeof sizes;
  children?: React.ReactNode;
};

/** The one primary action: jump to the FitCheck form (homepage, or in-page on /fitcheck). */
export function FitCheckCta({ className, fullWidth, short, size = "lg", children }: Props) {
  const t = useTranslations("Cta");
  const pathname = usePathname();
  const width = fullWidth ? "w-full" : "w-full sm:w-auto";
  const target = pathname === "/fitcheck" ? ("/fitcheck" as const) : ("/" as const);
  return (
    <Link
      href={{ pathname: target, hash: "fitcheck" }}
      className={`${base} ${sizes[size]} ${width} ${className ?? ""}`}
    >
      {children ?? (short ? t("short") : t("label"))}
    </Link>
  );
}

/** CTA block repeated after every homepage section. */
export function SectionCta({ className }: { className?: string }) {
  const t = useTranslations("Cta");
  return (
    <div className={`mt-12 flex flex-col items-center gap-3 text-center ${className ?? ""}`}>
      <FitCheckCta />
      <p className="text-sm text-muted">{t("note")}</p>
    </div>
  );
}
