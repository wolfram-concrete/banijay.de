import type { Metadata } from "next";
import { AlgarveHome } from "@/components/cinematic/AlgarveHome";
import { AlgarveCompaniesBento } from "@/components/cinematic/algarve/CompaniesBento";
import { AlgarveSatelliteRings } from "@/components/cinematic/algarve/SatelliteRingsBand";

export const metadata: Metadata = {
  title: "Companies",
  description:
    "Die Banijay-World: spezialisierte Companies, Labels, Live-Einheiten, Talent-Managements und Plattformen — geclustert nach Kompetenzfeldern.",
};

// COMPANIES-PAGE (Wolfram 14.07.): Hero wie auf der Home (Bild + radiale Kurve +
// Satellitenringe), darunter KEIN Magenta, sondern der globale dunkle moody
// Sternenstaub. Danach ein mittelachsiges Statement, das nach den Ringen ein-
// animiert, dann DASSELBE Companies-Bento wie auf der Home. Kein CTA-Formular mehr.
export default function CompaniesPage() {
  return (
    <>
      <AlgarveHome
        variant="companies"
        frame3="/hero-v2/frame-3-companies.jpg"
        statement="Lorem ipsum dolor sit amet, consetetur sadipscing elitr — sed diam nonumy eirmod tempor invidunt ut labore et dolore magna."
      />
      <AlgarveCompaniesBento />

      {/* Satellitenringe wachsen von der Seite ins Layout (Wolfram 14.07.) */}
      <AlgarveSatelliteRings side="right" />
    </>
  );
}
