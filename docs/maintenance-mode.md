# Wartungsmodus

## Überblick

Der Wartungsmodus legt die ausgelieferte Next.js-Site ohne neuen Build und ohne
Git-Push hinter eine eigene Wartungsseite. Die reguläre Website bleibt im selben
Deployment vollständig verfügbar und kann über einen geschützten Bypass-Link
weiter angesehen werden.

Der Schalter liegt in Vercel Edge Config. Eine Änderung des Flags wird global
verteilt und wirkt üblicherweise innerhalb weniger Sekunden.

## Architektur

```text
Request
  │
  ├─ statisches Asset? ───────────────────────────────► Asset ausliefern
  │
  └─ src/proxy.ts
       │
       ├─ gültiger ?preview=<TOKEN> ─────────────────► Cookie setzen, Redirect
       │
       ├─ maintenance != true / Edge Config fehlt ───► reguläre Website
       │
       ├─ gültiges Bypass-Cookie ────────────────────► reguläre Website
       │
       ├─ /wartung ──────────────────────────────────► Wartungsseite direkt
       │
       └─ alle übrigen Requests ─────────────────────► Rewrite auf /wartung, 503
```

Der Rewrite erhält die ursprünglich aufgerufene URL im Browser. Ein Deep-Link
wie `/career` zeigt während der Wartung die Wartungsseite unter `/career` und
funktioniert nach dem Ausschalten sofort wieder normal.

## Eingebaute Bestandteile

| Datei | Aufgabe |
|---|---|
| `src/proxy.ts` | Zentraler Schalter, Edge-Config-Read, Bypass-Cookie, Rewrite und Matcher |
| `src/app/wartung/page.tsx` | Leichte Wartungsseite als Server Component |
| `src/app/wartung/layout.tsx` | Eigenes Segment-Layout außerhalb von `(frontend)`; kein Header, Footer, Lenis oder GSAP |
| `src/app/globals.css` | Styling, Aura, Grain, Logo-Glow und CSS-Marquee |
| `package.json` | Runtime-Abhängigkeit `@vercel/edge-config` |
| `package-lock.json` | Aufgelöste Version `@vercel/edge-config@1.5.0` |
| `docs/maintenance-mode.md` | Diese Betriebs- und Implementierungsdokumentation |

`src/proxy.ts` liegt bewusst in `src/`, auf derselben Ebene wie `src/app`.
Next.js 16 verwendet `proxy.ts` anstelle der früheren `middleware.ts`.

## Vercel-Konfiguration

Eingerichtet am 31.07.2026:

| Einstellung | Wert |
|---|---|
| Team | `wolfram-stratmanns-projects` |
| Projekt | `banijay-de` |
| Edge-Config-Store | `banijay-flags` |
| Flag | `maintenance` (`boolean`) |
| `EDGE_CONFIG` | Production, Preview und Development |
| `MAINTENANCE_BYPASS_TOKEN` | Production, sensitive |

Der aktuelle Wert des Flags wird absichtlich nicht als dauerhafter Status in
dieser Datei gepflegt. Er lässt sich zuverlässig so abfragen:

```bash
npx vercel edge-config items banijay-flags \
  --scope wolfram-stratmanns-projects \
  --format json
```

### Wartung einschalten

```bash
npx vercel edge-config update banijay-flags \
  --scope wolfram-stratmanns-projects \
  --patch '{"items":[{"operation":"update","key":"maintenance","value":true}]}'
```

### Wartung ausschalten

```bash
npx vercel edge-config update banijay-flags \
  --scope wolfram-stratmanns-projects \
  --patch '{"items":[{"operation":"update","key":"maintenance","value":false}]}'
```

Für reine Flag-Änderungen ist kein Redeploy nötig.

## Verhalten im Wartungsmodus

- Alle durch den Matcher erfassten Seiten werden intern auf `/wartung`
  umgeschrieben.
- Die Antwort hat den Status `503 Service Unavailable`.
- `Retry-After: 86400` signalisiert einen erneuten Versuch nach einem Tag.
- `X-Robots-Tag: noindex` verhindert die Indexierung des Wartungsinhalts.
- `Cache-Control: no-store, must-revalidate` verhindert eine dauerhafte
  Zwischenspeicherung der Wartungsantwort.
- `/wartung` selbst wird nicht erneut umgeschrieben und kann direkt geöffnet
  werden.
- `_next/static`, `_next/image`, `favicon.ico`, `/brand/` und `/fonts/` bleiben
  erreichbar, damit CSS, Fonts und Logo geladen werden können.

### Fail-open

Fehlt `EDGE_CONFIG` oder schlägt der Read fehl, behandelt der Proxy das Flag als
`false`. Ein nicht erreichbarer Store kann die Website daher nicht versehentlich
abschalten.

## Bypass für Vorschau und Abnahme

Ein Aufruf mit dem Production-Token setzt das HttpOnly-Cookie `bj-bypass` und
entfernt den Token anschließend per Redirect aus der URL:

```text
https://<domain>/?preview=<MAINTENANCE_BYPASS_TOKEN>
```

Cookie-Eigenschaften:

- HttpOnly
- SameSite=Lax
- Secure auf HTTPS
- Path `/`
- Gültigkeit 7 Tage

Danach ist die reguläre Site im selben Browser normal navigierbar. Zum erneuten
Testen der Wartungsansicht muss das Cookie `bj-bypass` gelöscht oder ein privates
Browserfenster verwendet werden.

Der Token wird nicht im Repository gespeichert. Auf dem eingerichteten Mac liegt
er im macOS-Schlüsselbund:

```bash
security find-generic-password \
  -a "$(id -un)" \
  -s "banijay.de maintenance bypass" \
  -w
```

Der Token sollte nur an Personen weitergegeben werden, die während der Wartung
die reguläre Site sehen dürfen. Nach einer Rotation der Environment-Variable ist
ein Redeploy erforderlich; bestehende Cookies mit dem alten Wert verlieren dann
automatisch ihre Wirkung.

## Lokale Entwicklung

Ohne Edge-Config-Verbindung lässt sich die Wartungsseite über den lokalen
Override testen:

```bash
MAINTENANCE_MODE=1 \
MAINTENANCE_BYPASS_TOKEN=local-test-token \
npm run dev
```

Erwartete Checks:

```bash
curl -I http://localhost:3000/
curl -I http://localhost:3000/career
curl -I http://localhost:3000/brand/banijay-sign-white.svg
curl -I "http://localhost:3000/?preview=local-test-token"
```

Erwartete Ergebnisse:

| Test | Ergebnis |
|---|---|
| `/` ohne Bypass | 503, Wartungsseite |
| `/career` ohne Bypass | 503, URL bleibt `/career` |
| Brand-SVG | 200 |
| korrekter Preview-Token | 307, Bypass-Cookie wird gesetzt |
| Request mit Bypass-Cookie | 200, reguläre Seite |
| falscher Token | 503 |
| kein `EDGE_CONFIG`, kein Override | 200, reguläre Seite |

`MAINTENANCE_MODE` ist ausschließlich ein lokaler Test-/Notfallschalter und darf
nicht versehentlich als `1` in Vercel Production gesetzt werden, weil er das
Edge-Config-Flag überstimmt.

## Deployment verifizieren

Der aktuell deployte Vercel-Stand kann trotz Deployment Protection mit der CLI
geprüft werden:

```bash
npx vercel list --scope wolfram-stratmanns-projects
npx vercel curl / --deployment <DEPLOYMENT_URL> -- -I
npx vercel curl /wartung --deployment <DEPLOYMENT_URL> -- -I
```

Bei aktivem Flag muss `/` den Status 503 liefern. `/wartung` selbst liefert 200.

## DNS- und Domain-Status

Stand 31.07.2026 ist das Vercel-Projekt korrekt deployt, die öffentliche Domain
zeigt jedoch noch auf den bisherigen Apache/PHP-Server:

| Host | Aktueller A-Record | Vercel-Ziel laut CLI |
|---|---|---|
| `banijay.de` | `176.28.38.191` | `76.76.21.21` |
| `www.banijay.de` | `176.28.38.191` | `76.76.21.21` |

Die Nameserver liegen bei `dns1.de` bis `dns4.de`. Diese extern verwalteten
DNS-Einträge können nicht über die Vercel CLI geändert werden. Bis zur
DNS-Umstellung lässt sich der Vercel-Stand über die stabile Projektadresse
`https://banijay-de-six.vercel.app` prüfen.

Wichtig: Das Edge-Config-Flag wirkt nur auf Requests, die das Vercel-Deployment
erreichen. Auf dem bisherigen Apache-Server hat es keine Wirkung.

## Verifikation der Implementierung

Am 31.07.2026 wurden erfolgreich geprüft:

- `npm run build`, inklusive `ƒ Proxy (Middleware)` im Build-Output
- TypeScript-Check im Next.js-Production-Build
- gezielter ESLint-Lauf für Proxy und Wartungsroute
- Edge-Config-Read gegen den echten Store
- 503-Rewrite für `/` und `/career`
- 200 für benötigte Brand-Assets
- falscher und korrekter Preview-Token
- HttpOnly-/SameSite-/Secure-Cookie
- reguläre Website nach gesetztem Bypass-Cookie
- Desktop-Rendering
- Mobil-Rendering bei 390 × 844 ohne horizontalen Overflow

Der globale Lint-Lauf enthält unabhängig vom Wartungsmodus weiterhin den
vorbestehenden Fehler in `src/app/type-test/page.tsx:96`.

## Rollback und Notfälle

### Wartungsmodus sofort deaktivieren

Das Flag `maintenance` im Store `banijay-flags` auf `false` setzen. Das ist der
schnellste und bevorzugte Weg.

### Code-Rollback

- In Vercel das letzte gute Deployment wieder als Production promoten.
- Alternativ auf den Git-Tag `live-2026-07-31` zurückgehen. Er zeigt auf Commit
  `7a6a8a9`, direkt vor Einführung des Wartungsmodus.

### Edge Config nicht erreichbar

Durch Fail-open wird automatisch die reguläre Website ausgeliefert. Für diesen
Fall ist kein Eingriff notwendig.
