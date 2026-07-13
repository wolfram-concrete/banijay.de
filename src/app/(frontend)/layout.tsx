import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SmoothScroll } from "@/components/cinematic/SmoothScroll";
import { MoodBackdrop } from "@/components/cinematic/algarve/MoodBackdrop";

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      {/* V2-Mood (Task #69): globaler dunkler Backdrop hinter ALLEN Seiten —
          Basis-Farbton wandert beim Scrollen subtil durchs Brombeer-Spektrum. */}
      <MoodBackdrop />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
