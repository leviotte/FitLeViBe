import Link from "next/link";
import { goalList } from "@/lib/site";

export function GoalCards() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24" id="doelen">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green">
        Wat is jouw doel?
      </p>
      <h2 className="font-display mt-3 max-w-xl text-4xl leading-tight text-indigo sm:text-5xl">
        Drie richtingen. Jouw ritme.
      </h2>
      <p className="mt-4 max-w-xl text-lg leading-8 text-muted">
        Kies wat nu het meest klopt. Elk programma start met een FitCheck — geen
        verplicht traject, geen gegarandeerde cijfers.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {goalList.map((goal, index) => (
          <article
            key={goal.id}
            className="flex flex-col rounded-[1.75rem] border border-indigo/10 bg-white p-6 transition hover:border-green/35"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              0{index + 1}
            </p>
            <h3 className="font-display mt-4 text-2xl text-indigo">{goal.title}</h3>
            <p className="mt-3 flex-1 text-base leading-7 text-muted">{goal.body}</p>
            <Link
              href={goal.href}
              className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-green hover:text-green-dark"
            >
              FitCheck voor dit doel
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
