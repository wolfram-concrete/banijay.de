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
  title: "Banijay Germany Ökosystem",
} as const;

// Rubrizierung des Companies-Bentos (Task #61): Card-ID (companyCards.ts) →
// Ökosystem-Kategorie(n). Abgeleitet 1:1 aus den Kategorie-Listen unten —
// Companies können in MEHREREN Kategorien leben (z. B. Live + Entertainment).
export const ECO_BY_COMPANY_CARD: Record<string, string[]> = {
  "banijay-productions-germany": ["entertainment"],
  "endemolshine-germany": ["entertainment"],
  // Brainpool wieder aufgenommen (Wolfram 16.07., revidiert den Kundenwunsch vom 13.07.)
  brainpool: ["entertainment", "live"],
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
  // OGPP war ein separater Eintrag unter „Live" — laut Wolfram (16.07.) ist das
  // dieselbe Company: Only Good People (ogp.rocks). Daher zusammengeführt → lebt
  // in Artists UND Live, statt zweimal unter verschiedenen Namen aufzutauchen.
  "only-good-people": ["artists", "live"],
  "elevate-talent-management": ["artists"],
  "bb-endemol-shine": ["entertainment"],
  "endemol-shine-polska": ["entertainment"],
  // ShowdownTV (Wolfram 21.07.): Live-Entertainment-/Kampfsport-Plattform von Banijay
  // Media Germany → Live UND Distribution & Brand.
  "showdown-tv": ["live", "distribution"],
};

export const ECO_CATEGORIES: EcoCategory[] = [
  {
    key: "entertainment",
    label: "Entertainment",
    companies: [
      { name: "Banijay Productions Germany", url: "https://banijayproductions.de/" },
      { name: "Banijay Germany Live", url: "https://www.banijaygermanylive.de/" },
      { name: "Endemol Shine Germany", url: "https://www.endemolshine.de/" },
      // Brainpool wieder aufgenommen (Wolfram 16.07.) — der Kundenwunsch vom 13.07.
      // ist revidiert. „Brainpool Pictures" bleibt vorerst raus.
      { name: "Brainpool", url: "https://brainpool.de/" },
      { name: "B&B Endemol Shine Switzerland", url: "https://bbendemolshine.ch/" },
      // Kundenfeedback 17.07.: All3Media-Companies ins Ökosystem ergänzt. Die beiden
      // URLs hat Wolfram am 20.07. nachgeliefert (beide 200); die übrigen All3Media-
      // Companies bleiben unverlinkt, solange kein Link belegt ist (Regel oben).
      { name: "filmpool entertainment", url: "https://filmpool-entertainment.de/" },
      { name: "South & Browse", url: "https://south-and-browse.com/de/" },
      // Beide ohne eigenen Web-Auftritt → Verweis auf die jeweilige Mutter
      // (Wolfram 20.07.): Rainer Laux → EndemolShine, Lucky Pics → Brainpool.
      { name: "Rainer Laux Productions", url: "https://endemolshine.de/" },
      // Verweise auf die jeweilige Mutter-Company (Wolfram 20.07.), bis eigener Auftritt.
      { name: "Minestrone TV", url: "https://brainpool.de/" },
      { name: "Ladykracher", url: "https://brainpool.de/" },
      { name: "Doc.Banijay", url: "https://www.banijayproductions.de/" },
      { name: "Potatohead Pictures", url: "https://endemolshine.de/" },
      // URL nachgetragen (Wolfram 17.07.): war unverlinkt, obwohl in companyCards.ts als
      // „Endemol Shine Polska" belegt. endemolshine.pl gibt 200.
      { name: "EndemolShine Poland", url: "https://www.endemolshine.pl/" },
      // GANZ UNTEN (Wolfram 24.07.): Lucky Pics ans Ende der Entertainment-Liste (Desktop + Mobile).
      { name: "Lucky Pics", url: "https://brainpool.de/" },
    ],
  },
  {
    key: "live",
    label: "Live",
    companies: [
      // Banijay Germany Live an die erste Stelle (Wolfram 20.07.).
      { name: "Banijay Germany Live", url: "https://www.banijaygermanylive.de/" },
      { name: "Cologne Comedy Festival", url: "https://www.comedy.cologne/" },
      { name: "MyShow", url: "https://myshow.de/" },
      { name: "Brainpool", url: "https://brainpool.de/" },
      { name: "NightWash Club", url: "https://nightwash-club.de/" },
      // war „OGPP" (Abkürzung, ohne Link) → richtiger Company-Name + Website (Wolfram 16.07.)
      { name: "Only Good People", url: "https://ogp.rocks/" },
      // ShowdownTV (Wolfram 21.07.) — Live-Entertainment-/Kampfsport-Plattform.
      { name: "ShowdownTV", url: "https://www.showdowntv.com/" },
    ],
  },
  {
    key: "audio",
    label: "Audio",
    companies: [
      // URL nachgetragen (Wolfram 17.07.): war unverlinkt, obwohl in companyCards.ts belegt
      // (externalUrl). banijaymedia.de gibt 200. Steht auch unter „Distribution & Brand".
      { name: "Banijay Media Germany", url: "https://www.banijaymedia.de/" },
      // MySpass-Einheiten auf die MySpass-Plattform verlinkt (Wolfram 22.07.).
      { name: "MySpass Audio", url: "https://www.myspass.de/" },
      { name: "SRM Music" },
      { name: "MadeFor Music", url: "https://madefor.film/" },
      { name: "Major Minor" },
      { name: "BP Music Publishing" },
      { name: "Podcast Bande" },
      { name: "MySpass", url: "https://www.myspass.de/" },
    ],
  },
  {
    key: "artists",
    label: "Artists",
    companies: [
      { name: "MTS Management", url: "https://www.mts-gmbh.com/" },
      { name: "SR Management", url: "http://www.srmanagement.de/" },
      { name: "En2rage", url: "http://en2rage.de/" },
      { name: "Only Good People", url: "https://ogp.rocks/" },
      // Vorerst auf ogp.rocks (Only Good People) verlinkt (Wolfram 20.07.), bis eigener Auftritt.
      { name: "Only Good Party People", url: "https://ogp.rocks/" },
      { name: "Elevate", url: "https://www.elevate-mgmt.de/" },
    ],
  },
  {
    key: "distribution",
    label: "Distribution & Brand",
    companies: [
      { name: "Influence Vision", url: "http://www.influencevision.com" },
      { name: "MySpass", url: "https://www.myspass.de/" },
      // URL nachgetragen (Wolfram 17.07.) — zweites Vorkommen, siehe „Audio".
      { name: "Banijay Media Germany", url: "https://www.banijaymedia.de/" },
      // URL nachgeliefert von Wolfram (20.07.), vorher unverlinkt. Gibt 200.
      { name: "Magic Connection", url: "https://www.magic-connection.de/" },
      // ShowdownTV (Wolfram 21.07.) — Streaming-Plattform von Banijay Media Germany.
      { name: "ShowdownTV", url: "https://www.showdowntv.com/" },
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
      // URL nachgeliefert von Wolfram (20.07.), vorher unverlinkt. Gibt 200.
      { name: "filmpool fiction", url: "https://www.filmpool-fiction.de/home.html" },
    ],
  },
];
