import { getTranslations } from "next-intl/server";

type Step = { n: string; title: string; body: string };

export async function HowItWorks() {
  const t = await getTranslations("How");
  const steps = t.raw("steps") as Step[];

  return (
    <section className="bg-sand/40">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="text-sm font-medium tracking-wide text-green">{t("eyebrow")}</p>
        <h2 className="font-display mt-4 max-w-lg text-4xl leading-tight text-indigo sm:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-5 max-w-lg text-lg leading-8 text-muted">{t("intro")}</p>
        <ol className="mt-14 grid gap-10 md:grid-cols-3">
          {steps.map((step) => (
            <li key={step.n}>
              <p className="font-display text-3xl text-green/70">{step.n}</p>
              <h3 className="mt-4 text-xl font-semibold text-indigo">{step.title}</h3>
              <p className="mt-2 text-base leading-7 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
