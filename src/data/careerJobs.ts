// Kuratierte, aktuelle Jobvorschau (Quelle: gruppenweites Softgarden-Board,
// Stand 2026-08-10). Direkte Softgarden-Links. Die vollständige Jobbörse mit
// Filtern liegt extern — hier nur ein diverser Ausschnitt über die Companies.

export type CareerJob = {
  title: string;
  company: string;
  location: string;
  workTime: string;
  url: string;
};

export const ALL_JOBS_URL = "https://banijay.softgarden.io/de/vacancies";

export const CAREER_JOBS: CareerJob[] = [
  {
    title: "Line Producer (m/w/d)",
    company: "MadeFor Film",
    location: "Berlin",
    workTime: "Vollzeit",
    url: "https://banijay.softgarden.io/job/66566288?l=de",
  },
  {
    title: "Leiter Technisches Facility Management (m/w/d)",
    company: "Brainpool",
    location: "Köln",
    workTime: "Vollzeit",
    url: "https://banijay.softgarden.io/job/64291933?l=de",
  },
  {
    title: "Freelancer Licht / Ton / Rigging – Veranstaltungstechnik (m/w/d)",
    company: "Cape Cross",
    location: "Köln",
    workTime: "Freie Mitarbeit",
    url: "https://banijay.softgarden.io/job/38465579?l=de",
  },
  {
    title: "Business Unit Lead Sales & Brand Partnerships (w/m/d)",
    company: "Banijay Media Germany",
    location: "Köln",
    workTime: "Vollzeit",
    url: "https://banijay.softgarden.io/job/64514208?l=de",
  },
  {
    title: "Studentische Aushilfe (m/w/d) – YouTube",
    company: "Endemol Shine Germany",
    location: "Köln",
    workTime: "Studentische Aushilfe",
    url: "https://banijay.softgarden.io/job/66246333?l=de",
  },
  {
    title: "Praktikum Social Media Redaktion (w/m/d)",
    company: "Banijay Media Germany",
    location: "Köln",
    workTime: "Praktikum",
    url: "https://banijay.softgarden.io/job/61474772?l=de",
  },
  {
    title: "Produktionsassistenz (w/m/d)",
    company: "Endemol Shine Germany",
    location: "Köln",
    workTime: "Vollzeit",
    url: "https://banijay.softgarden.io/job/65803756?l=de",
  },
  {
    title: "Redakteur (w/m/d) oder Jungredakteur (w/m/d)",
    company: "Endemol Shine Germany",
    location: "Köln",
    workTime: "Vollzeit",
    url: "https://banijay.softgarden.io/job/66472813?l=de",
  },
  {
    title: "Senior Sales Manager Brand Partnerships (w/m/d)",
    company: "Banijay Media Germany",
    location: "Köln",
    workTime: "Vollzeit",
    url: "https://banijay.softgarden.io/job/64499433?l=de",
  },
];
