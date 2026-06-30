import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const metadata: Metadata = { title: "News" };

export default function NewsPage() {
  return (
    <PagePlaceholder
      eyebrow="News"
      title="Was bei Banijay passiert."
      intro="Hitraten, Podcasts, Köpfe und Momente aus der Banijay-Welt. Dieser Bereich wird später über das Payload CMS redaktionell gepflegt."
    />
  );
}
