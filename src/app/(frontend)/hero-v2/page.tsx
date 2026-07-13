import type { Metadata } from "next";
import { AlgarveNeonHallHero } from "@/components/cinematic/algarve/NeonHallHero";

// TESTROUTE (redesign-v2): Proof-of-Concept für den neuen Home-Hero — das
// Neon-Hallen-Keyvisual mit echten Videos in den TV-Screens (matrix3d-Mapping).
// Bewusst als eigene Seite, damit der Test unabhängig von der Home beurteilt
// werden kann. Nicht verlinkt, nicht indexierbar.

export const metadata: Metadata = {
  title: "Hero V2 — Testlauf",
  robots: { index: false, follow: false },
};

export default function HeroV2Page() {
  return <AlgarveNeonHallHero />;
}
