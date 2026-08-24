"use client";

import { usePathname } from "next/navigation";
import { StartButton } from "@/components/enroll";

export function StickyCta() {
  const pathname = usePathname();
  if (pathname === "/start") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-indigo/10 bg-cream/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <div className="mx-auto max-w-lg">
        <StartButton fullWidth className="min-h-12 shadow-none" />
      </div>
    </div>
  );
}
