import type { Metadata } from "next";
import { AlgarveHome } from "@/components/cinematic/AlgarveHome";
import { AlgarveCareerRoleStack } from "@/components/cinematic/algarve/CareerRoleStack";
import { AlgarveCareerJobsPreview } from "@/components/cinematic/algarve/CareerJobsPreview";
import { AlgarveCareerLocations } from "@/components/cinematic/algarve/CareerLocations";
import { AlgarveCareerTomorrowStack } from "@/components/cinematic/algarve/CareerTomorrowStack";
import { AlgarveCodeOfConductBand } from "@/components/cinematic/algarve/CodeOfConductBand";
import { AlgarveAboutDrift } from "@/components/cinematic/algarve/AboutDrift";
import { AlgarveSatelliteRings } from "@/components/cinematic/algarve/SatelliteRingsBand";
import { AlgarveCareerSocialFeed } from "@/components/cinematic/algarve/CareerSocialFeed";
import { AlgarveContactForm } from "@/components/cinematic/algarve/ContactForm";

export const metadata: Metadata = {
  title: "Career",
  description:
    "Arbeite dort, wo Unterhaltung entsteht. Rollen, offene Stellen und Entwicklung in der Banijay-Welt — plus BANIJAY TOMORROW.",
};

export default function CareerPage() {
  return (
    <>
      {/* 01 Hero — Home-Hero + seiten­eigenes Statement */}
      <AlgarveHome
        variant="companies"
        frame3="/hero-v2/frame-3-career.jpg"
        statement="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore."
      />

      {/* 02 Rollenwelt */}
      <AlgarveCareerRoleStack />

      {/* 03 Aktuelle Jobs */}
      <AlgarveCareerJobsPreview />

      {/* 04 Standorte — Magenta-Modulbox (Köln + weitere Companies-Städte) */}
      <AlgarveCareerLocations />

      {/* 05 BANIJAY TOMORROW — ruhige Feature-Section (Bild + Text + CTA, Parallax) */}
      <AlgarveCareerTomorrowStack />

      {/* 06 Code of Conduct — mit driftender Bewegtbild-Collage im Hintergrund
          (von der About-Seite hierher verlegt, Wolfram 14.07.) */}
      <AlgarveCodeOfConductBand background={<AlgarveAboutDrift asBackground />} />

      {/* 06b #workatBanijay — Social-Feed (Juicer-JSON, eigene Cards) */}
      <AlgarveCareerSocialFeed />

      {/* 07 Bewerbungs-/Kontaktformular (Eingabetemplate, wie About/Companies) */}
      <AlgarveContactForm
        headline={"Kein passender Job\ndabei?"}
        copy="Erzähl uns, was du mitbringst — wir freuen uns über deine Initiativbewerbung und melden uns bei dir."
      />

      {/* Satellitenringe wachsen von der Seite ins Layout (Wolfram 14.07.) */}
      <AlgarveSatelliteRings side="left" />
    </>
  );
}
