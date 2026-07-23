import { AlgarveHome } from "@/components/cinematic/AlgarveHome";
import { AlgarveAboutIntro } from "@/components/cinematic/algarve/AboutIntro";
import { AlgarveCompaniesBento } from "@/components/cinematic/algarve/CompaniesBento";
import { AlgarveEcosystem } from "@/components/cinematic/algarve/EcosystemSection";
import { DustStage } from "@/components/cinematic/algarve/DustStage";
import { AlgarveEditorial } from "@/components/cinematic/algarve/Editorial";
import { IntroOverlay } from "@/components/cinematic/algarve/IntroOverlay";
import { AlgarveFoundersSnap } from "@/components/cinematic/algarve/FoundersSnap";
import { AlgarveLogoReveal } from "@/components/cinematic/algarve/LogoReveal";
import { AlgarveNewsStack } from "@/components/cinematic/algarve/NewsStack";
import { ElfsightFeed } from "@/components/cinematic/ElfsightFeed";
import { AlgarveLogoTicker } from "@/components/cinematic/algarve/LogoTicker";

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
            // Wording (Wolfram 20.07., dritte Fassung) — Feinschliff der zweiten Fassung
            // vom 17.07.: Doppelpunkt → Gedankenstrich, „von globaler Größe" → „globales",
            // „einige der bekanntesten" → „die bekanntesten", „Live-Erlebnisse" →
            // „außergewöhnlichsten Live-Erlebnisse". Davor stand „Unser Antrieb ist
            // Entertainment …", das wiederum den Lorem-ipsum-Platzhalter abgelöst hatte.
            text="Das weltweit führende Zuhause für Kreative – ein globales Medien- und Entertainment Powerhouse, in dem kreative Freiheit, Unternehmergeist und Innovation zusammenkommen, um die bekanntesten Brands und außergewöhnlichsten Live-Erlebnisse der Welt zu erschaffen."
          />
        </div>

        {/* DAS ÖKOSYSTEM (Task #54) — die offizielle Coopetition-Orbit-Grafik als
            lebendes Modul: Statement sagt „Netzwerk", diese Section ZEIGT es,
            das Bento darunter liefert die Companies im Detail. */}
        {/* Desktop: Ökosystem liegt via -100vh-Overlap HINTER dem Statement (Exchange
            in place, gepinnt). Mobile (Wolfram 17.07.): KEIN Overlap — das Ökosystem
            pinnt dort nicht, der -100vh würde Grafik+Akkordeon sonst unter das Statement
            ziehen (Text schimmert durch). Darum fließt es auf Mobile normal darunter. */}
        <div className="relative z-[1] md:-mt-[100vh]">
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

      {/* Team-Section (Wolfram 22.07., final): „UNSER TEAM"-Intro (wie „About Banijay"
          animiert) → Snap-Raster 3/4/5, das erst unterhalb der dritten Reihe einrastet und
          dann die LogoReveal-Videoblende freigibt. Varianten-Widget entfernt. */}
      <AlgarveFoundersSnap />

      {/* Bild-zu-Logo-Masken-Reveal → Magenta-Fläche leitet in die News über */}
      <AlgarveLogoReveal />

      {/* Latest news als Stapel-Tiles (section_blog-home) — auf Magenta */}
      <AlgarveNewsStack />

      {/* Social-Feed (Wolfram 22.07.) — Instagram @banijaygermany über das von Banijay
          eingerichtete Elfsight-Widget (Token via Linda). Löst hier den Juicer-Block ab. */}
      <ElfsightFeed
        headline="#BanijayGermany"
        subline="Neuigkeiten, Menschen und Momente — direkt aus unseren Kanälen."
      />

      {/* Company-Logo-Banderole (Wolfram 23.07.) — dieselbe endlose Ticker-Banderole wie
          auf der Career-Seite, hier UNTER der Social-Section und ÜBER dem Footer: während
          die Social-Section durchscrollt/-slidet, läuft parallel darunter die Logo-Reihe. */}
      <AlgarveLogoTicker />
    </>
  );
}
