"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { NAV_ITEMS } from "@/data/site";
import { cn } from "@/lib/utils";

// Navigation — stark an estrela.studio orientiert (visuell/interaktiv, kein
// 1:1-Copy): dunkle, glossy Glas-Pillen mit violett/pinker Lichtkante,
// segmentiert (Logo · Links · Contact), Split-Text-Hover auf den Links.
// Patterns übernommen: .n-logo / .n-links / .n-link / line-normal / line-hover
// (Split-Text), .n-toggle(-dot) fürs Mobile-Menü, sr-only-Accessibility.
// Einfahrt + Hover laufen über CSS (robust, reduced-motion-aware).

/** Ein Link mit Split-Text-Hover. Screenreader liest nur ein Label. */
function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      className="n-link text-sm"
    >
      <span aria-hidden="true" className={cn("line-normal", active ? "text-[#ff5c8a]" : "text-white/65")}>
        {label}
      </span>
      <span aria-hidden="true" className="line-hover">
        {label}
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const navMain = NAV_ITEMS.filter((i) => i.label !== "Contact");

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="nav-enter fixed inset-x-0 top-4 z-50">
      <div className="container flex items-center justify-between gap-2.5">
        {/* Logo-Pille */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          aria-label="Banijay Germany — Startseite"
          className="nav-pill n-logo flex h-14 items-center px-6"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/banijay-logo-white.png" alt="Banijay Germany" className="h-6 w-auto" />
        </Link>

        {/* Links-Pille (Desktop) */}
        <nav
          aria-label="Hauptnavigation"
          className="nav-pill n-links hidden h-14 items-center gap-9 px-8 md:flex"
        >
          {navMain.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} active={isActive(item.href)} />
          ))}
        </nav>

        {/* Contact-Pille (Desktop) */}
        <Link
          href="/contact"
          aria-current={isActive("/contact") ? "page" : undefined}
          className="nav-pill hidden h-14 items-center gap-2.5 px-6 text-white md:flex"
        >
          <span className="n-toggle-dot h-1.5 w-1.5 rounded-full bg-[#ff5c8a] shadow-[0_0_8px_rgba(255,92,138,0.9)]" />
          <span className="text-sm">Contact</span>
        </Link>

        {/* Menü-Pille (Mobile) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          className="nav-pill n-toggle flex h-14 items-center px-6 text-white md:hidden"
        >
          {open ? (
            <X size={20} />
          ) : (
            <span className="n-toggle-icon text-xl leading-none tracking-[0.2em]">•••</span>
          )}
        </button>
      </div>

      {/* Mobile-Overlay */}
      {open && (
        <div className="container mt-2.5 md:hidden">
          <nav aria-label="Hauptnavigation (mobil)" className="nav-pill flex flex-col p-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-xl px-4 py-3 text-lg transition-colors",
                  isActive(item.href)
                    ? "text-[#ff5c8a]"
                    : "text-white/70 hover:bg-white/5 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
