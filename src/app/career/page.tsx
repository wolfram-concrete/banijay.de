import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const metadata: Metadata = { title: "Career" };

export default function CareerPage() {
  return (
    <PagePlaceholder
      eyebrow="Career"
      title="Arbeite dort, wo Unterhaltung entsteht."
      intro="In der Banijay-Welt arbeiten Menschen, die Ideen entwickeln, Formate produzieren, Talente begleiten, Bühnen füllen und Inhalte schaffen, über die gesprochen wird."
    />
  );
}
