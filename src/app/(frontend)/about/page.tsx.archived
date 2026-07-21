import type { Metadata } from "next";
import { AlgarveHome } from "@/components/cinematic/AlgarveHome";
import { AlgarveAboutIntro } from "@/components/cinematic/algarve/AboutIntro";
import { AlgarveEcosystem } from "@/components/cinematic/algarve/EcosystemSection";
import { AlgarveFounders } from "@/components/cinematic/algarve/Founders";
import { AlgarveProofVideo } from "@/components/cinematic/algarve/ProofVideo";
import { AlgarveTestimonials } from "@/components/cinematic/algarve/Testimonials";
import { AlgarveWorldNetwork } from "@/components/cinematic/algarve/WorldNetwork";
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
      {/* Statement = der frühere Proof-Copytext (Wolfram 16.07.): Er stand bis dahin
          links neben den Zahlen in der Fakten-Section und ist hierher gewandert; das
          Lorem-ipsum ist damit weg. Kommt weiter aus about.ts → nur EINE Fundstelle. */}
      <AlgarveHome variant="companies" frame3="/hero-v2/frame-3-about.jpg" statement={ABOUT.proof.text} />

      {/* 02+03 Zahlen MIT integriertem Statement-Video: gepinnte Fakten-Section; das
          all3media-Video skaliert IN dieser Section aus einer Zahlen-Kachel heraus auf
          Full-Screen (clip-path). Wolfram 16.07.: Copytext ist ins Hero-Statement
          gewandert, das Marcus-Wolter-Zitat über dem Video ist ersatzlos entfallen —
          die Zahlen stehen jetzt mittelachsig, das Video blüht aus ihrer Mitte auf. */}
      <AlgarveProofVideo stats={STATS} video="/video/team-all3media.mp4" />

      {/* 05 Internationalität — Text-Statement mit Standraum (tall): das Statement
          steht gepinnt, dann schiebt sich die WorldNetwork-Section (unten, -100vh-
          Overlap) mit eigener gerundeter Oberkante darüber. Keine eigene Blende hier
          → kein doppelter Layer (exakt wie Home AboutIntro → CompaniesScroller). */}
      <AlgarveAboutIntro text={`${ABOUT.international.headline} ${ABOUT.international.text}`} tall />

      {/* 06 Banijay World — Territory-Holdings/Netzwerk (dunkler Farb-Break) */}
      <AlgarveWorldNetwork />

      {/* 06b Zitate der Geschäftsführer:innen (Wolfram 16.07.) — die verworfene
          Home-Section, jetzt hier über dem Team: gefächerte Bildkarten, Hover zeigt
          das passende Zitat. Personen/Fotos/Zitate 1:1 vom Zitat-Slider auf banijay.de. */}
      <AlgarveTestimonials />

      {/* 07 Leadership — Algarve Founder-Grid.
          holdForOverlay={false} (Wolfram 16.07.): Die Partner-Section ist entfallen.
          Ihr -100vh-Overlap hatte den Halte-Beat am Ende des Team-Pins gedeckt — ohne
          Nachfolger wäre daraus ~1 Screen Leerlauf geworden, in dem das Team nur steht.
          Auf der Home bleibt der Beat (dort zieht der LogoReveal darüber). */}
      <AlgarveFounders holdForOverlay={false} staticHead />

      {/* 09 Das Banijay Ökosystem — dieselbe Orbit-Grafik-Section wie auf der Home
          (Wolfram 20.07.): das frühere Companies-/Label-Verzeichnis
          (AlgarveEcosystemDirectory) ist hier gegen die gepinnte Orbit-Choreografie
          getauscht. Die Section ist self-contained (eigener min-h-screen-Pin + Glow),
          braucht die Home-DustStage/-100vh-Überlagerung nicht. */}
      <AlgarveEcosystem showSwap={false} />

      {/* 10 Kontakt-Formular (Eingabetemplate) */}
      <AlgarveContactForm
        headline="Lass uns über Entertainment sprechen, das Menschen erreicht."
        copy="Für Projekte, Presse, Partnerschaften oder einfach ein Hallo."
      />
    </>
  );
}
