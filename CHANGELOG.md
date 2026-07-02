# Changelog

Alle nennenswerten Änderungen an diesem Projekt. Format angelehnt an
[Keep a Changelog](https://keepachangelog.com/de/1.1.0/).

## [Unreleased] — 2026-07-02

### Home Statement→Companies: Nav-Invert + Timing (02.07., 24. Runde)
- **Nav invertiert über der Magenta-Fläche:** Das aufsteigende Magenta-Overlay der
  AboutIntro (Home) trägt jetzt `data-nav-theme="magenta"` → sobald es oben liegt,
  werden **Logo (brightness(0)) + MENU schwarz** statt magenta-auf-magenta unsichtbar.
  Verifiziert: MENU-Farbe wechselt bei Magenta-oben von `#ff4370` → `#0e0d0b`.
- **Wartezeit bis Companies verkürzt:** AboutIntro-Höhe 320vh → 230vh, Wort-Reveal
  `+=90%` → `+=60%`, und die Magenta-Fläche ist erst bei ~90 % (statt ~68 %) „voll" —
  direkt danach übernimmt die Companies-Section. Leerlauf nach „voll" von ~70vh auf
  ~13vh reduziert.

### Career-Übergang: gepinnte Emerge-Sequenz (02.07., 23. Runde)
- **`CareerTomorrowStack`:** Der Übergang ist jetzt eine **gepinnte** Sequenz
  („Stop"): Magenta-Standorte-Kachel steht, dann kommen beim Weiterscrollen **leicht
  verzögert nacheinander** die bunten Kacheln heraus (Orange → Gelb → Grün, je per
  Downward-Wipe/clip-path), **zuletzt zieht sich die schwarze Kachel voll auf** und
  wird zum Tomorrow-Background — **erst danach** fadet der Content ein. Full-Viewport-
  Layer (fitten sicher in die Pin-Bühne). Vorher war der Reveal ohne Pin nicht
  sichtbar (spielte unter dem Fold ab). Mobile bleibt statisch gestapelt. Verifiziert
  über den Scrollverlauf: Kacheln wischen sequentiell (68→0 %), Content-Opacity 0→0.98
  am Ende. CTA-Hover Magenta.

### Docs aktualisiert (02.07.)
- **README** auf aktuellen Stand: Modul-Liste (ProofVideo, CareerTomorrowStack …),
  Design-System (Coral `#fb4b68` → einheitliches Magenta `#ff4370`, Emerge-Kaskaden-
  Farben), Video-Tabelle (`b-glass.mp4`, Preloader auf der Home entfernt). Begriff
  „Peel" → „Emerge-Sequenz" nachgezogen.

### Career-Peel-Animation, CEO-Titel entdoppelt, MENU mobil (02.07., 22. Runde)
- **Career `CareerTomorrowStack` – Peel-Animation (Desktop):** Der Übergang ist jetzt
  animiert. Die Section wird gepinnt („aufs Stop"); der Magenta-Standorte-Layer liegt
  oben, darunter im z-Stack Orange → Gelb → Grün und ganz unten der schwarze Tomorrow-
  Layer. Beim Scrollen **fädeln sich die Layer nacheinander nach unten weg** (yPercent,
  leicht überlappend), bis der schwarze Layer freiliegt und der **Tomorrow-Content
  einläuft**. Peel-Reihenfolge nach z-index (oberster zuerst). Mobile bleibt die
  statische gestapelte Variante. Verifiziert: Start Magenta full, mid Orange/Gelb-
  Kaskade, Ende Schwarz + Content (opacity ~1).
- **CEO-Testimonial – Titel entdoppelt:** Rolle stand doppelt (Eyebrow oben + unter
  dem Namen). Jetzt nur noch oben über der Linie; unter dem Namen entfernt.
- **MENU mobil −25 %:** `font-size` auf ≤767px von 3.5rem → 2.625rem (war auf schmalen
  Screens zu groß). Desktop unverändert.

### Mobile-Feinschliff neue Module (02.07., 21. Runde)
- **About `ProofVideo` mobil:** Die gepinnte clip-path-Aufskalierung lief auf Mobile
  ins Leere (Bento-Grid überlief die 100vh-Bühne, Video-Modul rausgedrückt, Video
  stand sofort fullscreen). Jetzt eigene, ruhige **Mobile-Variante ohne Pin/Scale**:
  Proof-Text + Kennzahlen normal gestapelt (größere Rundungen/Padding), darunter eine
  **statische Video-Statement-Karte** (3:4, Statement zentriert). GSAP läuft nur noch
  ≥768px. Desktop-Sequenz unverändert verifiziert (Start am Modul → Fullscreen →
  Statement).
- **Career `CareerTomorrowStack` mobil:** Tomorrow-Copy hatte `max-width:34vw` inline
  → quetschte den Text auf Mobile auf ~1 Wort/Zeile. Auf Mobile jetzt `max-w-full`
  (Text 100 %). Regenbogen-Layer + schwarze Tomorrow-Section sauber verifiziert.
- **MENU** `line-height` 0.75 → 0.86 (weniger gedrungen, weiter bündig zum Logo).

### Team-Grid-Fit, Career-Regenbogen-Übergang, Flip-Cards enger (02.07., 20. Runde)
- **About/Home – Team-Grid überlief die Pin-Bühne:** Auf niedrigeren/breiteren
  Viewports wuchsen die Portraits (festes 4:5) über die fixe 100vh-Bühne hinaus,
  `overflow:hidden` schnitt die 2. Reihe ab → die Partner-Section darunter wirkte
  „reingeschnitten". Jetzt füllen die zwei Reihen die verfügbare Bühnenhöhe
  (`grid-template-rows:1fr/1fr`, Bilder `flex-1`/`min-h-0`), das Grid passt immer
  in die Bühne. Verifiziert bei 1440×820: kein Overflow, beide Reihen + Namen im
  Bild.
- **Career – Standorte → BANIJAY TOMORROW als Layer-System (`CareerTomorrowStack`):**
  Der Magenta-Standorte-Kasten sendet nach unten mehrere bunte, gerundete Schichten
  aus (Magenta → Orange → Gelb → Grün) und endet im **schwarzen Layer, der die
  Tomorrow-Section bildet** — Hintergrund wird von oben aufgebaut, dann läuft nur
  noch der Content ein. Technik: gestapelte Full-Width-Bänder mit gerundeten
  Unterkanten, negativer margin + absteigender z-index (jedes Band zeigt unten
  einen gerundeten Farbstreifen). Alte `CareerLocations.tsx` + `TomorrowCallout.tsx`
  entfernt (ersetzt).
- **Flip-Cards enger (Company + Career-RoleStack):** Auf schmalem Tablet wirkten die
  Karten noch zu hoch. Padding (6vw→4vw / 8vw→6vw), Innenabstände und Querformat-
  Bildhöhe (34vw→30vw / 52vw→46vw) gestaucht. Verifiziert: Company-Card bei 834px
  778→655px.

### Team-Namen nach Einrasten + About-Video aus Grid-Modul (02.07., 19. Runde)
- **Team-Section (Founders):** Name + Titel der Karten starten jetzt unsichtbar
  (opacity 0, leicht nach unten versetzt) und **layern erst auf, wenn die Karten
  an ihrer finalen Grid-Position eingerastet sind** — gestaffelt eingeblendet am
  Ende der Entfaltungs-Timeline (Pin-Range auf +=160% verlängert). Verifiziert:
  Start meta-opacity 0 bei geclusterten/rotierten Karten (scale 0.52), am Ende
  meta-opacity 1 bei Karten-Matrix = Identität.
- **About – Proof/Video zusammengeführt (`ProofVideo`):** Zahlen-Section +
  Statement-Video sind jetzt **eine gepinnte Section**. Das Video liegt nicht mehr
  als separate Section darunter, sondern als **gerundetes Video-Modul im Grid**
  (unter den Bento-Kennzahlen). Beim Weiterscrollen **wächst genau dieses Modul aus
  seiner Grid-Position per animiertem clip-path auf Full-Screen** (kein Verzerren,
  da das Video full-size bleibt und nur das Sichtfenster aufgeht) und layert über
  die komplette Fakten-Section — **erst danach** kommt das Prinzip-Statement Wort
  für Wort rein. Alte separate `StatementVideo.tsx` entfernt. Verifiziert:
  Start-Clip = Modul-Rect (inset ~446px top), Fullscreen, Statement erscheint
  danach.

### Flip-Cards responsive: Querformat statt zu hoch (02.07., 18. Runde)
- **Company-Cards & Career-RoleStack:** auf Tablet/Mobile (≤991px) wurden die
  Sticky-Flip-Cards unnötig hoch (feste 96vh/90vh) und das schwebende
  Hochformat-Bild (26vw) zu schmal. Jetzt: ab ≤991px stehen die Cards im
  **Normalfluss** (`position:static`, Höhe `auto`, reduziertes Padding), das
  schmale Hochformat-Panel entfällt und stattdessen sitzt **ein Querformat-Bild
  in-flow** volle Card-Breite unter dem Text (Höhe 34vw Tablet / 52vw Mobile →
  ~2.4:1 bzw. ~1.5:1 Landscape). Die **3D-Kipp-Animation läuft nur noch ≥992px**
  (echter Sticky-Stack) — darunter würde sie im Normalfluss nur stören. Verifiziert:
  Company-Card 1085→716px (Tablet), Role-Card static, Bild 630×261.

### Home Companies-Übergang (robuste Variante) (02.07., 17. Runde)
- **Home – Statement → Companies:** die AboutIntro (mit `magentaExit`) ist jetzt
  320vh hoch (mehr Pin-Raum). Nachdem das Statement steht, layert im selben
  Sticky-Panel eine **gerundete Magenta-Fläche** von unten über das (stehende)
  Statement — rechts stark gerundet als „b"-Körper-Andeutung — und **faltet dann
  auf Full-Size auf**, bevor die Companies-Section übernimmt. Robuste Nicht-Masken-
  Variante (keine fragile SVG-b-Silhouette). Numerisch verifiziert (Rise translateY
  1264px→0, Radius 807px→~0 über das Pin-Fenster).

### CoC-Statement-Section + Body-Paper vereinheitlicht (02.07., 16. Runde)
- **Code-of-Conduct-Section** neu nach text-section-1: großer, linksbündiger
  Statement-Text mit einem Magenta-Akzentwort („kreative") + Magenta-Pill-CTA
  (dunkler Play-Icon-Kreis + „Code of Conduct öffnen", öffnet das CoC-PDF),
  Slide-in beim Scrollen.
- **Body-Paper vereinheitlicht:** `--background`/`--bj-paper` von `#f4f3ee` auf
  `#f8f7f3` (= Section-Paper) → keine Farbdifferenz mehr (u. a. das dunklere Grau,
  das hinter der gepinnten Social-Feed-Section durchschien, ist weg).

### Career: RoleStack-Copy + Social-Feed als Horizontal-Slider (02.07., 15. Runde)
- **RoleStack-Intro:** Headline + Copy zu EINEM linksbündigen Copy-Text
  zusammengefügt (über den Flip-Card-Modulen).
- **#workatBanijay:** vom statischen Grid zu einem **gepinnten Horizontal-Slider**
  umgebaut — beim Scrollen in die Section pinnt sie, der weitere Scroll schiebt die
  Cards horizontal durch (scrub), danach geht's normal weiter. Daten weiterhin
  server-seitig aus Juicer (1 h ISR); Mobile = nativer Swipe (scroll-snap).

### #workatBanijay Social-Feed (02.07., 14. Runde)
- **Career:** neue Social-Feed-Section „#workatBanijay" — zieht die Posts
  **server-seitig** aus dem **Juicer-JSON** (`www.juicer.io/api/feeds/banijaygermany`,
  derselbe Feed wie die bestehende Live-Karriereseite), `revalidate: 3600` (1 h ISR),
  und rendert sie als **eigene Banijay-Cards** (3/2/1-Grid, Bild 4:5, Quellen-Badge
  LinkedIn/Instagram, Textauszug HTML-gestrippt, externer Link target=_blank). Kein
  Drittanbieter-Script; bei Fetch-Fehler wird die Section ausgeblendet.
  - **Quelle:** Juicer JSON (nicht Elfsight). Keine Env-Variable nötig.
  - Elfsight bleibt als Interims-Fallback verfügbar (`ElfsightFeed`, App-ID
    d46ee32f-1dd4-4015-b240-4ba3940c497a).
- Aufräumen: ungenutzte MissionStatement-Komponente entfernt; CeoTestimonial-Effect
  lint-sauber (kein setState direkt im Effect).

### Code-of-Conduct zurück + Preloader raus (02.07., 13. Runde)
- **Career:** Code-of-Conduct-Section wieder ergänzt (über der Kontakt-CTA, mit
  hinterlegter CoC-PDF).
- **Home:** Preloader vor dem Hero entfernt — die Hero-Typo-Animation startet
  jetzt direkt beim Laden.
- **Offen (bewusst nicht blind gebaut):** die b-Form-Morph-Übergänge (Home
  Companies, Career Standorte→Tomorrow) sowie das About-Stat-Karten-Video —
  brauchen Live-Tuning (SVG-Masken-Morph rendert im Headless-Preview nicht sauber).

### Logo/Footer/Career-Umbauten + CEO-Template + LogoReveal-b (02.07., 12. Runde)
- **Logo** links oben global um 25% größer (2.1rem → 2.625rem).
- **Footer-B** wieder oben rechts (absolut) statt unten.
- **Career:** Rollen-Headline in gemischter Schreibweise; Standort-Modul als
  gerundete Magenta-Card auf Off-White; „Wie wir zusammenarbeiten"-Band entfernt;
  BANIJAY TOMORROW neu als value-features-4-Callout (dunkler Block + Bild rechts)
  auf Magenta-Grund mit unten gerundeten Kanten → Off-White-Kontaktsektion.
- **Team-Grid:** volle Gridbreite (Karten größer).
- **CEO-Modul:** neu nach testimonials-5 — dunkles Panel (Label · Divider · Zitat
  · Autor · Divider · 2 Kennzahlen · Divider · CTA), Portrait rechts.
- **LogoReveal (Home):** b-Masken-Blende wieder da — das Video schiebt hoch, dann
  wächst aus der Mitte das magenta „b" auf Full-Size → kompletter Magenta-Grund →
  Übergang in die News.

### Team-Section spiral-team, About-Video-Statement, CEO-Feinschliff (02.07., 11. Runde)
- **Home Team-Section:** neu als Algarve `section_spiral-team` — „TEAM" als große
  Headline ÜBER den Cards; die Cards starten als verdichtetes, rotiertes,
  überlappendes Cluster (Initial-State vor dem ersten Paint gesetzt → kein Flash)
  und entfalten sich per gepinnter, gescrubter GSAP-Timeline ins saubere 5er-Grid
  (kein batch/onEnter mehr).
- **About:** neue Statement-auf-Video-Section — nach den Zahlen skaliert das
  b-Glas-Video-Visual aus der Tiefe großflächig auf und überlagert die Section;
  zentral enthüllt sich Wort für Wort das Prinzip-Statement („Kreative Freiheit
  braucht ein starkes Dach. Jede Company behält ihre eigene Handschrift.").
  Ersetzt die Standalone-Prinzip-Section.
- **B-Glas-Video:** `magnific_create-a-cinematic-camera` weboptimiert
  (13,7 MB → 1,5 MB → `public/video/b-glass.mp4`).
- **CEO-Modul:** Caption-Karte (Name/Rolle) auf dem Bild entfernt.

### CEO-Modul-Feinschliff + Grid-Bilder (02.07., 10. Runde)
- **CEO-Modul:** neues Marcus-Wolter-Foto (2022, Farbe, weboptimiert); die Rolle
  steht jetzt UNTER dem Namen; das magenta Quadrat („roter Kasten") ist entfernt;
  das Zitat enthüllt sich Wort für Wort (Typo-Animation aus Clip-Maske).
- **Home-Grid:** die zwei S/W-/Stock-Portraits (Temptation Island, Cologne Comedy
  Festival) durch farbige Stills ersetzt — Paar am Meer bzw. farbige Live-Bühne.
  (Temptation-Island-Bild ist ein Presse-Still aus dem Netz; das Live-Bühnen-Bild
  ist frei lizenziert via Pexels.)

### Prinzip-Statement, Footer-Revert, Scroll-Stabilität (02.07., 9. Runde)
- **Prinzip-Section (About):** neu als Mission-Statement-Template (IntroText) —
  asymmetrisches 3-Spalten-Grid: Label „PRINZIP" links, riesige Headline über die
  Spalten 2–3 mit Wort-für-Wort-Reveal aus einer Clip-Maske (gestaffelt), Copy
  darunter. Auf Sharp-Grotesk statt Serif gezogen.
- **Footer:** die eingefärbte Logo-Banderole außerhalb der Magenta-Card wieder
  verworfen — die BANIJAY-Banderole bleibt auf die Card geclippt (kein Bleed).
- **Home-Scroll:** `ScrollTrigger.refresh()` nach dem Font-Load (BANIJAY-Fit) —
  verhindert verrutschte Grid-Trigger, die sich beim Weiterscrollen wie ein
  „Zurückspringen zum Hero" anfühlen konnten.

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
