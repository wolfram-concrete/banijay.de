import type { Metadata } from "next";
import { AlgarvePageHero } from "@/components/cinematic/algarve/PageHero";
import { AlgarveCompanyCards } from "@/components/cinematic/algarve/CompanyCards";
import { AlgarveContactForm } from "@/components/cinematic/algarve/ContactForm";

export const metadata: Metadata = {
  title: "Companies",
  description:
    "Die Banijay-World: spezialisierte Companies, Labels, Live-Einheiten, Talent-Managements und Plattformen — geclustert nach Kompetenzfeldern.",
};

export default function CompaniesPage() {
  return (
    <>
      {/* Hero */}
      <AlgarvePageHero
        headline={"Die Welt\ndahinter"}
        label="Companies"
        body="25+ Companies und Labels, jede mit eigener Handschrift. Gemeinsam entwickeln sie Shows, Reality, Fiction, Comedy, Digital und Live-Erlebnisse für den deutschen Markt."
        image="/grid/g03.png"
        video="/video/companies-hero.mp4"
      />

      {/* Companies-Vorstellung — farbige Teaser-Card-Bühne (Algarve-Fold-away) */}
      <AlgarveCompanyCards />

      {/* Kontakt-Formular (ersetzt den früheren Abschluss-CTA) */}
      <AlgarveContactForm
        headline="Die richtige Company für deine Idee, dein Format oder deine Partnerschaft?"
        copy="Sag uns, worum es geht – wir bringen dich mit der passenden Handschrift zusammen."
      />
    </>
  );
}
