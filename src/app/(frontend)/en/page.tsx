import type { Metadata } from "next";
import HomePage from "../page";

export const metadata: Metadata = {
  title: { absolute: "Banijay Germany | Entertainment, Companies & Talent" },
  description: "Banijay Germany brings together leading production companies, creative entrepreneurs and outstanding entertainment brands.",
  alternates: {
    canonical: "/en",
    languages: { de: "/", en: "/en", "x-default": "/" },
  },
};

export default HomePage;
