"use client";

// Instagram-Feed @banijaygermany über ein von Banijay (Linda, 22.07.) eingerichtetes
// Elfsight-Widget. Der Token/die Meta-Anbindung liegt in Elfsight — hier wird nur das
// Widget als iframe (`<id>.elf.site`, exakt Lindas Embed) eingebettet. NICHT die
// platform.js-App-Variante: Lindas ID ist eine Share-/iframe-ID, kein App-Widget
// (`elfsight-app-<id>` liefert damit WIDGET_NOT_FOUND). Eigene „#BanijayGermany"-Section.

const ELF_APP = "d46ee32f1dd44015b2404ba3940c497a";
const SHARP = "var(--font-sharp), sans-serif";

export function ElfsightFeed({
  appId = ELF_APP,
  headline = "#BanijayGermany",
  subline = "Neuigkeiten, Menschen und Momente — direkt aus unseren Kanälen.",
}: {
  appId?: string;
  headline?: string;
  subline?: string;
}) {
  return (
    <section className="relative w-full overflow-clip" style={{ background: "transparent" }}>
      <div className="mx-auto w-full" style={{ maxWidth: "1680px", padding: "clamp(3rem, 7vw, 7rem) 2vw clamp(3rem, 6vw, 6rem)" }}>
        {headline ? (
          <h2 className="m-0 uppercase text-[#f8f7f3]" style={{ fontFamily: SHARP, fontWeight: 500, fontSize: "clamp(2rem, 4.4vw, 4.6rem)", letterSpacing: "-0.03em", lineHeight: 1 }}>
            {headline}
          </h2>
        ) : null}
        {subline ? (
          <p className="mt-3 max-w-[46rem]" style={{ color: "rgba(248,247,243,0.7)", fontSize: "clamp(0.95rem, 1.1vw, 1.15rem)", lineHeight: 1.4 }}>
            {subline}
          </p>
        ) : null}

        {/* Elfsight-Widget als iframe (Lindas Embed). Fixe Höhe (das Share-iframe skaliert
            nicht selbst) — mobil höher, da der Grid dort auf weniger Spalten umbricht. */}
        <div className="mt-[clamp(1.6rem,3vw,2.6rem)]">
          <iframe
            src={`https://${appId}.elf.site`}
            title="Instagram — @banijaygermany"
            loading="lazy"
            className="h-[640px] w-full border-none max-[767px]:h-[760px]"
          />
        </div>
      </div>
    </section>
  );
}
