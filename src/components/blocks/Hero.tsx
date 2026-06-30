"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);

  // Pointer-reaktives Licht — suggeriert Raum & Bewegung
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="grain relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-electric pt-28 pb-8"
      style={{ ["--mx" as string]: "70%", ["--my" as string]: "30%" }}
    >
      {/* Lichtwelten: ambienter Magenta-Glow folgt dem Pointer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(40rem 40rem at var(--mx) var(--my), rgba(255,67,112,0.45), transparent 60%)",
        }}
      />
      {/* tiefer Verlauf für Raum */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% -10%, rgba(1,1,106,0) 40%, rgba(5,5,7,0.55) 100%)",
        }}
      />
      {/* Eclipse-Orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[34rem] w-[34rem] rounded-full md:-right-10"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, rgba(5,5,7,1) 38%, rgba(255,67,112,0.9) 50%, rgba(255,67,112,0) 72%)",
          filter: "blur(2px)",
        }}
      />

      {/* Type-Block */}
      <div className="shell relative z-10 flex flex-1 flex-col justify-center">
        <span className="eyebrow text-bone/70">We are</span>
        <h1 className="mt-3">
          <span className="display block text-[clamp(3.5rem,16vw,15rem)] text-bone">
            Banijay
          </span>
          <span className="display block text-[clamp(3.5rem,16vw,15rem)] text-magenta">
            Storytellers
          </span>
        </h1>
      </div>

      {/* Glas-Meta-Leiste */}
      <div className="shell relative z-10">
        <div className="glass flex flex-col gap-6 rounded-2xl p-6 md:flex-row md:items-end md:justify-between md:p-8">
          <div className="max-w-xl">
            <p className="text-base leading-relaxed text-bone/85 md:text-lg">
              Die Entertainment-Welt hinter den Momenten, über die Deutschland
              spricht — ein Verbund der besten unabhängigen Produzent:innen und
              Unternehmer:innen.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href="/companies"
                className="inline-flex items-center gap-2 rounded-full bg-magenta px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
              >
                Companies entdecken <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-bone/25 px-6 py-3 text-sm text-bone transition-colors hover:bg-bone/10"
              >
                Kontakt aufnehmen
              </Link>
            </div>
          </div>

          <dl className="flex gap-8">
            <div>
              <dt className="eyebrow text-bone/45">Formate</dt>
              <dd className="display mt-1 text-3xl text-bone">4.300+</dd>
            </div>
            <div>
              <dt className="eyebrow text-bone/45">since</dt>
              <dd className="display mt-1 text-3xl text-bone">2008</dd>
            </div>
          </dl>
        </div>

        <div className="mt-6 flex items-center gap-2 text-bone/50">
          <ArrowDown size={14} className="animate-bounce" />
          <span className="eyebrow">Scroll</span>
        </div>
      </div>
    </section>
  );
}
