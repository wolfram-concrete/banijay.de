"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DustLayer } from "./algarve/DustLayer";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// V2-Hero (Umbau 13.07. v8, Wolfram-Diktat):
//  • Der Hero ist zweilagig: OBEN das Brennglas (WebGL-Linse), das ein
//    KOMPOSIT aus dem roten Glas-B (Motiv) UND der Headline „WE ARE BANIJAY"
//    bricht — die Buchstaben sind INNERHALB der Linse gebrochen sichtbar.
//  • Dahinter (außerhalb der Linse) liegt dasselbe B-Motiv soft-blurry als
//    Background — Linse und Background laufen SYNCHRON (dieselbe Quelle).
//  • Das B-Motiv softet nach unten aus; DARUNTER gibt es keinen Bildgrund mehr,
//    die Schrift steht dort auf dem Sternenstaub-Hintergrund.
//  • Die Headline ist ab dem ersten Laden unten sichtbar und WANDERT beim
//    Scrollen (scroll-getrieben) — der obere Teil läuft dabei in die Linse und
//    wird gebrochen, der untere Teil steht auf dem Staub.
//  • Die UNTERE Linsenkante ist bauchig (radiale Kurve, formt sich beim Scroll);
//    aus ihr wandern magenta Satellitenringe heraus (Übergangszone unten).

const SECTION_BG = "transparent";
const COPY = "WE ARE BANIJAY  "; // Headline-Einheit (Em-Spaces = Lücke)

export function AlgarveHome() {
  const root = useRef<HTMLDivElement>(null);
  const heroImg = useRef<HTMLImageElement>(null);
  const orbitZone = useRef<HTMLDivElement>(null);
  const heroSection = useRef<HTMLElement>(null);
  const contour = useRef<HTMLDivElement>(null);
  const marqueeTrack = useRef<HTMLDivElement>(null);
  // Kurven-Fortschritt 0..1: Hero startet unten GERADE, die radiale Kurve formt
  // sich beim Scrollen (Section-Radius + Linsen-Pill im Shader, ein Wert).
  const curveP = useRef(0);

  const lensCanvas = useRef<HTMLCanvasElement>(null);
  const lensBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = lensCanvas.current;
    const box = lensBox.current;
    const img = heroImg.current;
    const section = canvas?.parentElement as HTMLElement | null;
    const track = marqueeTrack.current;
    if (!canvas || !box || !img || !section || !track) return;
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true });
    if (!gl) {
      canvas.style.display = "none";
      return;
    }

    const VERT = `attribute vec2 aPos; varying vec2 vUv; void main(){ vUv = aPos*0.5+0.5; gl_Position = vec4(aPos,0.,1.); }`;
    // Der Shader sampelt eine SCREEN-SPACE-Textur (Motiv-Komposit: B + Schrift),
    // Mapping ist 1:1 (uv = px/uRes) — dadurch liegt die gebrochene Schrift in
    // der Linse deckungsgleich über der DOM-Schrift unterhalb der Linse.
    const FRAG = `precision mediump float;
      varying vec2 vUv;
      uniform sampler2D uTex;
      uniform vec2 uRes;   // Canvas px
      uniform vec2 uC;     // Linsen-Zentrum px (y-down)
      uniform vec2 uH;     // Halbmaße px
      uniform float uRL;   // Radius OBEN
      uniform float uRR;   // Radius UNTEN (Pill = Halbbreite × curveP)
      uniform float uBand; // Feder-Breite der Kantenzone px
      uniform float uDisp; // max. Brechungs-Versatz px

      float sd(vec2 p){
        float r = (p.y > uC.y) ? uRR : uRL;
        vec2 q = abs(p - uC) - uH + vec2(r);
        return min(max(q.x, q.y), 0.0) + length(max(q, vec2(0.0))) - r;
      }
      void main(){
        vec2 px = vec2(vUv.x, 1.0 - vUv.y) * uRes; // y-down wie DOM
        float d = sd(px);
        float alpha = 1.0 - smoothstep(-1.5, 1.5, d);
        if (alpha <= 0.003) discard;
        float e = 2.0;
        vec2 n = vec2(sd(px + vec2(e,0.)) - sd(px - vec2(e,0.)), sd(px + vec2(0.,e)) - sd(px - vec2(0.,e)));
        n = normalize(n + vec2(1e-5));
        float k = 1.0 - smoothstep(0.0, uBand, -d);
        k = pow(clamp(k, 0.0, 1.0), 1.7);
        vec2 sp = px - n * (k * uDisp);
        vec2 uv = sp / uRes; // 1:1 Screen-Space
        vec3 col = texture2D(uTex, uv).rgb;
        vec2 duv = vec2(k * 3.5) / uRes;
        vec3 blur = (texture2D(uTex, uv + vec2(duv.x, 0.)).rgb + texture2D(uTex, uv - vec2(duv.x, 0.)).rgb
                   + texture2D(uTex, uv + vec2(0., duv.y)).rgb + texture2D(uTex, uv - vec2(0., duv.y)).rgb) * 0.25;
        col = mix(col, blur, k * 0.8);
        col *= 1.0 + k * 0.09;
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

    // MOTIV-KOMPOSIT (2D-Canvas): das scharfe B + die Headline werden hier
    // screen-space zusammengezeichnet und als Linsen-Textur hochgeladen.
    const motif = document.createElement("canvas");
    const mctx = motif.getContext("2d")!;
    const dprOf = () => Math.min(devicePixelRatio || 1, 2);

    let raf = 0;
    let visible = true;
    let hxCur = 0;
    let cssW = 0, cssH = 0, fontPx = 0, baseY = 0, copyW = 1;
    let fontReady = false;
    let lastX = NaN;

    const resize = () => {
      const dpr = dprOf();
      cssW = section.clientWidth;
      cssH = section.clientHeight;
      canvas.width = motif.width = Math.round(cssW * dpr);
      canvas.height = motif.height = Math.round(cssH * dpr);
      canvas.style.width = cssW + "px";
      canvas.style.height = cssH + "px";
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
      gl.uniform1f(U("uRL"), 1);
      hxCur = hx;
      gl.uniform1f(U("uBand"), 120 * dpr);
      gl.uniform1f(U("uDisp"), 30 * dpr);
      // Typo-Maße 1:1 zur DOM-Marquee (clamp(5rem,20vw,30rem), bottom 4vh)
      fontPx = Math.max(80, Math.min(0.2 * cssW, 480));
      baseY = cssH - 0.04 * window.innerHeight - fontPx * 0.14;
      mctx.font = `400 ${fontPx * dpr}px "Anton", sans-serif`;
      copyW = mctx.measureText(COPY).width / dpr;
      lastX = NaN; // Neuzeichnen erzwingen
    };

    const drawMotif = (xpx: number) => {
      const dpr = dprOf();
      mctx.clearRect(0, 0, motif.width, motif.height);
      // ① scharfes B-Motiv, cover-fit (leichtes Upscale), vertikal zentriert
      if (img.complete && img.naturalWidth) {
        const sc = Math.max(motif.width / img.naturalWidth, motif.height / img.naturalHeight) * 1.25;
        const dw = img.naturalWidth * sc, dh = img.naturalHeight * sc;
        mctx.drawImage(img, (motif.width - dw) / 2, (motif.height - dh) * 0.42, dw, dh);
      }
      // ② Headline in Magenta, screen-space, an derselben Position wie die DOM-Schrift
      mctx.font = `400 ${fontPx * dpr}px "Anton", sans-serif`;
      mctx.fillStyle = "#ff4370";
      mctx.textBaseline = "alphabetic";
      mctx.textAlign = "left";
      const cw = copyW * dpr;
      let x = (xpx * dpr) % cw;
      if (x > 0) x -= cw;
      for (; x < motif.width + cw; x += cw) mctx.fillText(COPY, x, baseY * dpr);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, motif);
    };

    const draw = () => {
      if (visible) {
        const dpr = dprOf();
        // Marquee scroll-getrieben: über den Hero-Scroll wandert die Schrift um
        // eine Kopie-Breite nach links; steht bei Scroll 0 still.
        const heroH = section.clientHeight;
        const prog = Math.max(0, Math.min(1, (window.scrollY || 0) / heroH));
        const xpx = -prog * copyW;
        track.style.transform = `translateX(${xpx.toFixed(2)}px)`;
        if (fontReady && Math.abs(xpx - lastX) > 0.4) {
          drawMotif(xpx);
          lastX = xpx;
        }
        gl.uniform1f(U("uRR"), Math.max(1, hxCur * curveP.current));
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    // Font laden, dann initial zeichnen (sonst backt der erste Frame Fallback-Font)
    const startFonts = () => {
      fontReady = true;
      lastX = NaN;
      drawMotif(0);
    };
    if ((document as unknown as { fonts?: FontFaceSet }).fonts) {
      document.fonts.load(`400 100px "Anton"`).then(() => document.fonts.ready).then(startFonts).catch(startFonts);
    } else {
      startFonts();
    }
    img.addEventListener("load", () => drawMotif(lastX || 0));
    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(section);
    ro.observe(box);
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting), { threshold: 0.02 });
    io.observe(section);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
      } else {
        applyCurve(0);
        ScrollTrigger.create({
          trigger: heroSection.current,
          start: "top top",
          end: "70% top",
          scrub: 0.6,
          onUpdate: (self) => applyCurve(self.progress),
        });
      }

      // ÜBERGANGSZONE: aus der radialen Linsenkante fächern magenta Satelliten-
      // ringe auf; jeder Ring trägt einen kreisenden Magenta-Punkt (erst sichtbar,
      // wenn sein Ring vollständig eingeblendet ist). Danach der Magenta-Übergang.
      const fan = gsap.timeline({
        scrollTrigger: { trigger: orbitZone.current, start: "top 60%", end: "bottom 35%", scrub: 0.7 },
      });
      const rings = gsap.utils.toArray<SVGCircleElement>("[data-hero-ring]");
      gsap.set(rings, { autoAlpha: 0 });
      rings.forEach((ring, i) => {
        const top = Number(ring.dataset.top);
        fan.to(ring, { attr: { cy: top - 800 }, autoAlpha: 1, duration: 1.1, ease: "power2.out" }, 0.5 + i * 0.16);
      });
      const ringTops = rings.map((r) => Number(r.dataset.top));
      gsap.utils.toArray<SVGCircleElement>("[data-hero-ringdot]").forEach((dot) => {
        const center = Number(dot.dataset.center);
        const ringTop = center + 800;
        const ringIdx = ringTops.indexOf(ringTop);
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
      {/* ── ZWEI-LAGEN-HERO ───────────────────────────────────────────────── */}
      <section
        ref={heroSection}
        className="relative z-[2] flex min-h-screen flex-col overflow-visible max-[479px]:!pb-[11vw]"
        style={{ background: "transparent", paddingTop: "6.5rem" }}
      >
        {/* STERNENSTAUB-Grund des Heros — die Schrift steht (unterhalb der Linse)
            auf diesem Staub (Wolfram 13.07.). */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ zIndex: 0 }}
        >
          <DustLayer boost={0.8} center={{ x: 0.5, y: 0.62 }} radius={0.85} />
        </div>

        {/* B-MOTIV als soft-blurry Background (dieselbe Quelle wie die Linse →
            beide laufen synchron). Softet nach unten aus → darunter nur Staub.
            Gleichzeitig TEXTUR-Quelle der Linse (scharfe Pixel via drawImage). */}
        <img
          ref={heroImg}
          src="/hero-v2/b-red.jpg"
          alt=""
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          style={{
            zIndex: 0,
            filter: "blur(20px) saturate(1.05) brightness(0.9)",
            transform: "scale(1.06)",
            objectPosition: "50% 30%",
            maskImage: "linear-gradient(180deg, #000 0%, #000 42%, rgba(0,0,0,0.55) 60%, transparent 76%)",
            WebkitMaskImage: "linear-gradient(180deg, #000 0%, #000 42%, rgba(0,0,0,0.55) 60%, transparent 76%)",
          }}
        />

        {/* HEADLINE-LAYER (z-1) — steht VOR dem Bild. Im Bereich der Linse (z-2)
            wird sie vom Canvas überdeckt und dort GEBROCHEN aus der Textur
            gezeigt; unterhalb der Linse steht sie frei auf dem Staub. */}
        <div
          data-hero-marquee
          aria-hidden
          className="pointer-events-none absolute inset-x-0 overflow-hidden"
          style={{ bottom: "4vh", zIndex: 1 }}
        >
          <div ref={marqueeTrack} className="flex w-max" style={{ willChange: "transform" }}>
            <span
              className="whitespace-nowrap uppercase"
              style={{ fontFamily: "var(--font-anton), sans-serif", fontWeight: 400, fontSize: "clamp(5rem, 20vw, 30rem)", lineHeight: 0.9, letterSpacing: "0", color: "#ff4370" }}
            >
              WE ARE BANIJAY&emsp;&emsp;WE ARE BANIJAY&emsp;&emsp;
            </span>
          </div>
        </div>

        {/* ZIRKEL-KONTUR auf der radialen Linsen-Unterkante */}
        <div
          ref={contour}
          aria-hidden
          className="pointer-events-none absolute inset-x-0"
          style={{ zIndex: 2, bottom: "26vh", height: "50vw", opacity: 0, borderRadius: "0", boxShadow: "inset 0 -1px 0 rgba(248,247,243,0.25)" }}
        />

        {/* BRENNGLAS-LINSE (z-2, oberer Layer): bricht das Kompositmotiv (B +
            Buchstaben). Außerhalb der Form transparent → dort scheint der
            Background/Staub + die freie Schrift durch. */}
        <canvas ref={lensCanvas} aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 2 }} />
        <div
          ref={lensBox}
          aria-hidden
          className="pointer-events-none absolute"
          style={{ top: 0, left: 0, right: 0, bottom: "26vh", zIndex: 2, borderRadius: "0", boxShadow: "inset 0 0 4px rgba(255,255,255,0.2), inset 0 0 30px rgba(255,255,255,0.05), inset 0 1px 1px rgba(255,255,255,0.24)" }}
        />
      </section>

      {/* ── ÜBERGANGSZONE: magenta Satellitenringe + Magenta-Übergang ──────── */}
      <div ref={orbitZone} aria-hidden className="pointer-events-none relative z-[1] overflow-visible" style={{ height: "78vh", marginTop: "-3vh" }}>
        <div
          className="absolute inset-0 opacity-70"
          style={{ maskImage: "linear-gradient(180deg, transparent 0%, black 20%, black 100%)", WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 20%, black 100%)" }}
        >
          <DustLayer boost={0.85} center={{ x: 0.5, y: 0.1 }} radius={0.8} />
        </div>

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 780" preserveAspectRatio="xMidYMid slice" fill="none">
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
              stroke={`rgba(255,67,112,${Math.min(1, ring.alpha + 0.25)})`}
              strokeWidth={1.6}
              style={{ filter: "drop-shadow(0 0 6px rgba(255,67,112,0.55))" }}
            />
          ))}
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

        {/* MAGENTA-ÜBERGANG — folgt der BIEGUNG der Satellitenringe (Zentrum weit
            oben, „Smile"-Bogen). Oben transparent (Staub), unten voll Magenta →
            nahtlos in die Statement-Fläche. */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(112% 128% at 50% -28%, rgba(255,67,112,0) 58%, rgba(255,67,112,0.5) 72%, #ff4370 84%)" }}
        />
      </div>
    </div>
  );
}
