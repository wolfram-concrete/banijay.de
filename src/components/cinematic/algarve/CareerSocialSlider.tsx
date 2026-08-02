"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DustLayer } from "./DustLayer";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SHARP = "var(--font-sharp), sans-serif";
const INK = "#0e0d0b";
const MAGENTA = "#ff4370";

export type SocialPost = {
  image: string;
  /** Nur Video-Posts: direkte Video-URL aus dem Juicer-Feed. */
  video?: string;
  text: string;
  url: string;
  source: string;
  date: string;
};

// VIDEO-KARTE (Wolfram 16.07.). Zwei Probleme, ein Bauteil:
//  1) Juicer liefert als Thumbnail IMMER den ERSTEN Frame. Beim NightWash-Post vom
//     16.07. ist das reiner Himmel — gemessen eine Luminanz-Streuung von 7, während
//     jeder andere Punkt im Video bei 43–58 liegt. Statt stumpf „letzte Sekunde" zu
//     nehmen (viele Videos blenden am Ende auf Schwarz → dann wäre es schwarz statt
//     Himmel), tasten wir mehrere Punkte ab und nehmen den Frame mit der MEISTEN
//     Bildinformation. Himmel und Schwarz fallen dabei beide automatisch durch.
//  2) Das Video soll laufen, sobald die Karte sichtbar ist — wie in der Companies-Bento.
// Der Frame dient als Standbild, solange nicht gespielt wird (Ladezeit, außerhalb des
// Viewports, prefers-reduced-motion). Abgespielt wird immer von vorn.
const PROBE_POINTS = [0.35, 0.55, 0.75, 0.92, 0.99];
const FALLBACK_POINT = 0.92; // wenn der Canvas nicht lesbar ist (CORS)

function VideoMedia({ post }: { post: SocialPost }) {
  const vref = useRef<HTMLVideoElement>(null);
  // Der ausgewählte Frame — hierhin wird zurückgespult, wenn die Karte den Blick verlässt.
  const stillAt = useRef(0);

  useEffect(() => {
    const v = vref.current;
    if (!v) return;
    let dead = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const seek = (t: number) =>
      new Promise<void>((res) => {
        const done = () => {
          v.removeEventListener("seeked", done);
          res();
        };
        v.addEventListener("seeked", done);
        v.currentTime = t;
      });

    // Luminanz-Streuung eines Frames: viel Streuung = viel drauf.
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 36;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const score = (): number => {
      if (!ctx) return 0;
      try {
        ctx.drawImage(v, 0, 0, 64, 36);
        const d = ctx.getImageData(0, 0, 64, 36).data;
        let sum = 0;
        const lum: number[] = [];
        for (let i = 0; i < d.length; i += 4) {
          const l = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
          lum.push(l);
          sum += l;
        }
        const mean = sum / lum.length;
        return Math.sqrt(lum.reduce((a, b) => a + (b - mean) ** 2, 0) / lum.length);
      } catch {
        return -1; // Canvas getaintet (CORS) → Bewertung nicht möglich
      }
    };

    const pickStill = async () => {
      const dur = v.duration;
      if (!Number.isFinite(dur) || dur <= 0) return;
      let best = dur * FALLBACK_POINT;
      let bestScore = -1;
      for (const p of PROBE_POINTS) {
        if (dead) return;
        await seek(Math.min(dur - 0.05, dur * p));
        const s = score();
        if (s < 0) {
          best = dur * FALLBACK_POINT; // CORS → nicht messbar, fester Punkt
          break;
        }
        if (s > bestScore) {
          bestScore = s;
          best = v.currentTime;
        }
      }
      if (dead) return;
      stillAt.current = best;
      await seek(best);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (dead || reduce) return;
          if (e.isIntersecting) {
            v.currentTime = 0; // immer von vorn abspielen
            void v.play().catch(() => {});
          } else {
            v.pause();
            v.currentTime = stillAt.current; // zurück aufs Standbild
          }
        });
      },
      { threshold: 0.25 },
    );

    const start = async () => {
      await pickStill();
      if (!dead) io.observe(v);
    };
    if (v.readyState >= 1) void start();
    else v.addEventListener("loadedmetadata", start, { once: true });

    return () => {
      dead = true;
      io.disconnect();
    };
  }, [post.video]);

  return (
    <video
      ref={vref}
      src={post.video}
      poster={post.image}
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
    />
  );
}

function Card({ post, showText }: { post: SocialPost; showText: boolean }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group glass-panel flex shrink-0 flex-col overflow-clip no-underline max-[767px]:!w-[58vw]"
      style={{ width: "19.5vw", color: "#f8f7f3" }}
    >
      {/* Motiv-Container auf 3:4 (Wolfram 16.07.): Der Feed liefert überwiegend
          1080×1440 (= 3:4) — 7 von 11 Bildern. Bei den bisherigen 4:5 wurde also die
          Mehrheit unnötig beschnitten. 3:4 passt sie exakt und beschneidet die
          9:16-Videos weniger. Die wenigen 4:5-/2:3-Motive fängt object-cover ab. */}
      <div className="relative overflow-clip" style={{ aspectRatio: "3 / 4", background: "rgba(255,255,255,0.08)" }}>
        {post.video ? (
          <VideoMedia post={post} />
        ) : (
          // eager statt lazy (Wolfram 22.07.): Der Slider zeigt max. 12 Karten; „lazy" ließ die
          // horizontal versetzten Karten ab der dritten leer, weil der Lazy-Trigger bei per
          // Transform seitlich einlaufenden Bildern nicht zuverlässig feuert.
          <img src={post.image} alt="" loading="eager" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        )}
        {/* Die Quellen-Kennzeichnung („LINKEDIN") ist raus (Wolfram 16.07.): Solange der
            Juicer-Feed ausschließlich LinkedIn liefert, stand sie redundant auf jeder
            Karte. Falls Instagram wieder dazukommt (siehe Pre-Launch-Check), wieder
            erwägen — post.source liegt weiterhin in den Daten. */}
      </div>
      {/* Caption: auf CAREER an, auf der HOME aus (Wolfram 16.07.). Auf der Home ist der
          Feed ein abschließender Momente-Block — dort zählt nur das Motiv. Auf Career
          trägt der Post-Text die Info (Jobs, Menschen, Formate), deshalb bleibt er. */}
      <div className="flex flex-1 flex-col justify-end max-[767px]:!p-[5vw]" style={{ padding: "1.05vw", gap: "0.75vw" }}>
        {showText && post.text && (
          <p
            className="m-0 max-[767px]:!text-[3.4vw]"
            style={{
              fontFamily: SHARP,
              fontSize: "0.78vw",
              lineHeight: "142%",
              color: "rgba(248,247,243,0.78)",
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.text}
          </p>
        )}
        <div className="flex items-center justify-between" style={{ gap: "0.75vw" }}>
          <span className="max-[767px]:!text-[3vw]" style={{ fontSize: "0.62vw", color: "rgba(248,247,243,0.55)", fontFamily: SHARP }}>
            {post.date}
          </span>
          <span
            className="inline-flex items-center gap-[0.3vw] transition-transform duration-300 group-hover:translate-x-1 max-[767px]:!text-[3.2vw]"
            style={{ fontFamily: SHARP, fontSize: "0.7vw", fontWeight: 700, color: MAGENTA }}
          >
            Ansehen <ArrowUpRight className="h-[0.7vw] w-[0.7vw] max-[767px]:!h-[3.2vw] max-[767px]:!w-[3.2vw]" />
          </span>
        </div>
      </div>
    </a>
  );
}

export function AlgarveCareerSocialSlider({
  posts,
  headline = "#workatBanijay",
  subline = "Einblicke, Menschen und Momente aus der Banijay-Welt — direkt aus unseren Kanälen.",
  dark = true, // V2: gesamte Site ist moody-dark
  showText = true,
}: {
  posts: SocialPost[];
  /** Überschrift der Section (Default = Career „#workatBanijay"). */
  headline?: string;
  /** Begleit-Copy rechts. */
  subline?: string;
  /** V2-Mood (Task #69): transparent auf dem MoodBackdrop, Typo in Paper. */
  dark?: boolean;
  /** Post-Caption auf der Karte zeigen. Default an (Career); die Home schaltet sie
   *  aus (Wolfram 16.07.) — dort trägt allein das Motiv. */
  showText?: boolean;
}) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Gepinnter Horizontal-Slider (Scroll-Stop → Karten-Slide bis durch) — Desktop UND
      // Mobile: die Section rastet ein, der vertikale Scroll wird zum horizontalen Durchsliden
      // der Karten; erst wenn alle durch sind, löst der Pin und der Footer kommt hoch.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tr = track.current;
      if (!tr) return;
      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      // Horizontale Distanz = Track-Überhang. Beim Scrollen wird die Section gepinnt
      // und der Track von links nach rechts durchgescrubbt, bis alle Cards da waren.
      const distance = () => Math.max(0, tr.scrollWidth - window.innerWidth + window.innerWidth * 0.04);
      gsap.to(tr, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => "+=" + distance(),
          // Mobile: scrub DIREKT an den Scroll koppeln (true statt 1). Mit scrub:1 lief der
          // Karten-Slide dem Scroll ~1s hinterher → der Pin löste schon, während die Karten
          // noch glitten, und der Footer schob sich hoch, BEVOR der Slide durch war (Wolfram
          // 22.07.). Mit scrub:true endet der Slide exakt am Pin-Ende → Footer kommt erst danach.
          scrub: isMobile ? true : 1,
          pin: true,
          // anticipatePin rastet den Pin GESCHWINDIGKEITSBASIERT etwas früher ein und
          // VERHINDERT damit das Überschießen am Pin-Start: bei Lenis-Touch-Momentum
          // (auf der Home zusätzlich befeuert durch die sticky NewsStack darüber) gleitet
          // der Scroll sonst über den Fixpunkt hinaus (Headline verschwindet) und snapt
          // zurück, bevor der Swipe startet (Wolfram 24.07.). `0` verhindert das NICHT —
          // deshalb wie auf Career/Team-Pin fest auf `1`, dann stoppt die Section sofort
          // am Fixpunkt und der Swipe rastet sauber ein.
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-clip max-[767px]:!pt-[18vw] max-[767px]:min-h-[100svh]" style={{ background: dark ? "transparent" : "#f8f7f3", paddingTop: "7vw", paddingBottom: "5.56vw" }}>
      {/* Sternenstaub im Hintergrund (Wolfram 14.07.) — nur im moody-dark-Modus */}
      {dark && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{ zIndex: 0, maskImage: "linear-gradient(180deg, transparent 0%, black 12%, black 88%, transparent 100%)", WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 12%, black 88%, transparent 100%)" }}
        >
          <DustLayer boost={0.8} center={{ x: 0.78, y: 0.12 }} radius={0.9} />
        </div>
      )}
      <div className="relative" style={{ paddingLeft: "2vw", paddingRight: "2vw", zIndex: 1 }}>
        {/* Headline */}
        <div className="mb-[3vw] flex items-end justify-between gap-8 max-[767px]:!mb-[8vw] max-[767px]:!flex-col max-[767px]:!items-start">
          <h2 className="m-0 max-[767px]:!text-[9vw]" style={{ fontFamily: SHARP, fontSize: "4.44vw", lineHeight: "104%", fontWeight: 500, letterSpacing: "-0.139vw", color: dark ? "#f8f7f3" : INK }}>
            {headline}
          </h2>
          <p className="m-0 max-w-[34vw] max-[767px]:!max-w-full max-[767px]:!text-[4vw]" style={{ fontSize: "1.25vw", lineHeight: "145%", color: dark ? "rgba(248,247,243,0.6)" : "rgba(14,13,11,0.6)" }}>
            {subline}
          </p>
        </div>
      </div>

      {/* Track: Desktop UND Mobile werden gepinnt horizontal gescrubbt (s. useGSAP). */}
      <div
        ref={track}
        className="flex w-max"
        style={{ gap: "1.4vw", paddingLeft: "2vw", paddingRight: "2vw" }}
      >
        {posts.map((post, i) => (
          <div key={`${post.url}-${i}`}>
            <Card post={post} showText={showText} />
          </div>
        ))}
      </div>
    </section>
  );
}
