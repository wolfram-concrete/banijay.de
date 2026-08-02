import type { Metadata } from "next";
import CareerPage from "../../career/page";

export const metadata: Metadata = {
  title: "Careers",
  description: "Work where entertainment is made. Discover roles, opportunities and development across the Banijay world, including BANIJAY TOMORROW.",
  alternates: {
    canonical: "/en/career",
    languages: { de: "/career", en: "/en/career", "x-default": "/career" },
  },
};

export default CareerPage;
