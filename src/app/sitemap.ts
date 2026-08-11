import type { MetadataRoute } from "next";
import { NEWS } from "@/data/news";
import { absoluteUrl, germanDateToIso } from "@/lib/seo";

const STATIC_ROUTE_PAIRS = [
  ["/", "/en"],
  ["/career", "/en/career"],
  ["/news", "/en/news"],
  ["/contact", "/en/contact"],
  ["/impressum", "/en/imprint"],
  ["/datenschutz", "/en/privacy"],
] as const;

function languageAlternates(de: string, en: string) {
  return {
    languages: {
      de: absoluteUrl(de),
      en: absoluteUrl(en),
      "x-default": absoluteUrl(de),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = STATIC_ROUTE_PAIRS.flatMap(([de, en]) => [
    { url: absoluteUrl(de), alternates: languageAlternates(de, en) },
    { url: absoluteUrl(en), alternates: languageAlternates(de, en) },
  ]);

  const newsPages = NEWS.flatMap((item) => {
    const de = `/news/${item.slug}`;
    const en = `/en/news/${item.slug}`;
    const lastModified = germanDateToIso(item.date);
    return [
      { url: absoluteUrl(de), lastModified, alternates: languageAlternates(de, en) },
      { url: absoluteUrl(en), lastModified, alternates: languageAlternates(de, en) },
    ];
  });

  return [...staticPages, ...newsPages];
}
