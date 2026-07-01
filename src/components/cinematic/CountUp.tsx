"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// Zählt eine Zahl beim Scroll-in hoch. Versteht Werte wie "1.300", "25+",
// "4 Milliarden", "250 Mio. €" — Zahlteil wird animiert, Rest bleibt Suffix.

function parse(value: string): { target: number; suffix: string } {
  const m = value.match(/^([\d.]+)(.*)$/);
  if (!m) return { target: 0, suffix: value };
  return { target: parseInt(m[1].replace(/\./g, ""), 10), suffix: m[2] };
}

export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const { target, suffix } = parse(value);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf = requestAnimationFrame(() => setN(target));
      return () => cancelAnimationFrame(raf);
    }
    const duration = 1400;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref} className={className}>
      {n.toLocaleString("de-DE")}
      {suffix}
    </span>
  );
}
