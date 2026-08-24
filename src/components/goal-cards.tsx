import Link from "next/link";
import { goalList } from "@/lib/site";

export function GoalCards() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28" id="doelen">
      <p className="text-sm font-medium tracking-wide text-green">Jouw richting</p>
      <h2 className="font-display mt-4 max-w-xl text-4xl leading-tight text-indigo sm:text-5xl">
        Wat wil je nu voor jezelf?
      </h2>
      <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
        Kies wat nu het meest klopt. Geen verplicht traject, geen gegarandeerde
        cijfers.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {goalList.map((goal) => (
          <article
            key={goal.id}
            className="flex flex-col rounded-[1.75rem] border border-indigo/10 bg-white p-7"
          >
            <h3 className="font-display text-2xl text-indigo">{goal.title}</h3>
            <p className="mt-4 flex-1 text-base leading-7 text-muted">{goal.body}</p>
            <Link
              href={goal.href}
              className="mt-8 inline-flex min-h-11 items-center text-sm font-semibold text-green hover:text-green-dark"
            >
              Eerst een FitCheck
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
