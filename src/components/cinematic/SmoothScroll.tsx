"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Globaler Smooth-Scroll (Lenis), gekoppelt an GSAP ScrollTrigger.
// Sorgt für das immersive, „schwebende" Scroll-Gefühl (drinksom-Referenz).
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    // Dev-Hook: erlaubt exaktes Positionieren aus der Preview (Lenis-eigene API).
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // INTRO-SPERRE (Wolfram 19.07.): Läuft der Preloader noch, muss Lenis GESTOPPT starten.
    // Der IntroOverlay ruft zwar window.__lenis.stop() — mountet er aber VOR dieser
    // Komponente, existiert __lenis dort noch nicht (No-Op) und das frische Lenis lief
    // munter weiter: man konnte während des Intros scrollen und die Seite ratterte im
    // Hintergrund an die Zielposition. Darum hier das data-intro-Flag lesen und erst auf
    // „banijay:introdone" wieder freigeben.
    const introActive = document.documentElement.dataset.intro === "1";
    if (introActive) lenis.stop();
    const onIntroDone = () => {
      lenis.scrollTo(0, { immediate: true });
      lenis.start();
    };
    window.addEventListener("banijay:introdone", onIntroDone);

    // Expliziter, SYNCHRONER ScrollTrigger.refresh() bei Breiten-Resize (Wolfram 17.07.).
    // Grund: mehrere Module sind gepinnt; beim Pinnen fixiert ScrollTrigger Breite/Position
    // des Elements auf die Messung zum Pin-Zeitpunkt. Ändert sich danach die Viewport-
    // BREITE (Preview Desktop↔Mobile umschalten, Geräte-Rotation), bleibt der Pin auf der
    // alten Breite stehen → die Section erscheint seitlich eingezogen (Rahmen links/rechts).
    // ScrollTriggers eigener Resize-Handler refresht zwar auch, aber deferred über einen
    // rAF-Tick — und im eingeklappten/inaktiven Tab friert rAF ein, sodass der Refresh nie
    // läuft. Ein direkter synchroner refresh() umgeht das. Nur auf BREITEN-Änderung, nicht
    // auf jede Höhen-Änderung (mobile Adressleiste ein/aus), damit es nicht bei jedem Scroll
    // feuert. Debounced.
    let letzteBreite = window.innerWidth;
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      if (window.innerWidth === letzteBreite) return; // reine Höhenänderung ignorieren
      letzteBreite = window.innerWidth;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("banijay:introdone", onIntroDone);
      clearTimeout(resizeTimer);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  // Bei jedem Routenwechsel zuverlässig an den Seitenanfang (Artikel-Header) —
  // Lenis behält sonst seine interne Scrollposition und der Next-Scroll-Reset
  // greift nicht. Nach dem Paint ausführen, damit die neue Seite gemountet ist.
  useEffect(() => {
    const l = (window as unknown as { __lenis?: Lenis }).__lenis;
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      l?.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    });
  }, [pathname]);

  return null;
}
