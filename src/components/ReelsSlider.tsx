"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { AtSign, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { REELS, type InstagramReel } from "@/data/reels";

// News-/Reels-Slider. Befüllt mit echten Instagram-Reels von
// @banijaygermanylive (serverseitig geladen). Hover startet das Video.
// Fallback auf statische Marken, falls die API mal nichts liefert.

export function ReelsSlider({ reels }: { reels?: InstagramReel[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const hasLive = !!reels && reels.length > 0;
  const handle = reels?.[0]?.username || "banijaygermany";

  const scrollByCards = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-reel]");
    const amount = card ? card.offsetWidth + 16 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * amount * 2, behavior: "smooth" });
  };

  return (
    <div>
      {/* Kopf + Steuerung */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            Frisch aus der Welt von Banijay Germany
          </p>
          <h2 className="mt-2 text-3xl font-medium tracking-tight md:text-5xl">Neueste Reels</h2>
          {hasLive && (
            <a
              href={`https://www.instagram.com/${handle}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <AtSign size={14} /> {handle}
            </a>
          )}
        </div>
        <div className="hidden gap-2 sm:flex">
          {[-1, 1].map((dir) => (
            <button
              key={dir}
              type="button"
              aria-label={dir === -1 ? "Zurück" : "Weiter"}
              onClick={() => scrollByCards(dir as 1 | -1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-surface"
            >
              {dir === -1 ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          ))}
        </div>
      </div>

      {/* Reel-Track */}
      <div
        ref={trackRef}
        className="-mx-6 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 lg:-mx-10 lg:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {hasLive
          ? reels!.map((reel) => <LiveReelCard key={reel.id} reel={reel} />)
          : REELS.map((reel) => (
              <article
                key={reel.id}
                data-reel
                className="group relative aspect-[9/16] w-[230px] shrink-0 snap-start overflow-hidden rounded-xl border border-border md:w-[260px]"
              >
                <div className="wf-placeholder absolute inset-0 flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border/70 bg-background/70">
                    <Play size={18} className="ml-0.5 text-foreground/70" />
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 to-transparent p-4 pt-10">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-background/80">
                    {reel.category}
                  </span>
                  <p className="mt-1 text-base font-medium leading-tight text-background">{reel.title}</p>
                  <p className="mt-0.5 text-[11px] text-background/70">{reel.companyName}</p>
                </div>
              </article>
            ))}
      </div>
    </div>
  );
}

function LiveReelCard({ reel }: { reel: InstagramReel }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const hasVideo = !!reel.videoUrl;

  const onEnter = () => {
    if (!hasVideo) return;
    setActive(true);
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      void v.play().catch(() => {});
    }
  };
  const onLeave = () => {
    if (!hasVideo) return;
    setActive(false);
    videoRef.current?.pause();
  };

  return (
    <a
      href={reel.permalink}
      target="_blank"
      rel="noopener noreferrer"
      data-reel
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative aspect-[9/16] w-[230px] shrink-0 snap-start overflow-hidden rounded-xl border border-border bg-foreground md:w-[260px]"
    >
      {/* Thumbnail */}
      <img
        src={reel.thumbnailUrl}
        alt={reel.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
        style={{ opacity: active ? 0 : 1 }}
      />
      {/* Video (lädt/spielt bei Hover) — nur wenn ein Video vorliegt */}
      {hasVideo && (
        <video
          ref={videoRef}
          src={reel.videoUrl}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
          style={{ opacity: active ? 1 : 0 }}
        />
      )}

      {/* Play-Indikator */}
      <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur">
        <Play size={14} className="ml-0.5" />
      </span>

      {/* Caption */}
      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 to-transparent p-4 pt-10">
        {reel.title && <p className="text-sm font-medium leading-snug text-white">{reel.title}</p>}
        <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-white/75">
          <AtSign size={11} /> {reel.username}
        </p>
      </div>
    </a>
  );
}
