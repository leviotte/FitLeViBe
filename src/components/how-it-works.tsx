const steps = [
  {
    n: "01",
    title: "Je vertelt waar je staat",
    body: "Je naam, gsm, en wat je wilt. Een zin extra mag, hoeft niet.",
  },
  {
    n: "02",
    title: "Ik neem contact op",
    body: "Geen chatbot. Een bericht of gesprek, om te horen hoe jouw dagen lopen.",
  },
  {
    n: "03",
    title: "We kijken samen",
    body: "Je krijgt een eerste richting. Lifestyle coaching — geen medisch advies, geen verplichting.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-sand/40">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="text-sm font-medium tracking-wide text-green">FitCheck</p>
        <h2 className="font-display mt-4 max-w-lg text-4xl leading-tight text-indigo sm:text-5xl">
          Liever eerst praten?
        </h2>
        <p className="mt-5 max-w-lg text-lg leading-8 text-muted">
          Dat mag. Een FitCheck is een kort, vrijblijvend gesprek.
        </p>
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
