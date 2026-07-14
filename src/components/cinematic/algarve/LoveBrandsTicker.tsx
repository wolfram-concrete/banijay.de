/* eslint-disable @next/next/no-img-element */

// ICONIC-IP-BANDEROLE (Task #64, Wolfram 14.07.): endlose Banderole unter der
// „About Banijay"-Headline, die die BRANDS / iconic IPs zeigt — die bekanntesten
// Formate aus dem Banijay-/Brainpool-Kosmos (Bilder aus dem Heike-Handover, als
// Landscape-Thumbnails weboptimiert unter /public/formats). Track = Reihe ZWEIMAL
// (-50%→0 nahtlos). ⚠️ Sobald saubere weiße Format-Logos geliefert sind, können die
// Bild-Tiles hier durch Logos ersetzt werden.
const FORMATS: { slug: string; name: string }[] = [
  { slug: "wer-wird-millionaer", name: "Wer wird Millionär?" },
  { slug: "the-masked-singer", name: "The Masked Singer" },
  { slug: "die-hoehle-der-loewen", name: "Die Höhle der Löwen" },
  { slug: "tv-total", name: "TV total" },
  { slug: "stromberg", name: "Stromberg" },
  { slug: "kitchen-impossible", name: "Kitchen Impossible" },
  { slug: "schlag-den-star", name: "Schlag den Star" },
  { slug: "temptation-island", name: "Temptation Island" },
  { slug: "kampf-der-realitystars", name: "Kampf der Realitystars" },
  { slug: "promi-big-brother", name: "Promi Big Brother" },
  { slug: "die-verraeter", name: "Die Verräter" },
  { slug: "nightwash", name: "NightWash" },
];

const SHARP = "var(--font-sharp), sans-serif";

export function LoveBrandsTicker() {
  return (
    <section data-love-brands aria-label="Iconic Brands & Formate" className="relative overflow-hidden" style={{ background: "transparent", paddingTop: "2.5vw", paddingBottom: "0.5vw" }}>
      {/* Kantenfade links/rechts → die Tiles „faden" beim Ein-/Auslaufen */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div className="love-brands-track">
          {[0, 1].map((dup) => (
            <div key={dup} aria-hidden={dup === 1} className="flex shrink-0 items-center" style={{ gap: "clamp(0.7rem, 1.1vw, 1.1rem)", paddingRight: "clamp(0.7rem, 1.1vw, 1.1rem)" }}>
              {FORMATS.map((f) => (
                <div
                  key={`${dup}-${f.slug}`}
                  className="group/tile relative shrink-0 overflow-hidden"
                  style={{ height: "clamp(4.2rem, 6.5vw, 6rem)", aspectRatio: "440 / 248", background: "#14100f" }}
                >
                  <img
                    src={`/formats/${f.slug}.jpg`}
                    alt={dup === 0 ? f.name : ""}
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover/tile:scale-[1.05]"
                    style={{ filter: "grayscale(0.65) contrast(1.02)" }}
                  />
                  {/* Scrim + Formatname unten links */}
                  <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,8,10,0) 40%, rgba(10,8,10,0.82) 100%)" }} />
                  <span
                    className="absolute bottom-1.5 left-2 right-2 truncate"
                    style={{ fontFamily: SHARP, fontSize: "clamp(0.6rem, 0.85vw, 0.82rem)", fontWeight: 500, letterSpacing: "-0.01em", color: "#f8f7f3" }}
                  >
                    {f.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
