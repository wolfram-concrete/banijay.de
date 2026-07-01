"use client";

import Script from "next/script";

// Elfsight Instagram Feed — Interimslösung für @banijaygermany, solange kein
// Graph-API-Token vorliegt. Lädt die Posts über Elfsights Plattform.
// Sobald IG_TOKEN_BANIJAYGERMANY gesetzt ist, übernimmt wieder unser natives
// ReelsSlider-Modul (siehe Home-Seite).

export function ElfsightFeed({ appId }: { appId: string }) {
  return (
    <>
      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
      <div className={`elfsight-app-${appId}`} data-elfsight-app-lazy />
    </>
  );
}
