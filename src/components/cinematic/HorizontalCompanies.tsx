"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { getFeaturedHomeCompanies } from "@/data/companies";
import { getCompanyImage } from "@/data/companyImages";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Immersives BYQ-Modul: horizontal gepinnter Companies-Scroll.
// Vertikales Scrollen schiebt die Company-Panels horizontal durch.

export function HorizontalCompanies() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const companies = getFeaturedHomeCompanies();

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const el = track.current!;
      const distance = () => Math.max(0, el.scrollWidth - window.innerWidth);

      gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => "+=" + distance(),
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative flex h-[100svh] items-center overflow-hidden bg-background">
      <div ref={track} className="flex items-stretch gap-5 px-[4vw]" style={{ width: "max-content" }}>
        {/* Intro-Panel */}
        <div className="flex w-[80vw] shrink-0 flex-col justify-center sm:w-[46vw] lg:w-[30vw]">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">Companies</span>
          <h2 className="mt-4 text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
            Die kreativen Motoren von Banijay Germany.
          </h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">
            Produktionshäuser, Live-Einheiten, Talent-Managements, Plattformen und Services — ein
            Ökosystem, das Unterhaltung entwickelt, produziert und erlebbar macht.
          </p>
          <Link
            href="/companies"
            className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-medium text-foreground"
          >
            Alle Companies entdecken <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Company-Panels */}
        {companies.map((company) => {
          const img = getCompanyImage(company);
          return (
            <Link
              key={company.slug}
              href="/companies"
              className="group relative h-[64vh] w-[80vw] shrink-0 overflow-hidden rounded-2xl sm:w-[44vw] lg:w-[26vw]"
            >
              {img && (
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  sizes="(min-width:1024px) 26vw, (min-width:640px) 44vw, 80vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
                  {company.tier}
                </span>
                <h3 className="mt-2 text-2xl font-medium leading-tight">{company.name}</h3>
                <p className="mt-1.5 text-sm text-white/75">{company.profile}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
                  Zur Company <ArrowUpRight size={15} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
