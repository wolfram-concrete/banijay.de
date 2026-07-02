"use client";

import { useEffect, useRef, useState } from "react";

// section_contact-a (Algarve/ByQ adaptiert): Kontakt-Sektion über dem Footer.
// Bewusst reduziert — Adresse/E-Mail/Telefon stehen im Footer, hier NUR eine
// seitenkontextbezogene Headline, eine kurze Copy und das Formular. An das
// Banijay-Design angepasst (Sharp-Grotesk, Paper/Ink). Fadet beim Scroll-In ein.
//
// Hinweis: client-seitige Bestätigung nach Absenden. TODO: Backend/CRM anbinden.

const SHARP = "var(--font-sharp), sans-serif";

const FIELD =
  "w-full mb-0 pt-[0.56vw] pb-[0.56vw] pr-[1.67vw] pl-0 border-0 border-b border-[rgba(0,0,0,0.16)] bg-transparent text-[#0e0d0b] leading-[135%] font-normal outline-none transition-colors focus:border-[#0e0d0b] placeholder:text-[rgba(0,0,0,0.32)] max-[991px]:text-[2.286vw] max-[767px]:text-[3.429vw] max-[767px]:pt-[2.13vw] max-[767px]:pb-[2.13vw] max-[767px]:pr-[5.33vw]";
const INPUT = `${FIELD} h-[3.33vw] text-[1.39vw] max-[991px]:h-[5.714vw] max-[767px]:h-[8.571vw] max-[479px]:h-[11.429vw]`;
const TEXTAREA = `${FIELD} h-[8.33vw] resize-none text-[1.39vw] max-[767px]:h-[20vh] max-[479px]:h-[7vh]`;
const LABEL =
  "uppercase font-bold tracking-[0.052vw] text-[#0e0d0b] text-[1vw] leading-[100%] max-[991px]:text-[1.4vw] max-[767px]:text-[2.9vw] max-[479px]:text-[3vw]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-[0.83vw] max-[767px]:gap-[1.429vw]">
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
      className={`cursor-pointer rounded-[2.22vw] border border-[#0e0d0b] px-[1.39vw] py-[0.83vw] text-[1.15vw] font-normal leading-[110%] transition-colors duration-300 max-[767px]:rounded-[8.53vw] max-[767px]:px-[4.27vw] max-[767px]:py-[2.13vw] max-[767px]:text-[2.4vw] ${
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
  /** Seitenkontextbezogene Überschrift (wie zuvor im CTA der jeweiligen Seite). */
  headline: string;
  /** Kurze begleitende Copy. */
  copy?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <section
      ref={sectionRef}
      style={{ fontFamily: SHARP, opacity: visible ? 1 : 0 }}
      className="bg-[#f8f7f3] py-[8.33vw] transition-opacity duration-700 ease-out max-[767px]:py-[21.33vw]"
    >
      <div className="px-[2vw] max-[767px]:px-[3vw]">
        <div
          className="grid items-start max-[991px]:grid-cols-1 max-[991px]:gap-[6vw]"
          style={{ gridTemplateColumns: "5fr 7fr", columnGap: "9.17vw" }}
        >
          {/* Links: kontextbezogene Headline + kurze Copy */}
          <div className="flex flex-col items-start md:sticky" style={{ top: "8rem", gap: "1.67vw" }}>
            <h2
              className="m-0 max-[767px]:!text-[8vw]"
              style={{ fontFamily: SHARP, fontSize: "3.33vw", lineHeight: "112%", fontWeight: 500, letterSpacing: "-0.094vw", color: "#0e0d0b" }}
            >
              {headline}
            </h2>
            {copy && (
              <p
                className="m-0 max-[767px]:!text-[4vw]"
                style={{ fontFamily: SHARP, fontSize: "1.39vw", lineHeight: "140%", color: "rgba(0,0,0,0.64)", maxWidth: "26vw" }}
              >
                {copy}
              </p>
            )}
          </div>

          {/* Rechts: Formular */}
          <div className="w-full">
            {sent ? (
              <div
                role="status"
                className="rounded-[1.11vw] bg-[#0e0d0b] p-6 text-center text-[#f8f7f3] max-[767px]:rounded-[4.27vw]"
              >
                Danke! Deine Nachricht ist eingegangen — wir melden uns.
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="flex flex-col items-start gap-[2.22vw] max-[767px]:gap-[4vw] max-[479px]:gap-[4.571vw]"
              >
                {/* Reihe 1: Name + Unternehmen */}
                <div className="grid w-full grid-cols-2 gap-[1vw] max-[479px]:grid-cols-1 max-[479px]:gap-[4.571vw] max-[767px]:gap-[1vw]">
                  <Field label="Name">
                    <input className={INPUT} style={{ fontFamily: SHARP }} name="Name" type="text" placeholder="Dein Name" maxLength={256} />
                  </Field>
                  <Field label="Unternehmen">
                    <input className={INPUT} style={{ fontFamily: SHARP }} name="Company" type="text" placeholder="Firma" maxLength={256} />
                  </Field>
                </div>

                {/* Reihe 2: E-Mail + Telefon */}
                <div className="grid w-full grid-cols-2 gap-[0.571vw] max-[479px]:grid-cols-1 max-[479px]:gap-[4.571vw] max-[767px]:gap-[2.286vw]">
                  <Field label="E-Mail">
                    <input className={INPUT} style={{ fontFamily: SHARP }} name="Email" type="email" placeholder="Deine geschäftliche E-Mail" maxLength={256} required />
                  </Field>
                  <Field label="Telefon">
                    <input className={INPUT} style={{ fontFamily: SHARP }} name="Phone" type="tel" placeholder="Telefonnummer" maxLength={256} />
                  </Field>
                </div>

                {/* Anliegen */}
                <Field label="Worum geht’s?">
                  <select className={`${INPUT} cursor-pointer`} style={{ fontFamily: SHARP }} name="Topic" defaultValue="">
                    <option value="">Bitte wählen …</option>
                    <option value="format">Formatidee / Produktion</option>
                    <option value="press">Presse &amp; Kommunikation</option>
                    <option value="talent">Talent &amp; Booking</option>
                    <option value="partner">Partnerschaft</option>
                    <option value="other">Sonstiges</option>
                  </select>
                </Field>

                {/* Nachricht */}
                <Field label="Deine Nachricht">
                  <textarea className={TEXTAREA} style={{ fontFamily: SHARP }} name="Message" placeholder="Erzähl uns mehr" maxLength={5000} />
                </Field>

                {/* Submit */}
                <div className="-mt-[10px] flex w-full flex-col items-start">
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
