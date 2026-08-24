import { getTranslations } from "next-intl/server";
import { FitCheckForm } from "@/components/fitcheck-form";
import type { GoalId } from "@/lib/site";

export async function FitCheckSection({ defaultGoal }: { defaultGoal?: GoalId }) {
  const t = await getTranslations("FitCheck");

  return (
    <section className="bg-cream" id="fitcheck">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-sm font-medium tracking-wide text-green">{t("eyebrow")}</p>
          <h2 className="font-display mt-3 text-4xl leading-tight text-indigo sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-md text-lg leading-8 text-muted">{t("intro")}</p>
        </div>
        <div className="lg:col-span-7">
          <FitCheckForm key={defaultGoal ?? "open"} defaultGoal={defaultGoal} />
        </div>
      </div>
    </section>
  );
}
