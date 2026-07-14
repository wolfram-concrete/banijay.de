import type { Metadata } from "next";
import { AlgarvePageHero } from "@/components/cinematic/algarve/PageHero";
import { AlgarveEcosystemDirectory } from "@/components/cinematic/algarve/EcosystemDirectory";
import { AlgarveContactForm } from "@/components/cinematic/algarve/ContactForm";

export const metadata: Metadata = {
  title: "Ecosystem",
  description:
    "Das Banijay-Ökosystem: eigenständige Companies, Labels, Live-Einheiten, Talent-Managements und Plattformen — geclustert nach Kompetenzfeldern, verbunden durch dasselbe Netzwerk.",
};

export default function EcosystemPage() {
  return (
    <>
      {/* Hero */}
      <AlgarvePageHero
        headline={"Ein System.\nViele Handschriften."}
        label="Ecosystem"
        body="Banijay Germany ist ein Netzwerk eigenständiger Companies. Vom Prime-Time-Format über Fiction, Live und Audio bis zu Talent und Tech — jede Company mit eigener Handschrift, alle Teil eines gemeinsamen Ökosystems."
        highlights={["Entertainment", "Fiction", "Live", "Audio", "Artists", "Tech"]}
        image="/grid/companies-hero-poster.jpg"
        video="/video/companies-hero.mp4"
      />

      {/* Vollständiges Ökosystem-Verzeichnis, nach Kategorien gruppiert */}
      <AlgarveEcosystemDirectory />

      {/* Kontakt-Abschluss */}
      <AlgarveContactForm
        headline="Die richtige Company für deine Idee, dein Format oder deine Partnerschaft?"
        copy="Sag uns, worum es geht – wir bringen dich mit der passenden Handschrift im Ökosystem zusammen."
      />
    </>
  );
}
