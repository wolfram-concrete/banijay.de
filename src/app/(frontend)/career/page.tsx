import type { Metadata } from "next";
import { AlgarvePageHero } from "@/components/cinematic/algarve/PageHero";
import { AlgarveCareerRoleStack } from "@/components/cinematic/algarve/CareerRoleStack";
import { AlgarveCareerJobsPreview } from "@/components/cinematic/algarve/CareerJobsPreview";
import { AlgarveCareerTomorrowStack } from "@/components/cinematic/algarve/CareerTomorrowStack";
import { AlgarveCodeOfConductBand } from "@/components/cinematic/algarve/CodeOfConductBand";
import { AlgarveCareerSocialFeed } from "@/components/cinematic/algarve/CareerSocialFeed";
import { AlgarveContactForm } from "@/components/cinematic/algarve/ContactForm";
import { CAREER } from "@/data/career";

export const metadata: Metadata = {
  title: "Career",
  description:
    "Arbeite dort, wo Unterhaltung entsteht. Rollen, offene Stellen und Entwicklung in der Banijay-Welt — plus BANIJAY TOMORROW.",
};

export default function CareerPage() {
  return (
    <>
      {/* 01 Hero */}
      <AlgarvePageHero
        label={CAREER.hero.label}
        headline={CAREER.hero.headline}
        body={CAREER.hero.body}
        image={CAREER.hero.image}
      />

      {/* 02 Rollenwelt */}
      <AlgarveCareerRoleStack />

      {/* 03 Aktuelle Jobs */}
      <AlgarveCareerJobsPreview />

      {/* 04+05 Standorte → BANIJAY TOMORROW als gestapeltes Layer-System: der
          Magenta-Kasten sendet bunte gerundete Schichten nach unten aus und endet
          im schwarzen Layer, der die Tomorrow-Section bildet (Hintergrund von oben
          gebaut, dann läuft der Content ein). */}
      <AlgarveCareerTomorrowStack />

      {/* 06 Code of Conduct */}
      <AlgarveCodeOfConductBand />

      {/* 06b #workatBanijay — Social-Feed (Juicer-JSON, eigene Cards) */}
      <AlgarveCareerSocialFeed />

      {/* 07 Bewerbungs-/Kontaktformular (Eingabetemplate, wie About/Companies) */}
      <AlgarveContactForm
        headline={"Kein passender Job\ndabei?"}
        copy="Erzähl uns, was du mitbringst — wir freuen uns über deine Initiativbewerbung und melden uns bei dir."
      />
    </>
  );
}
