const steps = [
  {
    n: "01",
    title: "Je doel, in het kort",
    body: "Naam, gsm, en wat je wilt: gewicht, spieren of vitaliteit. Optioneel een zin over jouw situatie.",
  },
  {
    n: "02",
    title: "Levi neemt contact op",
    body: "Geen chatbot. Een bericht of gesprek, op menselijke toon, om te horen waar je staat.",
  },
  {
    n: "03",
    title: "Eerste richting",
    body: "Je krijgt een eerste kijk op wat zinvol is. Lifestyle coaching — geen medisch advies, geen verplichting.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-sand/50">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green">
          FitCheck
        </p>
        <h2 className="font-display mt-3 max-w-lg text-4xl leading-tight text-indigo sm:text-5xl">
          Drie stappen. Geen gedoe.
        </h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <li key={step.n}>
              <p className="font-display text-3xl text-green/80">{step.n}</p>
              <h3 className="mt-3 text-xl font-semibold text-indigo">{step.title}</h3>
              <p className="mt-2 text-base leading-7 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
