// ──────────────────────────────────────────────────────────────────────────
// BANIJAY GERMANY — Company-Welt (CMS-ready Datenschicht)
// ──────────────────────────────────────────────────────────────────────────
// Diese Datei modelliert das Entertainment-Ökosystem aus der Konzeption.
// Jede Company bildet später 1:1 eine Payload-Collection-Entry ab.
// Inhalte sind 1:1 aus der Konzeption (Banijay_Website.pdf) übernommen.
//
// Leitentscheidung aus dem Konzept: KEINE gleichwertige Logo-Wand, sondern eine
// strukturierte Welt aus Clustern + drei Card-Tiers (featured / specialist / label).
// ──────────────────────────────────────────────────────────────────────────

/** Kompetenzfelder = Filter-Tags (Konzept Section 6 / Companies Ebene 2). */
export const COMPETENCIES = [
  "Show & Entertainment",
  "Reality & Factual",
  "Comedy & Live",
  "Fiction & Scripted",
  "Digital & Social",
  "Talent & Artists",
  "Services & Experiences",
  "International",
] as const;

export type Competency = (typeof COMPETENCIES)[number];

/** Cluster statt reiner Liste (Konzept Companies Ebene 3). */
export type ClusterId =
  | "production-formats"
  | "live-experiences-services"
  | "digital-media-brands"
  | "talent-artists"
  | "international";

export interface Cluster {
  id: ClusterId;
  /** Kurzes Label für Sprungmarken/Filter. */
  label: string;
  /** Vollständiger Cluster-Titel aus dem Konzept. */
  title: string;
  description: string;
}

export const CLUSTERS: Cluster[] = [
  {
    id: "production-formats",
    label: "Production & Formats",
    title: "Cluster A — Production & Formats",
    description: "Die großen inhaltlichen Produktionshäuser der Banijay-Welt.",
  },
  {
    id: "live-experiences-services",
    label: "Live, Experiences & Services",
    title: "Cluster B — Live, Experiences & Services",
    description: "Entertainment aus dem Bildschirm auf die Bühne — plus technische und operative Produktionskraft.",
  },
  {
    id: "digital-media-brands",
    label: "Digital, Media & Brands",
    title: "Cluster C — Digital, Media & Brands",
    description: "Reichweite, Markenerlebnisse und Creator Economy.",
  },
  {
    id: "talent-artists",
    label: "Talent & Artist Management",
    title: "Cluster D — Talent & Artist Management",
    description: "Management, Aufbau und Entwicklung von Persönlichkeiten.",
  },
  {
    id: "international",
    label: "International / DACH / Europe",
    title: "Cluster E — International / DACH / Europe",
    description: "Lokale Marktnähe mit internationaler Banijay-Perspektive.",
  },
];

/**
 * Card-Tier bestimmt Größe & Tiefe der Card (Konzept „Company Card UX"):
 *  - featured:   große, visuelle Card, 80–120 Wörter, bekannte Formate
 *  - specialist: kompakter, 45–75 Wörter (Services, Managements, Plattformen)
 *  - label:      kurze Label-/Experience-Card (Festivals, Sub-Labels)
 */
export type CompanyTier = "featured" | "specialist" | "label";

export interface Company {
  slug: string;
  name: string;
  cluster: ClusterId;
  tier: CompanyTier;
  /** Wird auf der Home in den „Featured Companies" (6–8 Cards) gezeigt. */
  featuredOnHome?: boolean;
  /** Profil-Satz (eine Zeile). */
  profile: string;
  /** Kurztext (Card-Body). */
  description: string;
  competencies: Competency[];
  /** Known for / Beispiele. */
  knownFor: string[];
  /** Rolle in der Banijay-Welt. */
  roleInWorld: string;
  /** Übergeordnete Company (z. B. Potatohead → EndemolShine). */
  parent?: string;
  /** Optionaler externer Link auf die Einzelwebsite (später). */
  externalLink?: string;
  /** Interner Konzept-Hinweis (nicht für Frontend-Anzeige). */
  note?: string;
}

export const COMPANIES: Company[] = [
  // ── Cluster A: Production & Formats ─────────────────────────────────────
  {
    slug: "banijay-productions-germany",
    name: "Banijay Productions Germany",
    cluster: "production-formats",
    tier: "featured",
    featuredOnHome: true,
    profile: "Populäres Entertainment für Sender, Streamingdienste und Unternehmen.",
    description:
      "Banijay Productions Germany entwickelt und produziert Formate in Comedy, Quiz, Doku, Factual, Reality und Show. Die Company arbeitet für TV-Sender, Streamingdienste und Unternehmen und beschreibt ihre Arbeit selbst über starke Marken, Hits und Storytelling.",
    competencies: ["Reality & Factual", "Show & Entertainment", "Comedy & Live"],
    knownFor: ["Hast du Töne?", "Das große Promibüßen", "Temptation Island", "Die Abrechnung"],
    roleInWorld: "Schnelle, publikumsnahe Entertainment-Formate mit hoher Marktnähe.",
  },
  {
    slug: "endemolshine-germany",
    name: "EndemolShine Germany",
    cluster: "production-formats",
    tier: "featured",
    featuredOnHome: true,
    profile: "Große Bewegtbild-Formate, die Emotionen und Zeitgeist verbinden.",
    description:
      "EndemolShine Germany produziert Bewegtbild-Formate und führt ein breites Portfolio aus Show, Quiz, Reality, Factual und Entertainment. Auf der Website werden unter anderem The Masked Singer, Wer wird Millionär?, Promi Big Brother, Kitchen Impossible, Hot oder Schrott und LEGO Masters gezeigt.",
    competencies: ["Show & Entertainment", "Reality & Factual"],
    knownFor: ["The Masked Singer", "Wer wird Millionär?", "Promi Big Brother", "Kitchen Impossible", "LEGO Masters"],
    roleInWorld: "Große Formatmarken, internationale IP und breite Produktionskompetenz.",
  },
  {
    slug: "brainpool",
    name: "Brainpool",
    cluster: "production-formats",
    tier: "featured",
    featuredOnHome: true,
    profile: "Comedy, Show und Live-Entertainment mit maximaler popkultureller Sichtbarkeit.",
    description:
      "Brainpool beschreibt sich als Zuhause von 30 Jahren Show- und Comedygeschichte. Die Company verbindet Shows, Events, Künstler:innen, Streaming, Online-Plattformen, Social Media und Live-Entertainment. Zu den sichtbaren Marken gehören TV total, Schlag den Star, Bratwurst und Baklava und NightWash.",
    competencies: ["Comedy & Live", "Show & Entertainment", "Digital & Social", "Talent & Artists"],
    knownFor: ["TV total", "Schlag den Star", "Bratwurst und Baklava", "NightWash"],
    roleInWorld: "Popkultur, Comedy-Marken, Live-Logik und Entertainment-Ikonen.",
  },
  {
    slug: "madefor",
    name: "MadeFor",
    cluster: "production-formats",
    tier: "featured",
    featuredOnHome: true,
    profile: "Fiction, Serien und Reihen für TV, Streaming und den internationalen Markt.",
    description:
      "MadeFor ist die Fiction-Einheit in der Banijay-Welt. Die Website zeigt ein Team um Nanni Erben und Gunnar Juncken sowie fiktionale Arbeiten wie Der Lehrer und zahlreiche Tatort-Dresden-Produktionen.",
    competencies: ["Fiction & Scripted"],
    knownFor: ["Tatort Dresden", "Der Lehrer", "weitere Fiction-Produktionen"],
    roleInWorld: "Fiktionales Storytelling und scripted Produktionskompetenz.",
  },
  {
    slug: "dynamic-ally-pictures",
    name: "Dynamic Ally Pictures",
    cluster: "production-formats",
    tier: "specialist",
    profile: "Fiction-Entwicklung für deutsche und internationale Serienmärkte.",
    description:
      "Dynamic Ally Pictures ist eine Berliner Produktionsfirma, gegründet von Veronica Priefer und Johannes Kunkel. Die Company ist auf Entwicklung, Packaging und Finanzierung von TV-Serien für deutsche und internationale Zielgruppen spezialisiert. Als aktuelles Werk wird Helgoland 513 gezeigt.",
    competencies: ["Fiction & Scripted", "International"],
    knownFor: ["Helgoland 513"],
    roleInWorld: "Serienentwicklung mit internationaler Perspektive.",
  },
  {
    slug: "good-humor",
    name: "Good Humor",
    cluster: "production-formats",
    tier: "specialist",
    profile: "Comedy-Fiction aus Writers-Room, Formatentwicklung und Produktion.",
    description:
      "Good Humor entwickelt und produziert Comedy-Fiction. Die Company arbeitet laut eigener Website an Serien, Sitcoms, Komödien, Mockumentarys und Sketch-Formaten und setzt dafür auf Writers-Room-Strukturen mit Kreativen, Autor:innen und Darsteller:innen.",
    competencies: ["Fiction & Scripted", "Comedy & Live"],
    knownFor: ["Comedy-Fiction", "Sitcoms", "Sketch-Formate", "Mockumentarys"],
    roleInWorld: "Humorvolles scripted Entertainment und Comedy-Fiction.",
  },
  {
    slug: "potatohead-pictures",
    name: "Potatohead Pictures",
    cluster: "production-formats",
    tier: "label",
    parent: "EndemolShine Germany",
    profile: "Food-Entertainment und Formatentwicklung rund um Tim Mälzer.",
    description:
      "Potatohead Pictures ist eine Tochterfirma von EndemolShine Germany. Die Company wurde gemeinsam mit Tim Mälzer gegründet und baut auf der kreativen Zusammenarbeit hinter Kitchen Impossible und weiteren Kochformaten auf. Ziel ist eine starke Adresse für Food-Content im deutschsprachigen Raum.",
    competencies: ["Reality & Factual", "Show & Entertainment"],
    knownFor: ["Kitchen Impossible-Kosmos", "Mälzer und Henssler liefern ab!", "Food-Formate"],
    roleInWorld: "Personality-getriebenes Food-Entertainment.",
    note: "Eher als Label / Tochter unter EndemolShine darstellen, nicht als gleich große Hauptcompany.",
  },

  // ── Cluster B: Live, Experiences & Services ─────────────────────────────
  {
    slug: "banijay-germany-live",
    name: "Banijay Germany Live",
    cluster: "live-experiences-services",
    tier: "featured",
    featuredOnHome: true,
    profile: "Live-Entertainment, Comedy-Marken, Tour-Booking und neue Erlebnisformate.",
    description:
      "Banijay Germany Live bündelt Live-Aktivitäten in Tour-Booking, Comedy-Live-Marken und der Entwicklung neuer Live-Formate. MTS Live und Brainpool Live werden darin zusammengeführt. Zum Portfolio gehören Cologne Comedy Festival, Die besten Comedians Deutschlands, NightWash, 1LIVE Comedy-Nacht XXL, NightWash Club und Luminiscence.",
    competencies: ["Comedy & Live", "Talent & Artists", "Services & Experiences"],
    knownFor: ["Cologne Comedy Festival", "NightWash", "1LIVE Comedy-Nacht XXL", "Luminiscence"],
    roleInWorld: "Entertainment aus dem Bildschirm auf die Bühne bringen.",
  },
  {
    slug: "cape-cross",
    name: "Cape Cross",
    cluster: "live-experiences-services",
    tier: "specialist",
    featuredOnHome: true,
    profile: "Production Services für TV, Entertainment, Events und technische Umsetzung.",
    description:
      "Cape Cross ist Full-Service-Dienstleister für Beratung, Konzeption und Umsetzung von Veranstaltungen. Die Website nennt Production Services, Beleuchtung, Beschallung, Rigging, Bühnenbau, Branding, Kamerakräne, Grip und Postproduktion.",
    competencies: ["Services & Experiences"],
    knownFor: ["TV- und Entertainment-Umsetzungen", "Events", "Studio- und Technikservices"],
    roleInWorld: "Technische und operative Produktionskraft.",
  },
  {
    slug: "myshow",
    name: "MyShow",
    cluster: "live-experiences-services",
    tier: "specialist",
    profile: "Ticketing- und Audience-Plattform für Shows, Live-Events und TV-Produktionen.",
    description:
      "MyShow bündelt buchbare Shows, Tickets, Live-Veranstaltungen, Comedy, Quiz, TV total-Welt, Sport/Action und aktuelle TV-Produktionen. Die Plattform macht die Banijay-Welt für Publikum, Zuschauer:innen und Live-Erlebnisse zugänglich.",
    competencies: ["Services & Experiences"],
    knownFor: ["TV total Köln", "Schlag den Star", "Promi Big Brother", "NightWash", "1LIVE Comedy-Nacht XXL"],
    roleInWorld: "Publikumszugang, Ticketing und Live-Audience-Infrastruktur.",
  },
  {
    slug: "cologne-comedy-festival",
    name: "Cologne Comedy Festival",
    cluster: "live-experiences-services",
    tier: "label",
    profile: "Eine der sichtbarsten Comedy-Bühnen der Banijay-Welt.",
    description:
      "Das Cologne Comedy Festival positioniert sich als Deutschlands größtes Comedy-Festival und zeigt Comedy, Live-Shows, Artists, Locations und Festivalprogramm.",
    competencies: ["Comedy & Live", "Services & Experiences"],
    knownFor: ["Cologne Comedy Festival", "1LIVE Comedy-Nacht XXL", "NightWash-Formate"],
    roleInWorld: "Comedy als Live-Erlebnis und kultureller Treffpunkt.",
    note: "Eher als Live-Marke / Experience Card führen, nicht als klassische Company Card.",
  },

  // ── Cluster C: Digital, Media & Brands ──────────────────────────────────
  {
    slug: "banijay-media-germany",
    name: "Banijay Media Germany",
    cluster: "digital-media-brands",
    tier: "featured",
    featuredOnHome: true,
    profile: "Kreativ- und Vermarktungsagentur für Entertainment, Brands und digitale Reichweite.",
    description:
      "Banijay Media Germany konzipiert, produziert und vertreibt Markenerlebnisse über Medien und Plattformen. Die Agentur arbeitet in Branded Entertainment, digitalem Storytelling, Content Distribution, Community Building und Showservices. Die Units House of Brands, House of Likes und House of Rights bündeln Markenkooperationen, Social Content und Rechteverwertung.",
    competencies: ["Digital & Social", "Services & Experiences"],
    knownFor: ["MySpass", "TV total Brand-Kooperationen", "Social Content", "Branded Entertainment Cases"],
    roleInWorld: "Formate verlängern, Marken verbinden, Reichweite aufbauen.",
  },
  {
    slug: "influence-vision",
    name: "influence.vision",
    cluster: "digital-media-brands",
    tier: "specialist",
    featuredOnHome: true,
    profile: "Influencer-Marketing-Plattform für Creator-Kooperationen und Kampagnen.",
    description:
      "influence.vision positioniert sich als All-in-One-Influencer-Marketing-Plattform. Die Plattform unterstützt Discovery, Creator-Kooperationen und Kampagnenprozesse und erweitert die Banijay-Welt um Creator Economy und digitale Partnerschaften.",
    competencies: ["Digital & Social", "Talent & Artists"],
    knownFor: ["Creator Collaborations", "Influencer Discovery", "Kampagnensteuerung"],
    roleInWorld: "Creator Economy und digitale Vermarktungslogik.",
  },

  // ── Cluster D: Talent & Artist Management ───────────────────────────────
  {
    slug: "mts-management",
    name: "MTS Management",
    cluster: "talent-artists",
    tier: "specialist",
    profile: "Künstlermanagement für bekannte Persönlichkeiten aus Comedy, TV und Entertainment.",
    description:
      "MTS Management führt Künstler:innen wie Atze Schröder, Horst Lichter, Nelson Müller, Lisa Feller, Leon Windscheid und Tony Bauer auf der eigenen Website.",
    competencies: ["Talent & Artists", "Comedy & Live"],
    knownFor: ["Atze Schröder", "Horst Lichter", "Nelson Müller", "Lisa Feller", "Leon Windscheid"],
    roleInWorld: "Talentbindung, Personality-Aufbau und Künstler:innenentwicklung.",
  },
  {
    slug: "sr-management",
    name: "SR Management",
    cluster: "talent-artists",
    tier: "specialist",
    profile: "Künstlermanagement und Vertretung für TV, Moderation und Entertainment.",
    description:
      "SR Management bietet Künstlermanagement und -vertretung für Darsteller:innen und Personen aus TV, Moderation und Entertainment. Die Website nennt unter anderem Oliver Pocher und Cindy aus Marzahn.",
    competencies: ["Talent & Artists"],
    knownFor: ["Oliver Pocher", "Cindy aus Marzahn", "weitere TV- und Entertainment-Persönlichkeiten"],
    roleInWorld: "Management und Vertretung etablierter Entertainment-Persönlichkeiten.",
  },
  {
    slug: "en2rage",
    name: "en2rage",
    cluster: "talent-artists",
    tier: "specialist",
    profile: "Künstlermanagement und Consulting im Entertainment-Umfeld.",
    description:
      "en2rage wird auf der eigenen Website als Management & Consulting GmbH mit Fokus Künstlermanagement geführt.",
    competencies: ["Talent & Artists"],
    knownFor: [],
    roleInWorld: "Spezialisierte Talent- und Management-Struktur.",
    note: "Known for / Beispiele final mit Banijay ergänzen.",
  },
  {
    slug: "ogp-only-good-people",
    name: "OGP / only good people",
    cluster: "talent-artists",
    tier: "specialist",
    profile: "Künstlermanagement für etablierte Künstler:innen und upcoming Talents aus der Comedy-Szene.",
    description:
      "Only Good People beschreibt sich als erste Adresse für etablierte Künstler:innen und upcoming Talents, vor allem aus der Comedy-Szene. Die Firma wurde 1999 gegründet und nennt unter anderem Bastian Bielendorfer, Paul Wolter und selfiesandra als aktuelles Portfolio.",
    competencies: ["Talent & Artists", "Comedy & Live", "Digital & Social"],
    knownFor: ["Bastian Bielendorfer", "Paul Wolter", "selfiesandra", "Özcan Cosar", "Nico Stank"],
    roleInWorld: "Comedy-Talente und digitale Persönlichkeiten langfristig aufbauen.",
  },
  {
    slug: "elevate-talent-management",
    name: "Elevate Talent Management",
    cluster: "talent-artists",
    tier: "specialist",
    profile: "Talent-Management mit europäischer Ausrichtung.",
    description:
      "Elevate Talent Management positioniert sich mit „A home to exclusive talent“ und „Nurturing talent across Europe“. Die Website zeigt Talents, Case Studies und Standorte in Köln und Wien.",
    competencies: ["Talent & Artists", "International"],
    knownFor: ["Sandra Hesch", "weitere Talents final ergänzen"],
    roleInWorld: "Talent-Aufbau über Märkte und Plattformen hinweg.",
  },

  // ── Cluster E: International / DACH / Europe ─────────────────────────────
  {
    slug: "bb-endemol-shine",
    name: "B&B Endemol Shine",
    cluster: "international",
    tier: "specialist",
    profile: "Schweizer Banijay-Niederlassung für Shows, Quiz, Dokumentationen und Factual.",
    description:
      "B&B Endemol Shine beschreibt sich als Schweizer Niederlassung von Banijay. Die Company verkauft und produziert Banijay-TV-Shows, entwickelt für den Schweizer Markt und arbeitet in großen Shows, Quiz, Dokumentationen und Factual-Serien.",
    competencies: ["International", "Show & Entertainment", "Reality & Factual"],
    knownFor: ["1 gegen 100", "Schweizer Shows", "Dokumentationen", "Factual-Serien"],
    roleInWorld: "DACH-Erweiterung und Schweizer Produktionskompetenz.",
  },
  {
    slug: "endemol-shine-polska",
    name: "Endemol Shine Polska",
    cluster: "international",
    tier: "specialist",
    profile: "Polnischer Produktionshub für Entertainment, Fiction und internationale Formate.",
    description:
      "Endemol Shine Polska beschreibt sich als Teil der internationalen Banijay-Gruppe und als Produzent von über 50 Titeln aus Unterhaltung, Fiction, Reality, Quiz und weiteren Genres. Genannt werden unter anderem MasterChef, LEGO Masters, Big Brother, Good Luck Guys und Fiction-Produktionen.",
    competencies: ["International", "Show & Entertainment", "Reality & Factual", "Fiction & Scripted"],
    knownFor: ["MasterChef", "LEGO Masters", "Big Brother", "Good Luck Guys"],
    roleInWorld: "Europäische Produktions- und Formatkompetenz.",
  },
];

// ── Helfer ────────────────────────────────────────────────────────────────

export const getCompaniesByCluster = (cluster: ClusterId): Company[] =>
  COMPANIES.filter((c) => c.cluster === cluster);

export const getFeaturedHomeCompanies = (): Company[] =>
  COMPANIES.filter((c) => c.featuredOnHome);

export const getCompanyBySlug = (slug: string): Company | undefined =>
  COMPANIES.find((c) => c.slug === slug);
