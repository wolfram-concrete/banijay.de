# Changelog

Alle nennenswerten Änderungen an diesem Projekt. Format angelehnt an
[Keep a Changelog](https://keepachangelog.com/de/1.1.0/).

## [main] — 2026-08-10

### Karriere-Links auf das zentrale Softgarden-Board umgestellt

- **404-Fehler behoben:** Alle Karriere-CTAs und Standort-Verlinkungen führen nicht
  mehr auf die entfernte interne Route `/offene-stellen/`, sondern auf das zentrale
  Banijay-Softgarden-Board unter `banijay.softgarden.io/de/vacancies`.
- **Jobvorschau aktualisiert:** Die kuratierte Vorschau enthält neun am 10.08.2026
  aktive Vakanzen mit direkten Softgarden-Detailseiten und aktualisierten deutschen
  sowie englischen Rollenbezeichnungen.
- **Sprachumschaltung ergänzt:** In der englischen Ansicht öffnen die direkten
  Stellenlinks automatisch die englische Softgarden-Fassung über `l=en`.
- **Keine veralteten Jobzahlen:** Die bislang statisch hinterlegten Standort-Zähler
  wurden durch den eindeutigen CTA „Jobbörse öffnen“ beziehungsweise „Open job board“
  ersetzt. So zeigt die Website keine überholten Bestandszahlen mehr an.
- **Automatisierung vorbereitet:** Die aktuelle Lösung benötigt keine Softgarden-API.
  Für eine automatische Synchronisierung neuer und abgelaufener Stellen ist künftig
  ein offizieller Read-only-API-Zugang oder ein freigegebener Stellen-Feed erforderlich.

### „Die Höhle der Löwen“-Motiv im Iconic-IP-Slider erneuert

- **Aktuelles Ensemble:** Das bisherige hochformatige Motiv wurde durch das neue
  Gruppenvisual von „Die Höhle der Löwen“ im 16:9-Format ersetzt.
- **Originalproportion erhalten:** Die Slider-Metadaten wurden von 424×560 auf
  996×560 angepasst. Dadurch erscheint das breite Bild vollständig und ohne Beschnitt;
  Reihenfolge, Animation und die übrigen 32 IP-Motive bleiben unverändert.
- **Weboptimiert:** Das gelieferte 2048×1152-WebP wurde auf 996×560 px und 66 KB
  optimiert. ESLint, TypeScript, `git diff --check` und der Produktions-Build sind
  ohne Fehler durchgelaufen.
- **Cache-sicher ausgeliefert:** Nach dem ersten Austausch hielt der Browser/CDN noch
  die graue Vorgängerdatei unter der unveränderten URL im Cache. Der neue eindeutige
  Dateiname `die-hohle-der-lowen-2026.webp` erzwingt nun die aktuelle Bildfassung.

## [main] — 2026-08-07

### Cape-Cross-Postproduction-Video aktualisiert

- **Gemeinsamer Markenfilm:** Die Kachel „Cape Cross Postproduction" verwendet jetzt
  denselben Cape-Cross-Imagefilm wie „Cape Cross Entertainment" statt der bisherigen
  Container-Fun-Compilation.
- **Eigenständiger späterer Ausschnitt:** Postproduction zeigt die Sequenz von
  **40,0–45,6 s** mit Bildregie, Kameratechnik und Kamerakran. Der Entertainment-Loop
  bleibt unverändert bei 29,6–35,2 s, sodass beide Kacheln klar unterscheidbar sind.
- **Weboptimiert und cache-sicher:** Der neue 5,6-s-Loop liegt als 960×540-H.264 ohne
  Audiospur vor. Das Poster wurde neu aus Sekunde 1 des Reels erzeugt; `?v=2` verhindert,
  dass Browser die vorherige MP4 aus dem Cache anzeigen.
- **Verifiziert:** TypeScript, gezielter ESLint-Lauf und `git diff --check` ohne Fehler;
  Poster, Zuschnitt und Kachel-Darstellung zusätzlich in der lokalen Desktop-Preview geprüft.

## [main] — 2026-08-05

### Iconic-IP-Slider um drei Formate erweitert

- **Drei neue IP-Motive:** „Bad Boyfriends", „Roadtrip Australien – 3 Spitzenköche
  auf 4 Rädern" und „Undercover Boss" ergänzen den Iconic-IP-Slider der Home.
- **Ausgewogene Verteilung:** Je ein Motiv wurde einer der drei Hauptreihen
  zugeordnet. Damit laufen nun 33 Formate gleichmäßig als 11 / 11 / 11; die
  bestehenden gegenläufigen Bewegungsrichtungen und die vierte kuratierte
  Mobile-Reihe bleiben unverändert.
- **Weboptimierte Assets:** Alle drei gelieferten JPGs wurden ohne Beschnitt und
  unter Erhalt ihrer Originalproportion auf eine Exporthöhe von 560 px
  als WebP exportiert (51–74 KB). Mobile werden sie automatisch mit der bestehenden
  Reihenhöhe von 135 px dargestellt.
- **Verifiziert:** TypeScript, gezielter ESLint-Lauf und `git diff --check` ohne
  Fehler; Desktop- und Mobile-Preview visuell geprüft, alle drei Dateien vollständig
  geladen und ohne Höhenversatz dargestellt.

## [main] — 2026-08-04

### Neue Pressemitteilung, News-Darstellung und Board-Erweiterung

- **Pressemitteilung veröffentlicht:** „Banijay Germany stellt Führungsmannschaft im
  Board und die Label-Geschäftsführungen nach Merger mit All3Media neu auf" ist als
  aktuellster Beitrag auf der Home, der News-Übersicht und der deutsch-/englischsprachigen
  Detailseite hinterlegt. Der deutsche Volltext übernimmt Listen, Zwischenüberschriften,
  Fettungen und Zitat-Hervorhebungen aus der gelieferten Pressefassung; „Joko
  Winterscheidt" und „Mission Unknown" sind korrekt geschrieben.
- **Bildmaterial und Download:** Das neue 2400×1020-Gruppenmotiv wird vollständig im
  nativen 40:17-Format gezeigt. Die Pressemitteilung ist zusätzlich als dreiseitige PDF
  downloadbar; der weiterführende Bildmaterial-Link führt zu PicDrop.
- **Breite News-Variante:** Das Datenmodell kennt nun `imageVariant: "wide"`. Der heutige
  Beitrag erhält auf Home, News-Page und im News-Menü einen breiteren Teaser mit
  `object-contain`; alle bestehenden Standardkarten und deren Zuschnitte bleiben
  unverändert.
- **News-Hero global beruhigt:** Alle deutsch- und englischsprachigen Presse-/News-
  Detailseiten verwenden eine gemeinsame, kleinere H1-Stufe. Lange Headlines lassen
  dadurch mehr vom Aufmacherbild sichtbar und bleiben innerhalb des Hero-Containers.
- **Strukturierte Artikelinhalte:** `NewsArticleBody` rendert weiterhin bestehende
  Textabsätze und unterstützt zusätzlich Listen, Zwischenüberschriften, Zitate,
  Hervorhebungen und externe Links. Optionale PDF-Downloads sind im News-Datenmodell
  CMS-ready abbildbar.
- **Arno Schneppenheim ergänzt:** Neues, auf die übrigen Board-Porträts abgestimmtes
  900×1200-WebP direkt hinter Michael Laegel; Titel **CCO**. Die Team-Reihenfolge ist nun
  4 / 5 / 4. Auf Mobile stehen alle vier Board-Mitglieder jeweils vollbreit, danach läuft
  das zweispaltige Teamraster weiter.
- **Verifiziert:** TypeScript ohne Fehler, gezielter ESLint-Lauf ohne neue Fehler,
  `git diff --check` sowie visuelle Browser-Prüfung der Detailseite, Team-Section und
  breiten News-Preview.

## [main] — 2026-08-03

### Brand-Metadaten und aktuelle Company-Video-Poster

- **Favicon aktualisiert:** Das pinke Banijay-B-Signet liegt als echtes
  Mehrgrößen-`favicon.ico` (16–256 px, transparenter Hintergrund) im Root-Segment
  des App Routers.
- **OpenGraph-Bild ergänzt:** Das aktuelle „We Are Banijay"-Hero-Visual wird als
  globales Share-Bild unter `/opengraph-image.jpg` ausgeliefert. Der Social-Crop
  ist auf 1200×630 px optimiert und besitzt einen eigenen Alt-Text.
- **Company-Poster vollständig erneuert:** Für alle 39 vorhandenen MP4-Reels wurde
  aus Sekunde 1 ein leichtgewichtiges JPG exportiert. Die 34 Video-Karten leiten
  ihr Poster nun direkt vom jeweils zugeordneten Reel ab; alte `card.image`-Scrapes,
  Logo-Platzhalter und Poster-Sonderfälle werden nicht mehr verwendet.
- **Video-Pufferung priorisiert:** Statt alle sichtbaren MP4s gleichzeitig zu laden,
  laufen maximal drei Videos auf Desktop und zwei auf Mobile. Bei 2G/3G, weniger als
  2 Mbit/s oder aktiviertem Datensparmodus wird nur ein Video gleichzeitig geladen.
  `preload="none"` bleibt erhalten, damit die Company-Section nicht mit dem Hero um
  Bandbreite konkurriert.
- **Verifiziert:** gezielter ESLint-Lauf, Browser-DOM-Prüfung (34 Video-Karten,
  kein fehlendes oder altes Poster) und vollständiger Next.js-Production-Build.

## [main] — 2026-07-31

### Wartungsmodus über Vercel Edge Config

- **Zentraler Runtime-Schalter:** `src/proxy.ts` liest das Boolean-Flag
  `maintenance` aus dem Store `banijay-flags`. Bei aktivem Flag werden alle
  Seiten per Rewrite auf `/wartung` gelegt; die Browser-URL bleibt erhalten.
- **Korrektes Wartungsverhalten:** Antworten liefern HTTP 503,
  `Retry-After: 86400`, `X-Robots-Tag: noindex` und No-Store-Caching. Benötigte
  Next.js-, Font- und Brand-Assets bleiben erreichbar.
- **Fail-open:** fehlt `EDGE_CONFIG` oder schlägt der Store-Read fehl, wird die
  reguläre Website ausgeliefert. `MAINTENANCE_MODE=1` steht als lokaler
  Test-/Notfall-Override zur Verfügung.
- **Geschützte Vorschau:** `?preview=<TOKEN>` setzt das sieben Tage gültige
  HttpOnly-/SameSite-Lax-Bypass-Cookie `bj-bypass`; danach kann die reguläre
  Site im selben Deployment angesehen werden.
- **Eigene Wartungsroute:** `src/app/wartung` liegt außerhalb von `(frontend)`
  und lädt damit keinen Site-Header/-Footer, Lenis oder GSAP. Die visuelle Bühne
  nutzt ausschließlich das globale Brand-Font-Setup und CSS-Animationen.
- **Vercel eingerichtet:** `EDGE_CONFIG` für Production/Preview/Development,
  sensitives `MAINTENANCE_BYPASS_TOKEN` für Production, Production-Deployment
  erfolgreich. Das Flag wurde anschließend operativ auf `true` gesetzt.
- **Verifiziert:** Production-Build, TypeScript, gezielter ESLint-Lauf,
  Edge-Config-Read, 503-Rewrite, Asset-Ausnahmen, falscher/korrekter Token,
  Bypass-Cookie und Desktop-/Mobile-Rendering.
- **Dokumentation:** vollständiges Runbook unter
  [`docs/maintenance-mode.md`](docs/maintenance-mode.md). Hinweis: Die
  öffentliche Domain zeigt zum Zeitpunkt der Einführung noch auf den bisherigen
  Apache/PHP-Server; die externe DNS-Umstellung ist separat erforderlich.

## [redesign-v2] — Branch (Preview) — 2026-07-16

### Mobile-Feinschliff & Ökosystem-Umbau (24.07., 3. Runde)
- **Mobiles Ökosystem — Option ①:** die Rubriken sind mobil wieder **klickbare Reiter direkt an
  der Grafik** (wie Desktop) statt Akkordeon; Tap → der Content öffnet an **fixer Position darunter**
  (kein Layer über der Grafik). Atom größer skaliert (94vw), Chip-Verteilung daumenfreundlich
  handgesetzt (lange Labels oben/unten mit Platz), Chips **transparent wie die Desktop-Optik**
  (Magenta-Ankerpunkte scheinen durch) + „+"-Indikator. Entertainment/Fiction klar getrennt.
- **Lucky Pics** in der Entertainment-Liste **ganz nach unten** (Desktop + Mobile).
- **Elevate-Video** als **echtes 9:16-Hochformat** neu kodiert (Quelle war `rotation=-90`; alt ins
  Querformat gestaucht) + Kachel-Swap: Elevate hochkant, **Pausenclown klein/quer**.
- **Aylin Firat** — Team-Foto neu aus dem Master (schärfer, Scheitel auf Reihen-Höhe).
- **ICONIC IP mobil:** eigene, **horizontale** Konvergenz-Animation (Wörter laufen von links/rechts
  auf einer Achse zusammen) und deutlich kürzer. Desktop unverändert.
- **About-Fakten mobil:** 3px-Cut zwischen „4.500 hrs" und der „170+"-Leiste (zwei getrennte Kacheln).
- **#BanijayGermany-Slider mobil:** `anticipatePin: 1` → Pin stoppt sauber am Fixpunkt (kein Rücksprung).

### Content-Feedback, Company-Videos & Mobile-Layouts (24.07., 2. Runde)
- **„Latest news" mobil auf 3 Beiträge:** auf schmalen Viewports zeigt der News-Stapel nur noch die
  3 aktuellsten Beiträge (Items ab Index 3 mobil ausgeblendet); Desktop weiter alle 5.
- **Ökosystem-B geprüft (Wolfram-Frage „sitzt es mittig?"):** per Messung bestätigt — das zentrale
  B liegt exakt auf der Orbit-Mitte (ΔY = 0), Desktop UND Mobile. Kein Ausrichtungs-Bug; eine evtl.
  Höhen-Verschiebung der GESAMTEN Grafik bleibt als separate Feinjustage offen.
- **Company-Videos getauscht:** Podcast Bande (neues natives Hochformat-Loop „260727", 720×1280)
  und Elevate (neuer Clip „Sandra Hesch", 1280×720, inkl. frisch gezogenem Poster) — beide
  weboptimiert, mit `?v=2`-Cache-Bust. Podcast Bande bekommt im Bento eine Hochformat-Kachel.
- **Title-Tag:** „— Die Entertainment-Welt hinter den Momenten" aus dem Home-Default entfernt →
  Browser-Tab zeigt nur noch „Banijay Germany" (Unterseiten laufen unverändert über das Template).
- **Marcus Wolter „Co-Founder":** im Editorial-Zitat („Co-Founder & CEO Banijay Germany", inkl.
  Bild-Alt) und im Teambild-Untertitel („CEO & Co-Founder").
- **Primetime-Hitrate entfernt:** die About-Fakten-Kachel (Wert 90 %) UND der komplette
  Primetime-Abschnitt auf der News-Seite (Blöcke jetzt: Presse · Podcast · Marcus Wolter · Social).
- **Companies & Labels:** die About-Fakten-Kennzahl bleibt bei **40+** (der 170+-Versuch vom 24.07.
  wurde auf Wolframs Wunsch komplett zurückgenommen). Stattdessen trägt die **Magenta-Leiste im
  Editorial** die weltweite Zahl — Label dort von „170+ Companies weltweit" auf **„170+ Companies &
  Labels weltweit"** ergänzt.
- **Team mobil — drei Geschäftsführer vollbreit:** Marcus, Knut und Michael Laegel stehen mobil je
  in einer VOLLBREITEN Zeile (über beide Spalten, Container +40 % Höhe = Aspect 8/7), darunter läuft
  das Team wieder zweispaltig. Desktop unverändert.
- **Company-Video-Bento mobil divers proportioniert:** statt uniformer 2-Spalten jetzt eigenes
  `grid-auto-rows` + Dense-Flow mit breiten (col-span-2) und hohen (row-span-2) Kacheln — die
  nativen Hochformat-Reels (Podcast Bande, Only Good People, SR, Pausenclown) laufen hoch. Desktop
  unverändert (Span-Klassen mobil via `max-[767px]:`, Desktop via `md:`).

### Mobile-PageSpeed-Optimierung, Schritt für Schritt (24.07.)
Der Mobile-PageSpeed-Score war katastrophal (~30). In kleinen, einzeln pushbaren
Schritten optimiert, damit sich jeder Effekt am Gerät nachmessen lässt:
- **#1 Preloader mobil ~3,5 s** (statt ~6,85 s wie Desktop): die Intro-Timeline wird auf
  Mobile per `timeScale` gestrafft, der BG-Zoom entsprechend angepasst → deutlich früherer
  LCP/Speed-Index. Desktop unverändert.
- **Hero-Frames mobil auf 1400px** (3009×4000 → 1400×1861, 12 MP → 2,6 MP): die riesigen
  WebP dekodierten zu ~48 MB Bitmap **je Bild** und ließen den Mobile-Lighthouse-Lauf mit
  **OOM** abstürzen. Nach dem Downscale läuft der Test durch, Score 30 → 52.
- **#4 WebGL/Canvas-Partikel mobil reduziert:** DustLayer (`ATTEMPTS` 160k → 42k, DPR-Cap
  2 → 1,5) und PreloaderParticles (1300 → 520) — beide laufen dauerhaft im RAF und waren
  direkte TBT-/Ruckel-Treiber. Desktop unverändert.
- **#3 Company-Videos `preload="metadata"` → `"none"`:** die Bento-Videos zogen schon vor
  Sichtbarkeit Daten und konkurrierten mit dem LCP ums Netzwerk. Sie laden ohnehin erst per
  IntersectionObserver beim Reinscrollen — bis dahin steht das Poster.
- **Preloader-Headline-Flash (FOUC):** die „Welcome to a new Era"-Zeilen starteten im Markup
  sichtbar und wurden erst per GSAP (`autoAlpha:0`) versteckt → auf Mobile blitzten sie eine
  Millisekunde auf. Jetzt starten sie schon im Markup mit `opacity:0`; GSAP blendet sie ein.
- **Social-Slider (#BanijayGermany) — Pin-Überschießen auf der Home:** der gepinnte Slider lief
  mobil beim Reinscrollen über den Pin-Start hinaus und snapte zurück. Ursache: `anticipatePin`
  rastet den Pin geschwindigkeitsbasiert früher ein — bei Touch-Momentum (syncTouch/Lenis)
  überschießt das. Auf Career fällt es nicht auf, weil dort keine sticky Section darüber liegt
  (auf der Home die NewsStack). Slider-Code ist auf beiden Seiten identisch, der Unterschied ist
  nur das Umfeld → `anticipatePin` mobil aus (Desktop unverändert, Geometrie dort verifiziert
  stabil), der Pin rastet jetzt exakt am Trigger ein.

### Mobile Team→Video-Blende wieder eingebaut (24.07.)
- **Home, mobil:** die Team→Video→News-Choreografie läuft jetzt auch mobil wie auf Desktop —
  das mobile Team-Raster pinnt an der Unterkante (Aylins Bild-Unterkante = Viewport-Boden),
  dann steigt die LogoReveal-Video-Fläche via `-100vh`-Overlap von unten über das gepinnte Team
  auf, danach wächst das Magenta-„b". Zuvor war das mobil abgeschaltet (nur angedockt, kein Pin).
- **Pin-Start ohne Rücksprung:** der Stopp muss exakt an Aylins Bild-Unterkante sitzen. Mit
  `anticipatePin: 0` glitt der Scroll bei Touch-Momentum über den Trigger hinaus und snapte zurück
  („springt zum unteren Bildschirmrand", Wolfram 24.07.) → auf `anticipatePin: 1` (wie Desktop),
  das geschwindigkeitsbasierte Vor-Einrasten setzt den Stopp sauber ohne Sprung. Desktop unverändert.
- Noch auf dem Gerät zu justieren: Pin-Halte-Dauer (mobil `end +=160%`) und die Pausen-/Aufstiegs-
  Länge — im Preview nicht verlässlich prüfbar (Lenis/Touch).

### Doc.Banijay-Video zurückgetauscht (24.07.)
- **Doc.Banijay — Company-Video:** zurück auf den **FC-Köln-Banijay-Trailer**
  (`FcKoeln_fuer_BanijayTrailer_Part1.mov`, ProRes 4K, 1,44 GB). Wie die übrigen Reels
  weboptimiert runtergerechnet: 1280×720, H.264 crf30, ohne Ton, faststart → **~2,2 MB**
  (statt 1,44 GB), damit die Performance nicht leidet. `?v=2` Cache-Bust.

### Aylin-Foto getauscht (24.07.)
- **Aylin Firat — neues Team-Foto:** aus dem neuen Master (`Aylin neu.webp`, 3800×5712) auf ein
  Kopf-Schulter-Porträt zugeschnitten (2:3, Gesicht ~30 %) und auf 900×1353 gerechnet — analog
  gerahmt zu den übrigen Karten der Reihe (statt des weiten Sitz-Shots des Originals). `focus()`
  („50% 0%") und Zielformat unverändert.

### Build-Fix (Production), Marcus-Bild & Hero-Revert (24.07.)
- **KRITISCH — Vercel-Production-Build repariert:** In `SmoothScroll.tsx` stand eine
  ungültige Lenis-Option (`touchInertiaMultiplier`). `next dev` (lokal) type-checkt nicht
  streng, **`next build` (Vercel) schon** → der Production-Build brach seit dem Einbau (23.07.)
  bei JEDEM Deploy ab. Folge: Vercel schickte Fehlermails UND **keiner der neuen Stände ging
  live** (Production lief auf dem letzten grünen Build). Option entfernt (wurde zur Laufzeit
  ignoriert), `next build` lokal verifiziert → grün, alle aufgelaufenen Änderungen sind live.
  Merkregel: vor jedem main-Push lokal `next build` fahren.
- **Marcus-Quote-Bild:** gegen das richtige Master `macus zitat.webp` getauscht (Farbe, volle
  Rahmung) + `?v=2` Cache-Bust.
- **Hero-Magenta-Kante (zurückgenommen):** Versuch, den Übergang Hero→Statement zu glätten
  (Orbit-Zone/Hero-Scrim nach Magenta) legte einen Magenta-Layer über den Hero und
  verschlechterte ihn → **komplett auf den Originalzustand zurückgesetzt** (Scrim nach Dunkel,
  Orbit transparent). Der Hero bleibt wie zuvor; der ursprüngliche Übergang wird separat/behutsam
  angegangen.

### Company-Videos, Logo-Banderole & Card-Feinschliff (23.07., 2. Runde)
- **SR Management — gemischtes Star-Reel:** aus vier Quellclips (GiovanniZ2, Janaina, Janin,
  Laura) ein Reel zusammengeschnitten (je ~2,5 s, In-Points je Person dort gewählt, wo sie klar
  im Bild ist). **Hochformat 720×1080** (die Card ist hochkant, `row-span-2`) → jede Person füllt
  den Container formatfüllend, KEINE verschwommenen Blur-Blenden mehr. Neues Poster + `?v=2`
  Cache-Bust (der Browser hing an der alten Landscape-Datei).
- **MyShow — Screencast neu aufbereitet:** aus dem Original statt der ~3×-beschleunigten
  Web-Version (die ruckelte). Die sticky **weiße Nav-Leiste oben ist weggecroppt** (crop top 150),
  Original-Scrolltempo (smoother), sauberer 18 s-Loop 960×540.
- **Scrim-Blitzerkante (alle Video-Karten):** der Abdunkel-Gradient endete unten bei 0.88
  Deckkraft → das helle Video schien an der Unterkante ~12 % durch (feine Blitzerkante). Jetzt
  **voll deckend zur Unterkante** (rgba …,1 ab 96 %) + 2 px statt 1 px Bottom-Overscan → schließt
  bündig mit dem Videorand ab.
- **Company-Logo-Banderole auf der Home:** dieselbe endlose Ticker-Banderole wie auf Career,
  jetzt zusätzlich **unter der Social-Section, über dem Footer** (läuft parallel, während die
  Social-Section durchscrollt/-slidet).
- **Only Good Party People:** Logo-Wortmarke auf der Card 20 % kleiner (h 3.4/4rem → 2.72/3.2rem).
- **Facts „1.500+ Live-Veranstaltungen":** „COLOGNE COMEDY FESTIVAL" → gemischt „Cologne Comedy
  Festival", Absatzumbruch entfernt (läuft als Fließtext weiter), „Die besten" → „die besten".
- **Michael Laegel:** aus dem WebP-Master reproduziert und ~15 % rausgezoomt (Kopf wieder auf
  Größe von Marcus/Knut).

### Bild-Assets auf WebP, Cleanup & Layout-/CTA-Feinschliff (23.07.)
- **Hero-Motive → komprimierte WebP:** alle Hero-Bilder (Desktop **und** Mobile, alle Seiten)
  gegen die vom Kunden gelieferten, bereits komprimierten WebP getauscht — gleiche Ausschnitte
  (Aspekt identisch), höher aufgelöst, keine erneute Kompression. Deutlicher Gewicht­gewinn
  (z. B. `frame-2` 604 KB → 178 KB). Referenzen in `AlgarveHome`/`career`/`news` und
  `mobileVariante()` auf `.webp`.
- **Team- + Marcus-Quote-Bilder → WebP-Master:** die neuen WebP sind volle Master-Fotos, kein
  1:1-Tausch möglich. Da die Pixelmaße identisch zu den Originalen sind, wurden die bisherigen
  **Bildausschnitte pixelgenau aus den neuen Mastern reproduziert** (Grauwert-Match Crop↔Master,
  MAE 3–7), `object-position` unverändert. `leadership.ts`/`teamFocus.ts`/`EditorialStickyScene`
  auf `.webp`. Michael Laegel aus dem Master-Foto (tonwert-normalisiertes Matching, da hart S/W
  vs. Farb-Master).
- **Only Good Party People:** weißes Hochformat-Logo (mit Untertitel) über den Video-Container
  gelegt (per `logoClass` höher, wie NightWash) — das letzte fehlende Company-Logo.
- **Cleanup (~85 MB):** tote Layout-Reste entfernt (per Netzwerk-Check verifiziert, dass nichts
  davon geladen wird): 9 alte `/video/*.mp4`, `brand/stage-portrait.png` (16 MB),
  `grid/g02–g12` (außer g01/g09), `career/c5–c6`, `hero-v2/b-*.jpg`, alte `marcus-*`/`lead-*`-
  Varianten, `news/n1–n9`, plus die durch WebP ersetzten Alt-JPGs. Dynamisch referenzierte
  Dateien (`reel-1..6`, `about-drift/clip-01..10`) erkannt und behalten.
- **Career „Banijay Tomorrow":** Bild von der Text-Höhe **entkoppelt** — feste native Ratio
  (2560/1312), oben an der Headline angesetzt statt vollhoher `self-stretch`-Turm; Grid
  1.05/0.95 → 1.18/0.82 (`items-start`), Copy `max-w` 38vw → 46vw (breiter).
- **News – Aaron Troschke:** Beitragsbild aus dem hochauflösenden Title-Original (4096×2731) neu
  gerendert (war aus einer 385px-Mini hochskaliert → unscharf), 1600×901 mozjpeg q84.
- **Home Hero→Statement (Desktop):** Magenta-Veil (`DustStage`) hält länger (Timeline 0.5 → 0.72)
  und blendet weicher aus; `invalidateOnRefresh` gegen den First-Load-Fehlstand (Magenta soll
  länger hinter dem Statement bleiben, kein harter Cut auf den Sternenstaub).
- **CTAs vereinheitlicht:** „Alle Jobs ansehen" (Jobs-Listing) und „Nachricht senden"
  (Formular-Master) an die Referenz „BANIJAY TOMORROW Login" angeglichen — border `1px solid
  #f8f7f3`, Padding/Größe (vw), rounded-6px, Magenta-Fill-Hover; der Formular-Button bekam die
  Border per Inline-Style, da eine globale Form-Regel sie auf 16 %-Weiß gedimmt hatte.
- **Offen (Live-Tuning nötig):** Logo-Invert-Timing rechts oben (Theme müsste innerhalb einer
  Section magenta→dunkel wechseln) und die LogoReveal-Mobile-Choreografie (b→Fond→News) —
  beide im automatisierten Preview nicht reproduzierbar.

### Mobile-QA-Runde: Headlines, Video-Karten, Slider, Footer (22.07., Nacht)
- **Zwischenüberschriften (mobil) vereinheitlicht:** ABOUT BANIJAY, ICONIC IP, UNSER TEAM und
  „40+ COMPANIES & LABELS" jetzt alle 13vw (Referenzgröße ICONIC IP), Abstände an der
  ABOUT-BANIJAY-Benchmark `min(46vh, 440px)`.
- **Company-Video-Karten:** Blitzer-Kanten weg (Scrim + Medium je 1px überscannt, vom
  overflow-hidden geclippt); **Elevate** bekommt einen echten Video-Frame als Poster statt des
  formatfüllend gestreckten Logos.
- **ICONIC-IP-Marquee (mobil):** vierte Reihe (rechts→links) ergänzt, alle Reihen 25 % größer
  (108→135px). Desktop unverändert (3 Reihen).
- **Marcus-Quote (mobil):** Bildcontainer 30 % höher, Quote von 4vw auf 3.1vw verkleinert
  (lange Quote war nicht lesbar).
- **Facts-Akkordeon:** Titelfarbe = Ziffernfarbe (`tone.fg` statt gedämpftem `tone.label`);
  Ziffern-/Titelgrößen bleiben wie zuvor (die „170+"-Angleichung wurde zurückgenommen).
- **#BanijayGermany-Slider (mobil):** kein Pin mehr → nativer horizontaler Swipe
  (overflow-x-auto + scroll-snap); behebt Ruck beim Einrasten, Swipe-Timing und den zu früh
  hochlaufenden Footer. Mehr Abstand zur Magenta-Section darüber (Top-Padding 5.56→18vw).
- **News-Hero (mobil):** harter Umbruch „Immer auf dem / neuesten Stand:".
- **Footer:** „Pressekontakt:" wie Mail/Tel formatiert (gedämpftes Label + Doppelpunkt).
- **Impressum/Datenschutz:** kein eingerastetes Seitenlabel mehr unter dem B-Logo (die langen
  Wörter ragten mobil aus dem Screen).
- **Lucky Pics:** weißes Schriftlogo oben rechts auf der Company-Karte.
- **Offen (braucht Live-Tuning):** die Team→Video-Blende (LogoReveal, gepinnte `-100vh`-
  Overlap-Choreografie) — im automatisierten Preview nicht zuverlässig reproduzierbar.

### Social-Feed gemischt, Team-Feinschliff, Brainpool-Video (22.07., spätabends)
- **Social-Feed – neue Datenlogik:**
  - **Home:** Instagram-Feed `@banijaygermany` läuft jetzt über **Elfsight** (von Banijay
    eingerichtet), aber im **eigenen Banijay-Slider** (kein Fremd-iframe). Die Posts kommen
    server-seitig aus Elfsights Data-Service; die Instagram-Cover laufen über den
    `phosphor`-Bildproxy (Instagram blockt direktes Hotlinking). Reine Reels ohne Cover werden
    übersprungen, Slider-Bilder `loading="eager"`.
  - **Career + News:** LinkedIn (Juicer) **und** Instagram (Elfsight) in **einer** datums-
    sortierten Liste, **kanalübergreifend dublettenbereinigt** (gleicher Aufhänger / Text-
    Jaccard ≥ 0,5 / gleiches Motiv + ähnlicher Text — Bild-Hash allein untauglich, da IG/LI
    unterschiedlich croppen). Bei Doppelpostings bleibt **Instagram** stehen (`PREFER`).
  - ⚠️ Elfsight-Endpoints sind undokumentiert → vor Livegang gegen die offizielle
    Meta-/Instagram-Graph-API absichern; Fetch fällt weich aus (Section blendet sich aus).
- **Editorial-Quote-Section:** farbiges Marcus-Bild (`macus zitat.JPG`) enger gecroppt
  (größer, links-of-center); Textcontainer auf `min(62rem, 86%)`; Zitat auf **einen Absatz**
  gekürzt (erster Absatz raus, verbleibender öffnet mit Anführungszeichen).
- **Team-Grid 3 / 5 / 4:** mittlere Reihe fünf inkl. **Michael Gaul**, untere Reihe vier
  (Elena, Sebastian, Matthaeus, Aylin); untere Reihe **gleich hoch** wie die mittlere (48vh),
  damit unten nichts angeschnitten wirkt.
- **Team-Fotos angeglichen:** Michael Laegel kleiner/tiefer, Scheitel bündig mit Marcus/Knut;
  Simone/Natali/Janine feinplatziert; **Natali** Scheitel auf Heike-Höhe; **untere Reihe je
  ~8 % kleiner** im Container (Person im 900×1353-Rahmen verkleinert, weicher Selbst-Blur-Rand).
- **Company-Video:** **Brainpool** zeigt jetzt den Roland-Kaiser-Clip (5-Segment-Montage,
  960×540, libx264 CRF 28, ohne Ton, +faststart).

### Team-Section final: nur noch „Snap" (Widget + andere Varianten entfernt) (22.07., Abend)
- **Entscheidung:** Team-Section läuft final als **Snap** — Umschalt-Widget und die übrigen
  Varianten (Raster/Editorial/Clean/Masonry) entfernt (`TeamSwitcher`, `Founders`,
  `FoundersEditorial`, `FoundersClean`, `FoundersMosaik` gelöscht). Fokuspunkte in
  `teamFocus.ts` ausgelagert.
- **Snap-Layout 3 / 4 / 5:** oben Marcus · Knut · Michael Laegel (größer), darunter 4, dann 5;
  **kein Ein-Viewport-Snap** mehr — man scrollt durch die drei Reihen, der Pin/Halt kommt erst
  **unterhalb der dritten Reihe** (`bottom bottom`), dann steigt die LogoReveal-Blende auf.
- **„UNSER TEAM"-Intro** ist jetzt **exakt wie „ABOUT BANIJAY"** formatiert (7vw, 112 %,
  −0.02em) und animiert (zwei Zeilen konvergieren gescrubbt, Staub blendet gescrubbt auf) —
  gemeinsame `TeamIntro`-Komponente.
- **Team-Fotos:** Marcus (`Marcus-edit.jpg`, Leader-Crop) ins Team, das bisherige S/W-Foto in
  die Quote-Section; Janine (`Janine-neu.jpg`) neu. **Live-Veranstaltungen**-Text mit Umbruch
  nach dem ersten Satz.

### Team-Section: fünf umschaltbare Layout-Varianten + „UNSER TEAM"-Intro (22.07.)
- **Umschalt-Widget** (`TeamSwitcher`) mit fünf Team-Layouts: **Raster** (gepinntes
  Spiral-Grid), **Snap** (alle 12 in EINEM Viewport, gleich große Kacheln), **Editorial**
  (variables 7×6-Feinraster, Marcus/Knut/Michael Laegel als größte Container), **Clean**
  (helles Corporate-Raster, 3 Leader oben + ruhiges 3-Spalten-Grid, weiße Namenskarten) und
  **Masonry** (full-bleed gap-0-Masonry nach Briefing: 3 Large versetzt + 9 Standard, weiße
  Namenskarten, kein Hintergrund/Schatten/Border/Filter).
- **„UNSER TEAM" als Intro-Sequenz** vor Raster/Snap/Editorial (Word-Reveal auf Sternenstaub);
  die alte In-Stage-Headline im Raster wurde entfernt (keine Doppelung).
- **Einrasten:** Snap/Editorial/Clean/Masonry werden beim Erreichen gepinnt (ScrollTrigger),
  halten ~90vh still und geben dann die LogoReveal-Videoblende frei — dasselbe physische
  Verhalten wie das Raster. Video-Timing bei allen Varianten großzügiger (mehr Space).
- **Namenskarten** kantig (Heike-Regel), ohne weiße Kontur, wachsen bei mehrzeiligen Titeln mit.

### Company-Videos, Marcus-Fotos, News-Nachschlag & Wording (22.07.)
- **Company-Videos** (weboptimiert, CRF 28, ohne Ton): ShowdownTV (Live-Mitschnitt, Hochformat),
  en2rage (Montage mit Evelyn Burdecki), Brainpool (Best-Of-Puffi-Montage), EndemolShine Germany
  (5-Sequenzen-Montage statt flackerndem Trailer-Anfang), Elevate.
- **Marcus-Fotos** getauscht: Team (S/W, `Marcus2.JPG` → Leader-Crop), Quote-Section
  (`Marcus Quote.jpeg`, 1500×1875).
- **News** (Crawl von banijay.de): zwei neue Beiträge — „Christian Franckenstein im Banijay-
  Podcast WOLTER TALKS" (20.07.), „Banijay Germany gründet neue Company mit Sebastian Lege"
  (14.07.), inkl. optimierter Titelbilder. News-Hero-Statement + harter Umbruch nach Doppelpunkt.
- **Wording** (Editorial-Fact-Cards & Home-Statement): „Entertainment Powerhouse" (ohne
  Bindestrich), „Banijay Group" → „Banijay Entertainment", 40+-Companies-Text (filmpool
  entertainment, Banijay Germany Live, Cape Cross), Mitarbeiter-Text (WWM, Berlin – Tag & Nacht,
  Temptation Island; „deutschen" gestrichen), Live-Veranstaltungen-Text, „Views" statt
  „Views & Zuschauer".
- **`SOCIAL-FEED-TOKENS-ANLEITUNG.md`**: Kunden-Handout zum offenen Instagram-Token (LinkedIn
  läuft bereits via Juicer; Instagram-Quelle im Juicer-Konto neu zu verbinden).

### Mobile-Fixes: Nav (Spotify/News-Preview), größere Zwischenheadlines, Team→Video-Timing (21.07.)
- **Mobile-Navigation, Spotify:** Das `open.spotify.com`-Embed wird auf Mobilgeräten oft
  vom Tracking-Schutz geblockt (kaputte graue Box). Auf Mobile blende ich das iframe aus
  und zeige stattdessen einen robusten **„WOLTER TALKS"-Button** (Spotify-Icon) in „Folgen".
  Desktop behält den vollen Player.
- **Mobile-Navigation, News-Preview:** Der aufklappende Artikel-Slider lag im rechtsbündigen
  Nav-Block und war mit 92 vw breiter als die Content-Spalte → links abgeschnitten. Jetzt
  `self-start` + volle Content-Breite → alles im Bild.
- **Mobile-Zwischenheadlines größer** (Wolfram): Die Zwei-Wort-Headlines waren zu klein.
  „Companies & Labels" 7 vw → 14 vw (≈ so groß wie „40+"), „Iconic IP" 7 vw → 13 vw,
  „Unser Team" 7,4 vw → 13 vw. Desktop unverändert.
- **Home Mobile — Team→Video-Blende entkoppelt:** Das mobile Team-Grid ist höher als 100vh;
  der frühere End-Pin + der -100vh-Overlap des LogoReveal-Videos zogen das Video „zu früh"
  über die untersten Reihen (ruckelte, schnitt Teammitglieder ab). Auf Mobile scrollt das
  Team jetzt vollständig durch, das Video folgt OHNE Overlap (`marginTop` mobil = 0).
  Desktop behält Pin + Overlap.

### Team-Feinschliff (Größe/Mitte), Marcus-Position & Magenta-Leiste-Baseline (21.07., 5. Runde)
- **Team-Portraits nachjustiert** (mehrere waren zu groß bzw. nicht mittig): **Simone**,
  **Janine** kleiner + mittig; **Michael Gaul** deutlich kleiner + mittig; **Natali**
  mittig; **Elena** größer + mittig; **Sebastian** mittig; **Aylin** leicht nach rechts
  (~52 %). Methode diesmal zuverlässiger: Quell-Landmarken aus den dokumentierten Crops +
  gemessenen Ist-Positionen abgeleitet (statt neuer Original-Messungen).
- **Marcus Wolter** bewusst etwas tiefer (~17 %) und weiter links (~37 %) in seiner
  Leader-Kachel gesetzt (Wolfram-Wunsch) — nicht auf der 12 %-Scheitellinie der anderen.
- **Editorial-Magenta-Leiste:** „Companies weltweit" sitzt jetzt auf der **Grundlinie von
  „170+"** (nebeneinander, `items-baseline`) statt gestapelt; der Kasten ist **flacher**
  (vertikales Padding reduziert, ~189 statt ~258 px).

### About-Archivierung, Editorial-Magenta-Leiste, Scheitel-Angleichung Team & Career-Full-Bleed (21.07., 4. Runde)
- **About-Seite komplett archiviert.** Route `/about` liefert jetzt 404: `about/page.tsx`
  → `about/page.tsx.archived` umbenannt (Code bleibt als Speicher, per Zurückbenennen
  reaktivierbar). Aus der Navigation (`site.ts`) und dem Scroll-Label (`SiteHeader.tsx`)
  genommen. Die Editorial-/Facts-Inhalte leben unverändert auf der **Home**.
- **Editorial-Facts (Home) — Wording:** „Primetime-Hitrate" → **„Primetime Hitrate"**
  (Bindestrich raus), „…und Mitarbeiter" → **„Mitarbeiterinnen & Mitarbeiter"** (kaufm. &),
  „…Zuschauer jährlich" → **„Views & Zuschauer"**, „Live-Veranstaltungen jährlich" →
  **„Live-Veranstaltungen"** (jeweils „jährlich" raus).
- **Facts-Kachel „170+ Companies weltweit" → „4.500 hrs. Entertainment"** (Copy von der
  3000er-Vorlage gemäß Ziffern-Regel auf 4.500 angeglichen).
- **Weiße „Banijay Story"-Box → Magenta-Leiste** (`#ff4370`): links **170+ Companies
  weltweit**, rechts **banijay.com**-Link (Inhalte wie auf der alten Seite). Das „+" ist
  als Einheitszeichen formatiert (0,54em, `top 0.14em`) — analog zu den Facts. Der lange
  2-spaltige Story-Text ist raus (liegt in der Git-Historie).
- **Drift-Band (Career Code of Conduct) — zwei Text-Card-Clips ersetzt:** `clip-07`
  (endete auf „300+ SHOWS. EVERY YEAR.") und `clip-08` („25+ COMPANIES & LABELS") frisch
  aus dem 9×16-Trailer geschnitten (158 s Bergsteiger/Helikopter, 291 s Zipline über
  Wasser), Frame-für-Frame textfrei geprüft. Snippet-Regel im Code hinterlegt.
- **Team-Portraits — Scheitel-Angleichung je Reihe** (frisch aus den Originalen, per
  Kachel-Replikat verifiziert): **Leader** (Ref Marcus) — Michael Laegel hoch, mittig, auf
  Marcus-Größe; Knut per object-position (8 %→5 %) scheitelbündig (Größe unverändert, sein
  Original 1362×2048 lässt kein Herauszoomen zu). **Mitte** (Ref Heike) — Simone höher +
  kleiner, Natali kleiner/links/höher, Janine mittig/höher, Michael Gaul runter/kleiner.
  **Unten** (Ref Matthäus) — Elena höher, Sebastian runter, Aylin höher + nach links.
  Zusätzlich **Elena Kats ↔ Michael Gaul** getauscht.
- **Career „Banijay Tomorrow": rechtes Keyvisual full-bleed.** Der Bild-Container bricht
  aus dem zentrierten Raster nach rechts bis an die Viewport-Kante aus (negative
  `marginRight`) und füllt via `self-stretch` die volle Höhe der Textspalte (Headline →
  Copy/CTA). Kein horizontaler Overflow; einkomponierte Typo bleibt unbeschnitten.
- **ShowdownTV** als neue Company in allen Verzeichnissen (Bento, Ökosystem, Directory,
  Cards) + Weiß-Logo; **MTS Management** (Tony Bauer) und **Cape Cross Postproduction**
  Videos enkodiert; Career-Section „Unser Angebot" archiviert (`CareerRoleScroller`).

### Team-Fotos komplett, Kopf-Normalisierung, Career & Company-Videos (21.07.)
- **Alle 12 Team-Portraits sind jetzt echt.** Die letzten Platzhalter (`lead-1.jpg`)
  abgelöst: **Marcus Wolter** (Leader-Reihe, wie Michael Laegel beschnitten), **Matthaeus
  Jaworek** (neues Foto), **Janine Berns** und **Natali Naso**. `lead-1.jpg` läuft nicht
  mehr doppelt.
- **Kopf-Normalisierung der mittleren Reihe + Aylin** (2 Runden): Gesichter höher gerückt
  (mehr Körper unten), Kopfgrößen an **Matthäus als Referenz** angeglichen (~33 %), Kinne
  auf eine Output-Zeile. Simone bleibt bei ~40 % — ihr Original ist ein enger Close-up
  (Kopf füllt die volle Bildbreite), kleiner geht physikalisch nicht.
- **Positionen Heike Lutzer ↔ Natali Naso** in der mittleren Reihe getauscht.
- **About: „Unser Team"-Headline** erscheint jetzt zuverlässig — neue `staticHead`-Prop
  setzt die Headline auf About statisch sichtbar (das Wort-Reveal feuerte wegen mehrerer
  gepinnter Sektionen davor nicht verlässlich). Home behält die Animation.
- **About-Fakten-Boxen:** Copytexte raus, Headlines bündig auf die untere Ebene, Boxen
  niedriger (18vw→13vw).
- **Editorial (Marcus-Interview):** neues Foto `IMG_6457`.
- **Career „Unser Angebot":** Hintergrund konstant **neutrales Magenta** (kein Farb-Shift
  je Rolle mehr), und **alle vier Karten gleichzeitig sichtbar** — Fan+Swipe entfernt, die
  Karten steigen auf und ordnen sich als eine Reihe an; Section deutlich kürzer.
- **Companies-Bento:** **MyShow** als Einzelkachel (war breit), **Cologne Comedy Festival**
  dafür breit; Magenta-Arbeitsmarker bei **Dynamic Ally** entfernt.
- **Vier neue Company-Videos** (ffmpeg CRF 28, 960×540, ohne Ton): **Potatohead Pictures**
  (Kitchen Impossible), **SR Management** (Giovanni Zarrella), **MyShow** (Scroll-Screencast,
  Cookie-Banner am Anfang übersprungen, Schnitt ab 8 s), **Only Good People** (Sport-Reel
  „SelfieSandra", 16:9-Band aus Hochformat).

### Hero-Naht + Only Good Party People (20.07., dritter Block)
- **Dünne Linie am Hero→Statement-Übergang** (Wolfram): kein Struktur-Fehler. Gemessen
  liegen Balken-Unterkante, Statement- und DustStage-Veil-Oberkante alle pixelgenau auf
  1908,0 (Lücke 0), beide Bänder sind dieselbe Farbe #ff4370. Die Linie ist ein
  Antialiasing-Artefakt: zwei getrennt gerasterte Magenta-Gradienten (linearer Balken +
  radialer Veil) an geteilter Kante zeigen auf Retina/bei Zoom einen 1px-Saum, durch den
  der dunkle Grund (#0a0208) schimmert. Defensiv behoben: Der Hero-Balken reicht jetzt 6px
  unter seinen Container (hinter den Veil) → die Naht liegt immer auf Magenta, unabhängig
  von DPR/Zoom. Kein Overflow, Layout unverändert.
- **Only Good Party People** vorerst auf ogp.rocks (Only Good People) verlinkt — bewusster
  Verweis auf die verwandte Company bis zum eigenen Auftritt. In Bento-Directory + Ökosystem.

### Hero: dritter Frame neu (20.07.)
- **Alle Frame-3-Hero-Motive** (der „We Are Banijay"-Typo-Frame) aus dem aktualisierten
  `assets/Visuals/Hero`-Ordner neu weboptimiert — je 5 Desktop + 5 Mobile: Home, About,
  Career, News und die (aktuell ungenutzte) Companies-Variante.
- Reiner Asset-Tausch, KEINE Code-Änderung: Die Dateinamen und Maße bleiben (Desktop
  2880×2129, Mobile 1400×1861 hochkant), nur die Bildinhalte sind neu. mozjpeg q82,
  Desktop ~150–167 KB, Mobile ~88–102 KB.
- Companies-Variante mitgezogen, obwohl in keiner Section referenziert (kein
  Companies-Hero auf der Seite) — hält den Satz konsistent.

### Company-Logos, Team-Layout, IP-Ticker (20.07., zweiter Block)
- **Company-Logo-Abstand fest statt prozentual.** Vorher `right-[4%] top-[6%]` — Prozent
  oben rechnet gegen die Höhe, Prozent rechts gegen die Breite, also liefen die Abstände
  je Kachelformat auseinander (hohe Kachel oben 30/rechts 13, breite Kachel oben 15/
  rechts 27). Jetzt `top-3.5 right-3.5` → überall gleiche 14px. Betraf alle Logos, aufge-
  fallen an Pausenclown.
- **Pausenclown-Media-Logo +50 %** (h-[1.4rem]→h-[2.1rem], md h-[1.6rem]→h-[2.4rem]) über
  `logoClass`. Gemessen: 26px→38px.
- **Team-Grid: Matthaeus Jaworeks 3-zeilige Rolle** („Director Financial Planning,
  Reporting & Controlling") ragte unten aus der Bühne. Die Rolle ist bewusst auf 1 Zeile
  Höhe fixiert (damit alle Namen fluchten), Mehrzeiler hängen per overflow nach unten.
  Fix: unten 2,4rem Reserve (2 Rollen-Zeilen, Worst Case) → das flex-1-Grid schrumpft
  minimal, der ganze Aufbau rückt nach oben, der Überhang hat Platz. Gemessen ohne Cut
  bei 1440×900 und 1120×760 (dort 3 Zeilen).
- **IP-Ticker, dritte Reihe:** Klarstellung — die Reihe stand nur in der Preview-Sitzung
  still, weil ich sie zuvor für einen Screenshot angehalten und verschoben hatte. Im
  Code läuft sie (`ipBrandsLeft`, 64s); nach Reload wieder in Bewegung. Keine Änderung.

### Video-Toolchain auf ffmpeg umgestellt (20.07.)
- **`brew install ffmpeg` ist erledigt** (8.1.2, libx264/x265/SVT-AV1) — nach Wolframs
  Freigabe. Damit sind CEWE-ffmpeg, `avconvert` und VLC als Notlösungen abgelöst.
- **Anlass war Wolframs Frage, ob der bisherige Stand livegang-tauglich ist. Antwort nach
  Messung: nein — und zwar aus einem anderen Grund als angenommen.** Ich hatte behauptet,
  die VLC-Dateien seien „rund ein Drittel größer als nötig". Tatsächlich sind sie
  **sichtbar verschlechtert**: VLC lief mit fester Bitrate (`vb=1600`), die bei bewegten
  und dunklen Szenen wegbricht — und genau davon leben die Clips (Bühnenlicht, Feuer,
  Konzerte). Am Clip Cape Cross gegen eine CRF-16-Referenz gemessen: **VLC 2,02 MB bei
  SSIM 0,73** gegen **ffmpeg CRF 30 1,43 MB bei SSIM 0,962**. Kleiner UND besser, kein
  Zielkonflikt. VLC verschluckt zusätzlich Einzelbilder (263 statt 265).
- **Methodischer Fallstrick, dokumentiert im README:** Die ersten beiden SSIM-Messungen
  waren wertlos, weil die Spuren zeitlich versetzt liefen — dann vergleicht SSIM Bild 10
  mit Bild 12. Erst ein Durchtesten des Frame-Versatzes (0–3) hat bestätigt, dass der
  Qualitätsunterschied real ist und kein Messartefakt.
- **Neuer Standardablauf** für jede Zulieferung: erst `blackdetect` (Zulieferungen waren
  mehrfach defekt), dann Kontaktbogen für den Ausschnitt, dann `libx264 -crf 28 -preset
  slow -movflags +faststart`, dann Sichtprüfung im Browser.
- **Offen:** Die 22 Altclips (67 MB) stehen zur Neuberechnung an; CRF 28 oder 30 ist noch
  nicht entschieden.
- **Performance-Bestandsaufnahme** (auf Wolframs Frage, ebenfalls im README): Beim reinen
  Seitenaufruf ohne Scrollen werden **12,85 MB** übertragen, davon **11,86 MB Video** über
  35 Requests; `team-all3media.mp4` (6,67 MB) lädt komplett. 14 von 34 Kacheln haben kein
  Posterbild. Gut ist dagegen: `moov`-Atom vorn (streambar), IntersectionObserver pausiert
  außerhalb des Sichtfelds, `preload="metadata"` statt `auto`.

### Company-Material: 5 neue Kacheln + Magenta-Arbeitsmarker (20.07.)
- **Neu mit eigenem Material:** Cologne Comedy Festival, Banijay Germany Live
  (Luminescence — die eingebrannten Untertitel sind laut Wolfram kein Ausschlusskriterium
  mehr, die alte Code-Notiz dazu ist hinfällig), influence.vision, Cape Cross
  Postproduction, MySpass (erster Clip mit ffmpeg: **0,52 MB bei SSIM 0,985**, mit VLC
  wären es ~2 MB bei ~0,73 gewesen), Magic Connection.
- **Cape Cross: nicht die ausgewählte Datei verwendet.** `CC_Website_1.mp4` ist defekt —
  97 s deklariert, davon ~3 s Logotafel und **87 s Schwarzbild im Quellfile selbst**.
  Stattdessen `CC_Website_3.mp4`. Wolfram informiert; ein sauberer Export wäre nachzufragen.
- **Magic Connection ist ein Foto, kein Video** → läuft über den Still-Zweig mit dem
  vorhandenen Ken-Burns-Zoom (Scale 1,0 → 1,08 über 14 s, yoyo).
  ⚠️ **Der Anschnitt steckt IM BILD, nicht in `objectPosition`:** Das Original (1000×667,
  Verhältnis 1,50) hat fast exakt das Kachelformat (≈1,48) — vertikal gibt es nichts zu
  verschieben, `objectPosition` läuft ins Leere. Im Original lag der Schriftzug in der
  unteren Bildhälfte und damit unter dem Kachel-Titel; „TOO :)" war verdeckt. Fix: oben
  150 px Blattwerk weggeschnitten (jetzt 1000×517).
- **Magenta-Arbeitsmarker** (`data-bento-missing`, `rgba(255,67,112,0.45)`) auf allen
  Kacheln ohne eigenes Material — auf Wolframs Wunsch, damit auf einen Blick sichtbar ist,
  was noch fehlt. Stand: **16 von 35 offen**. ⚠️ Vor Livegang entfernen.

### Ökosystem: Aufklapprichtung per Messung statt fester Regel (20.07.)
- **Entertainment lief unten aus dem Bild** (Wolfram, flacher Laptop-Viewport). Ursache:
  Die Richtung entschied allein die Ankerlage (`fy > 0.62`) und ignorierte, wie hoch die
  Card wird und wie hoch das Fenster ist. Entertainment hat die längste Liste, sitzt aber
  in der oberen Hälfte.
- **Hochschieben allein hätte es nicht gelöst:** Bei 1440×760 braucht die Card 475 px, hat
  unten 356 px und oben 282 px — sie passt in **keine** Richtung. Daher zweistufig: erst
  die bessere Richtung per Messung, dann bei Bedarf Deckelung der Liste auf den real
  verfügbaren Platz mit Innenscroll.
- **Fallstrick für später:** NICHT den `[data-eco-panel]`-Wrapper messen. Der wächst per
  `grid-template-rows`-Transition und steht zum Messzeitpunkt noch auf 0 → `scrollHeight`
  liefert 0, die Card klappt nie um. Gemessen wird der innere Content-Block.
- Verifiziert ohne Überlauf bei 1920×1080, 1440×760, 1366×540, 1280×620; auf hohen Fenstern
  greift der Deckel nicht (Verhalten unverändert). Mobile-Akkordeon unberührt.

### Texte & URLs (20.07.)
- **Home-Statement**, dritte Fassung: Gedankenstrich statt Doppelpunkt, „globales
  Powerhouse", „die bekanntesten Brands", „außergewöhnlichsten Live-Erlebnisse".
- **Career-Statement** neu: „Finde hier deinen Traumjob! …". Der Statement-Renderer
  respektiert jetzt ein `\n` als Umbruch; Statements ohne `\n` rendern unverändert.
  ⚠️ Offen: Der Zuruf steht in derselben Größe wie der Fließtext und liest sich nicht als
  Headline; der Block ist mobil 14 Zeilen lang. Hierarchie-Entscheidung steht bei Wolfram.
- **Vier neue Company-URLs** (alle auf 200 geprüft): filmpool entertainment, filmpool
  fiction, Magic Connection, South & Browse — in Bento-Directory und Ökosystem.
- **Potatohead Pictures global entlinkt** — es gibt keine eigene Website. Der frühere
  Ersatz-CTA auf die EndemolShine-Teamseite ist mit raus, `externalUrl` ist jetzt optional.
- **Team:** Aylin Firat ans Ende des Grids.

### Preloader: Partikelgröße + Querbalken im Hero (20.07.)
- **Partikel quollen beim B-Aufbau auf.** Der Punktradius wuchs während des Formens mit
  (`0.6 → 1.15`), der Warp startete danach bei Faktor `1.0` — sichtbar als „erst dicker,
  dann kleiner, dann Zoom". Jetzt bleibt die Punktgröße beim Formen **konstant klein**
  (0.6) und der Warp startet bei **exakt derselben** 0.6 → kein Aufquellen, kein
  Größensprung, die Streaks skalieren von der kleinen Größe nativ hoch.
- **Querbalken im oberen Hero nach der Warp-Blende.** Ursache war der Magenta-Grund in
  `AlgarveHome` (`absolute inset-x-0`, `top: 26vh`), dessen Gradient **hart** mit `#1e0816`
  begann. Da `SECTION_BG` auf `transparent` steht, schien darüber der globale MoodBackdrop
  durch → die Oberkante stand als sichtbare Querkante quer im Hero (Desktop **und** Mobile),
  bis der Hero-Aufbau sie überdeckte („blendet sich wieder weg").
  Fix: Der Gradient blendet über die ersten **10 % aus Transparenz ein** statt hart zu
  starten; ab 10 % unverändert deckend, die Abdeckung hinter der radialen Hero-Kante (der
  eigentliche Zweck des Elements) bleibt vollständig erhalten.
- Verifiziert: Gradient startet nachweislich transparent (`rgba(30,8,22,0) 0%` → deckend ab
  10 %), Hero rendert ohne harte Kante. Den exakten Moment direkt nach dem Warp kann das
  Preview-Pane nicht nachstellen (Intro läuft dort in einem Tick durch) — die strukturelle
  Ursache ist aber beseitigt.

### Team: echtes Portrait für Heike Lutzer (20.07.)
- **Heike Lutzer** bekommt ihr echtes Foto und löst damit den Platzhalter `lead-8.jpg` ab —
  neue Datei `public/people/heike-lutzer.jpg`, Datenzeile in `leadership.ts` umgehängt,
  Fokuswert (`50% 18%`) auf den neuen Dateinamen umgezogen. `lead-8.jpg` wird nirgends mehr
  referenziert.
- Beschnitt nach derselben Regel wie die übrigen Zulieferungen: Ganzkörper-Quelle
  (3812×5712, Kopf nur ~10 % der Bildhöhe, Person links im Bild) eng auf **Kopf ~29 %** der
  Rahmenhöhe gerechnet, Kopf-Oberkante bei 12 %, horizontal auf ihr Gesicht zentriert →
  Ausgabe 900×1200 (3:4) wie alle anderen Portraits.
- Verifiziert: lädt sauber (900×1200), `object-position 50% 18%`, kein `lead-8` mehr im DOM.
- **Stand jetzt: 9 von 12 Portraits echt.** Übrig als Platzhalter: Marcus Wolter,
  Natali Naso (`lead-6.jpg` zeigt eine andere Person), Janine Berns — `lead-1.jpg` weiterhin
  doppelt (Marcus + Janine).

### Preloader: Scroll während des Intros gesperrt (19.07.)
- Beim Erst-Load bzw. beim Klick auf Home ratterte die Seite HINTER dem laufenden
  Preloader schon an die Zielposition, wenn man währenddessen scrollte — man landete nicht
  im Hero.
- **Ursache (Race):** `IntroOverlay` rief `window.__lenis?.stop()` — mountet es aber VOR
  `SmoothScroll`, existiert `__lenis` dort noch nicht → Optional-Chaining = No-Op, und
  `SmoothScroll` erzeugte danach ein **laufendes** Lenis. `overflow:hidden` allein hält
  Lenis nicht auf.
- **Fix, drei Schichten:**
  1. `SmoothScroll.tsx` liest beim Erzeugen das `data-intro`-Flag und startet Lenis
     **gestoppt**; Freigabe erst auf `banijay:introdone`. Damit sind BEIDE Mount-Reihenfolgen
     abgedeckt (mountet SmoothScroll zuerst, greift weiterhin `IntroOverlay`s `.stop()`).
  2. `IntroOverlay.tsx` sperrt zusätzlich die nativen Auslöser: `wheel`, `touchmove` und die
     Scroll-Tasten (↑↓, Bild auf/ab, Pos1/Ende, Leertaste) mit `passive:false` + `preventDefault`.
  3. Beim Freigeben hart `scrollTo(0,0)` **und** `lenis.scrollTo(0, immediate)` → Start
     garantiert im Hero. Unmount mitten im Intro löst die Sperre sauber (kein Hängenbleiben).
- Verifiziert (Mechanismus isoliert): Lenis gestoppt + 10× Mausrad → `scrollY` bleibt **0**;
  nach `start()` → 3940. Das echte Intro-Fenster ist im Preview-Pane nicht reproduzierbar
  (GSAP `lagSmoothing(0)` + gedrosseltes rAF spielt die 7-s-Timeline in einem Tick ab) →
  Endabnahme im echten Browser.

### Browser-Kompatibilität: Safari-Prefix + Menü-Overlay auf dvh (19.07.)
- `CompanyCard.tsx`: fehlendes `-webkit-backdrop-filter` ergänzt (Tier-Label-Milchglas
  blurrte in Safari nicht). Alle übrigen `backdrop-filter`/`mask-image`-Stellen waren
  bereits korrekt geprefixt.
- `SiteHeader.tsx`: Fullscreen-Menü von `100vh` auf **`100dvh`** (plus `min-h-[100dvh]`).
  Auf mobile Safari/Chrome ragte das Overlay hinter die Adressleiste → untere
  Instagram/LinkedIn/Podcast-Buttons abgeschnitten bzw. Sprung beim Ein-/Ausblenden. Das
  Menü ist **kein** Scroll-Pin → `dvh` ist hier gefahrlos.
- **Bewusst NICHT angefasst:** die übrigen 55 `100vh`. 6 der Dateien sind gepinnt
  (AlgarveHome, EditorialStickyScene, EcosystemSection, CompaniesScroller,
  CareerRoleScroller, Founders) und die Home nutzt `-100vh`-Overlaps, die exakt mit den
  gepinnten `100vh`-Höhen zusammenpassen. Blindes `dvh` würde die Scroll-Choreografie
  brechen → separater, section-weiser Job mit Gerätetest.

### Ökosystem: eigenständige Mobile-Ansicht (19.07.)
- Die gepinnte Desktop-Orbit-Grafik mit Chips auf den Bahnen funktionierte auf 9:16 nicht.
  Mobile ist jetzt ein **eigener Pfad** (per Breakpoint gegated, Desktop unverändert):
  **symmetrisches Atom** oben (gleich lange Bahnen, Tilts gleichmäßig ~alle 30° verteilt →
  keine dominante Achse, quadratisch zentriert), darunter die Rubriken als
  **Akkordeonliste** mit Trennlinien; immer nur eine offen.
- **Kein Pin/Scrub auf Mobile** — stattdessen einmaliges Reveal (`once`) plus gescrubbter
  **Parallax-Drift** der Grafik. Vorher blendete das Reveal beim Weiterscrollen wieder aus
  (`toggleActions … reverse`) → wirkte „geblockt", Grafik verschwand.
- **Fix `useGSAP revertOnUpdate: true`:** ohne das blieb der beim SSR-Erstrender (isMobile
  startet false) erzeugte Desktop-**Pin** auf Mobile aktiv (Section `fixed`, Pin-Spacer) —
  betrifft auch echte Handys, da SSR immer als Desktop startet.
- `page.tsx`: der `-100vh`-Statement-Overlap gilt nur noch ab `md` — mobil schimmerte sonst
  das Statement-Wording hinter Grafik + Liste durch.

### Companies-Bento Mobile: Zwischenheadline + platzsparender Filter (19.07.)
- **Neue Mobile-Zwischenheadline „40+ / COMPANIES & / LABELS"** (Dreizeiler) über der
  Company-Video-Section — sie ersetzt die Desktop-Swap-Phase des Ökosystems, die mobil aus ist.
  Gestaltung 1:1 wie „About Banijay": gescrubbte Konvergenz (obere Zeile von −15vh, untere
  von +15vh, scrub 0.8) + einblendender Sternenstaub, uppercase, `letter-spacing -0.02em`.
- **Bug dabei gefunden:** `line-height: 112%` stand auf dem `h2` ohne eigene `font-size`
  (Default 16px) → 18px-Zeilenboxen, die 56px-„40+"-Glyphen liefen über und überlagerten die
  Caption. Fix: **unitless** `line-height` (skaliert mit der jeweiligen Span-Schriftgröße).
- **Kategoriefilter mobil:** statt Chip-Buttons **unterstrichene Text-Hyperlinks** in exakt
  **2 Zeilen** (aktiv magenta + unterstrichen) → spart Höhe. Desktop behält die Chips.
- Mehr Abstand nach oben zur Ökosystem-Akkordeonsektion (~112 → ~177 px).

### About Banijay (Marcus): Mobile-Section neu aufgebaut (19.07.)
- **Bild** höher (104vw, Hochformat) mit der Quote unten drauf, **sticky unter der Nav**
  (`top: 72px`, knapp unterm B-Logo) und **„zoomt zusammen"** beim Scrollen (Höhe gescrubbt
  104vw → 62vw). Kein Pin (auf Mobile heikel), nur Sticky + Scrub.
- **Quote-Laufweite** mobil 64 % → **90 %** → 6 statt 9 Zeilen, ragt nicht mehr so hoch ins Bild.
- **Fakten-Akkordeon:** Karten geschlossen kompakt (**136 → 63 px** — `flex-grow` füllte
  vorher die Höhe auf, dazu `min-height` raus), Lücke zum Bild geschlossen.
- **Farbkodierung repariert:** `clearProps: "all"` wischte auf Mobile den von React gesetzten
  Karten-`background` (Magenta/transparent) mit weg — deshalb fehlte die Desktop-Farblogik
  dort komplett. Jetzt werden nur noch die GSAP-Props zurückgesetzt.
- **Akkordeon fließt natürlich** statt fixem `overflow`-Panel: die unterste Karte wurde
  abgeschnitten und das Modul wuchs beim Aufklappen nicht mit. (Nebeneffekt: das sticky Bild
  hält länger, weil der Container höher ist.)
- **„Die Banijay Story"** mobil ohne `yPercent`-Parallax (nur Desktop): der zog die weiße Box
  erst voll herein, wenn das Akkordeon schon aus dem Screen war → man sah den Text nie ganz.
  Jetzt normaler Block, sofort vollständig sichtbar. Desktop-Andock-`marginTop` ebenfalls auf
  `md:` begrenzt.

### Team-Section Mobile + drei Portraits (19./20.07.)
- **Headline mittelachsig** (war linksbündig).
- **Die drei Leader** (Marcus, Knut, Michael Laegel) mobil jeweils über die **volle Breite**
  gestapelt, darunter durchgehend zweispaltig.
- **aspect-ratio-Bug behoben:** der Bildcontainer ist ein Flex-Kind (`min-height:auto`), das
  `<img>` trieb die Höhe auf seine **natürliche** Bildproportion → die `aspect-ratio` wurde
  ignoriert und jede Kachel war so hoch wie ihr Bild (Natalis 3:4-Foto ergab ein sichtbar
  niedrigeres Feld als die 0.665-Portraits). Fix: Bild **absolut** positioniert → jetzt sind
  **alle** Kacheln exakt 4/5.
- **Headline-Reveal-Trigger:** das Mobile-Reveal hing am `root` (ganze Section) und feuerte
  auf der About-Seite nicht zuverlässig → „Unser Team" fehlte dort ganz. Triggert jetzt auf
  der Mobile-Headline selbst.
- **Portraits:** **Elena Kats** — Name + Titel „Director Finance Projects & Business Systems"
  ergänzt, Ganzkörper-Sitzfoto eng auf Kopf/Oberkörper beschnitten (Kopf ~28 % wie die
  anderen). **Natali Naso** — `lead-6.jpg` war exakt 4/5 und blieb dadurch ungecroppt (weite
  Sitz-Komposition mit Weißraum) → jetzt eng beschnitten (900×1200, 3:4). **Michael Gaul** —
  neues Foto (weiter Loft-Shot, Kopf nur ~8,5 % der Bildhöhe, Person links außen) auf
  Kopf ~29 % rangezoomt und mittig gesetzt.

### Performance-/Browser-Audit (19.07., nur Analyse)
- **Videos:** 167 MB in `public/` (49 Dateien), davon nur ~21 referenziert. Laufzeit-relevant
  sind v. a. die 12 Company-Clips (~55 MB, je 3–7 MB, Autoplay bei Sichtbarkeit) → Task #77
  (neu enkodieren) ist der Haupthebel. **86,9 MB Videos sind gar nicht referenziert**
  (`hero.mp4` 28,5 MB, `hero-design` 12, `kompetenz-reel` 12,8 …) → Deploy-Ballast.
- **Bilder:** 45 MB PNG; die dicksten sind Orphans (`stage-portrait.png` 15,4 MB,
  `preloader.png` 13,4 MB, `g10.jpeg` 11 MB). Echter Laufzeit-Posten: `career/c1–c4.png`
  (~2 MB je) → nach JPG/WebP.
- **Browser:** keine `:has()`/`@container`/`text-wrap` → keine bleeding-edge-Risiken;
  `overflow: clip` (57×) ab Safari 16 ok; WebGL-Hero als Perf-Last auf Low-End-Mobile im Blick.
  Offen: `100vh → dvh/svh` (siehe oben).

### Mobile: Menü-Overlay als einheitliches Grid + Logo-Abstand (17.07.)
- **B/Logo oben** rückte auf Mobile von der oberen Kante ab: Nav-Bar `paddingTop`
  1.5vw (~6px) → mobil **6vw (~23px)**. Desktop unverändert. (Inline-Padding auf Klassen
  umgestellt, weil `!`-Klassen ein Inline-Style nicht überschreiben.)
- **Menü-Overlay: EIN Rand-Wert für alles.** Vorher hatte die Nav-Bar 4vw, das Overlay
  2vw → Logo und Nav-Wörter lagen nicht auf einer Linie, Social/Podcast klebten an den
  Kanten. Jetzt mobil durchgängig **6vw** für Nav-Bar UND Overlay → gemeinsame Grid-Spalte.
  Gemessen: Logo links 23, HOME/ABOUT/NEWS/CAREER rechts je 23, Instagram/LinkedIn links 23,
  Podcast-Widget 23/23 (vorher rechts abgeschnitten). Desktop bleibt 2vw.
- (Der abgeschnittene Titel im Spotify-Widget ist dessen internes Verhalten — das iframe
  selbst sitzt jetzt sauber im Raster.)

### Mobile: gepinnte Sections nach Breiten-Resize (17.07.)
- Nach einem Live-Breitenwechsel (Preview Desktop↔Mobile, Geräte-Rotation) erschienen
  gepinnte Sections seitlich eingezogen (Rahmen links/rechts): ScrollTrigger fixiert beim
  Pinnen die Breite auf den Messwert zum Pin-Zeitpunkt; sein eigener Resize-Refresh läuft
  deferred über einen rAF-Tick, der im inaktiven Tab einfriert.
- Fix (`SmoothScroll.tsx`): expliziter, SYNCHRONER `ScrollTrigger.refresh()` bei
  Breiten-Resize (debounced; nur Breite, nicht Höhe → feuert nicht bei der mobilen
  Adressleiste). Reproduziert (390→1440→390) und verifiziert: Ring-Container danach wieder
  links 0 / breite = Viewport.

### Mobile: horizontaler Overlauf behoben (17.07.)
- Auf schmalen Viewports entstand rechts ein ~70 px breiter neutraler Streifen; Logo/Navi
  (fixed) richteten sich am Scrollbereich (460) statt am Viewport (390) aus.
- Ursache: mehrere Module sind ABSICHTLICH breiter als 100vw — v. a. die Hero-Kurvenringe
  (bis 136vw, damit die Bögen an beiden Rändern off-screen laufen) — lagen aber in einer
  Vorfahrenkette ohne horizontales Clipping.
- Fix: `overflow-x-clip` auf `main` im `FrontendLayout` (gilt für alle Seiten). Bewusst
  `clip`, nicht `hidden`: clip erzeugt keinen Scroll-Container und bricht daher die vielen
  `position:sticky`-/GSAP-Pin-Module NICHT. Horizontal-Slider (Career/Marquee) haben eigene
  overflow-Container und bleiben unberührt.
- Verifiziert: Überlauf 0 auf Home/About/News/Career/Contact (mobil) und Desktop; Navi
  bündig bei 390; alle 5 GSAP-pin-spacer intakt (einer aktiv `fixed`).
- (Hinweis fürs Team: Das Vorschau-Pane rendert schmale Viewports nicht randlos — der
  schwarze Streifen im Screenshot ist Werkzeug-Hintergrund, kein Layout-Overlauf. Immer per
  DOM gegenprüfen.)

### Ökosystem-URLs: fehlende Company-Links nachgetragen (17.07.)
- Abgleich aller drei Quellen, in denen Company-Links leben: `companyCards.ts`
  (belegte `externalUrl`), Bento (`companiesDirectory.ts`), Ökosystem-Grafik
  (`ecosystem.ts`, Home + About). Skript-basiert über alle Companies.
- **Nachgetragen** (belegte, lebende URL vorhanden, im Ökosystem aber fehlend):
  **Banijay Media Germany** → `banijaymedia.de` (Audio **und** Distribution & Brand),
  **EndemolShine Poland** → `endemolshine.pl` (Entertainment). Vorher per curl (200)
  geprüft, danach als klickbare `<a>`-Links auf Home und About verifiziert.
- **Bewusst NICHT eingetragen:** Potatohead Pictures — die einzige belegte „URL" ist
  `endemolshine.de/ueber-uns/team/`, eine EndemolShine-Team-Seite, kein Company-Auftritt.
- **Zwei Quellen-Konflikte geklärt (Wolfram 17.07.):**
  - Banijay Germany Live hat eine eigene Domain → beide Ökosystem-Vorkommen (Entertainment
    + Live) von `brainpool-live.de` auf `banijaygermanylive.de` korrigiert.
  - Good Humor → `goodhumor.de`: Das Ökosystem war bereits richtig; die **Bento-Card**
    (`companyCards.ts`) zeigte auf einen alten banijay.de-Presseartikel — auf `goodhumor.de`
    umgestellt, veraltete `externalUrlNote` („keine eigenständige Website") entfernt.
  - (Der News-Slug `brainpool-live-...` in `news.ts` ist ein Beitragsname, keine
    Company-URL — bleibt.)
- Nicht angetastet: ~9 Companies mit nur kosmetisch abweichender Schreibweise derselben
  Domain (`www`/`https`/Slash). Übrige unverlinkte Ökosystem-Einträge haben keine belegte
  URL → bleiben nach Projektregel unverlinkt.

### Team: Elena Kats als 12. Person eingesetzt (17.07.)
- Neu in `leadership.ts`, **als Letzte der Frauen** eingefügt (Index 8, direkt nach Aylin);
  die drei Männer rücken einen Index nach hinten. Grid dadurch **3 / 5 / 4**: mittlere Reihe
  bleibt mit den fünf bisherigen Frauen voll, Elena eröffnet die untere Reihe. Als reine
  Grid-Arithmetik verifiziert (15 Spalten, 3× span-5 + 9× span-3 → 3/5/4) und im
  Foto-Vergleich bestätigt.
- **Name + Rolle bewusst leer** (Wolfram: „schreib erst mal keinen Namen dazu … die Position
  kenne ich nicht"). Nachname „Kats" ist bekannt, wird aber vorerst nicht angezeigt.
  ⚠️ **Vor Livegang nachtragen** — sonst steht dort eine gesichtslose Kachel ohne Beschriftung.
- Beschnitt nach der 32-%-Regel der unteren/mittleren Reihe: Ausschnitt 2675×3566 ab
  1430,1283, 900×1200, 91 KB. `FOCUS` `"50% 18%"`.
- **Zwei Folgefehler abgefangen, die der leere Name/Cap ausgelöst hätten:**
  - Das Mobile-Grid hatte ein hartes `slice(0, 11)` — mit 12 Personen wäre Elena mobil
    verschluckt worden. Entfernt (rendert jetzt wie Desktop das komplette `LEADERSHIP`).
  - `key={p.name}` → `key={p.img}` (Desktop + Mobile): ein leerer React-key ist unzuverlässig.
  - Die leere Meta-Zeile machte Elenas Bild **130 statt 115 px** hoch (die fehlende
    Namenszeile verkürzt die Meta, die fixe Kachelhöhe schiebt die Differenz ins flex-1-Bild).
    Fix: `minHeight: "1.18em"` auf die Namenszeile — für die einzeiligen Namen der anderen
    ist das die natürliche Höhe, keine Änderung. Danach alle Bilder 115 px, Unterkanten fluchten.
- Stand jetzt: **8 von 12** Portraits echt (Elena kommt als echtes Foto dazu). Übrig:
  Marcus Wolter, Natali Naso, Heike Lutzer, Janine Berns — `lead-1.jpg` weiterhin doppelt.

### Team: echtes Portrait für Michael Laegel — mit anderer Beschnitt-Zahl (17.07.)
- `lead-3` → `michael-laegel.jpg`. Quelle 4912×7360, Ausschnitt **4200×5600 ab 218,0**,
  Endformat 900×1200, 61 KB. `FOCUS` `"50% 14%"`.
- ⚠️ **Nicht die 32 % der anderen — hier 24 %.** Michael Laegel steht in der
  **Leader-Reihe**, deren Kacheln **248×182 (1.36)** messen statt 142×138 (1.03). Von einem
  0.75-Hochformat bleiben dort nur **55 % der Bildhöhe** stehen (statt 73 %). Ein 32 %-Kopf
  wäre auf **58 % der Kachelhöhe** aufgeblasen worden — sichtbar größer als seine
  Leader-Nachbarn.
- Zahl aus dem Nachbarn abgeleitet, nicht geschätzt: Knuts Kopf füllt ~43 % seiner Kachel.
  24 % / 0.55 = **43,6 %** → passt. Die Varianten mit 28 % und 32 % lagen bei 51 % und 58 %
  und wurden im direkten Vergleich (2× vergrößert gerendert) verworfen.
- `top` auf 0 geklemmt, weil der Kopf nah am oberen Bildrand sitzt.
- **Merke für künftige Portraits:** Die Beschnitt-Zahl hängt an der REIHE, nicht am Team —
  Leader 24 %, Reihen 2/3 32 %. Steht so in `leadership.ts` und im README.
- Stand jetzt: **7 von 11** Portraits echt. Übrig: Marcus Wolter, Natali Naso, Heike Lutzer,
  Janine Berns — `lead-1.jpg` läuft weiterhin doppelt (Marcus + Janine).

### Team: echte Portraits für Michael Gaul, Matthaeus Jaworek, Sebastian Menge (17.07.)
- Drei weitere echte Portraits lösen Platzhalter ab: `lead-5` → `michael-gaul.jpg`,
  `lead-9` → `matthaeus-jaworek.jpg`, `lead-7` → `sebastian-menge.jpg`.
- **Alle nach DERSELBEN Regel beschnitten wie Aylin** (Wolfram: „an die anderen Kollegen
  anpassen"): Kopf = 32 % der Ausschnitthöhe, 12 % Luft darüber, Seitenverhältnis 0.75,
  Gesicht horizontal zentriert. Nicht nach Augenmaß — je Foto die Gesichtskoordinaten
  abgelesen und die Werte gerechnet. Damit stimmen die Proportionen in der Reihe
  nachweislich, nicht ungefähr:

  | Person | Quelle | Ausschnitt | Endformat |
  |---|---|---|---|
  | Michael Gaul | 3869×5815 | 2489×3319 @ 0,1072 | 900×1200, 48 KB |
  | Matthaeus Jaworek | 4912×7360 | 3150×4200 @ 1056,802 | 900×1200, 91 KB |
  | Sebastian Menge | 4912×7360 | 2759×3678 @ 1639,737 | 900×1200, 82 KB |

- Alle drei Quellen sind wieder **Ganzkörper-Aufnahmen** — ohne Beschnitt wären die Köpfe
  in der 142×138-Kachel winzig gewesen (siehe Aylin-Eintrag unten).
- Bei Michael Gaul war der rechnerische linke Rand negativ → auf 0 geklemmt, Gesicht sitzt
  dadurch bei 48,5 % statt exakt mittig (optisch unauffällig).
- `FOCUS`-Einträge `"50% 18%"` für alle drei — identisch, weil identisch beschnitten.
- *Sebastian: Namensdiskrepanz — geklärt.* Die Quelldatei heißt `Sebastian lege.jpg`, das
  Team hat aber Sebastian **Menge**. Da „Sebastian Lege" der Food-Experte hinter Pausenclown
  Media ist (`companyCards.ts`), also eine andere reale Person, war die Zuordnung
  rückfragewürdig — **Wolfram hat bestätigt: Benennungsfehler, es ist Sebastian Menge.**
  Notiz im Code belassen, damit die Frage nicht wiederkehrt.
- Stand jetzt: **6 von 11** Portraits echt (Knut, Simone, Aylin, Michael Gaul, Matthaeus,
  Sebastian). Fünf Platzhalter bleiben, `lead-1.jpg` weiterhin doppelt (Marcus + Janine).

### Team: echtes Portrait für Aylin Firat (17.07.)
- `/people/aylin-firat.jpg` löst den Platzhalter `lead-2.jpg` ab. Quelle
  `assets/People/aylin.jpg` (Nick Harwart im ursprünglichen Dateinamen ist der **Fotograf**,
  nicht die abgebildete Person).
- **Beschnitten, und das war nötig**: Das Original 3750×5636 ist eine GANZKÖRPER-Aufnahme.
  Die Team-Kacheln sind nachgemessen **142×138** (nahezu quadratisch, 1.03) — bei
  `object-cover` bleiben davon nur 65 % der Bildhöhe. Sie wäre als winzige Figur in voller
  Länge erschienen, während alle Nachbarn Kopf-Schulter-Porträts sind. Mit `objectPosition`
  allein nicht zu retten (fünf Varianten durchgespielt).
- Ausschnitt aus den **Gesichtskoordinaten gerechnet**, nicht geschätzt (Kopf oben 1354,
  Kinn 2200, Gesichtsmitte x 1184). Drei Enge-Grade gebaut und gegen die echten Nachbarn
  (Simone, lead-3, lead-6) verglichen → **„mittel" gewählt** (Wolfram): 1983×2644 ab
  193,1037, Kopf füllt ~32 % der Ausschnitthöhe. Endformat 900×1200, 88 KB — dieselbe
  Größenordnung wie die übrigen echten Porträts. Werte stehen als Kommentar in
  `leadership.ts`, die engere Alternative (~38 %) ebenfalls.
- `FOCUS`-Eintrag `"50% 18%"` in `Founders.tsx`.
- **Die Team-Section gibt es zweimal** (Home + About) — beide rendern dieselbe Komponente
  aus `LEADERSHIP`, ein Eintrag genügt. Gegengeprüft: `/` und `/about` liefern beide das
  neue Bild, `lead-2.jpg` kommt nirgends mehr vor.
- Offen: In `assets/People/` liegen drei weitere Aufnahmen (-9694-2, -9733, -9930) plus ein
  Bild von Simone Lenzen — Zuordnung unklar.

### Bento-Videos: Endemol Shine Polska, Minestrone TV, Ladykracher, NightWash Club (17.07.)
- **Endemol Shine Polska** (Showreel 2018, 327 s) → ab 204 s, 12 s, 6,4 MB. Klassischer
  Showreel-Aufbau: Logokarte ~2 s, Format-Titelkarten („FEAR FACTOR" ~34 s, „THE DANCE"
  ~50 s), Textstrecke gegen Ende („THE HIGHEST QUALITY" ~306 s), Logo-Endkarte ~322 s. Das
  Fenster liegt in der Spielshow-Sequenz (~200–240 s). Die LED-Zahlen („1 2 3 4 5", „100K")
  sind Bühnenbild, keine Overlays.
- **Minestrone TV** (Pastewka_0802_Recap, 92,6 s) → ab 10 s, 12 s, 4,0 MB. Glücksfall:
  keine Titelkarte über die ganze Länge, Fenster frei wählbar. (Im Ordner liegt noch
  Pastewka_0810_Recap.mxf — Wolfram wählte 0802.)
- **Ladykracher** (LK_08_11_Intro_und_Kino, 137,4 s) → ab 80 s, 12 s, 4,0 MB. Vorspann
  1–25 s ist Animation MIT Titelkarte („Anke Engelke" ~17 s); ab ~29 s läuft der Kino-Sketch
  textfrei.
- **NightWash Club** (Club-Film, 53,3 s) → ab 7 s, 12 s, 4,0 MB. Promo voller
  Format-Titelkarten („LASS LABERN" ~20,5 s, „DIE MACHT DER 1000 WITZE" ~27 s, „…SLAM"
  ~39 s). 7–19 s ist der erste textfreie Block.

#### MXF: avconvert scheitert, VLC löst es
- Minestrone und Ladykracher liegen als **MXF** vor. **avconvert kann das nicht lesen**
  („unable to read") — AVFoundation unterstützt das Format nicht, macOS liest nicht einmal
  die Metadaten (`kMDItemCodecs = null`). ffmpeg ist weiterhin nicht installiert.
- Gelöst mit **VLC 3.0.16**, das eigene MXF-Decoder mitbringt. Befehl steht im Kommentar in
  `CompaniesBento.tsx`.
- Da der Browser MXF ebenfalls nicht abspielt, braucht der Kontaktbogen einen Umweg: erst
  einen Proxy der GANZEN Datei (width=480, vb=500), den abtasten, dann den finalen
  Ausschnitt aus dem ORIGINAL schneiden.
- *Stolperfalle:* `timeout` gibt es auf macOS nicht (exit 127) — mein erster VLC-Test lief
  dadurch gar nicht, ich hielt ihn fälschlich für erfolgreich. Nicht davorsetzen.
- **VLC liefert kleinere Dateien als avconvert** (4,0 statt 6–6,7 MB bei gleicher Länge und
  Auflösung), weil avconvert die AAC-Tonspur mitschreibt. Kandidat für den Sammel-Reencode
  (Pre-Launch #77).
- Alle vier Dateien im Browser gegengeprüft (11 Frames, plus Farbdrift-Check gegen die
  CEWE-Fehldekodierung): 0 korrupt, natürliche Farben.

#### NightWash: Formatwahl nachgerechnet
- Die Quelle lag als **16x9 UND 9x16** vor. Nachgemessen: Das Bento hat drei Kachelformate,
  darunter sechs echte Hochformat-Kacheln (0.68) — **NightWash ist keine davon**, seine
  Kachel misst 308×222 (1.39). Bei `object-cover` bleiben vom 16:9 rund **78 % der
  Bildbreite** stehen, vom 9:16 nur **40 % der Höhe**. → 16x9.

### Fakten-Accordion: Copytexte von Heike + Zahlen-Korrekturen (17.07.)
- **Heikes Texte eingesetzt** (4 von 7 Karten), wörtlich übernommen; nur die
  Anführungszeichen auf die deutsche Form „…" vereinheitlicht (Vorlage gemischt:
  `"TV total"`, `“Schlag den Star“`). Die drei ohne Text stehen auf **„Text folgt."**:
  90 % Primetime-Hitrate, 170+ Companies weltweit, 1.500+ Live-Veranstaltungen (letztere
  fehlt in Heikes Lieferung ganz).
- **Labels unverändert** — Wolframs freigegebene Zweizeiler bleiben; Heikes Überschriften
  („Companies & Label", „4500+ hrs") sind Fakt-Bezeichner ihrer Liste, keine Kachel-Titel.

#### Zahlen: „Die Ziffer ist maßgeblich" (Regel Wolfram 17.07.)
- Heikes Copy ist ein **älterer Stand als die Fakten**. Wo im Text dieselbe Zahl vorkommt
  wie in `value`, wird **der Text angeglichen, nicht die Ziffer**. Regel steht jetzt im
  Dateikopf von `EditorialStickyScene.tsx`, damit sie die nächste Lieferung überlebt.
- **1.300+ → 1.400+** (Mitarbeitende): Heikes Überschrift *und* Fließtext nennen 1400.
- **3.000 → 4.500 hrs.**: Ihre Überschrift sagte „4500+ hrs", ihr Fließtext „rund 3000
  Stunden" — Konflikt nach der Regel zugunsten der Ziffer aufgelöst, Copy auf „rund 4500"
  angeglichen.
- **Alle Copytexte gegen die Ziffern geprüft**, nicht nur die auffällige: 40 ↔ „über 40+",
  1.400 ↔ „rund 1400", 4 Mrd. ↔ „vier Milliarden" passten bereits. „451 Prime-Time
  Erstausstrahlungen" bleibt — keine Kachel-Ziffer, sondern ein eigener Fakt im Text.
- `site.ts` (About-Fakten) mitgezogen: **1.400+** und **4.500 hrs.** Gegengeprüft, dass
  Home und About dieselben fünf Zahlen führen.

#### Layout: Heikes Copy sprengte die Spalte
- Die neuen Texte sind 4–5× so lang (bis 527 Zeichen). Folge: die letzte Kachel hing
  **94–131 px unter der Fotokante** — die Bündigkeit von heute Morgen war hin. Die
  DIGIT-Formel rechnete mit ~66 px Copy, tatsächlich waren es 230.
- **Erster Hebel war nicht die Ziffer**: Die Copy hatte `maxWidth: 40ch` und nutzte damit
  nur **262 von 492 px** Kartenbreite. Bei Kurztexten unauffällig, bei 500 Zeichen
  verdoppelte es die Höhe grundlos. Cap entfernt → 59 Zeichen/Zeile (Faustregel 45–75),
  Copy von 230 auf **172 px**.
- **DIGIT-Konstante 44 → 64**, gemessen statt geschätzt: nötige Konstante 54.6 (1280×700 /
  1440×900) und 62.8 (1920×1080, größere Copy-Schrift) → 64 mit Sicherheitsabstand.
- Geprüft mit **jeder der 7 Karten einzeln geöffnet** (die längste Copy bestimmt den Worst
  Case): 1280×700, 1440×900, 1920×1080 → überall bündig 0,0 px, 0 Überlauf.
- ⚠️ **Preis**: Ziffern ~20 px kleiner als vorher — 33,6 / 41,4 / 62,5 px (vorher
  53,1 / 61,4 / 82,5). Lange Copy, feste Spaltenhöhe und große Ziffern gehen nicht
  zusammen. Offen (Wolfram): so lassen · Spalte höher (82vh → ~92vh) · Copy kürzen.
- *Messfehler abgefangen:* Die Probe meldete nach einem Reload plötzlich 24 px Überstand
  auf ALLEN Karten gleichmäßig. Das war GSAPs Startversatz `y: 24`, der im eingeklappten
  Preview-Pane nie zurückanimiert wird (rAF friert ein) — `getBoundingClientRect()` liefert
  die transformierte Box. Transformfrei gemessen: 0. Dieselbe Falle wie bei der
  Team-Section.
- ❓ Offen: Heike schreibt „4500**+** hrs", die Kachel zeigt „4.500 hrs." ohne Plus.

### Hero: eigene Mobile-Motive auf allen Seiten (17.07.)
- Sieben neue Hochformat-Fassungen in `public/hero-v2/` (`*-mobile.jpg`), aus
  `assets/Visuals/Hero/` weboptimiert und auf das dortige Namensschema gebracht
  (`Career-frame-3-mobile.jpg` → `frame-3-career-mobile.jpg`).
- **Das sind neu gesetzte Ausschnitte, keine verkleinerten Kopien**: Quelle 3009×4000
  (Seitenverhältnis 0,75) gegen 5411×4000 (1,35) beim Desktop-Motiv. Im Querformat wäre auf
  dem Telefon von der Komposition kaum etwas übrig geblieben.
- Umgesetzt per **`<picture>`** mit `(max-width: 767px)` (dieselbe Grenze wie überall sonst
  im Projekt). Der Browser wählt die Datei selbst, das `<img>` bleibt dasselbe Element —
  die GSAP-Refs (`heroImg`/`heroImgB`/`heroImg3`) und die komplette Blend-Sequenz sind
  unberührt. `contents` am `<picture>`, damit der Wrapper keine eigene Box erzeugt und die
  absolute Positionierung exakt so aufgeht wie vorher.
- Frame 3 kommt je Seite per Prop; der Mobile-Pfad wird daraus abgeleitet
  (`mobileVariante()`). **Konvention statt Konfiguration**: Ein künftiges Hero-Motiv braucht
  nur die gleichnamige `-mobile.jpg` daneben, kein Code.
- Nachgemessen (`currentSrc`, nicht `src`): Mobile lädt auf allen fünf Hero-Seiten die
  `-mobile`-Datei (0,75), Desktop unverändert die Querformat-Datei (1,35), Bildbox
  1526×954 wie zuvor. Alle referenzierten Dateien antworten mit 200.
- Nebeneffekt: **57–103 KB statt 416–722 KB** je Frame — der Hero legt drei davon
  übereinander, das zählt auf dem Telefon.
- `eslint-disable @next/next/no-img-element` entfernt: Die Next-Regel greift bei `<img>`
  innerhalb von `<picture>` nicht mehr, die Direktive war tot.
- `frame-3-companies-mobile.jpg` mitgezogen, obwohl die Companies-Seite entfallen ist —
  das Desktop-Pendant liegt ebenfalls noch da, so bleiben die Paare vollständig.

### Banijay Media Germany: Video in der Bento-Kachel (17.07.)
- `CompaniesBento.tsx`, `REEL["banijay-media-germany"]` — Quelle 90 MB / **201 s**
  (BMG_Brandtrailer) → 960×540, **Ausschnitt 16,7–29,2 s (12,5 s), 6,7 MB**. Löst das
  generische `reel-5.mp4` auf dieser Kachel ab.
- ⚠️ **Bewusste AUSNAHME von der Textfrei-Regel** (Wolfram 17.07.: „mehr Bilder als diese
  komische Fernbedienung"). Der Clip trägt den eingebrannten Rahmen des Trailers: Label
  oben links („BIG SCREEN FORMATS"), Bauchbinde unten mit Case + Marke („TV TOTAL |
  MC DONALD", „SCHLAG DEN STAR | HAGEBAU", „NIGHTWASH | KLARNA"), Reichweiten-Zähler rechts
  (759 K, 2.87 M, 14,6 %). Vertretbar, weil bei einer Vermarktungs-Company Marken und
  Reichweiten der Inhalt sind.
- **Warum es keine textfreie Alternative gibt:** 0–3,8 s Hand mit TV-Fernbedienung
  (einziges textfreies Footage in 201 s), 3,9–4,2 s formt sich das „B"-Logo, bis ~8 s
  Logokarten, ~9–10 s Textkarte „WELCOME TO OUR UNIVERSE", ab 11 s bis zum Ende die
  Case-Montagen. Der Rahmen ist kein Abschnitt, sondern das Gestaltungsprinzip des Films.
- *Erste Fassung waren die 3,8 s Vorspann* — als Kachelinhalt zu wenig („wirklich nur die
  Anfangssequenz"). Wichtig fürs Protokoll: **0–10 s wäre schlechter gewesen, nicht besser**
  — dort liegen Logokarten und die Textkarte, also *weniger* Bilder. Die Bilder beginnen
  erst bei 11 s.
- 16,7–29,2 s ist das bildreichste Fenster: vier echte Szenen (Figur mit Publikum, Bühne mit
  Moderator, Spielshow, jubelnde Menge). Davor und danach nur Screen-Wall-Montagen aus
  vielen Mini-Screens, die in der 326×235-Kachel zu Brei werden.
- Logo-Grenze der alten Fassung nicht geschätzt, sondern gemessen: Zwischen 3,9 s und 4,2 s
  ziehen sich die hellen Pixel von 45 % auf 98 % in die Bildmitte — das ist das „B".
- Fertige Datei über 11 Frames gegengeprüft: 0 korrupt. 6,7 MB → Pre-Launch #77.

### Rainer Laux Productions: Video in der Bento-Kachel (17.07.)
- `CompaniesBento.tsx`, `REEL["rainer-laux-productions"]` — Quelle 263 MB / 45 s
  („Promi Big Brother"-Trailer für Joyn) → 960×540, **Ausschnitt 19,5–30,0 s (10,5 s)**.
- Aufbau des Trailers: dunkle Set-Bilder bis 18 s, Schwarzbild bei 18,5 s, dann die helle
  Gartensequenz; ab ~35,5 s wächst das Big-Brother-Auge zur **Logo-Endkarte**, die die
  letzten ~8 s füllt. Das Fenster liegt komplett in der Gartensequenz — nach dem
  Schwarzbild, vor dem Abblenden (Helligkeit ab 30,5 s: 58 → 26 → 0 bei 31,5 s) und weit
  vor der Endkarte. Loop läuft hell auf hell, kein Schwarzblitz.
- *Messfehler abgefangen:* Der Kontaktbogen zeigte scheinbar ein **zweites Schwarzbild bei
  28 s**. Zwei unabhängige Helligkeitsscans belegen dort 102,9 — die schwarze Kachel war ein
  Zeichenfehler meiner Montage, kein Frame. Ohne Nachmessen hätte ich um ein Phantom
  herumgeschnitten. Im Bereich 18–38 s ist nur 31,5 s wirklich schwarz.
- Fertige Datei über 11 Frames im Browser gegengeprüft: 0 korrupt, kein Text, keine
  Titelkarte, kein Logo.
- ⚠️ **5,9 MB** — avconvert schreibt die AAC-Tonspur mit und trifft die Zielrate nicht
  (bekanntes Problem, Pre-Launch #77; good-humor liegt bei 6,0 MB). `Preset640x480` käme
  auf 3,2 MB, liefert aber nur 640×360 — die Kachel misst 326×235, auf Retina also 652×470.
  Deshalb 960×540 wie der Rest der Bibliothek.
- ❓ Inhaltlich gegenprüfen: Der Trailer bewirbt **Promi Big Brother** (Joyn). Zugeordnet
  wurde er nach Wolframs Ansage und dem Ablageort (`assets/Videos Companies/RainerLaux
  Productions/`) — nicht nach einer belegten Produktionsangabe.

### Home-Statement: finales Wording (17.07.)
- `page.tsx` — Lorem-ipsum-Platzhalter ersetzt („Unser Antrieb ist Entertainment. …").
  297 statt 204 Zeichen, 39 statt 31 Wörter.
- Geprüft, weil der Text ~50 % länger ist: passt auf allen Formaten (1440×900 acht Zeilen
  / 398 px, 1280×700 acht Zeilen / 353 px, mobil 13 Zeilen / 454 px von 844), und der
  Halbgeviertstrich strandet nirgends allein auf einer Zeile. Die Choreografie bleibt
  unberührt — `stagger: { amount: 0.6 }` verteilt die Gesamtdauer auf alle Wörter, mehr
  Wörter heißt dichtere Staffelung statt längerer Timeline.
- Noch Lorem: News-Hero (`news/page.tsx`) und Story-Text (`Editorial.tsx`).

### Presse-Seite: DWDL-Bericht zum Livegeschäft (17.07.)
- **„Zwischen Kirche und Kampfsport: Banijay legt im Live-Geschäft zu"** (DWDL,
  26.08.2025, Torsten Zarges) im Block **Presse**, verlinkt auf dwdl.de.
- Rubrik bewusst **„Presse", nicht „Marcus Wolter"**: Der Artikel ist eine Branchenanalyse
  über das Live-Geschäft, kein Interview mit dem CEO — auch wenn das DWDL-Aufmacherbild
  ihn zeigt.
- `MARCUS_PRESS` → **`EXTERNAL_PRESS`** umbenannt (`feed.ts`): Die Liste enthielt bisher
  nur Wolter-Auftritte, der Name trug den ersten Nicht-Wolter-Artikel nicht mehr. Die
  Rubrik entscheidet jetzt jeder Eintrag selbst.
- Artikel wird **verlinkt, nicht nachgedruckt** (`external: true`, keine Detailseite) —
  urheberrechtlich der saubere Weg.
- ⚠️ **Bildrechte**: Das Aufmacherbild ist eine DWDL-Bildmontage, lokal als
  `public/news/dwdl-live-geschaeft.jpg` (1200×510, 103 KB). Wie bei den fünf bestehenden
  `mw-*.jpg` liefert banijay.de damit Bildmaterial fremder Redaktionen aus. Neuer
  README-Abschnitt + Zeile in der Pre-Launch-Tabelle: Nutzungsrecht klären.

### Team-Section: Fünfergrid ab der zweiten Reihe (17.07.)
- **15 Spalten statt 12** (`Founders.tsx`): 12 ist nicht durch 5 teilbar, 15 geht durch
  beides auf → Leader-Reihe 3 × `span 5`, darunter 5 × `span 3`. Reihen jetzt **3 / 5 / 3**
  (vorher 3 / 4 / 4). Marcus Wolter, Knut Kremling und Michael Laegel bleiben oben.
- **`slice(0, 11)` raus, Reihenfolge = Layout** (`leadership.ts`): Index 0–2 oben, 3–7 Mitte,
  ab 8 unten. Die angekündigte zwölfte Person rutscht dadurch ohne Codeänderung in die untere
  Reihe; die Entfaltungs-Animation misst ihre Zielpositionen live aus dem Grid und ist von der
  Kachelzahl unabhängig.
- **Frauen in die mittlere Reihe** (Wolfram-Feedback, zum zweiten Mal gegeben): Simone Lenzen,
  Natali Naso, Heike Lutzer, Janine Berns, Aylin Firat.
- ⚠️ **Die Zuordnung ist ungeprüft.** Es gibt kein Geschlechtsfeld in den Daten, und die Fotos
  taugen nicht als Beleg — sie sind Platzhalter und passen nicht zu den Namen (unter „Marcus
  Wolter" liegt das Bild einer Frau). Einsortiert nach Vornamen, gestützt auf Wolframs Ansage,
  dass Heike Lutzer aufrückt; es geht mit genau fünf Personen rechnerisch auf. Hinweis steht im
  Dateikopf von `leadership.ts` — bei Gegenprüfung dort korrigieren, das Layout folgt.

### Fakten-Accordion (Home): neue Zahl, Korrektur, Reparatur (17.07.)
- **1.500+ Live-Veranstaltungen jährlich** neu; **Companies weltweit 130+ → 170+** (auch in
  `site.ts`, sonst nennen Home und About verschiedene Zahlen).
- **Titel rechts neben die Zahl, immer als Zweizeiler** (`EditorialStickyScene.tsx`). Vorher
  standen sie unter der Zahl und wurden auf **jeder** Karte unten abgeschnitten — nachgemessen
  1440×900 mit 6 Karten: Karte 111 px, Inhalt 139 px, also 28 px Überlauf; mit der 7. Zahl wäre
  es schlimmer geworden. Nebeneinander zählt nur noch `max(Ziffer, Label)` statt der Summe.
  Der Umbruch steht in den Daten (`label: [string, string]`), nicht im Textfluss — so wandert
  die Trennstelle nicht mit Viewport/Schriftbreite.
- **Grundlinie**: `align-items: last baseline` — die letzte Label-Zeile fluchtet mit Ziffer und
  Einheit (mit `baseline` läge die *erste* Zeile auf der Ziffer). Gemessen: 0,00 px Abweichung
  auf allen 7 Karten. Chevron bleibt `self-center` (ein SVG hat keine Textgrundlinie).
- **Abschneiden ist jetzt strukturell ausgeschlossen**, nicht mehr zufällig vermieden: Die
  Kacheln hatten `flexBasis: 0%` (Inhaltshöhe wird ignoriert) **und** `overflow-hidden` (macht
  die Kachel zum Scroll-Container, wodurch die Flex-Schutzregel `min-height: auto` auf 0 fällt).
  Beides zusammen war die Schere. Jetzt `flexBasis: auto` + kein `overflow-hidden` auf der Kachel.
- **Zifferngröße folgt der Spaltenhöhe statt der Fensterbreite**: Die Spalte hängt an `82vh`,
  eine `vw`-Ziffer entkoppelt sich davon — 1920×1080 und 1920×900 hätten dieselbe Ziffer bei
  halber Höhe. Neu `min(87px, 5.4vw, calc(clamp(97.14px, 11.714vh, 142.86px) - 44px))`,
  hergeleitet aus `H = 7 · (D + 28.8) + 66`; ~6 px Sicherheit je Kachel, den Rest verteilt
  `flex-grow`. Ergebnis: Block schließt **bündig mit dem Foto** ab (0,0 px) bei nur noch
  **4–6 px** Restplatz je Kachel (vorher 28–31).
- Gemessen bei 1280×700, 1440×900, 1600×900, 1920×900, 1920×1080 und 390×844: überall 0 Überlauf,
  0,00 px Grundlinien-Abweichung, bündig. Ausnahme: sehr schmale, hohe Fenster (1100×1400)
  behalten 45 px Polster — dort deckelt `5.4vw` die Ziffer, sonst drückt „1.300+" das Label aus
  der 540-px-Spalte.

### filmpool entertainment: Video in der Bento-Kachel (17.07.)
- `CompaniesBento.tsx`, `REEL["filmpool-entertainment"]` — Ausschnitt **ab 4 s, 12 s**, 1,7 MB.
  Schnittpunkt wie gehabt über eine Browser-Kontaktbogen-Vorschau bestimmt, Konvertierung per
  `avconvert`, Datei im Browser gegengeprüft.

### Ökosystem: vier Companies ergänzt (17.07., Kundenfeedback)
- `ecosystem.ts` — **filmpool entertainment** + **South & Browse** → Entertainment,
  **filmpool fiction** → Fiction, **Magic Connection** → Distribution & Brand.
  Alle drei Ökosystem-Darstellungen (Home `EcosystemSection`, About `EcosystemDirectory`,
  Looktest `EcosystemBurst`) lesen aus derselben `ECO_CATEGORIES` → EINE Änderung deckt
  „die verschiedenen Stellen" ab.
- Alle vier **ohne Link**: Im Scrape der bisherigen banijay.de ist für keine eine URL belegt.
  Das folgt der Regel im Dateikopf („Companies ohne belegten Link bleiben unverlinkt") —
  im Verzeichnis stehen sie dadurch ohne Pfeil-Icon. Links bitte nachliefern.
- `companiesDirectory.ts` — **`ecoKeys` von Magic Connection und South & Browse nachgetragen**
  (waren leer). Nebenbefund: Beide fielen dadurch aus JEDEM Bento-Rubrikfilter heraus und waren
  nur unter „Alle" sichtbar. filmpool ×2 hatten ihre Keys bereits.
- **README**: neuer Abschnitt „Unverlinkte Companies im Ökosystem" + Zeile in der
  Pre-Launch-Tabelle. Beim Nachzählen aufgefallen: **20 von 40 Einträgen sind unverlinkt**
  — die Hälfte des Verzeichnisses, nicht nur die vier neuen. Liste je Rubrik + Befehl zum
  Neuerzeugen stehen dort.

### Cape-Cross-Video in der Bento-Kachel (17.07.)
- **Cape Cross Entertainment** bekommt sein Imagefilm-Video (`CompaniesBento.tsx`, `REEL["cape-cross"]`).
  Quelle 587 MB / 83 s → 960×540, ohne Ton, **3,1 MB**.
- Ausschnitt **29,6–35,2 s** (5,6 s): Titelkarte liegt bei ~2 s, die cape×cross-Endkarte bei ~82 s;
  dazwischen wechseln Eventbilder und Interview-Takes. Das Fenster liegt auf durchgehenden
  Arena-/Stadionbildern — ohne Text und ohne Talking Head (der liest sich in der 326×235-Kachel
  ohne Ton nicht).
- *Schnittpunkt korrigiert:* Erster Versuch lief bis 36 s. Der Sichtcheck der fertigen Datei zeigte
  bei 5,9 s bereits den Interviewpartner — der Cut liegt bei ~35,5 s, im Loop wäre pro Runde kurz
  ein Gesicht aufgeblitzt. Daher 5,6 s statt 6 s.
- Konvertierung weiterhin über `avconvert` (das auffindbare ffmpeg dekodiert fehlerhaft, siehe
  16.07.); Datei über 8 Frames im Browser gegengeprüft: 0 korrupt.

### Code-of-Conduct: „WE ARE BANIJAY" kleiner + über der Collage (16.07., Nacht XXIX)
- **Claim in Headline-Formatierung statt Display-Größe** (`CodeOfConductBand.tsx`): 22vw
  (Footer-Marquee-Klasse) → **7vw / 132 %**, also exakt das `SWAP_LINE_STYLE` der
  Ökosystem-Zeilen „40+ / Companies & Labels" auf der Home; mobil 33vw → 13vw.
- **Claim liegt wieder ÜBER der Drift-Collage** (z-index 10 wie das Statement, DOM-Reihenfolge
  zurückgedreht). Bei 22vw konnten die Videocontainer über die Headline laufen, weil die
  Buchstaben so groß waren, dass sie nur als Textur darüberzogen — in Headline-Größe hätten
  sie den Claim schlicht zugedeckt.
- Die Abfolge dahinter bleibt unverändert: Claim steht → blendet aus → Statement baut sich
  Wort für Wort auf → CTA (nachgemessen: 1/0/0 → 0/1/1, sauber nacheinander).

### Pressekontakt + echte Company-Videos (16.07., Nacht XXVIII)
- **Pressekontakt im Footer** (`SiteFooter.tsx`, `site.ts`): eigener Block „Pressekontakt /
  Simone Lenzen / simone.lenzen@banijay.de" statt der Label-Zeile „Presse: presse@banijay.de".
  Die Sammeladresse war geraten und unbelegt (Aufgabe #71) — jetzt ein echter Kontakt.
- **Echte Company-Videos im Home-Bento** (`CompaniesBento.tsx`) für vier Companies. Auf einen
  TEXTFREIEN Mittelteil geschnitten; die Startzeiten sind an einem Frame-Kontaktbogen (12
  Stichproben je Video) abgelesen, nicht geschätzt:
  - filmpool fiction (Dupin Clip2) ab 2 s · South & Browse (Deepfake Clip2) ab 1,5 s ·
    Good Humor (Plötzlich Schwester) ab 10 s (Titelkarte erst bei ~62 s) ·
    MadeFor (Trailer) ab 112 s (Titelkarten bei 6/42/66/78/90/102 s)
  - **Banijay Germany Live NICHT übernommen:** Das Luminiscence-Video trägt durchgehend
    eingebrannte Untertitel — im 0,5-s-Raster abgetastet, es gibt keinen textfreien
    Abschnitt. Kachel behält das generische Reel.
- **Toolchain-Befund:** Das einzige auffindbare ffmpeg (in einer Fremd-App, gebaut mit
  `--enable-libopenh264 --disable-yasm`) **dekodiert die Quellen fehlerhaft** und kodiert
  rosa/grünen Datenmüll bei plausibel aussehenden Bitraten — fiel erst im Browser auf.
  Konvertierung läuft daher über `avconvert` (Apple-Pipeline, dekodiert sauber), das aber
  keine Bitratensteuerung kennt → 3,8–6 MB je Clip statt ~1 MB. Als Pre-Launch-Punkt mit
  libx264-Rezept im README festgehalten (Aufgabe #77). Jeder Clip im Browser gegengeprüft.

### Facts-Feinschliff + Team-Headline linksbündig (16.07., Nacht XXVII)
- **About-Facts** (`ProofVideo.tsx`): Ziffern deutlich größer (`clamp(28px, 2.5vw, 52px)` →
  `clamp(32px, 3.2vw, 68px)`; Deckel an „3.000 hrs." vermessen), Kacheln höher (13vw → 18vw),
  Section näher ans Statement (`marginTop: -26vh`). Zwischen Statement-Text und erster Kachel
  standen **63vh Luft** (gemessen) — Summe aus der unteren Hälfte der 82vh-Statement-Section und
  der oberen Hälfte der 100vh-Bühne. Beides ist für sich richtig (das Video muss aus der BILDMITTE
  aufblühen, die Kacheln bleiben also zentriert), deshalb wurde die Section als Ganzes hochgezogen
  statt die Zentrierung anzutasten → jetzt ~35vh.
- **Team-Headline linksbündig in Statement-Formatierung** (`Founders.tsx`): vorher mittelachsig in
  der Display-Klasse (7.22vw / max 6.6rem, „Iconic IP"-Größe), jetzt `clamp(1.9rem, 3.6vw, 4.2rem)`
  / 500 wie die Statement-Typo, linksbündig (mobil 11vw → 7.4vw). Gibt der Bühne Höhe zurück, die
  den Porträts zugutekommt.
  - *Bugfix Headline-Reveal:* Trigger war die Headline SELBST (`start: "top 88%"`). Sie sitzt in der
    gepinnten Bühne; ein gepinntes Element wird `position: fixed` und erreicht seine eigene Marke ab
    Pin-Start nie mehr → die Wörter blieben auf `yPercent: 118` unter ihrer Maske stehen (auf breiten
    Viewports reproduzierbar). Trigger ist jetzt die Section, die ihre Layout-Position behält.
- **Breitensprung Zitat→Team behoben** (`Testimonials.tsx`): Der Zitat-Fächer stand auf 78 % / 1520px,
  das Team-Grid auf `min(1680px, 105vh)` — an der Kante sichtbar (gemessen 831 vs. 771px). Beide
  teilen sich jetzt EIN Maß (`TEAM_MEASURE`), die Kanten fluchten (170–940 = 170–940).

### Career-Swipe-Bühne, About-Neuaufbau, News-Blöcke, Logo-Ticker zurück (16.07., Nacht XXVI)

**Career**
- **Rollenwelt als Swipe-Bühne** (`CareerRoleScroller.tsx`, neu; löst `CareerRoleStack.tsx` ab): übernimmt die
  Choreografie der früheren Home-Companies-Section (`CompaniesScroller`, seit dem Home-Umbau ungenutzt) —
  Wörter „Deine/Rollen" fahren auseinander, drei Karten wachsen aus der Mitte, fächern auf, dann 3-Slot-Swipe;
  der Grund färbt sich in die Farbe der fokussierten Karte (Palette der alten Rollenkarten). Ohne Bilder.
  - *Timing neu gerechnet:* Die Original-Beats waren auf ~40 Companies getunt (Swipe über 36 Steps → Intro ~16 %).
    Bei 4 Rollen gibt es EINEN Step; dieselben Werte ergaben 57 % Intro und ~100vh Leerlauf am Ende (vermessen).
    Beats + Section-Höhe leiten sich jetzt aus derselben Konstante ab.
  - *Bugfix Mobile-Slider:* `distance()` maß `trackEl.scrollWidth`. Die Karten stehen beim Erzeugen des
    ScrollTriggers auf `scale: 0`, und transformierte Elemente zählen mit ihren TRANSFORMIERTEN Maßen in die
    Scroll-Overflow-Fläche → `scrollWidth` kollabierte auf die Containerbreite, `distance()` fiel auf den
    Minimalwert 1, die Pin-Strecke schrumpfte von ~2770px auf ~1000px (alle 4 Karten in einem Screen).
    Jetzt aus `offsetWidth` gerechnet (Layout, transform-unabhängig) → 2875px. Derselbe Bug steckt noch im
    ungenutzten `CompaniesScroller`.
- **Intro-Section entfallen**, ihr Copytext steht im Hero-Statement (`career.ts` bleibt einzige Fundstelle).
- **BANIJAY TOMORROW**: Copy 1:1 von banijay.de; Keyvisual „All lights on you" (1920px/JPEG → 54 KB statt 358 KB).
  Container-Ratio = native Visual-Ratio (1,951:1) statt 5:6-Hochkant — das Visual trägt Typo + B-Marke
  einkomponiert, `object-cover` hätte beides zerschnitten. Parallax gedämpft (±4 % bei `scale(1.12)`).
- **Code of Conduct**: „WE ARE BANIJAY" in 22vw (größtes Format im Projekt) davor; Claim steht, blendet aus,
  DANACH baut sich das Statement auf (eine Timeline statt vier Trigger). Die Video-Collage läuft über die
  Headline (DOM-Reihenfolge bei gleichem z-index), das Statement bleibt darüber lesbar.
- **Logo-Ticker** unter den Standorten.

**About**
- **Fakten-Section neu** (`ProofVideo.tsx`): Copytext → Hero-Statement (Lorem raus), Zahlen mittelachsig als
  Reihe gleich großer Kacheln. **Alle Ziffern gleich groß** (vorher 4,4vw vs. 3,2vw → „1.300+" dominierte);
  die Mitte wird über die Magenta-Fläche betont. Aufbau von der Mitte nach außen, CountUp beim Reinscrollen,
  Video blüht symmetrisch aus der MITTLEREN Kachel auf (vorher aus einer Eck-Kachel).
  - *Bugfix:* Der Aufbau-Stagger setzt die Kacheln auf `y:46`; `getBoundingClientRect()` liefert die
    transformierte Box → der Versatz wanderte in den Clip-Start (top 586 statt 540). Jetzt via `offsetTop`.
- **Marcus-Wolter-Zitat über dem Video entfernt**; **Partner-Section (Magenta, Flip-Karten) entfernt**.
  Deren `-100vh`-Overlap deckte den Halte-Beat des Team-Pins → neuer Prop `holdForOverlay` (About 120 %,
  Home unverändert 210 %), sonst stünde das Team ~1 Screen unbedeckt still.
- **Zitat-Section zurück** (`Testimonials.tsx`, lag ungenutzt) über dem Team. Personen/Fotos/Zitate 1:1 vom
  banijay.de-Zitat-Slider (Nanni Erben, Arno Schneppenheim, Fabian Tobias, Florian Bösenkopf).
  - *Zwei Fehler mitbehoben:* Die Karten zogen `LEADERSHIP.slice(0,5)` (Kremling, Laegel, Lenzen, Gaul) —
    zu jedem Zitat stand das FALSCHE Gesicht. Person/Foto/Zitat sind jetzt ein Datensatz. Marcus Wolter war
    als 5. Karte drin, steht auf banijay.de aber nicht in dieser Section → raus. Zahlen-Grid entfernt (Dopplung).
- **Internationale Logo-Kacheln → Logo-Ticker** (`WorldNetwork.tsx`); Drag-/Slide-Mechanik der Kachelbahn entfallen.

**News**
- **Rubrik-Blöcke statt Gesamtliste + Chip-Filter** (`NewsSections.tsx`, neu; `NewsFilter`/`NewsGrid` entfernt):
  Presse · Podcast · Primetime-Hitrate · Marcus Wolter · Social — je Block linksbündige Headline, Trennlinie,
  Posts als Slider. Nativer Scroll statt gepinntem GSAP-Slider: fünf Pins hätten den Seitenscroll fünfmal
  gekapert. Karten laufen rechts in den Anschnitt; Beitragszahlen raus.

**Global**
- **Logo-Ticker wiederhergestellt** (`LogoTicker.tsx`): die ERSTE Fassung des `LoveBrandsTicker` (13.07., weiße
  Company-Wortmarken), nicht die Format-Stills-Variante von 91ee7271. Logos live aus `COMPANIES_DIRECTORY`.
- **Preloader läuft wieder bei jedem Home-Aufruf** (`IntroOverlay.tsx`) — auch bei Client-Navigation zurück.
  Dreht die Regel vom 14.07. um (`sessionStorage`-Key, einmal pro Browser-Session; kam selbst bei hartem
  Reload nicht wieder, da sessionStorage Reloads überlebt).
- **Social-Feed-Caption**: auf Career an, auf der Home aus (`showText`-Prop statt globaler Entfernung).
- **Seiten-Titel** mittelachsig unter dem Logo; **Footer** mit Mail/Tel/Presse; **Companies-Seite** entfernt.

## [redesign-v2] — Branch (Preview) — 2026-07-15

### „+"-Grundlinie in allen Facts + neue KPI + Ecosystem-/News-Feinschliff (15.07., Nacht XXV)
- **„+" grundlinienbündig in allen Fact-Boxen** (`EditorialStickyScene.tsx`, `CountUp.tsx`, `EcosystemSection.tsx`):
  Das Pluszeichen saß in Sharp Grotesk hochgestellt (fast superscript). Ursache war eine wandernde Suffix-
  Grundlinie, weil der Kennzahl-Wrapper keine eigene `font-size` trug (viewport-abhängig). Fix: Wrapper bekommt
  die Ziffern-`font-size` → alle Suffixe (`+`, `%`, `Mrd.`, `hrs.`) fluchten an einer konsistenten Grundlinie;
  das „+" wird als normales Suffix gerendert und nur um seinen reinen Glyph-Offset abgesenkt
  (`position:relative; top:0.14em` in den Facts, `0.18em` in der 7vw-Ecosystem-Headline). Jetzt sitzt das „+"
  an der Ziffer genau wie das „%" an der 90 — Desktop wie Mobile.
- **Neue KPI „90 % Primetime-Hitrate"** (`EditorialStickyScene.tsx`): zwischen „40+ Companies und Labels" und
  „1.300+ Mitarbeiterinnen und Mitarbeiter" eingefügt (mit Copytext, zählt beim Scroll-in hoch).
- **Ecosystem-Swap-Headline** (`EcosystemSection.tsx`): auf zwei ruhige Zeilen umgestellt — „40+" oben,
  „Companies & Labels" als zweite Zeile (statt „40+ Companies" / „& Labels").
- **Schwarze Trennlinien in der Home-News-Section** (`NewsStack.tsx`): die frühere 32%-Hairline war auf Magenta
  praktisch unsichtbar → jetzt klare schwarze Linie (`1px solid #0e0d0b`) zwischen allen News, über die volle
  Breite (Bild- + Textspalte); über der ersten News bewusst keine Linie.

### Team-Section auf breiten Screens enger gefasst (15.07., Nacht XXIV)
- **Team global** (`Founders.tsx`, Home + About): der Desktop-Grid-Container ist jetzt auf `maxWidth: 1680px`
  gedeckelt und zentriert (`mx-auto`) — auf sehr breiten Screens liefen die Bildkacheln vorher bis an die
  Screenränder und wurden zu breit/landscape, wodurch zu viel vom Porträt wegfiel. Der Cap führt die Kacheln
  enger zusammen (bei 2560px: Kachel-Aspect ~1,9:1 statt ~2,5:1), sodass mehr vom Gesicht sichtbar bleibt.

### About-Facts-Regeln vereinheitlicht + „Partner für Entertainment" Scroll-Fit (15.07., Nacht XXIII)
- **About-Facts** (`ProofVideo.tsx`, `site.ts`, `CountUp.tsx`): die Content-Regeln der Editorial-Fact-Section
  übertragen — Wording („Mitarbeiterinnen und Mitarbeiter", „Companies und Labels", „Views & Zuschauer
  jährlich"), Einheiten-Suffixe (1.300+, 3.000 hrs.), Typo IMMER WEISS (auch auf der Magenta-Kachel), und der
  Einheiten-Suffix kleiner als die Ziffer (0,56×, via neuer `suffixStyle`-Prop in CountUp).
- **About „Partner für Entertainment"** (`PartnerStack.tsx`): Headline/Copy/CTA sind auf Desktop jetzt STICKY
  oben und die (kleineren) Flip-Karten rasten darunter ein (Höhe 70→50vh, Tops auf ~36–45vh) → beim Scroll-Stop
  sind Headline + Copy + CTA und die Karten gemeinsam im selben Screen sichtbar.

### Editorial-/Ökosystem-Textfeinschliff (15.07., Nacht XXII)
- **Home Ökosystem-Swap-Headline** (`EcosystemSection.tsx`): Zeile „Ein Ökosystem" entfernt → jetzt zweizeilig
  „40+ Companies" / „& Labels".
- **Editorial „About Banijay"**: Punkt entfernt → „About Banijay".
- **Editorial „Iconic IP"** (über dem IP-Slider): jetzt EINZEILER „Iconic IP" (Punkt weg), die zwei Wörter
  konvergieren vertikal auf eine Zeile.
- **Editorial Fact-Cards** (`EditorialStickyScene.tsx`): Label „Views & Zuschauer" → „Views & Zuschauer
  jährlich"; Einheiten-Suffix (+/Mrd./hrs.) einheitlich & größer (≈32–46px statt 19–29px); „hrs" → „hrs.".
- **Editorial**: Copytext-Block unter der IP-Bilderleiste entfernt.

### Preloader → Hero: Aufbau erst NACH dem Preloader (15.07., Nacht XXI)
- **Home-Erstladen** (`IntroOverlay.tsx`, `AlgarveHome.tsx`): der Hero-Aufbau (3-Frame-Sequenz) startete bisher
  schon während der Preloader aus-/warp-blendet (bei ~6,5 s) → sichtbare Veränderung hinter dem laufenden
  Preloader. Jetzt wird das Auslöse-Signal (`banijay:introdone`) erst in `cleanup` gefeuert, also wenn das
  Overlay komplett weg ist; Frame 1 startet auf `opacity: 0`. → Der Hero bleibt während des Preloaders
  unverändert und baut sich erst danach vor dem Nutzer auf (kein Flackern, kein Frühstart).


### Hero-Frames schneller, Ringe sequenziell beim Scroll, Career-CoC-Magenta-Box weg (15.07., Nacht XX)
- **Hero-Frame-Sequenz zügiger** (`AlgarveHome.tsx`, global): die 3-Frame-Einblendung (dunkel → lebendig →
  „We Are Banijay") läuft schneller ins letzte Frame — weiterhin smooth (weiche Eases). Dauern 0.7 / 0.85 /
  1.5s (vorher 1.0 / 1.3 / 2.3s).
- **Satellitenringe bauen sich beim SCROLL nacheinander auf** (global): eigener scrub-Trigger auf der
  Übergangszone (früher Start → kein Versatz), die drei Ringe blenden innen → außen gestaffelt ein, die Dots
  folgen ihrem Ring.
- **Career Code of Conduct** (`CodeOfConductBand.tsx`): die Magenta-Box hinter dem Statement wieder entfernt —
  das Statement steht wie zuvor auf dem dunklen Sternenstaub (weiße Typo, Akzentwort magenta), die
  Drift-Snippets bilden den Hintergrund.

### Satellitenringe: sequentieller Aufbau, wachsende Abstände, Dots auf dem Radius (15.07., Nacht XIX)
- **Ringe bauen sich NACHEINANDER auf** (`AlgarveHome.tsx`, global): innen → außen, gestaffelt an den
  Kurven-Fortschritt gekoppelt (revealRings) — alle stehen, wenn die Hero-Kurve fertig ist (kein Versatz).
- **Abstände wachsen nach außen**: Gap Hero→Ring1 = G, Ring1→Ring2 = 2G, Ring2→Ring3 = 3G (kumulierter
  Radius-Zuwachs [3, 9, 18] vw).
- **Planeten-Dots**: sitzen exakt auf dem Ring-Radius (Kreisgleichung zum konzentrischen Zentrum) und sind
  kleiner (9 · 7 · 5 px).

### Konzentrische Satellitenringe (randbündig) + About-Facts-/Local-Layout (15.07., Nacht XVIII)
- **Satellitenringe komplett neu** (`AlgarveHome.tsx`): jetzt KONZENTRISCH mit der Hero-Kurve (gleiches
  Kreiszentrum, wachsender Radius) und HINTER dem Hero gerendert. Die Ring-Divs sind breiter als 100vw →
  die geraden Seitenkanten liegen off-screen, die drei Bögen laufen bis an BEIDE Screen-Ränder (nie mehr
  links/rechts abgeschnitten), in Synchronkurve mit dem Hero. Der Reveal ist an die KURVE gekoppelt (blenden
  in der Schlussphase des Kurven-Aufbaus ein, stehen voll wenn die Kurve fertig ist) → kein Versatz/
  Luftleerraum mehr, kein separater 38%-Trigger. Planeten-Dots laufen auf der konzentrischen Kreisbahn.
- **About-Facts (`ProofVideo.tsx`)**: Intro-Copy links oben (Intro-Format, vorige Größe), top-aligned an der
  Oberlänge; der Fakten-Block sitzt rechts daneben und bleedet nach rechts über das Grid hinaus — die Kacheln
  überlappen nicht mehr. Das aus dem Fakten-Block skalierende Video startet erst ab Sekunde 19.
- **About „Local everywhere" (`WorldNetwork.tsx`)**: der Bildcontainer streckt sich auf die volle Höhe der
  Textspalte — Oberkante an der Headline, Unterkante bündig mit dem CTA „Banijay World ansehen".

### Satellitenringe: drei sichtbare Linien + weiche Rand-Enden (15.07., Nacht XVII)
- **Satellitenringe** (`AlgarveHome.tsx`): auf der Home (Magenta) waren die pink/magenta Ringe unsichtbar →
  jetzt DREI **lichte weiße Linien** mit fallender Deckkraft (auf den dunklen Subpages bleiben die moody
  Farben). Die frühere horizontale Rand-Maske ist durch eine **radiale Maske** ersetzt (opak in der unteren
  Mitte, weich auslaufend zu den Enden/Ecken) → die Bogen-Anfänge faden sanft aus statt links/rechts hart
  abgeschnitten zu wirken. Gilt global für alle Pages.

### About/News/Career-Feinschliff II (15.07., Nacht XVI)
- **About „Local everywhere"** (`WorldNetwork.tsx`, `data/about.ts`): Headline von „Teil einer Welt…" auf
  **„Local everywhere"** geändert; Bildcontainer oben an der Headline-Oberlänge ausgerichtet (`items-start`);
  die unteren Worldwide-CTAs sind keine Buttons mehr, sondern **unterstrichene Textlinks mit Pfeil**.
- **Satellitenringe** (`AlgarveHome.tsx`): horizontaler Fade-Mask an beiden Rändern → die Bögen laufen weich
  aus statt links/rechts hart abgeschnitten zu wirken (global).
- **About Partner-Modul** (`PartnerStack.tsx`): die Schrift steht jetzt klar ZUERST — Cards blenden erst
  deutlich später (~40 %) ein, Headline liegt z-index-sicher vor den Karten. „Magenta → Schrift → Cards".
- **About Ökosystem-Verzeichnis** (`EcosystemDirectory.tsx`): Rubriken in **4 Spalten** (CSS-columns,
  break-inside-avoid) → die Section wird deutlich kürzer.
- **News-Parallax** (`AlgarveHome.tsx`, News-Page): das Statement driftet beim Verlassen als Parallax nach
  unten und blendet ab → weicher, tiefengestaffelter Übergang in den News-Feed (`parallaxExit`).
- **Career Code of Conduct** (`CodeOfConductBand.tsx`, `AboutDrift.tsx`): das Statement liegt jetzt auf einer
  **Magenta-Box** (Ink-Typo, Akzentwort weiß); die driftenden Film-Snippets ragen über die Box-Ränder
  (Drift-Layer über der Box, Opacity anpassbar).

### Editorial-Feinschliff, IP-Brands-Doppelslider, Team-Headline, News-Timing, About-Facts (15.07., Nacht XV)
- **Editorial (Home)** (`EditorialStickyScene.tsx`, `Editorial.tsx`): großer Bildcontainer trägt jetzt das
  Nick-Harwart-Porträt (weboptimiert, Crop auf Gesicht). „Die Story" wieder auf HELLEM Paper-Containerfeld
  (Ink-Typo), dünne weiße Trennlinie entfernt.
- **IP-Brands-Doppelslider** (`Editorial.tsx`, `globals.css`): die alte Bild-Marquee ist ein DOPPELSLIDER —
  zwei gegenläufige Reihen (oben ←, unten →), kompaktes Raster (mehr Brands pro Screen). Jeder Container
  behält die ORIGINAL-Proportion des Brand-Visuals (feste Höhe, Breite auto) → nichts beschnitten. „Wer wird
  Millionär" und „TV total" führen die obere Reihe an (im ersten Screen sichtbar). 28 Brands weboptimiert
  nach `/public/ip-brands`.
- **Team-Headline** (`Founders.tsx`): „Unser Team" baut sich beim Ins-Bild-Scrollen wortweise aus einer Maske
  auf (gestaffelt) — global auf allen Pages (Home + About), Desktop & Mobile.
- **News-Timing (Home)** (`LogoReveal.tsx`): das Magenta-„b" deckt die Fläche jetzt GENAU am Ende voll (bEnd
  von 6× auf 3× gekürzt, Section-Höhe 260→200vh) → die News-Section erscheint direkt, sobald der Screen
  vollflächig magenta ist (keine lange leere Magenta-Strecke mehr).
- **About-Facts-Layout** (`ProofVideo.tsx`): auf großen Screens sitzt die Intro-Copy LINKS und der Fakten-Block
  als ein Block RECHTS daneben (mittig ausbalanciert statt links verteilt). Mobile/responsive: Copy wieder
  über dem Facts-Block (gestapelt).

## [redesign-v2] — Branch (Preview) — 2026-07-14

### Satellitenringe teilen exakt den Hero-Kurvenradius (14.07., Nacht XIV)
- **Satellitenringe** (`AlgarveHome.tsx`): Kurve neu aufgebaut — statt frei gezeichneter SVG-Bézier-Bögen
  sind die Ringe jetzt DOM-Divs mit demselben `border-radius: 0 0 50vw 50vw` wie der Hero. Dadurch besitzen
  sie **immer denselben Kurvenradius wie die Hero-Kante** und wachsen von dort nach außen (RING_BASE 4vw,
  RING_GAP 6vw). Die Dots wandern exakt auf dem Kreisbogen (y = cy + √(R²−dx²)). Global auf allen Seiten.

### Hero→Magenta-Übergang kompakter: 3 Ringe, enger, schneller zum Statement (14.07., Nacht XIII)
- **Satellitenringe** (`AlgarveHome.tsx`): von 4 auf **3 Ringe** reduziert und in **engeren Abstand** gesetzt
  (yTop-Gaps ~135 statt ~195); Übergangszone von 78vh → 52vh verkürzt und das Statement etwas früher
  eingeblendet → man kommt schneller vom Hero zur Magenta-Section/zum Statement. Global.

### Companies-Bento: mehr Hochformat-Variety, keine Karte über 2 Spalten (14.07., Nacht XII)
- **Companies-Bento** (`CompaniesBento.tsx`, Home + Companies = ein Modul): mehr variable, über zwei Zeilen
  gehende HOCHFORMAT-Cards (row-span-2) für mehr Bento-Charakter; die Rest-Füllung der letzten Kachel ist
  jetzt auf **max. col-span-2 gecappt** → NIE mehr eine Company-Karte über 3–4 Spalten (Bildcontainer wurde
  zu groß). Boden schließt weiterhin einigermaßen grade ab.

### Preloader nur beim Erst-Load & gepinnter Hero-Scroll-Übergang (14.07., Nacht XI)
- **Preloader nur beim allerersten Laden** (`IntroOverlay.tsx`): einmal pro Browser-Session (sessionStorage-
  Flag). Zurück-Navigation auf die Home (z. B. von Career) startet den Hero direkt, ohne Preloader.
- **Gepinnter Hero-Übergang, global** (`AlgarveHome.tsx`): der Hero ist beim ersten Scroll GEPINNT — die Seite
  bleibt fixed und der Scroll baut nur den radialen Kreis auf; erst wenn die Kurve steht, löst der Pin und die
  ganze Seite scrollt normal weiter. Gilt auf allen Seiten (auch ohne Preloader). Nach dem Intro
  `ScrollTrigger.refresh()`, damit der Pin sauber vermessen wird.

### Companies-Bento: Hochformat-Cards zurück, Boden bleibt sauber (14.07., Nacht X)
- **Companies-Bento** (`CompaniesBento.tsx`): wieder über zwei Zeilen gehende, HOCHFORMATIGE Cards
  (row-span-2) + breite Cards (col-span-2) für echte Bento-Variety — die Feature-Cards leben aber nur im
  oberen/mittleren Teil; die letzten Kacheln bleiben uniform („Schwanz") und die letzte Kachel füllt die
  Restzeile (flächenbasiert, row-span mitgezählt) → unten steht nichts über, sauberer/ruhiger Abschluss.

### Header-Titel mittelachsig zum B & Statement-Wort-Reveal (14.07., Nacht IX)
- **Header-Seitentitel** (`SiteHeader.tsx`): sitzt jetzt vertikal auf der Mittelachse des rechten B-Logos
  (Mitte-zu-Mitte statt oben bündig), global auf allen Seiten.
- **Statement-Typo-Animation** (`AlgarveHome.tsx`): das mittelachsige Statement animiert Wort für Wort ein,
  sobald es ins Bild scrollt (opacity + Aufstieg, gescrubbt, Stagger von vorn) — gilt auf allen Subpages.

### Hero-Scroll-Choreografie sequenziert (14.07., Nacht VIII)
- **Hero-Scroll global** (`AlgarveHome.tsx`): klar getrennte Phasen statt „alles auf einmal / zu wild". ①
  Erst formt sich der radiale Kreis (Kurve fertig im ersten Drittel des Hero-Scrolls), ② ein ruhiger
  Scroll-Beat, ③ dann wachsen die Satellitenringe LANGSAM und nacheinander aus der radialen Kante (scaleY
  von der Oberkante statt Hereinrutschen; späterer Trigger, längerer Scroll-Weg, weiterer Stagger).

### Editorial-Facts geschlossene Fläche, Companies-Grid bündig, LoveBrands raus & „Die Story" ausgerichtet (14.07., Nacht VII)
- **Editorial-Facts** (`EditorialStickyScene.tsx`): abwechselnd Magenta/Schwarz (keine Brombeere), KEINE
  Trenner/Gaps → eine geschlossene Fläche; breiterer Container (470→540px) + mehr Padding; die geöffnete
  Kachel bekommt mehr Höhe (flex-grow) → Copy klemmt nicht mehr an der Kante.
- **Companies-Bento bündig** (`CompaniesBento.tsx`): keine row-span mehr (einheitliche Zeilenhöhe), die
  LETZTE Kachel füllt dynamisch die Restspalten der letzten Zeile → das Grid schließt unten immer bündig ab
  (für alle Rubriken/Listen). Breite Feature-Cards (col-span-2) bleiben.
- **Love-Brands-/Iconic-IP-Banderole entfernt** (`Editorial.tsx`, `LoveBrandsTicker.tsx` + `/public/formats` gelöscht).
- **„Die Story"** sitzt jetzt bündig mit dem „deutsches Netzwerk"-Text unter dem Bild-Slider (gleiches
  [1fr_3fr]-Raster inkl. gap → identische linke Kante).

### Formular-Linien, Header-Titel, Hero-Tempo, Drift→Career & diverse Detailkorrekturen (14.07., Nacht VI)
- **Formular global auf Unterstrich-Linien** (`ContactForm.tsx`, `contact/page.tsx`, `globals.css`): keine
  Kästen mehr — transparente Felder, nur eine dünne weiße Unterkante, kein Radius. Gilt für About/Career
  (Master-Modul) + die eigene /contact-Seite. Neue Klasse `.cf-field` schlägt die globale `*{border-color}`-Regel.
- **Companies-Bento**: Bento-Logik wiederhergestellt (4-spaltig MIT variierenden Feature-Card-Größen), kompakte
  Zeilen (11.5vw) + ganze Karte als Website-Link bleiben.
- **Header-Seitentitel**: sitzt jetzt links oben neben dem B-Logo, bündig mit dessen Oberkante, im fetteren
  Schnitt (weight 600).
- **Hero-Sequenz**: Frame-1-Flackern entfernt → weiche Blende (0→1); Gesamtsequenz ~35 % schneller.
- **Ökosystem-Verzeichnis** (`EcosystemDirectory.tsx`): kleine Ziffern hinter den Genre-Headlines raus,
  „X Einträge · Reihenfolge redaktionell…"-Zeile raus.
- **Career-Standorte** (`CareerLocations.tsx`): runde Ecken der Magenta-Box entfernt (Heike).
- **BANIJAY-TOMORROW-CTA**: Default weiße Kontur auf transparent, Hover magenta gefüllt.
- **About-Drift → Career**: die driftende Bewegtbild-Collage von der About-Seite entfernt und als
  Hintergrund-Layer in die Career-Code-of-Conduct-Section gelegt; großes mittiges Video entfernt.

### Companies-Grid kompakt, Editorial-Facts-Accordion, iconic-IP-Banderole & Ökosystem-Labels (14.07., Nacht V)
- **Companies-Bento kompakt** (`CompaniesBento.tsx`): große Feature-Spans raus → uniformes 4er-Grid,
  Zeilen 13vw → 11.5vw. Mehr Companies auf deutlich weniger Scrollhöhe. Die **ganze Karte** ist jetzt der
  Klick → externe Company-Website (falls URL vorhanden), sonst neutrale Kachel. Keine Flip-/Detailkarten.
- **Editorial-Facts → Accordion** (`EditorialStickyScene.tsx`): alle 5 Zahlen/Fakten von banijay.de
  (40+ Companies & Labels, 1.300 Mitarbeitende, 4 Mrd. Views, 3.000 Stunden, 130+ weltweit) statt nur 2 —
  jede mit Copytext, per Single-Open-Accordion aufklappbar (erste offen), Zahlen zählen weiter hoch.
- **Iconic-IP-Banderole** (`LoveBrandsTicker.tsx`): die Logobanderole unter „About Banijay" zeigt jetzt die
  bekanntesten Formate (Wer wird Millionär?, The Masked Singer, Die Höhle der Löwen, TV total, Stromberg,
  Kitchen Impossible, Schlag den Star, Temptation Island, Kampf der Realitystars, Promi Big Brother,
  Die Verräter, NightWash) als Bild-Tiles (Stills aus dem Heike-Handover, weboptimiert unter `/public/formats`).
  ⚠️ Interim mit Show-Stills — sobald saubere weiße Format-Logos vorliegen, 1:1 austauschbar.
- **Ökosystem-Section** (`EcosystemSection.tsx`): untere Kategorie-Cards (Tech, Fiction) klappen jetzt nach
  OBEN auf (kein Clipping am unteren Rand, immer lesbar); Label-Chips +15 % (1rem → 1.15rem).

### Home-Hero global, Preloader-Rework, Ecosystem→About, Team komplett & großes Korrekturpaket (14.07., Nacht IV)
- **Home-Hero auf allen Seiten** (`AlgarveHome`): About/Companies/Career/News/Contact ersetzen den alten
  `PageHero` durch die „We Are Banijay"-Frame-Sequenz + Satellitenringe + mittelachsiges Statement auf
  dunklem Staub. Neue `frame3`-Prop → **je Seite passendes Typo-Bild** (`frame-3-about/career/companies/news.jpg`,
  2880px optimiert). Auf Subpages (ohne Preloader) startet die Frame-Sequenz sofort (intro-aware Timing).
- **Preloader-Rework** (`PreloaderParticles`/`IntroOverlay`): klar getrennte Beats — aus dem Nichts fadet
  driftender/funkelnder Sternenstaub ein → Zoom → das B verdichtet sich langsam (mit Twinkle/Drift/Swirl,
  bleibt lebendig) → Warp auf die Home. Neue Handles `setDust`/`setZoom`.
- **Hero „We Are Banijay"-Fade** smoother (Frame 3: 3,6 s `sine.inOut` statt 2,1 s, startet später).
- **Weiße „Blitzerkante" entfernt** (`AlgarveHome`): die `contour`-Div (weiße Inset-Linie auf der radialen
  Hero-Unterkante) raus → global auf allen Heros keine helle Außenkante mehr.
- **Satellitenringe**: ganze Schar +110 nach unten (erste Linie erreicht jetzt sichtbar beide Ränder statt
  oben abgeschnitten), Top-Maske entfernt.
- **Team komplett** (`Founders`): alle **11 Personen** (Abgleich mit banijay.de, inkl. Aylin Firat) im
  **6er-Grid** statt 5×2.
- **Globaler Sternenstaub** (`MoodBackdrop`): ambient `DustLayer` fix hinter allen Seiten → überall moody Staub.
- **Ecosystem-Seite entfernt**: Route weg, Inhalte (`EcosystemDirectory`) ans Ende von **About** verschoben;
  Navigation neu geordnet (**About über Companies**, Ecosystem raus).
- **About-Zahlen-Section** (`ProofVideo`): Video → all3media (wie Home), Statement → Marcus-Wolter-Zitat,
  jede Zahlen-Kachel trägt jetzt ihren Copytext, Companies **25+ → 40+** (`STATS`, single source). Separate
  CEO-Testimonial-Section entfällt (Zitat lebt im Video-Statement).
- **News**: Kartenhöhe je Postingformat (Social/LinkedIn+Insta = Hochformat 4:5, Presse = 4:3);
  **Marcus-Wolter-Rubrik** mit echten Artikelbildern (og:image/Artikelfoto → `public/news/`, weboptimiert);
  Rubrik-Filter mittelachsig (global gleich zur Companies-Section).
- **Social-Feed-Dedup** (`CareerSocialFeed`): „Plötzlich Schwester"/Good-Humor-Post kam doppelt (Cross-Post
  mit anderer URL+Bild, gleicher Text) → zusätzliche Dedup über normalisierten Text-Präfix (wirkt in allen Feeds).
- **Career**: RoleStack-Cards flacher (90→70vh) + Nummerierung raus; TOMORROW-CTA Active-State = weiße Kontur +
  transparenter Grund (statt Magenta-Fill).
- **CTA-Radien** global 8px → 6px (Badges 4px unberührt). Diverse Hero-Statements auf Lorem ipsum (Platzhalter).

### Editorial-Umbau, 3-Frame-Hero-Animation, Ring-/Gradient-Feinschliff & Korrekturpaket (14.07., Nacht III)
- **3-Frame-Hero-Animation** (`AlgarveHome.tsx`): `Hero-frame-1/2/3.jpg` (2880px) als Sequenz nach der
  Intro — dunkler Screen flackert auf → Frame 2 blendet transparent→klar ein (wird lebendig) → Frame 3
  bringt die Font „We Are Banijay" in den Hintergrund. Ersetzt den alten b-dark/b-bright-Crossfade.
- **Satellitenringe**: Abstände enger + progressiv (Gaps 100→150→210), Fade knapper (näher an der
  Hero-Kante, engerer Stagger); Grund als Gradient vom moody Hero-Grund zum Magenta der 1. Section.
- **Editorial** (`Editorial.tsx`): Headline → „About Banijay"; Lead-Text, „Der Blick nach vorn"-Liste
  und CTAs entfernt; Marcus-Zitat (Original banijay.de) wieder rein; Love-Brands-Ticker von der Home
  hierher verschoben.
- **„Ein Dach → Warp → Team" entfernt** (`Founders.tsx`): kein Blendeneffekt mehr, schlichter Scroll;
  die Headline „Ein Dach. Viele Handschriften." entfällt komplett.
- **Videos**: all3media-Teaser (ab Sek 19) als Hover-Video über der Team-Section; MadeFor-Trailer
  (ab Sek 09) als Bewegtbild in der Good-Humor-Company-Card.
- **News-Menü-CTA** (unterstrichen + Pfeil → /news, kein Button); News-Bildcontainer im Nav-Slider kantig.
- **Home-Companyliste**: Zahlen an den Rubrik-Buttons entfernt.
- **Statement-Blöcke**: Home-Statement auf Lorem ipsum (Platzhalter), Zeilenabstand global erhöht (138%).

### Pausenclown Media, Warp→Team-Merge, Companies-Page-Umbau, Zahlentafeln-Coloring, Back-to-Top-Hover & News kantig (14.07., Nacht II)
- **Pausenclown Media** neu in die Companies aufgenommen (`companyCards.ts` + `companiesDirectory.ts` per
  `fromCard`): Label mit Food-Experte Sebastian Lege — Content aus Marcus' Anschreiben, nichts erfunden.
  Logo (runder Patch) + Sebastian-Bild optimiert (`/company-logos/pausenclown-media.png`,
  `/companies/pausenclown-media.jpg`). Erscheint in Home-Bento, Ökosystem-Akkordeon, Love-Brands-Ticker
  und auf /companies. CompanyCards-CTA blendet ohne URL aus (neue Labels ohne Website).
- **„Ein Dach → Warp → Team" als EINE gepinnte Bühne** (`Founders.tsx`): der Warp-Intro liegt jetzt IN der
  Team-Section — Headline auf subtilem Staub → Halt → Warp-Blende (Flash als Puls, kein Glow-Rest) →
  das Team-Grid erscheint AN GLEICHER STELLE (kein Scroll-Übergang). `TeamWarpBlende.tsx` entfernt.
- **Companies-Page umgebaut** (`companies/page.tsx` + `AlgarveHome`-`variant`): Hero wie Home, darunter kein
  Magenta, sondern dunkler moody Sternenstaub; mittelachsiges Statement animiert nach den Ringen ein;
  dasselbe Companies-Bento; CTA/Kontaktformular raus. Auf dark → B-Logo weiß.
- **Zahlentafeln an die Farbrange** (`EditorialStickyScene.tsx`): Lavendel/Mint → Magenta `#ff4370` +
  tiefe Brombeere `#4a1636` (Mint verwenden wir nicht).
- **Back-to-Top-Hover**: kippt ins Magenta, hebt sich an, Pfeil rückt hoch, Magenta-Glow.
- **News-Bildcontainer kantig** im Nav-Slider (Header) — `0.83vw` → `0`.
- **Hero-Bilder auf 2880px** hochoptimiert (lanczos3 + Unsharp, q95, 4:4:4); helles „We Are Banijay"-Motiv
  (Quelle nur 1344px — höher aufgelöster Export würde weiter schärfen).

### Brennglas raus, Hero-Bild + -Optimierung, Ticker-Richtung, Editorial-Pin & Warp-Scroll-Stop (14.07., spät-Nacht)
- **Brennglas-Logik entfernt** (`AlgarveHome.tsx`): die WebGL-Linse (Shader, Refraktion, `lensCanvas`/
  `lensBox`) ist raus. Der Hero zeigt das crispe Vollbild-Motiv; der Dark→Hell-Crossfade („We Are
  Banijay" blendet ein) bleibt als schlanke CSS-Transition, plus ruhiges Zoom-„Atmen". Kein Blur mehr.
- **Hero-Bild getauscht** auf das „We Are Banijay"-Motiv (`rlqFEztxtc`) und **beide Hero-Bilder auf
  2880px optimiert** — helles Motiv (Quelle nur 1344px) via lanczos3 + Unsharp-Mask, q95, KEIN
  Chroma-Subsampling (saubere Textkanten); dunkles Basis-Visual aus der 5504px-Quelle. Hinweis: eine
  höher aufgelöste Export-Version des Headline-Motivs würde die Schärfe weiter anheben.
- **Love-Brands-Ticker** läuft jetzt **rechts → links** (Keyframe gedreht).
- **Editorial als echter PIN** (`EditorialStickyScene.tsx`): das Marcus-Bild steht full-size, die
  Bühne pinnt (Scroll-Stop), beim Weiterscrollen zieht sich das Bild nach links und die Fakten-Spalte
  fährt von RECHTS herein (Zahlen zählen hoch) — erst wenn sie stehen, löst der Pin. Deutlich
  kleinerer Abstand zur Lead-Headline (kein 35vh-Leerraum mehr).
- **„Ein Dach" → Warp → Team als Scroll-Stop** (`TeamWarpBlende.tsx`): Headline + Warp liegen jetzt
  in EINER gepinnten Bühne — die Headline baut sich auf, HÄLT, per Scroll löst der Hyperspace-Warp
  (Blende), dann löst der Pin und die Team-Section baut sich auf. Kein freies Durchscrollen mehr.

### Hero-Planeten & Ringe, B-Farbsensibilität, Warp-Blende, Ökosystem-Scale, Buttons & Back-to-Top (14.07., Nacht)
- **Hero-Planeten rund + volle Bahn** (`AlgarveHome.tsx`): die Satelliten liegen jetzt als
  px-runde HTML-Dots über der Zone (statt verzerrter SVG-Kreise im gestreckten SVG) und laufen
  ihre Linie komplett ab — sie wandern an beiden Rändern aus dem Bild.
- **Satellitenringe konzentrisch + sequenziell**: EINE Schar mit gemeinsamem Zentrum (oberste
  Linie am stärksten gebogen, nach unten flacher), die VERZÖGERT — erst nach dem Formen der
  Hero-Wölbung — von oben nach unten nacheinander auffächert.
- **B-Logo Farbsensibilität**: die Hero-/Orbit-Magenta-Zone ist als `data-nav-theme="magenta"`
  getaggt → das B oben rechts schaltet auf Magenta-Flächen zuverlässig auf Schwarz.
- **Warp-Blende zum Team** (`TeamWarpBlende.tsx`): an der Headline „Ein Dach. Viele
  Handschriften." beschleunigt der Sternenstaub in einen Hyperspace-Warp (radiale Streaks),
  blitzt auf und blendet als Blende in die Team-Section über. Headline dort „Unser Team".
- **Ökosystem größer skaliert** (`EcosystemSection.tsx`): engeres, symmetrisches viewBox
  (`-50 0 1300 640`) + höheres max-width (2000px) → die Orbit-Grafik füllt den Raum; im Zentrum
  ein **verdichteter Sternenstaub-Kern** (eigene DustLayer, kleiner Radius, mehr Boost).
  Swap-Headline „Ein System" → „Ein Ökosystem".
- **Buttons vereinheitlicht**: die Pillen-Buttons (CTA-Fill, Footer-/Header-Social,
  MagneticButton) auf 8px-Radius angeglichen (Heike-Regel — keine Pillen; runde Icon-Buttons
  bleiben rund).
- **Back-to-Top-Widget** (`BackToTop.tsx`): subtiler 8px-Glas-Chip unten rechts, erscheint nach
  ~3 Sektionen und scrollt weich nach oben (Lenis).

### Editorial-Sticky-Scroll, Hero-Feinschliff & Bento-Balance (14.07., spät)
- **Editorial als Sticky-Scroll** (`EditorialStickyScene.tsx`): 150→135vh-Section mit sticky
  100vh-Wrapper; das große Marcus-Bild settlet full-size, zieht sich nach links zusammen,
  von rechts fährt eine 470px-Fact-Spalte (2 Cards `#CDABFE`/`#D1DDD3`, Zahlen zählen von 0)
  herein. Kein horizontaler Scroll. Headline-Höhe reduziert (Bild näher dran).
- **Editorial-Headline** → „Back to the Future".
- **Hero — schwarze Linsen-Naht entfernt** (`AlgarveHome.tsx`): analytische Kanten-Normale
  statt Finite-Differenzen → kein Vorzeichenwechsel an der Mittelachse mehr.
- **Hero-Bild getauscht** (KjQfmrUkqp) + beide Visuals crisp re-optimiert (2880px, q92, 4:4:4).
- **Hero-Ecken**: reines Magenta hinter dem Hero — beim Formen der Bauchigkeit erscheint
  sofort Magenta statt dunklem Background.
- **Übergangslinien**: edge-to-edge, mit weißem Glow; die kleinen **weißen Planeten** swipen
  wieder auf den Linien.
- **Companies-Bento ausgewogener**: große Feature-Cards via `col-start` auch rechts / über
  verschiedene Zeilen gemischt (`CompaniesBento.tsx`).
- **Social-Dedup** zusätzlich über die Bild-URL (kein doppelter LinkedIn-Artikel mehr).
- **Statement-Glow**: verankerter radialer Glow direkt im Veil (kein separates Element).
- Großer Headline-Zeilenabstand +20% (110%→132%). Der Magenta-Headline-Glow-Test wieder entfernt.



### Preloader-Warp, fullscreen Hero, Editorial-Pin, Lightbox 16:9 & People-Fotos (14.07.)
- **Preloader neu** (`PreloaderParticles.tsx` + `IntroOverlay.tsx`): eigenes Canvas-Partikel-
  system statt skalierter Bitmap — scharfe Punkte formen aus der Mitte die B-Form (dichter),
  dann schießen sie als **Warp-Tunnel** (Streaks/Bewegungsunschärfe) auf die Kamera zu.
  Als Background das **Eclipse-Weltraum-Visual** (`/preloader/eclipse-bg.jpg`), leicht zoomend.
- **Home-Hero fullscreen** (`AlgarveHome.tsx`): Brennglas füllt den Viewport, Headline entfernt,
  Satellitenringe wieder **weiß**, moody→magenta-Übergang deutlich weicher (viele Stops).
- **Editorial als gepinnte Choreografie** (`Editorial.tsx`): Bild groß/mittig → wandert nach
  links → Fact-Boxen rattern von rechts gestaffelt herein → Pin löst → Artikeltext.
- **Companies-Lightbox 16:9** (`CompaniesBento.tsx`): Cards im 16:9-Format (statt 84vh-Hochformat);
  Companies ohne Content bekommen Platzhaltertext an denselben Stellen.
- **Statement → Love-Brands** (`AboutIntro.tsx`): erst das Statement, dann blenden die Love-
  Brands ein und laufen **links→rechts** durch.
- **Social-Section**: Sternenstaub im Hintergrund ergänzt (`CareerSocialSlider.tsx`).
- **People/TEAM**: echte Fotos für **Knut Kremling** und **Simone Lenzen** (`leadership.ts`).

## [redesign-v2] — Branch (Preview) — 2026-07-13

### Neue Seite: Ecosystem (Task #67, 13.07.)
- **`/ecosystem`** (`ecosystem/page.tsx` + `EcosystemDirectory.tsx`): eigene Seite hinter
  Companies in der Nav. PageHero „Ein System. Viele Handschriften." + vollständiges
  Ökosystem-Verzeichnis, gruppiert nach den offiziellen Kategorien (Entertainment, Fiction,
  Live, Audio, Artists, Distribution & Brand, Tech). Einheitlich hohe Zeilen, hauchdünne
  Trennlinien, externe Links mit ↗ — redaktionelle Reihenfolge, kein Ranking (Listen-UI-Prinzipien).
  Nav-Eintrag + Docked-Label ergänzt.

### Linsen-Brechung, Editorial-Fact-Boxen, Preloader- & Ökosystem-Feinschliff (13.07., spät)
- **Hero — Buchstaben-Brechung in der Linse** (`AlgarveHome.tsx`): die Headline „WE ARE BANIJAY"
  wird jetzt in die Linsen-Textur gebacken (Komposit aus Glas-B + Schrift) — die Buchstaben
  erscheinen INNERHALB der Linse gebrochen. Dahinter läuft dasselbe B-Motiv soft-blurry
  synchron; unterhalb der Linse gibt es keinen Bildgrund mehr, die Schrift steht auf Sternenstaub.
- **Hero — Satellitenringe magenta** (statt weiß, mit Glow); der moody→magenta-Übergang folgt
  jetzt der BIEGUNG der Ringe (Smile-Bogen, gleiche Geometrie).
- **Editorial — Fact-Boxen im Bild** (`Editorial.tsx`): die Stat-Panels liegen als Glas-Boxen
  ÜBER der rechten Bildhälfte (swipen von rechts ins Bild) statt als Grid daneben; Artikeltext
  folgt darunter.
- **Love-Brands-Ticker** (`AboutIntro.tsx` + `LoveBrandsTicker.tsx`): sitzt jetzt DIREKT unter dem
  Statement (im selben Sticky-Panel), läuft sehr langsam (90s) rechts→links mit weichem Kantenfade.
- **Preloader — Staub sammelt sich im B** (`IntroOverlay.tsx`): die B-Maske steht fix, nur das
  Staubfeld darin wächst aus der Mitte auf (klein → groß) und füllt die B-Form.
- **Ökosystem-Section** (`EcosystemSection.tsx`): Headline + Grafik höher platziert; die
  Kategorie-Chips maximal transparent (kein Fill, nur Haarlinie) → sehr subtil.

### Zwei-Layer-Hero, voll-Magenta-Statement & neuer Preloader (13.07., Abend)
- **Zwei-Layer-Hero** (`AlgarveHome.tsx`): oben NUR das Brennglas (außerhalb seiner Form
  transparent — Moody-Grund scheint durch), darunter/dahinter die Headline „WE ARE BANIJAY".
  Der opake Blur-Hintergrund und der dunkle Verlaufs-Layer, die die Schrift verdeckt haben,
  sind raus. Die Headline ist ab dem ERSTEN Laden unten sichtbar (steht bei Scroll 0 still)
  und wandert erst beim Scrollen — scroll-getrieben statt Endlos-Loop.
- **Statement auf VOLLER Magenta-Fläche** (`DustStage.tsx`): der Magenta-Veil ist jetzt
  vollflächig und hält, bis das Statement gelesen ist — kein dunkler oberer Rest mehr. Der
  weiche moody→magenta-Übergang passiert vorher als radialer Bogen am Unterrand der
  Übergangszone (symmetrisch zur Ring-Rundung) und scrollt in die Magenta-Fläche hinein.
- **Neuer Preloader** (`IntroOverlay.tsx`): Sternenstaub wächst subtil auf und ergibt durch
  eine B-Maske die Banijay-Bildmarke → die Headline „Welcome to / a new Era" (Zweizeiler,
  „Era" italic-magenta) blendet ein und tauscht das Staub-B aus → das Staubfeld explodiert
  in die Kamera als Blende, die auf den Home-Hero aufreißt.

### Home-Feinschliff: Hero, Übergang & Editorial (13.07., Nachmittag)
- **Hero above the fold, ohne Intro-Headline:** die statische Hero-Headline entfällt —
  „WE ARE BANIJAY" erscheint erst beim Scrollen als Ticker (`AlgarveHome.tsx`).
- **Ticker „WE ARE BANIJAY":** läuft von **rechts nach links**, ohne Mittelpunkt-Trenner,
  in **Anton** fett/groß (`heroTitleMarquee`-Keyframe umgedreht).
- **Planeten-Gating:** die magenta Satelliten erscheinen und zirkulieren erst, wenn ihre
  Radius-Linie vollständig eingeblendet ist.
- **Übergang moody → magenta weicher:** der Veil-Gradient ist jetzt **radial** und
  symmetrisch zum Radius der Satelliten-Ringe (nach unten geöffnete Kurve) statt harter
  horizontaler Kante (`DustStage.tsx`).
- **Invertierten Sternenstaub** aus der Magenta-Statement-Fläche wieder entfernt
  („sah aus wie Schmutz").
- **Editorial-Bildmodul (Referenz-Choreografie):** das große Marcus-Porträt **faded auf**,
  **schiebt sich nach links** und macht rechts Platz — dann **swipen die Fact-Boxen von
  rechts herein**, danach folgt der Artikeltext (`Editorial.tsx`).
- **Editorial-Headline** „Eine neue Ära: Banijay & All3Media" bekommt den Look der Headline
  über der Companies-Liste: zentriert, uppercase, groß, Zeilen **konvergieren** gescrubbt
  (obere von oben, untere von unten) auf zentralem Sternstaub; magenta italic „&".

### Moody-Inversion der ganzen Site (Task #69, 10.–13.07.)
- **Globaler MoodBackdrop** (`MoodBackdrop.tsx`, in `(frontend)/layout.tsx`): jede Seite
  trägt denselben dark/moody Grund (Schwarz → Brombeere → Magenta-dunkel → Indigo) mit
  spürbarer Varianz — ein wandernder Magenta-Haupt-Glow (scroll-getrieben), ein Gegen-Glow
  in Gegenphase und ein zeitbasiertes „Atmen". Das Atmen läuft als CSS-Animation auf einer
  INNEREN Fläche (getrennt vom Scroll-transform der äußeren Ebene) — sonst flackerte der
  Glow oben rechts beim Scrollen.
- **~35 Module invertiert:** transparente Sections auf dem MoodBackdrop, Paper-Typo,
  `.glass-panel`-Milchglas (Magenta-Alpha + Blur + Licht-Aura). H1 site-weit in **Anton**.
- **Heike-Regel „keine abgerundeten Ecken":** Container eckig; nur CTAs/Chips/Formfelder
  max. 8px, Badges 4px. News-Modul-Bildcontainer entrundet; ContactForm-Select `colorScheme`
  dark; Footer site-weit invertiert (Magenta-Card, Ink-Elemente).

### Neue Home-Intro-Animation (13.07.)
- **IntroOverlay** (`IntroOverlay.tsx`): Sternenstaub entsteht zentral → weißes B baut sich
  auf → Video-Reveal → B-Zoom öffnet sich zum Brennglas-Rahmen → Headline skaliert auf,
  Header blendet mit dem **Magenta-B als Menü-Element** ein (ersetzt „MENU"). Scroll während
  des Intros gesperrt, `prefers-reduced-motion` überspringt.

### Brennglas-Hero als Full-Size (13.07.)
- Das Brennglas IST die Hero-Form (`AlgarveHome.tsx`): rotes Glas-B als Still-Master, WebGL-
  Linse rendert innen scharf mit Kanten-Brechung, außen blurry, perspektivischer Maus-Versatz.
  Motiv-Fokus oben, unten Dunkel-Fade. Headline **„WE ARE BANIJAY"** in Versalien, gelayert
  (Wort-für-Wort aus Masken), weiter oben platziert.
- **Scroll-geformte radiale Kurve:** der Hero startet unten GERADE; beim Scrollen formt sich
  die 50vw-Pill-Kurve (ein Fortschrittswert steuert Section-Radius, Zirkel-Kontur und den
  Linsen-Pill-Radius im Shader). `overflow: hidden` clippt exakt entlang der Rundung.
- **Farbfächer-Übergang** in die Statement-Section: aus der Kurve fächern konzentrische
  Farb-Layer (Career-Hero-Palette) heraus, der Magenta-Layer füllt in die Statement-Fläche;
  per Scroll löst sich das Magenta auf und der Moody-Grund + zentraler Sternstaub erscheinen.
- Logo links oben site-weit ausgeblendet — nur bei geöffneter Navi (schwarz) sichtbar.

### Home-Struktur & Exchange-Strecke (13.07.)
- Sticky-Grid-„Entertainment-Portfolio" (400vh) entfernt (#53); Statement folgt direkt.
- **Exchange-Choreografie:** Statement blendet aus → gepinnte **Ökosystem-Section**
  (`EcosystemSection.tsx`, Atom-Orbit-Grafik mit gekippten Ellipsen, wabernden Karten-Balken)
  baut sich auf und tauscht sich an gleicher Stelle gegen die Headline „Ein System mit über
  40 Companies" → normaler Scroll zur Liste. Ein sticky **DustStage**-Sternstaub trägt die
  ganze Strecke (wächst zentral auf, bleibt stehen). Variante B „Faser-Globus"
  (`EcosystemBurst.tsx`) als Looktest unter `/looktest-ecosystem-b` gesichert.

### Companies-Directory + Flip-Lightbox (Task #60/#61, 13.07.)
- **Neue Datenbasis** `companiesDirectory.ts`: 40 Einträge — 30 Logo-Companies (Pipeline
  PDF→getrimmtes Weiß-PNG in `public/company-logos`) + All3Media (filmpool, Magic Connection,
  South & Browse) + 10 Grafik-Platzhalter. Brainpool-Companies auf Kundenwunsch entfernt.
- **Companies-Bento** rubrizierbar nach Ökosystem-Kategorien (Filter-Chips), Kacheln mit
  echten Weiß-Logos + exemplarischem Bewegtbild (Trailer-Loops). Klick → **Lightbox als
  Scroll-Flip-Stack** in der Flip-Card-Optik der früheren Kompetenzfelder (Fullsize-Video im
  Background, Durchblättern per Scroll/Pfeil, X/Esc schließt). Das eigenständige
  ServicesStack-Modul ist entfallen.

### Editorial-Section „Eine neue Ära" (Task #56, 13.07.)
- `Editorial.tsx` (BYQ-Artikel-Layout, dark/eckig): Marcus-Porträt links hochkant (sticky),
  Text rechts, helles Milchglas-Panel mit Ink-Typo, endlose Bild-Marquee (Cologne Comedy
  Festival), Sternstaub rechts oben, spektakuläre Entrance-Choreografie (Zeilen-Masken,
  „&"-Pop, Bild-Wipe, gestaffelte Blöcke). Inhalt: Historie → Fusion Banijay Entertainment +
  All3Media (echte Fakten/Zitate; Wording-Entwurf bis Heike, #58).

### Weitere (13.07.)
- Companies-Headline & „Ein Dach. Viele Handschriften." als AnimatedHeading mit zentralem
  Sternstaub hinter der Konvergenz. Team-Headline mittelachsig + mehr Luft. Divider-Linie
  auf der Home entfernt. Team-Überblend-Video getauscht. Hydration-Fixe (Float-Präzision),
  toter Code (`HomeSections.tsx`) gelöscht.

## [redesign-v2] — Branch (Preview) — 2026-07-08

### News-Page: gemischter News-/Social-Feed + geschärfte Rubriken (08.07.)
- **Ein gemeinsamer Feed statt getrennter Section:** die redaktionellen News-Beiträge und
  die LinkedIn-/Social-Posts (Juicer) werden serverseitig zu EINER nach Datum (absteigend)
  sortierten Liste zusammengeführt (`src/data/feed.ts` → `mergeFeed()`) und gemeinsam im
  Masonry-Grid gerendert. Der bisher separate Social-Slider unten auf der News-Page entfällt.
- **Social-Karten im Grid:** externe LinkedIn-Posts als Karte mit Quellen-Badge (z. B.
  „LinkedIn") oben links, 3-zeilig gekapptem Post-Text und „Ansehen ↗" (öffnet extern);
  News-Karten unverändert „Zum Beitrag ↗" (intern).
- **Rubrik-Filter erweitert:** neue Rubrik **Social** — `Alle · News · Primetime · Podcast · Social`.
- **Mehr LinkedIn:** `fetchSocialPosts(limit)` ist jetzt parametrierbar (Juicer-Rohabruf
  `per=50`); News-Liste zieht **30** Posts, der Career-Slider bleibt schlank bei **12**.
- **Rubrik-Korrekturen (Datenqualität):** „Brainpool Live eröffnet NightWash club" (Presse,
  war fälschlich Podcast) → **News**; „Marcus Wolter zu Gast im brand eins Podcast"
  (externer Gastauftritt) → **News**. Mapping geschärft: nur `WOLTER TALKS` zählt als
  **Podcast** — die Podcast-Rubrik enthält damit ausschließlich die eigenen Folgen.

### Companies-Bento + News-Rubriken (Start redesign-v2, 07.–08.07.)
- **Home – neue Companies-Bento-Section:** dark, holistisches Bento-Grid aller Companies mit
  Medien-Hintergrund (Ken-Burns), weißem Banijay-Logo, Genre-Tags, Aufbau-Stagger und
  Klick-Detail-Overlay — ersetzt den bisherigen Companies-Scroller auf der Home.
- **News-Page – Rubrik-Filter (NewsFilter/NewsGrid):** Chip-Filter über dem Masonry-Grid.

## [Unreleased] — 2026-07-05

### Hero-Torbogen + News-Slider-Fix (05.07., abends)
- **PageHero (alle Subpages: About · Companies · Career · Contact), mobil:** die Startform
  des Video-Containers kurvt oben zum TORBOGEN auf (obere Ecken = halbe Container-Breite
  → voller Halbkreis-Bogen, wie das Banijay-b-Einzelelement), unten dezent gerundet. Maße
  unverändert — nur das Curving oben. Danach laufen wie gehabt die Farb-Layer auf Full-Screen.
- **Menü-News-Slider (mobil):** die offene Höhe war fix auf 48vw → das 40vw hohe Kartenbild
  plus Datum/Titel wurde abgeschnitten. Offene Höhe jetzt viewport-abhängig (mobil 78vw,
  Desktop 48vw) → Titel vollständig sichtbar.


### Flip-Card-Fix + Statement-Reveal (05.07., nachmittags)
- **Flip-Cards (Companies · Home-Kernkompetenzen · Career-Rollenwelt):** der zuvor
  ergänzte autoAlpha-Fade-in-Auftritt kollidierte mit der Opacity der Flip-Tween (beide
  steuern die Card-Transparenz) → die Karte war beim Wegkippen bereits unsichtbar
  (wirkte wie „hart ausgeblendet" statt geflippt). Fade-in wieder ENTFERNT, Flip zurück
  auf den funktionierenden Stand (opacity + rotationX + scale progressen synchron).
- **AboutIntro-Statement-Reveal:** Scrub `1 → 0.4` → bei schnellem Rein-Scrollen folgt der
  Wort-Reveal dem Scroll eng, statt ~1 s „hinterherzuschieben".


### Desktop-Runde: News-Masonry, WorldNetwork-Snap, PartnerStack, Career-Slider, CountUp, Hero-Video (05.07.)
- **News-Grid (Desktop):** echtes CSS-Grid-Masonry mit NATIVEN Thumbnail-Proportionen
  (kein Crop) + variablen Card-Größen — einzelne „Feature"-Karten sind 2 Spalten breit
  (Größenvarianz trotz gleicher 16:9-Quellen), Pinterest-Packing über berechnete
  Row-Spans (`items-start` verhindert die zirkuläre Höhenmessung). Breiterer Container
  (bis 1840px), bis zu 5 Spalten, 21 statt 15 Beiträge vorab. Mobile unverändert (1 Spalte).
- **CompaniesScroller (Desktop):** „UNSERE COMPANIES" steht zuerst als EIN zentrierter
  Satz (gemessener Versatz, kein Gap) und zieht erst danach an die Ränder. Am Slide-ENDE
  ein End-Hold (Sektion +120vh) → die letzten Cards sind erfassbar, bevor es weitergeht.
- **WorldNetwork „Teil einer Welt" (Desktop):** feste Setz-/Aufbau-Distanz (~1.5 Screens)
  + Logo-Slide — vorher war die Pin-Strecke auf breiten Screens 0 (alle Logos passten in
  eine Reihe → maxScroll 0), man scrollte drüber. Jetzt rastet die Section full-size ein
  (Snap), baut sich auf, dann sliden die Logos, dann geht's weiter.
- **PartnerStack (Desktop):** Text animiert zuerst vollständig, DANN erscheinen die
  Bildkarten (autoAlpha 0 → fade nach der Text-Reveal) — wie mobil.
- **CareerSocialSlider (Desktop):** Aufbau höher gesetzt (paddingTop 11vw → 7vw) → mehr
  Abstand zur unteren Kante, weiterhin genug zur Nav.
- **CountUp:** von framer-motion `useInView` (IntersectionObserver) auf GSAP ScrollTrigger
  umgestellt → der Fakten-Zähler startet zuverlässig erst beim Sichtbarwerden (vorher
  durch Lenis/Pins zu früh). Betrifft Home-Stats + About-ProofVideo.
- **Hero-Poster (Subpages):** About/Companies/Contact zeigten Grid-Bilder als Poster →
  Fremdbild-Flash. Jetzt Poster aus dem ersten Videoframe.
- **Home Intro-Video (`hero.mp4`):** aus der 1080p-Quelle neu encodiert — 1440×684 @1.4 Mbps
  → 1920×912 @2.4 Mbps + Schärfung (gleicher Bildausschnitt) → deutlich schärfer bei Full-Screen.
- **Formular (alle Seiten, Desktop):** `maxWidth: 1440px`-Cap entfernt (aus der Mobile-Runde
  versehentlich ergänzt) → voll-breiter Container wie im Original-Template; keine
  abgeschnittenen Placeholder / zu schmalen Felder mehr auf breiten Screens.

## [2026-07-04] — deployt

### Career-Feinschliff: Hero-Poster, Role-Intro-Highlights, Feed-Dedup (04.07., 60. Runde)
- **Career-Hero:** Poster war ein Schwarz-Weiß-Bild (`c6.png`) → blitzte vor dem
  farbigen Video auf. Neues Poster aus dem ersten Videoframe (`career-hero-poster.jpg`,
  ffmpeg) → nahtloser Start, kein B/W-Flash.
- **Career Hero-Body:** die Rollen-Domänen **Produktion · Redaktion · Entwicklung ·
  Digital · Live** magenta gehighlightet (PageHero `highlights`).
- **CareerRoleStack:** die Aufzählung stand doppelt (Hero-Body + Section-Copy). Die
  Section darunter jetzt NUR EIN Copytext, **keine eigene Headline** mehr, neu getextet
  ohne die Domänen-Aufzählung („Viele Companies, viele Rollen, ein gemeinsames Ziel: …").
  Formatierung 1:1 wie der About-Copytext (ProofVideo `proofText`): 1.9vw / mobil 5vw,
  line-height 132 %, weight 500, letter-spacing −0.03vw.
- **CareerSocialFeed:** Deduplizierung (URL + Text) → der doppelte Juicer-Beitrag
  (z. B. „Good Humor"-Drehstart) erscheint nur noch einmal.

### Mobile-Feinschliff: Nav-Einrückung, WorldNetwork-Logos, PartnerStack-Farbcode (04.07., 59. Runde)
- **SiteHeader (mobil):** Logo + MENU von 2vw auf 4vw eingerückt (an das innere Grid).
- **WorldNetwork-Logos (mobil):** Kacheln quadratisch (das Logo-PNG ist 800×800) →
  gerendertes Logo ~65px → ~93px (+43 %); Padding 6 % → 4 %.
- **PartnerStack (mobil):** Karten rasten tiefer ein (Sticky-Top 8–17vw → 22–29,5vw)
  → nicht mehr hinter Logo/MENU, mit Abstand zur Nav. Schwarze Text-Kacheln in die
  Farbkodierung umgefärbt (Magenta · Indigo · Laser-Pink · Violet, je Fächer).

### Mobile-Timing: Home-Statement + Companies-Slider (04.07., 58. Runde)
- **AboutIntro Home (mobil):** Sektion 230vh → 260vh, Magenta-Blende steigt später
  (Timeline 0.45 → 0.58) → deutliches Lese-Fenster, bevor sie über das Statement zieht.
- **CompaniesScroller (mobil):** Intro-Anteil stark verkürzt (Slide-Timeline-Dauer
  1 → 5) → „Unsere/Companies" + erste Card in ~1 Scroll statt 3–4; Slide träger
  (Scrollweg 1.7 → 2.1, Scrub 0.5 → 0.7).

### Mobile-Feinschliff: PartnerStack-Choreo, WorldNetwork-Timing, Drift-Luft (04.07., 57. Runde)
- **PartnerStack „Partner für Entertainment" (About mobil):** Bildkarten sind bei der
  Magenta-Andockung zunächst unsichtbar (opacity 0) und blenden ERST ein, wenn nach
  dem Text der Stack hochkommt → „erst Schrift, dann Bild". Die Intro-Schrift wird
  kurz gepinnt (bleibt unter der Nav, statt sofort dahinter wegzuscrollen). Karten
  niedriger (60vh → 52vh). WWM-Fokus `50% 44% → 66% 42%` (Jauch mittig statt am Rand).
- **WorldNetwork-Logos (About mobil):** Kacheln noch niedriger (30vw → 22vw) → weniger
  Leerraum über/unter dem Logo.

### Mobile-Feinschliff: Career-Copytext, News-Native-Ratio, WorldNetwork, Drift (04.07., 56. Runde)
- **CareerRoleStack (mobil):** die große Headline + die graue Copy zu EINEM Copytext
  oberhalb der Flip-Cards zusammengefasst (Desktop bleibt geteilt).
- **CareerTomorrowStack (mobil):** Bild sitzt jetzt oberhalb der Copy (Eyebrow →
  Headline → Bild → Copy → CTA); Desktop bleibt 2-spaltig (Bild rechts).
- **CareerSocialSlider (mobil):** Pin startet früher (`top top` → `top 16%`) → Headline
  `#workatBanijay` bleibt unter der Nav; Feed von 6 auf 12 Karten erhöht.
- **NewsGrid (mobil):** Bildcontainer übernehmen das NATIVE Verhältnis der vorbereiteten
  Banijay-Preview-Bilder (kein Crop mehr) statt fixem 4:3; Desktop-Masonry bleibt.
- **AboutIntro / WorldNetwork (mobil):** Statement-Standraum 150vh → 240vh, damit das
  Statement fertig steht, BEVOR die Magenta-Fläche es deckt; WorldNetwork-Content wird
  gepinnt (Headline/Copy nicht mehr hinter der Nav); Logo-Kacheln kleiner, Logos größer.
- **AboutDrift (mobil):** luftiger (Bühne 112vh → 134vh, oberer Bereich entzerrt),
  Hintergrund-Video kleiner; Container bauen sich gestaffelt auf + dezentes Wabern.

### Mobile-Feinschliff: Flip-Cards-Luft, News-4:3, About-Video-Grow (04.07., 55. Runde)
- **CompanyCards / Flip-Cards (mobil):** Karten laufen jetzt auf **Inhaltshöhe**
  (`h-[80vh] → h-auto`) → kein zu großer Leerraum mehr unter dem Bildcontainer.
  Mehr Luft: größere Gaps im Textblock (`gap 3.5vw`), mehr Abstand über dem Bild
  (`mt 7vw`). „Zur Website"-CTA luftiger (mobiles Padding `3.4vw/6vw` statt eng).
- **News-Grid (mobil):** einheitliche Bildcontainer im festen **4:3**-Verhältnis
  (`max-[767px]:!aspect-[4/3]`) statt der wechselnden Masonry-Ratios → ruhiges,
  gleichmäßiges Raster.
- **About / ProofVideo (mobil):** die statische Video-Karte ersetzt durch die
  **gleiche gepinnte Grow-Mechanik wie Desktop** — das Video wächst per clip-path
  aus der Stat-Kachel „130+ Companies weltweit" über den Zahlen-Content auf
  Full-Screen, dann animiert sich das Statement Wort für Wort rein.

### Mobile-Feinschliff: News-Linien, PageHero-Hold, Body-Breite, Coverflow (03.07., 54. Runde)
- **NewsStack (mobil):** die feinen `border-top`-Linien der News-Karten (u. a. unter
  „Alle News" + im Stack) entfernt → cleaner.
- **PageHero (Companies + alle Seiten außer Home, mobil):** kurzer Scroll-Break,
  NACHDEM das Video full-size eingerastet ist (Hold-Beat am Timeline-Ende) — man
  scrollt nicht mehr sofort weiter; danach geht's in die nächste Section.
- **PageHero-Body (mobil):** Statement nutzt jetzt die **volle Grid-Breite**
  (`maxWidth 63.33vw → 100%`).
- **Companies-Coverflow (mobil):** Snap auf jede Card-Mitte, mehr Scrollweg (ruhiger),
  `rotationZ` auf ±8° geclamped (letzte Cards „verdrehen" nicht mehr).

### Mobile-Video-Gallery: 8 Kacheln (03.07., 53. Runde)
- Die mobile Portfolio-/Video-Gallery (Home) hat jetzt **8 Container** statt 4: oben
  2×2, unten 2×2, das große Video mittig bleibt gleich groß (Grid `1fr 1fr 2fr 1fr 1fr`
  → kleine Kacheln halb so hoch). 3 der Kacheln sind Loop-Videos (WWM, Promi BB,
  Tatort) → lebendigere Gallery. Alle 8 laufen durch die bestehende Flip-Animation.

### Mobile-Hero-Video (03.07., 52. Runde)
- Eigenes **Hochformat-Reel für den Mobile-Hero** (`public/video/hero-mobile.mp4`,
  496×864, weboptimiert 2,2 MB → 574 KB, kein Audio, faststart). Desktop/Tablet behält
  das Landscape-Reel; ab ≤767px läuft das native Hochformat (formatfüllend, kein
  aggressiver Crop mehr). Zwei `<video>` per Breakpoint, gemeinsamer Fade-In.

### Mobile-Übergänge + Card-/Slider-Feinschliff (03.07., 51. Runde)

**Mobile-Übergänge (Desktop-Logik auf Mobile übertragen)**
- **Home-LogoReveal:** Video-Rise über das (jetzt auch mobil gepinnte) Team + Magenta-
  „b"-Blende → News — Guard entfernt, `-100vh`-Overlap auch mobil.
- **About-WorldNetwork:** Magenta-Fläche steigt mobil über das Statement (Curving-
  Unfold + Content-Reveal); Logo-Bahn bleibt nativer Swipe (Pin nur Desktop).
- **About-ProofVideo:** das Video wächst mobil aus der „130+ Companies weltweit"-Stat-
  Kachel auf Full-Screen (Geometrie dynamisch aus der Kachel), Schrift hovert rein.
- **Career-#workatBanijay:** gepinnter Horizontal-Slider (Scroll-Stop → Karten-Slide-
  Gate) jetzt auch mobil statt nativem Swipe.

**Cards / Slider / Copy (mobil)**
- **CompanyCards:** Keytags 50 % größer (der Tag-Text hing an inline `0.82vw` = 3px →
  jetzt ~16px), „Bekannt für"-Zeile mobil raus, **Flip-Animation** aktiviert (Cards
  sticky, kippen weg wie die Home-Kernkompetenzen).
- **#workatBanijay:** Copy-Block war zu eng (Inline-`maxWidth 34vw`) → voll breit;
  Social-Cards −25 % (78vw → 58vw, mehr als eine pro Screen).
- **WorldNetwork-Slider-Logos:** Container 72vw → 50vw + kleineres Logo-Padding.
- **AboutIntro-Statement:** Wort-Reveal zügiger (`+=60%`/Stagger 1 → `+=38%`/0,6).

**PageHero-Regression-Fix**
- h1/Box-Änderungen greifen jetzt **nur Mobile**; Desktop per `matchMedia` auf den
  Original-Stand (b-/„D"-Form, 40vw×30vh, h1 122px).

### Mobile-Runde: Hero, Companies-Choreo, Cards, Formular-Master, Übergänge (03.07., 50. Runde)

**Home**
- **Testimonials-Panel:** leuchtendes Magenta-„b" als Hintergrund (weboptimiert →
  `public/brand/testimonials-b-glow.jpg`, 1,7 MB → 108 KB) mit Verlaufs-Scrim.
- **Companies-Bilder:** die Home-„Unsere Companies"-Poster jetzt auch auf der
  Companies-Seite (CompanyCards via `getCompanyImage` + Fokuspunkt).
- **Mobile-Hero:** fullsize, gefächerter BANIJAY auch mobil, Copy am unteren Rand +
  blendet nach der h1-Choreografie ein; B-Video weniger gezoomt (fixe `46vh`).
- **Mobile „Unsere Companies":** neue Intro-Choreografie — Wörter erscheinen → fahren
  auseinander (Leerraum) → erste Card wächst aus der Mitte → dann Slide; Doppel-BG
  gefixt (Paper-Seam via `pb-0`, Farb-Reset auf Magenta in der Intro).
- **Kernkompetenz-Cards mobil:** Video-Escape-Bug gefixt (Headline war überdeckt),
  Card kürzer (`90vh → 74vh`).

**Career**
- **Job-Liste gekürzt:** Mobile ~halbiert, Desktop ~⅓ weniger, CTA auf Mobile unter
  der Liste.
- **RoleStack:** Cards = Home-Kernkompetenz-Physik/Optik (sticky, flippen auf allen
  Viewports), Intro getrennt (große Headline + kleinere Copy) + scroll-gekoppelter
  Wort-Parallax.

**Formular-Master (Algarve-Template)**
- ContactForm nach dem Algarve-`contact-1`-Template neu gebaut — **mobiler Stack-Bug
  gefixt** (Inline-Grid überschrieb die Responsive-Regel → Headline/Formular klebten
  nebeneinander), Copy voll breit, Halbspalten, Unterkanten-Felder, Wort-Parallax,
  Select auf 3 Optionen. Master für **Career/About/Companies** (geteilte Komponente).

**PageHero (andere Seiten)**
- Änderungen (h1 größer, Box größer/rund) jetzt **nur Mobile**; Desktop per `matchMedia`
  auf den Original-Stand zurückgebaut (b-/„D"-Form, 40vw×30vh, h1 122px).

**Mobile-Übergänge (Foundation)**
- Founders-Team **pinnt jetzt auch mobil** am Ende; PartnerStack (About) steigt mobil
  mit `-100vh`-Overlap + Kurven-Unfold + Content-Reveal über das gepinnte Team
  (Desktop-Logik auf Mobile übertragen). Visuelles Feintuning ausstehend.

### Feinschliff: Hero-Timing, News-Masonry, Layout-Luft, Magenta-Fix (03.07., 49. Runde)

**Home-Hero – weicherer Auftakt**
- Die initiale Typo blendet nicht mehr hart in 0,6 s ein, sondern **sanft über 1,25 s**
  (`sine.out` + leichter Aufwärts-Drift) und steht kurz still, **bevor** die
  WE/ARE/BANIJAY-Choreografie (Flips/Slices) startet — kein Überlapp mehr.

**News-Page – Masonry statt symmetrischem Raster**
- Das gleichförmige 5-Spalten-Grid ist jetzt ein **redaktionelles Masonry** (CSS-
  Multi-Column, `break-inside-avoid`, responsive 1→2→3→4 Spalten). Pro Karte ein
  **wechselndes Seitenverhältnis** (`4/5 · 16/11 · 1/1 · 3/4 · 16/10 · 5/6`, zyklisch),
  die Palette teilt sich bewusst nicht glatt durch die Spaltenzahl → asymmetrischer
  Rhythmus statt Gleichförmigkeit.
- **CTA-Hover:** „Zum Beitrag" bekommt eine von links einlaufende **Underline** (+ Pfeil-
  Diagonalbewegung). Der „Weitere News laden"-Button erhielt die fehlende `group`-Klasse,
  damit seine Pfeil-Animation greift.

**Layout-Luft (MacBook-Pro-Format)**
- **WorldNetwork (About):** Slider-Tiles flacher (`22vh→16vh`), Brand-Video kompakter
  (`50vh→42vh`), Copy breiter (weniger Zeilen) → die Section klebt nicht mehr an der Nav.
- **PartnerStack (About):** Der Intro-Reveal war zu lang (`+=45%`) und scrollte halb
  aufgebaut oben raus → **kurz & früh fertig** (`+=16%`, weniger Weg), Block tiefer
  angesetzt (`paddingTop 8vw→13vw`) und kompakter (Copy 2 statt 3 Zeilen).
- **Career-Social-Feed:** `paddingTop 5.56vw→11vw` → der gepinnte Slider steht mittig
  (Nav-Abstand 80→158 px) statt oben angeklebt. Mobile via Override unverändert.

**Bugfix: Companies-Magenta-Grundfläche (Home)**
- Der Hintergrund-Treiber schrieb `background-color` nur bei Farbänderung und setzte ihn
  im Cleanup auf `""`. In React-19-StrictMode/HMR (mount→cleanup→mount) blieb die Fläche
  danach transparent → off-white schien durch. Jetzt wird sie beim Effect-Start **auf
  Magenta geprimt** und im Cleanup auf die Basis-Magenta zurückgesetzt (Desktop + Mobile).

### Mobile-QA + Nav-Theme-Span-Fix (03.07., 48. Runde)
- **Nav-Theme nur bei voller Breite:** Der SiteHeader wendet ein `data-nav-theme`
  jetzt nur an, wenn das Element horizontal (nahezu) die volle Breite unter der Nav
  einnimmt. Damit invertiert die zentrierte Career-Standorte-Magenta-Box auf Desktop
  die Nav/Logo NICHT mehr fälschlich (Off-White-Ränder → Logo bleibt Magenta-„b"),
  auf Mobile (Box full-width) invertiert das Logo korrekt auf Schwarz.
- **Mobile-QA:** Home-Hero, About (Hero-b-Form + Drift-Sektion), News-Grid (1-Spalten
  mit Querformat + CTA), Career geprüft — keine Overflows, Layouts sauber.

### Drift-Sektion, Video-Color-Coding, flache Flipcards, Hero-b-Form (03.07., 47. Runde)

**Neu: „Drift"-Sektion (About)**
- Frei schwebende **Video-Container** (11 lose Snippets aus dem Banijay-Unternehmens-
  trailer, weboptimiert → `public/video/about-drift/`) mit Scroll- + Maus-Parallax,
  Grain-Textur, Off-White-Bühne. Formatfüllend (`object-cover`), weiche Ecken (12px),
  ruhige Speeds + mehr Spacing. Platziert zwischen WorldNetwork und Founders.

**Video Color Coding (Night + Neon)**
- Neue Palette aus dem Farb-Coding der Videos in `globals.css` (Tokens
  `--bj-video-*`): Ink/Aubergine/Violett + Magenta/Pink/Coral + Blau/Cyan/Ice.
  Magenta (`#ff4370`) bleibt Main-Farbe.
- **CompanyCards / CareerRoleStack / ServicesStack:** HSL-Rainbow-Sweep bzw. Amber-
  Spektrum → feste Video-Palette (Magenta · Pink · Coral · Violett · Indigo · Blau ·
  Cyan · Aubergine), Textfarbe adaptiv per Luminanz. **Kein Gelb/Grün/Amber** mehr als
  UI-Fläche. PageHero-Dots + Hero-Aura-Gradient angepasst.
- **ServicesStack-Flipcards flach:** Gradient/Glow/Dark-Overlay raus → solide Farbe,
  genau wie die Card-Stacks auf den anderen Seiten.

**Hero-Video-Container in b-Logo-Form (PageHero, alle Subpages)**
- Der Video-/Farb-Container startet jetzt in der Form des Banijay-Logo-Elements
  (rechts voller Halbkreis, links kleine obere/scharfe untere Ecke). Beim Aufskalieren
  flachen die Curvings in die Kanten aus → Full-Screen.

**Fixes**
- **Home Video→News-Übergang:** die b-Blende wurde am Ende auf `mask-position 118%`
  komplett aus dem Container geschoben → Video tauchte wieder auf. Shift auf max. ~82%
  begrenzt (unterer b-Balken deckt voll), Section-BG → Magenta → nahtlos in die News.
- **Career:** `data-nav-theme` von der zentrierten Standorte-Magenta-Box entfernt —
  Logo/MENU über der Off-White-Fläche invertieren nicht mehr fälschlich.
- **Career Social-Feed:** Slide-Container ~25 % kleiner (26vw → 19.5vw), passt wieder
  ins Screen-Format.
- **News-Grid:** 5-Spalten mit Querformat-Bildcontainern + „Zum Beitrag"-CTA, lockerer.
- **PageHero-Umlaute** (Ä/Ö/Ü) werden oben nicht mehr abgeschnitten.



### Overlay-Choreografie, News-Ausbau, Spektrum-Flip-Cards, Video-Feinschliff (03.07., 46. Runde)

**Home**
- **Team → Video/News-Übergang:** Das magenta Founders-Overlay (unerwünschte
  Zwischenebene) entfernt. Der LogoReveal-Videocontainer schiebt sich jetzt direkt
  über das Team; der Team-Pin (`+=210%`) hält, bis das Video mit `-100vh`-Overlap
  **komplett gedeckt** hat — das Team steht die ganze Zeit still (kein Mitwandern),
  und alle Namen sind vollständig aufgebaut, bevor das Video aufsteigt.
- **b-Blende (Video → News):** Der mittige Kreis-Füller entfällt. Die b-Maske wächst
  jetzt UND verschiebt sich beim Zoomen nach oben (`mask-position-Y 50% → 118%`), der
  horizontale Binnenspalt wandert aus dem Viewport — Logo-Proportionen unverändert.
- **Kernkompetenzen als „Spektrum"-Flip-Cards:** Statt 6× Magenta jetzt je Karte eine
  Spektrum-Farbe (Indigo → Amber) als Verlauf + Glow, warmweiße Typo — auf Off-White-
  Bühne (kein schwarzer Grund).
- **Hero-Start:** Typo zunächst ausgeblendet, das Video blendet ruhig ein und läuft an,
  danach kommt die Typo herein.
- **CompaniesScroller-Fix:** Der Hintergrund-Ticker fällt nicht mehr auf Off-White
  zurück (Magenta-Layer „verschwand", solange die Bild-Farbanalyse lief) → Fallback ist
  jetzt Magenta.
- **Zentrales Hero-Video (`hero.mp4`):** entrauscht, auf 1440p Lanczos-hochskaliert,
  dezent geschärft — sichtbar sauberer im Fullscreen.

**About**
- **„Local Everywhere" (WorldNetwork):** magentafarben mit invertierter Schrift,
  Scroll-Stop (Pin) mit horizontalem Logo-Slide, der zusätzlich manuell zieh-/swipebar
  ist. Reihenfolge: leerer Magenta-Grund schiebt sich über das Statement → dann zieht
  der Content per Parallax herein. Logo-Bahn linksbündig zur Schrift (blutet rechts
  über den Rand). Eyebrow entfernt, Video-Container größer.
- **AboutIntro (international):** statt eigener Blende jetzt „tall" (Standraum) — die
  WorldNetwork-Section steigt selbst mit `-100vh`-Overlap darüber (kein Doppel-Layer).
- **„Partner für Entertainment" (PartnerStack):** schiebt sich wie auf der Home über die
  gepinnte Team-Section (`-100vh`); erst deckt Magenta voll, dann Content per Parallax.
  Stacking-Cards-Bühne auf 300vh (letzte Card wird nicht mehr abgeschnitten).
- **Code-of-Conduct-Section entfernt** (bleibt auf Career).

**Career**
- **Standorte-Box** (Köln u. a.) als eigene, ruhige Magenta-Modulbox zurück (ohne bunte
  Fächer). **BANIJAY TOMORROW** als ruhige Parallax-Feature-Section.
- **Rollen-Intro-Copy** („Viele Companies …") mit Wort-für-Wort-Parallax-Reveal.
- **Jobs-Eyebrow** „Aktuelle Einstiege" entfernt (Doppelung).
- **Hero-Video** gesetzt (magnific, weboptimiert → `career-hero.mp4`).

**News-Seite**
- **122 gescrapte banijay.de-Artikel** ausgewertet → 30 reale Beiträge in `news.ts`
  (Lead/Body aus dem Original-Fließtext), Listenbilder lokal weboptimiert
  (`public/news/scraped/`).
- **5-Spalten-Grid** mit breiten **Querformat-Containern** (16/10), locker gesetzt,
  je Beitrag Datum · Titel · „Zum Beitrag"-CTA, **Parallax-Aufbau** beim Reinscrollen.
- **„Weitere News laden"-Button** (batchweise, ersetzt „Alle News auf banijay.de").

**Übergreifend**
- **PageHero-Umlaute:** `LÄUFT` u. a. werden oben nicht mehr abgeschnitten (paddingTop/
  marginTop-Trick an der Clip-Reveal-Zeile).
- **Companies-Karten:** Skill-Marker vom Quadrat auf kleinen **Stern-Glyph** ✦ (Optik
  wie der ↗-CTA-Pfeil).

### About-Feinschliff: News/Partner-Stack, CEO-Bild, Video-Statement (03.07., 45. Runde)
- **News- & Partner-Modul — Schiebe-Effekt ohne Schatten:** Die vorher gesetzten
  Karten-Schatten erzeugten eine unnatürliche dunkle Halo-Kante. Jetzt wie im
  Algarve-`blog-home`-Original: **keine Schatten, keine Karten-Rundung** — die opake
  Fläche (= Section-Grund) deckt die untere Ebene ab, getrennt nur durch eine **feine
  dünne Linie**. Der Partner-Bereich (About) bekommt denselben sticky-Stack wie das
  News-Modul (war vorher eine flache Liste ohne Schiebe-Effekt).
- **CEO-/Co-Founder-Section (About) ans Nimbus-`features-11`-Original angepasst:**
  Container 1180 → **1560px**, `items-stretch` statt `items-center`, Portrait-Aspekt
  **5:6** → das **Bild füllt die Spaltenhöhe (deutlich größer)**. Content per
  `space-between` (Accent+Zitat oben, Name+CTA unten). Zitat feiner proportioniert
  (2.4 → 2.08vw, mehr Zeilenhöhe).
- **About-Video-Statement neu getextet:** „Kreative Freiheit braucht ein starkes Dach.
  So entstehen Geschichten, die Millionen erreichen." (`ABOUT.principle.text`).

### Home-Desktop: Statement-Standzeit + News-Schiebe-Stack (03.07., 44. Runde)
- **AboutIntro (3. Section) — Statement bleibt länger stehen:** Der Magenta-Layer der
  Companies-Section schob sich auf Desktop zu schnell über das weiße Statement. Die
  Section ist jetzt auf Desktop **275vh** (statt 230vh) → nach dem Word-Reveal (~60vh)
  bleibt das Statement deutlich länger GEPINNT stehen, bevor die Companies-Fläche
  (`marginTop -100vh`) überlappt. Mobile bleibt via Klassen-Override bei 230vh.
- **News-Modul (letzte Section) — Schiebe-Effekt auch auf Desktop:** Der sticky-Stack
  war nur mobil aktiv; Desktop war eine flache Liste. Jetzt tragen die Tiles auch auf
  Desktop `position: sticky; bottom: 10vw` mit z-Index-Staffelung (erste Kachel vorn,
  jede weitere rastet darunter ein) — opake Magenta-Karten mit oberer Schattenkante,
  wie im Algarve-`blog-home`-Template.

## [2026-07-02] — deployt

### Zahlen-Section, Career-Fächer, Site-QA (02.07., 43. Runde)
- **About Hard-Facts (ProofVideo) — Video wächst aus grauer Kachel:** Der vorab
  sichtbare dunkle Video-Container ist entfernt. Nach dem Scroll-In **layert das
  Video langsam in einer der kleinen grauen Stat-Kacheln ein** (fade-in), zieht sich
  dann nach oben+unten (volle Höhe) und links+rechts (volle Breite) auf — radiale
  Kanten bis zum letzten Beat — danach kommt das Statement Wort für Wort.
- **Career-Fächer mit radialen Kanten:** Die Reveal-Maske war rechteckig → die bunten
  Fächer-Streifen kamen hart abgeschnitten heraus. Jetzt trägt die Clip-Maske **runde
  Unterkanten** (`round 0 0 R R`) → die Fächer gucken inkl. ihrer radialen Kanten heraus.
- **Mobile-QA-Fixes:** Partner-Item-Copy war auf 31vw gequetscht → `max-w-full` mobil;
  About-Bento-Zahl „4 Mrd." brach um → 10.5vw + `nowrap`.

### Career: Fächer-/TOMORROW-Modul nicht mehr abgeschnitten (02.07., 42. Runde)
- **CareerTomorrowStack Scale-to-Fit:** Der aufgefächerte Stapel (Magenta-Standorte +
  Farbfächer + schwarze TOMORROW-Karte) war in vw bemessen, die gepinnte Bühne aber in
  vh → je nach Fensterhöhe wurde oben/unten abgeschnitten. Jetzt wird die natürliche
  Stapelhöhe gemessen und **proportional auf die Viewport-Höhe skaliert** (Resize-/
  Font-Load-fest); zusätzlich moderate Höhenreduktion (Bild, Fächer, Paddings), damit
  der Fit-Scale nah an 1 bleibt (Karte breit).

### About-Feinschliff: Statement, Highlights, CEO, Partner, Team (02.07., 41. Runde)
- **PageHero Magenta-Highlights:** Neues `highlights`-Prop hebt relevante Wörter im
  Body-Statement magenta hervor (Wortkern-Match). Companies: Shows, Reality, Fiction,
  Comedy, Digital, Live-Erlebnisse. About: Companies, Marken, Teams, Dach.
- **About-Statement umformuliert:** weg vom angreifbaren „ein/das führende Entertainment-
  Netzwerk" → „Eigenständige Companies, bekannte Marken und kreative Teams — gebündelt
  unter einem starken Dach, mit weitreichender Präsenz im deutschen Entertainment."
- **CEO-Section → combo-4-Optik:** kontaindiertes 2-Spalten-Grid (Portrait links mit
  Overlay-Reveal, rechts Accent · Zitat · Name · CTA), großzügig gesetzt — das Zitat
  läuft nicht mehr aus dem dunklen Kasten.
- **Partner-Modul = Home-News-Optik:** keine Eyebrow, keine Nummern, full-width statt
  zentriert; Headline → Copy → CTA, rechts die Tile-Liste — identisch zum News-Bereich.
- **ProofVideo Hard-Facts:** linksbündiger Aufbau; das Video-Modul (46vw) skaliert
  gestuft (oben → rechts → full) statt „hart links raus".
- **Team-Fokuspunkte + Größe:** per-Bild `object-position` (Gesichter nie abgeschnitten);
  „Team" von 9vw → 7.22vw (= h1); Mobile-Grid mit variierenden Feature-Kacheln (volle
  Breite) + gestaffeltem Scale/Fade-Reveal.
- **News-Section Desktop:** Magenta-LogoReveal überlappte die „Latest news"-Headline
  (paddingTop glich den -100vh-Overlap nicht aus) → Headline wird nicht mehr abgeschnitten.
- **Video über Team neu enkodiert:** 355 KB @ 280 kbit → 2,8 MB @ ~2,2 Mbit (1920×1072).

### Home mobil: Hero-Fächer, Companies-Layer, Services-Flip, News-Stack (02.07., 40. Runde)
- **Hero BANIJAY:** statt der ausgeblendeten Slats fährt das volle Wort per **Clip-Wipe
  von oben herein** — ein sauberes „fächert herab", kein Geistern.
- **Portfolio-Grid mobil = altes Scroll-Konzept, schlank:** 2 Bildkacheln oben, großes
  Showreel-Video mittig, 2 unten; beim Scrollen kippen die Kacheln weg und das Video
  wächst auf Vollbild (gepinnt, wie Desktop).
- **AboutIntro → Companies mobil:** `magentaExit` reaktiviert → nach dem Statement steigt
  die Magenta-Blende von unten drüber und übergibt nahtlos an die Companies (Desktop
  unverändert; CompaniesScroller trägt es dort via -100vh).
- **ServicesStack mobil:** Flip-Stack wieder aktiv (bunte Karten kippen weg), Video sauber
  unter der Headline — kein Text-über-Video mehr.
- **News-Modul mobil:** Tiles schieben sich ineinander (sticky-Stack + z-Index-Staffelung).

### Home mobil: Kernkompetenzen, Heading-Umbruch, Testimonials (02.07., 37. Runde)
- **Kernkompetenzen (ServicesStack) mobil:** Cards waren 90vh hoch mit winziger Schrift
  und schmalem, gedrehtem Video. Jetzt ab ≤767px **static, ~halbe Höhe**, das Video als
  **Querformat DIREKT unter der Headline** (order 1→2→3: Titel → Video → Claim/Text),
  Fonts größer (Titel 8.5vw, Claim 6vw, Text 4vw). 3D-Kipp-Animation nur noch ≥768px.
- **AnimatedHeading-Umbruch:** Lange Wörter (HANDSCHRIFTEN) liefen über den Rand — jetzt
  **deutsche Silbentrennung** (`hyphens:auto`, Bindestrich, lang="de") → bricht sauber
  zweizeilig, kein Überlauf.
- **Testimonials mobil überarbeitet:** Layout wie Original (**Bild links / Text rechts**,
  4fr/8fr), Bild als 4:5-Portrait mit **Fokuspunkt aufs Gesicht** (`object-position 50%
  14%`, nicht mehr abgeschnitten), alle 5 Statements, größere Typo. **Facts einspaltig**
  (statt 2-spaltig) mit großen Zahlen (13vw). Section war „unbewegt" → **gestaffelte
  Reveal-Animation** (Zitate + Facts faden beim Scrollen von unten ein).

### Home mobil: Hero, Portfolio-Grid, Statement-Heading (02.07., 36. Runde)
- **Hero-Typo mobil:** Die 3 partiellen BANIJAY-Clip-Zeilen „geisterten" auf Mobile
  über dem vollen Wort → auf Mobile ausgeblendet, es bleibt EIN sauberes „BANIJAY"
  (WE links / ARE rechts / BANIJAY groß). Desktop unverändert (4 Slices).
- **Portfolio-Grid mobil:** Das 5×3-Scaling-Grid war auf Mobile unbrauchbar (Kacheln
  69×263px, viel zu schmal/hoch). Grid-Animation nur noch ≥768px; Mobile bekommt ein
  **statisches 2-Spalten-Portfolio** (Showreel-Video groß oben + 12 Format-Kacheln im
  3:4-Container mit Titel/Company). Section-Höhe 400vh → auto (~215vh).
- **Statement-Heading (AnimatedHeading) mobil:** 7vw (≈26px) → 13vw (≈49px) — deutlich
  plakativer, füllt den Screen (lange Zeilen brechen um). Gilt für beide Instanzen
  auf der Home.

### Companies-Slider mobil = Desktop-Idee + MENU-Gewicht (02.07., 35. Runde)
- **Companies mobil komplett neu — gepinnter Coverflow-Slider:** Die Section rastet
  ein (pin), der vertikale Scroll wird zum **horizontalen Slide** (scrub + card-snap);
  erst wenn alle Karten durch sind, geht es weiter. Die zentrierte **Fokus-Card ist
  groß/gerade, die Nachbarn skaliert + gedreht** (radiale Fächer-Idee wie Desktop).
  Der **Section-Hintergrund blendet in die dominante „gebrannte" Farbe der Fokus-Card**
  (colorsRef jetzt auch mobil berechnet) — genau wie Desktop. Verifiziert: pinned
  (812/812), Card-Scales 0.99→0.72, BG wechselt je Fokus-Card.
- **Card-Text-Padding:** Captions haben jetzt seitliches Padding (7vw) + Zeilenumbruch
  → lange Namen (z. B. „Endemol Shine Polska") kleben nicht mehr an der Kante, sondern
  brechen sauber zweizeilig um.
- **MENU/CLOSE-Gewicht auf 500** — auch Desktop (700 war zu fett). Verifiziert: 500.

### Company-Fokuspunkte, AboutIntro mobil, Nav-Gewicht (02.07., 34. Runde)
- **Company-Card-Fokuspunkte:** Jedes der 7 neuen Poster im echten Hochkant-Card-
  Container geprüft und einen **motivspezifischen `object-position`** gesetzt
  (kein pauschales center) — Gesichter/Körper/Show-Objekte werden nicht mehr
  abgeschnitten: Banijay Productions `50% 34%`, EndemolShine (Jauch rechts) `70% 50%`,
  Brainpool (Pufpaff links) `24% 50%`, MadeFor `50% 34%`, Cape Cross `58% 50%`,
  influence.vision `50% 20%`, Banijay Germany Live `50% 26%`. Gilt für Desktop-Slider
  + Mobile-Slider.
- **Home-Statement (AboutIntro) mobil:** Schrift von 2.5vw (≈9px) → 6.4vw (24px),
  Section-Höhe 220vh → 150vh — nutzt den Screen jetzt statt winziger Text mit viel
  Leerraum. Gilt auch für die About-„International"-Section (gleiches Modul).
- **Nav-Gewicht mobil zurück auf 500** (700 war zu fett).

### Menü-Overlay mobil: Nav-Gewicht + Social über Spotify (02.07., 33. Runde)
- **Nav-Punkte fett wie CLOSE:** Die Nav-Punkte wirkten trotz gleicher Größe dünner
  (weight 500) als der fette CLOSE-Button (700). Jetzt auf Mobile ebenfalls **bold
  (700)** → optisch konsistent mit MENU/CLOSE. Verifiziert: closeWeight == navWeight
  == 700.
- **Social über Spotify:** Instagram/LinkedIn (Folgen) auf Mobile jetzt **über** dem
  Spotify-Widget (order-Swap); beides im unteren Bereich der Navigation. Verifiziert:
  Folgen (top 486) über Spotify (top 580).

### Menü-Overlay mobil: Nav = MENU-Größe, Kontakt raus (02.07., 32. Runde)
- **Mobile-Menü-Typo maximiert:** Nav-Punkte und der MENU/CLOSE-Button jetzt gleich
  groß (12vw ≈ 45px). Verifiziert: „COMPANIES" bleibt einzeilig (255px), Nav-Font ==
  MENU-Font.
- **Kontakt-Redundanz raus (Mobile):** Büro, Kontakt (E-Mail) sowie Impressum/
  Datenschutz im Overlay auf Mobile ausgeblendet (steht alles im Footer) — bleibt nur
  Nav + Spotify + Folgen. Content passt jetzt exakt in einen Screen (812/812).
  Desktop unverändert.

### Neue Company-Poster (lokal) + WE/ARE mobil größer (02.07., 31. Runde)
- **Home-Company-Bildcontainer** neu bestückt: hochauflösende Poster aus der
  Recherche (banijay-company-media-recherche.md) **lokal kopiert, optimiert**
  (1400px lange Kante, JPG, 160–316 KB) und unter `public/company-media/<slug>/
  poster.jpg` abgelegt — **kein Hotlinking**. `getCompanyImage` liefert für die 7
  Companies (Banijay Productions, EndemolShine, Brainpool, MadeFor, Cape Cross,
  influence.vision, Banijay Germany Live) jetzt die neuen Poster; übrige Companies
  bleiben auf den bisherigen Bildern. Verifiziert: neue Pfade in den Cards aktiv,
  Assets laden (200/JPEG).
- **Home-Hero WE/ARE mobil** von 8.8vw → 14vw (≈33px → 52px) vergrößert, nutzt den
  Platz links/rechts neben BANIJAY deutlich besser.

### Menü-Overlay mobil: rechtsbündig, kompakter, Spotify-Widget (02.07., 30. Runde)
- **Mobile-Menü-Overlay** überarbeitet: Nav-Links jetzt **rechtsbündig** (Nav mobil
  full-width, damit `items-end` an den rechten Rand schiebt) und **kleinere Schrift**
  (8.5vw ≈ 32px statt bis 7rem). Das **kompakte Spotify-Widget** (Höhe 152 statt 352)
  eingesetzt; Kontakt-Block (Folgen/Büro/Kontakt) kompakter (kleinere Abstände +
  Text). Verifiziert: alles passt in einen Screen (Content ~826px), Nav rechte Kante
  368/375. Desktop unverändert (Spotify 352, Nav 112px).

### Companies-Slider mobil + Footer-z, News-Mobile, Timing (02.07., 29. Runde)
- **Companies mobil neu:** „UNSERE" oben / „COMPANIES" darunter (gestapelt) + echter
  **horizontaler Scroll-Snap-Slider** (links → rechts, native `overflow-x-auto`),
  Karten 74vw×104vw. Vorher war die Mobile-Companies eine ruhige vertikale Liste,
  die „überhaupt nicht" der gewünschten Slider-Idee entsprach. Verifiziert:
  scrollWidth 5858 > clientWidth 375, 20 Karten.

- **Footer über der Top-Nav:** Am Seitenende verschwand die (redundante) Top-Nav
  hinter dem Footer nicht — jetzt liegt der Footer (z-50) über der geschlossenen Nav
  (z-45). Beim Öffnen springt Menü-Overlay (z-200) + Nav (z-201) wieder komplett
  darüber.
- **Footer mobil neu geordnet:** Nav-Links ganz oben, rechtsbündig; darunter
  linksbündig Kontakt + Folgen (order-Swap). BANIJAY-Marquee mobil ~50 % größer
  (22vw → 33vw).
- **News-Section mobil** an das Algarve-Template angeglichen: größere Schriften
  (Headline 9.6vw, Titel 5vw, Label 2.8vw, „Mehr erfahren" 3.4vw) und deutlich höhere
  Bildcontainer (15vw → 56vw statt zu flach).
- **Team→Video mehr Abstand:** Team-Namen faden jetzt in der ersten Pin-Hälfte ein +
  Halte-Beat (Pin +160 % → +200 %); LogoReveal-Overlap -100vh → -70vh. Verifiziert:
  Namen voll sichtbar (opacity 1) BEVOR das Video die Team-Section deckt.
- **News schneller:** News-Section überlappt jetzt die LogoReveal-Endphase (marginTop
  -100vh, z-1 dahinter) → sobald der Screen voll Magenta ist, kommt der News-Content
  nahtlos hoch (verifiziert: Headline bei voller Magenta-Fülle bereits im Bild).

### Home Team→Video→News: Overlay wie die Magenta-Fläche (02.07., 28. Runde)
- **LogoReveal (Team→Video→News) neu getaktet:** Vorher schob sich das Video per
  Transform in der eigenen Sektion hoch (marginTop nur -18vh) → kein sichtbarer
  Overlay über die Team-Section. Jetzt **gleiche Logik wie die Magenta-Fläche über
  dem Statement**: Section mit `marginTop -100vh` + `z-2` steigt als volle Video-
  Fläche über den (gepinnt fertig aufgebauten) Team-Grid **von unten nach oben** auf
  (getragen vom Section-Scroll) und **rastet oben ein**. ERST DANN erscheint aus der
  MITTE ein kleines „b" (opacity 0→1) und wächst über mask-size (152→8442px) zur
  vollen Magenta-Blende → News. Verifiziert: videoTop 152→0 (Rise→Lock), b ab p=0.15,
  Center voll Magenta am Ende. Mobile: ruhige 100vh-Video-Section ohne Overlap/b-Blende
  (GSAP nur ≥768px).

### Home Statement→Companies: eine Magenta-Ebene statt zwei (02.07., 27. Runde)
- **Fix „zwei pinke Ebenen":** Es liefen zwei Magenta-Flächen übereinander — die
  AboutIntro-Blende (radiale Ecke, z-auto) UND die aufsteigende CompaniesScroller-
  Fläche (flach, z-2) — leicht versetzt → doppelte Kante. Jetzt trägt **nur die
  CompaniesScroller-Fläche** den Übergang: `magentaExit` der Home-AboutIntro entfernt;
  die Companies-Section steigt als **einzige** Magenta-Ebene mit radial gekurvter
  Oberkante (rechts stärker, b-Andeutung) auf und faltet sich beim Aufsteigen auf.
- **Companies-Typo schneller:** „Unsere Companies" fadet jetzt kurz nach dem Andocken
  ein (Timeline-Position 0.5 → 0.15) statt mit spürbarem Versatz. Verifiziert: nur
  eine Magenta-Fläche, radTR 194→0 beim Aufsteigen, Wörter-Opacity ab ~140px, Nav
  invertiert (MENU schwarz).

### Career-Fächer: gestapelte Streifen zurück, gepinnt gestaffelt (02.07., 26. Runde)
- **`CareerTomorrowStack` final:** Full-Viewport-Sweeps (Runde 23) verwarfen den
  „Fächer"-Look — zurück zum **gestapelten Karten-Layout** (Magenta-Karte + dünne
  Farbstreifen + content-große schwarze Karte), aber jetzt **gepinnt** und dadurch
  sichtbar gestaffelt: die Streifen layern leicht verzögert nacheinander **nach
  unten** auf (Orange → Gelb → Grün, clip-Wipe), als **letzter Fächer kommt die
  schwarze Karte** heraus, **erst danach** fadet der Content ein. Größen kompaktiert,
  damit das Stack in die Pin-Bühne passt (Stack ~1060px). Verifiziert über den
  Scrollverlauf: Streifen wischen einzeln (88→0 %), Schwarz bei ~78 %, Content 0→0.99.
  Mobile (375px) gegengecheckt: statische gestapelte Variante sauber; Home
  Statement→Companies mobil ebenfalls ok (Magenta voll, MENU invertiert schwarz).

### Menü-Overlay schließen: Nav-Farbe synchronisiert (02.07., 25. Runde)
- **Fix „MENU verschwindet kurz beim Schließen":** Beim Schließen sprang die Nav-Farbe
  sofort auf Magenta, während das (magentafarbene) Overlay noch 500 ms nach oben
  einfuhr → rote Schrift auf rotem Grund, kurz unsichtbar. Neuer State
  `overlayPresent` bleibt über die Schließ-Transition (520 ms) true; Logo + MENU +
  Docked-Label bleiben **schwarz, bis das Overlay den oberen Rand freigegeben hat**,
  und invertieren erst danach zurück. Verifiziert (Inline-Style): offen → schwarz,
  schließen@180ms → weiterhin schwarz, nach 880ms → magenta.

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
