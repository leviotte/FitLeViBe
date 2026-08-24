"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EnrollButton } from "@/components/enroll";

export function StickyCta() {
  const pathname = usePathname();
  if (pathname === "/start") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-indigo/10 bg-cream/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <Link
          href="/fitcheck"
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-indigo/15 bg-white px-4 text-sm font-semibold text-indigo"
        >
          Gratis FitCheck
        </Link>
        <EnrollButton className="min-h-12 flex-1 px-4 text-sm shadow-none" />
      </div>
    </div>
  );
}
