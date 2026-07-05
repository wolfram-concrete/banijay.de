import type { Metadata } from "next";
import { AlgarvePageHero } from "@/components/cinematic/algarve/PageHero";
import { AlgarveAboutIntro } from "@/components/cinematic/algarve/AboutIntro";
import { AlgarveCeoTestimonial } from "@/components/cinematic/algarve/CeoTestimonial";
import { AlgarveFounders } from "@/components/cinematic/algarve/Founders";
import { AlgarveProofVideo } from "@/components/cinematic/algarve/ProofVideo";
import { AlgarveWorldNetwork } from "@/components/cinematic/algarve/WorldNetwork";
import { AlgarveAboutDrift } from "@/components/cinematic/algarve/AboutDrift";
import { AlgarvePartnerStack } from "@/components/cinematic/algarve/PartnerStack";
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
        image="/grid/subpage-hero-poster.jpg"
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

      {/* 05 Internationalität — Text-Statement mit Standraum (tall): das Statement
          steht gepinnt, dann schiebt sich die WorldNetwork-Section (unten, -100vh-
          Overlap) mit eigener gerundeter Oberkante darüber. Keine eigene Blende hier
          → kein doppelter Layer (exakt wie Home AboutIntro → CompaniesScroller). */}
      <AlgarveAboutIntro text={`${ABOUT.international.headline} ${ABOUT.international.text}`} tall />

      {/* 06 Banijay World — Territory-Holdings/Netzwerk (dunkler Farb-Break) */}
      <AlgarveWorldNetwork />

      {/* 06b Drift — frei schwebende Video-Snippets aus dem Banijay-Unternehmenstrailer
          mit Scroll-/Maus-Parallax (Off-White-Bühne + Grain). */}
      <AlgarveAboutDrift />

      {/* 07 Leadership — Algarve Founder-Grid */}
      <AlgarveFounders />

      {/* 08 Partnerverständnis — BYQ-Stacking-Cards auf Magenta (Farb-Break;
          der Team-Magenta-Exit übergibt nahtlos hierher) */}
      <AlgarvePartnerStack />

      {/* 09 Kontakt-Formular (Eingabetemplate) */}
      <AlgarveContactForm
        headline="Lass uns über Entertainment sprechen, das Menschen erreicht."
        copy="Für Projekte, Presse, Partnerschaften oder einfach ein Hallo."
      />
    </>
  );
}
