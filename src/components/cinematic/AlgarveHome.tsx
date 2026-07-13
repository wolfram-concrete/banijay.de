"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DustLayer } from "./algarve/DustLayer";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// V2-Hero (Umbau 13.07. abends, Wolfram-Diktat):
//  • Master-Quelle ist wieder ein STILL — das rote Glas-B (b-red.jpg) mit
//    radialem Lichthorizont. Außen blurry, die WebGL-Linse rendert innerhalb
//    der D-Kontur das scharfe Bild; beide Ebenen atmen subtil synchron.
//  • Die UNTERE Hero-Kante ist BAUCHIG (radialer Zirkel via clip-path-Ellipse).
//  • Aus diesem Zirkel wandern SATELLITEN-RINGE mittelachsig heraus (gescrubbt)
//    — das Ökosystem-Motiv taucht hier zum ersten Mal auf und leitet zum
//    Statement („kein einzelnes Produktionshaus") über.
//  • H1 „WE ARE BANIJAY." in VERSALIEN, full size (überragt das Brennglas),
//    skaliert nach dem Intro fett auf (Event banijay:introdone).

// V2-Mood: Sections transparent — der globale MoodBackdrop (layout.tsx) scheint durch.
const SECTION_BG = "transparent";

export function AlgarveHome() {
  const root = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const heroImg = useRef<HTMLImageElement>(null);
  const orbitZone = useRef<HTMLDivElement>(null);
  const heroSection = useRef<HTMLElement>(null);
  const contour = useRef<HTMLDivElement>(null);
  // Kurven-Fortschritt 0..1 (13.07.): Hero startet GERADE, die radiale Kurve
  // formt sich erst beim Scrollen — geteilt zwischen Scroll-Handler (useGSAP)
  // und Linsen-Shader (uRR im draw-Loop).
  const curveP = useRef(0);

  // BRENNGLAS-LINSE als WebGL-Shader: Distanzfeld (SDF) der D-Kontur →
  // pro Pixel lokale Kanten-NORMALE. Die Brechung verschiebt das Sample entlang
  // dieser Normale (folgt also auch der großen rechten Kurve RADIAL) und läuft
  // über eine smoothstep-Feder weich nach innen aus — keine harte Innenkante.
  // Der Shader sampelt das MASTER-Video direkt (keine Video-Kopien, kein Sync).
  const lensCanvas = useRef<HTMLCanvasElement>(null);
  const lensBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = lensCanvas.current;
    const box = lensBox.current;
    const img = heroImg.current;
    const section = canvas?.parentElement as HTMLElement | null;
    if (!canvas || !box || !img || !section) return;
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true });
    if (!gl) {
      // Fallback ohne WebGL: Hintergrund scharf lassen statt komplett verschwommen
      img.style.filter = "none";
      canvas.style.display = "none";
      return;
    }

    const VERT = `attribute vec2 aPos; varying vec2 vUv; void main(){ vUv = aPos*0.5+0.5; gl_Position = vec4(aPos,0.,1.); }`;
    const FRAG = `precision mediump float;
      varying vec2 vUv;
      uniform sampler2D uTex;
      uniform vec2 uRes;   // Canvas px
      uniform vec2 uC;     // Linsen-Zentrum px (y-down)
      uniform vec2 uH;     // Halbmaße px
      uniform float uRL;   // Radius OBEN (27px * dpr) — 90°-Kippung 13.07.
      uniform float uRR;   // Radius UNTEN (Pill = Halbbreite)
      uniform float uBand; // Feder-Breite der Kantenzone px
      uniform float uDisp; // max. Brechungs-Versatz px
      uniform vec2 uVid;   // Bild-Pixelmaße
      uniform float uZoom; // Subtil-Zoom (synchron zum CSS-Zoom des Backdrops)
      uniform vec2 uOff;   // perspektivischer Versatz (Maus-Parallaxe, px)

      float sd(vec2 p){
        // 90° nach rechts gekippt (13.07.): Pill-Rundung liegt UNTEN (y-basiert)
        float r = (p.y > uC.y) ? uRR : uRL;
        vec2 q = abs(p - uC) - uH + vec2(r);
        return min(max(q.x, q.y), 0.0) + length(max(q, vec2(0.0))) - r;
      }
      vec2 cover(vec2 px){
        // FOKUS OBEN (13.07. v2): 30% groesser, voll nach OBEN geschoben
        // (Bottom-Bias 1.0) — das Motiv (B + Horizont) sitzt im oberen
        // Hero-Bereich, der Himmel wird komplett gecroppt.
        float sc = max(uRes.x / uVid.x, uRes.y / uVid.y) * 1.3;
        vec2 disp = uVid * sc;
        vec2 off = vec2((uRes.x - disp.x) * 0.5, (uRes.y - disp.y) * 1.0);
        vec2 uv = (px - off) / disp;
        // Zoom um die Bildmitte (Sample-Fenster schrumpft -> Bild waechst)
        return (uv - 0.5) / uZoom + 0.5;
      }
      void main(){
        vec2 px = vec2(vUv.x, 1.0 - vUv.y) * uRes; // y-down wie DOM
        float d = sd(px);
        float alpha = 1.0 - smoothstep(-1.5, 1.5, d); // weiche Außenkante (AA)
        if (alpha <= 0.003) discard;
        float e = 2.0;
        vec2 n = vec2(sd(px + vec2(e,0.)) - sd(px - vec2(e,0.)), sd(px + vec2(0.,e)) - sd(px - vec2(0.,e)));
        n = normalize(n + vec2(1e-5));
        // Brechungs-Profil: 1 an der Kante -> 0 in Band-Tiefe, weich gefedert
        float k = 1.0 - smoothstep(0.0, uBand, -d);
        k = pow(clamp(k, 0.0, 1.0), 1.7);
        // Sample wandert entlang der LOKALEN Normale + leichter perspektivischer
        // Versatz der Bildmitte (Maus-Parallaxe, v3)
        vec2 sp = px - n * (k * uDisp) + uOff;
        vec2 uv = cover(sp);
        vec3 col = texture2D(uTex, uv).rgb;
        // Kanten-Unschärfe proportional zur Brechung (5-Tap)
        vec2 duv = vec2(k * 3.5) / uRes;
        vec3 blur = (texture2D(uTex, uv + vec2(duv.x, 0.)).rgb + texture2D(uTex, uv - vec2(duv.x, 0.)).rgb
                   + texture2D(uTex, uv + vec2(0., duv.y)).rgb + texture2D(uTex, uv - vec2(0., duv.y)).rgb) * 0.25;
        col = mix(col, blur, k * 0.8);
        col *= 1.0 + k * 0.09; // die Kante faengt etwas Licht
        gl_FragColor = vec4(col * alpha, alpha);
      }`;

    const mk = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, mk(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, mk(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    const U = (n: string) => gl.getUniformLocation(prog, n);

    let raf = 0;
    let visible = true;
    let hxCur = 0; // Halbbreite (px) — Basis für den animierten Pill-Radius
    const dprOf = () => Math.min(devicePixelRatio || 1, 2);

    const resize = () => {
      const dpr = dprOf();
      const sw = section.clientWidth, sh = section.clientHeight;
      canvas.width = Math.round(sw * dpr);
      canvas.height = Math.round(sh * dpr);
      canvas.style.width = sw + "px";
      canvas.style.height = sh + "px";
      const sr = section.getBoundingClientRect();
      const br = box.getBoundingClientRect();
      const cx = (br.left - sr.left + br.width / 2) * dpr;
      const cy = (br.top - sr.top + br.height / 2) * dpr;
      const hx = (br.width / 2) * dpr;
      const hy = (br.height / 2) * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(U("uRes"), canvas.width, canvas.height);
      gl.uniform2f(U("uC"), cx, cy);
      gl.uniform2f(U("uH"), hx, hy);
      gl.uniform1f(U("uRL"), 1); // OBEN eckig (full-size, v3)
      hxCur = hx; // UNTEN = Pill (Halbbreite) × Kurven-Fortschritt (im draw-Loop)
      gl.uniform1f(U("uBand"), 120 * dpr); // Feder-Tiefe der Kantenzone
      gl.uniform1f(U("uDisp"), 30 * dpr); // max. Brechungs-Versatz
    };

    // STILL als Master-Quelle (13.07. abends): Bild EINMAL in die Textur.
    let uploaded = false;
    const upload = () => {
      if (uploaded || !img.complete || !img.naturalWidth) return;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.uniform2f(U("uVid"), img.naturalWidth, img.naturalHeight);
      uploaded = true;
    };
    upload();
    img.addEventListener("load", upload);

    // Subtil-Zoom (26s-Atmung): Basis 1.015 lässt Rand-Reserve für die
    // Parallaxe. Dazu der PERSPEKTIVISCHE VERSATZ (v3): die Bildmitte folgt
    // träge der Maus (uOff im Shader) — leichter Tiefen-Eindruck im Glas.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const zoomAt = (now: number) => (reduce ? 1.015 : 1.015 + 0.045 * (0.5 - 0.5 * Math.cos(((now % 26000) / 26000) * Math.PI * 2)));
    const mouse = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    const draw = (now: number) => {
      if (visible && uploaded) {
        const dpr = dprOf();
        const z = zoomAt(now);
        eased.x += (mouse.x - eased.x) * 0.04;
        eased.y += (mouse.y - eased.y) * 0.04;
        img.style.transform = `scale(${(1.05 * z).toFixed(4)}) translate(${(-eased.x * 10).toFixed(1)}px, ${(-eased.y * 6).toFixed(1)}px)`;
        gl.uniform1f(U("uZoom"), z);
        // Kurven-Formung: der untere Pill-Radius wächst mit dem Scroll (0 → 50vw)
        gl.uniform1f(U("uRR"), Math.max(1, hxCur * curveP.current));
        gl.uniform2f(U("uOff"), reduce ? 0 : eased.x * 26 * dpr, reduce ? 0 : eased.y * 16 * dpr);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    const ro = new ResizeObserver(resize);
    ro.observe(section);
    ro.observe(box);
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting), { threshold: 0.02 });
    io.observe(section);
    return () => {
      cancelAnimationFrame(raf);
      img.removeEventListener("load", upload);
      window.removeEventListener("mousemove", onMouse);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // KURVEN-FORMUNG (13.07.): der Hero startet unten GERADE. Erst beim
      // Scrollen über den Above-the-fold-Bereich formt sich die radiale Kurve
      // (Section-Radius, Zirkel-Kontur, Linsen-Pill im Shader — ein Wert).
      const applyCurve = (v: number) => {
        curveP.current = v;
        const r = (v * 50).toFixed(2);
        if (heroSection.current) heroSection.current.style.borderRadius = `0 0 ${r}vw ${r}vw`;
        if (contour.current) {
          contour.current.style.opacity = String(v);
          contour.current.style.borderRadius = `0 0 ${r}vw ${r}vw`;
        }
        if (lensBox.current) {
          const px = Math.round(v * 999);
          lensBox.current.style.borderRadius = `0 0 ${px}px ${px}px`;
        }
      };
      if (reduce) {
        applyCurve(1);
        return;
      }
      applyCurve(0);
      ScrollTrigger.create({
        trigger: heroSection.current,
        start: "top top",
        end: "70% top",
        scrub: 0.6,
        onUpdate: (self) => applyCurve(self.progress),
      });

      // Hero-Einfahrt — EXAKT nach Original-Timeline t-0eeba58c (Load, Delay 1.2s).
      // Obere Wörter (We/are): echter 3D-Roll-Flip, bei dem Front- und Back-Ebene
      // GETRENNT animiert werden — die sichtbare Front rollt hoch und weg
      // (yPercent -100 / rotateX 90°), die deckungsgleiche Back-Ebene rollt aus
      // ihrer Ruhelage (translateY 100% / rotateX -90°) in die finale Lage
      // (0/0). NICHT der gemeinsame Wrapper. Untere „BANIJAY"-Slices: kleines
      // Settle von oben (is-second -3vw, is-third -8vw, is-last -15vw → 0),
      // gleichzeitig ab Position .68; die oberste Slice (is-first) bleibt ruhig.
      // Startlagen über GSAP normalisieren (überschreibt die inline CSS-Ruhelage
      // translateY(100%)/rotateX(-90) sauber) — sonst parst GSAP die 100% aus dem
      // computed Style als px-Baseline und vermischt sie mit dem yPercent-Tween,
      // wodurch die Back-Ebene vertikal auf 100% hängen bliebe.
      // Hintergrund-Video/Bild blendet ruhig ein. KEINE Hero-Intro-Headline
      // mehr (Wolfram 13.07.): der Hero ist above the fold full size nur das
      // B-Visual — die Headline kommt als Marquee erst beim Scrollen (unten).
      gsap.fromTo("[data-hero-vid]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.6, ease: "power2.out" });
      // Die H1-Animation startet ERST, wenn der Preloader-Übergang vollständig
      // abgeschlossen ist — das Event „banijay:introdone" feuert im onComplete NACH
      // dem Cutout-Aufziehen. Fallback nach 5s, falls kein Preloader läuft.
      // Kein Preloader mehr → die H1-Animation startet kurz nach dem Mount. (Das
      // introdone-Event bleibt als Kompatibilität erhalten, falls doch ein Intro läuft.)
      // Vorlaufzeit, damit das Video erst „anläuft", bevor die Typo hereinkommt.
      // SATELLITEN-RINGE (v2): identische Kurven-Kopien FÄCHERN aus der Zirkel-
      // Kontur nach unten auf — gescrubbt beim Scrollen Richtung Statement.
      // Kein Scale (Radius bleibt gleich!), nur der Scheitel wandert (attr cy).
      // ÜBERGANGSZONE (v6, Career-Referenz): erst NACHDEM sich die Kurve
      // geformt hat, swiped der MAGENTA-Titel „WE ARE BANIJAY" von links nach
      // rechts über den dunklen Staub-Grund, DANN fächern die weißen
      // Planetenringe (gleichradig) auf. Danach folgt das Statement.
      const fan = gsap.timeline({
        scrollTrigger: { trigger: orbitZone.current, start: "top 60%", end: "bottom 35%", scrub: 0.7 },
      });
      // Titel-Marquee blendet ein (die Endlos-Bewegung läuft per CSS)
      gsap.set("[data-hero-marquee]", { autoAlpha: 0 });
      fan.to("[data-hero-marquee]", { autoAlpha: 1, ease: "power2.out", duration: 0.8 }, 0.1);
      // Planetenringe: gleichradig, mittelachsig, fächern gestaffelt nach unten
      const rings = gsap.utils.toArray<SVGCircleElement>("[data-hero-ring]");
      gsap.set(rings, { autoAlpha: 0 });
      rings.forEach((ring, i) => {
        const top = Number(ring.dataset.top);
        fan.to(ring, { attr: { cy: top - 800 }, autoAlpha: 1, duration: 1.1, ease: "power2.out" }, 0.5 + i * 0.16);
      });
      // Magenta-Punkte: erscheinen + kreisen ERST, wenn ihr Ring VOLLSTÄNDIG
      // eingeblendet ist (Wolfram 13.07.). Die Kreis-Bahn läuft per rAF, aber
      // der Punkt bleibt unsichtbar, bis das Ende seines Ring-Fades im fan-TL
      // erreicht ist. Ring-Zuordnung über center (= ring.top − 800).
      const ringTops = rings.map((r) => Number(r.dataset.top));
      gsap.utils.toArray<SVGCircleElement>("[data-hero-ringdot]").forEach((dot) => {
        const center = Number(dot.dataset.center);
        const ringTop = center + 800;
        const ringIdx = ringTops.indexOf(ringTop);
        // Ring-Fade beginnt bei 0.5 + i*0.16 (dur 1.1) → Punkt erst am Ende sichtbar
        const ringEnd = 0.5 + (ringIdx >= 0 ? ringIdx : 0) * 0.16 + 1.1;
        gsap.set(dot, { autoAlpha: 0 });
        fan.to(dot, { autoAlpha: 1, duration: 0.25, ease: "power1.out" }, ringEnd);

        const amp = (Number(dot.dataset.amp) * Math.PI) / 180;
        const phase = Number(dot.dataset.phase) * Math.PI * 2;
        const proxy = { p: phase };
        gsap.to(proxy, {
          p: phase + Math.PI * 2,
          duration: Number(dot.dataset.dur),
          ease: "none",
          repeat: -1,
          onUpdate: () => {
            const a = Math.PI / 2 + amp * Math.sin(proxy.p);
            gsap.set(dot, { attr: { cx: 800 + 800 * Math.cos(a), cy: center + 800 * Math.sin(a) } });
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} style={{ background: SECTION_BG }}>
      {/* ── Hero-Text-Sektion ─────────────────────────────────────────── */}
      {/* Video full-bleed (auch hinter der fixen Nav). Weiße Typo direkt darüber,
          kein Wash. paddingTop hält WE/ARE frei unter der überlagernden Nav. */}
      {/* overflow-HIDDEN statt -clip (13.07.): clip ignoriert border-radius —
          das Hero-Bild war außerhalb der radialen Kontur sichtbar. hidden
          schneidet exakt entlang der (animierten) Rundung. */}
      <section
        ref={heroSection}
        className="relative z-[2] flex min-h-[120vh] flex-col overflow-hidden max-[479px]:!min-h-screen max-[479px]:!pb-[11vw]"
        style={{
          background: "transparent",
          paddingTop: "6.5rem",
          paddingBottom: "13vh",
          // START: GERADE Unterkante (13.07.) — die radiale 50vw-Kurve formt
          // sich erst beim Scrollen (applyCurve im useGSAP, ein Wert für
          // Section, Zirkel-Kontur und Linsen-Pill im Shader). z-2 > Übergangs-
          // zone (z-1) → das Brennglas überlagert die obere Marquee-Hälfte.
          borderRadius: "0",
        }}
      >
        {/* Hintergrund: das rote Glas-B FULLSCREEN — AUSSERHALB des Brennglases
            soft-blurry (CSS-filter; leichtes Upscale versteckt die Blur-Ränder).
            Der Subtil-Zoom kommt aus dem Linsen-rAF (synchron mit uZoom). */}
        <img
          ref={heroImg}
          data-hero-vid
          src="/hero-v2/b-red.jpg"
          alt=""
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          style={{ filter: "blur(16px) saturate(1.05) brightness(0.92)", transform: "scale(1.05)", objectPosition: "50% 100%" }}
        />

        {/* FOKUS OBEN: das Bild softet im Container nach unten dunkel ab */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ zIndex: 1, background: "linear-gradient(180deg, rgba(10,2,8,0) 42%, rgba(10,2,8,0.55) 72%, rgba(10,2,8,0.92) 100%)" }}
        />

        {/* ZIRKEL-KONTUR: feine Lichtlinie exakt auf der radialen Unterkante
            (folgt via borderRadius derselben 50vw-Geometrie) — Ring „0" des
            Systems, die Satelliten-Ringe darunter setzen sie fort. */}
        <div
          ref={contour}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{
            zIndex: 2,
            height: "50vw",
            opacity: 0, // blendet mit der Kurven-Formung ein (applyCurve)
            borderRadius: "0",
            boxShadow: "inset 0 -1px 0 rgba(248,247,243,0.25)",
          }}
        />

        {/* BRENNGLAS-LINSE (Figma 48:1375): WebGL-Shader rendert innerhalb der
            D-Kontur das SCHARFE Video; an der Kante bricht die Perspektive radial
            entlang der lokalen Kontur-Normale (SDF) und läuft weich nach innen
            aus. Bewusste Kunden-Ausnahme der Keine-Rundungen-Regel (b-Element). */}
        <canvas ref={lensCanvas} data-hero-vid aria-hidden className="pointer-events-none absolute inset-0" />
        {/* Mess-Element für die Linsen-Geometrie + feine Licht-Säume an der Kante */}
        <div
          ref={lensBox}
          data-hero-vid
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            // FULL SIZE (v3): das Brennglas füllt den kompletten Hero — kein
            // Abstand zum äußeren Bereich. Die Pill-Rundung unten (999px →
            // clamp auf 50vw) IST die radiale Hero-Form; ihr Radius ist die
            // Basis der Satelliten-Ringe.
            inset: "0",
            borderRadius: "0", // Pill formt sich mit der Kurve (applyCurve)
            boxShadow: "inset 0 0 4px rgba(255,255,255,0.2), inset 0 0 30px rgba(255,255,255,0.05), inset 0 1px 1px rgba(255,255,255,0.24)",
          }}
        />
        {/* KEINE Intro-Headline mehr im Hero (13.07.): above the fold nur das
            B-Visual full size. Die Headline erscheint als Marquee beim Scrollen
            (unten in der Übergangszone), sobald sich der Radius formt. */}
        <div ref={content} className="relative flex flex-1 flex-col" style={{ zIndex: 2, paddingLeft: "2vw", paddingRight: "2vw" }} />
      </section>

      {/* ── ÜBERGANGSZONE (Wolfram 13.07. v6, Career-Referenz): dunkler
          Staub-Grund; der MAGENTA-Titel „WE ARE BANIJAY" swiped von links nach
          rechts; aus der radialen Hero-Kante fächern 3–4 gleichradige weiße
          Planetenringe auf, auf denen je ein kleiner Magenta-Punkt kreist.
          Im Hintergrund der Sternenstaub. Danach (via DustStage-Veil) folgt
          folgt (via DustStage-Veil) das Statement. */}
      <div ref={orbitZone} aria-hidden className="pointer-events-none relative z-[1] overflow-visible" style={{ height: "78vh", marginTop: "-3vh" }}>
        {/* Sternenstaub-Hintergrund */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            maskImage: "linear-gradient(180deg, transparent 0%, black 20%, black 100%)",
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 20%, black 100%)",
          }}
        >
          <DustLayer boost={0.85} center={{ x: 0.5, y: 0.1 }} radius={0.8} />
        </div>

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 780" preserveAspectRatio="xMidYMid slice" fill="none">
          {/* PLANETENRINGE: gleichradig (r=800), mittelachsig (cx=800), Bögen
              öffnen nach UNTEN (cy = Scheitel − 800) und fächern gestaffelt auf
              dem dunklen Staub-Grund auf (weiße Linien, wie in der Referenz). */}
          {[
            { top: 190, alpha: 0.5 },
            { top: 300, alpha: 0.4 },
            { top: 420, alpha: 0.3 },
            { top: 550, alpha: 0.22 },
          ].map((ring, i) => (
            <circle
              key={`ring${i}`}
              data-hero-ring
              data-top={ring.top}
              cx={800}
              cy={190 - 800}
              r={800}
              stroke={`rgba(248,247,243,${ring.alpha})`}
              strokeWidth={1.4}
            />
          ))}
          {/* Je Ring ein kreisender Magenta-Punkt (Scheitel unten ± Amplitude) */}
          {[
            { top: 300, amp: 20, dur: 30, phase: 0.15, r: 6 },
            { top: 420, amp: 26, dur: 42, phase: 0.6, r: 5 },
            { top: 550, amp: 22, dur: 54, phase: 0.35, r: 5.5 },
          ].map((d, i) => (
            <circle
              key={`dot${i}`}
              data-hero-ringdot
              data-center={d.top - 800}
              data-amp={d.amp}
              data-dur={d.dur}
              data-phase={d.phase}
              cx={800}
              cy={d.top}
              r={d.r}
              fill="#ff4370"
              style={{ filter: "drop-shadow(0 0 8px #ff4370)" }}
            />
          ))}
        </svg>

        {/* TITEL-MARQUEE: „WE ARE BANIJAY" FULL SIZE (breiter als der Screen),
            läuft endlos von RECHTS nach LINKS. Sitzt mit der Mittelachse GENAU
            auf der Hero-Unterkante (translateY -50%) → die OBERE HÄLFTE liegt
            hinter dem Brennglas (Hero z-2 überlagert), die untere Hälfte ist
            sichtbar. Magenta, überragt den Screen. */}
        <div
          data-hero-marquee
          aria-hidden
          className="pointer-events-none absolute inset-x-0 overflow-hidden"
          style={{ top: "0", transform: "translateY(-62%)", zIndex: 1 }}
        >
          <div className="hero-title-marquee">
            {[0, 1].map((dup) => (
              <span
                key={dup}
                className="whitespace-nowrap uppercase"
                // Anton = bolderer Display-Schnitt (Wolfram 13.07.), kein „·"-Trenner
                style={{ fontFamily: "var(--font-anton), sans-serif", fontWeight: 400, fontSize: "clamp(5rem, 20vw, 30rem)", lineHeight: 0.9, letterSpacing: "0", color: "#ff4370", paddingRight: "0.5em" }}
              >
                We Are Banijay&nbsp;&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
