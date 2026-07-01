import type { Metadata } from "next";
/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/wireframe";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/cinematic/Reveal";
import { NEWS } from "@/data/news";

export const metadata: Metadata = {
  title: "News",
  description: "Neuigkeiten, Pressemeldungen und Stories aus der Banijay-Welt.",
};

export default function NewsPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border px-[2vw] pb-16 pt-36 lg:pb-20 lg:pt-44">
        <Reveal>
          <Eyebrow className="text-accent">News</Eyebrow>
          <h1 className="mt-6 font-medium uppercase leading-[0.9] tracking-tight text-[clamp(2.6rem,8.5vw,9rem)]">
            News
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Neuigkeiten, Pressemeldungen und Stories aus der Banijay-Welt.
          </p>
        </Reveal>
      </section>

      {/* News-Grid */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {NEWS.map((item) => (
                <article
                  key={item.title}
                  className="group overflow-hidden rounded-xl border border-border bg-background transition-colors hover:border-foreground/30"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-surface">
                    <img
                      src={item.img}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent/80">
                      {item.date}
                    </p>
                    <h2 className="mt-2 text-lg font-medium leading-snug">{item.title}</h2>
                  </div>
                </article>
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
