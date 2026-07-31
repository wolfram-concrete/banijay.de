# Wartungsmodus

Die Seite kann ohne Redeploy und ohne Git-Push hinter eine Wartungsseite gelegt
werden. Die Originalseite bleibt dabei unverändert im selben Deployment liegen —
Umschalten ist eine Flag-Änderung.

## Vercel-Setup

Eingerichtet am 31.07.2026 für das Projekt
`wolfram-stratmanns-projects/banijay-de`:

- Edge-Config-Store `banijay-flags`
- Item `maintenance = false`
- `EDGE_CONFIG` in Production, Preview und Development
- `MAINTENANCE_BYPASS_TOKEN` als sensitive Variable in Production

Der aktuelle Bypass-Token liegt zusätzlich lokal im macOS-Schlüsselbund unter
dem Dienst `banijay.de maintenance bypass`. Er kann auf dem eingerichteten Mac
so abgerufen werden:

```bash
security find-generic-password -a "$(id -un)" -s "banijay.de maintenance bypass" -w
```

Nach einer Änderung des Bypass-Tokens ist ein Redeploy nötig. Änderungen am
Edge-Config-Flag wirken dagegen ohne Redeploy.

## Umschalten

| | |
|---|---|
| **Wartung AN** | Vercel → Storage → `banijay-flags` → `maintenance` = `true` → Save |
| **Wartung AUS** | dasselbe auf `false` |

Wirkt binnen Sekunden, ohne Redeploy.

## Vorschau während der Wartung

`https://banijay.de/?preview=<TOKEN>` einmal aufrufen. Setzt ein HttpOnly-Cookie
(7 Tage gültig), danach ist die echte Seite normal browsbar — auch für den
Kunden. Cookie im Browser löschen, um wieder die Wartungsseite zu sehen.

## Verhalten

- Jede URL wird per **Rewrite** (nicht Redirect) auf `/wartung` gelegt: die
  aufgerufene Adresse bleibt in der Adresszeile stehen, Deep-Links funktionieren
  nach der Wartung sofort wieder.
- Antwort: **HTTP 503** + `Retry-After: 86400` + `X-Robots-Tag: noindex`.
  Der 503-Status signalisiert Suchmaschinen den temporären Zustand; der
  Wartungsinhalt selbst ist von der Indexierung ausgeschlossen.
- **Fail-Open:** Fehlt `EDGE_CONFIG` oder ist der Store nicht erreichbar, gilt
  `false` → Originalseite. Ein kaputter Store kann die Seite nie abschalten.

## Notfall-Rollback

- In Vercel das letzte gute Deployment → „Promote to Production"
- Oder Git-Tag `live-2026-07-31` (Stand vor Einführung des Wartungsmodus)

## Dateien

| Datei | Zweck |
|---|---|
| `src/proxy.ts` | Der Schalter. Liegt in `src/`, weil `app/` dort liegt (Next-16-Konvention; `middleware.ts` heißt jetzt `proxy.ts`) |
| `src/app/wartung/page.tsx` | Die Wartungsseite |
| `src/app/wartung/layout.tsx` | Eigenes Layout, bewusst außerhalb `(frontend)` — kein Lenis/GSAP/Header/Footer |
| `src/app/globals.css` | Block „WARTUNGSSEITE" am Dateiende |

## Lokal testen

```bash
MAINTENANCE_MODE=1 MAINTENANCE_BYPASS_TOKEN=test npm run dev
```

`MAINTENANCE_MODE=1` erzwingt die Wartungsseite ohne Edge Config.
