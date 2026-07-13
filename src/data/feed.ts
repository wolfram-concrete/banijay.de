import type { NewsItem } from "./news";
import type { SocialPost } from "@/components/cinematic/algarve/CareerSocialSlider";

// Gemischter News-Feed: die redaktionellen News-Beiträge UND die Social-Posts (Juicer)
// werden zu einer Liste zusammengeführt und nach Datum (absteigend) sortiert — auf der
// News-Page „zwischengemischt" statt getrennter Slider-Section.

export type FeedRubrik = "Presse" | "Primetime" | "Podcast" | "Social";

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
  return [...newsItems, ...socialItems].sort((a, b) => b.dateMs - a.dateMs);
}
