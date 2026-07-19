import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SmoothScroll } from "@/components/cinematic/SmoothScroll";
import { MoodBackdrop } from "@/components/cinematic/algarve/MoodBackdrop";
import { BackToTop } from "@/components/layout/BackToTop";

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      {/* V2-Mood (Task #69): globaler dunkler Backdrop hinter ALLEN Seiten —
          Basis-Farbton wandert beim Scrollen subtil durchs Brombeer-Spektrum. */}
      <MoodBackdrop />
      <SiteHeader />
      {/* overflow-x-clip (Wolfram 17.07.): mehrere Module sind ABSICHTLICH breiter als
          100vw — die Hero-Kurvenringe (bis 136vw, damit die Bögen an beiden Rändern
          off-screen laufen), Bleed-Backgrounds usw. Ohne horizontales Clipping erzeugten
          sie auf schmalen Viewports einen ~70px-Überlauf: rechts entstand ein neutraler
          Streifen, und die fixed-Navi/das Logo richteten sich am Scrollbereich (460) statt
          am Viewport (390) aus. `clip` statt `hidden`, weil clip KEINEN Scroll-Container
          erzeugt und damit die vielen position:sticky-/GSAP-Pin-Module NICHT bricht.
          Horizontal-Slider (Career/Marquee) haben ihren eigenen overflow-Container und
          bleiben unberührt. */}
      <main className="flex-1 overflow-x-clip">{children}</main>
      <SiteFooter />
      <BackToTop />
    </>
  );
}
