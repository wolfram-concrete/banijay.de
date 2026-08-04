// Fokuspunkte (object-position) je Team-Porträt für die Snap-Team-Section.
// Leader-Reihe (Marcus/Knut/Michael Laegel/Arno Schneppenheim, 900×1200) sitzt etwas tiefer (14 %), die
// Standard-Porträts (900×1353) sind oben/seitlich bündig (0 %). Fallback 50% 20%.
export const FOCUS: Record<string, string> = {
  "/people/marcus-wolter.webp": "50% 14%",
  "/people/knut-kremling.webp": "50% 14%",
  "/people/michael-laegel.webp": "50% 14%",
  "/people/arno-schneppenheim.webp": "50% 14%",
  "/people/simone-lenzen.webp": "50% 0%",
  "/people/heike-lutzer.webp": "50% 0%",
  "/people/natali-naso.webp": "50% 0%",
  "/people/janine-berns.webp": "50% 0%",
  "/people/michael-gaul.webp": "50% 0%",
  "/people/elena-kats.webp": "50% 0%",
  "/people/sebastian-menge.webp": "50% 0%",
  "/people/matthaeus-jaworek.webp": "50% 0%",
  "/people/aylin-firat.webp": "50% 0%",
};

export const focus = (img: string) => FOCUS[img] ?? "50% 20%";
