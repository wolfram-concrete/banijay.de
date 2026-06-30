import localFont from "next/font/local";

// Thunder — der monumentale Display-Cut (Hero-Wörter, Riesenzahlen, Statements)
export const thunder = localFont({
  src: [
    { path: "../fonts/Thunder-BlackLC.ttf", weight: "900", style: "normal" },
    { path: "../fonts/Thunder-ExtraBoldLC.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-thunder",
  display: "swap",
});

// Neue Konstant Grotesk — ruhiger Grotesk für Body & UI (Ersatz für Sharp Grotesk)
export const konstant = localFont({
  src: "../fonts/NeueKonstantGrotesk-Book.otf",
  variable: "--font-konstant",
  display: "swap",
});
