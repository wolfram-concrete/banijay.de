import type { Metadata } from "next";
import { AlgarveHome } from "@/components/cinematic/AlgarveHome";
import { AlgarveAboutIntro } from "@/components/cinematic/algarve/AboutIntro";
import { AlgarveEcosystemDirectory } from "@/components/cinematic/algarve/EcosystemDirectory";
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
      {/* 01 Hero — Home-Hero (We-Are-Banijay-Sequenz + Satellitenringe), dann das
          seiten­eigene Statement mittelachsig auf dunklem Sternenstaub. */}
      <AlgarveHome
        variant="companies"
        frame3="/hero-v2/frame-3-about.jpg"
        statement="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
      />

      {/* 02+03 Proof/Zahlen MIT integriertem Statement-Video: gepinnte Fakten-
          Section; das all3media-Video (wie auf der Home) skaliert IN dieser Section
          auf Full-Screen (clip-path), danach das Marcus-Wolter-Zitat Wort für Wort.
          Die Zahlen-Kacheln tragen jeweils ihren Copytext. (CEO-Testimonial-Section
          entfällt — das Zitat lebt jetzt im Video-Statement, Wolfram 14.07.) */}
      <AlgarveProofVideo
        proofText={ABOUT.proof.text}
        stats={STATS}
        video="/video/team-all3media.mp4"
        statement={`„${ABOUT.ceo.quote}“`}
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

      {/* 09 Ökosystem-Verzeichnis (Wolfram 14.07.: Ecosystem-Seite entfällt, ihre
          Inhalte wandern ans Ende von About) — komplettes Companies-/Label-Verzeichnis
          nach Kompetenzfeldern gruppiert. */}
      <AlgarveEcosystemDirectory />

      {/* 10 Kontakt-Formular (Eingabetemplate) */}
      <AlgarveContactForm
        headline="Lass uns über Entertainment sprechen, das Menschen erreicht."
        copy="Für Projekte, Presse, Partnerschaften oder einfach ein Hallo."
      />
    </>
  );
}
