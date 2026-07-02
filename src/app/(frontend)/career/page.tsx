import type { Metadata } from "next";
import { AlgarvePageHero } from "@/components/cinematic/algarve/PageHero";
import { AlgarveCareerRoleStack } from "@/components/cinematic/algarve/CareerRoleStack";
import { AlgarveCareerJobsPreview } from "@/components/cinematic/algarve/CareerJobsPreview";
import { AlgarveCareerLocations } from "@/components/cinematic/algarve/CareerLocations";
import { AlgarveImageStatement } from "@/components/cinematic/algarve/ImageStatement";
import { AlgarveCodeOfConductBand } from "@/components/cinematic/algarve/CodeOfConductBand";
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

      {/* 04 Standorte */}
      <AlgarveCareerLocations />

      {/* 05 BANIJAY TOMORROW */}
      <AlgarveImageStatement
        eyebrow={CAREER.tomorrow.eyebrow}
        headline={CAREER.tomorrow.headline}
        text={CAREER.tomorrow.text}
        image={CAREER.tomorrow.image}
        cta={CAREER.tomorrow.cta}
      />

      {/* 06 Code of Conduct */}
      <AlgarveCodeOfConductBand />

      {/* 07 Bewerbungs-/Kontaktformular (Eingabetemplate, wie About/Companies) */}
      <AlgarveContactForm
        headline={"Kein passender Job\ndabei?"}
        copy="Erzähl uns, was du mitbringst — wir freuen uns über deine Initiativbewerbung und melden uns bei dir."
      />
    </>
  );
}
