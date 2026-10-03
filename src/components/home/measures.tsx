import { getTranslations } from "next-intl/server";
import { SectionCta } from "@/components/fitcheck-cta";
import { Icon, type IconName } from "@/components/icons";

type Item = { key: IconName; title: string; body: string };

export async function Measures() {
  const t = await getTranslations("Measures");
  const items = t.raw("items") as Item[];

  return (
    <section className="border-y border-indigo/10 bg-paper" id="meting">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-sm font-semibold tracking-wide text-green">{t("eyebrow")}</p>
        <h2 className="font-display mt-3 max-w-xl text-4xl leading-tight text-indigo sm:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-8 text-muted">{t("intro")}</p>
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.key} className="rounded-3xl border border-indigo/10 bg-white p-5 sm:p-7">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-green/10 text-green">
                <Icon name={item.key} className="h-7 w-7" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-indigo sm:text-xl">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted sm:text-base sm:leading-7">{item.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-base text-indigo">{t("more")}</p>
        <p className="mt-1 text-sm text-muted">{t("note")}</p>
        <SectionCta />
      </div>
    </section>
  );
}
