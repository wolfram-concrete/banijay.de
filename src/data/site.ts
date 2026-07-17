// Globale Site-Daten: Navigation, Kontakt, Zahlen-Module.
// Bildet später Payload-Globals ab (Header, Footer, CompanyStats).

export interface NavItem {
  label: string;
  href: string;
}

/** Empfohlene Hauptnavigation (Konzept „Navigation"). Team gehört auf About. */
export const NAV_ITEMS: NavItem[] = [
  // Companies-Seite entfernt (Wolfram 16.07.) — das Companies-Bento lebt auf der Home.
  { label: "Banijay", href: "/" },
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
  { label: "Career", href: "/career" },
];

/** Rechtliches — subtil unten im Menü-Overlay. */
export const LEGAL_ITEMS: NavItem[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];

export interface Stat {
  value: string;
  label: string;
  /** Nur auf About zeigen (z. B. Umsatz, vorbehaltlich Freigabe). */
  aboutOnly?: boolean;
  note?: string;
}

/** Zahlenmodule. Auf Home max. 5 (Konzept Section 4). */
export const STATS: Stat[] = [
  // Wording + Einheiten-Suffixe wie in der Editorial-Fact-Section (Wolfram 15.07.).
  // 1.300+ → 1.400+ (Heike 17.07.) — muss mit der Editorial-Fact-Section auf der Home
  // übereinstimmen (EditorialStickyScene.tsx).
  { value: "1.400+", label: "Mitarbeiterinnen und Mitarbeiter", note: "Kreative, Produzent:innen, Teams und Spezialist:innen." },
  { value: "40+", label: "Companies und Labels", note: "Produktionshäuser, Live-Einheiten, Managements und Plattformen." },
  { value: "4 Mrd.", label: "Views & Zuschauer jährlich", note: "Reichweite über lineare, digitale und weitere Ausspielwege." },
  // 3.000 → 4.500 (Wolfram 17.07.) — muss mit der Editorial-Fact-Section auf der Home
  // übereinstimmen (EditorialStickyScene.tsx).
  { value: "4.500 hrs.", label: "Stunden Entertainment", note: "Erfahrung, Reichweite und Umsetzungskraft über Genres und Plattformen." },
  // 130+ → 170+ korrigiert (Wolfram 17.07.) — muss mit der Editorial-Fact-Section auf
  // der Home übereinstimmen (EditorialStickyScene.tsx), sonst nennen Home und About
  // unterschiedliche Zahlen.
  { value: "170+", label: "Companies weltweit", note: "Lokale Marktnähe mit internationaler Banijay-Perspektive." },
  {
    value: "250 Mio. €",
    label: "Umsatz",
    aboutOnly: true,
    note: "Optional, finale Freigabe mit Banijay nötig — steht auf der Corporate-Seite.",
  },
];

export const homeStats = () => STATS.filter((s) => !s.aboutOnly);

export interface ContactDetails {
  street: string;
  city: string;
  email: string;
  phone: string;
  /** Persönlicher Pressekontakt (Wolfram 16.07.) — ersetzt die zuvor geratene
   *  Sammeladresse presse@banijay.de, die unbelegt war. */
  pressEmail: string;
  pressContact: string;
}

export const CONTACT: ContactDetails = {
  street: "Schanzenstraße 22",
  city: "51063 Köln",
  email: "hello@banijay.de",
  phone: "+49 (0) 221 6509 5000",
  pressEmail: "simone.lenzen@banijay.de",
  pressContact: "Simone Lenzen",
};

export const SITE = {
  name: "Banijay Germany",
  tagline: "Die Entertainment-Welt hinter den Momenten, über die Deutschland spricht.",
};

/** Social-Profile (im Menü-Overlay als Button-Flächen unter „Folgen"). */
export const SOCIAL = {
  instagram: { label: "Instagram", handle: "@banijaygermany", url: "https://instagram.com/banijaygermany" },
  linkedin: { label: "LinkedIn", handle: "Banijay Germany", url: "https://www.linkedin.com/company/banijaygermany/" },
} as const;
