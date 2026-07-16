/* eslint-disable @next/next/no-img-element */
import { COMPANIES_DIRECTORY } from "@/data/companiesDirectory";

// LOGO-TICKER — endlose Banderole mit den weißen Company-Wortmarken, läuft
// durchgehend von rechts nach links (Track = Logo-Reihe ZWEIMAL, -50%→0 nahtlos;
// Animation `loveBrandsTicker` in globals.css).
//
// HERKUNFT (Wolfram 16.07.): Das ist die Wiederherstellung des ursprünglichen
// „LoveBrandsTicker" (13.07.), der unter dem About-Statement lief. Er wurde am
// 14.07. erst auf Format-Stills umgebaut (Commit 91ee7271, „Formate statt
// Company-Wortmarken") und dann ganz entfernt (1456bbdc). Zurück kommt bewusst die
// ERSTE Fassung mit den weißen Logos — die Stills-Variante ist NICHT gemeint.
// Die Logos kommen weiterhin live aus COMPANIES_DIRECTORY, der Ticker wächst also
// automatisch mit der Company-Liste (aktuell inkl. Brainpool/NightWash).

const LOGOS = COMPANIES_DIRECTORY.filter((c) => c.logo).map((c) => ({ src: c.logo!, alt: c.name }));

export function AlgarveLogoTicker({ label = "Companies & Labels" }: { label?: string } = {}) {
  if (!LOGOS.length) return null;
  return (
    <section
      data-logo-ticker
      aria-label={label}
      className="relative overflow-hidden"
      style={{ background: "transparent", paddingTop: "2.5vw", paddingBottom: "0.5vw" }}
    >
      {/* Kantenfade links/rechts → die Logos „faden" beim Ein-/Auslaufen. */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent 0%, black 11%, black 89%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 11%, black 89%, transparent 100%)",
        }}
      >
        <div className="love-brands-track">
          {[0, 1].map((dup) => (
            <div
              key={dup}
              aria-hidden={dup === 1}
              className="flex shrink-0 items-center"
              style={{ gap: "clamp(2.5rem, 5vw, 6rem)", paddingRight: "clamp(2.5rem, 5vw, 6rem)" }}
            >
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
