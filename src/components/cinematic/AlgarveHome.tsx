"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DustLayer } from "./algarve/DustLayer";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// V2-Hero (Umbau 14.07., Wolfram-Diktat):
//  • FULLSCREEN-Brennglas: die WebGL-Linse füllt den kompletten Viewport und
//    zeigt das rote Glas-B scharf, an den Kanten radial gebrochen, außen blurry.
//  • KEINE Headline (vorerst komplett entfernt).
//  • Beim Scrollen formt sich die untere Kante bauchig (radiale Kurve); aus ihr
//    fächern WEISSE Satellitenringe heraus; ein weicher Übergang leitet in die
//    Magenta-Statement-Section.

const SECTION_BG = "transparent";

export function AlgarveHome() {
  const root = useRef<HTMLDivElement>(null);
  const heroImg = useRef<HTMLImageElement>(null);
  const orbitZone = useRef<HTMLDivElement>(null);
  const heroSection = useRef<HTMLElement>(null);
  const contour = useRef<HTMLDivElement>(null);
  // Kurven-Fortschritt 0..1: Hero startet unten GERADE, die Kurve formt sich
  // beim Scrollen (Section-Radius, Zirkel-Kontur, Linsen-Pill im Shader).
  const curveP = useRef(0);

  const heroImgB = useRef<HTMLImageElement>(null);
  const lensCanvas = useRef<HTMLCanvasElement>(null);
  const lensBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = lensCanvas.current;
    const box = lensBox.current;
    const img = heroImg.current;
    const imgB = heroImgB.current;
    const section = canvas?.parentElement as HTMLElement | null;
    if (!canvas || !box || !img || !imgB || !section) return;
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true });
    if (!gl) {
      img.style.filter = "none";
      canvas.style.display = "none";
      return;
    }

    const VERT = `attribute vec2 aPos; varying vec2 vUv; void main(){ vUv = aPos*0.5+0.5; gl_Position = vec4(aPos,0.,1.); }`;
    const FRAG = `precision mediump float;
      varying vec2 vUv;
      uniform sampler2D uTex;
      uniform sampler2D uTexB;
      uniform float uMix;   // 0 = dunkles Visual, 1 = helles/farbiges → langsam aufhellen
      uniform vec2 uRes;
      uniform vec2 uC;
      uniform vec2 uH;
      uniform float uRL;
      uniform float uRR;
      uniform float uBand;
      uniform float uDisp;
      uniform vec2 uVid;
      uniform float uZoom;
      uniform vec2 uOff;

      float sd(vec2 p){
        // Radius weich zwischen oben (uRL) und unten (uRR) blenden statt harter
        // Umschaltung an uC.y → keine Normalen-Naht (schwarze Linie) mehr.
        float r = mix(uRL, uRR, smoothstep(uC.y - 14.0, uC.y + 14.0, p.y));
        vec2 q = abs(p - uC) - uH + vec2(r);
        return min(max(q.x, q.y), 0.0) + length(max(q, vec2(0.0))) - r;
      }
      vec2 cover(vec2 px){
        float sc = max(uRes.x / uVid.x, uRes.y / uVid.y) * 1.3;
        vec2 disp = uVid * sc;
        vec2 off = vec2((uRes.x - disp.x) * 0.5, (uRes.y - disp.y) * 1.0);
        vec2 uv = (px - off) / disp;
        return (uv - 0.5) / uZoom + 0.5;
      }
      // Blend dunkles → helles Visual (Aufhellen)
      vec3 smp(vec2 uv){ return mix(texture2D(uTex, uv).rgb, texture2D(uTexB, uv).rgb, uMix); }
      void main(){
        vec2 px = vec2(vUv.x, 1.0 - vUv.y) * uRes;
        float d = sd(px);
        float alpha = 1.0 - smoothstep(-1.5, 1.5, d);
        if (alpha <= 0.003) discard;
        // ANALYTISCHE Kanten-Normale (keine Finite-Differenzen) — die dominante
        // Box-Fläche gibt die Richtung; dadurch KEIN y-Vorzeichenwechsel an der
        // Mittelachse mehr → die schwarze Naht/Linie in der Mitte verschwindet.
        float rN = mix(uRL, uRR, smoothstep(uC.y - 14.0, uC.y + 14.0, px.y));
        vec2 qn = abs(px - uC) - uH + vec2(rN);
        vec2 n = (qn.x > qn.y)
          ? vec2(sign(px.x - uC.x + 1e-4), 0.0)
          : vec2(0.0, sign(px.y - uC.y + 1e-4));
        float k = 1.0 - smoothstep(0.0, uBand, -d);
        k = pow(clamp(k, 0.0, 1.0), 1.7);
        vec2 sp = px - n * (k * uDisp) + uOff;
        vec2 uv = cover(sp);
        vec3 col = smp(uv);
        vec2 duv = vec2(k * 3.5) / uRes;
        vec3 blur = (smp(uv + vec2(duv.x, 0.)) + smp(uv - vec2(duv.x, 0.))
                   + smp(uv + vec2(0., duv.y)) + smp(uv - vec2(0., duv.y))) * 0.25;
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
    const U = (n: string) => gl.getUniformLocation(prog, n);
    const mkTex = () => {
      const t = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      return t;
    };
    // uTex = dunkles Basis-Visual (Unit 0), uTexB = helles/farbiges (Unit 1)
    const tex = mkTex();
    const texB = mkTex();
    gl.uniform1i(U("uTex"), 0);
    gl.uniform1i(U("uTexB"), 1);

    let raf = 0;
    let visible = true;
    let hxCur = 0;
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
      gl.uniform1f(U("uRL"), 1);
      hxCur = hx;
      gl.uniform1f(U("uBand"), 120 * dpr);
      gl.uniform1f(U("uDisp"), 30 * dpr);
    };

    let uploaded = false, uploadedB = false;
    const upload = () => {
      if (uploaded || !img.complete || !img.naturalWidth) return;
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.uniform2f(U("uVid"), img.naturalWidth, img.naturalHeight);
      uploaded = true;
    };
    const uploadB = () => {
      if (uploadedB || !imgB.complete || !imgB.naturalWidth) return;
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, texB);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgB);
      uploadedB = true;
    };
    upload();
    uploadB();
    img.addEventListener("load", upload);
    imgB.addEventListener("load", uploadB);

    // AUFHELL-RAMP (Wolfram 14.07.): uMix 0→1 blendet das dunkle Visual in das
    // helle/farbige über — beginnt, wenn der Hero sichtbar wird (nach der Intro),
    // damit man das langsame „Heller-werden" wirklich sieht.
    let brightenStart = 0;
    const startBrighten = () => { if (!brightenStart) brightenStart = performance.now(); };
    if ((window as { __introDone?: boolean }).__introDone) startBrighten();
    window.addEventListener("banijay:introdone", startBrighten);
    const brightenFallback = window.setTimeout(startBrighten, 6000);

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
        const tf = `scale(${(1.05 * z).toFixed(4)}) translate(${(-eased.x * 10).toFixed(1)}px, ${(-eased.y * 6).toFixed(1)}px)`;
        img.style.transform = tf;
        imgB.style.transform = tf;
        // Aufhellen: uMix 0→1 (smoothstep) über ~4.5s ab Start
        const t = brightenStart && uploadedB ? Math.min(1, (now - brightenStart) / 4500) : 0;
        const eMix = t * t * (3 - 2 * t);
        gl.uniform1f(U("uMix"), eMix);
        imgB.style.opacity = String(eMix);
        gl.uniform1f(U("uZoom"), z);
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
      imgB.removeEventListener("load", uploadB);
      window.removeEventListener("banijay:introdone", startBrighten);
      window.clearTimeout(brightenFallback);
      window.removeEventListener("mousemove", onMouse);
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

      // ÜBERGANGSZONE (Wolfram 14.07.): reines Magenta hinter der Hero-Kante,
      // KEIN Gradient — es arbeiten nur die weißen Linien, die sich full-size
      // (edge-to-edge) gestaffelt aus der Kante herausziehen.
      const fan = gsap.timeline({
        scrollTrigger: { trigger: orbitZone.current, start: "top 70%", end: "bottom 40%", scrub: 0.7 },
      });
      const rings = gsap.utils.toArray<SVGGElement>("[data-hero-ring]");
      gsap.set(rings, { autoAlpha: 0, y: -46 });
      rings.forEach((ring, i) => {
        fan.to(ring, { autoAlpha: 1, y: 0, duration: 1.1, ease: "power2.out" }, 0.3 + i * 0.18);
      });

      // MAGENTA-PLANETEN: swipen entlang ihrer Linie (Quadratic-Bezier: x=1600·t,
      // y = yTop·(1−2t+2t²) + 2t(1−t)·yBottom). t oszilliert um die Mitte ± amp.
      gsap.utils.toArray<SVGCircleElement>("[data-hero-planet]").forEach((dot) => {
        const yTop = Number(dot.dataset.ytop);
        const yBottom = Number(dot.dataset.ybottom);
        const amp = Number(dot.dataset.amp);
        const proxy = { p: Number(dot.dataset.phase) * Math.PI * 2 };
        gsap.to(proxy, {
          p: proxy.p + Math.PI * 2,
          duration: Number(dot.dataset.dur),
          ease: "none",
          repeat: -1,
          onUpdate: () => {
            const t = 0.5 + amp * Math.sin(proxy.p);
            const x = 1600 * t;
            const y = yTop * (1 - 2 * t + 2 * t * t) + 2 * t * (1 - t) * yBottom;
            gsap.set(dot, { attr: { cx: x.toFixed(1), cy: y.toFixed(1) } });
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative" style={{ background: SECTION_BG }}>
      {/* MAGENTA-GRUND hinter dem Hero (Wolfram 14.07.): sobald sich die bauchige
          Hero-Form beim Scrollen bildet, werden die Ecken außerhalb der Form
          freigeschnitten — dahinter liegt SOFORT reines Magenta (kein dunkler
          Background mehr). Deckt den Hero-Unterbau + die Übergangszone ab. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0" style={{ top: "26vh", bottom: 0, background: "#ff4370", zIndex: 0 }} />

      {/* ── FULLSCREEN-BRENNGLAS-HERO ─────────────────────────────────────── */}
      <section
        ref={heroSection}
        className="relative z-[2] flex min-h-screen flex-col overflow-hidden max-[479px]:!min-h-screen"
        style={{ background: "transparent", borderRadius: "0" }}
      >
        {/* Sternenstaub-Grund — sichtbar unterhalb der Kurve, sobald sie sich formt */}
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
          <DustLayer boost={0.8} center={{ x: 0.5, y: 0.62 }} radius={0.85} />
        </div>

        {/* ZWEI-LAYER-VISUAL (Wolfram 14.07.): unten das DUNKLE Visual, darüber das
            HELLE/farbige — beide fullscreen soft-blurry (außerhalb der Linse) UND
            Textur-Quellen der Linse. Das helle blendet langsam ein (uMix/opacity im
            rAF) → wirkt, als würde die Helligkeit langsam hochgezogen. */}
        <img
          ref={heroImg}
          src="/hero-v2/b-dark.jpg"
          alt=""
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          style={{ zIndex: 0, filter: "blur(16px) saturate(1.05) brightness(0.92)", transform: "scale(1.05)", objectPosition: "50% 100%" }}
        />
        <img
          ref={heroImgB}
          src="/hero-v2/b-bright.jpg"
          alt=""
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          style={{ zIndex: 0, opacity: 0, filter: "blur(16px) saturate(1.05) brightness(0.92)", transform: "scale(1.05)", objectPosition: "50% 100%" }}
        />

        {/* Fokus oben: das Bild softet nach unten dunkel ab */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ zIndex: 1, background: "linear-gradient(180deg, rgba(10,2,8,0) 46%, rgba(10,2,8,0.5) 74%, rgba(10,2,8,0.9) 100%)" }}
        />

        {/* Zirkel-Kontur auf der radialen Unterkante */}
        <div
          ref={contour}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{ zIndex: 2, height: "50vw", opacity: 0, borderRadius: "0", boxShadow: "inset 0 -1px 0 rgba(248,247,243,0.25)" }}
        />

        {/* BRENNGLAS-LINSE (WebGL) — full size (inset 0). Außerhalb der Form
            transparent. Bewusste Kunden-Ausnahme der Keine-Rundungen-Regel. */}
        <canvas ref={lensCanvas} aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 2 }} />
        <div
          ref={lensBox}
          aria-hidden
          className="pointer-events-none absolute"
          style={{ inset: "0", borderRadius: "0", boxShadow: "inset 0 0 4px rgba(255,255,255,0.2), inset 0 0 30px rgba(255,255,255,0.05), inset 0 1px 1px rgba(255,255,255,0.24)" }}
        />
      </section>

      {/* ── ÜBERGANGSZONE: weiße Satellitenringe + weicher Magenta-Übergang ── */}
      <div ref={orbitZone} aria-hidden className="pointer-events-none relative z-[1]" style={{ height: "78vh", marginTop: "-3vh", background: "#ff4370" }}>
        {/* KEIN Gradient, KEIN Staub, KEINE Punkte (Wolfram 14.07.) — reines
            Magenta, es arbeiten NUR die weißen Linien. preserveAspectRatio="none"
            + edge-to-edge-Pfade → die Linien gehen full-size bis an beide Ränder. */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 780" preserveAspectRatio="none" fill="none">
          {/* Edge-to-edge-Linien, deren Bogen der bauchigen Hero-Unterkante folgt.
              Auf den Linien swipen kleine Magenta-Planeten (Wolfram 14.07.). */}
          {[
            { yTop: 30, yBottom: 300, alpha: 0.62, amp: 0.15, dur: 26, phase: 0.1 },
            { yTop: 130, yBottom: 430, alpha: 0.5, amp: 0.19, dur: 38, phase: 0.55 },
            { yTop: 250, yBottom: 560, alpha: 0.38, amp: 0.16, dur: 48, phase: 0.3 },
            { yTop: 380, yBottom: 690, alpha: 0.26, amp: 0.13, dur: 34, phase: 0.8 },
          ].map((r, i) => (
            <g key={`ring${i}`} data-hero-ring data-ytop={r.yTop} data-ybottom={r.yBottom}>
              <path
                d={`M 0 ${r.yTop} Q 800 ${r.yBottom} 1600 ${r.yTop}`}
                stroke={`rgba(248,247,243,${r.alpha})`}
                strokeWidth={1.6}
                vectorEffect="non-scaling-stroke"
                // weicher weißer Glow auf den Linien (Wolfram 14.07.)
                style={{ filter: "drop-shadow(0 0 5px rgba(248,247,243,0.85)) drop-shadow(0 0 14px rgba(248,247,243,0.45))" }}
              />
              {i < 3 && (
                <circle
                  data-hero-planet
                  data-ytop={r.yTop}
                  data-ybottom={r.yBottom}
                  data-amp={r.amp}
                  data-dur={r.dur}
                  data-phase={r.phase}
                  r={7}
                  fill="#f8f7f3"
                  style={{ filter: "drop-shadow(0 0 9px rgba(248,247,243,0.9)) drop-shadow(0 0 18px rgba(248,247,243,0.5))" }}
                />
              )}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
