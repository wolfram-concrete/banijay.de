# Karriereformular: SMTP-Anbindung

## Status und Umfang

Der Versand-Endpunkt und die sichtbare Formular-UI auf `/career` und `/en/career` sind aktiviert.
Die UI verwendet den hier dokumentierten Vertrag und zeigt während des Versands sowie bei Erfolg
oder Fehler einen lokalisierten Status an.

Die Anbindung gilt ausschließlich für Karriere-Anfragen. Die allgemeinen Kontaktseiten bleiben
unverändert. Es gibt keine Anhänge, keine Bestätigungsmail an die absendende Person und keine
dauerhafte Speicherung der Formulardaten bei Vercel oder in einer Datenbank.

## Architektur

1. Der Browser sendet JSON an `POST /api/career-contact`.
2. Der Route Handler prüft Content-Type, Origin, Größe, Honeypot und alle Felder.
3. Eine Vercel Function im Node.js-Runtime-Kontext verarbeitet die Anfrage kurzzeitig im
   Arbeitsspeicher.
4. Nodemailer übergibt eine reine Textmail per SMTP und erzwungenem STARTTLS an den
   konfigurierten Mailserver.
5. Die Function antwortet erst, nachdem der SMTP-Server den festen Empfänger akzeptiert hat.

Die absendende Adresse wird ausschließlich als validiertes `Reply-To` gesetzt. `From`, `To` und
der Aufbau des Betreffs kommen immer aus dem Servercode beziehungsweise aus serverseitigen
Variablen. Formularwerte können keine zusätzlichen Header, Empfänger oder Anhänge definieren.

## Schnittstellenvertrag

Der Endpunkt akzeptiert ausschließlich `application/json` und höchstens 16 KiB pro Request.
Erlaubte Origins sind exakt `https://www.banijay.de` und `https://banijay.de`.

| Feld | Pflicht | Regeln |
| --- | --- | --- |
| `name` | ja | Text, 1–120 Zeichen |
| `company` | nein | Text, maximal 120 Zeichen |
| `email` | ja | gültige E-Mail-Adresse, maximal 254 Zeichen |
| `phone` | nein | Text, maximal 50 Zeichen |
| `topic` | ja | `initiativbewerbung`, `format-idee` oder `sonstiges` |
| `message` | ja | Text, 1–5.000 Zeichen |
| `locale` | ja | `de` oder `en` |
| `website` | ja | unsichtbares Honeypot-Feld, muss leer sein |

Beispiel ohne echte personenbezogene Daten:

```json
{
  "name": "Erika Muster",
  "company": "Muster GmbH",
  "email": "erika@example.com",
  "phone": "+49 221 123456",
  "topic": "initiativbewerbung",
  "message": "Dies ist eine Testanfrage.",
  "locale": "de",
  "website": ""
}
```

Antworten:

| Status | Bedeutung |
| --- | --- |
| `200 {"ok":true}` | SMTP hat den Empfänger akzeptiert oder der Honeypot wurde ausgelöst |
| `400 {"ok":false}` | ungültiges JSON oder ungültige Felder |
| `403 {"ok":false}` | fehlender oder nicht erlaubter Origin |
| `413 {"ok":false}` | Request größer als 16 KiB |
| `415 {"ok":false}` | anderer Content-Type als JSON |
| `429` | Vercel-WAF-Rate-Limit überschritten, sobald die Regel aktiv ist |
| `503 {"ok":false}` | Konfiguration fehlt oder SMTP ist nicht erreichbar/akzeptiert nicht |

Ein gefülltes `website`-Feld erhält absichtlich dieselbe neutrale Erfolgsantwort wie ein echter
Versand, löst jedoch keine E-Mail aus.

## Serverkonfiguration

Alle Variablen sind serverseitig und dürfen kein `NEXT_PUBLIC_`-Präfix erhalten. In Vercel werden
sie ausschließlich für `Production` gepflegt:

| Variable | Inhalt |
| --- | --- |
| `SMTP_HOST` | SMTP-Hostname |
| `SMTP_PORT` | fest `587` |
| `SMTP_USER` | SMTP-Benutzer, als sensitive Variable |
| `SMTP_PASSWORD` | SMTP-Passwort, als sensitive Variable |
| `SMTP_FROM` | feste Absenderadresse |
| `CAREER_CONTACT_RECIPIENT` | feste Empfängeradresse |
| `CAREER_CONTACT_ALLOWED_ORIGINS` | kommagetrennt: beide erlaubten Produktions-Origins |

Die SMTP-Verbindung verwendet `secure: false` zusammen mit `requireTLS: true`. Dadurch wird auf
Port 587 STARTTLS erzwungen. Die Mindestversion ist TLS 1.2; Zertifikate werden normal geprüft.
Verbindungs-, Begrüßungs- und Socket-Timeouts verhindern unnötig lange Function-Laufzeiten.

`.env.example` enthält nur die Namen. Echte Werte gehören weder in `.env.example` noch in Git,
Dokumentation, Tickets oder Logs. Für lokale Entwicklung gegebenenfalls eine ignorierte
`.env.local` mit gesonderten Testzugangsdaten verwenden.

## Missbrauchsschutz und Protokollierung

- Schema-Allowlist mit festen Feldgrenzen und strikter Ablehnung unbekannter Felder
- 16-KiB-Limit auch für gestreamte Requests
- exakte Origin-Allowlist
- unsichtbares Honeypot-Feld
- feste Mail-Header, reine Textmail, deaktivierter Datei- und URL-Zugriff
- keine Formularinhalte, E-Mail-Adressen oder SMTP-Fehlerdetails in Anwendungslogs
- Vercel WAF nur für `POST /api/career-contact`

Die WAF-Regel wird stufenweise ausgerollt: zuerst `log`, dann eine Prüfung in Preview und erst
danach in Production maximal 10 Anfragen pro 10 Minuten und IP; Überschreitungen erhalten `429`.
Firewall-Entwürfe müssen vor jeder Stufe mit `vercel firewall diff` geprüft und vom Team-Owner
mit `vercel firewall publish --yes` veröffentlicht werden. Rate-Limit-Zähler werden bei Vercel
pro Region geführt.

Aktueller Stand: Die Regel `Career contact submissions` ist als unveröffentlichter Entwurf im
Log-Modus gestaged. Sie trifft nur zu, wenn Pfad und Methode exakt `/api/career-contact` und `POST`
sind. Der Team-Owner muss den geprüften Entwurf mit folgendem Befehl veröffentlichen:

```bash
vercel firewall diff
vercel firewall publish --yes
```

Die Treffer können anschließend im
[gefilterten Firewall-Dashboard](https://vercel.com/wolfram-stratmanns-projects/banijay-de/firewall/traffic?filter=rule_career_contact_submissions_zBj2i2)
kontrolliert werden. Erst nach Prüfung legitimer Testanfragen wird derselbe Regelname im Preview-
Kontext auf das Rate Limit umgestellt, erneut vom Owner veröffentlicht und getestet. Nach dieser
Preview-Stufe wird die Environment-Einschränkung entfernt, das Limit für Production gestaged,
erneut per Diff geprüft und abschließend vom Owner veröffentlicht.

## UI-Anbindung

Die aktive Career-UI:

1. sendet an `POST /api/career-contact`;
2. übernimmt Feldnamen, Pflichtfelder und Maximalwerte aus der Tabelle;
3. sendet das visuell verborgene Honeypot-Feld `website` mit;
4. übernimmt `locale` aus der aktuellen deutschen oder englischen Route;
5. behandelt Lade-, Erfolgs- und Fehlerzustände und zeigt nur bei HTTP 200 Erfolg an;
6. enthält keine Datei-Inputs, Autoantworten oder lokale Zwischenspeicherung;
7. ist ausschließlich auf den Career-Routen aktiviert.

## Tests und Fehlerdiagnose

Lokale Qualitätsprüfungen:

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

Der End-to-End-Test verwendet eine eindeutige, nicht personenbezogene Testkennung und einen
erlaubten `Origin`-Header. HTTP 200 bedeutet, dass der SMTP-Server den festen Empfänger angenommen
hat; damit ist noch keine Zustellung oder Inbox-Platzierung garantiert.

Bei `503` zuerst kontrollieren, ob alle sieben Variablen im Production-Scope vorhanden sind und
ob ein neues Deployment nach der letzten Variablenänderung erstellt wurde. Danach SMTP-Erreichbarkeit,
STARTTLS und die Serverfreigabe der festen Absenderadresse prüfen. Es werden bewusst keine internen
SMTP-Fehler an den Browser oder in eigene Logs ausgegeben.

## Datenschutz und Zugangsdaten

Die deutsch- und englischsprachige Datenschutzerklärung beschreibt den kurzzeitigen Durchlauf durch
die Vercel Function, die SMTP-Übermittlung über den kasserver.com-Maildienst und die anschließende
Speicherung im Empfängerpostfach.

Der verantwortliche Accountinhaber muss bestätigen, dass
mit ALL-INKL für den verwendeten Maildienst ein gültiger Auftragsverarbeitungsvertrag besteht. Der
Status dieser organisatorischen Prüfung ist im Repository **offen**; technische Konfiguration allein
ist kein Nachweis. Hinweise stellt ALL-INKL in seinen
[Datenschutzinformationen](https://all-inkl.com/index.php?open=faq&sek=wichtig) bereit.

Auch die aktualisierten Datenschutztexte müssen juristisch freigegeben werden. Sie
nennen für Anfragen mit Bewerbungsbezug § 26 Abs. 1 BDSG in Verbindung mit Art. 88 DSGVO und
unterscheiden diese von sonstigen vorvertraglichen oder allgemeinen Karriere-Anfragen.

Das für Aufbau und Test übermittelte SMTP-Passwort muss anschließend im Mailanbieter rotiert und der
neue Wert nur in der sensitiven Vercel-Variable aktualisiert werden. Das Löschen eines Chats ersetzt
keine Rotation. Nach einer Rotation ist ein neues Production-Deployment und ein erneuter SMTP-Test
erforderlich.
