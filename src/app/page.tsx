import { Hero } from "@/components/blocks/Hero";
import { FormatWall } from "@/components/blocks/FormatWall";
import { Statement } from "@/components/blocks/Statement";
import { ImpactNumbers } from "@/components/blocks/ImpactNumbers";
import { FeaturedCompanies } from "@/components/blocks/FeaturedCompanies";
import { PartnerCta } from "@/components/blocks/PartnerCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FormatWall />
      <Statement />
      <ImpactNumbers />
      <FeaturedCompanies />
      <PartnerCta />
    </>
  );
}
