"use client";

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { FeedItem } from "@/data/feed";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// News-Grid (News-Seite) — Masonry mit NATIVEN Thumbnail-Proportionen (kein Crop).
// Desktop: echtes CSS-Grid-Masonry (Pinterest-Packing über berechnete Row-Spans) mit
// variablen Card-Größen — einzelne „Feature"-Karten sind 2 Spalten breit → sichtbare
// Größenvarianz trotz gleicher (16:9-)Quellformate. Nutzt fast die volle Grid-Breite.
// Mobile: eine Spalte, gestapelt (unverändert). Karten bauen sich beim Rein-scrollen
// gestaffelt auf; „Weitere News laden" lädt batchweise nach (CMS-ready).

const SHARP = "var(--font-sharp), sans-serif";
const INITIAL = 21;
const BATCH = 12;

const ROW_UNIT = 8; // px — grid-auto-rows-Basis (Desktop-Masonry)
const ROW_GAP = 44; // px — visueller Abstand unter jeder Karte (in den Row-Span eingerechnet)

// Feature-Karten (2 Spalten breit) — deterministisch (kein Random) für ruhigen Rhythmus.
const isFeature = (i: number) => i % 5 === 3;

export function NewsGrid({ items }: { items: FeedItem[] }) {
  const [count, setCount] = useState(Math.min(INITIAL, items.length));
  const grid = useRef<HTMLDivElement>(null);
  const visible = items.slice(0, count);

  // Masonry-Packing: jede Karte spannt so viele 8px-Rows, wie ihre gemessene Höhe
  // (+ Abstand) braucht. Nur Desktop (md+, dort ist grid-auto-rows aktiv); mobil ist
  // es eine simple Ein-Spalten-Liste → Row-Span wird zurückgesetzt.
  const layout = useCallback(() => {
    const g = grid.current;
    if (!g) return;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const cards = Array.from(g.querySelectorAll<HTMLElement>("[data-news-card]"));
    cards.forEach((c) => {
      if (!desktop) {
        c.style.gridRowEnd = "";
        return;
      }
      const span = Math.ceil((c.offsetHeight + ROW_GAP) / ROW_UNIT);
      c.style.gridRowEnd = `span ${span}`;
    });
    ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    layout();
    const onResize = () => layout();
    window.addEventListener("resize", onResize);
    // Bilder laden ggf. NACH dem ersten Layout (native Höhe erst dann bekannt) → neu vermessen.
    const imgs = grid.current ? Array.from(grid.current.querySelectorAll("img")) : [];
    const onLoad = () => layout();
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", onLoad, { once: true });
    });
    return () => {
      window.removeEventListener("resize", onResize);
      imgs.forEach((img) => img.removeEventListener("load", onLoad));
    };
  }, [count, layout]);

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
      {/* Desktop: Grid-Masonry (grid-auto-rows + berechnete Row-Spans, dense-flow).
          Mobile: eine Spalte (grid-cols-1, Karten mit mb als Abstand). */}
      <div
        ref={grid}
        className="grid grid-cols-1 items-start gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:[grid-auto-flow:dense] md:[grid-auto-rows:8px]"
      >
        {visible.map((item, i) => {
          const social = item.kind === "social";
          const wrapClass = `group mb-11 block no-underline md:mb-0 ${isFeature(i) ? "sm:col-span-2" : ""}`;
          const inner = (
            <>
              {/* Bildcontainer übernimmt IMMER das native Seitenverhältnis des Original-
                  Thumbnails (kein Crop). Feature-Karten sind breiter → automatisch größer. */}
              <div className="relative overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                <img
                  src={item.img}
                  alt=""
                  loading="lazy"
                  className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                {social && item.source && (
                  <span
                    className="absolute left-3 top-3 rounded-[4px] px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.08em]"
                    style={{
                      background: "rgba(14,13,11,0.55)",
                      color: "#f8f7f3",
                      backdropFilter: "blur(6px)",
                      WebkitBackdropFilter: "blur(6px)",
                      fontFamily: SHARP,
                    }}
                  >
                    {item.source}
                  </span>
                )}
              </div>
              <p className="mt-4 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-accent">{item.date}</p>
              <h2
                className={`mt-1.5 leading-snug text-[#f8f7f3] ${social ? "[display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden" : ""}`}
                style={{ fontFamily: SHARP, fontSize: "1.05rem", lineHeight: "126%", fontWeight: 500 }}
              >
                {item.title}
              </h2>
              {/* CTA — visueller Affordance-Marker (ganze Karte ist klickbar). Hover: eine
                  Underline läuft von links unter dem Text ein, der Pfeil rückt nach außen. */}
              <span
                className="mt-2.5 inline-flex items-center gap-1 text-[0.82rem] font-medium text-accent"
                style={{ fontFamily: SHARP }}
              >
                <span className="relative">
                  {social ? "Ansehen" : "Zum Beitrag"}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </>
          );
          return social ? (
            <a
              key={item.id}
              data-news-card
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={wrapClass}
              style={{ willChange: "transform, opacity" }}
            >
              {inner}
            </a>
          ) : (
            <Link
              key={item.id}
              data-news-card
              href={item.href}
              className={wrapClass}
              style={{ willChange: "transform, opacity" }}
            >
              {inner}
            </Link>
          );
        })}
      </div>

      {count < items.length && (
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => setCount((c) => Math.min(items.length, c + BATCH))}
            className="group inline-flex items-center gap-2 rounded-[8px] bg-[#0e0d0b] text-[#f8f7f3] transition-colors duration-300 hover:bg-[#ff4370]"
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
