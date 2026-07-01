// Format-Wand (Konzept Section 3 „Brands & Formate").
// „Eine große Wand aus Formaten, Szenen, Logos und Momenten." — der Aha-Moment.
// Beim Hover/Klick: Format · Company · Genre · Sender/Plattform · Kurzinfo.
//
// Inhalte aus den „Known for"-Angaben der Companies. Sender/Plattform bewusst
// optional gehalten und nur dort gesetzt, wo eindeutig — sonst im Wireframe leer.

import type { Competency } from "./companies";

export interface FormatItem {
  title: string;
  /** Company-Slug (Verknüpfung in die Company-Welt). */
  companySlug: string;
  companyName: string;
  genre: Competency | string;
  platform?: string;
}

export const FORMATS: FormatItem[] = [
  { title: "The Masked Singer", companySlug: "endemolshine-germany", companyName: "EndemolShine Germany", genre: "Show & Entertainment" },
  { title: "Wer wird Millionär?", companySlug: "endemolshine-germany", companyName: "EndemolShine Germany", genre: "Quiz" },
  { title: "Promi Big Brother", companySlug: "endemolshine-germany", companyName: "EndemolShine Germany", genre: "Reality & Factual" },
  { title: "Kitchen Impossible", companySlug: "endemolshine-germany", companyName: "EndemolShine Germany", genre: "Factual Entertainment" },
  { title: "LEGO Masters", companySlug: "endemolshine-germany", companyName: "EndemolShine Germany", genre: "Show & Entertainment" },
  { title: "TV total", companySlug: "brainpool", companyName: "Brainpool", genre: "Comedy & Live" },
  { title: "Schlag den Star", companySlug: "brainpool", companyName: "Brainpool", genre: "Show & Entertainment" },
  { title: "Bratwurst und Baklava", companySlug: "brainpool", companyName: "Brainpool", genre: "Comedy & Live" },
  { title: "NightWash", companySlug: "banijay-germany-live", companyName: "Banijay Germany Live", genre: "Comedy & Live" },
  { title: "Temptation Island", companySlug: "banijay-productions-germany", companyName: "Banijay Productions Germany", genre: "Reality & Factual" },
  { title: "Das große Promibüßen", companySlug: "banijay-productions-germany", companyName: "Banijay Productions Germany", genre: "Reality & Factual" },
  { title: "Hast du Töne?", companySlug: "banijay-productions-germany", companyName: "Banijay Productions Germany", genre: "Show & Entertainment" },
  { title: "Tatort Dresden", companySlug: "madefor", companyName: "MadeFor", genre: "Fiction & Scripted" },
  { title: "Der Lehrer", companySlug: "madefor", companyName: "MadeFor", genre: "Fiction & Scripted" },
  { title: "Helgoland 513", companySlug: "dynamic-ally-pictures", companyName: "Dynamic Ally Pictures", genre: "Fiction & Scripted" },
  { title: "Cologne Comedy Festival", companySlug: "cologne-comedy-festival", companyName: "Cologne Comedy Festival", genre: "Comedy & Live" },
];
