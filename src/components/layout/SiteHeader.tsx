"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, CONTACT } from "@/data/site";

// Navigation — an der Smiling-Agency-/Algarve-Logik: transparente Fixed-Bar mit
// Logo links + einem „MENU"-Pill rechts. Klick öffnet ein Fullscreen-Overlay
// (Höhe 0 → 100vh) mit großen, gestaffelt einfahrenden Links + Info-Block.
// Farben in Banijay-Coral, Logo scroll-/routenabhängig weiß bzw. magenta.

const CORAL = "#fb4b68";
const INK = "#0e0d0b";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [linksVisible, setLinksVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [onMagenta, setOnMagenta] = useState(false);
  const pathname = usePathname();

  // Overlay-Staffelung + Scroll-Lock (Lenis) beim Öffnen.
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop?: () => void; start?: () => void } }).__lenis;
    if (open) {
      lenis?.stop?.();
      const t1 = setTimeout(() => setLinksVisible(true), 60);
      const t2 = setTimeout(() => setInfoVisible(true), 300);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
    lenis?.start?.();
    setLinksVisible(false);
    setInfoVisible(false);
  }, [open]);

  // Bei Routenwechsel schließen.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Logo & Menu invertieren, sobald eine magentafarbene Section direkt unter der
  // Nav liegt (Detektions-Linie auf Logo-Höhe via IntersectionObserver).
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-theme="magenta"]'));
    if (!sections.length) {
      setOnMagenta(false);
      return;
    }
    const active = new Set<Element>();
    let io: IntersectionObserver | null = null;
    const build = () => {
      io?.disconnect();
      const line = 36; // px von oben (Logo-Mitte)
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) active.add(e.target);
            else active.delete(e.target);
          });
          setOnMagenta(active.size > 0);
        },
        { rootMargin: `-${line}px 0px ${-(window.innerHeight - line - 1)}px 0px`, threshold: 0 },
      );
      sections.forEach((s) => io!.observe(s));
    };
    build();
    window.addEventListener("resize", build);
    return () => {
      io?.disconnect();
      window.removeEventListener("resize", build);
    };
  }, [pathname]);

  // Logo bleibt magenta (auch über dem Video) — nur im offenen Coral-Overlay weiß.
  const whiteLogo = open;

  return (
    <div className="relative">
      {/* Bar */}
      <nav
        className="fixed inset-x-0 top-0 z-[99] bg-transparent"
        style={{ paddingTop: "1.5vw", paddingBottom: "1.5vw" }}
      >
        <div className="flex items-center justify-between" style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
          <Link
            href="/"
            onClick={() => {
              setOpen(false);
              // Auf der Home direkt nach oben in den Hero scrollen.
              if (pathname === "/") {
                const lenis = (
                  window as unknown as { __lenis?: { scrollTo?: (t: number, o?: Record<string, unknown>) => void } }
                ).__lenis;
                if (lenis?.scrollTo) lenis.scrollTo(0, { duration: 1 });
                else window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            aria-label="Banijay Germany — Startseite"
            className="flex items-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={whiteLogo ? "/brand/banijay-logo-white.png" : "/brand/banijay-logo.png"}
              alt="Banijay Germany"
              className="h-7 w-auto transition-[filter] duration-300"
              // Über Magenta das (magentafarbene) Logo hart auf Schwarz invertieren.
              style={{ filter: onMagenta && !open ? "brightness(0)" : undefined }}
            />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            className="px-6 py-2.5 text-center text-sm font-medium uppercase tracking-tight transition-colors"
            style={{
              // Harte linke Kante, runde rechte — wie ein Teilelement des Banijay-„b".
              borderRadius: "0 9999px 9999px 0",
              // Feste Breite → „Menu"/„Close" springen beim Wechsel nicht.
              minWidth: "6.5rem",
              // Über Magenta dunkel (INK) statt Coral, damit der Button sich abhebt.
              ...(open || onMagenta ? { background: INK, color: "#fff" } : { background: CORAL, color: "#fff" }),
            }}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {/* Fullscreen-Overlay */}
      <div
        className="fixed inset-0 z-[98] overflow-hidden transition-[height] duration-500 ease-in-out"
        style={{ height: open ? "100vh" : 0, background: CORAL }}
      >
        <div style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
          <div className="flex min-h-screen w-full items-start justify-between overflow-hidden pt-[9vw] max-[767px]:flex-col max-[767px]:gap-14 max-[767px]:overflow-auto max-[767px]:pt-28">
            {/* Große Links */}
            <nav className="flex flex-col items-start" style={{ gap: "0.4vh", color: INK }}>
              {NAV_ITEMS.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block overflow-hidden transition-colors duration-300 hover:text-white"
                >
                  <span
                    className="block uppercase"
                    style={{
                      fontFamily: "var(--font-sharp), sans-serif",
                      fontWeight: 500,
                      lineHeight: 0.95,
                      letterSpacing: "-0.02em",
                      fontSize: "clamp(2.5rem, 9.4vh, 7rem)",
                      transform: linksVisible ? "translateY(0)" : "translateY(210%)",
                      transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
                      transitionDelay: `${i * 55}ms`,
                    }}
                  >
                    {item.label === "Banijay" ? "Home" : item.label}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Info-Block */}
            <div
              className="flex flex-col items-start gap-10 pr-[5vw] transition-opacity duration-500 max-[767px]:pr-0 max-[767px]:pb-20"
              style={{ opacity: infoVisible ? 1 : 0, color: INK }}
            >
              <div className="flex flex-col gap-3">
                <div className="text-xs font-bold uppercase tracking-[0.14em] opacity-50">Folgen</div>
                <a
                  href="https://instagram.com/banijaygermany"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xl hover:underline"
                >
                  @banijaygermany
                </a>
              </div>
              <div className="flex flex-col gap-3">
                <div className="text-xs font-bold uppercase tracking-[0.14em] opacity-50">Büro</div>
                <div className="text-xl leading-relaxed">
                  {CONTACT.street}
                  <br />
                  {CONTACT.city}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="text-xs font-bold uppercase tracking-[0.14em] opacity-50">Kontakt</div>
                <a href={`mailto:${CONTACT.email}`} className="text-xl hover:underline">
                  {CONTACT.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
