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
  // Echtes Portrait (Wolfram 17.07.) — löst den Platzhalter lead-3.jpg ab.
  // ACHTUNG, ANDERE ZAHL ALS UNTEN: Michael Laegel steht in der LEADER-Reihe, deren
  // Kacheln 248×182 (1.36) messen — nicht 142×138 (1.03) wie die Reihen darunter. Von
  // einem 0.75-Hochformat bleiben dort nur 55 % der Bildhöhe stehen (statt 73 %). Ein
  // 32 %-Kopf wie bei den anderen wäre hier auf 58 % der Kachelhöhe aufgeblasen worden.
  // Daher Kopf = 24 % der Ausschnitthöhe → 24/0.55 = 43,6 % der Kachel, das entspricht
  // Knut (~43 %). Ausschnitt 4200×5600 ab 218,0 (Kopf oben 570, Kinn 1914,
  // Gesichtsmitte x 2318). top auf 0 geklemmt, weil der Kopf nah am oberen Rand sitzt.
  { name: "Michael Laegel", role: "CFO", img: "/people/michael-laegel.jpg" },

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
  // Echtes Portrait (Wolfram 17.07.) — löst den Platzhalter lead-5.jpg ab.
  // Quelle assets/People/Michael Gaul.jpg, 3869×5815, wieder eine Ganzkörper-Aufnahme.
  // Beschnitten nach DERSELBEN Regel wie Aylin, damit die Proportionen in der Reihe
  // stimmen: Kopf = 32 % der Ausschnitthöhe, 12 % Luft darüber, Seitenverhältnis 0.75.
  // Ausschnitt 2489×3319 ab 0,1072 (aus Kopf oben 1470, Kinn 2532, Gesichtsmitte x 1208).
  // left auf 0 geklemmt, weil der rechnerische Wert negativ war — das Gesicht sitzt
  // dadurch bei 48,5 % statt exakt mittig, was optisch nicht auffällt.
  { name: "Michael Gaul", role: "Director Legal / General Counsel", img: "/people/michael-gaul.jpg" },
  // Echtes Portrait (Wolfram 17.07.) — löst den Platzhalter lead-7.jpg ab.
  // Beschnitten nach derselben Regel wie Aylin/Michael Gaul: Kopf = 32 % der
  // Ausschnitthöhe. Ausschnitt 2759×3678 ab 1639,737 (Kopf oben 1178, Kinn 2355,
  // Gesichtsmitte x 3018).
  // Die Quelldatei heißt „Sebastian lege.jpg" — das ist ein Benennungsfehler, von Wolfram
  // am 17.07. bestätigt: Es IST Sebastian Menge. (Nicht zu verwechseln mit Sebastian Lege,
  // dem Food-Experten hinter Pausenclown Media, siehe companyCards.ts.)
  { name: "Sebastian Menge", role: "Director Information Technology", img: "/people/sebastian-menge.jpg" },
  {
    // Echtes Portrait (Wolfram 17.07.) — löst den Platzhalter lead-9.jpg ab.
    // Beschnitten nach derselben Regel wie Aylin/Michael Gaul: Kopf = 32 % der
    // Ausschnitthöhe. Ausschnitt 3150×4200 ab 1056,802 (Kopf oben 1306, Kinn 2650,
    // Gesichtsmitte x 2631).
    name: "Matthaeus Jaworek",
    role: "Director Financial Planning, Reporting & Controlling",
    img: "/people/matthaeus-jaworek.jpg",
  },
];
