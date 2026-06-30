import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <PagePlaceholder
      eyebrow="Contact"
      title="Let's talk entertainment."
      intro="Du möchtest mit Banijay Germany sprechen, eine Partnerschaft anfragen, Presseinformationen erhalten oder mehr über unsere Companies erfahren? Hier findest du den richtigen Einstieg."
    />
  );
}
