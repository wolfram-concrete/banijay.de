# banijay.de — Website Relaunch

Cinematischer Website-Relaunch für **Banijay Germany**. Die Umsetzung adaptiert die
Sektions-Choreografie des Algarve-Webflow-Templates (Preloader, kinetischer Hero,
gepinnte Scroll-Bühnen, Logo-Reveal) und füllt sie mit den echten Inhalten der
Banijay-Welt — Companies, Formate, Kompetenzfelder, Team und News.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (CSS-first)
- **GSAP** + **ScrollTrigger** + `@gsap/react` (`useGSAP`) für die Scroll-Choreografie
- **Lenis** für Smooth-Scroll
- Schrift: **Sharp Grotesk** (`--font-sharp`)

## Entwicklung

```bash
npm run dev     # Dev-Server (http://localhost:3000)
npm run build   # Produktions-Build
npm run start   # Produktions-Server
npm run lint    # ESLint
```

## Projektstruktur

```
src/
  app/(frontend)/        Seiten: Home, Companies, About, Career, Contact, News
  components/
    cinematic/           Preloader, AlgarveHome (Hero) & Home-Sektionen
    cinematic/algarve/   Nachgebaute Algarve-Module (Scroller, Testimonials,
                         Founders/Team, LogoReveal, NewsStack, WorksB, PageHero …)
    layout/              SiteHeader, SiteFooter
  data/                  CMS-fähige Datenschicht (companies, home, news, leadership …)
public/
  brand/                 Logo-/Marken-Assets (banijay-sign.svg …)
  video/  companies/  people/  grid/   Bild- und Videomaterial
```

## Design-System

| Token        | Wert       | Verwendung                          |
|--------------|------------|-------------------------------------|
| Paper        | `#f8f7f3`  | heller Grund                        |
| Ink          | `#0e0d0b`  | Schrift/dunkler Grund               |
| Coral        | `#fb4b68`  | Akzent (CTA, MENU)                  |
| Magenta      | `#ff4370`  | Flow-/Reveal-Flächen (= `banijay-sign.svg`) |

## Assets & Git

Große Videos und Marken-Rohmaterial sowie `design-source/`, `assets/` und
`scraped_content/` sind **bewusst gitignored** — zu groß für GitHub und nur lokal
als Quellmaterial vorhanden. `.env.local` wird nie committet.

**Wichtig für Deploy/Clone:** Diese in `public/video/` genutzten, gitignorten
Videos müssen separat bereitgestellt werden (weboptimierte Kopien liegen in
`assets/Videos/weboptimiert/`):

| Datei                     | Verwendung                                  |
|---------------------------|---------------------------------------------|
| `preloader-bg.mp4`        | Preloader-Hintergrund                       |
| `hero-bg.mp4`             | Home-Hero (Glas-„b")                        |
| `team-fullscreen.mp4`     | Team-→-News-Übergang (LogoReveal)           |
| `grid-loop1–3.mp4`        | 3 Loop-Cutouts in der Home-Grid-Section     |
| `showreel.mp4`, `banijay-teaser.mp4` | Showreel / Teaser (im Repo)      |

Ältere Platzhalter (`hero.mp4`, `hero-cinematic.mp4`, `kompetenz-reel.mp4`,
`preloader.png`, `stage-portrait.png`) ebenfalls gitignored.

Die Leadership-/People-Bilder sind aktuell **Platzhalter**.
