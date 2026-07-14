import type { NewsItem } from "./news";
import type { SocialPost } from "@/components/cinematic/algarve/CareerSocialSlider";

// Gemischter News-Feed: die redaktionellen News-Beiträge UND die Social-Posts (Juicer)
// werden zu einer Liste zusammengeführt und nach Datum (absteigend) sortiert — auf der
// News-Page „zwischengemischt" statt getrennter Slider-Section.

export type FeedRubrik = "Presse" | "Primetime" | "Podcast" | "Social" | "Marcus Wolter";

// MARCUS-WOLTER-PRESSE (Wolfram 14.07.): externe Presse-/Podcast-Auftritte von
// Marcus Wolter (Links aus dem internen Presse-Überblick). Bild: CEO-Portrait.
// Daten teils approximativ (Monat aus Quelle/URL) — final via Redaktion.
// Bilder je Artikel aus dem jeweiligen Beitrag gezogen (og:image / Artikelfoto)
// und weboptimiert unter public/news/ abgelegt (Wolfram 14.07.).
const MW_RAW: Omit<FeedItem, "dateMs">[] = [
  { id: "mw-handelsblatt", kind: "news", title: "So profitiert eine Produktionsfirma vom Wettkampf um exklusive Inhalte", date: "15.05.2026", rubrik: "Marcus Wolter", source: "Handelsblatt", img: "/news/mw-handelsblatt.jpg", href: "https://www.handelsblatt.com/unternehmen/it-medien/tv-so-profitiert-eine-produktionsfirma-vom-wettkampf-um-exklusive-inhalte/100197466.html", external: true },
  { id: "mw-dwdl-visionaer", kind: "news", title: "Marcus Wolter: „Die Idee alleine reicht in keinem Business der Welt“", date: "20.04.2026", rubrik: "Marcus Wolter", source: "DWDL · Visionär on air", img: "/news/mw-dwdl.jpg", href: "https://www.dwdl.de/visionaeronair/105921/marcus_wolter_die_idee_alleine_reicht_in_keinem_business_der_welt/", external: true },
  { id: "mw-brandeins", kind: "news", title: "Marcus Wolter im brand eins Podcast", date: "10.03.2026", rubrik: "Marcus Wolter", source: "brand eins", img: "/news/mw-brandeins.jpg", href: "https://detektor.fm/wirtschaft/brand-eins-podcast-marcus-wolter", external: true },
  { id: "mw-deadline", kind: "news", title: "Banijay Germany’s Marcus Wolter on the Future of Entertainment", date: "15.07.2025", rubrik: "Marcus Wolter", source: "Deadline", img: "/news/mw-deadline.jpg", href: "https://deadline.com/2025/07/banijay-germany-marcus-wolter-interview-1236446703/", external: true },
  { id: "mw-abendblatt", kind: "news", title: "Marcus Wolter: Mit Lotto und Stefan Raab fing alles an", date: "20.06.2025", rubrik: "Marcus Wolter", source: "Hamburger Abendblatt", img: "/news/mw-abendblatt.jpg", href: "https://www.abendblatt.de/hamburg/article410198187/marcus-wolter-mit-lotto-und-stefan-raab-fing-alles-an.html", external: true },
];
export const MARCUS_PRESS: FeedItem[] = MW_RAW.map((it) => ({ ...it, dateMs: parseDE(it.date) }));

export type FeedItem = {
  id: string;
  kind: "news" | "social";
  title: string;
  date: string;
  dateMs: number;
  rubrik: FeedRubrik;
  img: string;
  href: string;
  external: boolean;
  /** Nur Social: Quelle (LinkedIn / Instagram …) für das Badge. */
  source?: string;
};

/** "DD.MM.YYYY" → sortierbarer Timestamp (0 bei unparsbar). */
function parseDE(d: string): number {
  const m = d.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
  if (!m) return 0;
  return Date.UTC(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
}

/** Roh-Kategorie der News → Filter-Rubrik. Podcast = ausschließlich die eigenen
    „WOLTER TALKS"-Folgen; fremde Podcast-Auftritte zählen als News. */
function newsRubrik(category: string): Exclude<FeedRubrik, "Social"> {
  const c = category.toLowerCase();
  if (c.includes("wolter")) return "Podcast";
  if (c.includes("primetime")) return "Primetime";
  return "Presse";
}

export function mergeFeed(news: NewsItem[], social: SocialPost[]): FeedItem[] {
  const newsItems: FeedItem[] = news.map((n) => ({
    id: `n-${n.slug}`,
    kind: "news",
    title: n.title,
    date: n.date,
    dateMs: parseDE(n.date),
    rubrik: newsRubrik(n.category),
    img: n.img,
    href: `/news/${n.slug}`,
    external: false,
  }));
  const socialItems: FeedItem[] = social.map((p, i) => ({
    id: `s-${i}`,
    kind: "social",
    title: p.text,
    date: p.date,
    dateMs: parseDE(p.date),
    rubrik: "Social",
    img: p.image,
    href: p.url,
    external: true,
    source: p.source,
  }));
  return [...newsItems, ...socialItems, ...MARCUS_PRESS].sort((a, b) => b.dateMs - a.dateMs);
}
