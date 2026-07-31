import { CONTACT } from "@/data/site";

/* Laufband-Wörter — der Track trägt die Reihe zweimal (s. .wartung-marquee-track
   in globals.css), damit der -50%-Loop nahtlos schließt. */
const MARQUEE_WORDS = [
  "Entertainment",
  "Formate",
  "Companies",
  "Talent",
  "Streaming",
  "Live",
  "Digital",
];

function MarqueeRow() {
  return (
    <span className="flex shrink-0 items-center">
      {MARQUEE_WORDS.map((word) => (
        <span key={word} className="flex items-center">
          <span className="px-[1.1em] text-[clamp(0.75rem,1.6vw,1rem)] uppercase tracking-[0.34em] text-[rgba(248,247,243,0.42)]">
            {word}
          </span>
          <span aria-hidden className="text-[0.5rem] text-[#ff4370]">
            ●
          </span>
        </span>
      ))}
    </span>
  );
}

export default function WartungPage() {
  return (
    <div className="wartung-stage flex flex-col">
      <div className="wartung-aura mood-breathe" aria-hidden />
      <div className="wartung-grain" aria-hidden />

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        {/* Plain <img> wie überall im Projekt für das B-Sign (SiteHeader,
            EcosystemBurst) — der Image-Optimizer bräuchte für SVG sonst
            dangerouslyAllowSVG. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/banijay-sign-white.svg"
          alt="Banijay"
          draggable={false}
          className="wartung-sign-glow h-[clamp(2.4rem,5.5vh,3.6rem)] w-auto"
        />

        <p className="mt-10 text-[11px] uppercase tracking-[0.32em] text-[rgba(248,247,243,0.5)]">
          Banijay Germany
        </p>

        <h1
          className="mt-5 font-medium leading-[0.94] tracking-[-0.02em] text-[#f8f7f3]"
          style={{ fontSize: "clamp(2.6rem, 8.4vh, 6rem)" }}
        >
          Wir bauen um.
        </h1>

        <p className="mt-7 max-w-[34ch] text-[clamp(1rem,1.4vw,1.15rem)] leading-relaxed text-[rgba(248,247,243,0.62)]">
          banijay.de wird gerade überarbeitet und ist in Kürze wieder für dich da.
        </p>

        <div className="mt-11 flex flex-col items-center gap-4">
          <a
            href={`mailto:${CONTACT.email}`}
            className="group relative inline-flex items-center overflow-hidden rounded-[6px] border border-[#f8f7f3] bg-[#f8f7f3] px-8 py-3.5 text-[0.95rem] text-[#0a0208] transition-colors duration-300 hover:text-[#f8f7f3] focus-visible:text-[#f8f7f3] focus-visible:outline-none"
          >
            {/* Radial-Invert wie .cta-invert: Fläche skaliert von rechts herein. */}
            <span
              aria-hidden
              className="absolute inset-0 origin-[84%_50%] scale-0 rounded-[6px] bg-[#0a0208] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-150 group-focus-visible:scale-150"
            />
            <span className="relative z-10">{CONTACT.email}</span>
          </a>

          <a
            href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`}
            className="text-[0.9rem] tracking-[0.02em] text-[rgba(248,247,243,0.45)] transition-colors hover:text-[#ff4370]"
          >
            {CONTACT.phone}
          </a>
        </div>
      </main>

      <div className="relative z-10 w-full overflow-hidden border-t border-[rgba(248,247,243,0.1)] py-5">
        <div className="wartung-marquee-track">
          <MarqueeRow />
          <MarqueeRow />
        </div>
      </div>
    </div>
  );
}
