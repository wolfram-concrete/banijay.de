import { ArrowUpRight } from "lucide-react";
import { CAREER } from "@/data/career";

// Standortmodul: keine Tabellenoptik, sondern große typografische Standort-Zeilen
// mit Count-Badge. Standorte ohne offene Stellen bleiben sichtbar, aber ruhiger;
// der Link führt trotzdem auf die (gefilterte) Jobbörse.

const SHARP = "var(--font-sharp), sans-serif";

// Magenta-Standort-Card auf Off-White (radial gerundete Kanten).
export function AlgarveCareerLocations() {
  return (
    <section style={{ background: "#f8f7f3", color: "#0e0d0b", paddingTop: "2.5vw", paddingBottom: "2.5vw" }}>
      {/* Magenta-Box als gerundete Card (radiale Kanten ringsum) auf Off-White. */}
      <div style={{ background: "#ff4370", borderRadius: "2.5vw", marginLeft: "2vw", marginRight: "2vw", paddingTop: "5.2vw", paddingBottom: "5.2vw" }}>
      <div className="mx-auto max-[767px]:!px-[3vw]" style={{ paddingLeft: "4.44vw", paddingRight: "4.44vw", maxWidth: "1440px" }}>
        <p
          className="max-w-[47vw] max-[767px]:!max-w-full max-[767px]:!text-[5vw]"
          style={{ fontFamily: SHARP, fontSize: "2.1vw", lineHeight: "122%", fontWeight: 500, letterSpacing: "-0.07vw", marginBottom: "2.8vw" }}
        >
          {CAREER.locations.text}
        </p>

        <div className="flex flex-col">
          {CAREER.locations.items.map((loc) => {
            const has = loc.count > 0;
            return (
              <a
                key={loc.name}
                href={loc.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Jobs in ${loc.name} ansehen — in neuem Tab öffnen`}
                className="group flex items-center justify-between no-underline"
                style={{
                  color: "#0e0d0b",
                  paddingTop: "1.4vw",
                  paddingBottom: "1.4vw",
                  borderTop: "0.08vw solid rgba(14,13,11,0.18)",
                  opacity: has ? 1 : 0.55,
                }}
              >
                <span
                  className="flex items-center uppercase max-[767px]:!text-[10vw]"
                  style={{ fontFamily: SHARP, fontSize: "3.2vw", lineHeight: "100%", fontWeight: 500, letterSpacing: "-0.11vw", gap: "1.5vw" }}
                >
                  {loc.name}
                  <ArrowUpRight
                    className="shrink-0 opacity-0 transition-all duration-500 group-hover:translate-x-2 group-hover:opacity-100 max-[767px]:!hidden"
                    style={{ width: "2.2vw", height: "2.2vw" }}
                  />
                </span>
                <span
                  className="shrink-0 max-[767px]:!text-[2.8vw]"
                  style={{
                    fontFamily: SHARP,
                    fontSize: "0.9vw",
                    fontWeight: 700,
                    letterSpacing: "0.052vw",
                    textTransform: "uppercase",
                    color: has ? "#0e0d0b" : "rgba(14,13,11,0.6)",
                  }}
                >
                  {has ? `${loc.count} offene Stellen` : "Initiativbewerbung"}
                </span>
              </a>
            );
          })}
        </div>
      </div>
      </div>
    </section>
  );
}
