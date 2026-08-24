import Link from "next/link";
import { EnrollButton, EnrollDisclosure, TelegramButton } from "@/components/enroll";
import { disclosure, formatAddress, site } from "@/lib/site";

export function Footer() {
  const address = formatAddress();

  return (
    <footer className="border-t border-indigo/10 bg-indigo text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-3xl text-cream">{site.publicName}</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-cream/75">
            {site.personName}, {site.jobTitle.toLowerCase()} in {site.address.city}.{" "}
            {site.tagline} Making you healthier and happier.
          </p>
          <p className="mt-6 text-xs tracking-wide text-cream/55">
            {site.legalHandle} · {site.personName}
          </p>
        </div>

        <div className="md:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cream/55">
            Contact
          </p>
          <address className="mt-3 not-italic text-sm leading-7 text-cream/90">
            <a href={`tel:${site.phoneE164}`} className="hover:text-white">
              {site.phoneDisplay}
            </a>
            <br />
            {address}
          </address>
          <ul className="mt-4 space-y-1 text-sm text-cream/80">
            <li>
              <a href={site.social.instagram} className="hover:text-white">
                Instagram {site.social.instagramHandle}
              </a>
            </li>
            <li>
              <a href={site.social.facebook} className="hover:text-white">
                Facebook {site.social.facebookHandle}
              </a>
            </li>
            <li>
              <a
                href={site.social.telegram}
                target="_blank"
                rel="noopener"
                className="hover:text-white"
              >
                Telegram community
              </a>
            </li>
            <li>
              <a href={site.social.linkedin} className="hover:text-white">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cream/55">
            Navigeren
          </p>
          <ul className="mt-3 space-y-2 text-sm text-cream/80">
            <li>
              <Link href="/programmas" className="hover:text-white">
                Programma&apos;s
              </Link>
            </li>
            <li>
              <Link href="/fitcheck" className="hover:text-white">
                Gratis FitCheck
              </Link>
            </li>
            <li>
              <Link href="/start" className="hover:text-white">
                Starten
              </Link>
            </li>
            <li>
              <Link href="/over" className="hover:text-white">
                Over Levi
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy
              </Link>
            </li>
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <EnrollButton variant="onDark" />
            <TelegramButton className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-cream/25 bg-transparent px-6 text-center text-sm font-semibold text-cream transition hover:bg-white/10 sm:w-auto" />
            <EnrollDisclosure className="text-xs leading-5 text-cream/55" />
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10 px-5 py-6 sm:px-8">
        <p className="mx-auto max-w-6xl text-xs leading-6 text-cream/55">
          {disclosure.footer}
        </p>
      </div>
    </footer>
  );
}
