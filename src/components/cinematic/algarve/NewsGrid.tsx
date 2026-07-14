"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { FeedItem } from "@/data/feed";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// News-Grid (News-Seite) — schlichtes 4-Spalten-Grid (kein Masonry/Bento mehr,
// Wolfram 14.07.). Uniforme, ECKIGE Karten (16:10-Thumbnail, object-cover). Die
// Karten bauen sich beim Rein-scrollen gestaffelt auf; „Weitere laden" lädt
// batchweise nach (CMS-ready). Externe Beiträge (Social + Presse) öffnen im Tab.

const SHARP = "var(--font-sharp), sans-serif";
const INITIAL = 20;
const BATCH = 12;

export function NewsGrid({ items }: { items: FeedItem[] }) {
  const [count, setCount] = useState(Math.min(INITIAL, items.length));
  const grid = useRef<HTMLDivElement>(null);
  const visible = items.slice(0, count);

  // Reveal: neue Karten gestaffelt einblenden, sobald sie in den Viewport kommen.
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
      <div ref={grid} className="grid grid-cols-1 items-start gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((item) => {
          const external = item.external;
          const wrapClass = "group block no-underline";
          // Kartenhöhe folgt dem Postingformat (Wolfram 14.07.): Social-Posts
          // (LinkedIn/Insta) laufen im Hochformat, Pressebeiträge im 4:3-Querformat.
          const ratioClass = item.kind === "social" ? "aspect-[4/5]" : "aspect-[4/3]";
          const inner = (
            <>
              {/* Bildcontainer ECKIG — Format je Rubrik (Social hoch, Presse 4:3) */}
              <div className={`relative ${ratioClass} overflow-hidden`} style={{ background: "rgba(255,255,255,0.08)" }}>
                <img
                  src={item.img}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                {item.source && (
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
                className="mt-1.5 overflow-hidden leading-snug text-[#f8f7f3] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]"
                style={{ fontFamily: SHARP, fontSize: "1.05rem", lineHeight: "126%", fontWeight: 500 }}
              >
                {item.title}
              </h2>
              {/* CTA — Affordance (ganze Karte klickbar) */}
              <span className="mt-2.5 inline-flex items-center gap-1 text-[0.82rem] font-medium text-accent" style={{ fontFamily: SHARP }}>
                <span className="relative">
                  {external ? "Ansehen" : "Zum Beitrag"}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </>
          );
          return external ? (
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
            <Link key={item.id} data-news-card href={item.href} className={wrapClass} style={{ willChange: "transform, opacity" }}>
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
            className="group inline-flex items-center gap-2 rounded-[6px] bg-[#0e0d0b] text-[#f8f7f3] transition-colors duration-300 hover:bg-[#ff4370]"
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
