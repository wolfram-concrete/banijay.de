# banijay.de — Website Relaunch

Cinematischer Website-Relaunch für **Banijay Germany**. Die Umsetzung adaptiert die
Sektions-Choreografie des Algarve-Webflow-Templates (kinetischer Hero, gepinnte
Scroll-Bühnen, Logo-Reveal, clip-path-Reveal-Übergänge) und füllt sie mit den echten
Inhalten der Banijay-Welt — Companies, Formate, Kompetenzfelder, Team und News.

Alle gepinnten Scroll-Choreografien sind **je Viewport eigens getaktet** (matchMedia-
Branches je Sektion, Desktop UND Mobile): Magenta-Reveals steigen erst über fertig
aufgebaute Statements, Content-Panels werden gepinnt (feste Setz-Distanz, damit sie
auch full-size einrasten, wenn nichts überhängt), Headlines scrollen nicht hinter die
Sticky-Nav, Bildcontainer nutzen native Seitenverhältnisse und Fokuspunkte. Das
News-Grid ist ein CSS-Grid-Masonry mit nativen Thumbnail-Proportionen + Feature-Karten
(2 Spalten) und berechneten Row-Spans. Scroll-getriebene Zähler laufen über
ScrollTrigger (nicht IntersectionObserver), damit sie exakt beim Sichtbarwerden starten.
Alle Subpages (About/Companies/Career/News/Contact) teilen sich denselben **Home-Hero**
(`AlgarveHome`): die „We Are Banijay"-Frame-Sequenz + auffächernde Satellitenringe auf
dunklem Sternenstaub, darunter das seiteneigene Statement mittelachsig. Frame 3 ist je
Seite passend (`/hero-v2/frame-3-<page>.jpg`, z. B. „ABOUT"/„CAREER"). Ein globaler
`MoodBackdrop` mit ambient Sternenstaub liegt fix hinter allen Seiten.

**Redesign V2 (Branch `redesign-v2`):** die Site ist auf einen durchgehenden dark/moody
Look umgestellt — ein globaler `MoodBackdrop` (Schwarz/Brombeere/Magenta mit wandernden
Glows), transparente Sections, Milchglas-Panels und eckige Container (Design-Vorgabe: keine
abgerundeten Ecken außer minimalen Curvings an CTAs). Die Home öffnet mit einer
Intro-Animation (Staub sammelt sich zur B-Form → „Welcome to a new Era" → Staub-Explosion als
Blende auf den Hero) und einem zweilagigen Brennglas-Hero: die WebGL-Linse bricht ein Komposit
aus dem roten Glas-B UND der Headline „WE ARE BANIJAY" (Buchstaben sind IN der Linse gebrochen
sichtbar), unterhalb steht die Schrift auf Sternenstaub. Beim Scrollen formt sich die radiale
Unterkante, weiße Satelliten-Ringe fächern als konzentrische Schar sequenziell heraus (mit
perfekt runden weißen Planeten, die ihre Bahn ablaufen) und ein Magenta-Übergang, der ihrer
Biegung folgt, leitet in die Statement-Section über. Das B oben rechts schaltet auf allen
Magenta-Flächen auf Schwarz. An der Headline „Ein Dach. Viele Handschriften." beschleunigt der
Sternenstaub in einen Hyperspace-**Warp-Blende** und leitet in die Team-Section über; ein
subtiles Back-to-Top-Widget erscheint nach einigen Sektionen unten rechts. Companies liegen in `companiesDirectory.ts` (40 Einträge inkl.
All3Media-Fusion) und öffnen als Scroll-Flip-Lightbox. Das „Banijay Ökosystem" erscheint als
gepinnte Atom-Orbit-Grafik.

Die Editorial-Section der Home trägt ein CEO-Porträt im großen Sticky-Bildcontainer, „Die Story"
auf hellem Paper-Feld, eine gepinnte Fakten-Accordion-Spalte (Kennzahlen zählen beim Scroll-in hoch,
inkl. „90 % Primetime-Hitrate") und einen **IP-Brands-Doppelslider** (zwei gegenläufige Reihen der
ikonischen Formate in Original-Proportion, weboptimiert aus `/public/ip-brands`). In allen Fact-Boxen
sitzt das Einheiten-„+" grundlinienbündig an der Ziffer (Wrapper mit eigener `font-size` +
Glyph-Offset), genau wie `%`/`Mrd.`/`hrs.`. Team-Headlines
bauen sich global wortweise aus einer Maske auf; das Team-Grid ist auf sehr breiten Screens
auf `max 1680px` gedeckelt und zentriert, damit die Porträt-Kacheln nicht bis an die Ränder
laufen und weniger vom Gesicht beschnitten wird. Die About-Facts stehen auf großen Screens
zweispaltig (Copy links, Fakten-Block rechts), das Ökosystem-Verzeichnis in **4 Spalten**
(CSS-columns). Die Home-News-Section stapelt ihre Beiträge als Sticky-Cards, getrennt durch schwarze
Hairlines zwischen den Einträgen. Die News-Page überblendet ihr Statement per Parallax-Exit in den Feed, und die
Career-Code-of-Conduct-Section liegt auf einer Magenta-Box, über deren Ränder driftende
Film-Snippets ragen. Der vollständige Verlauf steht in `CHANGELOG.md`.

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
  app/(frontend)/        Seiten: Home, About, Career, News, Contact
                         (Companies-Seite entfernt, 16.07. — das Companies-Bento
                         lebt auf der Home)
  components/
    cinematic/           AlgarveHome (Hero, global auf allen Seiten mit eigenem
                         frame3 + Statement), IntroOverlay (Preloader: läuft bei
                         JEDEM Home-Aufruf, auch bei Client-Navigation zurück —
                         16.07.; nur prefers-reduced-motion überspringt)
    cinematic/algarve/   Home: CompaniesBento, EcosystemSection, Editorial,
                         EditorialStickyScene (Facts), Founders/Team (Prop
                         holdForOverlay: Halte-Beat nur, wenn eine Folge-Section
                         mit -100vh darüberzieht), LogoReveal, NewsStack
                         About:  ProofVideo (Zahlen mittelachsig, gleich große
                         Ziffern; das Video blüht aus der MITTLEREN Kachel auf),
                         Testimonials (Zitat-Fächer der Geschäftsführer:innen,
                         Daten 1:1 von banijay.de), WorldNetwork („Local
                         Everywhere", magenta Scroll-Stop + Logo-Ticker),
                         EcosystemDirectory
                         Career: CareerRoleScroller (Swipe-Bühne: Wörter
                         auseinander → Karten aus der Mitte → Swipe, Grund färbt
                         mit), CareerJobsPreview, CareerLocations,
                         CareerTomorrowStack, CodeOfConductBand („WE ARE BANIJAY"
                         → Statement), CareerSocialFeed/-Slider (Caption via
                         showText: Career an, Home aus)
                         News:   NewsSections (Rubrik-Blöcke Presse · Podcast ·
                         Primetime-Hitrate · Marcus Wolter · Social; je Block
                         Headline + Linie + nativer Slider, rechts im Anschnitt)
                         Global: LogoTicker (weiße Company-Wortmarken, Endlos-
                         Banderole — About-World + unter den Career-Standorten),
                         MoodBackdrop, AboutDrift, ContactForm, PageHero
                         Farbwelt: „Video Color Coding" (Night + Neon: Magenta
                         bleibt Main, dazu Blau/Cyan/Violett/Aubergine/Coral,
                         kein Gelb/Grün) — Tokens --bj-video-* in globals.css.
    layout/              SiteHeader (Seitentitel mittelachsig unter dem Logo),
                         SiteFooter (Mail/Tel/Presse)
  data/                  CMS-fähige Datenschicht (companiesDirectory, companyCards,
                         about, career, home, leadership, feed …);
                         news.ts = 30 reale banijay.de-Meldungen (aus scraped_content
                         ausgewertet, Listenbilder lokal in public/news/scraped/)
public/
  brand/                 Logo-/Marken-Assets (banijay-sign.svg …)
  company-logos/         Weiße Company-Wortmarken (speisen den LogoTicker)
  company-media/<slug>/  Hochauflösende, lokal optimierte Company-Poster (poster.jpg,
                         1400px, siehe banijay-company-media-recherche.md)
  people/quotes/         Fotos der Zitat-Geschäftsführer:innen (von banijay.de,
                         transparente Ränder getrimmt + auf Panel-Farbe gelegt)
  video/  companies/  people/  grid/   Bild- und Videomaterial
```

## Design-System

| Token        | Wert       | Verwendung                          |
|--------------|------------|-------------------------------------|
| Paper        | `#f8f7f3`  | heller Grund (= Body-Grund)         |
| Ink          | `#0e0d0b`  | Schrift/dunkler Grund               |
| Magenta      | `#ff4370`  | Einheitlicher Akzent: CTA, MENU, Flow-/Reveal-Flächen (= `banijay-sign.svg`) |

Der frühere separate Coral-Ton (`#fb4b68`) wurde auf das einheitliche Magenta
`#ff4370` zusammengeführt. Die Career-Fächer-Kaskade nutzt zusätzlich Orange
`#ff7a3d`, Gelb `#ffd23f` und Grün `#8fd94e` als Zwischen-Layer.

## ⚠️ Vor dem Livegang (Quality-Upgrade)

Der aktuelle Stand ist auf **Abstimmung/Freigabe** ausgelegt, nicht auf Produktion.
Vor dem Livegang abzuarbeiten:

| Thema | Stand | Zu tun |
|---|---|---|
| **Company-Videos neu enkodieren** | 3,8–6 MB je Clip | Auf ~1–1,5 MB bringen (Niveau der `reel-*.mp4`) |
| **Social-Feed-Zugänge** | Juicer-JSON, öffentlich | Meta-/Instagram-Tokens + offizielle LinkedIn-API klären |
| **Leadership-/People-Bilder** | Platzhalter (9 Dateien, 11 Personen) | Echte Portraits |
| **News-Hero-Statement** | `Lorem ipsum` | Echten Text (siehe `src/app/(frontend)/news/page.tsx`) |
| **Company-URLs im Ökosystem** | 20 von 40 Einträgen unverlinkt | Fehlende Websites nachliefern (siehe unten) |
| **Wording** | Entwurf | Freigabe Heike/Redaktion |

### Unverlinkte Companies im Ökosystem

`src/data/ecosystem.ts` folgt der Regel: **Companies ohne belegten Link bleiben unverlinkt.**
Die URLs stammen ausschließlich aus dem Scrape der bisherigen banijay.de (`scraped_content/`) —
es wird keine Adresse geraten. Im Verzeichnis erkennt man die Betroffenen am fehlenden
Pfeil-Icon.

Betroffen ist die **Hälfte des Verzeichnisses: 20 von 40 Einträgen** (Stand 17.07.):

| Rubrik | Ohne Link |
|---|---|
| Entertainment | filmpool entertainment · South & Browse · Rainer Laux Productions · Lucky Pics · Minestrone TV · Ladykracher · Doc.Banijay · Potatohead Pictures · EndemolShine Poland |
| Audio | Banijay Media Germany · MySpass Audio · SRM Music · Major Minor · BP Music Publishing · Podcast Bande · MySpass |
| Artists | Only Good Party People |
| Distribution & Brand | MySpass · Banijay Media Germany · Magic Connection |
| Tech | Banijay Infrastructure |
| Fiction | filmpool fiction |

(MySpass und Banijay Media Germany stehen in zwei Rubriken — beim Nachtragen der URL
beide Vorkommen ergänzen.)

Aktuelle Liste jederzeit erzeugbar:

```bash
npx tsx -e "import {ECO_CATEGORIES} from './src/data/ecosystem'; \
for (const c of ECO_CATEGORIES) for (const co of c.companies) if (!co.url) console.log(c.label, '—', co.name)"
```

Nachtragen: in `ECO_CATEGORIES` beim jeweiligen Eintrag `url` ergänzen. Wo eine Company
zusätzlich eine Bento-Kachel hat, gehört die URL auch nach `companyCards.ts`
(`externalUrl`) bzw. in den Directory-Eintrag.

### Warum die Company-Videos zu groß sind

`public/company-media/{filmpool-fiction,south-and-browse,good-humor,madefor}.mp4`
liegen bei 3,8–6 MB für 8 s — die älteren `reel-*.mp4` bei ~1 MB. Grund ist die
Toolchain, nicht das Material:

- **ffmpeg ist auf der Maschine nicht installiert.** Das einzige auffindbare Binary
  steckt in einer Fremd-App (CEWE) und ist mit `--enable-libopenh264 --disable-yasm`
  gebaut. Es **dekodiert die Quellen fehlerhaft** und kodiert rosa/grünen Datenmüll
  in die Ausgabe — bei plausibel aussehenden Bitraten. Nicht verwendbar.
- Deshalb läuft die Konvertierung über **`avconvert`** (Apples AVFoundation-Pipeline,
  Systembestandteil, dekodiert sauber). Das kennt aber nur feste Qualitäts-Presets und
  **keine Bitratensteuerung** → die Dateien geraten 3–4× zu groß.

**Fix vor Livegang:** echtes ffmpeg mit `libx264` installieren (`brew install ffmpeg`),
dann je Clip:

```bash
ffmpeg -ss <start> -i <quelle> -t 8 -vf scale=960:-2 -r 25 \
       -c:v libx264 -crf 26 -preset slow -an -movflags +faststart <ziel>.mp4
```

Die Schnittpunkte (`-ss`) stehen kommentiert in `CompaniesBento.tsx` bei der
`REEL`-Zuordnung — sie sind an einem Frame-Kontaktbogen abgelesen (textfreier
Mittelteil, keine Vorspann-/Insert-Szenen) und können 1:1 übernommen werden.

**Gegenprüfen:** Nach dem Enkodieren die Kacheln im Browser ansehen — ein defektes
Video fällt an der Bitrate NICHT auf, nur am Bild.

## Assets & Git

Große Videos und Marken-Rohmaterial sowie `design-source/`, `assets/` und
`scraped_content/` sind **bewusst gitignored** — zu groß für GitHub und nur lokal
als Quellmaterial vorhanden. `.env.local` wird nie committet.

**Wichtig für Deploy/Clone:** Diese in `public/video/` genutzten, gitignorten
Videos müssen separat bereitgestellt werden (weboptimierte Kopien liegen in
`assets/Videos/weboptimiert/`):

| Datei                     | Verwendung                                  |
|---------------------------|---------------------------------------------|
| `hero-bg.mp4`             | Home-Hero (Glas-„b")                        |
| `team-fullscreen.mp4`     | Team-→-News-Übergang (LogoReveal)           |
| `b-glass.mp4`             | About – Statement-Video (ProofVideo)        |
| `grid-loop1–3.mp4`        | 3 Loop-Cutouts in der Home-Grid-Section     |
| `showreel.mp4`, `banijay-teaser.mp4` | Showreel / Teaser (im Repo)      |

Ältere Platzhalter (`hero.mp4`, `hero-cinematic.mp4`, `kompetenz-reel.mp4`,
`preloader.png`, `stage-portrait.png`) ebenfalls gitignored.

**Hero-Poster:** Die `poster`-Bilder der gepinnten Video-Heroes werden aus dem ERSTEN
Videoframe erzeugt (z. B. `public/career/career-hero-poster.jpg` via ffmpeg) — so
blitzt vor dem Autoplay kein abweichendes (Schwarz-Weiß-)Platzhalterbild auf.

Die Leadership-/People-Bilder sind aktuell **Platzhalter**.
