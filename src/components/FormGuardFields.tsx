"use client";

import { useEffect, useRef } from "react";

/**
 * Thumbsupp ops base (wave 2): hidden anti-spam fields for a form.
 *  - `website`: honeypot, off-screen and skipped by keyboard/screen readers; humans leave it empty.
 *  - `_ft`: client time when the form mounted, so the server can compute the elapsed time.
 * `honeypot={false}` when the form already renders its own `website` honeypot.
 */
export default function FormGuardFields({ honeypot = true }: { honeypot?: boolean }) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.value = String(Date.now());
  }, []);
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
      {honeypot && (
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      )}
      <input ref={ref} type="hidden" name="_ft" defaultValue="" />
    </div>
  );
}
