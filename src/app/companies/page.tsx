import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const metadata: Metadata = { title: "Companies" };

export default function CompaniesPage() {
  return (
    <PagePlaceholder
      eyebrow="Companies"
      title="Unsere Banijay-World"
      intro="Von großen Shows über Reality, Fiction und Comedy bis zu Live-Entertainment, Digital, Talent-Management und Production Services: die strukturierte Company-Welt von Banijay Germany."
    />
  );
}
