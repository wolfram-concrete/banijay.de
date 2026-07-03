"use client";

import { useEffect, useRef } from "react";

// About – „Drift"-Sektion (nachgebautes Floating-Gallery-Template): frei platzierte
// Container mit Scroll- + Maus-Parallax (jeder Container mit eigener Tiefe/Speed).
// Statt Bildern laufen hier lose ausgewählte VIDEO-Snippets aus dem Banijay-
// Unternehmenstrailer; jedes Video ist per object-cover + leichtem Scale formatfüllend
// (kein Videorahmen sichtbar). Bühne = Off-White + feine Grain-Textur.

const BG = "#f8f7f3";

// Container-Konfiguration (a–k) exakt nach Template — Klasse, Snippet, Parallax-Tiefe.
// speed = vertikale Parallax-Tiefe. Bewusst ruhiger als das Template (× ~0.55),
// damit die Container beim Scrollen nicht so weit driften und oben nicht so schnell
// von der (magenta) Nachbar-Section angeschnitten werden.
const ITEMS = [
  { cls: "k", clip: "clip-11", speed: 0.04, mouse: 0.01, label: "XI" }, // Hero (mittig, hinten)
  { cls: "a", clip: "clip-01", speed: 0.05, mouse: 0.018, label: "I" },
  { cls: "b", clip: "clip-02", speed: 0.11, mouse: 0.03, label: "II" },
  { cls: "c", clip: "clip-03", speed: 0.2, mouse: 0.05, label: "III" },
  { cls: "d", clip: "clip-04", speed: 0.09, mouse: 0.024, label: "IV" },
  { cls: "e", clip: "clip-05", speed: 0.06, mouse: 0.016, label: "V" },
  { cls: "f", clip: "clip-06", speed: 0.25, mouse: 0.06, label: "VI" },
  { cls: "g", clip: "clip-07", speed: 0.16, mouse: 0.04, label: "VII" },
  { cls: "h", clip: "clip-08", speed: 0.29, mouse: 0.068, label: "VIII" },
  { cls: "i", clip: "clip-09", speed: 0.21, mouse: 0.052, label: "IX" },
  { cls: "j", clip: "clip-10", speed: 0.34, mouse: 0.075, label: "X" },
];

export function AlgarveAboutDrift() {
  const root = useRef<HTMLElement>(null);

  // Videos nur abspielen, wenn die Sektion sichtbar ist (spart Decode).
  useEffect(() => {
    const sec = root.current;
    if (!sec) return;
    const vids = Array.from(sec.querySelectorAll<HTMLVideoElement>("video"));
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) vids.forEach((v) => void v.play().catch(() => {}));
        else vids.forEach((v) => v.pause());
      },
      { threshold: 0.05 },
    );
    io.observe(sec);
    return () => io.disconnect();
  }, []);

  // Scroll- + Maus-Parallax (Port des Template-Skripts, nur Desktop/Feinzeiger).
  useEffect(() => {
    const sec = root.current;
    if (!sec) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const els = Array.from(sec.querySelectorAll<HTMLElement>("[data-drift]"));
    const st = els.map(() => ({ scrollY: 0, mx: 0, my: 0 }));
    let ticking = false;
    let raf = 0;
    let curX = 0;
    let curY = 0;
    let lerpX = 0;
    let lerpY = 0;

    const apply = () => {
      els.forEach((el, i) => {
        el.style.transform = `translate(${st[i].mx}px, ${st[i].my + st[i].scrollY}px)`;
      });
    };
    const calcScroll = () => {
      const rect = sec.getBoundingClientRect();
      const offset = window.innerHeight / 2 - (rect.top + rect.height / 2);
      els.forEach((el, i) => {
        st[i].scrollY = offset * (parseFloat(el.dataset.speed || "0.2") || 0.2);
      });
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        calcScroll();
        apply();
        ticking = false;
      });
    };
    const loop = () => {
      lerpX += (curX - lerpX) * 0.07;
      lerpY += (curY - lerpY) * 0.07;
      els.forEach((el, i) => {
        const m = parseFloat(el.dataset.mouse || "0.03") || 0.03;
        st[i].mx = lerpX * m;
        st[i].my = lerpY * m;
      });
      apply();
      if (Math.abs(curX - lerpX) > 0.05 || Math.abs(curY - lerpY) > 0.05 || curX !== 0 || curY !== 0) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };
    const onMove = (e: MouseEvent) => {
      const rect = sec.getBoundingClientRect();
      curX = e.clientX - rect.left - rect.width / 2;
      curY = e.clientY - rect.top - rect.height / 2;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onLeave = () => {
      curX = 0;
      curY = 0;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    calcScroll();
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    sec.addEventListener("mousemove", onMove);
    sec.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("scroll", onScroll);
      sec.removeEventListener("mousemove", onMove);
      sec.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={root} className="drift-section" aria-label="Banijay Entertainment im Bewegtbild">
      <style>{CSS}</style>
      {ITEMS.map((it) => (
        <div key={it.cls} data-drift data-speed={it.speed} data-mouse={it.mouse} className={`float-img float-img--${it.cls}`}>
          <video autoPlay muted loop playsInline poster="/brand/team-poster.jpg">
            <source src={`/video/about-drift/${it.clip}.mp4`} type="video/mp4" />
          </video>
          <span className="float-img__label">{it.label}</span>
        </div>
      ))}
    </section>
  );
}

const CSS = `
.drift-section{position:relative;width:100%;height:124vh;min-height:860px;background:${BG};overflow:hidden}
.drift-section::before{content:'';position:absolute;inset:0;z-index:30;pointer-events:none;opacity:.8;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")}
.float-img{position:absolute;overflow:hidden;will-change:transform;border-radius:12px}
.float-img video{width:100%;height:100%;object-fit:cover;display:block;transform:scale(1.12);will-change:transform}
.float-img__label{position:absolute;bottom:-1.4rem;left:0;font-family:system-ui,sans-serif;font-size:.55rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(14,13,11,.4);white-space:nowrap;pointer-events:none}
.float-img--a{width:190px;height:265px;left:8%;top:20%;z-index:6}
.float-img--b{width:215px;height:138px;left:30%;top:15%;z-index:6}
.float-img--c{width:112px;height:155px;left:19%;top:58%;z-index:6}
.float-img--d{width:142px;height:198px;left:54%;top:16%;z-index:6}
.float-img--e{width:245px;height:158px;left:33%;top:52%;z-index:6}
.float-img--f{width:100px;height:138px;left:73%;top:44%;z-index:6}
.float-img--g{width:155px;height:100px;left:9%;top:70%;z-index:6}
.float-img--h{width:125px;height:172px;left:84%;top:18%;z-index:6}
.float-img--i{width:188px;height:122px;left:61%;top:69%;z-index:6}
.float-img--j{width:108px;height:150px;left:84%;top:55%;z-index:6}
.float-img--k{width:570px;height:795px;left:50%;top:50%;margin-left:-285px;margin-top:-397px;z-index:3}
@media (max-width:992px){
.float-img--a{width:165px;height:230px;left:6%;top:18%}
.float-img--b{width:188px;height:122px;left:28%;top:14%}
.float-img--c{width:98px;height:136px;left:18%;top:58%}
.float-img--d{width:124px;height:172px;left:54%;top:15%}
.float-img--e{width:212px;height:138px;left:31%;top:52%}
.float-img--f{width:88px;height:122px;left:74%;top:44%}
.float-img--g{width:135px;height:88px;left:7%;top:70%}
.float-img--h{width:110px;height:152px;left:85%;top:17%}
.float-img--i{width:165px;height:108px;left:62%;top:69%}
.float-img--j{width:95px;height:132px;left:85%;top:55%}
.float-img--k{width:460px;height:644px;margin-left:-230px;margin-top:-322px}
}
@media (max-width:767px){
.drift-section{height:112vh;min-height:720px}
.float-img--a{width:34vw;height:47vw;left:4%;top:9%}
.float-img--b{width:38vw;height:25vw;left:auto;right:4%;top:7%}
.float-img--c{width:22vw;height:30vw;left:4%;top:54%}
.float-img--d{width:26vw;height:36vw;left:34%;top:8%}
.float-img--e{width:42vw;height:27vw;left:auto;right:4%;top:50%}
.float-img--f{display:none}
.float-img--g{width:28vw;height:18vw;left:4%;top:74%}
.float-img--h{display:none}
.float-img--i{width:34vw;height:22vw;right:4%;top:74%}
.float-img--j{display:none}
.float-img--k{width:72vw;height:100vw;margin-left:-36vw;margin-top:-50vw}
}
@media (max-width:479px){
.float-img--a{width:42vw;height:58vw;left:3%;top:8%}
.float-img--b{width:44vw;height:28vw;right:3%;top:6%}
.float-img--c{width:28vw;height:38vw;left:3%;top:56%}
.float-img--d{width:32vw;height:44vw;left:32%;top:8%}
.float-img--e{width:46vw;height:30vw;right:3%;top:52%}
.float-img--g{width:30vw;height:20vw;left:3%;top:76%}
.float-img--i{width:38vw;height:25vw;right:3%;top:76%}
.float-img--k{width:84vw;height:117vw;margin-left:-42vw;margin-top:-58vw}
}
`;
