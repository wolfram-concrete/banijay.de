// COMPANIES-DIRECTORY (Task #61/#60, Wolfram 13.07.) — Datenbasis der
// Companies-Liste auf der Home. Regeln:
//  • ALLE Firmen mit Logo in assets/Logo/Logos companies sind vertreten
//    (30 eindeutige — podcast_bande liegt doppelt im Ordner)
//  • plus PLATZHALTER für Companies, die nur in der offiziellen
//    Coopetition-Grafik stehen (kein Logo, kein Text — Name + Kategorie)
//  • BRAINPOOL-Companies (Brainpool, Brainpool Pictures) sind auf
//    Kundenwunsch RAUS und werden nicht mehr aufgeführt
//  • Texte/Bilder kommen aus companyCards.ts, wo vorhanden — NICHTS erfunden
//  • URLs nur mit Beleg (Scrape der bisherigen banijay.de)
//  • ecoKeys = Kategorien aus der Coopetition-Grafik; die vier
//    All3Media-Companies stehen nicht in der Grafik — filmpool nach
//    Namenslogik zugeordnet, Magic Connection / South & Browse bewusst
//    ohne Kategorie (erscheinen nur unter „Alle")

import { COMPANY_CARDS } from "./companyCards";

export type DirectoryCompany = {
  id: string;
  name: string;
  /** Ökosystem-Kategorien (keys aus ECO_CATEGORIES) */
  ecoKeys: string[];
  /** Weiß-Logo in public/company-logos (fehlt bei Grafik-Platzhaltern) */
  logo?: string;
  /** NUR belegte URLs */
  url?: string;
  tags: string[];
  profile?: string;
  body?: string;
  /** Poster-Still (Kachel/Lightbox-Fallback) */
  image?: string;
  /** true = nur aus der Coopetition-Grafik übernommen (Content folgt) */
  placeholder?: boolean;
};

// Bestehende Card-Daten (Texte, Tags, Bilder, URLs) per ID übernehmen
function fromCard(id: string, ecoKeys: string[], logo?: string): DirectoryCompany {
  const card = COMPANY_CARDS.find((c) => c.id === id);
  if (!card) throw new Error(`companiesDirectory: Card '${id}' fehlt in companyCards.ts`);
  return {
    id,
    name: card.name,
    ecoKeys,
    logo,
    url: card.externalUrl || undefined,
    tags: card.tags,
    profile: card.profile,
    body: card.body,
    image: card.image,
  };
}

const L = (f: string) => `/company-logos/${f}`;

export const COMPANIES_DIRECTORY: DirectoryCompany[] = [
  // ── mit Logo + redaktionellem Content (companyCards.ts) ────────────────
  fromCard("banijay-productions-germany", ["entertainment"], L("banijay-productions-germany.png")),
  fromCard("endemolshine-germany", ["entertainment"], L("endemolshine-germany.png")),
  fromCard("bb-endemol-shine", ["entertainment"], L("bb-endemol-shine.png")),
  fromCard("endemol-shine-polska", ["entertainment"], L("endemol-shine-polska.png")),
  fromCard("potatohead-pictures", ["entertainment"], L("potatohead-pictures.png")),
  fromCard("banijay-germany-live", ["entertainment", "live"], L("banijay-germany-live.svg")),
  fromCard("madefor", ["fiction"], L("madefor.png")),
  fromCard("good-humor", ["fiction"], L("good-humor.png")),
  fromCard("dynamic-ally-pictures", ["fiction"], L("dynamic-ally-pictures.png")),
  fromCard("myshow", ["live"], L("myshow.png")),
  fromCard("cologne-comedy-festival", ["live"], L("cologne-comedy-festival.png")),
  fromCard("banijay-media-germany", ["audio", "distribution"], L("banijay-media-germany.png")),
  fromCard("influence-vision", ["distribution"], L("influence-vision.png")),
  fromCard("mts-management", ["artists"], L("mts-management.png")),
  fromCard("sr-management", ["artists"], L("sr-management.png")),
  fromCard("en2rage", ["artists"], L("en2rage.png")),
  fromCard("only-good-people", ["artists"], L("only-good-people.png")),
  fromCard("elevate-talent-management", ["artists"], L("elevate-talent-management.png")),
  fromCard("cape-cross", ["tech"], L("cape-cross.png")),

  // ── mit Logo, Content folgt (Namen aus Grafik/Logo-Ordner) ─────────────
  { id: "cape-cross-postproduction", name: "Cape Cross Postproduction", ecoKeys: ["tech"], logo: L("cape-cross-postproduction.png"), url: "http://www.capecross.de/", tags: ["Tech"] },
  { id: "doc-banijay", name: "Doc.Banijay", ecoKeys: ["entertainment"], logo: L("doc-banijay.png"), tags: ["Entertainment"] },
  { id: "ladykracher", name: "Ladykracher", ecoKeys: ["entertainment"], logo: L("ladykracher.png"), tags: ["Entertainment"] },
  { id: "minestrone-tv", name: "Minestrone TV", ecoKeys: ["entertainment"], logo: L("minestrone-tv.png"), tags: ["Entertainment"] },
  { id: "rainer-laux-productions", name: "Rainer Laux Productions", ecoKeys: ["entertainment"], logo: L("rainer-laux-productions.png"), tags: ["Entertainment"] },
  { id: "myspass", name: "MySpass", ecoKeys: ["audio", "distribution"], logo: L("myspass.png"), tags: ["Audio", "Distribution & Brand"] },
  { id: "podcast-bande", name: "Podcast Bande", ecoKeys: ["audio"], logo: L("podcast-bande.png"), tags: ["Audio"] },
  // All3Media-Companies (Übernahme; nicht in der Coopetition-Grafik)
  { id: "filmpool-entertainment", name: "filmpool entertainment", ecoKeys: ["entertainment"], logo: L("filmpool-entertainment.png"), tags: ["Entertainment"] },
  { id: "filmpool-fiction", name: "filmpool fiction", ecoKeys: ["fiction"], logo: L("filmpool-fiction.png"), tags: ["Fiction"] },
  { id: "magic-connection", name: "Magic Connection", ecoKeys: [], logo: L("magic-connection.png"), tags: [] },
  { id: "south-and-browse", name: "South & Browse", ecoKeys: [], logo: L("south-and-browse.png"), tags: [] },

  // ── Platzhalter aus der Coopetition-Grafik (kein Logo im Ordner) ───────
  { id: "lucky-pics", name: "Lucky Pics", ecoKeys: ["entertainment"], tags: ["Entertainment"], placeholder: true },
  { id: "nightwash-club", name: "NightWash Club", ecoKeys: ["live"], url: "https://nightwash-club.de/", tags: ["Live"], placeholder: true },
  { id: "ogpp", name: "OGPP", ecoKeys: ["live"], tags: ["Live"], placeholder: true },
  { id: "only-good-party-people", name: "Only Good Party People", ecoKeys: ["artists"], tags: ["Artists"], placeholder: true },
  { id: "myspass-audio", name: "MySpass Audio", ecoKeys: ["audio"], tags: ["Audio"], placeholder: true },
  { id: "srm-music", name: "SRM Music", ecoKeys: ["audio"], tags: ["Audio"], placeholder: true },
  { id: "madefor-music", name: "MadeFor Music", ecoKeys: ["audio"], url: "https://madefor.film/", tags: ["Audio"], placeholder: true },
  { id: "major-minor", name: "Major Minor", ecoKeys: ["audio"], tags: ["Audio"], placeholder: true },
  { id: "bp-music-publishing", name: "BP Music Publishing", ecoKeys: ["audio"], tags: ["Audio"], placeholder: true },
  { id: "banijay-infrastructure", name: "Banijay Infrastructure", ecoKeys: ["tech"], tags: ["Tech"], placeholder: true },
];
