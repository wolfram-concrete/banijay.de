// Kuratierte, aktuelle Jobvorschau (Quelle: https://banijay.de/offene-stellen/,
// Stand 2026-07-02). Direkte Softgarden-Links. Die vollständige Jobbörse mit
// Filtern liegt extern — hier nur ein diverser Ausschnitt über die Companies.

export type CareerJob = {
  title: string;
  company: string;
  location: string;
  workTime: string;
  url: string;
};

export const ALL_JOBS_URL = "https://banijay.de/offene-stellen/";

export const CAREER_JOBS: CareerJob[] = [
  {
    title: "(Senior) Artist Manager (w/m/d)",
    company: "Banijay Germany",
    location: "Köln",
    workTime: "Vollzeit",
    url: "https://banijay-germany.softgarden.io/job/65092508?l=de",
  },
  {
    title: "Eventmanager (w/m/d)",
    company: "Banijay Germany",
    location: "Köln",
    workTime: "Vollzeit",
    url: "https://banijay-germany.softgarden.io/job/64247923?l=de",
  },
  {
    title: "Jungredakteur (w/m/d)",
    company: "Endemol Shine Germany",
    location: "Köln",
    workTime: "Vollzeit",
    url: "https://endemolshine.softgarden.io/job/65552056?l=de",
  },
  {
    title: "Werkstudent Video Content Creation / Video Editing (w/m/d)",
    company: "Endemol Shine Germany",
    location: "Köln",
    workTime: "Werkstudent",
    url: "https://endemolshine.softgarden.io/job/65323536?l=de",
  },
  {
    title: "Lead Technical Facility & Studio Service (m/w/d)",
    company: "Brainpool",
    location: "Köln",
    workTime: "Vollzeit",
    url: "https://brainpool.softgarden.io/job/64291933?l=de",
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
    url: "https://banijay-media.softgarden.io/job/64514208?l=de",
  },
  {
    title: "Werkstudent Social Media Redaktion (w/m/d)",
    company: "Banijay Media Germany",
    location: "Köln",
    workTime: "Werkstudent",
    url: "https://banijay-media.softgarden.io/job/64995048?l=de",
  },
  {
    title: "Ausbildung zur Fachkraft für Veranstaltungstechnik",
    company: "Cape Cross",
    location: "Köln",
    workTime: "Ausbildung",
    url: "https://banijay.softgarden.io/job/65391736?l=de",
  },
];
