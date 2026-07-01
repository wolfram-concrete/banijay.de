# Changelog

Alle nennenswerten Änderungen an diesem Projekt. Format angelehnt an
[Keep a Changelog](https://keepachangelog.com/de/1.1.0/).

## [Unreleased] — 2026-07-01

### Hinzugefügt
- **Preloader** vor dem Hero: magentafarbener Grund, schwarzes „b" lädt von unten
  nach oben und zieht sich als Cutout-Blende auf die Startseite auf.
- **Kinetischer Hero** (`AlgarveHome`): WE/ARE-3D-Box-Flip, aus Slices aufgebauter
  BANIJAY-Schriftzug (bündig zu „ARE" skaliert), cinematisches Hintergrundvideo, das
  gegen Ende ausklingt und auf dem letzten Frame einfriert.
- **Freigestellter Glas-„b"**: ein pixelgleicher, auf die b-Form maskierter Video-Klon
  liegt synchron über dem BANIJAY-Schriftzug — der Glaskörper wirkt vor der Schrift.
- Algarve-Module originalgetreu nachgebaut: **CompaniesScroller** (3-Slot-Slider),
  **Testimonials** (gefächerter Karten-Entrance, echte Banijay-Zitate), **Founders/Team**
  (Spiral-Stage + Extension-Grid, „TEAM"-Hintergrundwort), **LogoReveal** (Bild → zentral
  wachsendes Magenta-„b" mit Clip-Path-Iris), **NewsStack** (auf Magenta), **WorksB**
  (vertikale Companies-Liste mit sticky Labels) auf der Companies-Seite.
- **Kompetenzfelder** mit Reel-Videos je Box und sechs Feldern inkl. Claim.

### Geändert
- **SiteHeader** invertiert Logo & MENU über magentafarbenen Sektionen
  (IntersectionObserver-Theme-Detection); MENU-Button mit harter linker Kante und
  fixer Breite (kein Springen beim Umschalten).
- **SiteFooter** schwarz mit magentafarbener Typo, über Header gelayert.
- News-Tiles ohne weiße Hintergründe; Bildcontainer mit feinem Schatten.
- Companies-Seite: Filterleiste entfernt, durch ruhige WorksB-Liste ersetzt.

### Assets / Build
- Große Platzhalter-Videos (`hero.mp4`, `hero-cinematic.mp4`, `kompetenz-reel.mp4`)
  und Marken-Rohmaterial gitignored; genutzte Kopien liegen optimiert in `public/`.

## [0.2.0] — Phase 2

- Cinematisches „Banijay Kinetic"-Redesign: Navigation, Home-Module, Unterseiten.

## [0.1.0] — Phase 1

- Design-System und erste cinematische Startseite.
- Next.js-Projekt-Scaffold (create-next-app).
