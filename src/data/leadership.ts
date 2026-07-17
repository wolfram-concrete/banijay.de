// Führungsteam Banijay Germany (Namen/Rollen aus dem Corporate-Snapshot).
// Bilder = B/W-Corporate-Shots als Platzhalter (9 Dateien, 11 Personen → 2 doppelt).
// CMS-ready: wird später eine Payload-Collection „leadership".
//
// DIE REIHENFOLGE IST DAS LAYOUT (Wolfram 17.07.) — Founders.tsx rendert stur nach
// Index, es gibt kein Zeilen-Feld:
//   Index 0–2   → Leader-Reihe oben, größere Kacheln (Marcus, Knut, Michael Laegel)
//   Index 3–7   → mittlere Reihe, fünf Kacheln
//   Index 8–10  → untere Reihe (füllt sich auf, wenn Personen dazukommen)
// Wolframs Regel für die mittlere Reihe: dort stehen die Frauen des Teams. Die
// Zuordnung ist NICHT aus den Daten belegbar — es gibt kein Geschlechtsfeld, und die
// Fotos sind Platzhalter (Marcus Wolter trägt aktuell das Bild einer Frau). Sie beruht
// auf den Vornamen und auf Wolframs Ansage, dass Heike Lutzer in die mittlere Reihe
// hochrutscht. Wer hier neu einsortiert wird, gehört gegengeprüft.

export interface Leader {
  name: string;
  role: string;
  img: string;
}

export const LEADERSHIP: Leader[] = [
  // ── Leader-Reihe (Index 0–2) ──────────────────────────────────────────────
  { name: "Marcus Wolter", role: "CEO", img: "/people/lead-1.jpg" },
  { name: "Knut Kremling", role: "COO", img: "/people/knut-kremling.jpg" },
  { name: "Michael Laegel", role: "CFO", img: "/people/lead-3.jpg" },

  // ── Mittlere Reihe (Index 3–7) ────────────────────────────────────────────
  { name: "Simone Lenzen", role: "Director Communications", img: "/people/simone-lenzen.jpg" },
  { name: "Natali Naso", role: "Director Human Resources", img: "/people/lead-6.jpg" },
  { name: "Heike Lutzer", role: "Director Marketing & Design", img: "/people/lead-8.jpg" },
  { name: "Janine Berns", role: "Director Accounting & Tax", img: "/people/lead-1.jpg" },
  // Echtes Portrait (Wolfram 17.07.) — löst den Platzhalter lead-2.jpg ab.
  // Quelle: assets/People/aylin.jpg (vormals „2026_07 Banijay _ Nick Harwart-9572-2.jpg";
  // Nick Harwart ist der Fotograf, nicht die abgebildete Person).
  // Original 3750×5636 ist eine GANZKÖRPER-Aufnahme; in der 142×138-Kachel wäre der Kopf
  // winzig gewesen, während alle Nachbarn Kopf-Schulter-Porträts sind. Daher beschnitten.
  // AUSSCHNITT „mittel" (Wolfram 17.07.): 1983×2644 ab 193,1037 — der Kopf füllt damit
  // ~32 % der Ausschnitthöhe. Aus den Gesichtskoordinaten gerechnet (Kopf oben 1354,
  // Kinn 2200, Gesichtsmitte x 1184), nicht geschätzt. Es gab auch eine engere Variante
  // (~38 %, Ausschnitt 1670×2226 ab 349,1087) — Wolfram wählte die mittlere.
  { name: "Aylin Firat", role: "Personal Assistant to CEO", img: "/people/aylin-firat.jpg" },

  // ── Untere Reihe (Index 8–10) ─────────────────────────────────────────────
  { name: "Michael Gaul", role: "Director Legal / General Counsel", img: "/people/lead-5.jpg" },
  { name: "Sebastian Menge", role: "Director Information Technology", img: "/people/lead-7.jpg" },
  {
    name: "Matthaeus Jaworek",
    role: "Director Financial Planning, Reporting & Controlling",
    img: "/people/lead-9.jpg",
  },
];
