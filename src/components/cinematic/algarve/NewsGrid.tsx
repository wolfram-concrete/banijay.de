"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { NewsItem } from "@/data/news";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// News-Grid (News-Seite): 5-Spalten-Raster mit breiten QUERFORMAT-Bildcontainern
// (passt zu den meist querformatigen Beiträgen), locker gesetzt (großer Row-Gap).
// Je Beitrag Datum · Titel · „Zum Beitrag"-CTA. Die Karten bauen sich beim Rein-
// scrollen gestaffelt per Parallax auf. Unten ein „Weitere News laden"-Button, der
// batchweise nachlädt (CMS-ready: wächst automatisch mit mehr Einträgen).

const SHARP = "var(--font-sharp), sans-serif";
const INITIAL = 15; // drei volle Reihen im 5-Spalten-Raster
const BATCH = 10;

export function NewsGrid({ items }: { items: NewsItem[] }) {
  const [count, setCount] = useState(Math.min(INITIAL, items.length));
  const grid = useRef<HTMLDivElement>(null);
  const visible = items.slice(0, count);

  // Reveal: neue (noch nicht enthüllte) Karten gestaffelt einblenden, sobald sie in
  // den Viewport kommen. Läuft beim ersten Mount UND nach jedem „Weitere laden".
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-news-card]").filter((c) => !c.dataset.revealed);
      if (!cards.length) return;
      cards.forEach((c) => (c.dataset.revealed = "1"));
      gsap.set(cards, { opacity: 0, y: 54 });
      ScrollTrigger.batch(cards, {
        start: "top 94%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.09 }),
      });
    },
    { dependencies: [count], scope: grid },
  );

  return (
    <>
      <div ref={grid} className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {visible.map((item) => (
          <Link
            key={item.slug}
            data-news-card
            href={`/news/${item.slug}`}
            className="group flex flex-col no-underline"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Querformat-Bildcontainer (breit, passt zu querformatigen Beiträgen) */}
            <div className="overflow-hidden rounded-xl" style={{ aspectRatio: "16 / 10", background: "#e8e6df" }}>
              <img
                src={item.img}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
            </div>
            <p className="mt-4 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-accent">{item.date}</p>
            <h2
              className="mt-1.5 leading-snug text-foreground"
              style={{ fontFamily: SHARP, fontSize: "1.05rem", lineHeight: "126%", fontWeight: 500 }}
            >
              {item.title}
            </h2>
            {/* CTA zum Beitrag — visueller Affordance-Marker (ganze Karte ist klickbar) */}
            <span
              className="mt-2.5 inline-flex items-center gap-1 text-[0.82rem] font-medium text-accent"
              style={{ fontFamily: SHARP }}
            >
              Zum Beitrag
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        ))}
      </div>

      {count < items.length && (
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => setCount((c) => Math.min(items.length, c + BATCH))}
            className="inline-flex items-center gap-2 rounded-full bg-[#0e0d0b] text-[#f8f7f3] transition-colors duration-300 hover:bg-[#ff4370]"
            style={{ padding: "0.9rem 2rem", fontFamily: SHARP, fontSize: "1rem", fontWeight: 500 }}
          >
            Weitere News laden
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
        </div>
      )}
    </>
  );
}
