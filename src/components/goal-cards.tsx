import { getTranslations } from "next-intl/server";
import { SectionCta } from "@/components/fitcheck-cta";
import { Icon } from "@/components/icons";
import { Link } from "@/i18n/navigation";
import { GOAL_IDS } from "@/lib/site";

export async function GoalCards() {
  const t = await getTranslations("Goals");

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24" id="doelen">
      <p className="text-sm font-semibold tracking-wide text-green">{t("eyebrow")}</p>
      <h2 className="font-display mt-3 max-w-xl text-4xl leading-tight text-indigo sm:text-5xl">
        {t("title")}
      </h2>
      <p className="mt-5 max-w-xl text-lg leading-8 text-muted">{t("intro")}</p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GOAL_IDS.map((id) => (
          <li key={id}>
            <Link
              href={{ pathname: "/", query: { doel: id }, hash: "fitcheck" }}
              className="group flex h-full items-start gap-4 rounded-3xl border border-indigo/10 bg-white p-5 transition hover:border-green/40 hover:shadow-[0_8px_24px_rgba(68,69,102,0.08)] sm:p-6"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo text-cream">
                <Icon name={id} className="h-6 w-6" />
              </span>
              <span className="flex-1">
                <span className="block text-lg font-semibold text-indigo">{t(`${id}.title`)}</span>
                <span className="mt-1 block text-base leading-7 text-muted">{t(`${id}.body`)}</span>
                <span className="mt-3 inline-flex items-center text-sm font-semibold text-green group-hover:text-green-dark">
                  {t("cta")} →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <SectionCta />
    </section>
  );
}
