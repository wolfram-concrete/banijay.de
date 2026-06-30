import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <PagePlaceholder
      eyebrow="About"
      title="We are Banijay Germany."
      intro="Ein führendes Entertainment-Haus im deutschen Markt. Unter unserem Dach entstehen Programme, Formate, Live-Erlebnisse, digitale Inhalte und Talentwelten."
    />
  );
}
