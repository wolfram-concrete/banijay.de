import type { Metadata } from "next";
import { CareerPageContent } from "../../career/page";

export const revalidate = 900;

export const metadata: Metadata = {
  title: { absolute: "Careers & Jobs | Banijay Germany" },
  description: "Work where entertainment is made. Discover roles, opportunities and development across Banijay Germany, including BANIJAY TOMORROW.",
  alternates: {
    canonical: "/en/career",
    languages: { de: "/career", en: "/en/career", "x-default": "/career" },
  },
};

export default function EnglishCareerPage() {
  return <CareerPageContent locale="en" />;
}
