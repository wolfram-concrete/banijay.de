# Changelog

Alle nennenswerten Änderungen an diesem Projekt. Format angelehnt an
[Keep a Changelog](https://keepachangelog.com/de/1.1.0/).

## [Unreleased] — 2026-07-02

### Preloader-/Video-Feinschliff (02.07., 2. Runde)
- **Bessere Videoqualität:** `preloader-bg` und `hero-bg` waren zu hart komprimiert
  → aus Rohquellen neu in crf 23 / 1080p (Preloader 2,7 MB, Hero 2,2 MB).
- **Preloader ruhiger:** neue Ruhephase (~1,7 s), in der nur das Video läuft, bevor
  sich die Partikel bilden; danach fährt der Weißbereich langsamer auf (gesamt ~5 s).
- **b-Cutout korrigiert:** kein Merge/Steg mehr — das b bleibt mit ZWEI Einzelkörpern
  (offener Zwischenraum) als echter Cutout, durch den man in die Hero-Section blickt
  (Solid-Variante verworfen).
- **Companies-Section (Home):** erste Ansicht jetzt **Magenta**; von dort morpht der
  Grund beim Scrollen in die dominanten Card-Farben.
- Hinweis: schwerste Videos bleiben `kompetenz-reel` (13 MB) & `hero` (11 MB) —
  primäre Kandidaten für weitere Verkleinerung/kürzere Loops.

### Deploy-Fix: Videos im Repo (02.07.)
- **Ursache:** genutzte Videos waren gitignored → fehlten im Vercel-Build
  (Preloader-Video spielte nicht, Videos generell weg).
- Genutzte Videos werden jetzt **committet** und dafür hart weboptimiert:
  `preloader-bg` 3,9 MB→318 KB, `hero-bg` 3,1 MB→235 KB, `team-fullscreen`
  →347 KB (laden upfront → schnell), `showreel` 11 MB→420 KB, `hero` 59 MB→11 MB,
  `kompetenz-reel` 146 MB→13 MB (progressiv beim Scrollen), `grid-loop1–3` je ~0,3 MB.
- Poster fürs Team-Video: winziges `team-poster.jpg` (19 KB) statt 15 MB-PNG.
- `.gitignore`: nur noch ungenutzte/zu große Rohassets ignoriert.

### Fixes (02.07.)
- **Preloader-Partikel sichtbar:** Das absolut positionierte Hintergrundvideo
  überdeckte die statisch gemalten Partikel (CSS-Paint-Reihenfolge). Canvas liegt
  jetzt in einem `absolute z-index:1`-Wrapper über dem Video → Animation sichtbar.
- **Grid-Videos spielen zuverlässig:** Browser pausieren autoplay-Videos, die beim
  Laden offscreen sind. IntersectionObserver startet die Tile-/Showreel-Videos,
  sobald sie sichtbar werden (offscreen pausieren spart Decode).

### Große Choreografie-Reworks (02.07.)
- **Scroll-Start global:** Section-Reveals (`.reveal`) starten erst, wenn wirklich
  im Bild (`animation-range entry 22%–62%`); Team-Fade-Batch auf `top 82%`.
  Pinned-/Scrub-Trigger unverändert.
- **Docked-Label:** kein doppeltes Seiten-Label mehr. Auf Subpages rastet das rote
  Label erst am Ende der Hero-Bühne ein (Shift + Scale-Down); das weiße Hero-Label
  blendet dabei aus → sauberer Handoff, ein-Element-Eindruck.
- **Companies-Intro (Home):** „Unsere/Companies" faden als normale Zeilen
  nebeneinander in der Mitte ein → ziehen dann auseinander (öffnen das „Loch") →
  erst danach steigen die ersten Cards aus der Mitte auf.
- **Team-Übergang (Home):** `LogoReveal` nutzt das Fullscreen-Video
  (`team-fullscreen.mp4`), das sich über die Team-Section hochschiebt + aufskaliert;
  danach wächst das b als Maske → Magenta-Blende → News.
- **Grid-Section (Home):** drei loopende Video-Cutouts (`grid-loop1–3`, aus dem
  9:16-Reel geschnitten, ~250–340 KB) in verteilten Tiles.
- **Preloader-Steg:** neue Solid-b-SVG (`banijay-sign-solid.svg`) schließt den
  Spalt zwischen den Balken → beim Cutout-Aufzoomen kein Magenta-Zwischenstreifen.

### Feinschliff (02.07.)
- **Preloader**: Hintergrund jetzt weboptimiertes Video (`preloader-bg.mp4`) statt
  Magenta; Partikel-„b" in Weiß. Hero-, Preloader- und Team-Video als
  weboptimierte Kopien (~3–4 MB) in `public/video/`.
- **Hero**: Hintergrundvideo auf den Glas-„b"-Clip (`hero-bg.mp4`) getauscht.
- **Company-Cards** (Companies-Seite): Cologne Comedy Festival ohne „Bekannt für"-
  Zeile; Keyword-Tags als gesperrte Kicker-Versalien (keine Button-Optik); CTA
  „Zur Website" mit radialem Farb-Invert beim Hover statt ruckelndem Pfeil.
- **Companies-Slider** (Home): Karten 15 % kleiner; Gradient-Hintergrund zieht
  „gebranntere", satter/dunklere Farben aus den Bildern (`burnt()`).
- **Footer**: Impressum/Datenschutz gemischt statt versal; kleine Banijay-Bildmarke
  (Magenta) auf der Impressum-Grundlinie, linksbündig mit der Kontaktspalte.
- **Career**: Flip-/Rollen-Karten mit vollen Bildern + Magenta-Typo (statt flach
  abgedunkelt); „Aktuelle Einstiege" & Standorte kleiner/eingefasst, Standorte als
  Coral-Farbblock für mehr Farbe; Kontakt-/Bewerbungsformular (Eingabetemplate)
  eingebunden.
- **About**: Wireframe-Blöcke (Proof, Prinzip, CEO, Partner) cinematisch neu im
  Kinetic-Look; dunkles CEO-Panel mit Coral-Akzent.

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
