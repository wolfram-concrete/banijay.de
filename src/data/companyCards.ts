// ──────────────────────────────────────────────────────────────────────────
// BANIJAY GERMANY — Companies als Teaser-Cards (Companies-Page)
// ──────────────────────────────────────────────────────────────────────────
// Gekürzte, scanbare Teaser-Texte für das Algarve-inspirierte Card-Modul
// (value-features/services). KEINE Detail-/Accordion-Ebene — jede Card teasert
// in Richtung der externen Company-Website (CTA „Zur Website", neuer Tab).
// Textlängen bewusst kurz gehalten (Briefing: profile ~55–95, body ~120–190 Z.).
// ──────────────────────────────────────────────────────────────────────────

export type CompanyCardCluster =
  | "Production & Formats"
  | "Live & Services"
  | "Digital & Media"
  | "Talent & Management"
  | "International";

export type CompanyCardKind =
  | "company"
  | "label"
  | "platform"
  | "festival"
  | "service"
  | "management";

export interface CompanyCard {
  id: string;
  index: string;
  cluster: CompanyCardCluster;
  kind: CompanyCardKind;
  name: string;
  profile: string;
  body: string;
  tags: string[];
  knownFor: string[];
  context?: string;
  /**
   * Externe Company-Website. Optional (Wolfram 20.07.): Nicht jede Company hat eine
   * eigene Seite — Potatohead Pictures z. B. hat keine. In dem Fall lassen wir das Feld
   * weg statt auf eine fremde Seite umzuleiten; alle Consumer blenden den CTA dann aus.
   */
  externalUrl?: string;
  /** Nur redaktioneller Hinweis — NICHT auf der Card anzeigen. */
  externalUrlNote?: string;
  image: string;
  imageAlt: string;
}

export const COMPANY_CARDS: CompanyCard[] = [
  {
    id: "banijay-productions-germany",
    index: "01",
    cluster: "Production & Formats",
    kind: "company",
    name: "Banijay Productions Germany",
    profile: "Populäres Entertainment mit Tempo, Markeninstinkt und direkter Publikumsnähe.",
    body: "Von Comedy bis Reality, von Quiz bis Show: Banijay Productions entwickelt Formate, die schnell verständlich sind und groß erzählen.",
    tags: ["Reality & Factual", "Show", "Comedy"],
    knownFor: ["Hast du Töne?", "Temptation Island", "Das große Promibüßen"],
    context: "Publikumsnahe Formate mit hoher Marktdynamik.",
    externalUrl: "https://www.banijayproductions.de/",
    image: "/companies/banijay-productions-germany.png",
    imageAlt: "Banijay Productions Germany – Teaserbild",
  },
  {
    id: "endemolshine-germany",
    index: "02",
    cluster: "Production & Formats",
    kind: "company",
    name: "EndemolShine Germany",
    profile: "Große Formatmarken für Prime Time, Streaming und breite Zielgruppen.",
    body: "EndemolShine verbindet internationale IP, starke Showkompetenz und deutsche Marktnähe – von Quiz bis Reality, von Factual bis Entertainment.",
    tags: ["Show", "Reality", "Quiz"],
    knownFor: ["The Masked Singer", "Wer wird Millionär?", "Kitchen Impossible"],
    context: "Internationale Formatkraft und breite Produktionskompetenz.",
    externalUrl: "https://endemolshine.de/",
    image: "/companies/endemolshine-germany.jpg",
    imageAlt: "EndemolShine Germany – Teaserbild",
  },
  {
    id: "brainpool",
    index: "03",
    cluster: "Production & Formats",
    kind: "company",
    name: "Brainpool",
    profile: "Comedy, Show und Live-Entertainment mit popkultureller Sichtbarkeit.",
    body: "Brainpool steht für Entertainment-Marken, die im Fernsehen, auf Plattformen und live funktionieren – mit Comedy-DNA und großer Publikumskraft.",
    tags: ["Comedy", "Live", "Show"],
    knownFor: ["TV total", "Schlag den Star", "NightWash"],
    context: "Popkultur, Comedy-Marken und Entertainment-Ikonen.",
    externalUrl: "https://brainpool.de/",
    image: "/companies/brainpool.png",
    imageAlt: "Brainpool – Teaserbild",
  },
  {
    id: "madefor",
    index: "04",
    cluster: "Production & Formats",
    kind: "company",
    name: "MadeFor",
    profile: "Fiction, Serien und Reihen für TV, Streaming und internationale Märkte.",
    body: "MadeFor bündelt scripted Produktionskompetenz für fiktionales Storytelling – vom seriellen Erzählen bis zur hochwertigen Reihe.",
    tags: ["Fiction", "Serie", "Film"],
    knownFor: ["Tatort Dresden", "Der Lehrer", "Fiction-Produktionen"],
    context: "Scripted Storytelling innerhalb der Banijay-Welt.",
    externalUrl: "https://madefor.film/",
    image: "/companies/madefor.jpg",
    imageAlt: "MadeFor – Teaserbild",
  },
  {
    id: "dynamic-ally-pictures",
    index: "05",
    cluster: "Production & Formats",
    kind: "company",
    name: "Dynamic Ally Pictures",
    profile: "Serienentwicklung mit deutscher Basis und internationalem Blick.",
    body: "Das Berliner Label entwickelt, packaget und finanziert Serien für deutsche und internationale Zielgruppen – mit Fokus auf starke fiktionale Konzepte.",
    tags: ["Fiction", "Series", "International"],
    knownFor: ["Helgoland 513", "Series Development"],
    context: "Internationale Fiction-Perspektive aus Berlin.",
    externalUrl: "https://dynamic-ally-pictures.com/en/homepage/",
    image: "/companies/dynamic-ally-pictures.png",
    imageAlt: "Dynamic Ally Pictures – Teaserbild",
  },
  {
    id: "good-humor",
    index: "06",
    cluster: "Production & Formats",
    kind: "label",
    name: "Good Humor",
    profile: "Comedy-Fiction aus Writers-Room, Entwicklung und Produktion.",
    body: "Good Humor entwickelt humorvolle Fiction-Formate – von Comedy-Serien und Sitcoms bis zu Sketch- und Mockumentary-Ideen.",
    tags: ["Comedy", "Fiction", "Writers Room"],
    knownFor: ["Comedy-Fiction", "Sitcoms", "Sketch-Formate"],
    context: "Label für scripted Humor innerhalb der Banijay-Familie.",
    // Eigene Company-Domain (Wolfram 17.07.) — löst den alten banijay.de-Presseartikel
    // ab („…Stephan Denzer gründen Fiction-Label Good Humor…"). goodhumor.de gibt 200
    // und ist auch im Ökosystem (ecosystem.ts) hinterlegt.
    externalUrl: "https://goodhumor.de/",
    image: "/companies/good-humor.jpg",
    imageAlt: "Good Humor – Teaserbild",
  },
  {
    id: "potatohead-pictures",
    index: "07",
    cluster: "Production & Formats",
    kind: "label",
    name: "Potatohead Pictures",
    profile: "Food-Entertainment und Formatentwicklung rund um starke Personalities.",
    body: "Das EndemolShine-Joint-Venture mit Tim Mälzer entwickelt kulinarische Formate, die Food, Wettbewerb und Personality verbinden.",
    tags: ["Food", "Factual", "Personality"],
    knownFor: ["Kitchen Impossible", "Mälzer und Henssler liefern ab!", "Food-Formate"],
    context: "Als Label / Tochter von EndemolShine darstellen.",
    // KEIN externalUrl (Wolfram 20.07.): „bitte die website bei potatoehead pictures
    // global rausnehmen. da gibt es keine." Der frühere Ersatz-CTA auf die
    // EndemolShine-Teamseite ist damit ebenfalls raus — lieber gar kein Link als ein
    // Link, der woanders hinführt. Auch in ecosystem.ts steht Potatohead unverlinkt.
    image: "/companies/potatohead-pictures.jpg",
    imageAlt: "Potatohead Pictures – Teaserbild",
  },
  {
    id: "banijay-germany-live",
    index: "08",
    cluster: "Live & Services",
    kind: "company",
    name: "Banijay Germany Live",
    profile: "Live-Entertainment, Comedy-Marken, Tour-Booking und Erlebnisse.",
    body: "Banijay Germany Live bringt Entertainment aus dem Bildschirm auf die Bühne – von Comedy-Live-Marken bis zu neuen Experience-Formaten.",
    tags: ["Live", "Comedy", "Touring"],
    knownFor: ["Cologne Comedy Festival", "NightWash", "1LIVE Comedy-Nacht XXL"],
    context: "Live-Aktivitäten und Erlebnisformate im Banijay-Netzwerk.",
    externalUrl: "https://www.banijaygermanylive.de/",
    image: "/companies/banijay-germany-live.png",
    imageAlt: "Banijay Germany Live – Teaserbild",
  },
  {
    id: "cape-cross",
    index: "09",
    cluster: "Live & Services",
    kind: "service",
    // Offizieller Name lt. Ökosystem-Auflistung (Wolfram 16.07.) — Schwester-Company
    // ist „Cape Cross Postproduction".
    name: "Cape Cross Entertainment",
    profile: "Production Services für TV, Entertainment, Events und Technik.",
    body: "Cape Cross liefert technische und operative Produktionskraft – von Licht, Ton und Rigging bis Bühnenbau, Grip und Postproduktion.",
    tags: ["Services", "Eventtechnik", "Postproduktion"],
    knownFor: ["TV-Umsetzungen", "Events", "Studio-Services"],
    context: "Technischer Full-Service-Partner für Produktionen.",
    externalUrl: "https://www.capecross.de/",
    image: "/companies/cape-cross.png",
    imageAlt: "Cape Cross – Teaserbild",
  },
  {
    id: "myshow",
    index: "10",
    cluster: "Live & Services",
    kind: "platform",
    name: "MyShow",
    profile: "Ticketing- und Audience-Plattform für Shows, Live und TV.",
    body: "MyShow macht Banijay-Erlebnisse buchbar – von Studio-Shows und Live-Events bis zu Comedy, Quiz und TV-Produktionen.",
    tags: ["Ticketing", "Audience", "Live"],
    knownFor: ["TV total Köln", "Schlag den Star", "NightWash"],
    context: "Publikumszugang und Live-Audience-Infrastruktur.",
    externalUrl: "https://myshow.de/",
    image: "/companies/myshow.png",
    imageAlt: "MyShow – Teaserbild",
  },
  {
    id: "cologne-comedy-festival",
    index: "11",
    cluster: "Live & Services",
    kind: "festival",
    name: "Cologne Comedy Festival",
    profile: "Eine der sichtbarsten Comedy-Bühnen der Banijay-Welt.",
    body: "Das Festival bringt Comedy, Artists, Shows und Publikum in Köln zusammen – als Live-Erlebnis und kultureller Treffpunkt.",
    tags: ["Comedy", "Festival", "Artists"],
    knownFor: ["Cologne Comedy Festival", "1LIVE Comedy-Nacht XXL", "NightWash"],
    context: "Als Experience-/Festival-Card führen, nicht als klassische Company.",
    externalUrl: "https://comedy.cologne/",
    image: "/companies/cologne-comedy-festival.png",
    imageAlt: "Cologne Comedy Festival – Teaserbild",
  },
  {
    id: "banijay-media-germany",
    index: "12",
    cluster: "Digital & Media",
    kind: "company",
    name: "Banijay Media Germany",
    profile: "Entertainment, Brands und digitale Reichweite in einem System.",
    body: "Banijay Media verbindet Branded Entertainment, Social Content, Distribution und Rechte – für Marken, Plattformen und Formatwelten.",
    tags: ["Digital", "Brands", "Rights"],
    knownFor: ["MySpass", "Branded Entertainment", "Social Content"],
    context: "Formate verlängern, Marken verbinden, Reichweite aufbauen.",
    externalUrl: "https://www.banijaymedia.de/",
    image: "/companies/banijay-media-germany.png",
    imageAlt: "Banijay Media Germany – Teaserbild",
  },
  {
    id: "influence-vision",
    index: "13",
    cluster: "Digital & Media",
    kind: "platform",
    name: "influence.vision",
    profile: "Influencer-Marketing-Plattform für Creator-Kooperationen.",
    body: "influence.vision verbindet Discovery, Kampagnenmanagement und Creator-Kollaboration in einer Plattform für digitale Partnerschaften.",
    tags: ["Creator", "Influencer", "Platform"],
    knownFor: ["Creator Discovery", "Campaigns", "Collaborations"],
    context: "Creator Economy und digitale Vermarktungslogik.",
    externalUrl: "https://www.influencevision.com/en/",
    image: "/companies/influence-vision.jpg",
    imageAlt: "influence.vision – Teaserbild",
  },
  {
    id: "mts-management",
    index: "14",
    cluster: "Talent & Management",
    kind: "management",
    name: "MTS Management",
    profile: "Künstlermanagement für Comedy, TV und Entertainment-Persönlichkeiten.",
    body: "MTS begleitet bekannte Personalities und entwickelt Karrieren zwischen Bühne, TV, Moderation und Entertainment-Marken.",
    tags: ["Talent", "Comedy", "Personality"],
    knownFor: ["Atze Schröder", "Lisa Feller", "Nelson Müller"],
    context: "Talentbindung und Personality-Aufbau.",
    externalUrl: "https://mts-gmbh.com/",
    image: "/companies/mts-management.png",
    imageAlt: "MTS Management – Teaserbild",
  },
  {
    id: "sr-management",
    index: "15",
    cluster: "Talent & Management",
    kind: "management",
    name: "SR Management",
    profile: "Management und Vertretung für TV, Moderation und Entertainment.",
    body: "SR Management betreut Persönlichkeiten aus TV, Moderation, Schauspiel und Comedy – mit Fokus auf etablierte Entertainment-Gesichter.",
    tags: ["Talent", "TV", "Moderation"],
    knownFor: ["Oliver Pocher", "Cindy aus Marzahn", "TV-Persönlichkeiten"],
    context: "Vertretung etablierter Entertainment-Persönlichkeiten.",
    externalUrl: "https://www.srmanagement.de/",
    image: "/companies/sr-management.jpg",
    imageAlt: "SR Management – Teaserbild",
  },
  {
    id: "en2rage",
    index: "16",
    cluster: "Talent & Management",
    kind: "management",
    name: "en2rage",
    profile: "Künstlermanagement und Consulting im Entertainment-Umfeld.",
    body: "en2rage ergänzt das Netzwerk als spezialisierte Management- und Consulting-Struktur für Künstler:innen und Entertainment-Projekte.",
    tags: ["Management", "Consulting", "Talent"],
    knownFor: ["Künstlermanagement", "Consulting"],
    context: "Spezialisierte Talent- und Management-Struktur.",
    externalUrl: "https://www.en2rage.de/",
    image: "/companies/en2rage.jpg",
    imageAlt: "en2rage – Teaserbild",
  },
  {
    id: "only-good-people",
    index: "17",
    cluster: "Talent & Management",
    kind: "management",
    name: "Only Good People",
    profile: "Künstlermanagement für Comedy-Talente und digitale Persönlichkeiten.",
    body: "OGP betreut etablierte Künstler:innen und upcoming Talents – besonders aus Comedy, Creator-Kultur und Entertainment.",
    tags: ["Comedy", "Creator", "Talent"],
    knownFor: ["Bastian Bielendorfer", "Özcan Cosar", "selfiesandra"],
    context: "Comedy-Talente und digitale Persönlichkeiten langfristig aufbauen.",
    externalUrl: "https://ogp.rocks/",
    image: "/companies/ogp-only-good-people.jpg",
    imageAlt: "Only Good People – Teaserbild",
  },
  {
    id: "elevate-talent-management",
    index: "18",
    cluster: "Talent & Management",
    kind: "management",
    name: "Elevate Talent Management",
    profile: "Talent-Management mit europäischer Ausrichtung.",
    body: "Elevate positioniert Talente über Märkte und Plattformen hinweg – mit Standorten in Köln und Wien und Fokus auf exklusive Talents.",
    tags: ["Talent", "Creator", "International"],
    knownFor: ["Sandra Hesch", "Talent Cases", "Creator Management"],
    context: "Talent-Aufbau über Märkte und Plattformen hinweg.",
    externalUrl: "https://www.elevate-mgmt.de/",
    image: "/companies/elevate-talent-management.png",
    imageAlt: "Elevate Talent Management – Teaserbild",
  },
  {
    id: "bb-endemol-shine",
    index: "19",
    cluster: "International",
    kind: "company",
    name: "B&B Endemol Shine",
    profile: "Schweizer Produktionskompetenz für Shows, Quiz, Doku und Factual.",
    body: "B&B Endemol Shine ist die Schweizer Banijay-Niederlassung und produziert große Shows, Quiz, Dokumentationen und Factual-Serien.",
    tags: ["DACH", "Show", "Factual"],
    knownFor: ["1 gegen 100", "Schweizer Shows", "Dokumentationen"],
    context: "DACH-Erweiterung und Schweizer Marktzugang.",
    externalUrl: "https://www.bbendemolshine.ch/",
    image: "/companies/bb-endemol-shine.jpg",
    imageAlt: "B&B Endemol Shine – Teaserbild",
  },
  {
    id: "endemol-shine-polska",
    index: "20",
    cluster: "International",
    kind: "company",
    name: "Endemol Shine Polska",
    profile: "Polnischer Produktionshub für Entertainment, Fiction und Formate.",
    body: "Endemol Shine Polska produziert Unterhaltung, Reality, Quiz, Fiction und internationale Formate für den polnischen Markt.",
    tags: ["International", "Entertainment", "Reality"],
    knownFor: ["MasterChef", "LEGO Masters", "Big Brother"],
    context: "Europäische Produktions- und Formatkompetenz.",
    externalUrl: "https://www.endemolshine.pl/",
    image: "/companies/endemol-shine-polska.jpg",
    imageAlt: "Endemol Shine Polska – Teaserbild",
  },
  {
    // NEU (Marcus-Info 14.07.): Label mit Food-Experte Sebastian Lege.
    // Content aus dem internen Anschreiben — nichts erfunden. Noch keine Website.
    id: "pausenclown-media",
    index: "21",
    cluster: "Production & Formats",
    kind: "label",
    name: "Pausenclown Media",
    profile: "Neues Label mit Food-Experte Sebastian Lege — Content, Talent und Distribution eng verzahnt.",
    body: "Gemeinsam mit TV-Persönlichkeit und Produktentwickler Sebastian Lege gegründet: Entertainment aus Publikumssicht für TV, Streaming, Social Media und Live. Geschäftsführung Arno Schneppenheim, Executive Producer Imke Runde.",
    tags: ["Food-Entertainment", "Digital", "Label"],
    knownFor: ["Sebastian Lege", "b/esser (YouTube)", "ZDF & VOX"],
    context: "Neugründung 2026 — Talent, Content und Distribution eng verzahnt.",
    externalUrl: "",
    image: "/companies/pausenclown-media.jpg",
    imageAlt: "Pausenclown Media – Sebastian Lege",
  },
  {
    // ShowdownTV (Wolfram 21.07.) — neue Streaming-/Live-Entertainment-Plattform von
    // Banijay Media Germany (Launch April 2026, Fokus Kampfsport & Live-Events).
    // Logo + Kachel-Video folgen noch → Poster-Platzhalter, Video-REEL wird nachgetragen.
    id: "showdown-tv",
    index: "22",
    cluster: "Digital & Media",
    kind: "platform",
    name: "ShowdownTV",
    profile: "Streaming-Plattform für Live-Entertainment und Kampfsport.",
    body: "Banijay Media Germany bündelt auf ShowdownTV Live-Events, Kampfsport und Show-Entertainment – von Promi-Boxen bis Wrestling, im Web, per App und auf Smart-TV.",
    tags: ["Live", "Kampfsport", "Streaming"],
    knownFor: ["Das große Promi-Boxen", "TV total Promi-Wrestling", "Ringlife Combat Series"],
    context: "Live-Entertainment und Combat-Sport als eigene Plattform.",
    externalUrl: "https://www.showdowntv.com/",
    image: "/companies/showdown-tv.jpg",
    imageAlt: "ShowdownTV – Teaserbild",
  },
];

/** Badge-Label je Card-Kind (nur wenn ≠ "company"). */
export const CARD_KIND_LABEL: Partial<Record<CompanyCardKind, string>> = {
  label: "Label",
  platform: "Plattform",
  festival: "Festival",
  service: "Service",
  management: "Management",
};
