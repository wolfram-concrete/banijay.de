import type { Metadata } from "next";
import { MoodRoom } from "@/components/cinematic/algarve/MoodRoom";

// TESTROUTE (redesign-v2): Mood-Demo — invertierte Farblogik (Brombeere/Black +
// Magenta-vibrant-Akzente), Raum-Tiefe (Orbs + Filmkorn) und Milchglas-Module.
// Außerhalb von (frontend): keine Nav, kein Preloader, kein Lenis. Nicht verlinkt.

export const metadata: Metadata = {
  title: "Mood-Test — Dark/Brombeere + Milchglas",
  robots: { index: false, follow: false },
};

export default function MoodTestPage() {
  return <MoodRoom />;
}
