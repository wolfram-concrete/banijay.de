"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// Hero-V2-TESTLAUF: das Neon-Hallen-Keyvisual (AI-Still, 5504×3072) mit ECHTEN
// Videos in den TV-Screens. Technik: pro Screen wird ein <video> per CSS-matrix3d
// (Homographie aus 4 Eckpunkten, in % des Bildes ausgemessen) exakt in die
// perspektivische Display-Fläche verzerrt. Darüber liegt das Bild noch einmal im
// mix-blend-mode:screen — so legen sich Neon-Glow, Bezel-Highlights und Boden-
// spiegelungen des Originals WIEDER ÜBER die Videos (nur helle Pixel addieren),
// ohne dass wir Cutout-Masken brauchen.

const IMG = "/hero-v2/neon-hall.jpg";
const AR = 5504 / 3072; // Seitenverhältnis des Keyvisuals

// Logische Quellgröße der Video-Wrapper (wird von der Homographie exakt auf das
// Ziel-Viereck abgebildet; das Video füllt sie per object-fit:cover).
const SRC_W = 320;
const SRC_H = 220;

type Pt = [number, number]; // Prozent-Koordinaten im Bild (x%, y%)

type Screen = {
  id: string;
  video: string;
  /** Display-Ecken in Bild-Prozent: TL, TR, BR, BL (aus dem Keyvisual gemessen). */
  quad: [Pt, Pt, Pt, Pt];
};

// Die oberen zwei Wand-Screens (stark verkippt) bleiben bewusst „aus" — dunkel wie
// im Still. 6 aktive Screens = Decoder-Budget, das auch mobil noch vertretbar ist.
const SCREENS: Screen[] = [
  { id: "L1", video: "/video/showreel.mp4",   quad: [[13.9, 40.2], [24.6, 42.6], [24.6, 60.9], [13.9, 62.4]] },
  { id: "R1", video: "/video/grid-loop1.mp4", quad: [[76.9, 44.5], [85.4, 41.7], [85.4, 62.8], [76.9, 60.8]] },
  { id: "L3", video: "/video/grid-loop2.mp4", quad: [[30.9, 38.8], [35.4, 41.0], [35.4, 55.4], [30.9, 56.9]] },
  { id: "R3", video: "/video/grid-loop3.mp4", quad: [[64.6, 41.0], [69.1, 38.8], [69.1, 56.9], [64.6, 55.4]] },
  { id: "L4", video: "/video/grid-loop3.mp4", quad: [[38.1, 45.0], [41.2, 46.6], [41.2, 55.5], [38.1, 56.6]] },
  { id: "R4", video: "/video/grid-loop2.mp4", quad: [[58.8, 46.6], [61.9, 45.0], [61.9, 56.6], [58.8, 55.5]] },
];

/**
 * Homographie: bildet das Rechteck (0,0)-(w,0)-(w,h)-(0,h) auf 4 Zielpunkte ab
 * und liefert die fertige CSS-matrix3d. Lineares 8×8-System, Gauß-Elimination.
 */
function matrix3dFor(w: number, h: number, dst: [Pt, Pt, Pt, Pt]): string {
  const src: Pt[] = [
    [0, 0],
    [w, 0],
    [w, h],
    [0, h],
  ];
  // Aufbau des Systems A·x = b mit x = [h11 h12 h13 h21 h22 h23 h31 h32]
  const A: number[][] = [];
  const b: number[] = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = src[i];
    const [X, Y] = dst[i];
    A.push([x, y, 1, 0, 0, 0, -x * X, -y * X]);
    b.push(X);
    A.push([0, 0, 0, x, y, 1, -x * Y, -y * Y]);
    b.push(Y);
  }
  // Gauß-Elimination mit Pivotisierung
  const n = 8;
  const M = A.map((row, i) => [...row, b[i]]);
  for (let c = 0; c < n; c++) {
    let piv = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[piv][c])) piv = r;
    [M[c], M[piv]] = [M[piv], M[c]];
    const p = M[c][c];
    if (Math.abs(p) < 1e-10) continue;
    for (let k = c; k <= n; k++) M[c][k] /= p;
    for (let r = 0; r < n; r++) {
      if (r === c) continue;
      const f = M[r][c];
      for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k];
    }
  }
  const [h11, h12, h13, h21, h22, h23, h31, h32] = M.map((row) => row[n]);
  // CSS matrix3d ist spaltenweise; z-Zeile/Spalte bleibt Identität.
  return `matrix3d(${h11},${h21},0,${h31},${h12},${h22},0,${h32},0,0,1,0,${h13},${h23},0,1)`;
}

export function AlgarveNeonHallHero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  // Video-Wrapper exakt auf die Screen-Quads mappen — bei jeder Stage-Größe neu
  // (Prozent-Quads → Pixel im aktuellen Cover-Zuschnitt).
  useEffect(() => {
    const st = stage.current;
    if (!st) return;
    const apply = () => {
      const { width, height } = st.getBoundingClientRect();
      st.querySelectorAll<HTMLElement>("[data-screen]").forEach((el) => {
        const s = SCREENS.find((x) => x.id === el.dataset.screen);
        if (!s) return;
        const dst = s.quad.map(([px, py]) => [(px / 100) * width, (py / 100) * height]) as [Pt, Pt, Pt, Pt];
        el.style.transform = matrix3dFor(SRC_W, SRC_H, dst);
      });
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(st);
    return () => ro.disconnect();
  }, []);

  useGSAP(
    () => {
      // Zweistufiger Auftritt: ① Szene (B präsent) blendet auf → ② die Screens
      // „schalten sich ein" (Flacker-Keyframes, gestaffelt von vorn nach hinten).
      const screens = gsap.utils.toArray<HTMLElement>("[data-screen]");
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(screens, { opacity: 1 });
        return;
      }
      const tl = gsap.timeline();
      tl.fromTo(stage.current, { filter: "brightness(0.25)" }, { filter: "brightness(1)", duration: 1.4, ease: "power2.out" })
        .to(
          screens,
          {
            keyframes: { opacity: [0, 1, 0.3, 1, 0.65, 1], easeEach: "none" },
            duration: 0.55,
            stagger: 0.16,
            ease: "none",
          },
          "-=0.35",
        );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-clip" style={{ height: "100svh", background: "#07060a" }}>
      {/* Stage = Bildfläche im Cover-Zuschnitt (zentriert, deckt den Viewport). */}
      <div
        ref={stage}
        className="absolute left-1/2 top-1/2"
        style={{
          width: `max(100vw, calc(100svh * ${AR}))`,
          height: `max(100svh, calc(100vw / ${AR}))`,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* ① Basisbild */}
        <img src={IMG} alt="" className="absolute inset-0 h-full w-full" draggable={false} />

        {/* ② Videos, per matrix3d in die Display-Flächen verzerrt */}
        {SCREENS.map((s) => (
          <div
            key={s.id}
            data-screen={s.id}
            className="absolute overflow-clip"
            style={{
              width: SRC_W,
              height: SRC_H,
              top: 0,
              left: 0,
              transformOrigin: "0 0",
              opacity: 0,
              // leicht abdunkeln/entsättigen, damit die Loops im Grade der Szene sitzen
              filter: "brightness(0.88) saturate(0.92) contrast(1.04)",
            }}
          >
            <video src={s.video} muted loop autoPlay playsInline preload="auto" className="h-full w-full object-cover" />
          </div>
        ))}

        {/* ③ Bild erneut als Blend-Layer: addiert Neon-Glow, Bezel-Kanten und
            Spiegelungen ÜBER die Videos (screen-Blend hellt nur auf, deckt nie ab). */}
        <img
          src={IMG}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{ mixBlendMode: "screen" }}
          draggable={false}
        />
      </div>
    </section>
  );
}
