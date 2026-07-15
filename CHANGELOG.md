# Changelog

Alle nennenswerten Änderungen an diesem Projekt. Format angelehnt an
[Keep a Changelog](https://keepachangelog.com/de/1.1.0/).

## [redesign-v2] — Branch (Preview) — 2026-07-15

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
