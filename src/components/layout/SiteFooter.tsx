"use client";

import Link from "next/link";
import { NAV_ITEMS, CONTACT, SOCIAL } from "@/data/site";

// Footer — großes Rounded-Panel mit Nav-Links, Kontakt + Social-Buttons, darunter
// BANIJAY als großes Lettering-Marquee (auf die Card geclippt), zuletzt Legal-Zeile
// + Bildmarke. Farb-Logik: NUR auf der Home „dunkel" (Ink-Card, Magenta-Typo,
// Magenta-Außen). Auf ALLEN anderen Seiten invertiert wie /about: Magenta-Card,
// Ink-Typo, Paper-Außenfläche.

const INK = "#0e0d0b";
const ACCENT = "#ff4370"; // verbindliches Banijay-Magenta
const PAPER = "#f8f7f3";
const marqueeWords = ["Banijay", "Banijay", "Banijay"];

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function IconLinkedin() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export function SiteFooter() {
  // V2-Mood (10.07.): Footer ÜBERALL invertiert — auf dem dunklen Backdrop hätte
  // die Ink-Card zu wenig Kontrast (Home war zuvor die Ausnahme).
  const inverted = true;

  // Card-Grund (BG) und Schrift (FG) je nach Variante; Außenfläche OUTER.
  const BG = inverted ? ACCENT : INK;
  const FG = inverted ? INK : ACCENT;
  // V2-Mood: Außenfläche ÜBERALL transparent — der globale MoodBackdrop
  // scheint auch hinter/unter dem Footer durch (vorher Paper bzw. Magenta).
  const OUTER = "transparent";

  return (
    <footer
      style={{
        background: OUTER,
        paddingTop: "2.22vw",
        paddingBottom: "2.22vw",
        position: "relative",
        // Der Footer liegt ÜBER der geschlossenen Top-Nav (z-45) — am Seitenende
        // verschwindet die redundante Top-Nav also hinter dem Footer. Das geöffnete
        // Menü-Overlay (z-200) + Nav (z-201) legen sich weiterhin komplett darüber.
        zIndex: 50,
      }}
    >
      <style>{`
        @keyframes footerMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .footer-social{color:var(--fg);border-color:var(--fg);transition:background-color .3s ease,color .3s ease}
        .footer-social:hover{background:var(--fg);color:var(--bg);border-color:var(--fg)}
      `}</style>
      <div style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
        <div
          style={{
            position: "relative",
            background: BG,
            color: FG,
            paddingTop: "4.44vw",
            paddingBottom: "2.5vw",
            overflow: "hidden",
          }}
        >
          {/* Kontakt/Folgen (links) · Nav-Links (rechts, rechtsbündig wie Hauptnav) */}
          <div style={{ paddingLeft: "4.44vw", paddingRight: "4.44vw" }}>
            <div className="grid gap-14 md:grid-cols-2 lg:gap-24">
              {/* Links: Folgen + Kontakt — auf Mobile UNTER die Nav-Links (order-2) */}
              <div className="flex flex-col gap-10 max-[767px]:order-2">
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-bold uppercase tracking-[0.14em]" style={{ opacity: 0.5 }}>
                    Folgen
                  </span>
                  {/* Social-Buttons: Farbe/Border über die CSS-Vars (--fg/--bg), damit
                      der Hover Text + Icon zuverlässig invertiert. */}
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={SOCIAL.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Instagram — ${SOCIAL.instagram.handle}`}
                      className="footer-social inline-flex items-center gap-2 rounded-full border bg-transparent px-5 py-2.5 text-sm font-medium"
                      style={{ ["--fg" as string]: FG, ["--bg" as string]: BG }}
                    >
                      <IconInstagram />
                      Instagram
                    </a>
                    <a
                      href={SOCIAL.linkedin.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`LinkedIn — ${SOCIAL.linkedin.handle}`}
                      className="footer-social inline-flex items-center gap-2 rounded-full border bg-transparent px-5 py-2.5 text-sm font-medium"
                      style={{ ["--fg" as string]: FG, ["--bg" as string]: BG }}
                    >
                      <IconLinkedin />
                      LinkedIn
                    </a>
                  </div>
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

              {/* Rechts: Nav-Links rechtsbündig — auf Mobile ganz OBEN (order-1) und
                  ebenfalls rechtsbündig. */}
              <nav className="flex flex-col items-end text-right max-[767px]:order-1" style={{ gap: "0.4vw" }}>
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
                      color: FG,
                    }}
                  >
                    {item.label === "Banijay" ? "Home" : item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* BANIJAY — großes Lettering-Marquee (auf die Card geclippt via overflow). */}
          <div className="w-full overflow-hidden" style={{ marginTop: "6vw", marginBottom: "3vw" }}>
            <div className="flex w-max" style={{ animation: "footerMarquee 60s linear infinite" }}>
              {[0, 1].map((dup) => (
                <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
                  {marqueeWords.map((w, i) => (
                    <span
                      key={i}
                      className="uppercase max-[767px]:!text-[33vw]"
                      style={{
                        fontFamily: "var(--font-sharp), sans-serif",
                        fontSize: "22vw",
                        fontWeight: 500,
                        letterSpacing: "-0.05em",
                        lineHeight: 1,
                        paddingRight: "2vw",
                        color: FG,
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

          {/* Legal */}
          <div style={{ paddingLeft: "4.44vw", paddingRight: "4.44vw" }}>
            <div className="flex gap-6 text-xs tracking-[0.02em]" style={{ opacity: 0.5 }}>
              <Link href="/impressum" className="hover:opacity-100">
                Impressum
              </Link>
              <Link href="/datenschutz" className="hover:opacity-100">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
