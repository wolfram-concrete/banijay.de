// Führungsteam Banijay Germany (Namen/Rollen aus dem Corporate-Snapshot).
// Bilder = B/W-Corporate-Shots als Platzhalter (9 Dateien, 11 Personen → 2 doppelt).
// CMS-ready: wird später eine Payload-Collection „leadership".
//
// DIE REIHENFOLGE IST DAS LAYOUT (Wolfram 17.07.) — Founders.tsx rendert stur nach
// Index, es gibt kein Zeilen-Feld:
//   Index 0–2   → Leader-Reihe oben, größere Kacheln (Marcus, Knut, Michael Laegel)
//   Index 3–6   → mittlere Reihe (Simone, Natali, Heike, Janine)
//   Index 7–11  → untere Reihe (Elena, die drei Männer, Aylin als Letzte)
// Aylin Firat steht seit 20.07. GANZ HINTEN (Wolfram) — vorher Index 7.
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
  // Echtes Portrait (Wolfram 21.07.) — löst den Platzhalter lead-1.jpg ab (den Janine
  // Berns weiter trägt). Quelle assets/People/Marcus.JPG (3804×5706, Ganzkörper), auf die
  // LEADER-Kachel (1.207 Querformat) beschnitten. Fokuswert 14 % (s. Founders FOCUS).
  // Nachskaliert (Wolfram 21.07., 2. Runde): Kopf +15 % (aus dem vorigen 900×1200-Crop
  // um den Kinnpunkt gezoomt) → näher an Knut.
  { name: "Marcus Wolter", role: "CEO", img: "/people/marcus-wolter.jpg" },
  { name: "Knut Kremling", role: "COO", img: "/people/knut-kremling.jpg" },
  // Echtes Portrait (Wolfram 17.07.) — löst den Platzhalter lead-3.jpg ab.
  // ACHTUNG, ANDERE ZAHL ALS UNTEN: Michael Laegel steht in der LEADER-Reihe, deren
  // Kacheln 248×182 (1.36) messen — nicht 142×138 (1.03) wie die Reihen darunter. Von
  // einem 0.75-Hochformat bleiben dort nur 55 % der Bildhöhe stehen (statt 73 %). Ein
  // 32 %-Kopf wie bei den anderen wäre hier auf 58 % der Kachelhöhe aufgeblasen worden.
  // Daher Kopf = 24 % der Ausschnitthöhe → 24/0.55 = 43,6 % der Kachel, das entspricht
  // Knut (~43 %). Nachskaliert (Wolfram 21.07., 2. Runde): Kopf −15 % + auf die Leader-
  // Kinnlinie (~49 % der Kachel) gehoben — frisch aus assets/People/Michael Laegel.jpg
  // (4912×7360) beschnitten: extract(839,1629,2283,3043).
  { name: "Michael Laegel", role: "CFO", img: "/people/michael-laegel.jpg" },

  // ── Mittlere Reihe (Index 3–7) ────────────────────────────────────────────
  // KOPF-NORMALISIERUNG DER MITTLEREN REIHE + Aylin (Wolfram 21.07., 2. Fassung):
  // Gesichter höher gerückt (mehr Körper unten) + Kopfgrößen an MATTHÄUS (Referenz)
  // angeglichen. Methode: Kachel = object-fit cover 0.891 @ object-position 50% 18% →
  // sichtbares Source-Fenster [34,1043] von 1200. Zielwerte im 900×1200-Output:
  // Haaransatz ≈ Zeile 175 (Kachel-14 %), Kinn ≈ Zeile 508, Kopfhöhe ≈ 333 px (≈ 33 %).
  // Natali/Heike/Elena wurden aus den vorigen 900×1200-Crops nachgeschärft (höher +
  // etwas größer), Simone/Aylin frisch aus den Originalen (verkleinert).
  // Simone (assets/People/Simone Lenzen.jpg, 4024×6048): extract(0,79,4024,5365). Ihr
  // Original ist ein enger Close-up (Kopf füllt die volle Bildbreite) → breitenbegrenzt,
  // Kopf bleibt bei ~40 % (kleiner geht physikalisch nicht), sitzt jetzt aber höher.
  { name: "Simone Lenzen", role: "Director Communications", img: "/people/simone-lenzen.jpg" },
  // POSITIONEN GETAUSCHT (Wolfram 21.07.): Heike vor Natali.
  // heike-lutzer.jpg: höher gerückt, dann Kopf +20 % (Wolfram 21.07., 2. Runde — um den
  // Kinnpunkt aus dem vorigen 900×1200-Crop gezoomt).
  { name: "Heike Lutzer", role: "Director Marketing & Design", img: "/people/heike-lutzer.jpg" },
  // natali-naso.jpg: aus dem vorigen Crop höher + größer nachgeschärft (~31 %, war ~28 %).
  { name: "Natali Naso", role: "Director Human Resources", img: "/people/natali-naso.jpg" },
  // Echtes Portrait (Wolfram 21.07.) — löst den Platzhalter lead-1.jpg ab. Quelle
  // assets/People/Janine.jpg (4912×7360), nach der Reihen-Norm beschnitten: Kopf ~33 %,
  // Kinn auf Output-Zeile 508, höher gerückt. extract(411,143,3378,4505).
  { name: "Janine Berns", role: "Director Accounting & Tax", img: "/people/janine-berns.jpg" },
  // Elena Kats (Wolfram 17.07.) — neue, zwölfte Person, „als Letzte von den Frauen"
  // eingefügt; die Männer rücken dadurch einen Index nach hinten. Dadurch ist die
  // mittlere Reihe weiter mit den 5 bisherigen Frauen voll, Elena eröffnet die untere
  // Reihe (Grid jetzt 3 / 5 / 4). Name + Rolle nachgetragen (Wolfram 19.07.).
  // Kopf-Normalisierung 21.07. (s. o. bei Simone): elena-kats.jpg höher gerückt (~32 %,
  // Kinn auf der Linie). Basis war der Crop aus assets/People/Elena.jpg (4912×7360).
  { name: "Elena Kats", role: "Director Finance Projects & Business Systems", img: "/people/elena-kats.jpg" },

  // ── Untere Reihe (Index 9–11) ─────────────────────────────────────────────
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
    // Neues Portrait (Wolfram 21.07.) — löst die vorige Fassung ab. Quelle
    // assets/People/Matthaeus.jpg (4912×7360, Ganzkörper an Industrie-Wand). Beschnitten
    // nach der Kopf-Normalisierung 21.07. (wie die mittlere Reihe): Kinn auf der Linie,
    // fluchtet mit Sebastian Menge. Nachskaliert (Wolfram 21.07., 2. Runde): Kopf +20 %
    // (um den Kinnpunkt aus dem vorigen 900×1200-Crop gezoomt).
    name: "Matthaeus Jaworek",
    role: "Director Financial Planning, Reporting & Controlling",
    img: "/people/matthaeus-jaworek.jpg",
  },
  // AYLIN STEHT GANZ HINTEN (Wolfram 20.07.) — vorher Index 7 (Ende der mittleren
  // Reihe), jetzt als letzte Kachel des Grids. Dadurch rücken Elena und die drei
  // Männer je einen Index nach vorn.
  // Quelle: assets/People/Aylin.jpg (4024×6048; vormals „2026_07 Banijay _ Nick Harwart-
  // 9572-2.jpg" — Nick Harwart ist der Fotograf, nicht die abgebildete Person).
  // Kopf-Normalisierung 21.07.: verkleinert, höher gerückt. Nachjustiert (Wolfram 21.07.,
  // 2. Runde): Kopf +10 % UND nochmal höher gesetzt (um den Kinnpunkt gezoomt + Fenster
  // nach unten verschoben, sodass mehr Körper unten steht).
  { name: "Aylin Firat", role: "Personal Assistant to CEO", img: "/people/aylin-firat.jpg" },
];
