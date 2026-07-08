"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { COMPANY_CARDS } from "@/data/companyCards";
import { getCompanyImagePosition } from "@/data/companyImages";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// „Unsere Companies" (Home) — holistisches Bento-Grid ALLER Companies. Media-Background
// (Still + Ken-Burns-Bewegung, video-ready), weißes Logo o. r., Genres. Baut sich beim
// Scroll-In gestaffelt auf (Menge auf einen Blick erfassbar). Klick auf eine Card öffnet
// ein Detail-Overlay mit Copytext + Genres + „Zur Website".

const SHARP = "var(--font-sharp), sans-serif";

// Bento-Rhythmus (Desktop, grid-cols-4, dense): einzelne „Feature"-Cards größer.
const SPAN: Record<number, string> = {
  0: "md:col-span-2 md:row-span-2",
  3: "md:col-span-2",
  6: "md:row-span-2",
  9: "md:col-span-2",
  12: "md:col-span-2 md:row-span-2",
  15: "md:row-span-2",
  18: "md:col-span-2",
};

// Video-ready: sobald echte Company-Videos vorliegen, hier slug→/company-media/<slug>/loop.mp4
// hinterlegen; CardMedia rendert dann <video> statt <img>.
const CARD_VIDEO: Record<string, string> = {};

function CardMedia({ img, alt, slug }: { img: string; alt: string; slug: string }) {
  const video = CARD_VIDEO[slug];
  if (video) {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={img}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: getCompanyImagePosition(slug) }}
      >
        <source src={video} type="video/mp4" />
      </video>
    );
  }
  return (
    <img
      src={img}
      alt={alt}
      className="bento-kenburns absolute inset-0 h-full w-full object-cover"
      style={{ objectPosition: getCompanyImagePosition(slug) }}
    />
  );
}

export function AlgarveCompaniesBento() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);

  // Aufbau: Cards gestaffelt herein (Menge „baut sich auf", zeigt am Ende alle).
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-bento-card]");
      gsap.set(cards, { autoAlpha: 0, y: 40, scale: 0.94 });
      ScrollTrigger.batch(cards, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out", stagger: 0.06 }),
      });
    },
    { scope: root },
  );

  // Body-Scroll-Lock, solange das Detail-Overlay offen ist.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const activeCard = active !== null ? COMPANY_CARDS[active] : null;

  return (
    <section ref={root} data-nav-theme="dark" className="relative w-full" style={{ background: "#0a0a0a", color: "#f8f7f3" }}>
      <div className="mx-auto w-full px-6 py-24 md:px-12 lg:px-20 lg:py-32" style={{ maxWidth: "1840px" }}>
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="m-0 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-[#ff4370]">Unser Netzwerk</p>
            <h2
              className="m-0 mt-3 max-w-[16ch]"
              style={{ fontFamily: SHARP, fontSize: "clamp(2rem, 5vw, 4.25rem)", lineHeight: "104%", fontWeight: 500, letterSpacing: "-0.03em" }}
            >
              {COMPANY_CARDS.length}+ Companies,<br />
              <span className="text-white/45">ein gemeinsames Netzwerk.</span>
            </h2>
          </div>
          <p className="m-0 max-w-[38ch] text-sm leading-relaxed text-white/55 md:text-right">
            Eigenständige Companies und Labels — gemeinsam unter einem Dach. Klick eine Company an für Profil und Genres.
          </p>
        </div>

        {/* Bento-Grid — alle Companies */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 md:[grid-auto-flow:dense] md:[grid-auto-rows:13vw]">
          {COMPANY_CARDS.map((card, i) => (
            <button
              key={card.id}
              type="button"
              data-bento-card
              onClick={() => setActive(i)}
              aria-label={`${card.name} — Profil öffnen`}
              className={`group relative flex min-h-[42vw] flex-col justify-end overflow-hidden rounded-[1.25rem] text-left md:min-h-0 ${SPAN[i] ?? ""}`}
              style={{ background: "#14100f" }}
            >
              <CardMedia img={card.image} alt={card.imageAlt ?? card.name} slug={card.id} />
              {/* Scrim für Lesbarkeit */}
              <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,10,0) 38%, rgba(10,10,10,0.35) 62%, rgba(10,10,10,0.9) 100%)" }} />

              {/* Weißes Banijay-Logo o. r. (per-Company-Weißlogos folgen) */}
              <img
                src="/brand/banijay-logo-white.png"
                alt=""
                aria-hidden
                className="absolute right-[6%] top-[7%] h-[1.5rem] w-auto opacity-90 md:h-[1.7rem]"
              />

              {/* Content unten */}
              <div className="relative z-10 flex flex-col gap-2 p-[6%] md:p-5">
                <h3 className="m-0 text-white" style={{ fontFamily: SHARP, fontSize: "clamp(1rem, 1.5vw, 1.6rem)", lineHeight: "108%", fontWeight: 500, letterSpacing: "-0.01em" }}>
                  {card.name}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {card.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.06em] text-white/85"
                      style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(4px)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover-Affordance */}
              <span className="liquid-glass absolute right-[6%] bottom-[6%] flex h-9 w-9 items-center justify-center rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:right-5 md:bottom-5">
                <ArrowUpRight className="h-4 w-4 text-white" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Detail-Overlay (Klick auf Card) ─────────────────────────────────── */}
      {activeCard && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-10" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setActive(null)} />
          <div
            className="relative z-10 grid w-full max-w-[1100px] grid-cols-1 overflow-hidden rounded-[1.5rem] md:grid-cols-2"
            style={{ background: "#14100f", maxHeight: "88vh", animation: "none" }}
          >
            {/* Bild links */}
            <div className="relative min-h-[40vw] overflow-hidden md:min-h-full">
              <img src={activeCard.image} alt={activeCard.imageAlt ?? activeCard.name} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: getCompanyImagePosition(activeCard.id) }} />
              <img src="/brand/banijay-logo-white.png" alt="" aria-hidden className="absolute right-6 top-6 h-7 w-auto opacity-90" />
            </div>
            {/* Copy rechts */}
            <div className="flex flex-col gap-5 overflow-y-auto p-8 text-[#f8f7f3] md:p-10">
              <p className="m-0 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#ff4370]">{activeCard.cluster}</p>
              <h3 className="m-0" style={{ fontFamily: SHARP, fontSize: "clamp(1.6rem, 3vw, 2.6rem)", lineHeight: "104%", fontWeight: 500, letterSpacing: "-0.02em" }}>
                {activeCard.name}
              </h3>
              <p className="m-0 text-base leading-relaxed text-white/80" style={{ fontFamily: SHARP }}>{activeCard.profile}</p>
              <p className="m-0 text-sm leading-relaxed text-white/60">{activeCard.body}</p>
              <div className="flex flex-wrap gap-2">
                {activeCard.tags.map((t) => (
                  <span key={t} className="rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.06em] text-white/85" style={{ background: "rgba(255,255,255,0.1)" }}>
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={activeCard.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass mt-2 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
                style={{ fontFamily: SHARP }}
              >
                Zur Website <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <button type="button" onClick={() => setActive(null)} aria-label="Schließen" className="liquid-glass absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
