import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";

// TYPO-TESTSEITE (nicht verlinkt): Specimen-Vergleich für den
// „STRATEGY. BRANDING"-Look aus Wolframs Referenz (08.07.).
// Bewusst AUSSERHALB von (frontend) — keine Nav, kein Preloader, kein Lenis.
// Die Testfonts liegen in public/fonts-test/ (gitignored, Lizenzen ungeklärt).

export const metadata: Metadata = {
  title: "Typo-Test — Specimen-Vergleich",
  robots: { index: false, follow: false },
};

const anton = Anton({ weight: "400", subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

const BODY_TEXT =
  "Order & Chaos is an experimental design series focused on pushing minimalism to its edge. Through rigid constraints in layout, typography, and color, the work explores how visual tension can coexist with clarity and restraint.";

function Block({
  label,
  note,
  headFamily,
  bodyFamily,
  headWeight = 900,
  tracking = "-0.01em",
}: {
  label: string;
  note: string;
  headFamily: string;
  bodyFamily: string;
  headWeight?: number;
  tracking?: string;
}) {
  return (
    <section style={{ padding: "56px 48px", borderBottom: "1px solid #e5e5e5" }}>
      <p style={{ margin: 0, fontFamily: "monospace", fontSize: 13, color: "#c2185b" }}>
        {label} <span style={{ color: "#999" }}>— {note}</span>
      </p>
      <h2
        style={{
          margin: "18px 0 10px",
          fontFamily: headFamily,
          fontWeight: headWeight,
          fontSize: 110,
          lineHeight: 0.92,
          letterSpacing: tracking,
          textTransform: "uppercase",
          color: "#0a0a0a",
        }}
      >
        Strategy.
        <br />
        Branding
      </h2>
      <p
        style={{
          margin: 0,
          maxWidth: 720,
          fontFamily: bodyFamily,
          fontSize: 26,
          lineHeight: 1.35,
          letterSpacing: "-0.01em",
          color: "#111",
        }}
      >
        {BODY_TEXT}
      </p>
    </section>
  );
}

export default function TypeTestPage() {
  return (
    <main style={{ background: "#fff", minHeight: "100vh" }}>
      <style>{`
        @font-face {
          font-family: "Thunder Test";
          src: url("/fonts-test/Thunder-BlackLC.otf") format("opentype");
          font-weight: 900; font-display: swap;
        }
        @font-face {
          font-family: "Thunder Test";
          src: url("/fonts-test/Thunder-BoldLC.otf") format("opentype");
          font-weight: 700; font-display: swap;
        }
        @font-face {
          font-family: "Konstant Test";
          src: url("/fonts-test/neuekonstantgrotesk-book.otf") format("opentype");
          font-weight: 400; font-display: swap;
        }
      `}</style>

      <header style={{ padding: "40px 48px 8px" }}>
        <h1 style={{ margin: 0, fontFamily: "monospace", fontSize: 15 }}>
          Specimen-Vergleich — „STRATEGY. BRANDING“ (Referenz 08.07.)
        </h1>
      </header>

      {/* 1 · Thunder — liegt bereits in assets/fonts/alternativen */}
      <Block
        label="1 · THUNDER BLACK (LC)"
        note="liegt lokal vor; Lizenz prüfen (Zetafonts) · Body: Inter"
        headFamily="'Thunder Test', sans-serif"
        bodyFamily={inter.style.fontFamily}
        tracking="0.005em"
      />

      {/* 2 · Anton + Inter — komplett frei (Google Fonts) */}
      <Block
        label="2 · ANTON"
        note="Google Fonts, frei · Body: Inter (frei)"
        headFamily={anton.style.fontFamily}
        bodyFamily={inter.style.fontFamily}
        headWeight={400}
      />

      {/* 3 · Helvetica Neue Condensed Black — macOS-Systemfont (nur Preview!) */}
      <Block
        label="3 · HELVETICA NEUE CONDENSED BLACK"
        note="rendert hier über deinen Mac-Systemfont; fürs Web wäre Lizenz nötig · Body: Helvetica Neue"
        headFamily="'HelveticaNeue-CondensedBlack', 'Helvetica Neue', sans-serif"
        bodyFamily="'Helvetica Neue', Helvetica, sans-serif"
      />

      {/* 4 · Sharp Grotesk — unser Brand-Font (nur Book/Medium vorhanden) */}
      <Block
        label="4 · SHARP GROTESK MEDIUM (Brand-Bestand)"
        note="unser vorhandener Stack — kein Black/Condensed-Schnitt lizenziert · Body: Sharp Book"
        headFamily="var(--font-sharp), sans-serif"
        bodyFamily="var(--font-sharp), sans-serif"
        headWeight={500}
      />

      {/* 5 · Bonus: Thunder + Neue Konstant Grotesk als Body */}
      <Block
        label="5 · THUNDER BLACK + NEUE KONSTANT GROTESK"
        note="beide aus assets/fonts/alternativen · Lizenzen prüfen"
        headFamily="'Thunder Test', sans-serif"
        bodyFamily="'Konstant Test', sans-serif"
        tracking="0.005em"
      />
    </main>
  );
}
