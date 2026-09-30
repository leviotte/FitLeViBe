"use client";

import { useEffect, useRef } from "react";

// Thumbsupp ops base, wave 1: one 404 beacon per page view (no deps, no query string, referrer as origin only).
// The ingest id is public; the env var can override it.
const URL_404 = "https://ingest.thumbsupp.com/v1/404";
const ID = process.env.NEXT_PUBLIC_THUMBSUPP_INGEST_ID || "flv";

export default function NotFoundBeacon() {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    try {
      let r = "";
      try {
        r = document.referrer ? new URL(document.referrer).origin : "";
      } catch {}
      const body = JSON.stringify({ s: ID, p: location.pathname, r });
      if (!(navigator.sendBeacon && navigator.sendBeacon(URL_404, body))) {
        fetch(URL_404, { method: "POST", body, keepalive: true, mode: "no-cors" }).catch(() => {});
      }
    } catch {}
  }, []);
  return null;
}
