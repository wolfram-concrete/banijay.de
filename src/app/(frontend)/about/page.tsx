import type { Metadata } from "next";
import { AlgarvePageHero } from "@/components/cinematic/algarve/PageHero";
import { AlgarveAboutIntro } from "@/components/cinematic/algarve/AboutIntro";
import { AlgarveCeoTestimonial } from "@/components/cinematic/algarve/CeoTestimonial";
import { AlgarveFounders } from "@/components/cinematic/algarve/Founders";
import { AlgarveProofVideo } from "@/components/cinematic/algarve/ProofVideo";
import { AlgarvePartnerGrid } from "@/components/cinematic/algarve/PartnerGrid";
import { AlgarveContactForm } from "@/components/cinematic/algarve/ContactForm";
import { ABOUT } from "@/data/about";
import { STATS } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Banijay Germany ist ein führendes Entertainment-Haus im deutschen Markt — geführt von Menschen, die Entertainment verstehen.",
};

export default function AboutPage() {
  return (
    <>
      {/* 01 Hero */}
      <AlgarvePageHero
        headline={"We are\nBanijay"}
        label="About"
        body="Eigenständige Companies, bekannte Marken und kreative Teams — gebündelt unter einem starken Dach, mit weitreichender Präsenz im deutschen Entertainment."
        highlights={["Companies", "Marken", "Teams", "Dach"]}
        image="/grid/g05.jpg"
      />

      {/* 02+03 Proof/Zahlen MIT integriertem Statement-Video: gepinnte Fakten-
          Section; das gerundete Video-Modul im Grid skaliert IN dieser Section auf
          Full-Screen (clip-path), danach das Prinzip-Statement Wort für Wort. */}
      <AlgarveProofVideo
        proofText={ABOUT.proof.text}
        stats={STATS}
        statement={`${ABOUT.principle.headline} ${ABOUT.principle.text.split(". ")[0]}.`}
      />

      {/* 04 CEO / Führung — Testimonial-Section (Birkform) mit Magenta-Parallax */}
      <AlgarveCeoTestimonial
        heading="Führung"
        role={ABOUT.ceo.role}
        quote={ABOUT.ceo.quote}
        name={ABOUT.ceo.name}
        image="/people/marcus-wolter-2022.jpg"
        cta={{ text: "Kontakt aufnehmen", href: "mailto:hello@banijay.de" }}
        stats={[
          { value: "25+", label: "Companies & Labels" },
          { value: "1.300", label: "Mitarbeitende" },
        ]}
      />

      {/* 05 Internationalität — reines Text-Statement (Panel ohne Hintergrundbild),
          Wort-für-Wort-Reveal wie die Home-AboutIntro. */}
      <AlgarveAboutIntro text={`${ABOUT.international.headline} ${ABOUT.international.text}`} />

      {/* 06 Leadership — Algarve Founder-Grid */}
      <AlgarveFounders />

      {/* 07 Partnerverständnis — als blog-home-Grid (Algarve News-Template) */}
      <AlgarvePartnerGrid />

      {/* 08 Kontakt-Formular (Eingabetemplate) */}
      <AlgarveContactForm
        headline="Lass uns über Entertainment sprechen, das Menschen erreicht."
        copy="Für Projekte, Presse, Partnerschaften oder einfach ein Hallo."
      />
    </>
  );
}
