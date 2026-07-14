"use client";

import { useEffect, useState } from "react";

// BACK-TO-TOP (Wolfram 14.07.): subtiles Widget unten rechts, das ERST nach dem
// Scroll durch ~3 Sektionen (≈ 2.4 Viewport-Höhen) einblendet. Klick scrollt
// weich nach oben (Lenis, sonst native). 8px-Kante (Heike-Regel), dezenter
// Glas-Chip, der auf Hover ins Magenta kippt.
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 2.4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const toTop = () => {
    const lenis = (
      window as unknown as { __lenis?: { scrollTo?: (t: number, o?: Record<string, unknown>) => void } }
    ).__lenis;
    if (lenis?.scrollTo) lenis.scrollTo(0, { duration: 1.1 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Nach oben"
      className="back-to-top fixed bottom-[2vw] right-[2vw] z-[90] flex h-11 w-11 items-center justify-center max-[767px]:!bottom-[5vw] max-[767px]:!right-[5vw]"
      style={{
        borderRadius: "8px",
        background: "rgba(14,13,11,0.5)",
        border: "1px solid rgba(248,247,243,0.18)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        color: "#f8f7f3",
        opacity: show ? 0.72 : 0,
        transform: show ? "translateY(0)" : "translateY(14px)",
        pointerEvents: show ? "auto" : "none",
        transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1), background 0.25s ease, color 0.25s ease",
      }}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
