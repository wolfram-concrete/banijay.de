import type { Metadata } from "next";
import { AlgarveHome } from "@/components/cinematic/AlgarveHome";
// ARCHIVIERT (Wolfram 21.07.): Die Section „Unser Angebot" (Rollenwelt-Swipe) wird vorerst
// nicht mehr gebraucht. Import + Render bewusst nur auskommentiert, NICHT gelöscht — die
// Komponente CareerRoleScroller.tsx bleibt als „Speicher" im Repo und ist so jederzeit
// wieder aktivierbar.
// import { AlgarveCareerRoleScroller } from "@/components/cinematic/algarve/CareerRoleScroller";
import { AlgarveCareerJobsPreview } from "@/components/cinematic/algarve/CareerJobsPreview";
import { AlgarveCareerLocations } from "@/components/cinematic/algarve/CareerLocations";
import { AlgarveLogoTicker } from "@/components/cinematic/algarve/LogoTicker";
import { AlgarveCareerTomorrowStack } from "@/components/cinematic/algarve/CareerTomorrowStack";
import { AlgarveCodeOfConductBand } from "@/components/cinematic/algarve/CodeOfConductBand";
import { AlgarveAboutDrift } from "@/components/cinematic/algarve/AboutDrift";
import { AlgarveCareerSocialFeed } from "@/components/cinematic/algarve/CareerSocialFeed";
import { AlgarveContactForm } from "@/components/cinematic/algarve/ContactForm";
import {
  getSoftgardenJobs,
  type CareerLocale,
} from "@/lib/softgarden";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "Career",
  description:
    "Arbeite dort, wo Unterhaltung entsteht. Rollen, offene Stellen und Entwicklung in der Banijay-Welt — plus BANIJAY TOMORROW.",
  alternates: {
    canonical: "/career",
    languages: { de: "/career", en: "/en/career", "x-default": "/career" },
  },
};

export async function CareerPageContent({
  locale,
}: {
  locale: CareerLocale;
}) {
  const jobs = await getSoftgardenJobs(locale);

  return (
    <>
      {/* 01 Hero — Home-Hero + seiteneigenes Statement. Der Text stand bis 16.07. als
          eigene Intro-Section über der Rollenwelt; Wolfram hat ihn hierher ins Statement
          gezogen (die Section ist entfallen). Kommt weiterhin aus career.ts, damit er
          nur an EINER Stelle gepflegt wird. */}
      <AlgarveHome
        variant="companies"
        frame3="/hero-v2/frame-3-career.webp"
        statementKey="career"
      />

      {/* 02 Rollenwelt „Unser Angebot" — ARCHIVIERT (Wolfram 21.07.): vorerst entfernt,
          wird aktuell nicht mehr gebraucht. Komponente bleibt als Speicher im Repo
          (CareerRoleScroller.tsx) und lässt sich durch Ent-Kommentieren zurückholen. */}
      {/* <AlgarveCareerRoleScroller /> */}

      {/* 03 Aktuelle Jobs */}
      <AlgarveCareerJobsPreview jobs={jobs} />

      {/* 04 Standorte — Magenta-Modulbox (Köln + weitere Companies-Städte) */}
      <AlgarveCareerLocations />

      {/* 04b Logo-Banderole (Wolfram 16.07.) — dieselbe wie in der About-World-Section:
          die weißen Company-Wortmarken laufen durch. Direkt unter den Standorten, weil
          die Städte und die Companies dieselbe Aussage von zwei Seiten machen. */}
      <AlgarveLogoTicker />

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
        context="career"
        // Career-spezifische Anliegen (Wolfram 22.07.).
        topics={[
          { value: "initiativbewerbung", label: "Initiativbewerbung" },
          { value: "format-idee", label: "Format-Idee" },
          { value: "sonstiges", label: "Sonstiges" },
        ]}
      />
    </>
  );
}

export default function CareerPage() {
  return <CareerPageContent locale="de" />;
}
