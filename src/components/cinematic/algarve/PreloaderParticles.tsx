"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

// PRELOADER-PARTIKEL (Wolfram 14.07., überarbeitet): eigenes Canvas-Partikelsystem
// mit klar getrennten Beats, damit die Choreografie „atmet" statt sofort das B zu
// zeigen:
//   • DUST:  aus dem Nichts fadet ein driftender, funkelnder Sternenstaub ein
//            (Punkte tauchen von außen kommend auf, zerstreut über das Feld).
//   • ZOOM:  das Staubfeld wird sanft herangezogen (Kamera schiebt rein).
//   • FORM:  der Staub verdichtet sich LANGSAM und mit einer leichten Drehung/Drift
//            in die B-Silhouette — bleibt dabei lebendig (Twinkle bleibt aktiv).
//   • WARP:  die B-Punkte schießen radial als Streaks auf die Kamera zu (Blende
//            auf den Home-Hero).
// Gesteuert über die imperative Handle (setDust/setZoom/setForm/setWarp) aus der
// Intro-Timeline — kein React-Re-Render pro Frame.

export interface PreloaderParticlesHandle {
  setDust: (v: number) => void;
  setZoom: (v: number) => void;
  setForm: (v: number) => void;
  setWarp: (v: number) => void;
}

const N = 1300;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeIn = (t: number) => t * t;
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export const PreloaderParticles = forwardRef<PreloaderParticlesHandle>(function PreloaderParticles(_props, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dust = useRef(0);
  const zoom = useRef(1);
  const form = useRef(0);
  const warp = useRef(0);

  useImperativeHandle(ref, () => ({
    setDust: (v: number) => (dust.current = v),
    setZoom: (v: number) => (zoom.current = v),
    setForm: (v: number) => (form.current = v),
    setWarp: (v: number) => (warp.current = v),
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let W = 0, H = 0, raf = 0;
    const t0 = performance.now();

    type P = {
      tx: number; ty: number;   // Ziel in der B-Silhouette
      dx: number; dy: number;   // zerstreute Staub-Position
      fx: number; fy: number;   // Einflug-Position (weiter außen)
      size: number; mag: boolean;
      tw: number; twSp: number;  // Twinkle-Phase & -Tempo
      drSp: number; drAmp: number; // Eigen-Drift (Leben)
      swirl: number;              // Verdrehung beim Formen
    };
    let parts: P[] = [];

    const resize = () => {
      W = canvas.width = Math.round(canvas.clientWidth * dpr);
      H = canvas.height = Math.round(canvas.clientHeight * dpr);
    };
    resize();

    // B-Punktwolke aus dem Marken-SVG rastern (echte B-Silhouette).
    const img = new Image();
    img.src = "/brand/banijay-sign-white.svg";
    img.onload = () => {
      const s = 240;
      const oc = document.createElement("canvas");
      oc.width = s;
      oc.height = s;
      const octx = oc.getContext("2d");
      if (!octx) return;
      const ar = img.naturalWidth / img.naturalHeight || 1;
      let dw = s, dh = s;
      if (ar > 1) dh = s / ar;
      else dw = s * ar;
      octx.drawImage(img, (s - dw) / 2, (s - dh) / 2, dw, dh);
      const data = octx.getImageData(0, 0, s, s).data;
      const pts: { x: number; y: number }[] = [];
      for (let y = 0; y < s; y += 2) {
        for (let x = 0; x < s; x += 2) {
          if (data[(y * s + x) * 4 + 3] > 130) pts.push({ x: x / s - 0.5, y: y / s - 0.5 });
        }
      }
      if (!pts.length) return;
      const next: P[] = [];
      for (let i = 0; i < N; i++) {
        const p = pts[(Math.random() * pts.length) | 0];
        // zerstreute Staubposition: weit über das B hinaus verteilt
        const ang = Math.random() * Math.PI * 2;
        const rad = 0.18 + Math.random() * 0.82; // 0.18–1.0 der B-Größe
        const dx = Math.cos(ang) * rad;
        const dy = Math.sin(ang) * rad * 0.92;
        next.push({
          tx: p.x + (Math.random() - 0.5) * 0.005,
          ty: p.y + (Math.random() - 0.5) * 0.005,
          dx,
          dy,
          fx: dx * 1.7, // Einflug von weiter außen
          fy: dy * 1.7,
          size: 0.6 + Math.random() * 1.1,
          mag: Math.random() < 0.06,
          tw: Math.random() * Math.PI * 2,
          twSp: 1.1 + Math.random() * 2.2,
          drSp: 0.5 + Math.random() * 1.1,
          drAmp: 0.006 + Math.random() * 0.014,
          swirl: (Math.random() - 0.5) * 1.35,
        });
      }
      parts = next;
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const time = (performance.now() - t0) / 1000;
      const d = clamp01(dust.current);
      const f = clamp01(form.current);
      const w = clamp01(warp.current);
      const z = zoom.current || 1;
      const cx = W / 2, cy = H / 2;
      const bSize = Math.min(W, H) * 0.44;

      if (w <= 0.0001) {
        // DUST → FORM: Staub taucht auf (fx→dx mit d), verdichtet sich dann
        // (dx→tx mit f). Twinkle + Drift + Swirl halten das Feld lebendig.
        const appear = easeOut(d);
        const ef = easeOut(f);
        for (const p of parts) {
          const dpx = p.fx + (p.dx - p.fx) * appear;
          const dpy = p.fy + (p.dy - p.fy) * appear;
          let ox = dpx + (p.tx - dpx) * ef;
          let oy = dpy + (p.ty - dpy) * ef;
          // Verdrehung beim Formen — dreht sich beim Andocken ans B heraus
          const sw = (1 - ef) * p.swirl;
          if (sw !== 0) {
            const cs = Math.cos(sw), sn = Math.sin(sw);
            const rx = ox * cs - oy * sn;
            const ry = ox * sn + oy * cs;
            ox = rx; oy = ry;
          }
          // Eigen-Drift (Leben), gedämpft sobald das B steht
          const life = 1 - ef * 0.82;
          ox += Math.cos(time * p.drSp + p.tw) * p.drAmp * life;
          oy += Math.sin(time * p.drSp * 0.9 + p.tw) * p.drAmp * life;
          const x = cx + ox * bSize * z;
          const y = cy + oy * bSize * z;
          // Twinkle: Helligkeit pulsiert; beim Formen wird alles klarer/heller
          const tw = 0.5 + 0.5 * Math.sin(time * p.twSp + p.tw);
          let a = appear * (0.3 + 0.7 * tw);
          a *= 0.7 + 0.3 * ef;
          a *= p.mag ? 1 : 0.9;
          if (a <= 0.02) continue;
          ctx.beginPath();
          ctx.arc(x, y, p.size * dpr * (0.6 + 0.55 * ef), 0, Math.PI * 2);
          ctx.fillStyle = p.mag ? `rgba(255,67,112,${a})` : `rgba(248,247,243,${a})`;
          ctx.fill();
        }
      } else {
        // WARP — die B-Punkte schießen radial aus der Mitte, beschleunigt, als
        // Streaks. Startskalierung schließt am Zoom an (nahtloser Übergang).
        const ew = easeIn(w);
        const S_MAX = 30;
        const base = z;
        for (const p of parts) {
          const s1 = base + ew * S_MAX;
          const s0 = base + Math.max(0, ew - 0.05) * S_MAX;
          const x1 = cx + p.tx * bSize * s1;
          const y1 = cy + p.ty * bSize * s1;
          const x0 = cx + p.tx * bSize * s0;
          const y0 = cy + p.ty * bSize * s0;
          const a = Math.max(0, 1 - ew * 0.85);
          if (a <= 0.02) continue;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.lineWidth = p.size * dpr * (1 + ew * 3.2);
          ctx.lineCap = "round";
          ctx.strokeStyle = p.mag ? `rgba(255,67,112,${a})` : `rgba(248,247,243,${a})`;
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    window.addEventListener("resize", resize, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
});
