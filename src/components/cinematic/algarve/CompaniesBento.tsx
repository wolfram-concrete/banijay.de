"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { COMPANIES_DIRECTORY, type DirectoryCompany } from "@/data/companiesDirectory";
import { ECO_CATEGORIES } from "@/data/ecosystem";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// „Unsere Companies" (Home) — Stand 13.07. (Task #61, Wolfram-Diktat):
//  • Datenbasis: companiesDirectory.ts — ALLE Logo-Companies aus
//    assets/Logo/Logos companies + Platzhalter aus der Coopetition-Grafik,
//    OHNE Brainpool (Kundenwunsch). Rubrik-Filter über ecoKeys.
//  • BENTO-GRID (Wolfram 13.07.: wieder Bento statt 2-Spalten-Liste) —
//    4 Spalten dense mit wiederkehrendem Feature-Rhythmus (spanFor), echtes
//    Weiß-Logo o. r., Name + Keywords unten links, exemplarisches
//    Bewegtbild (Trailer-Loops).
//  • Klick → LIGHTBOX als SCROLL-FLIP-STACK (Optik + Mechanik der früheren
//    Kompetenzfelder-Flip-Cards): eigener Scroll-Kontext im Overlay, die
//    aktuelle Karte kippt beim Scrollen um ihre Oberkante nach hinten weg
//    (rotationX/scale/fade, gescrubbt), die nächste Company-Karte schiebt
//    sich darüber. Video läuft FULL-SIZE im Karten-Background (Farb-Tint
//    aus der Video-Palette + Scrim für Lesbarkeit). X/Esc schließt
//    jederzeit, Pfeiltasten blättern (Smooth-Scroll zur nächsten Karte).

const SHARP = "var(--font-sharp), sans-serif";
const PAPER = "#f8f7f3";

// Bento-Rhythmus (Desktop, grid-cols-4, dense): wiederholt sich alle 12 Kacheln —
// einzelne „Feature"-Cards größer, funktioniert für jede Listenlänge/Filterung.
const SPAN: Record<number, string> = {
  0: "md:col-span-2 md:row-span-2",
  3: "md:col-span-2",
  6: "md:row-span-2",
  9: "md:col-span-2",
};
const spanFor = (i: number) => SPAN[i % 12] ?? "";

// Exemplarisches Bewegtbild: stabile Zuordnung Company → Trailer-Loop
const REEL: Record<string, string> = Object.fromEntries(
  COMPANIES_DIRECTORY.map((c, i) => [c.id, `/company-media/reel-${(i % 6) + 1}.mp4`]),
);

// Flip-Card-Farbpalette (Ex-ServicesStack) — tintet die Fullsize-Videos
const VIDEO_CARD_COLORS = [
  "#ff4370", // Main Magenta
  "#e71d7d", // Laser Pink
  "#ff5a47", // Hot Coral
  "#31105a", // Midnight Violet
  "#2e37c9", // Electric Indigo
  "#065dff", // Video Blue
  "#16c8ff", // Neon Cyan
  "#170725", // Deep Aubergine
] as const;
const tintOf = (c: DirectoryCompany) =>
  VIDEO_CARD_COLORS[Math.max(0, COMPANIES_DIRECTORY.findIndex((d) => d.id === c.id)) % VIDEO_CARD_COLORS.length];

export function AlgarveCompaniesBento() {
  const root = useRef<HTMLElement>(null);
  const flipScroller = useRef<HTMLDivElement>(null);
  const [openAt, setOpenAt] = useState<number | null>(null);
  const [rubrik, setRubrik] = useState<string>("alle");

  const counts = useMemo(() => {
    const map: Record<string, number> = { alle: COMPANIES_DIRECTORY.length };
    ECO_CATEGORIES.forEach((c) => {
      map[c.key] = COMPANIES_DIRECTORY.filter((d) => d.ecoKeys.includes(c.key)).length;
    });
    return map;
  }, []);

  const cards = useMemo(
    () => (rubrik === "alle" ? COMPANIES_DIRECTORY : COMPANIES_DIRECTORY.filter((d) => d.ecoKeys.includes(rubrik))),
    [rubrik],
  );

  // Kachel-Aufbau: gestaffelt herein; bei Rubrikwechsel remountet die Liste.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const els = gsap.utils.toArray<HTMLElement>("[data-bento-card]");
      gsap.set(els, { autoAlpha: 0, y: 40, scale: 0.96 });
      ScrollTrigger.batch(els, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out", stagger: 0.06 }),
      });
    },
    { scope: root, dependencies: [rubrik], revertOnUpdate: true },
  );

  // Kachel-Videos: nur sichtbare spielen (40 parallele Decodes vermeiden).
  useEffect(() => {
    const vids = Array.from(root.current?.querySelectorAll<HTMLVideoElement>("[data-bento-video]") ?? []);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) void v.play().catch(() => {});
          else v.pause();
        });
      },
      { threshold: 0.15 },
    );
    vids.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, [rubrik]);

  // ── Lightbox-Mechanik ────────────────────────────────────────────────────
  // Scroll-Lock + Lenis-Stopp, solange das Overlay offen ist.
  useEffect(() => {
    if (openAt === null) return;
    const lenis = (window as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    document.documentElement.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [openAt]);

  // Esc schließt; Pfeiltasten scrollen zur nächsten/vorherigen Karte.
  useEffect(() => {
    if (openAt === null) return;
    const step = () => flipScroller.current?.querySelector<HTMLElement>("[data-flip-card]")?.parentElement?.clientHeight ?? window.innerHeight;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenAt(null);
      if (e.key === "ArrowRight" || e.key === "ArrowDown") flipScroller.current?.scrollBy({ top: step(), behavior: "smooth" });
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") flipScroller.current?.scrollBy({ top: -step(), behavior: "smooth" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openAt]);

  // Flip-Choreografie im Overlay: eigener Scroller, Karten kippen nach hinten
  // weg, sobald die nächste hochschiebt (1:1 die Ex-ServicesStack-Mechanik).
  useEffect(() => {
    if (openAt === null) return;
    const scroller = flipScroller.current;
    if (!scroller) return;

    // Erst zur angeklickten Company springen (VOR dem Anlegen der Trigger)
    const els = Array.from(scroller.querySelectorAll<HTMLElement>("[data-flip-card]"));
    if (els[openAt]) scroller.scrollTop = els[openAt].offsetTop;

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      els.forEach((el, i) => {
        if (i === els.length - 1) return;
        gsap.set(el, { transformPerspective: 2000, transformOrigin: "50% 0%" });
        gsap.to(el, {
          rotationX: -60,
          scale: 0.8,
          opacity: 0,
          ease: "none",
          scrollTrigger: { scroller, trigger: els[i + 1], start: "top bottom", end: "top top", scrub: 0.8 },
        });
      });
      ScrollTrigger.refresh();
    }, scroller);

    // Overlay-Videos: nur die sichtbare Karte spielt
    const vids = Array.from(scroller.querySelectorAll<HTMLVideoElement>("[data-flip-video]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) void v.play().catch(() => {});
          else v.pause();
        });
      },
      { root: scroller, threshold: 0.25 },
    );
    vids.forEach((v) => io.observe(v));

    return () => {
      ctx.revert();
      io.disconnect();
    };
  }, [openAt, cards]);

  return (
    <section ref={root} data-nav-theme="dark" className="relative w-full" style={{ background: "transparent", color: PAPER }}>
      {/* FULL SIZE (Wolfram 13.07.): kein maxWidth-Container mehr — die Liste
          läuft full-bleed mit dem 2vw-Randmaß der übrigen Module. Oben knapp:
          die AnimatedHeading davor bringt ihren eigenen Raum mit. */}
      <div className="w-full pb-24 pt-4 lg:pb-32 lg:pt-6" style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
        {/* Kein eigener Header mehr (Wolfram 13.07.): die Headline kommt als
            großes AnimatedHeading-Panel direkt VOR dieser Section (page.tsx). */}

        {/* Rubrik-Filter (Ökosystem-Kategorien) — Chip-Optik wie News-Filter,
            mittelachsig überm Grid */}
        <div className="mb-8 flex flex-wrap justify-center gap-2.5 md:gap-3">
          {[{ key: "alle", label: "Alle" }, ...ECO_CATEGORIES.map((c) => ({ key: c.key, label: c.label }))].map((r) => {
            const isActive = r.key === rubrik;
            return (
              <button
                key={r.key}
                type="button"
                onClick={() => {
                  setOpenAt(null); // Lightbox-Index bezieht sich auf die gefilterte Liste
                  setRubrik(r.key);
                }}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-2 rounded-[8px] border px-5 py-2.5 text-sm font-medium transition-colors duration-200 max-[767px]:!px-4 max-[767px]:!py-2 max-[767px]:!text-[3.6vw] ${
                  isActive
                    ? "border-[#ff4370] bg-[#ff4370] text-[#f8f7f3]"
                    : "border-[rgba(248,247,243,0.18)] bg-transparent text-[#f8f7f3] hover:border-[#f8f7f3]"
                }`}
                style={{ fontFamily: SHARP }}
              >
                {r.label}
                <span className={isActive ? "text-white/70" : "text-[rgba(248,247,243,0.4)]"}>{counts[r.key]}</span>
              </button>
            );
          })}
        </div>

        {/* Bento-Grid — Companies der gewählten Rubrik (remount bei Wechsel).
            3 Spalten + 17vw-Zeilen: auch die KLEINSTE Kachel bleibt groß. */}
        <div key={rubrik} className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 md:[grid-auto-flow:dense] md:[grid-auto-rows:17vw]">
          {cards.map((card, i) => (
            <button
              key={card.id}
              type="button"
              data-bento-card
              onClick={() => setOpenAt(i)}
              aria-label={`${card.name} — Profil öffnen`}
              className={`group relative flex min-h-[42vw] flex-col justify-end overflow-hidden text-left md:min-h-0 ${spanFor(i)}`}
              style={{ background: "#14100f" }}
            >
              {/* Exemplarisches Bewegtbild (Loop aus dem Banijay-Trailer) */}
              <video
                data-bento-video
                muted
                loop
                playsInline
                preload="metadata"
                poster={card.image}
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src={REEL[card.id]} type="video/mp4" />
              </video>
              {/* Scrim für Lesbarkeit */}
              <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,10,0) 38%, rgba(10,10,10,0.35) 62%, rgba(10,10,10,0.88) 100%)" }} />

              {/* Echtes weißes Company-Logo oben rechts (Platzhalter: keins) */}
              {card.logo && (
                <img
                  src={card.logo}
                  alt=""
                  aria-hidden
                  className="absolute right-[4%] top-[6%] h-[1.6rem] w-auto max-w-[34%] object-contain opacity-95 md:h-[1.9rem]"
                />
              )}

              {/* Name + Keywords unten links, kompakt */}
              <div className="relative z-10 flex flex-col gap-2 p-4 md:p-5">
                <h3 className="m-0 text-white" style={{ fontFamily: SHARP, fontSize: "clamp(1.05rem, 1.6vw, 1.7rem)", lineHeight: "108%", fontWeight: 500, letterSpacing: "-0.01em" }}>
                  {card.name}
                </h3>
                {card.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {card.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-[4px] px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.06em] text-white/85"
                        style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(4px)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Hover-Affordance */}
              <span
                className="liquid-glass absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-[8px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:bottom-5 md:right-5"
                style={{ position: "absolute" }}
              >
                <ArrowUpRight className="h-4 w-4 text-white" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Lightbox: Scroll-Flip-Stack mit Fullsize-Video ─────────────────── */}
      {openAt !== null && (
        <div className="fixed inset-0 z-[120]" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setOpenAt(null)} />

          {/* Eigener Scroll-Kontext (Lenis ausgesperrt): Karten stapeln sticky,
              die vorige kippt gescrubbt nach hinten weg (Ex-Flip-Card-Mechanik) */}
          <div ref={flipScroller} data-lenis-prevent className="absolute inset-0 overflow-y-auto overscroll-contain">
            <div className="flex flex-col px-3 md:px-10" style={{ gap: "3vh", paddingTop: "4vh", paddingBottom: "10vh" }}>
              {cards.map((card, i) => {
                const tint = tintOf(card);
                return (
                  <div
                    key={card.id}
                    data-flip-card
                    className="sticky mx-auto flex w-full max-w-[1240px] flex-col justify-between overflow-hidden p-[3.2vw] max-[767px]:!p-[6vw]"
                    style={{ top: "8vh", height: "84vh", backgroundColor: tint, color: PAPER }}
                  >
                    {/* FULLSIZE-Video im Background + Farb-Tint + Scrim */}
                    <video
                      data-flip-video
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={card.image}
                      className="absolute inset-0 h-full w-full object-cover"
                    >
                      <source src={REEL[card.id]} type="video/mp4" />
                    </video>
                    <div aria-hidden className="absolute inset-0" style={{ background: tint, opacity: 0.38, mixBlendMode: "multiply" }} />
                    <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,2,8,0.42) 0%, rgba(10,2,8,0.05) 38%, rgba(10,2,8,0.66) 100%)" }} />

                    {/* Top: Company-Name links, Logo oben rechts (keine Ziffer mehr) */}
                    <div className="relative flex items-start justify-between gap-6" style={{ zIndex: 3 }}>
                      <h3
                        className="m-0 uppercase max-[767px]:!text-[8.5vw]"
                        style={{ fontFamily: SHARP, fontSize: "clamp(2rem, 4.2vw, 4.6rem)", lineHeight: "105%", fontWeight: 500, letterSpacing: "-0.03em" }}
                      >
                        {card.name}
                      </h3>
                      {card.logo && (
                        <img src={card.logo} alt="" aria-hidden className="mt-1 h-[1.9rem] w-auto max-w-[26%] shrink-0 object-contain object-right opacity-95 md:h-[2.2rem]" />
                      )}
                    </div>

                    {/* Bottom links: Claim + Text + Keywords + CTA (Platzhalter: nur Name/Tags) */}
                    <div className="relative flex flex-col items-start gap-4 max-[767px]:!max-w-full" style={{ zIndex: 3, maxWidth: "46%" }}>
                      {card.profile && (
                        <h4 className="m-0 max-[767px]:!text-[5.4vw]" style={{ fontFamily: SHARP, fontSize: "clamp(1.2rem, 1.9vw, 2.1rem)", lineHeight: "118%", fontWeight: 500 }}>
                          {card.profile}
                        </h4>
                      )}
                      {card.body && (
                        <p className="m-0 max-[767px]:!text-[3.8vw]" style={{ fontSize: "clamp(0.9rem, 1.05vw, 1.15rem)", lineHeight: "145%", color: "rgba(248,247,243,0.78)" }}>
                          {card.body}
                        </p>
                      )}
                      {card.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {card.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-[4px] px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.06em]"
                              style={{ background: "rgba(248,247,243,0.16)", color: PAPER, backdropFilter: "blur(4px)" }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                      {card.url && (
                        <a
                          href={card.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center gap-2 rounded-[8px] px-5 py-2.5 text-sm font-medium no-underline transition-transform hover:scale-[1.02]"
                          style={{ fontFamily: SHARP, border: `1px solid ${PAPER}`, color: PAPER }}
                        >
                          Zur Website <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Schließen — bleibt beim Flippen jederzeit erreichbar */}
          <button
            type="button"
            onClick={() => setOpenAt(null)}
            aria-label="Schließen"
            className="liquid-glass absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-[8px] text-white md:right-8 md:top-6"
            style={{ position: "absolute" }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </section>
  );
}
