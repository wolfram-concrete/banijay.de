import type { Metadata } from "next";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/cinematic/Reveal";
import { AlgarvePageHero } from "@/components/cinematic/algarve/PageHero";
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

      {/* News-Grid — Algarve-Editorial */}
      <section className="py-20 lg:py-28" style={{ background: "#f8f7f3" }}>
        <div className="container">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {NEWS.map((item) => (
                <Link key={item.title} href={`/news/${item.slug}`} className="group no-underline">
                  <div
                    className="overflow-hidden rounded-2xl"
                    style={{ aspectRatio: "4 / 3", background: "#e8e6df" }}
                  >
                    <img
                      src={item.img}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-4 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-accent">
                    {item.date}
                  </p>
                  <h2
                    className="mt-2 leading-snug text-foreground"
                    style={{ fontFamily: "var(--font-sharp), sans-serif", fontSize: "1.35rem", fontWeight: 500 }}
                  >
                    {item.title}
                  </h2>
                </Link>
              ))}
            </div>
          </Reveal>

          <div className="mt-12">
            <Button href="https://banijay.de/" variant="outline">
              Alle News auf banijay.de <ArrowUpRight size={16} />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
