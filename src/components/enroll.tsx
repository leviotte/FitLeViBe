import { site } from "@/lib/site";

type EnrollButtonProps = {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "primary" | "secondary" | "onDark";
  fullWidth?: boolean;
};

const variants = {
  primary:
    "inline-flex min-h-12 items-center justify-center rounded-full bg-green px-6 text-center text-base font-semibold text-white shadow-[0_8px_24px_rgba(30,145,83,0.22)] transition hover:bg-green-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green",
  secondary:
    "inline-flex min-h-12 items-center justify-center rounded-full border border-indigo/15 bg-white px-6 text-center text-base font-semibold text-indigo transition hover:bg-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo",
  onDark:
    "inline-flex min-h-12 items-center justify-center rounded-full bg-green px-6 text-center text-base font-semibold text-white transition hover:bg-green-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green",
};

export function EnrollButton({
  children,
  className,
  id,
  variant = "primary",
  fullWidth,
}: EnrollButtonProps) {
  const width = fullWidth ? "w-full" : "w-full sm:w-auto";
  const classes = className
    ? `${variants[variant]} ${width} ${className}`
    : `${variants[variant]} ${width}`;

  return (
    <a id={id} href={site.enrollUrl} className={classes}>
      {children ?? "Starten / inschrijven"}
    </a>
  );
}

export function TelegramButton({ className }: { className?: string }) {
  return (
    <a
      href={site.social.telegram}
      target="_blank"
      rel="noopener"
      className={
        className ??
        "inline-flex min-h-12 w-full items-center justify-center rounded-full border border-indigo/20 bg-white/70 px-6 text-center text-base font-semibold text-indigo transition hover:border-indigo/40 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo sm:w-auto"
      }
    >
      Telegram community
    </a>
  );
}

export function EnrollDisclosure({ className }: { className?: string }) {
  return (
    <p className={className ?? "max-w-md text-sm leading-6 text-muted"}>
      Onafhankelijk Herbalife-lid. Dit is geen officiële Herbalife-website.
    </p>
  );
}
