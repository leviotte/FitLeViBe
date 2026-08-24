import { site } from "@/lib/site";

const items = [
  { label: site.address.city, detail: "België" },
  { label: `Sinds ${site.foundedYear}`, detail: "persoonlijk coach" },
  { label: `Google ${site.googleRating}`, detail: "publieke reviews" },
];

export function TrustRow() {
  return (
    <section className="border-y border-indigo/10 bg-sand/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:grid-cols-3 sm:px-8 sm:py-14">
        {items.map((item) => (
          <div key={item.label}>
            <p className="font-display text-2xl text-indigo sm:text-3xl">{item.label}</p>
            <p className="mt-1.5 text-sm text-muted">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
