"use client";

import { useEffect, useRef } from "react";

// Partikel-„b" als LED-Grid: die Punkte sitzen an festen Rasterplätzen und
// bewegen sich NICHT (kein Gekrabbel) — nur ihre Größe pulsiert um denselben
// Mittelpunkt (mal etwas größer, mal kleiner). Drumherum ein paar subtile,
// kleinteilige schwarze Mini-Satelliten. Danach füllt sich das b von unten nach
// oben wie ein Ladebalken solide schwarz; dann übernimmt der Preloader Cutout +
// Blende. Preloader-tauglich zügig (≤ ~3,5 s hier + ~0,8 s Cutout).

const PARTICLE = "#ffffff"; // weiße Punkte auf dem dunklen Hintergrundvideo

type Dot = { x: number; y: number; base: number; phase: number; delay: number };
type Sat = { ang: number; rad: number; spd: number; size: number; drift: number };

export function ParticleB({ onComplete }: { onComplete?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finish = () => {
      if (!done.current) {
        done.current = true;
        onComplete?.();
      }
    };

    let raf = 0;
    let W = 0;
    let H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const dots: Dot[] = [];
    let sats: Sat[] = [];
    let blackB: HTMLCanvasElement | null = null;
    let bx = 0;
    let by = 0;
    let bw = 0;
    let bh = 0;

    const build = (img: HTMLImageElement) => {
      bh = Math.min(H, W) * 0.224;
      const ratio = img.width && img.height ? img.width / img.height : 0.977;
      bw = bh * ratio;
      const ow = Math.max(1, Math.round(bw));
      const oh = Math.max(1, Math.round(bh));
      const off = document.createElement("canvas");
      off.width = ow;
      off.height = oh;
      const octx = off.getContext("2d");
      if (!octx) return;
      octx.drawImage(img, 0, 0, ow, oh);
      const data = octx.getImageData(0, 0, ow, oh).data;
      bx = W / 2 - bw / 2;
      by = H / 2 - bh / 2;

      // Solide schwarze b-Silhouette für den „Ladebalken".
      blackB = document.createElement("canvas");
      blackB.width = ow;
      blackB.height = oh;
      const bctx = blackB.getContext("2d");
      if (bctx) {
        bctx.drawImage(off, 0, 0);
        bctx.globalCompositeOperation = "source-in";
        bctx.fillStyle = PARTICLE;
        bctx.fillRect(0, 0, ow, oh);
      }

      // Regelmäßiges Raster (kein Jitter) → klares LED-Grid.
      const step = Math.max(4, Math.round(bh / 40));
      for (let y = 0; y < oh; y += step) {
        for (let x = 0; x < ow; x += step) {
          if (data[(y * ow + x) * 4 + 3] > 128) {
            dots.push({
              x: bx + x,
              y: by + y,
              base: 1.0 + Math.pow(Math.random(), 1.6) * 1.9, // LED-Variation
              phase: Math.random() * Math.PI * 2,
              delay: Math.random() * 0.5, // „anschalten" über 0,5 s
            });
          }
        }
      }

      // Subtile, kleinteilige schwarze Mini-Satelliten (fest schwarz, langsam).
      const nSat = 46;
      sats = Array.from({ length: nSat }, () => ({
        ang: Math.random() * Math.PI * 2,
        rad: bw * (0.55 + Math.random() * 0.95),
        spd: (0.05 + Math.random() * 0.16) * (Math.random() < 0.5 ? -1 : 1),
        size: 0.5 + Math.pow(Math.random(), 2.4) * 1.4,
        drift: Math.random() * Math.PI * 2,
      }));
    };

    const APPEAR = 900; // LED-Grid schaltet sich an
    const FILL = 1700; // b füllt sich von unten solid schwarz (Ladebalken)
    let start = 0;

    const frame = (t: number) => {
      if (!start) start = t;
      const el = t - start;
      const now = el / 1000;
      ctx.clearRect(0, 0, W, H);

      // Mini-Satelliten — dezent, fest schwarz.
      ctx.save();
      ctx.fillStyle = PARTICLE;
      ctx.globalAlpha = 0.7;
      for (const s of sats) {
        s.ang += s.spd * 0.01;
        const r = s.rad + Math.sin(now * 0.6 + s.drift) * bw * 0.03;
        const sx = W / 2 + Math.cos(s.ang) * r;
        const sy = H / 2 + Math.sin(s.ang) * r;
        ctx.beginPath();
        ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // LED-Grid: feste Position, nur Größe pulsiert um den Mittelpunkt.
      ctx.save();
      ctx.fillStyle = PARTICLE;
      for (const d of dots) {
        const intro = Math.min(1, Math.max(0, (now - d.delay) / 0.45));
        if (intro <= 0) continue;
        const pulse = 0.62 + 0.38 * Math.sin(now * 2.4 + d.phase);
        const size = d.base * intro * pulse;
        if (size <= 0.1) continue;
        ctx.beginPath();
        ctx.arc(d.x, d.y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Ladebalken: schwarze Fläche steigt von unten durch die b-Maske.
      if (el > APPEAR && blackB) {
        const cp = Math.min(1, (el - APPEAR) / FILL);
        const fillH = cp * bh;
        ctx.save();
        ctx.beginPath();
        ctx.rect(bx, by + bh - fillH, bw, fillH);
        ctx.clip();
        ctx.drawImage(blackB, bx, by, bw, bh);
        ctx.restore();
      }

      if (el > APPEAR + FILL) {
        finish();
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    let objectUrl: string | null = null;
    fetch("/brand/banijay-sign.svg")
      .then((r) => r.text())
      .then((svg) => {
        const sized = svg
          .replace(/\swidth="[^"]*"/, "")
          .replace(/\sheight="[^"]*"/, "")
          .replace("<svg", '<svg width="525" height="537"');
        objectUrl = URL.createObjectURL(new Blob([sized], { type: "image/svg+xml" }));
        const img = new Image();
        img.onload = () => {
          build(img);
          if (objectUrl) URL.revokeObjectURL(objectUrl);
          if (reduce || dots.length === 0) {
            finish();
            return;
          }
          raf = requestAnimationFrame(frame);
        };
        img.onerror = () => finish();
        img.src = objectUrl;
      })
      .catch(() => finish());

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [onComplete]);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
