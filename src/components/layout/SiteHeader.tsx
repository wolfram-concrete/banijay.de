"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, LEGAL_ITEMS, CONTACT, SOCIAL } from "@/data/site";
import { NEWS } from "@/data/news";

// Brand-Glyphen als Inline-SVG (lucide führt keine Marken-Icons mehr).
function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function IconLinkedin() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

// News-Slider im Overlay: horizontale Artikel-Gallery, die von links einschiebt.
// Öffnet unterhalb von „News"; die darunterliegenden Nav-Punkte rutschen runter.
function NewsSlider({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const SHARP = "var(--font-sharp), sans-serif";
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };
  return (
    <div
      className={`overflow-hidden ${open ? "w-[62vw] max-[767px]:w-[92vw]" : "w-0"}`}
      style={{
        // Spring-/„magnetisches" Easing → About/Career sliden physikalischer.
        maxHeight: open ? "48vw" : 0,
        opacity: open ? 1 : 0,
        marginTop: open ? "1.5vw" : 0,
        transition:
          "max-height 0.72s cubic-bezier(0.34,1.4,0.5,1), opacity 0.45s ease, margin-top 0.55s cubic-bezier(0.34,1.4,0.5,1)",
      }}
    >
      {/* Native Scrollbar aus; horizontale Karten-Reihe */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ gap: "1vw", paddingBottom: "1vw" }}
      >
        {NEWS.map((n, i) => (
          <Link
            key={n.slug}
            href={`/news/${n.slug}`}
            onClick={onNavigate}
            className="group shrink-0 text-left no-underline max-[767px]:!w-[60vw]"
            style={{
              width: "17vw",
              color: INK,
              transform: open ? "translateX(0)" : "translateX(-28px)",
              opacity: open ? 1 : 0,
              transition: `transform 0.6s cubic-bezier(0.22,1,0.36,1) ${120 + i * 55}ms, opacity 0.5s ease ${120 + i * 55}ms`,
            }}
          >
            <div className="overflow-clip max-[767px]:!h-[40vw]" style={{ borderRadius: "0.83vw", height: "11vw" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={n.img}
                alt={n.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
            </div>
            <div className="mt-[0.7vw] flex flex-col max-[767px]:mt-2" style={{ gap: "0.4vw" }}>
              <span
                className="uppercase max-[767px]:!text-[2.6vw]"
                style={{ fontFamily: SHARP, fontSize: "0.72vw", fontWeight: 700, letterSpacing: "0.08em", opacity: 0.6 }}
              >
                {n.category} · {n.date}
              </span>
              <span
                className="max-[767px]:!text-[3.6vw]"
                style={{ fontFamily: SHARP, fontSize: "1vw", fontWeight: 500, lineHeight: "116%" }}
              >
                {n.title}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Feine Fortschritts-Leiste statt Scrollbar — schwarzer Strich wächst nach rechts */}
      <div style={{ marginTop: "0.6vw", height: "2px", width: "100%", background: "rgba(0,0,0,0.14)" }}>
        <div
          style={{
            height: "100%",
            background: INK,
            width: `${Math.max(8, progress * 100)}%`,
            transition: "width 0.12s linear",
          }}
        />
      </div>
    </div>
  );
}

// Navigation — an der Smiling-Agency-/Algarve-Logik: transparente Fixed-Bar mit
// Logo links + einem „MENU"-Pill rechts. Klick öffnet ein Fullscreen-Overlay
// (Höhe 0 → 100vh) mit großen, gestaffelt einfahrenden Links + Info-Block.
// Farben in Banijay-Coral, Logo scroll-/routenabhängig weiß bzw. magenta.

const CORAL = "#ff4370";
const INK = "#0e0d0b";
const MAGENTA = "#ff4370";

// Seiten-Label, das beim Scrollen unter „MENU" einrastet (Orientierung).
const PAGE_LABEL: Record<string, string> = {
  // „/" (Home) absichtlich NICHT gelistet — das eingerastete Label soll nur auf
  // Unterseiten als Orientierung erscheinen, nicht auf der Startseite.
  "/companies": "Companies",
  "/about": "About",
  "/career": "Career",
  "/news": "News",
  "/contact": "Contact",
  "/impressum": "Impressum",
  "/datenschutz": "Datenschutz",
};
const labelForPath = (path: string): string | undefined =>
  PAGE_LABEL[path] ?? (path.startsWith("/news/") ? "News" : undefined);

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [linksVisible, setLinksVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [onMagenta, setOnMagenta] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false); // News-Slider im Overlay
  const [scrolled, setScrolled] = useState(false); // steuert das eingerastete Seiten-Label
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const pageLabel = labelForPath(pathname);

  // Seiten-Label rastet ein — auf Subpages mit gepinntem Hero ERST am Ende der
  // Hero-Bühne (sonst überlagern sich weißes Hero-Label und rotes Docked-Label →
  // Dopplung). Ohne Hero-Bühne (z. B. News-Liste): schon nach kurzem Scrollen.
  useEffect(() => {
    const onScroll = () => {
      const stage = document.querySelector("[data-hero-stage]") as HTMLElement | null;
      const dockAt = stage
        ? stage.offsetTop + stage.offsetHeight - window.innerHeight * 1.15
        : 120;
      setScrolled(window.scrollY > dockAt);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

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
    const resetTimer = window.setTimeout(() => {
      setLinksVisible(false);
      setInfoVisible(false);
      setNewsOpen(false);
    }, 0);
    return () => clearTimeout(resetTimer);
  }, [open]);

  // Bei Routenwechsel schließen.
  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    const closeTimer = window.setTimeout(() => setOpen(false), 0);
    return () => clearTimeout(closeTimer);
  }, [pathname]);

  // Logo & Menu invertieren, sobald eine magentafarbene Section direkt unter der
  // Nav liegt (Detektions-Linie auf Logo-Höhe via IntersectionObserver).
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-theme="magenta"]'));
    if (!sections.length) {
      const themeTimer = window.setTimeout(() => setOnMagenta(false), 0);
      return () => clearTimeout(themeTimer);
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

  // Im offenen Coral-Overlay und auf Magenta-Flächen läuft das Logo schwarz.
  const blackLogo = open || onMagenta;

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
              src="/brand/banijay-logo.png"
              alt="Banijay Germany"
              className="h-[2.1rem] w-auto origin-left transition-[filter] duration-300"
              style={{ filter: blackLogo ? "brightness(0)" : undefined }}
            />
          </Link>

          <div className="relative flex flex-col items-end">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              className="appearance-none border-0 bg-transparent uppercase transition-colors"
              style={{
                // Kein Pill mehr — reine Wortmarke rechtsbündig, in Magenta wie das Logo.
                // Über Magenta-Flächen bzw. im offenen Overlay invertiert sie auf Ink.
                fontFamily: "var(--font-sharp), sans-serif",
                fontWeight: 700,
                fontSize: "1.2rem",
                lineHeight: 1,
                letterSpacing: "0.02em",
                color: open || onMagenta ? INK : MAGENTA,
                boxShadow: "none",
                padding: 0,
              }}
            >
              {open ? "Close" : "MENU"}
            </button>

            {/* Eingerastetes Seiten-Label — gleiche Wortmarke, regular, rechtsbündig
                unter MENU. Erscheint beim Scrollen als Orientierung. */}
            {pageLabel && !open && (
              <span
                aria-hidden
                className="pointer-events-none absolute right-0 top-full uppercase transition-all duration-[450ms] ease-out"
                style={{
                  marginTop: "0.4rem",
                  transformOrigin: "top right",
                  fontFamily: "var(--font-sharp), sans-serif",
                  fontWeight: 400,
                  fontSize: "0.9rem",
                  lineHeight: 1,
                  letterSpacing: "0.06em",
                  color: onMagenta ? INK : MAGENTA,
                  whiteSpace: "nowrap",
                  // Das weiße Hero-Label „übergibt" hierher: es rastet mit
                  // Shift + Herunterskalieren als kleine rote Wortmarke ein.
                  opacity: scrolled ? 1 : 0,
                  transform: scrolled ? "translateY(0) scale(1)" : "translateY(-0.6rem) scale(1.6)",
                }}
              >
                {pageLabel}
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Fullscreen-Overlay */}
      <div
        className="fixed inset-0 z-[98] overflow-hidden transition-[height] duration-500 ease-in-out"
        style={{ height: open ? "100vh" : 0, background: CORAL }}
      >
        <div style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
          <div className="flex min-h-screen w-full flex-row-reverse items-start justify-between overflow-hidden pb-[3vw] pt-[9vw] max-[767px]:flex-col max-[767px]:gap-14 max-[767px]:overflow-auto max-[767px]:pb-20 max-[767px]:pt-28">
            {/* Große Links — rechtsbündig nach rechts */}
            <nav
              className="flex flex-col items-end text-right max-[767px]:items-start max-[767px]:text-left"
              style={{ gap: "0.4vh", color: INK }}
            >
              {NAV_ITEMS.map((item, i) => {
                const labelText = item.label === "Banijay" ? "Home" : item.label;
                const inner = (
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
                    {labelText}
                  </span>
                );

                // News verlässt das Overlay NICHT — Klick klappt den Artikel-Slider
                // auf, About/Career/Kontakt rutschen dabei nach unten.
                if (item.href === "/news") {
                  return (
                    <div key={item.href} className="flex flex-col items-end max-[767px]:items-start">
                      <button
                        type="button"
                        onClick={() => setNewsOpen((v) => !v)}
                        aria-expanded={newsOpen}
                        className="block overflow-hidden transition-colors duration-300 hover:text-white"
                        style={{ color: newsOpen ? "#fff" : undefined }}
                      >
                        {inner}
                      </button>
                      <NewsSlider open={newsOpen} onNavigate={() => setOpen(false)} />
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block overflow-hidden transition-colors duration-300 hover:text-white"
                  >
                    {inner}
                  </Link>
                );
              })}
            </nav>

            {/* Info-Block — linksbündig; Spotify-Widget rechts daneben, unten bündig.
                Bei offenem News-Slider ausgeblendet, damit dieser Platz bekommt. */}
            <div
              className="flex flex-col items-start gap-10 self-end transition-opacity duration-500 max-[767px]:self-start"
              style={{ opacity: infoVisible ? 1 : 0, color: INK }}
            >
              {/* Spotify-Widget (WOLTER TALKS) — linksbündig oberhalb von „Folgen" */}
              <iframe
                title="WOLTER TALKS auf Spotify"
                src="https://open.spotify.com/embed/show/1DNETtYd9Y197eAQ45xMdh?utm_source=generator&theme=0"
                height={352}
                frameBorder={0}
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                className="w-[20rem] max-[767px]:w-full max-[767px]:max-w-[22rem]"
                style={{ borderRadius: 12 }}
              />
              <div className="flex flex-col gap-3">
                <div className="text-xs font-bold uppercase tracking-[0.14em] opacity-50">Folgen</div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={SOCIAL.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Instagram — ${SOCIAL.instagram.handle}`}
                    className="inline-flex items-center gap-2 rounded-full border border-[#0e0d0b] bg-transparent px-5 py-2.5 text-sm font-medium text-[#0e0d0b] transition-colors hover:bg-[#0e0d0b] hover:text-white"
                    style={{ borderColor: INK }}
                  >
                    <IconInstagram />
                    Instagram
                  </a>
                  <a
                    href={SOCIAL.linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`LinkedIn — ${SOCIAL.linkedin.handle}`}
                    className="inline-flex items-center gap-2 rounded-full border border-[#0e0d0b] bg-transparent px-5 py-2.5 text-sm font-medium text-[#0e0d0b] transition-colors hover:bg-[#0e0d0b] hover:text-white"
                    style={{ borderColor: INK }}
                  >
                    <IconLinkedin />
                    LinkedIn
                  </a>
                </div>
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

        {/* Impressum / Datenschutz — subtil unten rechts */}
        <div
          className="absolute bottom-[3vh] right-[2vw] flex gap-6 transition-opacity duration-500 max-[767px]:bottom-6 max-[767px]:right-[3vw]"
          style={{ opacity: infoVisible ? 1 : 0, color: INK }}
        >
          {LEGAL_ITEMS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-xs uppercase tracking-[0.14em] opacity-50 transition-opacity hover:opacity-100"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
