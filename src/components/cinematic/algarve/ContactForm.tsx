"use client";

import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLocale } from "@/i18n/config";
import { copyFor } from "@/i18n/copy";

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

// Felder als reine UNTERSTRICH-LINIEN (Wolfram 14.07.): keine Kästen mehr —
// transparenter Grund, nur eine dünne weiße Unterkante, kein Radius, keine
// horizontale Padding (Text/Placeholder sitzt links auf der Linie). Focus hebt die
// Linie auf volles Weiß.
const FIELD =
  "cf-field w-full mb-0 pb-[0.5vw] bg-transparent rounded-none border-0 border-b border-solid text-[#f8f7f3] leading-[135%] font-normal outline-none transition-colors placeholder:text-[rgba(248,247,243,0.38)] max-[991px]:text-[2.286vw] max-[767px]:text-[3.6vw] max-[767px]:pb-[2vw]";
const INPUT = `${FIELD} h-[3.0vw] text-[1.39vw] max-[991px]:h-[5.4vw] max-[767px]:h-[9vw]`;
const TEXTAREA = `${FIELD} h-[7vw] resize-none text-[1.39vw] max-[767px]:h-[26vw]`;
const LABEL =
  "uppercase font-bold tracking-[0.052vw] text-[rgba(248,247,243,0.64)] text-[1vw] leading-[100%] max-[991px]:text-[1.4vw] max-[767px]:text-[3vw]";

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-[0.83vw] max-[767px]:gap-[2vw]">
      <label className={LABEL} htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
}

function SubmitButton({ label, disabled }: { label: string; disabled: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="submit"
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // Border als Inline-Style wie die Referenz (BANIJAY TOMORROW Login) — die
      // Klassen-Border wird sonst von einer globalen Form-Regel auf 16%-Weiss gedimmt.
      style={{ fontFamily: SHARP, border: "1px solid #f8f7f3" }}
      className={`inline-flex cursor-pointer items-center gap-2 rounded-[6px] border border-[#f8f7f3] px-[1.9vw] py-[0.95vw] text-[1.05vw] font-medium leading-[110%] transition-colors duration-300 disabled:cursor-wait disabled:opacity-60 max-[767px]:gap-[2vw] max-[767px]:px-[6vw] max-[767px]:py-[3vw] max-[767px]:text-[3.6vw] ${
        hovered ? "bg-[#ff4370] text-[#f8f7f3]" : "bg-transparent text-[#f8f7f3]"
      }`}
    >
      {label}
      <ArrowUpRight className="h-[1.05vw] w-[1.05vw] max-[767px]:!h-[3.6vw] max-[767px]:!w-[3.6vw]" />
    </button>
  );
}

// Default-Anliegen (Companies/Kontakt). Career übergibt eigene Optionen (Wolfram 22.07.).
const DEFAULT_TOPICS: { value: string; label: string }[] = [
  { value: "format", label: "Formatidee / Produktion" },
  { value: "partner", label: "Partnerschaft" },
  { value: "other", label: "Sonstiges" },
];

export function AlgarveContactForm({
  headline,
  copy,
  topics = DEFAULT_TOPICS,
  context,
  available = true,
}: {
  /** Seitenkontextbezogene Überschrift. */
  headline: string;
  /** Kurze begleitende Copy. */
  copy?: string;
  /** „Worum geht’s?"-Auswahl je Seitenkontext (Career weicht ab). */
  topics?: { value: string; label: string }[];
  /** Aktiviert sprachabhängige Standardtexte für den jeweiligen Seitenkontext. */
  context?: "career";
  /** Bis zur finalen Mail-Anbindung kann das Formular transparent pausiert werden. */
  available?: boolean;
}) {
  const locale = useLocale();
  const ui = copyFor(locale).form;
  const careerCopy = copyFor(locale).career;
  const localizedHeadline = context === "career" ? careerCopy.formHeadline : headline;
  const localizedCopy = context === "career" ? careerCopy.formCopy : copy;
  const localizedTopics = context === "career"
    ? topics.map((topic, index) => ({ ...topic, label: careerCopy.topics[index] ?? topic.label }))
    : topics;
  const root = useRef<HTMLElement>(null);
  const fieldId = (name: string) => `career-${name}-${locale}`;
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent" | "error">("idle");

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (context !== "career" || submitState === "sending") return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    setSubmitState("sending");

    try {
      const response = await fetch("/api/career-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") ?? ""),
          company: String(formData.get("company") ?? ""),
          email: String(formData.get("email") ?? ""),
          phone: String(formData.get("phone") ?? ""),
          topic: String(formData.get("topic") ?? ""),
          message: String(formData.get("message") ?? ""),
          locale,
          website: String(formData.get("website") ?? ""),
        }),
      });

      if (!response.ok) throw new Error("Career contact request failed");

      form.reset();
      setSubmitState("sent");
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <section ref={root} style={{ fontFamily: SHARP }} className="bg-transparent py-[8.33vw] max-[767px]:py-[20vw]">
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
              style={{ fontFamily: SHARP, fontSize: "3.33vw", lineHeight: "108%", fontWeight: 500, letterSpacing: "-0.1vw", color: "#f8f7f3", columnGap: "0.4ch" }}
            >
              {localizedHeadline.split(" ").map((w, i) => (
                <span key={i} data-cf-word className="inline-block" style={{ willChange: "transform, opacity" }}>
                  {w}
                </span>
              ))}
            </h2>
            {localizedCopy && (
              <p
                data-cf-fade
                className="m-0 max-w-[30vw] max-[767px]:!mt-[2vw] max-[767px]:!max-w-full max-[767px]:!text-[4.4vw]"
                style={{ fontFamily: SHARP, fontSize: "1.39vw", lineHeight: "142%", color: "rgba(248,247,243,0.58)" }}
              >
                {localizedCopy}
              </p>
            )}
          </div>

          {/* Rechts: Formular */}
          <div data-cf-fade className="w-full">
            {!available ? (
              <div className="glass-panel p-6 text-[#f8f7f3] max-[767px]:p-[6vw] max-[767px]:text-[4vw]">
                <p className="m-0 leading-relaxed">
                  {locale === "de"
                    ? "Das Kontaktformular wird derzeit technisch eingerichtet. Schreib uns bis dahin bitte direkt per E-Mail an "
                    : "The contact form is currently being configured. Until then, please email us directly at "}
                  <a className="underline underline-offset-4" href="mailto:hello@banijay.de">hello@banijay.de</a>.
                </p>
              </div>
            ) : submitState === "sent" ? (
              <div
                role="status"
                className="glass-panel p-6 text-center text-[#f8f7f3] max-[767px]:p-[6vw] max-[767px]:text-[4vw]"
              >
                {ui.success}
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                aria-busy={submitState === "sending"}
                className="relative flex flex-col items-start gap-[2.22vw] max-[767px]:gap-[6vw]"
              >
                <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" inert>
                  <label htmlFor={`career-website-${locale}`}>Website</label>
                  <input
                    id={`career-website-${locale}`}
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Reihe 1: Name + Unternehmen (Halbspalten, mobil gestapelt) */}
                <div className="grid w-full grid-cols-2 gap-[1vw] max-[767px]:!grid-cols-1 max-[767px]:!gap-[6vw]">
                  <Field label={ui.name} htmlFor={fieldId("name")}>
                    <input id={fieldId("name")} className={INPUT} style={{ fontFamily: SHARP }} name="name" type="text" placeholder={ui.namePlaceholder} maxLength={120} autoComplete="name" required />
                  </Field>
                  <Field label={ui.company} htmlFor={fieldId("company")}>
                    <input id={fieldId("company")} className={INPUT} style={{ fontFamily: SHARP }} name="company" type="text" placeholder={ui.companyPlaceholder} maxLength={120} autoComplete="organization" />
                  </Field>
                </div>

                {/* Reihe 2: E-Mail + Telefon (Halbspalten, mobil gestapelt) */}
                <div className="grid w-full grid-cols-2 gap-[1vw] max-[767px]:!grid-cols-1 max-[767px]:!gap-[6vw]">
                  <Field label={ui.email} htmlFor={fieldId("email")}>
                    <input id={fieldId("email")} className={INPUT} style={{ fontFamily: SHARP }} name="email" type="email" placeholder={ui.emailPlaceholder} maxLength={254} autoComplete="email" required />
                  </Field>
                  <Field label={ui.phone} htmlFor={fieldId("phone")}>
                    <input id={fieldId("phone")} className={INPUT} style={{ fontFamily: SHARP }} name="phone" type="tel" placeholder={ui.phonePlaceholder} maxLength={50} autoComplete="tel" />
                  </Field>
                </div>

                {/* Anliegen (3 Optionen) */}
                <Field label={ui.topic} htmlFor={fieldId("topic")}>
                  {/* colorScheme dark: das native Dropdown rendert dunkel statt
                      weiß-auf-weiß; Options-BG als Fallback für Browser, die
                      option-Styles erlauben. */}
                  <select
                    id={fieldId("topic")}
                    className={`${INPUT} cursor-pointer`}
                    style={{ fontFamily: SHARP, colorScheme: "dark" }}
                    name="topic"
                    defaultValue=""
                    required
                  >
                    <option value="" style={{ background: "#1a0612", color: "#f8f7f3" }}>{ui.select}</option>
                    {localizedTopics.map((t) => (
                      <option key={t.value} value={t.value} style={{ background: "#1a0612", color: "#f8f7f3" }}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </Field>

                {/* Nachricht */}
                <Field label={ui.message} htmlFor={fieldId("message")}>
                  <textarea id={fieldId("message")} className={TEXTAREA} style={{ fontFamily: SHARP }} name="message" placeholder={ui.messagePlaceholder} maxLength={5000} required />
                </Field>

                {/* Submit */}
                <div className="mt-[0.5vw] flex w-full flex-col items-start">
                  <SubmitButton
                    label={submitState === "sending" ? ui.sending : ui.send}
                    disabled={submitState === "sending"}
                  />
                  {submitState === "error" ? (
                    <p role="alert" className="mt-4 text-[#f8f7f3] max-[767px]:text-[3.6vw]">
                      {ui.error}
                    </p>
                  ) : null}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
