import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { GOAL_IDS } from "@/lib/site";

export async function GoalCards() {
  const t = await getTranslations("Goals");

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28" id="doelen">
      <p className="text-sm font-medium tracking-wide text-green">{t("eyebrow")}</p>
      <h2 className="font-display mt-4 max-w-xl text-4xl leading-tight text-indigo sm:text-5xl">
        {t("title")}
      </h2>
      <p className="mt-5 max-w-xl text-lg leading-8 text-muted">{t("intro")}</p>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {GOAL_IDS.map((id) => (
          <article
            key={id}
            className="flex flex-col rounded-[1.75rem] border border-indigo/10 bg-white p-7"
          >
            <h3 className="font-display text-2xl text-indigo">{t(`${id}.title`)}</h3>
            <p className="mt-4 flex-1 text-base leading-7 text-muted">
              {t(`${id}.body`)}
            </p>
            <Link
              href={{ pathname: "/fitcheck", query: { doel: id } }}
              className="mt-8 inline-flex min-h-11 items-center text-sm font-semibold text-green hover:text-green-dark"
            >
              {t("cta")}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
