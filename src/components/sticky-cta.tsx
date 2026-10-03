"use client";

import { useEffect, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import { FitCheckCta } from "@/components/fitcheck-cta";

/** Mobile-only sticky CTA. Hides while the FitCheck form itself is on screen. */
export function StickyCta() {
  const pathname = usePathname();
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById("fitcheck");
    if (!form || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setFormVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, [pathname]);

  if (pathname === "/start" || pathname === "/fitcheck") return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-indigo/10 bg-cream/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-200 md:hidden ${
        formVisible ? "translate-y-full" : ""
      }`}
      aria-hidden={formVisible ? true : undefined}
    >
      <div className="mx-auto max-w-lg">
        <FitCheckCta fullWidth size="md" />
      </div>
    </div>
  );
}
