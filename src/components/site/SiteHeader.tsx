"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/lib/site-data";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "glass-dark" : "bg-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between md:h-20">
        {/* Wordmark */}
        <Link href="/" className="group flex items-center gap-3" aria-label="Banijay Germany — Startseite">
          <span className="block h-3.5 w-7 rounded-full bg-magenta transition-transform duration-500 group-hover:scale-110" />
          <span className="display text-xl leading-none text-bone md:text-2xl">Banijay</span>
        </Link>

        {/* Desktop-Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-bone/70 transition-colors hover:text-bone"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-magenta px-5 py-2 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
          >
            Kontakt
          </Link>
        </nav>

        {/* Mobile-Toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center text-bone md:hidden"
          aria-label="Menü öffnen"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile-Menü */}
      {open && (
        <nav className="glass-dark border-t border-white/10 md:hidden">
          <div className="shell flex flex-col py-4">
            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="display py-2 text-3xl text-bone"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
