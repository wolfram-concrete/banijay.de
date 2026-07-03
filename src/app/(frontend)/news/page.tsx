import type { Metadata } from "next";
import { AlgarvePageHero } from "@/components/cinematic/algarve/PageHero";
import { NewsGrid } from "@/components/cinematic/algarve/NewsGrid";
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

      {/* News-Grid — dichtes 4–5-Spalten-Raster mit Parallax-Aufbau + „Weitere laden" */}
      <section className="py-20 lg:py-28" style={{ background: "#f8f7f3" }}>
        <div className="container">
          <NewsGrid items={NEWS} />
        </div>
      </section>
    </>
  );
}
