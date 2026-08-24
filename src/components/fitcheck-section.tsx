import { FitCheckForm } from "@/components/fitcheck-form";
import type { GoalId } from "@/lib/site";

export function FitCheckSection({ defaultGoal }: { defaultGoal?: GoalId }) {
  return (
    <section className="bg-cream" id="fitcheck">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green">
            Gratis FitCheck
          </p>
          <h2 className="font-display mt-3 text-4xl leading-tight text-indigo sm:text-5xl">
            Vertel waar je naartoe wilt.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-8 text-muted">
            Voornaam en naam, gsm, en je doel. Ik neem contact op. Geen
            automatische inschrijving, geen medisch advies.
          </p>
        </div>
        <div className="lg:col-span-7">
          <FitCheckForm defaultGoal={defaultGoal} />
        </div>
      </div>
    </section>
  );
}
