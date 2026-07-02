import { AlgarveHome } from "@/components/cinematic/AlgarveHome";
import { AlgarveAboutIntro } from "@/components/cinematic/algarve/AboutIntro";
import { AlgarveCompaniesScroller } from "@/components/cinematic/algarve/CompaniesScroller";
import { AlgarveAnimatedHeading } from "@/components/cinematic/algarve/AnimatedHeading";
import { AlgarveServicesStack } from "@/components/cinematic/algarve/ServicesStack";
import { AlgarveTestimonials } from "@/components/cinematic/algarve/Testimonials";
import { AlgarveFounders } from "@/components/cinematic/algarve/Founders";
import { AlgarveLogoReveal } from "@/components/cinematic/algarve/LogoReveal";
import { AlgarveNewsStack } from "@/components/cinematic/algarve/NewsStack";
import { AlgarveDivider } from "@/components/cinematic/algarve/Divider";

// Home — Design-first: das Gerüst sind die echten Algarve-Sections (Hero, Grid,
// About-Intro-Wordreveal, Works-Deck, Animated-Heading, Services-Stack,
// Testimonials, Founder, Blog). In jede Section fließt der knapp gehaltene,
// optimal passende Banijay-Content.
export default function HomePage() {
  return (
    <>
      {/* Hero (Video + weiße Typo) + Entertainment Portfolio (Sticky-Grid) */}
      <AlgarveHome />

      {/* Statement-Reveal (section_about-intro). Desktop: der Magenta-Übergang wird
          von der CompaniesScroller-Fläche getragen (-100vh-Overlap). Mobile: dort
          ist diese Fläche ausgeblendet → magentaExit lässt hier im Sticky-Panel die
          Magenta-Blende über das fertige Statement aufsteigen und übergibt nahtlos
          an die (magenta) Companies-Section. */}
      <AlgarveAboutIntro
        magentaExit
        text="Banijay Germany ist kein einzelnes Produktionshaus. Wir sind ein Netzwerk eigenständiger Companies, das Ideen entwickelt, Formate produziert und Entertainment auf Bildschirme, Bühnen und in Feeds bringt."
      />

      {/* Alle Companies als horizontaler Snap-Scroll-Slider (erweitert works-home) */}
      <AlgarveCompaniesScroller />

      {/* Konvergierende Headline — der Aha (section_animated-heading) */}
      <AlgarveAnimatedHeading lines={["Du kennst", "die Formate.", "Hier entstehen sie."]} />

      {/* Kompetenzfelder als Dark-Card-Stack (section_services-home) */}
      <AlgarveServicesStack />

      {/* Konvergierende Headline (section_animated-heading) */}
      <AlgarveAnimatedHeading lines={["Ein Dach.", "Viele", "Handschriften."]} />

      {/* Stimmen & Zahlen (section_testimonials) */}
      <AlgarveTestimonials />

      <AlgarveDivider />

      {/* Marcus Wolter / Führung (section_founder) */}
      <AlgarveFounders />

      {/* Bild-zu-Logo-Masken-Reveal → Magenta-Fläche leitet in die News über */}
      <AlgarveLogoReveal />

      {/* Latest news als Stapel-Tiles (section_blog-home) — auf Magenta */}
      <AlgarveNewsStack />
    </>
  );
}
