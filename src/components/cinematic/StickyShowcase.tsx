"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

// Sticky-Showcase mit Zoom-in-Transition (drinksom-/Algarve-inspiriert):
// Choreografie beim Scrollen —
//  1. Das Medien-Grid steht (Banijay-Welt).
//  2. Die äußeren Kacheln faden aus und schrumpfen zu ihren Ecken/Kanten-Origins
//     (sie „verschwinden"), während das zentrale Showreel-Video aufskaliert.
//  3. Das Video zoomt voll bildschirmfüllend („Kamera-Push").
//  4. Abdunkeln → Übergang in die nächste Section.
// Technik: refs + requestAnimationFrame + getBoundingClientRect + CSS-transform.

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

type Tile = { src: string; origin: string };

// 5×3-Grid; Mitte (3 Zellen von Reihe 2) frei für das zentrale Video.
const TILES: (Tile | null)[] = [
  { src: "/grid/g01.jpg", origin: "0% 0%" },
  { src: "/grid/g02.jpg", origin: "50% 0%" },
  { src: "/grid/g03.png", origin: "50% 0%" },
  { src: "/grid/g04.jpeg", origin: "50% 0%" },
  { src: "/grid/g05.jpg", origin: "100% 0%" },
  { src: "/grid/g06.jpg", origin: "0% 50%" },
  null, null, null,
  { src: "/grid/g07.png", origin: "100% 50%" },
  { src: "/grid/g08.jpg", origin: "0% 100%" },
  { src: "/grid/g09.jpg", origin: "50% 100%" },
  { src: "/grid/g10.jpeg", origin: "50% 100%" },
  { src: "/grid/g11.png", origin: "50% 100%" },
  { src: "/grid/g12.jpg", origin: "100% 100%" },
];

export function StickyShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) v.pause();
    else void v.play();
    setPlaying(!playing);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const videoWrap = videoWrapRef.current;
    if (!section || !grid || !videoWrap) return;

    const tiles = Array.from(grid.querySelectorAll<HTMLElement>("[data-tile]"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (labelRef.current) labelRef.current.style.opacity = "1";
      return;
    }

    let raf = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const scrollable = section.offsetHeight - vh;
      if (scrollable <= 0) return;

      const p = clamp(-rect.top / scrollable);

      // (2) Äußere Kacheln: früh ausfaden + zur Origin schrumpfen → „verschwinden".
      const tileProg = clamp(p / 0.5);
      const tileOpacity = clamp(1 - p / 0.45);
      const tileScale = 1 - 0.55 * tileProg;
      for (const t of tiles) {
        t.style.opacity = String(tileOpacity);
        t.style.transform = `scale(${tileScale})`;
      }

      // (3) Zentrales Video: erst sanft, dann beschleunigt voll bildschirmfüllend.
      const finalScale = vw < 768 ? 2.8 : 3.3;
      const videoP = p * p; // ease-in: zoomt spät hart durch
      const videoScale = 1 + (finalScale - 1) * videoP;
      videoWrap.style.transform = `scale(${videoScale})`;

      // „play showreel"-Label früh ausblenden.
      if (labelRef.current) labelRef.current.style.opacity = String(clamp(1 - p / 0.18));
      // (4) Am Ende abdunkeln → Übergang in die Folge-Section.
      if (fadeRef.current) fadeRef.current.style.opacity = String(clamp((p - 0.86) / 0.14));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[260vh] lg:h-[320vh]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-black p-[2vw]">
        {/* Medien-Grid (Kacheln faden/schrumpfen) */}
        <div
          ref={gridRef}
          className="grid h-full w-full gap-[1vw]"
          style={{ gridTemplateColumns: "repeat(5, 1fr)", gridTemplateRows: "repeat(3, minmax(0, 1fr))" }}
        >
          {TILES.map((tile, i) =>
            tile ? (
              <div
                key={i}
                data-tile
                className="overflow-hidden rounded-[1vw] will-change-[transform,opacity]"
                style={{ transformOrigin: tile.origin }}
              >
                <img src={tile.src} alt="" className="h-full w-full object-cover" />
              </div>
            ) : (
              <div key={i} />
            ),
          )}
        </div>

        {/* Zentrales Showreel-Video — Ziel des Zooms */}
        <div
          ref={videoWrapRef}
          className="absolute z-20 overflow-hidden rounded-lg"
          style={{
            width: "calc(60% - 0.4vw)",
            height: "calc(33.3333% - 0.6667vw)",
            inset: 0,
            margin: "auto",
            willChange: "transform",
            transformOrigin: "center center",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/video/showreel.mp4" type="video/mp4" />
          </video>
          <div
            ref={labelRef}
            className="absolute inset-0 flex items-center justify-center gap-[1vw] text-white"
          >
            <span className="font-medium uppercase tracking-[0.15em]" style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.8rem)" }}>
              play
            </span>
            <span className="font-medium uppercase tracking-[0.15em]" style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.8rem)" }}>
              showreel
            </span>
          </div>
        </div>

        {/* Play/Pause */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Showreel pausieren" : "Showreel abspielen"}
          className="absolute bottom-6 left-6 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur transition-colors hover:bg-black/50"
        >
          {playing ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </button>

        {/* Abdunkel-Overlay für den Übergang */}
        <div ref={fadeRef} className="pointer-events-none absolute inset-0 z-40 bg-black" style={{ opacity: 0 }} />
      </div>
    </section>
  );
}
