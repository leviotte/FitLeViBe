import { site } from "@/lib/site";

const items = [
  { label: site.address.city, detail: "ter plaatse, buiten of online" },
  { label: `Sinds ${site.foundedYear}`, detail: "persoonlijk coach" },
  { label: `Google ${site.googleRating}`, detail: `${site.googleReviewCount} publieke reviews` },
];

export function TrustRow() {
  return (
    <section className="border-y border-indigo/10 bg-sand/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-3 sm:px-8">
        {items.map((item) => (
          <div key={item.label}>
            <p className="font-display text-2xl text-indigo">{item.label}</p>
            <p className="mt-1 text-sm text-muted">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
