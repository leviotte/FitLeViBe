import { getTranslations } from "next-intl/server";
import { FitCheckForm } from "@/components/fitcheck-form";
import { Icon } from "@/components/icons";
import type { GoalId } from "@/lib/site";

export async function FitCheckSection({ defaultGoal }: { defaultGoal?: GoalId }) {
  const t = await getTranslations("FitCheck");
  const bullets = [t("bullets.free"), t("bullets.measure"), t("bullets.advice")];

  return (
    <section className="scroll-mt-20 bg-green/[0.07]" id="fitcheck">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="text-sm font-semibold tracking-wide text-green">{t("eyebrow")}</p>
          <h2 className="font-display mt-3 text-4xl leading-tight text-indigo sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-md text-lg leading-8 text-muted">{t("intro")}</p>
          <ul className="mt-6 grid gap-3 text-base text-indigo">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2.5">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green text-white">
                  <Icon name="check" className="h-4 w-4" />
                </span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-7">
          <FitCheckForm key={defaultGoal ?? "open"} defaultGoal={defaultGoal} />
        </div>
      </div>
    </section>
  );
}
