import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Sharp Grotesk — Brand-Font von Banijay Germany (lokal eingebunden).
// Book = Body, Medium = Headlines/Emphasis. Italics für editorische Akzente.
const sharpGrotesk = localFont({
  src: [
    { path: "./fonts/SharpGroteskBook20.woff2", weight: "400", style: "normal" },
    { path: "./fonts/SharpGrotesk-BookItalic20.otf", weight: "400", style: "italic" },
    { path: "./fonts/SharpGroteskMedium20.woff2", weight: "500", style: "normal" },
    { path: "./fonts/SharpGrotesk-MediumItalic20.otf", weight: "500", style: "italic" },
  ],
  variable: "--font-sharp",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Banijay Germany — Die Entertainment-Welt hinter den Momenten",
    template: "%s — Banijay Germany",
  },
  description:
    "Banijay Germany vereint starke Companies, kreative Unternehmer:innen und bekannte Formate unter einem Dach. Unterhaltung für TV, Streaming, Digital, Live und Bühnen.",
  metadataBase: new URL("https://banijay.de"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${sharpGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
