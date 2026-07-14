"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DustLayer } from "./DustLayer";
import { ECOSYSTEM, ECO_CATEGORIES } from "@/data/ecosystem";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ÖKOSYSTEM — VARIANTE B „Faser-Burst" (Looktest, Wolfram 10.07.):
// Alternatives Modell zur Atom-Orbit-Grafik nach Foto-Referenz: hunderte feine
// Lichtfasern schießen aus einem weißglühenden Zentrum, steigen erst vertikal
// auf/ab und biegen dann radial nach außen (Lichtfaser-Lampe / Pusteblume).
// An den Faserspitzen sitzen glimmende Punkte. Helligkeit läuft radial aus
// (ein gemeinsamer Gradient-Stroke), das weiße B steht im gleißenden Kern.
// Kategorie-Karten (identisches Milchglas-Akkordeon wie Variante A) ankern an
// sieben ausgewählten Faserspitzen. Alles Zufällige ist SEEDED (SSR-stabil).

const SHARP = "var(--font-sharp), sans-serif";
const MAGENTA = "#ff4370";
const PAPER = "#f8f7f3";

const STAGE = { cx: 600, cy: 385 };

// deterministischer PRNG — Server und Client erzeugen exakt dieselbe Grafik
function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Fiber = { d: string; w: number; o: number };
type Tip = { x: number; y: number; r: number; fill: string; o: number };

const FIBERS: Fiber[] = [];
const TIPS: Tip[] = [];
{
  const rnd = mulberry32(20260710);
  const f2 = (n: number) => +n.toFixed(2);
  // GLOBUS statt Fontäne (Wolfram 10.07.): Endpunkte liegen auf einer ENGEN,
  // fast runden Schale (265–315) → die Faserspitzen zeichnen eine Kugel-
  // Silhouette. Richtungen rundum gleichverteilt + Büschel an beiden Polen.
  for (let i = 0; i < 230; i++) {
    let theta = rnd() * Math.PI * 2;
    if (rnd() < 0.22) theta = (rnd() < 0.5 ? -1 : 1) * (Math.PI / 2) + (rnd() - 0.5) * 0.7;
    const R = 265 + rnd() * 50;
    const ex = STAGE.cx + Math.cos(theta) * R * 1.02;
    const ey = STAGE.cy + Math.sin(theta) * R * 0.94;
    // Abgang: Mischung aus radial + vertikal — Polfasern bilden den hellen
    // Mittelstrahl der Referenz, Äquatorfasern bekommen genug seitlichen Zug,
    // damit die Kugel RUNDUM gefüllt ist (Chrysanthemen-Spread)
    const s = Math.abs(Math.sin(theta)) < 0.12 ? (rnd() < 0.5 ? -1 : 1) : Math.sign(Math.sin(theta));
    const qx = STAGE.cx + Math.cos(theta) * R * (0.24 + rnd() * 0.14);
    const qy = STAGE.cy + s * R * (0.32 + rnd() * 0.2);
    FIBERS.push({
      d: `M ${STAGE.cx} ${STAGE.cy} Q ${f2(qx)} ${f2(qy)} ${f2(ex)} ${f2(ey)}`,
      w: f2(0.5 + rnd() * 0.5),
      o: f2(0.4 + rnd() * 0.55),
    });
    // fast jede Spitze glimmt → die Punkte formen die sichtbare Kugel-Kontur
    if (rnd() < 0.85) {
      TIPS.push({
        x: f2(ex),
        y: f2(ey),
        r: f2(0.8 + rnd() * 1.3),
        fill: rnd() < 0.1 ? MAGENTA : PAPER,
        o: f2(0.45 + rnd() * 0.55),
      });
    }
  }
  // dichte Punkt-Cluster an Nord- und Südpol (Referenz-Tufts)
  for (let i = 0; i < 30; i++) {
    const theta = (rnd() < 0.5 ? -1 : 1) * (Math.PI / 2) + (rnd() - 0.5) * 0.55;
    const R = (265 + rnd() * 50) * (0.98 + rnd() * 0.12);
    TIPS.push({
      x: f2(STAGE.cx + Math.cos(theta) * R * 1.02),
      y: f2(STAGE.cy + Math.sin(theta) * R * 0.94),
      r: f2(0.7 + rnd() * 1.1),
      fill: PAPER,
      o: f2(0.35 + rnd() * 0.5),
    });
  }
  // wenige lose Glimmer knapp außerhalb der Schale
  for (let i = 0; i < 22; i++) {
    const theta = rnd() * Math.PI * 2;
    const R = (265 + rnd() * 50) * (1.03 + rnd() * 0.12);
    TIPS.push({
      x: f2(STAGE.cx + Math.cos(theta) * R * 1.02),
      y: f2(STAGE.cy + Math.sin(theta) * R * 0.94),
      r: f2(0.6 + rnd() * 1),
      fill: PAPER,
      o: f2(0.3 + rnd() * 0.45),
    });
  }
}

// Kategorie-Anker: Winkel + Radius auf der Faserschale (gleiche Ellipsen-Metrik)
const CHIP_POS: Record<string, { deg: number; rad: number }> = {
  entertainment: { deg: -8, rad: 335 },
  audio: { deg: 186, rad: 330 },
  live: { deg: -152, rad: 300 },
  artists: { deg: -32, rad: 310 },
  distribution: { deg: 148, rad: 300 },
  fiction: { deg: 36, rad: 315 },
  tech: { deg: 84, rad: 265 },
};

function burstPoint(deg: number, rad: number) {
  const a = (deg * Math.PI) / 180;
  return {
    x: STAGE.cx + Math.cos(a) * rad * 1.12,
    y: STAGE.cy + Math.sin(a) * rad * 0.92,
  };
}

export function AlgarveEcosystemBurst() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>("entertainment");

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Faserspitzen glimmen (Twinkle, zeitversetzt)
      if (!reduced) {
        gsap.utils.toArray<SVGCircleElement>("[data-eco2-tip]").forEach((dot) => {
          gsap.to(dot, {
            opacity: 0.12 + Math.random() * 0.3,
            duration: 1.6 + Math.random() * 3.2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: Math.random() * 3,
          });
        });
        // träges Atmen des gesamten Bursts
        gsap.to("[data-eco2-stage]", {
          scale: 1.02,
          duration: 11,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          transformOrigin: "50% 50%",
        });
        gsap.to("[data-eco2-b]", { scale: 1.05, duration: 6.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
      }

      if (reduced) return;

      // Reveal: Fasern zeichnen sich aus dem Kern heraus
      const paths = gsap.utils.toArray<SVGPathElement>("[data-eco2-fiber]");
      paths.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      });
      gsap.set("[data-eco2-reveal]", { autoAlpha: 0, y: 30 });
      gsap.set("[data-eco2-card]", { autoAlpha: 0, scale: 0.88 });
      gsap.set("[data-eco2-tipgroup]", { autoAlpha: 0 });
      ScrollTrigger.create({
        trigger: root.current,
        start: "top 68%",
        once: true,
        onEnter: () => {
          gsap.to("[data-eco2-reveal]", { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power2.out" });
          gsap.to(paths, {
            strokeDashoffset: 0,
            duration: 1.7,
            stagger: { each: 0.006, from: "random" },
            ease: "power2.out",
            delay: 0.15,
          });
          gsap.to("[data-eco2-tipgroup]", { autoAlpha: 1, duration: 1.2, delay: 1.1 });
          gsap.to("[data-eco2-card]", { autoAlpha: 1, scale: 1, duration: 0.55, stagger: 0.07, ease: "back.out(1.6)", delay: 0.9 });
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-clip py-24 pb-36 lg:py-28 lg:pb-40" style={{ background: "transparent" }}>
      {/* Staub radial um den Burst-Kern */}
      <div className="absolute inset-0 opacity-80">
        <DustLayer boost={0.9} center={{ x: 0.5, y: 0.56 }} radius={0.7} />
      </div>

      {/* hellster Background-Punkt exakt hinter dem Kern */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          left: "50%",
          top: "56%",
          width: "110vmin",
          height: "110vmin",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(closest-side, rgba(255,67,112,0.34) 0%, rgba(199,50,90,0.22) 30%, rgba(143,34,68,0.12) 55%, rgba(86,17,46,0.05) 78%, rgba(30,0,24,0) 100%)",
        }}
      />

      {/* Headline + Looktest-Kennzeichnung */}
      <div data-eco2-reveal className="relative mx-auto max-w-[900px] px-6 text-center">
        <p
          className="m-0 mb-3 text-[0.72rem] font-bold uppercase tracking-[0.22em]"
          style={{ fontFamily: SHARP, color: "rgba(248,247,243,0.45)" }}
        >
          Variante B · Looktest
        </p>
        <h2 className="m-0 text-[3.4rem] leading-[1.02] max-[767px]:text-[2.2rem]" style={{ fontFamily: SHARP, fontWeight: 500, color: PAPER }}>
          {ECOSYSTEM.title}
        </h2>
      </div>

      {/* Die Burst-Bühne */}
      <div data-eco2-reveal className="relative mx-auto mt-8 w-full max-w-[1400px]" style={{ aspectRatio: "1600 / 780" }}>
        <svg
          data-eco2-stage
          className="absolute inset-0 h-full w-full"
          viewBox="-200 0 1600 780"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          aria-hidden
        >
          <defs>
            {/* Helligkeit läuft radial aus: EIN Gradient-Stroke für alle Fasern */}
            <radialGradient id="eco2-fade" gradientUnits="userSpaceOnUse" cx={STAGE.cx} cy={STAGE.cy} r={400}>
              <stop offset="0%" stopColor="rgba(248,247,243,0.8)" />
              <stop offset="45%" stopColor="rgba(248,247,243,0.3)" />
              <stop offset="100%" stopColor="rgba(248,247,243,0.06)" />
            </radialGradient>
            {/* gleißender weißer Kern */}
            <radialGradient id="eco2-core" gradientUnits="userSpaceOnUse" cx={STAGE.cx} cy={STAGE.cy} r={130}>
              <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
              <stop offset="30%" stopColor="rgba(255,220,232,0.45)" />
              <stop offset="62%" stopColor="rgba(255,67,112,0.14)" />
              <stop offset="100%" stopColor="rgba(255,67,112,0)" />
            </radialGradient>
          </defs>

          {/* Fasern */}
          {FIBERS.map((f, i) => (
            <path key={i} data-eco2-fiber d={f.d} stroke="url(#eco2-fade)" strokeWidth={f.w} opacity={f.o} strokeLinecap="round" />
          ))}

          {/* glimmende Spitzen + versprengte Glimmer */}
          <g data-eco2-tipgroup>
            {TIPS.map((t, i) => (
              <circle
                key={i}
                data-eco2-tip
                cx={t.x}
                cy={t.y}
                r={t.r}
                fill={t.fill}
                opacity={t.o}
                style={t.fill === MAGENTA ? { filter: `drop-shadow(0 0 6px ${MAGENTA})` } : undefined}
              />
            ))}
          </g>

          {/* Kern über den konvergierenden Faserenden */}
          <circle cx={STAGE.cx} cy={STAGE.cy} r={130} fill="url(#eco2-core)" />

          {/* Anker-Satelliten der Kategorie-Karten */}
          {ECO_CATEGORIES.map((cat) => {
            const pos = CHIP_POS[cat.key];
            const p = burstPoint(pos.deg, pos.rad);
            return (
              <circle
                key={`anchor-${cat.key}`}
                cx={+p.x.toFixed(2)}
                cy={+p.y.toFixed(2)}
                r={3.4}
                fill={MAGENTA}
                style={{ filter: `drop-shadow(0 0 7px ${MAGENTA})` }}
              />
            );
          })}
        </svg>

        {/* Zentrum: weiße Bildmarke im gleißenden Kern */}
        <img
          data-eco2-b
          src="/brand/banijay-sign-white.svg"
          alt=""
          draggable={false}
          className="pointer-events-none absolute h-auto w-[5%] min-w-[42px]"
          style={{
            // toFixed: Browser normalisieren Style-Attribute → Hydration-Schutz
            left: `${(((STAGE.cx + 200) / 1600) * 100).toFixed(3)}%`,
            top: `${((STAGE.cy / 780) * 100).toFixed(3)}%`,
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Kategorien als Akkordeon-Cards (identisch zu Variante A) */}
        {ECO_CATEGORIES.map((cat) => {
          const pos = CHIP_POS[cat.key];
          const p = burstPoint(pos.deg, pos.rad);
          const isActive = cat.key === active;
          const fx = (p.x + 200) / 1600;
          const anchorX = fx > 0.76 ? "-92%" : fx < 0.24 ? "-8%" : "-50%";
          return (
            <div
              key={cat.key}
              data-eco2-card
              className="absolute"
              style={{
                left: `${(fx * 100).toFixed(3)}%`,
                top: `${((p.y / 780) * 100).toFixed(3)}%`,
                transform: `translate(${anchorX}, 12px) scale(${isActive ? 1.04 : 1})`,
                transformOrigin: fx > 0.76 ? "92% 0%" : fx < 0.24 ? "8% 0%" : "50% 0%",
                transition: "transform .35s cubic-bezier(.2,.8,.2,1)",
                zIndex: isActive ? 30 : 10,
              }}
            >
              <div
                style={{
                  borderRadius: 6,
                  // SUBTIL & LEICHT (Wolfram 10.07.): kaum Eigenfläche — der
                  // Background scheint durch, nur Blur + hauchdünne Gloss-Kante
                  background: isActive
                    ? "linear-gradient(165deg, rgba(255,67,112,0.72) 0%, rgba(255,67,112,0.5) 100%)"
                    : "linear-gradient(165deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
                  backdropFilter: isActive ? "blur(18px) saturate(1.6)" : "blur(14px) saturate(1.4)",
                  WebkitBackdropFilter: isActive ? "blur(18px) saturate(1.6)" : "blur(14px) saturate(1.4)",
                  boxShadow: isActive
                    ? "inset 0 1px 0 rgba(255,255,255,0.35), 0 14px 30px -16px rgba(255,67,112,0.4)"
                    : "inset 0 1px 0 rgba(255,255,255,0.22), 0 8px 20px -14px rgba(0,0,0,0.4)",
                  minWidth: isActive ? "min(240px, 82vw)" : 0,
                  maxWidth: "min(300px, 88vw)",
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  onClick={() => setActive(isActive ? null : cat.key)}
                  aria-expanded={isActive}
                  className="flex w-full items-center gap-2 whitespace-nowrap px-3 py-1 text-left text-[0.68rem] font-semibold uppercase tracking-[0.14em]"
                  style={{ fontFamily: SHARP, color: "rgba(248,247,243,0.9)", cursor: "pointer" }}
                >
                  {cat.label}
                  <span
                    aria-hidden
                    className="ml-auto text-[0.9em]"
                    style={{ opacity: 0.45, transform: isActive ? "rotate(45deg)" : "none", transition: "transform .3s" }}
                  >
                    +
                  </span>
                </button>
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: isActive ? "1fr" : "0fr",
                    transition: "grid-template-rows .45s cubic-bezier(.2,.8,.2,1)",
                  }}
                >
                  <ul className="m-0 min-h-0 list-none overflow-hidden p-0">
                    <div className="flex flex-col px-3.5 pb-3 pt-1">
                      {cat.companies.map((c) => (
                        <li key={c.name} className="leading-snug">
                          {c.url ? (
                            <a
                              href={c.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group inline-flex items-center gap-1 py-[3px] text-[0.8rem] no-underline"
                              style={{ color: PAPER, fontFamily: SHARP, fontWeight: 500 }}
                            >
                              <span className="relative">
                                {c.name}
                                <span
                                  className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                                  style={{ background: PAPER }}
                                />
                              </span>
                              <ArrowUpRight className="h-3 w-3 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                          ) : (
                            <span
                              className="inline-block py-[3px] text-[0.8rem]"
                              style={{ color: PAPER, fontFamily: SHARP, fontWeight: 500, opacity: 0.78 }}
                            >
                              {c.name}
                            </span>
                          )}
                        </li>
                      ))}
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
