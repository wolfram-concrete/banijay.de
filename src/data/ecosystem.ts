// DAS BANIJAY-ÖKOSYSTEM — Datenbasis für die Ökosystem-Section (Task #54).
// Quelle Struktur/Namen: offizielle Banijay-Grafik „THE ECOSYSTEM — ‚Coopetition'"
// (von Wolfram am 08.07.2026 geliefert), Namen 1:1 übernommen.
// URLs: ausschließlich ECHTE Outbound-Links aus dem Scrape der bisherigen
// banijay.de (scraped_content) — Companies ohne belegten Link bleiben unverlinkt.

export type EcoCompany = { name: string; url?: string };

export type EcoCategory = {
  key: string;
  label: string;
  companies: EcoCompany[];
};

export const ECOSYSTEM = {
  // ⚠️ Wording final via Heike (#58)
  title: "Banijay Ökosystem",
} as const;

// Rubrizierung des Companies-Bentos (Task #61): Card-ID (companyCards.ts) →
// Ökosystem-Kategorie(n). Abgeleitet 1:1 aus den Kategorie-Listen unten —
// Companies können in MEHREREN Kategorien leben (z. B. Live + Entertainment).
export const ECO_BY_COMPANY_CARD: Record<string, string[]> = {
  "banijay-productions-germany": ["entertainment"],
  "endemolshine-germany": ["entertainment"],
  madefor: ["fiction"],
  "dynamic-ally-pictures": ["fiction"],
  "good-humor": ["fiction"],
  "potatohead-pictures": ["entertainment"],
  "banijay-germany-live": ["entertainment", "live"],
  "cape-cross": ["tech"],
  myshow: ["live"],
  "cologne-comedy-festival": ["live"],
  "banijay-media-germany": ["audio", "distribution"],
  "influence-vision": ["distribution"],
  "mts-management": ["artists"],
  "sr-management": ["artists"],
  en2rage: ["artists"],
  "only-good-people": ["artists"],
  "elevate-talent-management": ["artists"],
  "bb-endemol-shine": ["entertainment"],
  "endemol-shine-polska": ["entertainment"],
};

export const ECO_CATEGORIES: EcoCategory[] = [
  {
    key: "entertainment",
    label: "Entertainment",
    companies: [
      { name: "Banijay Productions Germany", url: "https://banijayproductions.de/" },
      { name: "Banijay Germany Live", url: "https://www.brainpool-live.de" },
      { name: "Endemol Shine Germany", url: "https://www.endemolshine.de/" },
      // Brainpool + Brainpool Pictures entfernt (Kundenwunsch 13.07.:
      // Brainpool-Companies werden nicht mehr aufgeführt)
      { name: "B&B Endemol Shine Switzerland", url: "https://bbendemolshine.ch/" },
      { name: "Rainer Laux Productions" },
      { name: "Lucky Pics" },
      { name: "Minestrone TV" },
      { name: "Ladykracher" },
      { name: "Doc.Banijay" },
      { name: "Potatohead Pictures" },
      { name: "EndemolShine Poland" },
    ],
  },
  {
    key: "live",
    label: "Live",
    companies: [
      { name: "Cologne Comedy Festival", url: "https://www.comedy.cologne/" },
      { name: "MyShow", url: "https://myshow.de/" },
      { name: "Banijay Germany Live", url: "https://www.brainpool-live.de" },
      { name: "NightWash Club", url: "https://nightwash-club.de/" },
      { name: "OGPP" },
    ],
  },
  {
    key: "audio",
    label: "Audio",
    companies: [
      { name: "Banijay Media Germany" },
      { name: "MySpass Audio" },
      { name: "SRM Music" },
      { name: "MadeFor Music", url: "https://madefor.film/" },
      { name: "Major Minor" },
      { name: "BP Music Publishing" },
      { name: "Podcast Bande" },
      { name: "MySpass" },
    ],
  },
  {
    key: "artists",
    label: "Artists",
    companies: [
      { name: "MTS Management", url: "https://www.mts-gmbh.com/" },
      { name: "SR Management", url: "http://www.srmanagement.de/" },
      { name: "En2rage", url: "http://en2rage.de/" },
      { name: "Only Good People" },
      { name: "Only Good Party People" },
      { name: "Elevate", url: "https://www.elevate-mgmt.de/" },
    ],
  },
  {
    key: "distribution",
    label: "Distribution & Brand",
    companies: [
      { name: "Influence Vision", url: "http://www.influencevision.com" },
      { name: "MySpass" },
      { name: "Banijay Media Germany" },
    ],
  },
  {
    key: "tech",
    label: "Tech",
    companies: [
      { name: "Cape Cross Entertainment", url: "http://www.capecross.de/" },
      { name: "Cape Cross Postproduction", url: "http://www.capecross.de/" },
      { name: "Banijay Infrastructure" },
    ],
  },
  // Fiction ans Ende (Wolfram 15.07.): unter Tech einsortiert → die 4 Spalten der
  // „Ein System, viele Handschriften"-Section füllen sich ausgewogener.
  {
    key: "fiction",
    label: "Fiction",
    companies: [
      { name: "MadeFor", url: "https://madefor.film/" },
      { name: "Good Humor", url: "https://goodhumor.de/" },
      { name: "Dynamic Ally Pictures", url: "https://dynamic-ally-pictures.com/" },
    ],
  },
];
