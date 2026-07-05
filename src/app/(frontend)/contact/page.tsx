import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { Section, Eyebrow } from "@/components/wireframe";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/cinematic/Reveal";
import { AlgarvePageHero } from "@/components/cinematic/algarve/PageHero";
import { AlgarveImageStatement } from "@/components/cinematic/algarve/ImageStatement";
import { CONTACT_PAGE } from "@/data/contact";
import { CONTACT } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Let’s talk entertainment. Kontakt für Partner & Projekte, Presse, Career und allgemeine Anfragen an Banijay Germany.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <AlgarvePageHero
        headline={"Let’s\ntalk"}
        label="Contact"
        body="Für Projekte, Presse, Talente und Partnerschaften: Hier beginnt der richtige Kontakt zu Banijay Germany."
        image="/grid/subpage-hero-poster.jpg"
      />

      {/* Kontaktbereiche */}
      <Section surface>
        <Reveal>
          <Eyebrow className="text-accent">Bereiche</Eyebrow>
          <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACT_PAGE.areas.map((area) => (
              <div key={area.title} className="border-t border-black/15 pt-5">
                <h3
                  className="text-foreground"
                  style={{ fontFamily: "var(--font-sharp), sans-serif", fontSize: "1.2rem", fontWeight: 500 }}
                >
                  {area.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Statement — Algarve Image-Block */}
      <AlgarveImageStatement
        eyebrow="Kontakt"
        headline="Der kürzeste Weg zur richtigen Antwort."
        text="Ob Format, Partnerschaft, Presse oder Bewerbung — schreib uns kurz, worum es geht. Deine Anfrage landet direkt beim passenden Team."
        image="/grid/g09.jpg"
      />

      {/* Ansprechpartner/Adresse + Formular */}
      <Section>
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
            {/* Adresse / Kontaktinfos */}
            <div>
              <Eyebrow className="text-accent">Kontaktinfos</Eyebrow>
              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 text-muted-foreground" />
                  <dd>
                    {CONTACT.street}
                    <br />
                    {CONTACT.city}
                  </dd>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-muted-foreground" />
                  <dd>
                    <a href={`mailto:${CONTACT.email}`} className="hover:text-muted-foreground">
                      {CONTACT.email}
                    </a>
                  </dd>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-muted-foreground" />
                  <dd>{CONTACT.phone}</dd>
                </div>
              </dl>
              <div className="mt-8 border-t border-border pt-6">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Pressekontakt
                </p>
                <p className="mt-2 text-sm">{CONTACT.pressContact}</p>
              </div>
            </div>

            {/* Formular (Logik in Phase 2) */}
            <form className="rounded-xl border border-border bg-surface p-6 lg:p-8">
              <div className="space-y-5">
                {CONTACT_PAGE.formFields.map((field) => (
                  <div key={field.name}>
                    <label
                      htmlFor={field.name}
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        rows={5}
                        className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-accent"
                      />
                    ) : field.type === "select" ? (
                      <select
                        id={field.name}
                        name={field.name}
                        defaultValue=""
                        className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-accent"
                      >
                        <option value="" disabled>
                          Bitte wählen
                        </option>
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-accent"
                      />
                    )}
                  </div>
                ))}
                <Button type="button" className="w-full sm:w-auto">
                  Anfrage senden
                </Button>
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                  Formular-Logik & Spam-Schutz folgen in der CMS-Anbindung.
                </p>
              </div>
            </form>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
