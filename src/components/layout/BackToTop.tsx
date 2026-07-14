"use client";

import { useEffect, useState } from "react";

// BACK-TO-TOP (Wolfram 14.07.): subtiles Widget unten rechts, das ERST nach dem
// Scroll durch ~3 Sektionen (≈ 2.4 Viewport-Höhen) einblendet. Klick scrollt
// weich nach oben (Lenis, sonst native). 8px-Kante (Heike-Regel), dezenter
// Glas-Chip. HOVER (14.07.): kippt ins Magenta, hebt sich leicht an, Pfeil rückt
// nach oben — als klare Klick-Affordanz (inline-Styles → via Hover-State).
export function BackToTop() {
  const [show, setShow] = useState(false);
  const [hover, setHover] = useState(false);

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

  const isHover = hover && show;

  return (
    <button
      type="button"
      onClick={toTop}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label="Nach oben"
      className="back-to-top fixed bottom-[2vw] right-[2vw] z-[90] flex h-11 w-11 items-center justify-center max-[767px]:!bottom-[5vw] max-[767px]:!right-[5vw]"
      style={{
        borderRadius: "8px",
        background: isHover ? "#ff4370" : "rgba(14,13,11,0.5)",
        border: isHover ? "1px solid #ff4370" : "1px solid rgba(248,247,243,0.18)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        color: isHover ? "#0e0d0b" : "#f8f7f3",
        opacity: show ? (isHover ? 1 : 0.72) : 0,
        transform: show ? (isHover ? "translateY(-3px)" : "translateY(0)") : "translateY(14px)",
        boxShadow: isHover ? "0 12px 28px -8px rgba(255,67,112,0.6)" : "none",
        pointerEvents: show ? "auto" : "none",
        transition:
          "opacity 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1), background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        style={{ transform: isHover ? "translateY(-2px)" : "none", transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)" }}
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
