# SEO-, AEO- und GEO-Betrieb

Diese Dokumentation beschreibt die technische Auffindbarkeit von banijay.de für
klassische Suchmaschinen und KI-gestützte Suche. Die verbindliche Hauptdomain ist
`https://www.banijay.de`.

## Architektur

- `src/lib/seo.ts` hält die kanonische Domain, URL-/Datumshelfer und die
  strukturierten Daten.
- `src/app/robots.ts` erzeugt `/robots.txt`.
- `src/app/sitemap.ts` erzeugt `/sitemap.xml` aus den öffentlichen statischen
  Seiten und `src/data/news.ts`.
- `src/components/seo/JsonLd.tsx` serialisiert JSON-LD sicher. Ein `<` wird als
  `\u003c` ausgegeben, damit Nutzdaten kein Script-Element beenden können.
- Das Frontend-Layout veröffentlicht `Organization` und `WebSite`. News-Details
  ergänzen `NewsArticle` und `BreadcrumbList`.

Relative Canonicals und Sprachalternativen werden über `metadataBase` auf die
`www`-Domain aufgelöst. Die Apex-Domain bleibt nur Weiterleitungsziel zur
Hauptdomain.

## Indexierbare Routen

Die Sitemap enthält die deutschen und englischen Varianten von Home, Career,
News, Contact, Impressum und Datenschutz sowie alle News-Detailseiten. Jede URL
führt `de`, `en` und `x-default` als Sprachalternative.

Statische Seiten erhalten kein künstliches `lastModified`. Bei News wird das
redaktionelle Datum `DD.MM.YYYY` beim Build nach `YYYY-MM-DD` konvertiert.
API-, Wartungs-, Looktest-, Moodtest- und Typetest-Routen sind nicht enthalten.

Beim Hinzufügen einer News müssen Slug, Datum, Lead und Bild in `src/data/news.ts`
vollständig sein. Die englische Fassung muss unter demselben Slug erreichbar sein.
Tests und Build schlagen bei einem ungültigen redaktionellen Datum fehl.

## Crawler-Richtlinie

`robots.txt` erlaubt öffentliche Seiten allgemein und sperrt `/api/`. Für die
Suche sind `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot` und `Claude-User`
freigegeben. Die reinen Trainingscrawler `GPTBot`, `ClaudeBot` und
`Google-Extended` sind gesperrt.

Diese Trennung unterstützt Auffindbarkeit in KI-Suchergebnissen, ohne Inhalte
gezielt für Modelltraining freizugeben. `robots.txt` ist eine Crawler-Anweisung,
keine Zugriffskontrolle. `llms.txt` wird derzeit bewusst nicht verwendet, weil es
keinen nachgewiesenen Rankingvorteil bietet.

## Strukturierte Daten

Die strukturierten Daten müssen immer sichtbare, aktuelle Inhalte wiedergeben:

- `Organization`: Firmenname, Logo, Anschrift, Telefon, allgemeiner Kontakt,
  Pressekontakt sowie Instagram und LinkedIn.
- `WebSite`: Website, Sprachen und Publisher.
- `NewsArticle`: Titel, Lead, Motiv, ISO-Datum, Sprache, kanonische URL und
  Publisher.
- `BreadcrumbList`: lokalisierter Pfad Home → News → Artikel.

FAQ-, `JobPosting`- und ähnliche Markups dürfen erst ergänzt werden, wenn die
zugehörigen Inhalte vollständig sichtbar auf der jeweiligen Seite stehen.

## 404 und Noindex

`src/app/not-found.tsx` fängt unbekannte globale URLs ab. Die Frontend-Route-Group
verwendet denselben lokalisierten Inhalt für ungültige News-Slugs. Beide Varianten
liefern den Status `404`, den Titel `404 | Banijay Germany` und `noindex, follow`.
Die Sprache ergibt sich aus dem Pfad: `/en/...` ist Englisch, alle anderen Pfade
sind Deutsch. Es gibt keine automatische Weiterleitung.

## Prüfung vor und nach einem Release

1. `npm run lint`, `npm run typecheck`, `npm test` und `npm run build` ausführen.
2. `/robots.txt` und `/sitemap.xml` auf Status 200 und passenden Content-Type
   prüfen.
3. Sicherstellen, dass die Sitemap nur `https://www.banijay.de` verwendet und
   keine Betriebs- oder Testseiten enthält.
4. Home, Career, News und Contact in beiden Sprachen auf exakt eine H1,
   Canonical und erreichbare Sprachalternativen prüfen.
5. JSON-LD als JSON parsen und stichprobenartig im Schema Markup Validator sowie
   Google Rich Results Test testen.
6. Unbekannte DE-/EN-Pfade und einen ungültigen News-Slug auf Status 404,
   `noindex`, Header/Footer und mobile Darstellung prüfen.

## Search Console und Bing Webmaster Tools

Nach dem ersten Produktions-Deployment muss ein verifizierter Property-Owner die
Sitemap einmal einreichen:

- Google Search Console öffnen, die Property `https://www.banijay.de/` wählen,
  unter **Sitemaps** `sitemap.xml` eintragen und absenden.
- Bing Webmaster Tools öffnen, die Website wählen, unter **Sitemaps**
  `https://www.banijay.de/sitemap.xml` einreichen.

Nach größeren Inhaltsänderungen genügt die aktualisierte Sitemap; `IndexNow` ist
für diesen ersten technischen Durchgang nicht eingerichtet.
