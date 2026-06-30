import type { PayloadImage } from "@/types/blocks";

// ------------------------------------------------------------------
// Zentrale Inhalte der Startseite. Bewusst als typisierte Module —
// später wird genau diese Struktur aus Payload (Globals/Collections)
// geliefert, ohne dass die Komponenten sich ändern.
// ------------------------------------------------------------------

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Banijay", href: "/" },
  { label: "Companies", href: "/companies" },
  { label: "News", href: "/news" },
  { label: "About", href: "/about" },
  { label: "Career", href: "/career" },
  { label: "Contact", href: "/contact" },
];

export interface FormatItem {
  id: string;
  title: string;
  company: string;
  image: PayloadImage;
}

// Format-Wand — der „Aha"-Moment: bekannte Marken hinter Banijay.
// Bilder = Key-Visuals aus dem Design-Entwurf (Platzhalter-Stand).
export const formats: FormatItem[] = [
  { id: "f1", title: "The Masked Singer", company: "EndemolShine", image: { url: "/formats/format-14.png", alt: "The Masked Singer" } },
  { id: "f2", title: "TV total", company: "Brainpool", image: { url: "/formats/format-15.png", alt: "TV total" } },
  { id: "f3", title: "Schlag den Star", company: "Brainpool", image: { url: "/formats/format-17.png", alt: "Schlag den Star" } },
  { id: "f4", title: "Wer wird Millionär?", company: "EndemolShine", image: { url: "/formats/format-18.png", alt: "Wer wird Millionär?" } },
  { id: "f5", title: "Promi Big Brother", company: "EndemolShine", image: { url: "/formats/format-19.png", alt: "Promi Big Brother" } },
  { id: "f6", title: "Temptation Island", company: "Banijay Productions", image: { url: "/formats/format-20.png", alt: "Temptation Island" } },
  { id: "f7", title: "NightWash", company: "Banijay Germany Live", image: { url: "/formats/format-21.png", alt: "NightWash" } },
  { id: "f8", title: "Tatort Dresden", company: "MadeFor", image: { url: "/formats/format-13.png", alt: "Tatort Dresden" } },
  { id: "f9", title: "Kitchen Impossible", company: "Potatohead Pictures", image: { url: "/formats/format-16.png", alt: "Kitchen Impossible" } },
];

export interface StatItem {
  id: string;
  value: string;
  label: string;
  body: string;
}

// Impact in Zahlen — die gefühlte Größe mit harten Fakten bestätigen.
export const stats: StatItem[] = [
  {
    id: "s1",
    value: "1300",
    label: "Mitarbeiter:innen",
    body: "Rund 1.300 Kreative, Produzent:innen und Spezialist:innen produzieren jährlich über 451 Prime-Time-Erstausstrahlungen und erreichen täglich ein Millionenpublikum.",
  },
  {
    id: "s2",
    value: "25+",
    label: "Companies & Labels",
    body: "Ein vielseitiger Verbund aus Produktionshäusern, Live-Einheiten, Talent-Managements und Plattformen — von EndemolShine über Brainpool bis MadeFor.",
  },
  {
    id: "s3",
    value: "4 Mrd.",
    label: "Views & Zuschauer",
    body: "Unsere Programme erreichen im Fernsehen, im Netz und auf der Bühne jedes Jahr fast vier Milliarden Zuschauer:innen — über lineare, digitale und neue Ausspielwege.",
  },
  {
    id: "s4",
    value: "3000",
    label: "Stunden Entertainment",
    body: "Künstler:innen und Kreative entwickeln gemeinsam rund 3.000 Stunden Programm pro Jahr — Bühnenshows, Live-Sendungen, Serien, Plattformen und Podcasts.",
  },
  {
    id: "s5",
    value: "130+",
    label: "Companies weltweit",
    body: "Als Teil der internationalen Banijay Group verbinden wir lokale Marktnähe mit globaler Content-Kompetenz und einem Netzwerk aus über 130 Companies weltweit.",
  },
];

export interface CompanyItem {
  id: string;
  name: string;
  profile: string;
  image: PayloadImage;
  href: string;
}

// Featured Companies — von der großen Welt in die konkreten Häuser.
export const featuredCompanies: CompanyItem[] = [
  { id: "c1", name: "Banijay Productions Germany", profile: "Populäres Entertainment für Sender, Streaming und Unternehmen.", href: "https://banijayproductions.de/", image: { url: "/formats/co-productions.png", alt: "Banijay Productions Germany" } },
  { id: "c2", name: "EndemolShine Germany", profile: "Große Bewegtbild-Formate, die Emotionen und Zeitgeist verbinden.", href: "https://www.endemolshine.de/", image: { url: "/formats/co-endemolshine.png", alt: "EndemolShine Germany" } },
  { id: "c3", name: "Brainpool", profile: "Comedy, Show und Live mit maximaler popkultureller Sichtbarkeit.", href: "https://www.brainpool.de/", image: { url: "/formats/co-brainpool.png", alt: "Brainpool" } },
  { id: "c4", name: "MadeFor", profile: "Fiction, Serien und Reihen für TV, Streaming und den Weltmarkt.", href: "https://madefor.film/", image: { url: "/formats/co-madefor.jpg", alt: "MadeFor" } },
  { id: "c5", name: "Banijay Germany Live", profile: "Live-Entertainment, Comedy-Marken und neue Erlebnisformate.", href: "https://www.banijaygermanylive.de/", image: { url: "/formats/co-live.png", alt: "Banijay Germany Live" } },
  { id: "c6", name: "Banijay Media Germany", profile: "Kreativ- und Vermarktungsagentur für Brands und digitale Reichweite.", href: "https://www.banijaymedia.de/", image: { url: "/formats/co-media.png", alt: "Banijay Media Germany" } },
];

export const contact = {
  address: "Schanzenstraße 22, 51063 Köln",
  email: "hello@banijay.de",
  phone: "+49 (0) 221 6509 5000",
};
