import type { Metadata } from "next";
import { AlgarveHome } from "@/components/cinematic/AlgarveHome";
import { NewsFilter } from "@/components/cinematic/algarve/NewsFilter";
import { AlgarveSatelliteRings } from "@/components/cinematic/algarve/SatelliteRingsBand";
import { fetchSocialPosts } from "@/components/cinematic/algarve/CareerSocialFeed";
import { mergeFeed } from "@/data/feed";
import { NEWS } from "@/data/news";

export const metadata: Metadata = {
  title: "News",
  description: "Neuigkeiten, Pressemeldungen und Stories aus der Banijay-Welt.",
};

export default async function NewsPage() {
  // News-Beiträge + Social-Posts (Juicer) zu einer datums­sortierten Liste mischen.
  const social = await fetchSocialPosts(30);
  const feed = mergeFeed(NEWS, social);

  return (
    <>
      {/* Hero — Home-Hero + seiten­eigenes Statement */}
      <AlgarveHome
        variant="companies"
        frame3="/hero-v2/frame-3-news.jpg"
        statement="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore."
      />

      {/* Ein gemischter Feed (News + Social, nach Datum) mit Rubrik-Filter
          (Alle · News · Primetime · Podcast · Social) — dichtes Masonry mit nativen
          Thumbnail-Proportionen, Desktop fast volle Breite. */}
      <section className="py-20 lg:py-28" style={{ background: "transparent" }}>
        <div className="mx-auto w-full px-6 max-[767px]:!px-6 lg:px-[2.5vw]" style={{ maxWidth: "1840px" }}>
          <NewsFilter items={feed} />
        </div>
      </section>

      {/* Satellitenringe wachsen von der Seite ins Layout (Wolfram 14.07.) */}
      <AlgarveSatelliteRings side="right" />
    </>
  );
}
