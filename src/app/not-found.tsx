import type { Metadata } from "next";
import { MoodBackdrop } from "@/components/cinematic/algarve/MoodBackdrop";
import { NotFoundContent } from "@/components/errors/NotFoundContent";
import { BackToTop } from "@/components/layout/BackToTop";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export const metadata: Metadata = {
  title: { absolute: "404 | Banijay Germany" },
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <>
      <MoodBackdrop />
      <SiteHeader />
      <main className="flex-1 overflow-x-clip">
        <NotFoundContent />
      </main>
      <SiteFooter />
      <BackToTop />
    </>
  );
}
