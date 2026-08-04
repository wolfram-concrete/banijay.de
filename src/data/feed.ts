import type { NewsItem } from "./news";
import type { SocialPost } from "@/components/cinematic/algarve/CareerSocialSlider";

// Gemischter News-Feed: die redaktionellen News-Beiträge UND die Social-Posts (Juicer)
// werden zu einer Liste zusammengeführt und nach Datum (absteigend) sortiert — auf der
// News-Page „zwischengemischt" statt getrennter Slider-Section.

export type FeedRubrik = "Presse" | "Primetime" | "Podcast" | "Social" | "Marcus Wolter";

// EXTERNE PRESSE (Wolfram 14.07.): Berichterstattung über Banijay in fremden Medien,
// verlinkt statt nachgedruckt — es gibt bewusst keine Detailseite dafür, `external: true`
// führt direkt zur Quelle. Die RUBRIK entscheidet jeder Eintrag selbst:
//   „Marcus Wolter" = Interviews und Auftritte des CEO (Links aus dem internen
//                     Presse-Überblick; Daten teils approximativ — Monat aus Quelle/URL,
//                     final via Redaktion)
//   „Presse"        = Berichte ÜBER Banijay, ohne dass Marcus Wolter der Anlass ist
// Bilder je Artikel aus dem jeweiligen Beitrag gezogen (og:image / Artikelfoto) und
// weboptimiert unter public/news/ abgelegt. ⚠️ Das sind Bilder der jeweiligen Redaktion
// — Nutzungsrecht vor dem Livegang klären (siehe README).
// Die Liste hieß bis 17.07. MARCUS_PRESS; umbenannt, als der erste Nicht-Wolter-Artikel
// dazukam.
const EXTERNAL_RAW: Omit<FeedItem, "dateMs">[] = [
  // DWDL-Fachbericht zum Livegeschäft (Wolfram 17.07.). Rubrik „Presse", NICHT
  // „Marcus Wolter": Der Artikel ist eine Branchenanalyse von Torsten Zarges über das
  // Live-Geschäft, kein Interview mit dem CEO — auch wenn das DWDL-Aufmacherbild ihn zeigt.
  { id: "p-dwdl-livegeschaeft", kind: "news", title: "Zwischen Kirche und Kampfsport: Banijay legt im Live-Geschäft zu", date: "26.08.2025", rubrik: "Presse", source: "DWDL", img: "/news/dwdl-live-geschaeft.jpg", href: "https://www.dwdl.de/magazin/103481/zwischen_kirche_und_kampfsport_banijay_legt_im_livegeschaeft_zu/", external: true },
  { id: "mw-handelsblatt", kind: "news", title: "So profitiert eine Produktionsfirma vom Wettkampf um exklusive Inhalte", date: "15.05.2026", rubrik: "Marcus Wolter", source: "Handelsblatt", img: "/news/mw-handelsblatt.jpg", href: "https://www.handelsblatt.com/unternehmen/it-medien/tv-so-profitiert-eine-produktionsfirma-vom-wettkampf-um-exklusive-inhalte/100197466.html", external: true },
  { id: "mw-dwdl-visionaer", kind: "news", title: "Marcus Wolter: „Die Idee alleine reicht in keinem Business der Welt“", date: "20.04.2026", rubrik: "Marcus Wolter", source: "DWDL · Visionär on air", img: "/news/mw-dwdl.jpg", href: "https://www.dwdl.de/visionaeronair/105921/marcus_wolter_die_idee_alleine_reicht_in_keinem_business_der_welt/", external: true },
  { id: "mw-brandeins", kind: "news", title: "Marcus Wolter im brand eins Podcast", date: "10.03.2026", rubrik: "Marcus Wolter", source: "brand eins", img: "/news/mw-brandeins.jpg", href: "https://detektor.fm/wirtschaft/brand-eins-podcast-marcus-wolter", external: true },
  { id: "mw-deadline", kind: "news", title: "Banijay Germany’s Marcus Wolter on the Future of Entertainment", date: "15.07.2025", rubrik: "Marcus Wolter", source: "Deadline", img: "/news/mw-deadline.jpg", href: "https://deadline.com/2025/07/banijay-germany-marcus-wolter-interview-1236446703/", external: true },
  { id: "mw-abendblatt", kind: "news", title: "Marcus Wolter: Mit Lotto und Stefan Raab fing alles an", date: "20.06.2025", rubrik: "Marcus Wolter", source: "Hamburger Abendblatt", img: "/news/mw-abendblatt.jpg", href: "https://www.abendblatt.de/hamburg/article410198187/marcus-wolter-mit-lotto-und-stefan-raab-fing-alles-an.html", external: true },
];
export const EXTERNAL_PRESS: FeedItem[] = EXTERNAL_RAW.map((it) => ({ ...it, dateMs: parseDE(it.date) }));

const EXTERNAL_PRESS_TITLES_EN: Record<string, string> = {
  "p-dwdl-livegeschaeft": "From churches to combat sports: Banijay expands its live business",
  "mw-handelsblatt": "How a production company benefits from the competition for exclusive content",
  "mw-dwdl-visionaer": "Marcus Wolter: ‘An idea alone is not enough in any business’",
  "mw-brandeins": "Marcus Wolter on the brand eins Podcast",
  "mw-deadline": "Banijay Germany’s Marcus Wolter on the future of entertainment",
  "mw-abendblatt": "Marcus Wolter: It all started with the lottery and Stefan Raab",
};

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
  imageVariant?: "wide";
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

export function mergeFeed(news: NewsItem[], social: SocialPost[], locale: "de" | "en" = "de"): FeedItem[] {
  const newsItems: FeedItem[] = news.map((n) => ({
    id: `n-${n.slug}`,
    kind: "news",
    title: n.title,
    date: n.date,
    dateMs: parseDE(n.date),
    rubrik: newsRubrik(n.category),
    img: n.img,
    imageVariant: n.imageVariant,
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
  const pressItems = locale === "en"
    ? EXTERNAL_PRESS.map((item) => ({ ...item, title: EXTERNAL_PRESS_TITLES_EN[item.id] ?? item.title }))
    : EXTERNAL_PRESS;
  return [...newsItems, ...socialItems, ...pressItems].sort((a, b) => b.dateMs - a.dateMs);
}
