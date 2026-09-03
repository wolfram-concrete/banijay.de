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
Home und Subpages teilen sich dieselbe **Hero-Bühne** (`AlgarveHome`) mit auffächernden
Satellitenringen auf dunklem Sternenstaub und dem seiteneigenen Statement darunter. Nur
die Home spielt die vollständige Drei-Frame-Sequenz „Licht aus“ → „Licht an“ →
„We Are Banijay“. News und Career starten direkt auf dem hellen Grundmotiv und blenden
nur ihr finales Typo-Visual ein; das dunkle erste Frame wird auf diesen Unterseiten nicht
geladen. Frame 3 ist je Seite passend (`/hero-v2/frame-3-<page>.webp`, z. B. „NEWS“ oder
„CAREER“). Alle Hero-Motive liegen als getrennte, weboptimierte Desktop- und Mobile-WebPs
vor. Ein globaler
`MoodBackdrop` mit ambient Sternenstaub liegt fix hinter allen Seiten.

**Redesign V2 (Branch `redesign-v2`):** die Site ist auf einen durchgehenden dark/moody
Look umgestellt — ein globaler `MoodBackdrop` (Schwarz/Brombeere/Magenta mit wandernden
Glows), transparente Sections, Milchglas-Panels und eckige Container (Design-Vorgabe: keine
abgerundeten Ecken außer minimalen Curvings an CTAs). Die Home öffnet mit einer
Intro-Animation (Staub sammelt sich zur B-Form → „Welcome to a new Era" → Staub-Explosion als
Blende auf den Hero; die Partikel behalten dabei durchgehend ihre kleine Punktgröße und
skalieren erst im Warp nativ hoch — kein Aufquellen, kein Größensprung an der Blende)
und einem zweilagigen Brennglas-Hero: die WebGL-Linse bricht ein Komposit
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
inkl. „90 % Primetime-Hitrate") und einen **dreireihigen IP-Brands-Slider** (33 ikonische
Formate, gleichmäßig 11 / 11 / 11 auf gegenläufige Reihen verteilt, in Originalproportion
weboptimiert aus `/public/ip-brands`; mobil ergänzt eine vierte kuratierte Reihe). Seit
05.08. gehören auch „Bad Boyfriends", „Roadtrip Australien – 3 Spitzenköche auf 4 Rädern"
und „Undercover Boss" zum Slider. Das Motiv von „Die Höhle der Löwen" zeigt seit
10.08. das aktuelle Ensemble als vollständig sichtbares, weboptimiertes 16:9-Visual;
ein versionssicherer Dateiname verhindert die Auslieferung der grauen Cache-Fassung.
In allen Fact-Boxen
sitzt das Einheiten-„+" grundlinienbündig an der Ziffer (Wrapper mit eigener `font-size` +
Glyph-Offset), genau wie `%`/`Mrd.`/`hrs.`. Team-Headlines
bauen sich global wortweise aus einer Maske auf; das Team-Grid ist auf sehr breiten Screens
auf `max 1680px` gedeckelt und zentriert, damit die Porträt-Kacheln nicht bis an die Ränder
laufen und weniger vom Gesicht beschnitten wird. Die **Team-Section** ist über ein
Umschalt-Widget (`TeamSwitcher`) in fünf Layout-Varianten erlebbar — **Raster** (gepinntes
Spiral-Grid), **Snap** (13 Personen in Reihen 4 / 5 / 4), **Editorial** (variables Feinraster mit
größeren Leader-Kacheln), **Clean** (helles Corporate-Raster) und **Masonry** (full-bleed
gap-0-Masonry, 3 Large versetzt + 9 Standard); allen vorangestellt die animierte „UNSER TEAM"-
Intro, alle rasten beim Erreichen ein, bevor die LogoReveal-Videoblende aufsteigt. Die About-Facts stehen auf großen Screens
zweispaltig (Copy links, Fakten-Block rechts), das Ökosystem-Verzeichnis in **4 Spalten**
(CSS-columns). Die Home-News-Section stapelt ihre Beiträge als Sticky-Cards, getrennt durch schwarze
Hairlines zwischen den Einträgen. News-Motive können zusätzlich als breite 40:17-Variante
gekennzeichnet werden; diese Teaser wachsen auf Home, News-Page und im Menü nach rechts und zeigen
das vollständige Motiv ohne Beschnitt. Die News-Page überblendet ihr Statement per Parallax-Exit in den Feed, und die
Career-Code-of-Conduct-Section liegt auf einer Magenta-Box, über deren Ränder driftende
Film-Snippets ragen. Der vollständige Verlauf steht in `CHANGELOG.md`.

**Markenstand 12.08.2026.** Verweise auf die deutsche Organisation werden in der
deutsch- und englischsprachigen Website-Copy als „Banijay Germany“ geführt (unter anderem
„About Banijay Germany“ und „Banijay Germany Ecosystem“). Offizielle Unternehmens- und
Produktnamen bleiben unverändert. Die Social-Section der Home verwendet den offiziellen
Marken-Hashtag `#WeAreBanijay`; die zugrunde liegenden Beiträge stammen weiterhin vom
Instagram-Konto `@banijaygermany`. Der globale Markenclaim in der Career-Code-of-Conduct-
Section bleibt davon ausgenommen und lautet weiterhin „WE ARE BANIJAY“.

**Mobile ist kein verkleinertes Desktop.** Drei Sektionen haben auf schmalen Viewports einen
eigenen Aufbau (per Breakpoint gegated, Desktop bleibt unberührt): Das **Ökosystem** zeigt statt
der gepinnten Orbit-Grafik mit Chips ein symmetrisches Atom (gleich lange Bahnen, Tilts
gleichmäßig rundum) und darunter die Rubriken als Akkordeonliste — ohne Pin, mit einmaligem
Reveal und gescrubbtem Parallax-Drift. Die **About-Banijay-(Marcus-)Section** stellt das
Porträt hochformatig sticky unter die Nav, zoomt es beim Scrollen zusammen und gibt darunter
die kompakten, farbkodierten Fakten-Akkordeons frei (Magenta/transparent wie auf Desktop);
die „Banijay Story" steht dort ohne Parallax, damit sie vollständig im Screen liegt. Im
**Companies-Bento** ersetzt eine eigene Zwischenheadline „40+ / Companies & / Labels" (gescrubbte
Konvergenz + Staub, wie „About Banijay") die Desktop-Swap-Phase, und der Kategoriefilter läuft
als zweizeilige, unterstrichene Textlinks statt als Chip-Buttons. Das Bento ist auch mobil **divers
proportioniert** (eigenes `grid-auto-rows` + Dense-Flow mit breiten `col-span-2`- und hohen
`row-span-2`-Kacheln; native Hochformat-Reels laufen hoch) statt uniformer Kacheln. Im **Team-Grid**
stehen die vier Board-Mitglieder mobil je in einer **vollbreiten Zeile** (über beide Spalten, Container
+40 % Höhe), darunter läuft das Team zweispaltig weiter; Desktop zeigt die Leader-Reihe über die
volle Breite.
Während des **Preloaders** ist Scrollen hart gesperrt (Lenis startet gestoppt, zusätzlich
`wheel`/`touchmove`/Scroll-Tasten abgefangen) — man landet immer im Hero.

**Mobile-Performance.** Der Mobile-PageSpeed wird schrittweise optimiert (Ausgangswert ~30).
Wichtigste Hebel, alle nur mobil gegated (Desktop unberührt): Preloader auf ~3,5 s gestrafft,
Hero-Frames mobil auf 1400px (die 12-MP-WebP dekodierten zu ~48 MB Bitmap je Bild → Lighthouse
lief in OOM), Canvas-Partikel reduziert (DustLayer/PreloaderParticles laufen dauerhaft im RAF)
und Company-Videos auf `preload="none"` (sie laden per IntersectionObserver erst beim
Reinscrollen). Die Video-Karten zeigen währenddessen aktuelle, direkt aus den zugeordneten
Reels exportierte Poster. Gleichzeitig laufen maximal drei Videos auf Desktop, zwei auf Mobile
und bei langsamer Verbindung bzw. Datensparmodus nur eines. Cape Cross Entertainment und
Cape Cross Postproduction nutzen denselben Imagefilm, aber zwei getrennte, jeweils 5,6 Sekunden
lange Sequenzen: Entertainment zeigt die Arena ab 29,6 s, Postproduction die spätere
Backstage- und Kameratechnik-Passage ab 40,0 s. Details im Changelog.

Dynamic Ally Pictures besitzt seit 01.09. ein eigenes, achtsekündiges Company-Reel:
Die zentrale Logo-/Gradient-Animation wurde aus der originalen SVG-Maske und den
CSS-Keyframes der offiziellen Website deterministisch mit 60 fps gerendert. Der Clip
ist 960 × 540 px groß, stumm und nahtlos geloopt; Website-Logo und Navigation wurden
nicht übernommen. Das zugehörige Ladeposter liegt wie gewohnt unter
`public/company-media/posters/dynamic-ally-pictures.jpg`.

**Redaktioneller Stand 04.08.2026.** Die aktuelle Pressemitteilung zur neuen
Führungsmannschaft nach dem All3Media-Merger ist auf Home und News-Page sowie als deutsche
Volltext- und englische Kurzfassung hinterlegt. Ihr breites Gruppenmotiv wird nativ in 40:17
ausgespielt; der Artikel bietet strukturierte Hervorhebungen, den PicDrop-Link und die
Original-PDF als Download. News-Detailseiten nutzen global eine kompaktere H1, damit lange
Headlines das Hero-Motiv nicht verdecken. In der Team-Section ergänzt Arno Schneppenheim als
CCO die Board-Reihe direkt hinter Michael Laegel.

**Karriere-Stand 10.08.2026.** Alle Karriere-CTAs und Standorte verweisen auf das
gruppenweite Softgarden-Board `https://banijay.softgarden.io/de/vacancies`; die entfernte
interne Route `/offene-stellen/` wird nicht mehr verwendet. Die Jobvorschau aggregiert die
öffentlichen Softgarden-Frontend-APIs von Banijay Germany / Banijay Germany Live, BRAINPOOL
TV, EndemolShine, Banijay Media und Banijay Productions serverseitig. Die Career-Routen werden
alle 15 Minuten neu validiert; neue Stellen erscheinen automatisch und deaktivierte Anzeigen
verschwinden ohne Deployment. Der Arbeitszeit-Katalog wird für Deutsch und Englisch direkt
von Softgarden geladen. Statische Standortzahlen bleiben entfernt. Fällt ein einzelner
Mandant aus, werden die übrigen Ergebnisse weiter ausgespielt; nur bei einem vollständigen
API-Ausfall greift eine lokale Notfallliste.

Die Client-IDs der Frontend API v3 sind laut Softgarden öffentlich und benötigen kein Secret.
Sie sind serverseitig hinterlegt und können bei einer Rotation optional über
`SOFTGARDEN_BANIJAY_GERMANY_CLIENT_ID`, `SOFTGARDEN_BRAINPOOL_CLIENT_ID`,
`SOFTGARDEN_ENDEMOLSHINE_CLIENT_ID`, `SOFTGARDEN_BANIJAY_MEDIA_CLIENT_ID` und
`SOFTGARDEN_BANIJAY_PRODUCTIONS_CLIENT_ID` überschrieben werden.

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
npm test        # Vitest-Unit-Tests
npm run typecheck # TypeScript-Prüfung
```

> **Vor jedem Push auf `main` (= Vercel-Production) einmal `npm run build` fahren.**
> `next dev` type-checkt NICHT streng, `next build` schon — ungültiger TS-Code (z. B. eine
> nicht existierende Library-Option) läuft lokal im Dev-Server, lässt aber den Vercel-Build
> abbrechen. Ein grüner Dev-Server ist KEINE Garantie für einen grünen Deploy (siehe
> Changelog 24.07.).

### Rechtliche und technische Angaben

Impressum und Datenschutzerklärung werden auf Deutsch und Englisch parallel gepflegt. Der aktuelle
Stand beschreibt das Hosting über Vercel, den eingebetteten Spotify-Podcast-Player, die eigenen
HTML5-Videos, die serverseitig abgerufenen Social-Media-Inhalte sowie Softgarden. Google Maps und
Analyse- oder Marketing-Cookies werden derzeit nicht eingesetzt.

Das Karriereformular auf `/career` und `/en/career` ist an den serverseitigen SMTP-Endpunkt
`POST /api/career-contact` angebunden. Die allgemeinen Kontaktseiten bleiben unverändert und
verweisen direkt auf `hello@banijay.de`. Der Endpunkt speichert keine Einsendungen bei Vercel,
versendet keine Autoantwort und akzeptiert keine Anhänge. Schnittstellenvertrag, WAF-Rollout,
Betrieb und Datenschutz-Checkliste sind in der SMTP-Dokumentation beschrieben.

### Vertragliche Supplier-Code-URLs

Die in bestehenden Lieferantenverträgen verwendeten Adressen
`/supplier_code_of_conduct_DE` und `/supplier_code_of_conduct_EN` sind dauerhafte,
extensionlose Dokumenten-URLs. Next.js schreibt sie intern auf die unveränderten
deutschen beziehungsweise englischen PDFs unter `public/downloads/` um und zeigt
die Dateien direkt im Browser an; eine gestaltete Zwischenseite gibt es bewusst
nicht. Beide Vertrags-URLs und ihre direkten PDF-Ziele bleiben auch im
Wartungsmodus erreichbar.

Beim Austausch eines Dokuments müssen Datei und zugehöriger SHA-256-Wert in
`src/lib/supplier-code-documents.ts` gemeinsam aktualisiert werden. Der Test schützt
damit sowohl die exakten Vertragsadressen als auch die freigegebenen PDF-Dateien
gegen unbeabsichtigte Änderungen.

### SEO, KI-Suche und Fehlerseiten

Die kanonische Produktionsdomain ist `https://www.banijay.de`. Next.js erzeugt eine
zweisprachige Sitemap und differenzierte Crawler-Regeln; Website-, Organisations- und
News-Daten werden als JSON-LD ausgegeben. Unbekannte deutsche und englische URLs liefern
eine gebrandete 404 mit echtem Fehlerstatus und `noindex`. Pflege, Verifikation und die
Owner-Schritte für Google Search Console und Bing stehen in der
[SEO-/AEO-/GEO-Dokumentation](docs/seo-aeo-geo.md).

### Company-Video-Poster aktualisieren

Die Poster unter `public/company-media/posters/` stammen immer aus Sekunde 1 der
gleichnamigen MP4-Datei. Nach einem Videoaustausch die Poster neu erzeugen, damit
Pufferbild und Reel nicht auseinanderlaufen:

```bash
mkdir -p public/company-media/posters
for video in public/company-media/*.mp4; do
  name="$(basename "${video%.mp4}")"
  ffmpeg -hide_banner -loglevel error -ss 1 -i "$video" -frames:v 1 \
    -vf "scale='min(960,iw)':-2" -q:v 3 -y \
    "public/company-media/posters/$name.jpg"
done
```

## Dokumentation

- [Dokumentationsübersicht](docs/README.md)
- [SEO-, AEO- und GEO-Betrieb](docs/seo-aeo-geo.md)
- [Wartungsmodus: Architektur und Betrieb](docs/maintenance-mode.md)
- [Karriereformular: SMTP-Anbindung](docs/contact-form-smtp.md)
- [Changelog](CHANGELOG.md)

## Projektstruktur

```
src/
  app/(frontend)/        Seiten: Home, Career, News, Contact
                         (Companies-Seite entfernt, 16.07. — das Companies-Bento
                         lebt auf der Home. About-Seite archiviert, 21.07. —
                         `about/page.tsx.archived`, Route liefert 404; die
                         Editorial-/Facts-Inhalte leben auf der Home)
  components/
    cinematic/           AlgarveHome (Hero, global auf allen Seiten mit eigenem
                         frame3 + Statement), IntroOverlay (Preloader: läuft bei
                         JEDEM Home-Aufruf, auch bei Client-Navigation zurück —
                         16.07.; nur prefers-reduced-motion überspringt)
    cinematic/algarve/   Home: CompaniesBento, EcosystemSection, Editorial,
                         EditorialStickyScene (Facts), Founders/Team (Prop
                         holdForOverlay: Halte-Beat nur, wenn eine Folge-Section
                         mit -100vh darüberzieht), LogoReveal, NewsStack
                         About (archiviert 21.07., Komponenten bleiben im Repo):
                         ProofVideo (Zahlen mittelachsig, gleich große
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
                         showText: Career an, Home aus). Datenquelle: Home =
                         Instagram (Elfsight), Career/News = LinkedIn (Juicer) +
                         Instagram (Elfsight) gemischt, dublettenbereinigt
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
                         news.ts = 31 reale banijay.de-Meldungen (aus scraped_content
                         ausgewertet bzw. redaktionell geliefert; Listenbilder lokal in
                         public/news/, strukturierte Body-Blöcke + optionale PDF-Downloads)
public/
  brand/                 Logo-/Marken-Assets (banijay-sign.svg …)
  company-logos/         Weiße Company-Wortmarken (speisen den LogoTicker — der läuft auf
                         der Career-Seite UND auf der Home unter der Social-Section)
  company-media/         Lokal komponierte Company-Reels (`*.mp4`) sowie
                         `posters/*.jpg`: aktuelle Frames aus Sekunde 1 des jeweils
                         gleichnamigen Reels. Die Bento-Karten leiten ihren Posterpfad
                         automatisch vom Video ab. Beispiele: sr-management.mp4 =
                         Hochformat-Zusammenschnitt der vier Topstars; myshow.mp4 =
                         Website-Screencast, weiße Nav-Leiste weggecroppt;
                         cape-cross.mp4 und cape-cross-postproduction.mp4 = zwei
                         unterschiedliche Sequenzen desselben Cape-Cross-Imagefilms.
  ip-brands/             33 weboptimierte Iconic-IP-Motive ohne Beschnitt in drei
                         Desktop-Reihen (Assets überwiegend 560 px hoch, eine
                         Bestandsausnahme mit 501 px); mobil auf 135 px sichtbarer
                         Reihenhöhe plus vierter kuratierter Reihe.
  people/quotes/         Fotos der Zitat-Geschäftsführer:innen (von banijay.de,
                         transparente Ränder getrimmt + auf Panel-Farbe gelegt)
  downloads/             Downloadbare Originaldokumente der News-Beiträge (PDF)
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
| **Company-Videos neu enkodieren** | 22 Altclips aus der VLC-Ära, 67 MB, SSIM ~0,73 | Mit ffmpeg neu rechnen (CRF 28/30) — siehe „Video-Toolchain" |
| **Company-Material vollständig** | 23 von 35 Kacheln haben eigenes Video/Foto | Restliche 12 nachliefern — die tragen sichtbar einen **Magenta-Arbeitsmarker**, der vor Livegang raus muss |
| **Video-Ladeverhalten** | `preload="none"`, `src` erst im Viewport, alle 34 Video-Karten mit aktuellem Reel-Frame; maximal 3 parallel (Mobile 2, langsame Verbindung 1) | Auf realen Geräten weiter messen; große Hero-/Reel-Dateien bei Bedarf auf Video-CDN bzw. Adaptive Streaming umstellen |
| **Social-Feed-Zugänge** | LinkedIn via Juicer-JSON + Instagram via Elfsight-Data-Service (beide undokumentiert/inoffiziell) | Vor Livegang gegen offizielle **Meta-/Instagram-Graph-API** + LinkedIn-API absichern; Elfsight-Endpoints können sich ändern |
| **Softgarden-Jobimport** | Fünf Frontend-API-v3-Mandanten serverseitig aggregiert; automatische Aktualisierung alle 15 Minuten, lokalisierter Arbeitszeit-Katalog und Notfall-Fallback | Bei weiteren Banijay-Gesellschaften zusätzliche öffentliche Client-ID ergänzen; bestehende IDs bei Rotation über die dokumentierten Umgebungsvariablen austauschen |
| **Leadership-/People-Bilder** | 13 von 13 echt; Arno Schneppenheim seit 04.08. als CCO ergänzt | Kopfgrößen und Fokuspunkte bei künftigen Neuzugängen nach der dokumentierten Beschnitt-Regel angleichen |
| **Team-Reihenfolge** | Mittlere Reihe = Frauen, nach Vornamen einsortiert | Zuordnung gegenprüfen (siehe unten) |
| **Bilder der externen Presse** | og:image der Quellen liegt lokal in `public/news/` | Nutzungsrecht klären (siehe unten) |
| **News-Hero-Statement** | `Lorem ipsum` | Echten Text (siehe `src/app/(frontend)/news/page.tsx`) |
| **Story-Text auf der Home** | `Lorem ipsum` | Echten Text (siehe `Editorial.tsx`) |
| **Fakten-Copy (3 von 7)** | `Text folgt.` steht sichtbar auf der Seite | Texte für 90 %, 170+ und 1.500+ nachliefern (siehe unten) |
| **Company-URLs im Ökosystem** | 12 von 45 Einträgen unverlinkt (Stand 20.07., war 20/40) | Fehlende Websites nachliefern (siehe unten) |
| **Wording** | Entwurf | Freigabe Heike/Redaktion |

### Unverlinkte Companies im Ökosystem

`src/data/ecosystem.ts` folgt der Regel: **Companies ohne belegten Link bleiben unverlinkt.**
Die URLs stammen ausschließlich aus dem Scrape der bisherigen banijay.de (`scraped_content/`) —
es wird keine Adresse geraten. Im Verzeichnis erkennt man die Betroffenen am fehlenden
Pfeil-Icon.

Noch ohne Link: **12 von 45 Einträgen** (Stand 20.07., zuletzt viele URLs nachgetragen):

| Rubrik | Ohne Link |
|---|---|
| Entertainment | Minestrone TV · Ladykracher · Doc.Banijay · Potatohead Pictures (bewusst — hat keine eigene Website) |
| Audio | MySpass Audio · SRM Music · Major Minor · BP Music Publishing · Podcast Bande · MySpass |
| Distribution & Brand | MySpass |
| Tech | Banijay Infrastructure |

(MySpass steht in mehreren Rubriken — beim Nachtragen der URL alle Vorkommen ergänzen.)

Aktuelle Liste jederzeit erzeugbar:

```bash
npx tsx -e "import {ECO_CATEGORIES} from './src/data/ecosystem'; \
for (const c of ECO_CATEGORIES) for (const co of c.companies) if (!co.url) console.log(c.label, '—', co.name)"
```

Nachtragen: in `ECO_CATEGORIES` beim jeweiligen Eintrag `url` ergänzen. Wo eine Company
zusätzlich eine Bento-Kachel hat, gehört die URL auch nach `companyCards.ts`
(`externalUrl`) bzw. in den Directory-Eintrag.

### Fakten-Accordion: fehlende Copy + die Zahlen-Regel

Die Fakten-Section auf der Home (`EditorialStickyScene.tsx`) hat 7 Karten. Für **drei**
liegt noch kein Text vor — dort steht sichtbar **„Text folgt."**:

| Karte | Stand |
|---|---|
| 90 % Primetime-Hitrate | Text fehlt |
| 170+ Companies weltweit | Text fehlt |
| 1.500+ Live-Veranstaltungen jährlich | Text fehlt (in Heikes Lieferung nicht enthalten) |

**Regel für neue Textlieferungen: die Ziffer ist maßgeblich.** Die Copytexte sind ein
älterer Stand als die Fakten. Kommt im Text dieselbe Zahl vor wie in `value`, wird **der
Text angeglichen, nicht die Ziffer** (so geschehen: „rund 3000 Stunden" → „rund 4500").
Bei jeder Lieferung alle Copytexte gegen die Ziffern prüfen. Zahlen im Text, die keine
Kachel-Ziffer sind (z. B. „451 Prime-Time Erstausstrahlungen"), bleiben unberührt.

**Zahlen doppelt gepflegt:** Dieselben Werte stehen in `src/data/site.ts` (`STATS`) für die
About-Fakten. Ändert sich eine Zahl auf der Home, muss sie dort mit — sonst nennen die
Seiten unterschiedliche Zahlen. Betrifft aktuell: 40+, 1.400+, 4 Mrd., 4.500 hrs., 170+.

**Höhe ist die knappe Ressource:** Die Spalte ist so hoch wie das Foto, und die
Zifferngröße wird daraus berechnet (`DIGIT` in `EditorialStickyScene.tsx`). Längere Copy
heißt automatisch kleinere Ziffern. Heikes ~500-Zeichen-Texte haben sie von 61 auf 41 px
gedrückt (bei 1440×900). Wer Copy verlängert, sollte das im Blick behalten.

### Externe Presse: Bilder Dritter

`EXTERNAL_PRESS` in `src/data/feed.ts` listet Berichterstattung über Banijay in fremden
Medien. Die Artikel werden **verlinkt, nicht nachgedruckt** (`external: true`, kein
Detail-Text, kein Body) — das ist urheberrechtlich der saubere Weg.

**Die Aufmacherbilder sind es nicht automatisch.** Zu jedem Eintrag liegt das `og:image`
der Quelle weboptimiert in `public/news/` (`mw-*.jpg`, `dwdl-*.jpg`) und wird von
banijay.de ausgeliefert. Das sind Fotos bzw. Bildmontagen der jeweiligen Redaktion
(Handelsblatt, DWDL, brand eins, Deadline, Hamburger Abendblatt). Vor dem Livegang klären,
ob eine Nutzungserlaubnis vorliegt — sonst auf eigene Motive umstellen; das Datenmodell
braucht dafür nur ein anderes `img`.

### Team-Portraits: Beschnitt-Regel

**13 von 13 echt (Stand 04.08.)** — alle Platzhalter sind abgelöst, `lead-1.jpg` läuft
nicht mehr doppelt. Neu hinzugekommen: Arno Schneppenheim als CCO, direkt hinter Michael
Laegel in der Board-Reihe.

**Kopf-Normalisierung (21.07.).** Die mittlere Reihe + Aylin wurden auf **Matthäus als
Referenz** vereinheitlicht: Gesichter höher (mehr Körper unten), Kopf ~33 % der Kachel,
Kinne auf einer Output-Zeile. Gerechnet wird im 900×1200-Output (nicht mehr „X % der
Ausschnitthöhe"): Haaransatz ≈ Zeile 175, Kinn ≈ 508, Kopfhöhe ≈ 333 px. **Simone bleibt
~40 %** — ihr Original ist ein enger Close-up (Kopf füllt die volle Bildbreite), unter ~40 %
geht es physikalisch nicht (bräuchte mehr Bild links/rechts). Reihenfolge-Änderung 21.07.:
**Heike Lutzer vor Natali Naso**.

**Beschnitt-Regel für neue Portraits.** Die Zulieferungen aus der 2026er-Session sind
GANZKÖRPER-Aufnahmen (~3800–4900 px breit, Seitenverhältnis 0,665). Die Team-Kacheln sind
viel kompakter — ohne Beschnitt wäre der Kopf winzig. Vorgehen:

- Je Foto die **Gesichtskoordinaten ablesen** (Kopf oben, Kinn, Gesichtsmitte x) und den
  Ausschnitt rechnen — nicht nach Augenmaß. Die konkreten Zahlen stehen je Person als
  Kommentar in `src/data/leadership.ts`.
- Konstant: 12 % Luft über dem Kopf, Seitenverhältnis **0,75**, Gesicht horizontal
  zentriert, Endformat **900×1200**.
- ⚠️ **Die Kopfgröße hängt an der REIHE, nicht am Team** — die Kacheln sind unterschiedlich:

  | Reihe | Kachel | sichtbar von 0,75 | Kopf im Ausschnitt | `FOCUS` |
  |---|---|---|---|---|
  | Leader (Index 0–3) | 248×182 (1.36) | 55 % der Höhe | **24 %** | `"50% 14%"` |
  | Reihe 2 + 3 | 142×138 (1.03) | 73 % der Höhe | **32 %** | `"50% 18%"` |

  Beide ergeben ~43 % Kopfhöhe in der Kachel — das ist der Zielwert, abgeleitet aus Knut.
  Wer in der Leader-Reihe mit 32 % schneidet, bekommt einen 58 %-Kopf und fällt aus der
  Reihe.

*Randnotiz:* Die Quelldatei des Sebastian-Portraits heißt `Sebastian lege.jpg` — ein
Benennungsfehler, Wolfram hat am 17.07. bestätigt, dass es **Sebastian Menge** ist. Nicht zu
verwechseln mit Sebastian Lege, dem Food-Experten hinter Pausenclown Media
(`companyCards.ts`).

### Team-Reihenfolge: mittlere Reihe

Die Reihenfolge in `src/data/leadership.ts` **ist** das Layout — `Founders.tsx` rendert
stur nach Index (0–3 Board-Reihe, 4–8 Mitte, ab 9 unten). Wolframs Regel: in der
mittleren Reihe stehen die Frauen des Teams.

**Diese Zuordnung ist nicht belegt.** Es gibt kein Geschlechtsfeld in den Daten; einsortiert
wurde nach Vornamen, und es geht mit genau fünf Personen rechnerisch auf die Fünferreihe
auf. (Die Fotos sind seit 21.07. alle echt und passen zu den Namen — sie taugen aber
weiterhin nicht als Beleg für die Reihen-Logik.) Vor dem Livegang mit Banijay gegenprüfen
und in `leadership.ts` korrigieren — das Layout folgt der Reihenfolge automatisch.

### Video-Toolchain: ffmpeg (seit 20.07.)

**`brew install ffmpeg` ist erledigt** (8.1.2, mit libx264/x265/SVT-AV1). Damit ist die
gesamte Vorgeschichte aus CEWE-ffmpeg, `avconvert` und VLC hinfällig. Standardbefehl für
einen Kachel-Clip:

```bash
ffmpeg -y -ss <start> -t 10 -i "<quelle>" -vf "scale=960:-2" \
       -c:v libx264 -crf 28 -preset slow -profile:v high -pix_fmt yuv420p \
       -an -movflags +faststart "public/company-media/<slug>.mp4"
```

#### Warum nicht mehr VLC — gemessen, nicht geschätzt

VLC lief mit **fester** Bitrate (`vb=1600`). Feste Bitrate verteilt Daten gleichmäßig,
egal wie viel im Bild passiert — bei Bühnenlicht, Feuer und Konzertmitschnitten (also
fast allen Clips hier) bricht die Qualität weg. Am Clip *Cape Cross Postproduction*
gegen eine CRF-16-Referenz gemessen (SSIM, 1,0 = identisch):

| Kodierung | Größe | SSIM |
|---|---|---|
| VLC, feste Bitrate 1600 | 2,02 MB | **0,73** |
| ffmpeg CRF 26 | 2,23 MB | 0,974 |
| ffmpeg CRF 28 | 1,77 MB | 0,968 |
| ffmpeg CRF 30 | 1,43 MB | 0,962 |

Also: ffmpeg liefert bei **30 % kleinerer Datei** deutlich besseres Bild. Es gibt hier
keinen Zielkonflikt — die VLC-Dateien sind gleichzeitig zu groß *und* sichtbar
verschlechtert. VLC verschluckt zudem Einzelbilder (263 statt 265 bei cape-cross).

⚠️ **Fallstrick beim Nachmessen:** SSIM vergleicht Bild für Bild. Laufen die Spuren
zeitlich versetzt (unterschiedliche Framezahl, ungenauer `-ss`-Schnitt), misst man Unsinn
— die ersten beiden Messungen dieser Tabelle waren aus genau dem Grund wertlos. Immer den
Versatz durchtesten und den besten Wert nehmen:

```bash
ffmpeg -i <kandidat> -i <referenz> \
  -lavfi "[0:v]trim=start_frame=<n>,setpts=PTS-STARTPTS[a];[1:v]setpts=PTS-STARTPTS[b];[a][b]ssim" \
  -f null -
```

#### Ablauf für einen neuen Clip

1. **Prüfen, ob überhaupt Bild drin ist** — Zulieferungen sind mehrfach defekt gewesen:
   ```bash
   ffmpeg -i "<quelle>" -vf "blackdetect=d=0.3:pix_th=0.10" -an -f null -
   ```
   `CC_Website_1.mp4` (Cape Cross) war mit 97 s deklariert, enthielt aber nur ~3 s
   Logotafel und danach 87 s Schwarzbild — im **Original**, nicht durch den Transcode.
2. **Ausschnitt wählen** über einen Kontaktbogen:
   ```bash
   ffmpeg -i "<quelle>" -vf "select='not(mod(n\,105))',scale=320:-2,tile=4x3" -frames:v 1 sheet.png
   ```
3. Enkodieren (Befehl oben), dann **im Browser gegenprüfen** — ein defektes Video fällt an
   der Dateigröße NICHT auf, nur am Bild.

MXF-Quellen liest ffmpeg direkt; der frühere Proxy-Umweg über VLC entfällt.
⚠️ `timeout` gibt es auf macOS nicht (exit 127) — nicht vorsetzen.

#### Offen: Sammel-Reencode

Die **22 älteren Clips** stammen noch aus der VLC-/avconvert-Ära und stehen zur
Neuberechnung an (67 MB gesamt, Schätzung danach etwa die Hälfte bei besserem Bild).
CRF-Stufe (28 oder 30) ist noch nicht entschieden.

## Assets & Git

Große Videos und Marken-Rohmaterial sowie `design-source/`, `assets/` und
`scraped_content/` sind **bewusst gitignored** — zu groß für GitHub und nur lokal
als Quellmaterial vorhanden. `.env.local` wird nie committet.

**Wichtig für Deploy/Clone:** Weboptimierte Kopien der genutzten Videos liegen in
`assets/Videos/weboptimiert/`. Aktuell in `public/video/` tatsächlich referenziert
(Stand 23.07., alter/ungenutzter Ballast wurde entfernt):

| Datei                     | Verwendung                                  |
|---------------------------|---------------------------------------------|
| `team-all3media.mp4`      | Team-→-News-Übergang (LogoReveal)           |
| `b-glass.mp4`             | About – Statement-Video (ProofVideo)        |
| `grid-loop1–3.mp4`        | 3 Loop-Cutouts in der Home-Grid-Section     |
| `preloader-bg.mp4`        | Intro/Preloader-Hintergrund                 |
| `banijay-brand.mp4`       | Brand-Sequenz                               |
| `showreel.mp4`            | Showreel                                    |
| `company-media/reel-1–6.mp4` | Company-Video-Karten (Auto-Zuordnung)    |

Am 23.07. wurden ~85 MB tote Layout-Reste entfernt (alte `hero-bg.mp4`,
`hero-cinematic.mp4`, `hero-design.mp4`, `kompetenz-reel.mp4`, `team-fullscreen.mp4`,
`banijay-teaser.mp4`, `companies-hero.mp4`, `hero-mobile/reel.mp4`,
`brand/stage-portrait.png`, ungenutzte `grid/`-, `career/`-, `news/`-Bilder u. a.) —
per Netzwerk-Check verifiziert, dass nichts davon geladen wird.

**Hero-Poster:** Die `poster`-Bilder der gepinnten Video-Heroes werden aus dem ERSTEN
Videoframe erzeugt (z. B. `public/career/career-hero-poster.jpg` via ffmpeg) — so
blitzt vor dem Autoplay kein abweichendes (Schwarz-Weiß-)Platzhalterbild auf.

Die Leadership-/People-Bilder sind vollständig durch echte Porträts ersetzt (13 von 13,
Stand 04.08.2026).
