"use client";

import Link from "next/link";
import { useState } from "react";
import { EnrollButton } from "@/components/enroll";
import { site } from "@/lib/site";

const links = [
  { href: "/programmas", label: "Programma's" },
  { href: "/over", label: "Over Levi" },
  { href: "/fitcheck", label: "FitCheck" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-indigo/10 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link
          href="/"
          className="font-display text-xl tracking-tight text-indigo sm:text-[1.35rem]"
        >
          {site.publicName}
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-indigo/80 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-indigo"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/start" className="transition hover:text-indigo">
            Starten
          </Link>
          <EnrollButton className="min-h-11 px-5 text-sm" />
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-indigo/15 bg-white/70 text-indigo md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Menu sluiten" : "Menu openen"}</span>
          <span aria-hidden className="flex flex-col gap-1.5">
            <span className="block h-px w-5 bg-indigo" />
            <span className="block h-px w-5 bg-indigo" />
            <span className="block h-px w-3 bg-indigo" />
          </span>
        </button>
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
            <Link
              href="/start"
              className="rounded-xl px-3 py-3 hover:bg-sand"
              onClick={() => setOpen(false)}
            >
              Starten
            </Link>
            <div className="pt-2">
              <EnrollButton />
              <p className="mt-3 px-1 text-sm leading-5 text-muted">
                Onafhankelijk Herbalife-lid. Dit is geen officiële
                Herbalife-website.
              </p>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
