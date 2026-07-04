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
const INITIAL = 15;
const BATCH = 10;

// Masonry-Rhythmus: pro Karte ein wechselndes Seitenverhältnis (Hoch-, Quer- und
// Quadratformate im Wechsel). Die 6er-Palette teilt sich nicht glatt durch die
// Spaltenzahl (2/3/4) → die Spalten versetzen sich gegeneinander, das Raster wirkt
// redaktionell-asymmetrisch statt gleichförmig. Der CSS-Multi-Column-Flow packt die
// unterschiedlich hohen Karten dicht (Pinterest-Prinzip).
const RATIOS = ["4 / 5", "16 / 11", "1 / 1", "3 / 4", "16 / 10", "5 / 6"];

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
      {/* Masonry via CSS-Multi-Column: unterschiedlich hohe Karten packen sich dicht,
          break-inside-avoid hält jede Karte zusammen. Spaltenzahl responsiv. */}
      <div ref={grid} className="columns-1 gap-x-6 sm:columns-2 lg:columns-3 xl:columns-4">
        {visible.map((item, i) => (
          <Link
            key={item.slug}
            data-news-card
            href={`/news/${item.slug}`}
            className="group mb-11 block break-inside-avoid no-underline"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Bildcontainer mit wechselndem Seitenverhältnis (Masonry-Rhythmus) */}
            {/* Mobil: Container übernimmt das NATIVE Seitenverhältnis des vorbereiteten
                Banijay-Preview-Bildes (aspect-auto + Bild in natürlicher Höhe → kein
                Crop). Desktop behält den Masonry-Rhythmus (feste RATIOS, object-cover). */}
            <div className="overflow-hidden rounded-xl max-[767px]:!aspect-auto" style={{ aspectRatio: RATIOS[i % RATIOS.length], background: "#e8e6df" }}>
              <img
                src={item.img}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05] max-[767px]:!h-auto"
              />
            </div>
            <p className="mt-4 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-accent">{item.date}</p>
            <h2
              className="mt-1.5 leading-snug text-foreground"
              style={{ fontFamily: SHARP, fontSize: "1.05rem", lineHeight: "126%", fontWeight: 500 }}
            >
              {item.title}
            </h2>
            {/* CTA zum Beitrag — visueller Affordance-Marker (ganze Karte ist klickbar).
                Hover (auf der ganzen Karte): eine Underline läuft von links unter dem
                Text ein, der Pfeil rückt diagonal nach außen. */}
            <span
              className="mt-2.5 inline-flex items-center gap-1 text-[0.82rem] font-medium text-accent"
              style={{ fontFamily: SHARP }}
            >
              <span className="relative">
                Zum Beitrag
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </span>
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
            className="group inline-flex items-center gap-2 rounded-full bg-[#0e0d0b] text-[#f8f7f3] transition-colors duration-300 hover:bg-[#ff4370]"
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
