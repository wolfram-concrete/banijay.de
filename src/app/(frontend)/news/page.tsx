import type { Metadata } from "next";
import { AlgarvePageHero } from "@/components/cinematic/algarve/PageHero";
import { NewsFilter } from "@/components/cinematic/algarve/NewsFilter";
import { AlgarveCareerSocialFeed } from "@/components/cinematic/algarve/CareerSocialFeed";
import { NEWS } from "@/data/news";

export const metadata: Metadata = {
  title: "News",
  description: "Neuigkeiten, Pressemeldungen und Stories aus der Banijay-Welt.",
};

export default function NewsPage() {
  return (
    <>
      {/* Hero */}
      <AlgarvePageHero
        headline={"Was\nläuft"}
        label="News"
        body="Premieren, Podcasts, Interviews und Primetime-Erfolge: Was gerade in der Banijay-Welt passiert."
        image="/grid/g11.png"
      />

      {/* News-Grid mit Rubrik-Filter (Alle · News · Primetime · Podcast) — dichtes Masonry
          mit nativen Thumbnail-Proportionen, Desktop fast volle Breite. */}
      <section className="py-20 lg:py-28" style={{ background: "#f8f7f3" }}>
        <div className="mx-auto w-full px-6 max-[767px]:!px-6 lg:px-[2.5vw]" style={{ maxWidth: "1840px" }}>
          <NewsFilter items={NEWS} />
        </div>
      </section>

      {/* Social-Feed — dieselbe Juicer-Section wie auf der Career-Page, mit News-Kontext. */}
      <AlgarveCareerSocialFeed
        headline="Aus unseren Kanälen"
        subline="Was gerade in der Banijay-Welt passiert — direkt aus unseren Social-Feeds."
      />
    </>
  );
}
