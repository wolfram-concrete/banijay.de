# Social-Feeds auf der neuen banijay.de — was noch fehlt (Instagram & LinkedIn)

**Kurzfassung:** Die Website kann den Instagram- und LinkedIn-Feed live anzeigen. Damit
Beiträge erscheinen, braucht der Feed jeweils eine **autorisierte Verbindung (Token)** zu den
offiziellen Konten. Diese Verbindung war bisher nicht sauber eingerichtet — deshalb bleibt der
Feed leer/grau. Das lässt sich nur **von jemandem mit Admin-Rechten auf den Banijay-Konten**
freischalten (nicht von außen durch die Agentur). Unten steht genau, was zu tun ist.

---

## 1) Instagram (@banijaygermany)

**Woran es hängt:** Der Feed zieht die Beiträge über die offizielle **Instagram-Graph-API**.
Dafür muss ein gültiger, langlebiger **Zugriffstoken** existieren. Der bisherige Token war
entweder abgelaufen oder nie korrekt erzeugt worden.

**Voraussetzungen (bitte prüfen/herstellen):**
1. **@banijaygermany ist ein Business- oder Creator-Konto** (kein privates Konto).
   → In der Instagram-App: Einstellungen → Konto → „Zu Business-Konto wechseln“.
2. Das Instagram-Konto ist mit einer **Facebook-Seite von Banijay verknüpft**
   (Meta Business Suite → Einstellungen → Konten).
3. Es gibt eine Person mit **Admin-Rechten** auf dieser Facebook-Seite.

**Was konkret zu tun ist:**
- Diese Admin-Person meldet sich **einmal im Feed-/Aggregator-Dashboard** an und klickt
  „Instagram verbinden“ → autorisiert den Zugriff (OAuth-Fenster von Meta). Damit wird ein
  **langlebiger Token (60 Tage, automatisch verlängert)** erzeugt.
- Alternativ: Token in **developers.facebook.com** (Graph-API → „Long-Lived Access Token“)
  erstellen und uns übermitteln.

**Wir brauchen von Euch:** die Bestätigung, dass 1.–3. erfüllt sind, **und** eine Admin-Person,
die den Connect-Klick macht (5 Minuten). Danach läuft der Feed automatisch.

---

## 2) LinkedIn (Unternehmensseite Banijay Germany)

**Woran es hängt:** LinkedIn erlaubt **kein** einfaches Einbetten wie Instagram. Beiträge einer
Unternehmensseite dürfen nur über die **offizielle LinkedIn-API** ausgelesen werden — und die
verlangt eine **freigegebene App, die mit der Banijay-Unternehmensseite verbunden ist**.

**Voraussetzungen (bitte prüfen/herstellen):**
1. Es gibt eine Person mit **Admin-Rolle auf der LinkedIn-Unternehmensseite** von Banijay Germany.
2. Eine **LinkedIn-Developer-App** wird mit dieser Seite verknüpft und von der Admin-Person
   bestätigt (developer.linkedin.com → „Create App“ → der Unternehmensseite zuordnen).
3. Für das **Auslesen der Seiten-Beiträge** muss bei LinkedIn die Berechtigung
   (`r_organization_social` / Community Management API) **beantragt und freigegeben** werden.
   → Diese Freigabe durch LinkedIn dauert erfahrungsgemäß einige Tage.

**Was konkret zu tun ist:**
- Entscheiden: **offizielle LinkedIn-API** (sauberste Lösung, aber Freigabe-Prozess) **oder** ein
  von LinkedIn zugelassener Aggregator, den eine Seiten-Admin-Person autorisiert.
- Admin-Person verknüpft App/Aggregator mit der Unternehmensseite und stößt die
  Berechtigungs-Freigabe an.

**Wir brauchen von Euch:** Name der **LinkedIn-Seiten-Admin-Person** und die Entscheidung
API vs. Aggregator. Den Rest (App-Setup, Antrag) können wir übernehmen — die Admin-Bestätigung
kann aber **nur von Euch** kommen.

---

## Was von uns (Agentur) schon fertig ist
- Beide Feed-Bereiche sind auf der Seite gebaut und eingebunden; sie füllen sich automatisch,
  **sobald die Verbindung steht**.
- Der Instagram-Teil ist eine Sache von Minuten (nur der Admin-Connect fehlt).
- Der LinkedIn-Teil braucht wegen der LinkedIn-Freigabe **etwas Vorlauf** — daher am besten
  **jetzt** anstoßen, damit es zum Livegang steht.

## Die zwei Fragen, die uns am schnellsten weiterhelfen
1. **Instagram:** Wer ist Admin des @banijaygermany-Business-Kontos + der verknüpften
   Facebook-Seite? (Diese Person macht den Connect-Klick.)
2. **LinkedIn:** Wer ist Admin der Banijay-Germany-Unternehmensseite, und wollen wir die
   offizielle API oder einen Aggregator?
