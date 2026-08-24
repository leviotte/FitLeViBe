import { faqs } from "@/lib/site";

export function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24" id="faq">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green">
        Vragen
      </p>
      <h2 className="font-display mt-3 text-4xl leading-tight text-indigo sm:text-5xl">
        Kort en duidelijk.
      </h2>
      <div className="mt-10 divide-y divide-indigo/10 border-y border-indigo/10">
        {faqs.map((item) => (
          <details key={item.q} className="group py-5">
            <summary className="cursor-pointer list-none text-lg font-semibold text-indigo marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-4">
                {item.q}
                <span className="mt-1 text-green transition group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 max-w-prose pr-8 text-base leading-7 text-muted">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
