import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { Section, Eyebrow } from "@/components/wireframe";
import { Reveal } from "@/components/cinematic/Reveal";
import { AlgarveHome } from "@/components/cinematic/AlgarveHome";
import { AlgarveImageStatement } from "@/components/cinematic/algarve/ImageStatement";
import { CONTACT } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Banijay Germany about projects, press, careers, partnerships and general enquiries.",
  alternates: {
    canonical: "/en/contact",
    languages: { de: "/contact", en: "/en/contact", "x-default": "/contact" },
  },
};

const AREAS = [
  { title: "Projects & formats", text: "Ideas, productions, co-productions and creative partnerships." },
  { title: "Press", text: "Media enquiries, interviews, company information and press materials." },
  { title: "Careers", text: "Questions about opportunities, applications and working at Banijay." },
  { title: "General enquiries", text: "Everything else — we will make sure your message reaches the right team." },
];

export default function ContactPageEn() {
  return (
    <>
      <AlgarveHome
        variant="companies"
        statement="For projects, press, talent and partnerships: this is where the right conversation with Banijay Germany begins."
      />

      <Section surface>
        <Reveal>
          <Eyebrow className="text-accent">Areas</Eyebrow>
          <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {AREAS.map((area) => (
              <div key={area.title} className="border-t border-black/15 pt-5">
                <h3 className="text-foreground" style={{ fontFamily: "var(--font-sharp), sans-serif", fontSize: "1.2rem", fontWeight: 500 }}>
                  {area.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <AlgarveImageStatement
        eyebrow="Contact"
        headline="The shortest route to the right answer."
        text="Whether it is a format, partnership, press enquiry or application, tell us briefly what you need. Your message will go straight to the right team."
        image="/grid/g09.jpg"
      />

      <Section>
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <Eyebrow className="text-accent">Contact details</Eyebrow>
              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex items-start gap-3"><MapPin size={16} className="mt-0.5 text-muted-foreground" /><dd>{CONTACT.street}<br />{CONTACT.city}</dd></div>
                <div className="flex items-center gap-3"><Mail size={16} className="text-muted-foreground" /><dd><a href={`mailto:${CONTACT.email}`} className="hover:text-muted-foreground">{CONTACT.email}</a></dd></div>
                <div className="flex items-center gap-3"><Phone size={16} className="text-muted-foreground" /><dd>{CONTACT.phone}</dd></div>
              </dl>
              <div className="mt-8 border-t border-border pt-6">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Press contact</p>
                <p className="mt-2 text-sm">{CONTACT.pressContact}</p>
              </div>
            </div>

            <div className="border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
              <p>
                The contact form is currently being configured. Until then, please email us directly at{" "}
                <a className="text-foreground underline underline-offset-4" href={`mailto:${CONTACT.email}`}>
                  {CONTACT.email}
                </a>.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
