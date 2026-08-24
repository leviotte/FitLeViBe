"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { StartButton } from "@/components/enroll";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";

export function HeaderBar({ languageSwitcher }: { languageSwitcher: ReactNode }) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Nav");

  const links = [
    { href: "/programmas" as const, label: t("programs") },
    { href: "/over" as const, label: t("about") },
    { href: "/fitcheck" as const, label: t("fitcheck") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-indigo/10 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3.5 sm:px-8">
        <Link
          href="/"
          className="font-display text-xl tracking-tight text-indigo sm:text-[1.35rem]"
        >
          {site.publicName}
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-indigo/80 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-indigo"
            >
              {link.label}
            </Link>
          ))}
          {languageSwitcher}
          <StartButton className="min-h-11 px-5 text-sm shadow-none" />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          {languageSwitcher}
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-indigo/15 bg-white/70 text-indigo"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? t("closeMenu") : t("openMenu")}</span>
            <span aria-hidden className="flex flex-col gap-1.5">
              <span className="block h-px w-5 bg-indigo" />
              <span className="block h-px w-5 bg-indigo" />
              <span className="block h-px w-3 bg-indigo" />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-indigo/10 bg-cream px-5 py-4 md:hidden"
        >
          <nav className="flex flex-col gap-1 text-base font-medium text-indigo">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-3 hover:bg-sand"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2" onClick={() => setOpen(false)}>
              <StartButton fullWidth />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
