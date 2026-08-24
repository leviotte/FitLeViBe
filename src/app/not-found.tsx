import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="font-display text-4xl text-indigo">Pagina niet gevonden</h1>
      <p className="mt-4 text-muted">Die link bestaat niet (meer) op Fit met Levi.</p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-green px-6 font-semibold text-white"
      >
        Terug naar home
      </Link>
    </div>
  );
}
