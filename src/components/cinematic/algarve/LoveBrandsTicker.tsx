/* eslint-disable @next/next/no-img-element */
import { COMPANIES_DIRECTORY } from "@/data/companiesDirectory";

// LOVE-BRANDS-TICKER (Task #64, Wolfram 13.07.): endlose Logo-Banderole, die
// von links nach rechts läuft (Track = Logo-Reihe ZWEIMAL, -50%→0 nahtlos).
// ⚠️ Nutzt vorerst die echten Company-Weiß-Logos — sobald eigene Love-Brand-/
// Format-Logos (Wer wird Millionär?, TV total, The Masked Singer …) geliefert
// sind, hier die Quelle austauschen.
const LOGOS = COMPANIES_DIRECTORY.filter((c) => c.logo).map((c) => ({ src: c.logo!, alt: c.name }));

export function LoveBrandsTicker() {
  return (
    <section aria-label="Love Brands" className="relative overflow-hidden" style={{ background: "transparent", paddingTop: "2.5vw", paddingBottom: "0.5vw" }}>
      {/* keine Headline über dem Ticker (Wolfram 13.07.) */}
      {/* Kantenfade links/rechts → die Logos „faden" beim Ein-/Auslaufen (Wolfram 13.07.) */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent 0%, black 11%, black 89%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 11%, black 89%, transparent 100%)",
        }}
      >
        <div className="love-brands-track">
          {[0, 1].map((dup) => (
            <div key={dup} aria-hidden={dup === 1} className="flex shrink-0 items-center" style={{ gap: "clamp(2.5rem, 5vw, 6rem)", paddingRight: "clamp(2.5rem, 5vw, 6rem)" }}>
              {LOGOS.map((l) => (
                <img
                  key={`${dup}-${l.src}`}
                  src={l.src}
                  alt={dup === 0 ? l.alt : ""}
                  className="w-auto shrink-0 object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
                  style={{ height: "clamp(1.6rem, 2.4vw, 2.6rem)" }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
