import { AlgarveHome } from "@/components/cinematic/AlgarveHome";
import { AlgarveAboutIntro } from "@/components/cinematic/algarve/AboutIntro";
import { AlgarveCompaniesBento } from "@/components/cinematic/algarve/CompaniesBento";
import { AlgarveEcosystem } from "@/components/cinematic/algarve/EcosystemSection";
import { DustStage } from "@/components/cinematic/algarve/DustStage";
import { TeamWarpBlende } from "@/components/cinematic/algarve/TeamWarpBlende";
import { AlgarveEditorial } from "@/components/cinematic/algarve/Editorial";
import { IntroOverlay } from "@/components/cinematic/algarve/IntroOverlay";
import { LoveBrandsTicker } from "@/components/cinematic/algarve/LoveBrandsTicker";
import { AlgarveFounders } from "@/components/cinematic/algarve/Founders";
import { AlgarveLogoReveal } from "@/components/cinematic/algarve/LogoReveal";
import { AlgarveNewsStack } from "@/components/cinematic/algarve/NewsStack";
import { AlgarveCareerSocialFeed } from "@/components/cinematic/algarve/CareerSocialFeed";

// Home — Design-first: das Gerüst sind die echten Algarve-Sections (Hero, Grid,
// About-Intro-Wordreveal, Works-Deck, Animated-Heading, Services-Stack,
// Testimonials, Founder, Blog). In jede Section fließt der knapp gehaltene,
// optimal passende Banijay-Content.
export default function HomePage() {
  return (
    <>
      {/* INTRO (13.07.): Staub aus der Mitte → weißes B → Video-Reveal →
          B-Zoom zum Brennglas → H1 skaliert auf, Magenta-B ersetzt MENU. */}
      <IntroOverlay />

      {/* Brennglas-Hero (Trailer-Video + WebGL-Linse + „We Are Banijay." full size). */}
      <AlgarveHome />

      {/* EXCHANGE-STRECKE (Wolfram 13.07.): drei Inhalte tauschen sich an Ort
          und Stelle aus statt normal durchzuscrollen —
          ⓪ DustStage: EIN Sternenstaub-Feld klebt sticky hinter der ganzen
             Strecke — es wächst auf, NACHDEM das Statement steht, und bleibt
             dann durch alle Phasen an Ort und Stelle
          ① Statement (fadeExit: blendet nach dem Lese-Fenster aus)
          ② Ökosystem liegt via -100vh-Overlap DAHINTER (z-1 unter z-2), pinnt
             und baut sich auf, während das Statement verschwindet
          ③ in derselben gepinnten Section swappt das Ökosystem gegen die
             Headline „Ein System mit über 40 Companies." (Phase 3 im Modul)
          → danach normaler Scroll in die Companies-Liste. */}
      <div className="relative">
        <DustStage />
        <div className="relative z-[2]">
          <AlgarveAboutIntro
            fadeExit
            text="Banijay Germany ist kein einzelnes Produktionshaus. Wir sind ein Netzwerk eigenständiger Companies, das Ideen entwickelt, Formate produziert und Entertainment auf Bildschirme, Bühnen und in Feeds bringt."
            // LOVE-BRANDS-TICKER (#64) DIREKT unter dem Statement — läuft langsam
            // rechts→links, blendet mit dem Statement aus (Wolfram 13.07.).
            below={<LoveBrandsTicker />}
          />
        </div>

        {/* DAS ÖKOSYSTEM (Task #54) — die offizielle Coopetition-Orbit-Grafik als
            lebendes Modul: Statement sagt „Netzwerk", diese Section ZEIGT es,
            das Bento darunter liefert die Companies im Detail. */}
        <div className="relative z-[1]" style={{ marginTop: "-100vh" }}>
          <AlgarveEcosystem />
        </div>
      </div>

      {/* „Unsere Companies" — holistisches Bento-Grid ALLER Companies (Media-Background
          + Aufbau-Stagger + Klick-Detail). Die Headline „Ein System …" lebt als
          Swap-Phase in der Ökosystem-Section darüber. */}
      <AlgarveCompaniesBento />

      {/* EDITORIAL (Task #56): Marcus zur Historie & Zukunft — Anlass Fusion
          Banijay Entertainment + All3Media (BYQ-Artikel-Layout, Wording-Entwurf
          bis Heike #58 liefert). */}
      <AlgarveEditorial />

      {/* Konvergierende Headline (section_animated-heading).
          Die Kompetenzfelder-Flip-Cards (ServicesStack) sind entfallen (#61) —
          ihre Optik lebt jetzt als Lightbox-Ebene IM Companies-Modul weiter. */}
      {/* WARP-BLENDE mit Scroll-Stop (Wolfram 14.07.): gepinnte Bühne — die
          Headline „Ein Dach. Viele Handschriften." baut sich auf, HÄLT (Stop),
          per Scroll löst der Hyperspace-Warp als Blende, dann baut sich die
          Team-Section darunter auf. */}
      <TeamWarpBlende />

      {/* Quote-/Testimonials-Section auf der Home entfernt (13.07.) */}

      {/* Unser Team / Führung (section_founder) — Divider-Linie entfernt (13.07.) */}
      <AlgarveFounders />

      {/* Bild-zu-Logo-Masken-Reveal → Magenta-Fläche leitet in die News über */}
      <AlgarveLogoReveal />

      {/* Latest news als Stapel-Tiles (section_blog-home) — auf Magenta */}
      <AlgarveNewsStack />

      {/* Social-Feed — dieselbe Juicer-/LinkedIn-Section wie auf Career & News,
          hier als abschließender „live aus der Banijay-Welt"-Block vor dem Footer. */}
      <AlgarveCareerSocialFeed
        dark
        headline="#BanijayGermany"
        subline="Neuigkeiten, Menschen und Momente — direkt aus unseren Kanälen."
      />
    </>
  );
}
