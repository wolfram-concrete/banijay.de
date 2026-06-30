import type { Metadata } from "next";
import { thunder, konstant } from "@/lib/fonts";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://banijay.de"),
  title: {
    default: "Banijay Germany — We are Storytellers",
    template: "%s — Banijay Germany",
  },
  description:
    "Banijay Germany ist die Entertainment-Welt hinter den Momenten, über die Deutschland spricht. Ein Verbund der besten unabhängigen Produzenten und Unternehmer:innen.",
  openGraph: {
    title: "Banijay Germany — We are Storytellers",
    description:
      "Die Entertainment-Welt hinter den Momenten, über die Deutschland spricht.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      className={`${thunder.variable} ${konstant.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-bone flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
