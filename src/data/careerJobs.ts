// Notfall-Fallback für die automatisch aggregierte Softgarden-Jobvorschau.
// Im Normalbetrieb kommen die aktiven Stellen aus src/lib/softgarden.ts und
// werden alle 15 Minuten neu validiert. Diese Liste wird nur bei einem
// vollständigen API-Ausfall verwendet.

export type CareerJob = {
  title: string;
  company: string;
  location: string;
  workTime: string;
  url: string;
};

export const ALL_JOBS_URL = "https://banijay.softgarden.io/de/vacancies";

export const FALLBACK_CAREER_JOBS: CareerJob[] = [
  {
    title: "Line Producer (m/w/d)",
    company: "Banijay Germany",
    location: "Berlin",
    workTime: "Vollzeit",
    url: "https://short.sg/j/66566293",
  },
  {
    title: "Leiter Technisches Facility Management (m/w/d)",
    company: "BRAINPOOL TV GmbH",
    location: "Köln",
    workTime: "Vollzeit",
    url: "https://short.sg/j/64291938",
  },
  {
    title: "Logger/Redaktionsassistent (w/m/d)",
    company: "Endemol Shine Germany",
    location: "Köln",
    workTime: "Vollzeit",
    url: "https://short.sg/j/65176025",
  },
  {
    title: "Business Unit Lead Sales & Brand Partnerships (w/m/d)",
    company: "Banijay Media Germany",
    location: "Köln",
    workTime: "Vollzeit",
    url: "https://short.sg/j/64514213",
  },
  {
    title: "Initiativbewerbung (w/m/d)",
    company: "Banijay Productions Germany",
    location: "Köln",
    workTime: "Voll- oder Teilzeit",
    url: "https://short.sg/j/17879394",
  },
  {
    title: "Produktionsassistenz (w/m/d)",
    company: "Endemol Shine Germany",
    location: "Köln",
    workTime: "Vollzeit",
    url: "https://short.sg/j/65803761",
  },
  {
    title: "Senior Sales Manager Brand Partnerships (w/m/d)",
    company: "Banijay Media Germany",
    location: "Köln",
    workTime: "Vollzeit",
    url: "https://short.sg/j/64499438",
  },
  {
    title: "Studentische Aushilfe (m/w/d) – YouTube",
    company: "Endemol Shine Germany",
    location: "Köln",
    workTime: "Vollzeit",
    url: "https://short.sg/j/66246353",
  },
  {
    title: "Initiativbewerbung (w/m/d)",
    company: "BRAINPOOL TV GmbH",
    location: "Köln",
    workTime: "Voll- oder Teilzeit",
    url: "https://short.sg/j/42342706",
  },
];
