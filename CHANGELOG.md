# Changelog

Alle nennenswerten Änderungen an diesem Projekt. Format angelehnt an
[Keep a Changelog](https://keepachangelog.com/de/1.1.0/).

## [Unreleased] — 2026-07-02

### Footer-Farblogik, Preloader-Cutout, CEO-Modul (02.07., 8. Runde)
- **Partner-Section (About):** neu aufgebaut im „section_blog-home"-Template
  (Algarve News-Layout) — links Sticky-Heading (Eyebrow · H2 · Copy · CTA),
  rechts eine Tile-Liste (Bild · Nummer · Titel · Text) mit feinen Trennlinien
  statt der schlichten 4-Spalten-Ansicht.
- **Footer global invertiert:** nur die Home ist noch „dunkel" (Ink-Card /
  Magenta-Typo); ALLE anderen Seiten sind wie /about (Magenta-Card, Ink-Typo,
  Paper-Außenfläche).
- **Footer-Social-Hover:** Text + Icon invertieren jetzt korrekt (Inline-Color
  entfernt, Rest-/Hover-Farbe über CSS-Vars `--fg`/`--bg` → Icon folgt
  `currentColor`).
- **Footer-Banderole:** die große BANIJAY-Banderole schlägt beim Verlassen der
  Card farblich um — innerhalb der Card in FG-Farbe, auf der Paper-Außenfläche
  magenta (zwei deckungsgleiche full-bleed Marquees, außen hinter der Card).
- **Magenta vereinheitlicht:** alle `#fb4b68` (Coral-Abweichung) global auf das
  verbindliche Banijay-Magenta **`#ff4370`** gezogen.
- **Preloader-Übergang:** das b ist jetzt ein echter Cutout — der Container ist in
  der Cutout-Phase transparent, sodass durch das b-Loch der Hero sichtbar wird
  (statt Schwarz). Die Hero-Typo-Animation startet erst NACH dem Aufzoomen
  (`signalDone` im `onComplete`), nicht mehr versteckt dahinter.
- **LogoReveal (Team → Video):** der Video-Aufstieg ist auf das Eintreten
  begrenzt (`end: "top top"`) und steht danach ruhig full-size — kein Kriechen
  mehr über die ganze Sektionshöhe.
- **CEO-/Marcus-Modul (CeoTestimonial):** komplett neu als 2-Spalten-Split nach
  dem gelieferten Template — links Label · großes Zitat · Attribution · CTA,
  rechts hohe gerundete Media-Spalte mit Portrait + Caption-Karte. Entrance per
  IntersectionObserver (fade + slide-up, gestaffelt).

### Nav-/Footer-/Scroll-Feinschliff (02.07., 7. Runde)
- **Nav-Docked-Label:** auf der Home kein eingerastetes „Home"-Label mehr — die
  Orientierungs-Wortmarke unter „MENU" erscheint nur noch auf Unterseiten.
- **Footer-„B":** von oben rechts nach unten verlagert — sitzt jetzt auf der
  Unterlänge (Legal-Zeile) und linksbündig mit den Social-CTAs (gleiches
  Grid + `md:pl-[6vw]`).
- **Menü über Footer:** Footer-`zIndex` von 100 → 40 gesenkt, damit sich das
  geöffnete Menü-Overlay (z-98) full-size DAVOR legt statt dahinter.
- **LogoReveal (Team → Video):** Magenta-Fläche + „b"-Maske entfernt. Nur noch
  der Fullscreen-Video-Container, der sich von unten über die Team-Section
  schiebt und dabei auf Full-Size aufskaliert.
- **Companies-Intro:** die radiale Ober-Kante (links + rechts, rechts stärker =
  „b"-Logo-Körper) faltet sich beim Aufsteigen über die Typo komplett auf
  (Radien → 0), bevor der farbige Card-Ablauf startet; Schatten-Blob entfernt.

### Hero-Rework + Footer-Social/-Invert + Career-Cards (02.07., 5. Runde)
- **Subpage-Hero:** bunter Gradient/Aura entfernt; Farbcontainer + Video-Container
  wieder mit radialen (abgerundeten) Kanten; Video macht wieder seinen Zoom
  Höhe → Breite → Full-Screen (wie ursprünglich), nach dem Farbcontainer-Reveal.
- **Footer:** unter „Folgen" jetzt Instagram- & LinkedIn-Buttons wie in der
  Hauptnavigation (invertiert). Auf /about invertierter Footer: Magenta-Card +
  schwarze Schrift/Marquee, kein Magenta hinter dem Footer (Außenfläche Paper).
- **About:** Hero-Label „Über Banijay" → „About" (konsistent mit Docked-Label/Nav).
- **Career-Rollen-Cards:** wie die Company-Cards — bunte Card-Farben (Rainbow,
  Magenta zuerst), Career-Foto in schwebendem Bildmodul statt Vollbild.

### Subpage-Hero-Choreografie + Proof (02.07., 4. Runde)
- **Subpage-Hero (PageHero):** neue Reveal-Choreografie nach Mockup — aus dem kleinen
  Video-Container skalieren nacheinander (schnell, versetzt) Farbcontainer auf
  Full-Screen (Orchid → Gelb → Blau → Magenta zuletzt), danach zieht das Video
  selbst auf Full-Screen. Harte Kanten (borderRadius 0), keine weichen Übergänge.
- **About „Proof":** Eyebrow + Headline entfernt — nur noch die Copy (als Statement).

### Company-/About-/News-Feinschliff (02.07., 3. Runde)
- **Company-Hero-Video:** eigener Clip (`companies-hero.mp4`) im Companies-Hero.
- **Subpage-Hero-Aura:** emotionale, radial atmende Farb-Animation im Hintergrund
  (rotiert durch die Rainbow-Cardfarben) — Video/Typo bleiben davor (`.hero-aura`).
- **PageHero-Body-Text:** Wort-für-Wort-Enthüllung jetzt wie die Home-AboutIntro.
- **Company-Cards:** Keyword-Tags als Quadrat-Marker + Versalie (kein Hashtag/Button),
  „Bekannt für" & Fließtext einheitlich in Sharp Grotesk, Karten höher (90→96vh).
- **News-Detail:** „Mehr News" jetzt 3 Karten; Lenis springt bei Navigation
  zuverlässig zum Artikel-Header (Scroll-Reset pro Routenwechsel).
- **About „Proof":** Bento-Grid aus getönten Rundkarten mit zwei farbigen
  Akzent-Kacheln (Coral + Ink) statt Trennlinien.

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
