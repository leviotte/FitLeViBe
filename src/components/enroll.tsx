"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";

type ButtonWidth = {
  children?: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
};

const widths = {
  auto: "w-full sm:w-auto",
  full: "w-full",
};

const primary =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-green px-7 text-center text-base font-semibold text-white shadow-[0_8px_24px_rgba(30,145,83,0.18)] transition hover:bg-green-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green";

const secondary =
  "inline-flex min-h-12 items-center justify-center rounded-full border border-indigo/15 bg-white px-7 text-center text-base font-semibold text-indigo transition hover:bg-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo";

const onDark =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-green px-7 text-center text-base font-semibold text-white transition hover:bg-green-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green";

type EnrollButtonProps = ButtonWidth & {
  id?: string;
  variant?: "primary" | "secondary" | "onDark";
};

export function StartButton({ children, className, fullWidth }: ButtonWidth) {
  const t = useTranslations("Common");
  const width = fullWidth ? widths.full : widths.auto;
  const classes = className ? `${primary} ${width} ${className}` : `${primary} ${width}`;

  return (
    <Link href="/start" className={classes}>
      {children ?? t("start")}
    </Link>
  );
}

export function EnrollButton({
  children,
  className,
  id,
  variant = "primary",
  fullWidth,
}: EnrollButtonProps) {
  const t = useTranslations("Common");
  const look = variant === "secondary" ? secondary : variant === "onDark" ? onDark : primary;
  const width = fullWidth ? widths.full : widths.auto;
  const classes = className ? `${look} ${width} ${className}` : `${look} ${width}`;

  return (
    <a id={id} href={site.enrollUrl} className={classes}>
      {children ?? t("enroll")}
    </a>
  );
}

export function TelegramButton({ className, fullWidth }: ButtonWidth) {
  const t = useTranslations("Common");
  const width = fullWidth ? widths.full : widths.auto;
  return (
    <a
      href={site.social.telegram}
      target="_blank"
      rel="noopener"
      className={className ?? `${secondary} ${width}`}
    >
      {t("telegram")}
    </a>
  );
}

export function EnrollDisclosure({ className }: { className?: string }) {
  const t = useTranslations("Common");
  return (
    <p className={className ?? "max-w-md text-sm leading-6 text-muted"}>
      {t("disclosureShort")}
    </p>
  );
}
