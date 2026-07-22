// COMPANIES-DIRECTORY (Task #61/#60, Wolfram 13.07.) — Datenbasis der
// Companies-Liste auf der Home. Regeln:
//  • ALLE Firmen mit Logo in assets/Logo/Logos companies sind vertreten
//    (30 eindeutige — podcast_bande liegt doppelt im Ordner)
//  • plus PLATZHALTER für Companies, die nur in der offiziellen
//    Coopetition-Grafik stehen (kein Logo, kein Text — Name + Kategorie)
//  • BRAINPOOL ist wieder drin (Wolfram 16.07.): der Kundenwunsch vom 13.07.
//    („Brainpool-Companies nicht mehr aufführen") ist revidiert — Brainpool ist
//    eine der wichtigsten Marken (u. a. TV total) und steht auch auf banijay.de.
//    „Brainpool Pictures" bleibt vorerst raus.
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
  /** Optionale Größen-Override für das Kachel-Logo — nötig bei Hochformat-/Farb-Logos,
   *  die im höhenbegrenzten Standard-Slot zu klein würden (z. B. NightWash Club). */
  logoClass?: string;
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
  // Brainpool (Wolfram 16.07.): Comedy-/Show-Marken (TV total, Schlag den Star) plus
  // Live-Geschäft → Entertainment UND Live.
  fromCard("brainpool", ["entertainment", "live"], L("brainpool.png")),
  fromCard("bb-endemol-shine", ["entertainment"], L("bb-endemol-shine.png")),
  fromCard("endemol-shine-polska", ["entertainment"], L("endemol-shine-polska.png")),
  // Potatohead → EndemolShine (Wolfram 20.07.): jetzt doch auf die Mutter verlinkt (der
  // Card-externalUrl ist undefined, siehe companyCards.ts) — daher hier per Objekt.
  { ...fromCard("potatohead-pictures", ["entertainment"], L("potatohead-pictures.png")), url: "https://endemolshine.de/" },
  fromCard("banijay-germany-live", ["entertainment", "live"], L("banijay-germany-live.svg")),
  fromCard("madefor", ["fiction"], L("madefor.png")),
  fromCard("good-humor", ["fiction"], L("good-humor.png")),
  // All3Media-Companies (Übernahme) — bewusst WEIT OBEN einsortiert (Wolfram 16.07.,
  // ~3. Zeile) statt hinten bei den übrigen All3Media-Einträgen.
  // URLs nachgeliefert von Wolfram (20.07.) — vorher standen alle vier ohne Link da,
  // weil im Scrape der alten banijay.de für sie keiner belegt war. Alle vier geben 200.
  { id: "filmpool-entertainment", name: "filmpool entertainment", ecoKeys: ["entertainment"], logo: L("filmpool-entertainment.png"), url: "https://filmpool-entertainment.de/", tags: ["Entertainment"] },
  { id: "filmpool-fiction", name: "filmpool fiction", ecoKeys: ["fiction"], logo: L("filmpool-fiction.png"), url: "https://www.filmpool-fiction.de/home.html", tags: ["Fiction"] },
  // ecoKeys/tags nachgetragen (Kundenfeedback 17.07.): Beide standen ohne Rubrik da und
  // fielen dadurch aus JEDEM Bento-Rubrikfilter heraus — sichtbar waren sie nur unter
  // „Alle". filmpool ×2 hatten ihre Keys bereits.
  { id: "magic-connection", name: "Magic Connection", ecoKeys: ["distribution"], logo: L("magic-connection.png"), url: "https://www.magic-connection.de/", tags: ["Distribution & Brand"] },
  { id: "south-and-browse", name: "South & Browse", ecoKeys: ["entertainment"], logo: L("south-and-browse.png"), url: "https://south-and-browse.com/de/", tags: ["Entertainment"] },
  fromCard("dynamic-ally-pictures", ["fiction"], L("dynamic-ally-pictures.png")),
  fromCard("myshow", ["live"], L("myshow.png")),
  fromCard("cologne-comedy-festival", ["live"], L("cologne-comedy-festival.png")),
  fromCard("banijay-media-germany", ["audio", "distribution"], L("banijay-media-germany.png")),
  fromCard("influence-vision", ["distribution"], L("influence-vision.png")),
  fromCard("mts-management", ["artists"], L("mts-management.png")),
  fromCard("sr-management", ["artists"], L("sr-management.png")),
  fromCard("en2rage", ["artists"], L("en2rage.png")),
  // Only Good People (ogp.rocks) — der frühere Extra-Eintrag „OGPP" unter „Live" war
  // dieselbe Company (Wolfram 16.07.) und ist hier zusammengeführt: EINE Kachel mit
  // Logo + Link, sichtbar unter Artists UND Live.
  fromCard("only-good-people", ["artists", "live"], L("only-good-people.png")),
  fromCard("elevate-talent-management", ["artists"], L("elevate-talent-management.png")),
  fromCard("cape-cross", ["tech"], L("cape-cross.png")),

  // NEU (Marcus-Info 14.07.): Label mit Food-Experte Sebastian Lege — Content
  // aus companyCards.ts (internes Anschreiben, nichts erfunden).
  // Logo +50 % (Wolfram 20.07.): Standard ist h-[1.4rem] md:h-[1.6rem] → ×1.5 =
  // h-[2.1rem] md:h-[2.4rem]. fromCard reicht logoClass NICHT durch, darum als
  // Objekt geschrieben (Card-Texte manuell übernommen).
  {
    ...fromCard("pausenclown-media", ["entertainment"], L("pausenclown-media.png")),
    logoClass: "h-[2.1rem] md:h-[2.4rem]",
  },

  // ── mit Logo, Content folgt (Namen aus Grafik/Logo-Ordner) ─────────────
  { id: "cape-cross-postproduction", name: "Cape Cross Postproduction", ecoKeys: ["tech"], logo: L("cape-cross-postproduction.png"), url: "http://www.capecross.de/", tags: ["Tech"] },
  // Verweise auf die jeweilige Mutter-Company (Wolfram 20.07.), bis eigener Auftritt:
  // Doc.Banijay → Banijay Productions Germany, Ladykracher + Minestrone → Brainpool.
  { id: "doc-banijay", name: "Doc.Banijay", ecoKeys: ["entertainment"], logo: L("doc-banijay.png"), url: "https://www.banijayproductions.de/", tags: ["Entertainment"] },
  { id: "ladykracher", name: "Ladykracher", ecoKeys: ["entertainment"], logo: L("ladykracher.png"), url: "https://brainpool.de/", tags: ["Entertainment"] },
  { id: "minestrone-tv", name: "Minestrone TV", ecoKeys: ["entertainment"], logo: L("minestrone-tv.png"), url: "https://brainpool.de/", tags: ["Entertainment"] },
  // Kein eigener Web-Auftritt → Link auf die Mutter EndemolShine (Wolfram 20.07.).
  // Das ist bewusst ein Verweis auf die Dachgesellschaft, kein Eigen-Auftritt.
  { id: "rainer-laux-productions", name: "Rainer Laux Productions", ecoKeys: ["entertainment"], logo: L("rainer-laux-productions.png"), url: "https://endemolshine.de/", tags: ["Entertainment"] },
  { id: "myspass", name: "MySpass", ecoKeys: ["audio", "distribution"], logo: L("myspass.png"), url: "https://www.myspass.de/", tags: ["Audio", "Distribution & Brand"] },
  { id: "podcast-bande", name: "Podcast Bande", ecoKeys: ["audio"], logo: L("podcast-bande.png"), tags: ["Audio"] },
  // All3Media-Companies (Übernahme; nicht in der Coopetition-Grafik) stehen jetzt alle
  // weiter oben (Wolfram 16.07.) — filmpool ×2, Magic Connection, South & Browse.

  // ── Platzhalter aus der Coopetition-Grafik (kein Logo im Ordner) ───────
  // Kein eigener Web-Auftritt → Link auf die Mutter Brainpool (Wolfram 20.07.).
  // Wie bei Rainer Laux ein bewusster Verweis auf die Dachgesellschaft.
  { id: "lucky-pics", name: "Lucky Pics", ecoKeys: ["entertainment"], url: "https://brainpool.de/", tags: ["Entertainment"], placeholder: true },
  // Logo (Wolfram 16.07.): das NightWash-Club-Logo ist ein FARBIGES Hochformat-Logo
  // (Bubble + Neon-Schild) — anders als die sonst breiten Weiß-Logos. Es bekommt daher
  // per logoClass mehr Höhe, sonst wäre es im höhenbegrenzten Slot nur ~20px breit.
  { id: "nightwash-club", name: "NightWash Club", ecoKeys: ["live"], logo: L("nightwash-club.png"), logoClass: "h-[3.4rem] md:h-[4rem]", url: "https://nightwash-club.de/", tags: ["Live"], placeholder: true },
  // Vorerst auf die Only-Good-People-Website (ogp.rocks) verlinkt (Wolfram 20.07.) —
  // bewusster Verweis auf die verwandte Company, bis ein eigener Auftritt vorliegt.
  { id: "only-good-party-people", name: "Only Good Party People", ecoKeys: ["artists"], url: "https://ogp.rocks/", tags: ["Artists"], placeholder: true },
  // ShowdownTV (Wolfram 21.07.) — neue Plattform von Banijay Media Germany. Logo geliefert
  // (Wolfram 21.07.): weißes Hochformat-Logo (V-Mark über Wortmarke) → wie NightWash mehr
  // Höhe per logoClass, sonst wäre die Wortmarke im Standard-Slot zu klein. Video folgt noch.
  { id: "showdown-tv", name: "ShowdownTV", ecoKeys: ["live", "distribution"], logo: L("showdown-tv.png"), logoClass: "h-[3rem] md:h-[3.6rem]", url: "https://www.showdowntv.com/", tags: ["Live", "Distribution & Brand"] },
  // NUR AUS DER VIDEO-LISTEN-SECTION (Bento) ENTFERNT (Wolfram 16.07.): SRM Music,
  // MySpass Audio, Major Minor, MadeFor Music, BP Music Publishing und Banijay
  // Infrastructure. Im Ökosystem (ecosystem.ts) und im Ökosystem-Verzeichnis bleiben
  // sie gelistet — das sind bewusst getrennte Datenquellen.
];
