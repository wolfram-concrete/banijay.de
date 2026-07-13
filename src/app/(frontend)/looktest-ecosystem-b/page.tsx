import { AlgarveEcosystemBurst } from "@/components/cinematic/algarve/EcosystemBurst";

// LOOKTEST — Ökosystem „Variante B" (Faser-Globus / Lichtfaser-Pusteblume).
// Am 13.07. von der Home genommen (dort läuft Variante A, die Atom-Orbits),
// hier als abrufbarer Look gesichert, falls wir ihn wieder brauchen
// (z. B. Ecosystem-Seite #67 oder Preloader #62).
export const metadata = { title: "Looktest · Ökosystem Variante B", robots: { index: false } };

export default function LooktestEcosystemB() {
  return (
    <main className="min-h-screen py-[20vh]">
      <AlgarveEcosystemBurst />
    </main>
  );
}
