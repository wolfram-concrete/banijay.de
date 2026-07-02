import Link from "next/link";
import { NAV_ITEMS, CONTACT } from "@/data/site";

// Footer — Algarve-Referenz: dunkles Rounded-Panel mit großen Nav-Links links,
// Kontakt rechts, dem Claim „Mehr als ein Produktionshaus.", darunter BANIJAY
// als großes Lettering im Endlos-Marquee, zuletzt die Legal-Zeile.

const INK = "#0e0d0b";
const ACCENT = "#ff4370"; // Footer-Typo & Außenfläche (Magenta-Flow)
const marqueeWords = ["Banijay", "Banijay", "Banijay"];

export function SiteFooter() {
  return (
    <footer
      style={{
        background: ACCENT,
        paddingTop: "2.22vw",
        paddingBottom: "2.22vw",
        // Footer legt sich komplett über Logo & Menu der fixen Nav (z-99) — im
        // Footer stehen ohnehin alle Infos, also müssen Logo/Menu dort nicht sein.
        position: "relative",
        zIndex: 100,
      }}
    >
      <style>{`@keyframes footerMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      <div style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
        <div
          style={{
            background: INK,
            color: ACCENT,
            borderRadius: "1.67vw",
            paddingTop: "4.44vw",
            paddingBottom: "2.5vw",
            overflow: "hidden",
          }}
        >
          {/* Nav-Links + Kontakt */}
          <div style={{ paddingLeft: "4.44vw", paddingRight: "4.44vw" }}>
            <div className="grid gap-14 md:grid-cols-[1.2fr_1fr] lg:gap-24">
              <nav className="flex flex-col" style={{ gap: "0.4vw" }}>
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="uppercase transition-opacity hover:opacity-60"
                    style={{
                      fontFamily: "var(--font-sharp), sans-serif",
                      fontSize: "clamp(1.75rem, 2.6vw, 3.2rem)",
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                      lineHeight: "118%",
                      color: ACCENT,
                    }}
                  >
                    {item.label === "Banijay" ? "Home" : item.label}
                  </Link>
                ))}
              </nav>

              <div className="flex flex-col gap-10 md:pl-[6vw]">
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-bold uppercase tracking-[0.14em]" style={{ opacity: 0.5 }}>
                    Folgen
                  </span>
                  <a
                    href="https://instagram.com/banijaygermany"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:opacity-70"
                    style={{ fontSize: "1.05rem" }}
                  >
                    @banijaygermany
                  </a>
                </div>
                <div className="flex flex-col gap-2.5">
                  <span className="text-xs font-bold uppercase tracking-[0.14em]" style={{ opacity: 0.5 }}>
                    Kontakt
                  </span>
                  <div style={{ lineHeight: "1.6", fontSize: "1.05rem" }}>
                    {CONTACT.street}
                    <br />
                    {CONTACT.city}
                  </div>
                  <a href={`mailto:${CONTACT.email}`} className="hover:opacity-70" style={{ fontSize: "1.05rem" }}>
                    {CONTACT.email}
                  </a>
                  <a
                    href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`}
                    className="hover:opacity-70"
                    style={{ fontSize: "1.05rem" }}
                  >
                    {CONTACT.phone}
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* BANIJAY — großes Lettering-Marquee (Referenz-Größe, langsam) */}
          <div className="w-full overflow-hidden" style={{ marginTop: "6vw", marginBottom: "3vw" }}>
            <div className="flex w-max" style={{ animation: "footerMarquee 60s linear infinite" }}>
              {[0, 1].map((dup) => (
                <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
                  {marqueeWords.map((w, i) => (
                    <span
                      key={i}
                      className="uppercase"
                      style={{
                        fontFamily: "var(--font-sharp), sans-serif",
                        fontSize: "22vw",
                        fontWeight: 500,
                        letterSpacing: "-0.05em",
                        lineHeight: 1,
                        paddingRight: "2vw",
                        color: ACCENT,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {w}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legal + Bildmarke — gleiches Grid wie oben, damit das b linksbündig
              mit dem Folgen/Kontakt-Block sitzt; unten auf der Impressum-Grundlinie. */}
          <div style={{ paddingLeft: "4.44vw", paddingRight: "4.44vw" }}>
            <div className="grid items-end gap-14 md:grid-cols-[1.2fr_1fr] lg:gap-24">
              <div className="flex gap-6 text-xs tracking-[0.02em]" style={{ opacity: 0.5 }}>
                <Link href="/impressum" className="hover:opacity-100">
                  Impressum
                </Link>
                <Link href="/datenschutz" className="hover:opacity-100">
                  Datenschutz
                </Link>
              </div>
              {/* Kleine Banijay-Bildmarke (Magenta), linksbündig mit der Kontaktspalte.
                  Plain <img>: Brand-SVG, next/image lädt Brand-Assets nicht. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/banijay-sign.svg"
                alt="Banijay"
                className="justify-self-start md:pl-[6vw]"
                style={{ height: "2.4rem", width: "auto", boxSizing: "content-box" }}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
