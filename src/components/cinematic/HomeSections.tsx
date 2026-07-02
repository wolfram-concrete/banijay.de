"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EcosystemOrbit } from "./EcosystemOrbit";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";
import { getFeaturedHomeCompanies } from "@/data/companies";
import { getCompanyImage } from "@/data/companyImages";
import { HOME } from "@/data/home";
import { homeStats } from "@/data/site";

// Schlanke Home-Sektionen (7-Sektionen-Konzeption, Editorial-Stil auf Paper):
// 03 Ökosystem · 04 Entertainment in Zahlen · 05 Featured Companies · 06 CEO.

const PAPER = "#f8f7f3";

const HEADING = {
  fontFamily: "var(--font-sharp), sans-serif",
  fontWeight: 500,
  letterSpacing: "-0.139vw",
  lineHeight: "108%",
} as const;

const eyebrow = "text-[0.8rem] font-bold uppercase tracking-[0.14em] text-[#ff4370]";

function Wrap({ children, bg = PAPER }: { children: React.ReactNode; bg?: string }) {
  return (
    <section style={{ background: bg }}>
      <div style={{ paddingLeft: "2vw", paddingRight: "2vw", paddingTop: "8vw", paddingBottom: "8vw" }}>
        {children}
      </div>
    </section>
  );
}

// ── 03 · Das Banijay-Ökosystem ─────────────────────────────────────────────
export function EcosystemSection() {
  return (
    <Wrap>
      <Reveal>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className={eyebrow}>Das Banijay-Ökosystem</p>
            <h2 className="mt-5 text-black" style={{ ...HEADING, fontSize: "clamp(2rem,4.4vw,4rem)" }}>
              {HOME.world.headline}
            </h2>
            <p className="mt-6 max-w-xl text-black/60" style={{ fontSize: "1.05rem", lineHeight: "1.6" }}>
              Banijay Germany vereint eigenständige Companies, Labels und kreative Unternehmer:innen
              unter einem gemeinsamen Dach. Jede Einheit bringt ihre eigene Spezialisierung, Kultur
              und Handschrift mit. Gemeinsam entsteht ein Entertainment-Ökosystem, das Formate
              entwickelt, produziert, vermarktet und auf unterschiedlichsten Plattformen zum
              Publikum bringt.
            </p>
          </div>
          <div className="flex justify-center">
            <EcosystemOrbit />
          </div>
        </div>
      </Reveal>
    </Wrap>
  );
}

// ── 04 · Entertainment in Zahlen ───────────────────────────────────────────
export function StatsSection() {
  const stats = homeStats();
  return (
    <Wrap>
      <Reveal>
        <div className="max-w-2xl">
          <p className={eyebrow}>Entertainment in Zahlen</p>
          <h2 className="mt-5 text-black" style={{ ...HEADING, fontSize: "clamp(2rem,4.4vw,4rem)" }}>
            Produktionskraft und Reichweite auf einen Blick.
          </h2>
          <p className="mt-6 text-black/60" style={{ fontSize: "1.05rem", lineHeight: "1.6" }}>
            Hinter der Banijay-Welt stehen tausende Menschen, zahlreiche spezialisierte Companies
            und ein internationales Netzwerk.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-14 md:grid-cols-3 lg:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label} className="border-t border-black/15 pt-5">
              <p className="text-black" style={{ ...HEADING, fontSize: "clamp(2.2rem,3.6vw,3.4rem)" }}>
                <CountUp value={s.value} />
              </p>
              <p className="mt-3 text-sm text-black/55">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Wrap>
  );
}

// ── 05 · Featured Companies ────────────────────────────────────────────────
export function CompaniesSection() {
  const companies = getFeaturedHomeCompanies().slice(0, 6);
  return (
    <Wrap>
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className={eyebrow}>Featured Companies</p>
            <h2 className="mt-5 text-black" style={{ ...HEADING, fontSize: "clamp(2rem,4.4vw,4rem)" }}>
              Viele Spezialist:innen. Ein Netzwerk.
            </h2>
            <p className="mt-6 text-black/60" style={{ fontSize: "1.05rem", lineHeight: "1.6" }}>
              Manche entwickeln große Prime-Time-Shows, andere produzieren Fiction, betreuen Talente,
              organisieren Live-Erlebnisse oder schaffen digitale Reichweiten. Eine kuratierte
              Auswahl der Banijay-Welt.
            </p>
          </div>
          <Link
            href="/companies"
            className="inline-flex items-center gap-2 rounded-full border border-black/25 px-6 py-3 text-sm text-black transition-colors hover:border-black"
          >
            Alle Companies entdecken <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((c) => {
            const img = getCompanyImage(c);
            return (
              <Link key={c.slug} href="/companies" className="group block">
                <div className="overflow-hidden rounded-xl" style={{ aspectRatio: "4 / 3", background: "#e8e6df" }}>
                  {img && (
                    <img
                      src={img.url}
                      alt={c.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  )}
                </div>
                <h3 className="mt-4 text-black" style={{ ...HEADING, fontSize: "1.35rem", letterSpacing: "-0.01em" }}>
                  {c.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-black/55">{c.profile}</p>
              </Link>
            );
          })}
        </div>
      </Reveal>
    </Wrap>
  );
}

// ── 06 · Marcus Wolter ─────────────────────────────────────────────────────
export function CeoSection() {
  return (
    <Wrap>
      <Reveal>
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="/people/marcus-wolter.jpg"
              alt="Marcus Wolter, CEO & Co-Founder Banijay Germany"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div>
            <p className={eyebrow}>Marcus Wolter</p>
            <blockquote
              className="mt-6 text-black"
              style={{ ...HEADING, fontSize: "clamp(1.8rem,3.4vw,3.2rem)", lineHeight: "1.15" }}
            >
              „{HOME.ceo.quote}“
            </blockquote>
            <div className="mt-8">
              <p className="font-medium text-black">{HOME.ceo.name}</p>
              <p className="text-sm text-black/55">{HOME.ceo.role}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </Wrap>
  );
}
