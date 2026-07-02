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

    return () => {
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
