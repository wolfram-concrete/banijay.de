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
      img.style.filter = "none";
      canvas.style.display = "none";
      return;
    }

    const VERT = `attribute vec2 aPos; varying vec2 vUv; void main(){ vUv = aPos*0.5+0.5; gl_Position = vec4(aPos,0.,1.); }`;
    const FRAG = `precision mediump float;
      varying vec2 vUv;
      uniform sampler2D uTex;
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
        float r = (p.y > uC.y) ? uRR : uRL;
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
      void main(){
        vec2 px = vec2(vUv.x, 1.0 - vUv.y) * uRes;
        float d = sd(px);
        float alpha = 1.0 - smoothstep(-1.5, 1.5, d);
        if (alpha <= 0.003) discard;
        float e = 2.0;
        vec2 n = vec2(sd(px + vec2(e,0.)) - sd(px - vec2(e,0.)), sd(px + vec2(0.,e)) - sd(px - vec2(0.,e)));
        n = normalize(n + vec2(1e-5));
        float k = 1.0 - smoothstep(0.0, uBand, -d);
        k = pow(clamp(k, 0.0, 1.0), 1.7);
        vec2 sp = px - n * (k * uDisp) + uOff;
        vec2 uv = cover(sp);
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

      // ÜBERGANGSZONE: aus der radialen Linsenkante fächern WEISSE Satelliten-
      // ringe auf; jeder trägt einen kreisenden Magenta-Punkt (erst sichtbar, wenn
      // sein Ring vollständig eingeblendet ist). Danach der Magenta-Übergang.
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

        {/* Hintergrund: das rote Glas-B FULLSCREEN — außerhalb der Linse soft-blurry
            (CSS-filter). Der Subtil-Zoom kommt synchron aus dem Linsen-rAF. */}
        <img
          ref={heroImg}
          src="/hero-v2/b-red.jpg"
          alt=""
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          style={{ zIndex: 0, filter: "blur(16px) saturate(1.05) brightness(0.92)", transform: "scale(1.05)", objectPosition: "50% 100%" }}
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
      <div ref={orbitZone} aria-hidden className="pointer-events-none relative z-[1] overflow-visible" style={{ height: "78vh", marginTop: "-3vh" }}>
        <div
          className="absolute inset-0 opacity-70"
          style={{ maskImage: "linear-gradient(180deg, transparent 0%, black 20%, black 100%)", WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 20%, black 100%)" }}
        >
          <DustLayer boost={0.85} center={{ x: 0.5, y: 0.1 }} radius={0.8} />
        </div>

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 780" preserveAspectRatio="xMidYMid slice" fill="none">
          {/* WEISSE Satellitenringe (Wolfram 14.07.): gleichradig, mittelachsig */}
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

        {/* MAGENTA-ÜBERGANG — sehr weich (viele Stops), folgt der Ring-Biegung
            (Zentrum weit oben, „Smile"-Bogen). Oben transparent (Staub), unten
            voll Magenta → nahtlos in die Statement-Fläche. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(125% 140% at 50% -34%, rgba(255,67,112,0) 46%, rgba(255,67,112,0.08) 58%, rgba(255,67,112,0.24) 68%, rgba(255,67,112,0.5) 78%, rgba(255,67,112,0.8) 88%, #ff4370 96%)",
          }}
        />
      </div>
    </div>
  );
}
