// Globale Site-Daten: Navigation, Kontakt, Zahlen-Module.
// Bildet später Payload-Globals ab (Header, Footer, CompanyStats).

export interface NavItem {
  label: string;
  href: string;
}

/** Empfohlene Hauptnavigation (Konzept „Navigation"). Team gehört auf About. */
export const NAV_ITEMS: NavItem[] = [
  { label: "Banijay", href: "/" },
  { label: "Companies", href: "/companies" },
  { label: "News", href: "/news" },
  { label: "About", href: "/about" },
  { label: "Career", href: "/career" },
  { label: "Contact", href: "/contact" },
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
  { value: "1.300", label: "Mitarbeitende", note: "Kreative, Produzent:innen, Teams und Spezialist:innen." },
  { value: "25+", label: "Companies und Labels", note: "Produktionshäuser, Live-Einheiten, Managements und Plattformen." },
  { value: "4 Milliarden", label: "Views & Zuschauer", note: "Reichweite über lineare, digitale und weitere Ausspielwege." },
  { value: "3.000", label: "Stunden Entertainment", note: "Produktionskraft über Genres und Plattformen hinweg." },
  { value: "130+", label: "Companies weltweit", note: "Lokale Marktnähe mit internationaler Banijay-Perspektive." },
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
  pressContact: string;
}

export const CONTACT: ContactDetails = {
  street: "Schanzenstraße 22",
  city: "51063 Köln",
  email: "hello@banijay.de",
  phone: "+49 (0) 221 6509 5000",
  pressContact: "Simone Lenzen",
};

export const SITE = {
  name: "Banijay Germany",
  tagline: "Die Entertainment-Welt hinter den Momenten, über die Deutschland spricht.",
};
