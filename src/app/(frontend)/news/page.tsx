import type { Metadata } from "next";
import { AlgarveHome } from "@/components/cinematic/AlgarveHome";
import { NewsSections } from "@/components/cinematic/algarve/NewsSections";
import { fetchCombinedSocialPosts } from "@/components/cinematic/algarve/CareerSocialFeed";
import { mergeFeed } from "@/data/feed";
import { NEWS } from "@/data/news";

export const metadata: Metadata = {
  title: { absolute: "News & Presse | Banijay Germany" },
  description: "Neuigkeiten, Pressemeldungen und Stories aus der Banijay-Welt.",
  alternates: {
    canonical: "/news",
    languages: { de: "/news", en: "/en/news", "x-default": "/news" },
  },
};

export default async function NewsPage() {
  // News-Beiträge + Social-Posts (LinkedIn via Juicer + Instagram via Elfsight,
  // kanalübergreifend dublettenbereinigt) zu einer datumssortierten Liste mischen.
  const social = await fetchCombinedSocialPosts(30);
  const feed = mergeFeed(NEWS, social);

  return (
    <>
      {/* Hero — Home-Hero + seiten­eigenes Statement */}
      <AlgarveHome
        variant="companies"
        frame3="/hero-v2/frame-3-news.webp"
        statementKey="news"
        parallaxExit
      />

      {/* Rubrik-BLÖCKE statt einer gemischten Gesamtliste mit Chip-Filter (Wolfram
          16.07., Primetime-Hitrate raus 24.07.): Presse · Podcast · Marcus Wolter · Social —
          je Block eine linksbündige Headline, eine Trennlinie und die Posts als
          Slider. mergeFeed sortiert weiterhin nach Datum, das gilt jetzt innerhalb
          jedes Blocks. */}
      <section className="py-20 lg:py-28" style={{ background: "transparent" }}>
        <div className="mx-auto w-full px-6 max-[767px]:!px-6 lg:px-[2.5vw]" style={{ maxWidth: "1840px" }}>
          <NewsSections items={feed} />
        </div>
      </section>
    </>
  );
}
