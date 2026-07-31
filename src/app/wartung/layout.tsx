import type { Metadata } from "next";

/* Bewusst AUSSERHALB der Route-Group (frontend): deren Layout zieht
   SmoothScroll (Lenis), MoodBackdrop, SiteHeader/Footer und BackToTop mit —
   die Wartungsseite soll davon nichts laden. */

export const metadata: Metadata = {
  title: "Wartungsarbeiten",
  description: "banijay.de wird gerade überarbeitet.",
  robots: { index: false, follow: false },
};

export default function WartungLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
