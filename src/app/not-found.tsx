import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="nl-BE">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#F6F1E8", color: "#444566" }}>
        <div style={{ maxWidth: 36 * 16, margin: "6rem auto", padding: "0 1.25rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "2rem" }}>Pagina niet gevonden</h1>
          <p style={{ marginTop: "1rem", color: "#5E5D72" }}>
            Die link bestaat niet (meer) op Fit met Levi.
          </p>
          <p style={{ marginTop: "2rem" }}>
            <Link href="/" style={{ color: "#1E9153", fontWeight: 600 }}>
              Terug naar home
            </Link>
            {" · "}
            <Link href="/fr" style={{ color: "#1E9153", fontWeight: 600 }}>
              Accueil
            </Link>
            {" · "}
            <Link href="/en" style={{ color: "#1E9153", fontWeight: 600 }}>
              Home
            </Link>
            {" · "}
            <Link href="/es" style={{ color: "#1E9153", fontWeight: 600 }}>
              Inicio
            </Link>
          </p>
        </div>
      </body>
    </html>
  );
}
