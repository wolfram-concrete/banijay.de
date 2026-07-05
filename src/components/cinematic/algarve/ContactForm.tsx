"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// section_contact-a — 1:1 nach dem Algarve-Template (contact-1) adaptiert und in die
// Banijay-Welt übersetzt (Sharp Grotesk, Paper/Ink). Layout: links kontextbezogene
// Headline + kurze Copy, rechts das Formular (Name/Unternehmen · E-Mail/Telefon als
// Halbspalten, Anliegen-Select, Nachricht, Outline-Submit mit Invert-Hover). Felder
// im Template-Stil: nur untere Kante, transparenter Grund, Label darüber. MOBIL wird
// sauber gestapelt (Headline oben, Formular darunter) — der frühere Inline-Grid-
// Override, der das Stapeln verhinderte, ist entfernt. Dies ist der MASTER für alle
// Formular-Sections (Career/About/Companies …). Fadet + Wort-Parallax beim Scroll-In.

const SHARP = "var(--font-sharp), sans-serif";

const FIELD =
  "w-full mb-0 pt-[0.56vw] pb-[0.56vw] pr-[1.67vw] pl-0 border-0 border-b border-[rgba(0,0,0,0.16)] bg-transparent text-[#0e0d0b] leading-[135%] font-normal outline-none transition-colors focus:border-[#0e0d0b] placeholder:text-[rgba(0,0,0,0.32)] max-[991px]:text-[2.286vw] max-[767px]:text-[3.6vw] max-[767px]:pt-[2.4vw] max-[767px]:pb-[2.4vw] max-[767px]:pr-[5.33vw]";
const INPUT = `${FIELD} h-[3.33vw] text-[1.39vw] max-[991px]:h-[5.714vw] max-[767px]:h-[9.6vw]`;
const TEXTAREA = `${FIELD} h-[8.33vw] resize-none text-[1.39vw] max-[767px]:h-[30vw]`;
const LABEL =
  "uppercase font-bold tracking-[0.052vw] text-[rgba(0,0,0,0.64)] text-[1vw] leading-[100%] max-[991px]:text-[1.4vw] max-[767px]:text-[3vw]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-[0.83vw] max-[767px]:gap-[2vw]">
      <div className={LABEL}>{label}</div>
      {children}
    </div>
  );
}

function SubmitButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="submit"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ fontFamily: SHARP }}
      className={`cursor-pointer rounded-[2.22vw] border border-[#0e0d0b] px-[1.53vw] py-[0.83vw] text-[1.15vw] font-medium leading-[110%] transition-colors duration-300 max-[767px]:rounded-[8.53vw] max-[767px]:px-[7vw] max-[767px]:py-[3.6vw] max-[767px]:text-[3.8vw] ${
        hovered ? "bg-[#0e0d0b] text-[#f8f7f3]" : "bg-[#f8f7f3] text-[#0e0d0b]"
      }`}
    >
      Nachricht senden
    </button>
  );
}

export function AlgarveContactForm({
  headline,
  copy,
}: {
  /** Seitenkontextbezogene Überschrift. */
  headline: string;
  /** Kurze begleitende Copy. */
  copy?: string;
}) {
  const root = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      // Headline Wort-für-Wort-Parallax (scroll-gekoppelt) — bringt Bewegung rein.
      gsap.from("[data-cf-word]", {
        opacity: 0,
        yPercent: 60,
        ease: "none",
        stagger: { amount: 0.7, from: "start" },
        scrollTrigger: { trigger: root.current, start: "top 82%", end: "top 42%", scrub: 1 },
      });
      // Copy + Formular ruhig einblenden.
      gsap.from("[data-cf-fade]", {
        opacity: 0,
        y: 28,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 74%", once: true },
      });
    },
    { scope: root },
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <section ref={root} style={{ fontFamily: SHARP }} className="bg-[#f8f7f3] py-[8.33vw] max-[767px]:py-[20vw]">
      {/* Voll-breiter Container (px-[2vw]) wie im Original-Template — KEIN maxWidth-Cap.
          Der Cap deckelte die Breite, während die vw-Schriften mit dem Viewport weiter
          wuchsen → auf breiten Screens zu schmale Felder + abgeschnittene Placeholder. */}
      <div className="px-[2vw] max-[767px]:px-[5vw]">
        {/* 2-Spalten-Grid (Template): links Headline/Copy, rechts Formular.
            Mobil (default) EINSPALTIG gestapelt; ab md 5fr/7fr nebeneinander. */}
        <div className="grid grid-cols-1 gap-y-[11vw] md:grid-cols-[5fr_7fr] md:items-start md:gap-x-[9.17vw] md:gap-y-0">
          {/* Links: kontextbezogene Headline + kurze Copy */}
          <div className="flex flex-col items-start md:sticky" style={{ top: "8rem", gap: "1.67vw" }}>
            <h2
              className="m-0 flex flex-wrap max-[767px]:!text-[9vw]"
              style={{ fontFamily: SHARP, fontSize: "3.33vw", lineHeight: "108%", fontWeight: 500, letterSpacing: "-0.1vw", color: "#0e0d0b", columnGap: "0.4ch" }}
            >
              {headline.split(" ").map((w, i) => (
                <span key={i} data-cf-word className="inline-block" style={{ willChange: "transform, opacity" }}>
                  {w}
                </span>
              ))}
            </h2>
            {copy && (
              <p
                data-cf-fade
                className="m-0 max-w-[30vw] max-[767px]:!mt-[2vw] max-[767px]:!max-w-full max-[767px]:!text-[4.4vw]"
                style={{ fontFamily: SHARP, fontSize: "1.39vw", lineHeight: "142%", color: "rgba(0,0,0,0.58)" }}
              >
                {copy}
              </p>
            )}
          </div>

          {/* Rechts: Formular */}
          <div data-cf-fade className="w-full">
            {sent ? (
              <div
                role="status"
                className="rounded-[1.11vw] bg-[#0e0d0b] p-6 text-center text-[#f8f7f3] max-[767px]:rounded-[4.27vw] max-[767px]:p-[6vw] max-[767px]:text-[4vw]"
              >
                Danke! Deine Nachricht ist eingegangen — wir melden uns.
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col items-start gap-[2.22vw] max-[767px]:gap-[6vw]">
                {/* Reihe 1: Name + Unternehmen (Halbspalten, mobil gestapelt) */}
                <div className="grid w-full grid-cols-2 gap-[1vw] max-[767px]:!grid-cols-1 max-[767px]:!gap-[6vw]">
                  <Field label="Name">
                    <input className={INPUT} style={{ fontFamily: SHARP }} name="Name" type="text" placeholder="Dein Name" maxLength={256} />
                  </Field>
                  <Field label="Unternehmen">
                    <input className={INPUT} style={{ fontFamily: SHARP }} name="Company" type="text" placeholder="Firma" maxLength={256} />
                  </Field>
                </div>

                {/* Reihe 2: E-Mail + Telefon (Halbspalten, mobil gestapelt) */}
                <div className="grid w-full grid-cols-2 gap-[1vw] max-[767px]:!grid-cols-1 max-[767px]:!gap-[6vw]">
                  <Field label="E-Mail">
                    <input className={INPUT} style={{ fontFamily: SHARP }} name="Email" type="email" placeholder="Deine geschäftliche E-Mail" maxLength={256} required />
                  </Field>
                  <Field label="Telefon">
                    <input className={INPUT} style={{ fontFamily: SHARP }} name="Phone" type="tel" placeholder="Telefonnummer" maxLength={256} />
                  </Field>
                </div>

                {/* Anliegen (3 Optionen) */}
                <Field label="Worum geht’s?">
                  <select className={`${INPUT} cursor-pointer`} style={{ fontFamily: SHARP }} name="Topic" defaultValue="">
                    <option value="">Bitte wählen …</option>
                    <option value="format">Formatidee / Produktion</option>
                    <option value="partner">Partnerschaft</option>
                    <option value="other">Sonstiges</option>
                  </select>
                </Field>

                {/* Nachricht */}
                <Field label="Deine Nachricht">
                  <textarea className={TEXTAREA} style={{ fontFamily: SHARP }} name="Message" placeholder="Erzähl uns mehr" maxLength={5000} />
                </Field>

                {/* Submit */}
                <div className="mt-[0.5vw] flex w-full flex-col items-start">
                  <SubmitButton />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
