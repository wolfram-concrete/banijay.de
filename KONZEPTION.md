# Banijay Germany — Website-Konzeption & Texte

Stand: aktueller Ausbau. Dieses Dokument beschreibt die Konzeption (Aufbau, Design­prinzip, Sektionen) und listet die aktuell verbauten Texte je Seite.

---

## 1. Idee & Designprinzip

**Positionierung:** Banijay Germany als eines der führenden Entertainment-Häuser Deutschlands — ein Verbund aus eigenständigen Companies, kreativen Köpfen und bekannten Marken. Nicht „Produktionsfirma", sondern **Entertainment-Netzwerk**.

**Designprinzip (verbindlich):** *Design-first auf Basis des Algarve-Templates.* Für jede Sektion wird zuerst das Algarve-Section-Design/​die Algarve-Mechanik übernommen, dann der passende Banijay-Content eingefüllt. Transitions & Animationen werden möglichst **exakt** aus der Vorlage übernommen (nicht approximiert).

**Tonalität:** jung, catchy, bold. Kurze, prägnante Headlines. Große Typografie als Key-Visual.

---

## 2. Designsystem

- **Farben:** Paper `#f8f7f3` (warmes Off-White), Lift `#f0eee6`, Ink/Schwarz `#0e0d0b`, Akzent/Magenta `#fb4b68`.
- **Typografie:** Sharp Grotesk (lokal, `--font-sharp`) für Headlines/Lettering; Systemschrift für Fließtext. Große `vw`-basierte Headings (bis ~11 vw), enges Tracking.
- **Motion-Stack:** GSAP + ScrollTrigger, Lenis (Smooth-Scroll), IntersectionObserver für Entrance-Reveals. Reduced-Motion wird respektiert.
- **Grid:** Seitenpadding `2vw`, Radius `1.67vw` (groß) / `1.11vw` (default).

---

## 3. Globale Elemente

### Navigation (Overlay-Menü)
Transparente Fixed-Bar: magenta **Banijay-Logo** links (führt zur Home / scrollt in den Hero), ein **„MENU"-Pill** rechts (Coral). Klick öffnet ein **Fullscreen-Overlay** (Höhe 0 → 100vh) in Coral mit großen Links **HOME · COMPANIES · NEWS · ABOUT · CAREER · CONTACT** (gestaffelt einfahrend) + Info-Block: *Folgen* @banijaygermany · *Büro* Schanzenstraße 22, 51063 Köln · *Kontakt* hello@banijay.de.

### Footer
Magenta Rounded-Panel, schwarze Schrift: große Nav-Links + Kontakt (Folgen/Adresse/Mail/Telefon), **BANIJAY als großes Lettering im langsamen Endlos-Marquee**, Legal-Zeile (Impressum · Datenschutz · © Banijay Germany).

---

## 4. Startseite (Home)

Volle immersive Algarve-Sequenz:

**01 · Hero** (Video-Hintergrund, weiße Typo)
> WE ARE **BANIJAY**
- Factsheet: `1.300 Mitarbeitende · 25+ Companies und Labels · 4 Milliarden Views & Zuschauer · 3.000 Stunden Entertainment`
- Subline: *„Starke Companies. Kreative Köpfe. Bekannte Marken. Ein Dach – Entertainment, das Millionen bewegt."*
- „BANIJAY" skaliert bündig von WE (links) bis ARE (rechts).

**02 · Entertainment Portfolio** (Sticky-Grid, 400vh)
Kacheln bauen sich auf, flippen weg, das konturierte Mittel-Video zieht auf Vollbild. Hover je Kachel: *Titel · Company · Genre*. Formate u. a.:
`The Masked Singer` (EndemolShine), `Wer wird Millionär?` (EndemolShine), `TV total` (Brainpool), `Temptation Island` (Banijay Productions), `Schlag den Star` (Brainpool), `Kitchen Impossible` (EndemolShine), `Promi Big Brother` (EndemolShine), `Das große Promibüßen` (Banijay Productions), `LEGO Masters` (EndemolShine), `Tatort Dresden` (MadeFor), `NightWash` (Banijay Germany Live), `Cologne Comedy Festival`.

**03 · Statement** (Word-Reveal, fliegt von rechts ein)
> *„Banijay Germany ist kein einzelnes Produktionshaus – sondern ein Netzwerk aus eigenständigen Companies, das Ideen entwickelt, Formate produziert und Unterhaltung zu Millionen bringt."*

**04 · Featured Companies** (Card-Deck, fächert auf)
> featured / companies
Banijay Productions Germany · EndemolShine Germany · Brainpool.

**05 · Animated Heading** (3 konvergierende Zeilen)
> Du kennst / die Formate. / **Nicht die Welt.**

**06 · Kompetenzfelder** (Dark-Card-Stack)
- **Show & Entertainment** — „Formate, über die Deutschland spricht."
- **Reality & Factual** — „Nah dran an Menschen und Realität."
- **Comedy & Live** — „Comedy und Live, die den Saal füllen."

**07 · Animated Heading**
> Ein Dach. / Viele / **Handschriften.**

**08 · Stimmen & Zahlen** (dunkles Panel)
Company-Bildgrid, cross-fadende Aussagen (belegte Wolter-Zitate + Marken-Aussagen), Zähler-Kacheln mit den echten Kennzahlen.
> *„Wir verstehen uns nicht als Filmproduzent, sondern als Entertainmenthaus."* — Marcus Wolter, CEO & Co-Founder

**09 · Führung** — siehe Abschnitt 10.

**10 · Partner-CTA**
> *„Let's create what people talk about."*
> „Ob Sender, Plattform, Marke, Talent oder kreativer Partner: Wer Entertainment mit Wirkung entwickeln will, findet in Banijay Germany eine Welt aus Erfahrung, Reichweite, Produktionskraft und kreativer Eigenständigkeit." → **Kontakt aufnehmen**

**11 · Latest News** (gestapelte Pin-Tiles) — die neuesten Meldungen.

---

## 5. Companies

**Hero** (Algarve „studio-hero": großes zentriertes Lettering + Bildblock mit Glass-Card)
> **DIE WELT DAHINTER**
> *Label:* Companies
> *Card:* „20 Companies, Labels und Live-Einheiten – von Prime-Time-Show über Reality und Fiction bis Comedy, Digital und Live. Ein Netzwerk, das Entertainment entwickelt, produziert und erlebbar macht."

**Content:** Der Companies-Explorer (Herzstück) — Filter nach Kompetenzfeldern (Show & Entertainment, Reality & Factual, Comedy & Live, Fiction & Scripted, Digital & Social, Talent & Artists, Services & Experiences, International), Cluster A–E mit 3 Card-Tiers (featured / specialist / label), gleichberechtigt (kein Ranking). Abschluss-CTA Richtung Kontakt.

---

## 6. News

**Hero**
> **WAS LÄUFT**
> *Label:* News
> *Card:* „Podcasts, Interviews, Primetime-Erfolge und Stories – was gerade in der Banijay-Welt passiert."

**Content:** Editorial-Grid der aktuellen Meldungen (große gerundete Bilder, Coral-Datum, Sharp-Titel, Hover-Zoom). Aktuelle Meldungen u. a.:
- Aaron Troschke im Banijay-Podcast WOLTER TALKS (03.06.2026)
- Wir unterstützen die DKMS (29.05.2026)
- Marcus Wolter zu Gast im „brand eins Podcast" (17.04.2026)
- Nelson Müller im Banijay-Podcast WOLTER TALKS (13.04.2026)
- 88 % Primetime-Hitrate im März! (01.04.2026)
- Max Schradin im WOLTER TALKS (03.03.2026)
- Handelsblatt-Interview mit Marcus Wolter (22.02.2026)
- 97 % Primetime-Hitrate im Januar! (02.02.2026)
- FOCUS Money: Interview mit Marcus Wolter (22.01.2026)

---

## 7. About

**Hero**
> **WE ARE BANIJAY**
> *Label:* Über Banijay
> *Card:* „Ein führendes Entertainment-Haus im deutschen Markt – ein Verbund aus eigenständigen Companies, kreativen Köpfen und starken Marken."

**Content-Sektionen:**
- **Proof / Zahlen:** „Eine der stärksten Entertainment-Welten im deutschen Markt." + Kennzahlen (inkl. Umsatz `250 Mio. €`, Freigabe nötig).
- **Prinzip:** „Kreative Freiheit braucht ein starkes Dach." — Jede Company behält Handschrift, Kultur, Marktnähe; Banijay schafft Verbindung.
- **CEO / Führung:** Marcus Wolter, *„Wir verstehen uns nicht als Filmproduzent, sondern als Entertainmenthaus."*
- **International:** „In Deutschland verwurzelt. International verbunden." — Teil der internationalen Banijay-Gruppe (130+ Companies weltweit).
- **Partner:** „Für Partner, die Entertainment mit Wirkung suchen." — Sender & Plattformen · Marken & Unternehmen · Talente & Künstler:innen · Live & Experience.
- **CTA:** „Lass uns über Entertainment mit Wirkung sprechen."

---

## 8. Career

**Hero**
> **KOMM INS TEAM**
> *Label:* Career
> *Card:* „Arbeite dort, wo Unterhaltung entsteht – über die Companies und Standorte der Banijay-Welt, plus BANIJAY TOMORROW."

**Content:**
- **Jobwelt:** „Viele Companies. Viele Rollen. Ein gemeinsames Ziel." — Jobs direkt in den Companies & Labels. Standorte: Köln, Berlin, Münster, Wien, Zürich. Bereiche: Produktion, Redaktion, Entwicklung, Live, Digital, Talent-Management, Technik, Vermarktung, Administration.
- **BANIJAY TOMORROW:** „Für Talente, die mehr wollen als einen Job." — Academy, Workshops, Entwicklungsangebote für Talents, Professionals und Führungskräfte.

---

## 9. Contact

**Hero**
> **LET'S TALK**
> *Label:* Contact
> *Card:* „Ob Sender, Plattform, Marke, Talent oder Presse – hier findest du den richtigen Einstieg zu Banijay Germany."

**Content:**
- **Bereiche:** Partner & Projekte · Presse · Career · Allgemeine Anfragen.
- **Kontaktformular** (Wireframe): Name · E-Mail · Anliegen (Auswahl) · Nachricht.
- **Kontaktdaten:** Schanzenstraße 22, 51063 Köln · hello@banijay.de · +49 (0) 221 6509 5000.

---

## 10. Führungsteam (11 Personen)

Algarve-Founder-Grid, 6 Spalten / 2 Reihen, B/W-Corporate-Porträts (aktuell Platzhalter):

| Name | Rolle |
|---|---|
| Marcus Wolter | CEO |
| Knut Kremling | COO |
| Michael Laegel | CFO |
| Simone Lenzen | Director Communications |
| Michael Gaul | Director Legal / General Counsel |
| Natali Naso | Director Human Resources |
| Sebastian Menge | Director Information Technology |
| Heike Lutzer | Director Marketing & Design |
| Matthaeus Jaworek | Director Financial Planning, Reporting & Controlling |
| Janine Berns | Director Accounting & Tax |
| Aylin Firat | Personal Assistant to CEO |

---

## 11. Kennzahlen

| Kennzahl | Wert |
|---|---|
| Mitarbeitende | 1.300 |
| Companies & Labels | 25+ |
| Views & Zuschauer | 4 Milliarden |
| Stunden Entertainment | 3.000 |
| Companies weltweit | 130+ |
| Umsatz *(nur About, Freigabe nötig)* | 250 Mio. € |

---

## 12. Technik & CMS-Readiness

- **Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4.
- **Datenschicht:** alle Inhalte in `src/data/` (typisiert) — `home.ts`, `about.ts`, `career.ts`, `contact.ts`, `companies.ts`, `news.ts`, `site.ts`, `leadership.ts`, `formats.ts`. Bildet später Payload-Collections/Globals ab (CMS-ready, noch ohne Payload-Dependency).
- **Instagram-Reels:** @banijaygermany über Graph-API-Token (Fallback: lokale Snapshots).
- **Platzhalter, die noch echte Assets brauchen:** Führungs-Porträts (pro Person), Hero-/Portfolio-Key-Visuals, Company-Detailbilder, finale News-Einzel-Links.

---

*Hinweis: Dieses README spiegelt den aktuellen Ausbaustand. Design-first bedeutet, dass Sektionslayout & Animation der Algarve-Vorlage folgen — der Content ist bewusst knapp und catchy gehalten und lässt sich über die Datenschicht 1:1 austauschen.*
