// News-Interim: die 9 neuesten Meldungen von der Live-Seite (scraped_content,
// Stand 2026-06-25), Bilder lokal in public/news/. Per-Artikel-Links folgen mit
// der CMS-/Redaktions-Anbindung (die gescrapten Einzel-Slugs sind nicht stabil).

export interface NewsItem {
  title: string;
  date: string;
  img: string;
}

export const NEWS: NewsItem[] = [
  { title: "Aaron Troschke im Banijay-Podcast WOLTER TALKS", date: "03.06.2026", img: "/news/n1.png" },
  { title: "Wir unterstützen die DKMS: Das beste Mittel gegen Blutkrebs seid Ihr!", date: "29.05.2026", img: "/news/n2.png" },
  { title: "Marcus Wolter zu Gast im „brand eins Podcast“", date: "17.04.2026", img: "/news/n3.jpg" },
  { title: "Nelson Müller im Banijay-Podcast WOLTER TALKS", date: "13.04.2026", img: "/news/n4.jpg" },
  { title: "88% Primetime-Hitrate im März!", date: "01.04.2026", img: "/news/n5.jpg" },
  { title: "Max Schradin im Banijay-Podcast WOLTER TALKS", date: "03.03.2026", img: "/news/n6.png" },
  { title: "Handelsblatt-Interview mit Marcus Wolter", date: "22.02.2026", img: "/news/n7.jpg" },
  { title: "97% Primetime-Hitrate im Januar!", date: "02.02.2026", img: "/news/n8.jpg" },
  { title: "FOCUS Money: Interview mit Marcus Wolter", date: "22.01.2026", img: "/news/n9.jpg" },
];
