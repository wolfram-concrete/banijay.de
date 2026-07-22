"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LEADERSHIP } from "@/data/leadership";
import { focus } from "./Founders";
import { DustLayer } from "./DustLayer";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SHARP = "var(--font-sharp), sans-serif";

// TEAM-VARIANTE „SNAP" (Wolfram 22.07., 4. Runde) — ECHTES Snap-Fenster mit Einrasten:
// alle 12 in EINER Bildschirmhöhe (6×2, gleich große Kacheln), und die Section wird beim
// Erreichen GEPINNT (rastet ein, steht still), während sie sich final aufbaut. Danach
// steigt die LogoReveal-Videofläche (marginTop -100vh) über das stehende Team auf — dieselbe
// Choreografie wie bei „Raster". Marcus steht vorne (oben-links). Karten ohne weiße Kontur,
// wachsen mit mehrzeiligen Titeln mit.

const PEOPLE = LEADERSHIP;

// Milchglas-Namenskarte — OHNE weiße Kontur, wächst mit (kein whitespace-nowrap auf Rolle).
export function GlassCard({ name, role }: { name: string; role: string }) {
  return (
    <div
      className="pointer-events-none absolute bottom-[0.7vw] left-[0.7vw] z-[2] flex flex-col max-[767px]:bottom-[2.5vw] max-[767px]:left-[2.5vw]"
      style={{
        gap: "0.1em",
        padding: "0.5em 1.05em 0.6em",
        maxWidth: "calc(100% - 1.4vw)",
        background: "rgba(14,13,11,0.4)",
        backdropFilter: "blur(16px) saturate(1.1)",
        WebkitBackdropFilter: "blur(16px) saturate(1.1)",
        color: "#f8f7f3",
      }}
    >
      <span style={{ fontFamily: SHARP, fontWeight: 500, lineHeight: 1.08, letterSpacing: "-0.01em" }} className="text-[0.95rem] md:text-[1vw] max-[767px]:!text-[3.4vw]">
        {name}
      </span>
      {role ? (
        <span style={{ color: "rgba(248,247,243,0.72)", lineHeight: 1.16 }} className="text-[0.68rem] md:text-[0.72vw] max-[767px]:!text-[2.5vw]">
          {role}
        </span>
      ) : null}
    </div>
  );
}

// Wiederverwendbare Team-Kachel (auch von der Editorial-Variante genutzt).
export function TeamTile({ img, name, role }: { img: string; name: string; role: string }) {
  return (
    <div data-mo-tile className="relative h-full w-full overflow-hidden">
      <img src={img} alt={name} className="h-full w-full object-cover" style={{ filter: "grayscale(1)", objectPosition: focus(img) }} />
      <GlassCard name={name} role={role} />
    </div>
  );
}

export function AlgarveFoundersSnap() {
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // INTRO „UNSER TEAM" — Word-Reveal aus der Maske (wie die übrigen Headlines).
      const words = gsap.utils.toArray<HTMLElement>("[data-mo-word]");
      if (words.length) {
        gsap.from(words, { yPercent: 120, duration: 1.1, ease: "power4.out", stagger: 0.12, scrollTrigger: { trigger: "[data-mo-intro]", start: "top 70%", once: true } });
      }

      // Kacheln staffeln beim Eintritt herein.
      const tiles = gsap.utils.toArray<HTMLElement>("[data-mo-tile]");
      gsap.set(tiles, { autoAlpha: 0, scale: 1.03 });
      ScrollTrigger.batch(tiles, {
        start: "top 98%",
        once: true,
        onEnter: (b) => gsap.to(b, { autoAlpha: 1, scale: 1, duration: 0.7, ease: "power2.out", stagger: 0.04 }),
      });

      // EINRASTEN nur Desktop: das 100vh-Snap-Fenster wird gepinnt (steht 100vh lang still),
      // während es fertig aufbaut. Über diese gepinnte Fläche steigt danach die LogoReveal-
      // Videoblende (marginTop -100vh) auf — genau wie beim gepinnten Raster. Der Pin liefert
      // zugleich die 100vh Overlap-Distanz, die die Blende erwartet (deshalb KEIN Auslauf-
      // Spacer mehr). Mobile: kein Pin (LogoReveal-marginTop +32vh, kein Overlap).
      // Pin-Strecke 190% (Wolfram 22.07.): die ersten ~90vh sind REINER Halt (Team steht
      // still, KEIN Video), erst die letzten 100vh überlagert die LogoReveal-Blende. So
      // bekommt das Team spürbar Raum, bevor sich das Video darüberschiebt.
      if (grid.current && window.matchMedia("(min-width: 768px)").matches) {
        ScrollTrigger.create({ trigger: grid.current, start: "top top", end: "+=190%", pin: true, pinSpacing: true, anticipatePin: 1 });
      }
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative w-full overflow-clip" style={{ background: "transparent" }}>
      {/* ── INTRO-Sequenz „UNSER TEAM" auf dem Sternenstaub. ───────────────────────────── */}
      <div data-mo-intro className="relative flex w-full items-center justify-center overflow-clip" style={{ height: "78vh", minHeight: "520px" }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            maskImage: "linear-gradient(180deg, transparent 0%, black 16%, black 84%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 16%, black 84%, transparent 100%)",
          }}
        >
          <DustLayer boost={0.85} center={{ x: 0.5, y: 0.5 }} radius={0.62} />
        </div>
        <h2 className="relative z-[1] m-0 text-center uppercase text-[#f8f7f3]" style={{ fontFamily: SHARP, fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 0.92 }}>
          <span className="block overflow-hidden">
            <span data-mo-word className="block text-[9vw] max-[767px]:!text-[15vw]">Unser</span>
          </span>
          <span className="block overflow-hidden">
            <span data-mo-word className="block text-[9vw] max-[767px]:!text-[15vw]">Team</span>
          </span>
        </h2>
      </div>

      {/* ── SNAP-FENSTER: alle 12 in EINER Bildschirmhöhe, gleich große Kacheln (6×2). ──── */}
      <div
        ref={grid}
        className="grid w-full max-[767px]:hidden"
        style={{ gridTemplateColumns: "repeat(6, 1fr)", gridTemplateRows: "repeat(2, 1fr)", gap: 0, height: "100vh" }}
      >
        {PEOPLE.map((p) => (
          <TeamTile key={p.img} img={p.img} name={p.name} role={p.role} />
        ))}
      </div>

      {/* ── Mobile: 3 Spalten × 4 Reihen — ebenfalls ein Screen (100dvh), gleich groß. ──── */}
      <div
        className="hidden w-full max-[767px]:grid"
        style={{ gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(4, 1fr)", gap: 0, height: "100dvh" }}
      >
        {PEOPLE.map((p) => (
          <TeamTile key={p.img} img={p.img} name={p.name} role={p.role} />
        ))}
      </div>
    </section>
  );
}
