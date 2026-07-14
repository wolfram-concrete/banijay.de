"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

// Magnetischer CTA (Anti-Gravity-Stack): folgt dem Cursor per Spring-Physik.
export function MagneticButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.4);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.4);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <MotionLink
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-[8px] px-7 text-sm font-medium tracking-wide transition-colors",
        variant === "primary"
          ? "bg-[var(--bj-coral)] text-white hover:bg-[#ff5d78]"
          : "border border-white/25 text-white hover:bg-white/10",
      )}
    >
      {children}
    </MotionLink>
  );
}
