// SEO budget: document titles ≤60 (incl. " · Fit met Levi" template), home/about metas 140–160.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const SUFFIX = " · Fit met Levi";
for (const locale of ["nl", "fr", "en"]) {
  const meta = JSON.parse(readFileSync(new URL(`../messages/${locale}.json`, import.meta.url), "utf8")).Meta;
  for (const key of ["home", "start", "fitcheck", "programs", "about"]) {
    test(`${locale}:${key}`, () => {
      const { title, description } = meta[key];
      const full = title.includes("Fit met Levi") ? title : title + SUFFIX;
      assert.ok(full.length <= 60, `title ${full.length}: ${full}`);
      if (key === "home" || key === "about") {
        assert.ok(description.length >= 140 && description.length <= 160, `meta ${description.length}: ${description}`);
      }
      assert.doesNotMatch(description, /Roosdaal/);
    });
  }
}
