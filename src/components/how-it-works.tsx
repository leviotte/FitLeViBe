import { getTranslations } from "next-intl/server";
import { SectionCta } from "@/components/fitcheck-cta";

type Step = { n: string; title: string; body: string };

export async function HowItWorks() {
  const t = await getTranslations("How");
  const steps = t.raw("steps") as Step[];

  return (
    <section className="bg-sand/40" id="hoe">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-sm font-semibold tracking-wide text-green">{t("eyebrow")}</p>
        <h2 className="font-display mt-3 max-w-lg text-4xl leading-tight text-indigo sm:text-5xl">
          {t("title")}
        </h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
          {steps.map((step) => (
            <li key={step.n} className="rounded-3xl border border-indigo/10 bg-white p-6 sm:p-7">
              <span className="font-display inline-flex h-12 w-12 items-center justify-center rounded-full bg-green text-2xl text-white">
                {step.n}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-indigo">{step.title}</h3>
              <p className="mt-2 text-base leading-7 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6 rounded-3xl border border-dashed border-indigo/20 p-6 sm:p-7">
          <h3 className="text-lg font-semibold text-indigo">{t("followupTitle")}</h3>
          <p className="mt-1.5 text-base leading-7 text-muted">{t("followup")}</p>
        </div>
        <SectionCta />
      </div>
    </section>
  );
}
