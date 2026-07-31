import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { get } from "@vercel/edge-config";

/*
  ──────────────────────────────────────────────────────────────────────────
  WARTUNGSMODUS — Schalter via Vercel Edge Config
  ──────────────────────────────────────────────────────────────────────────
  Steht im Edge-Config-Store der Key `maintenance` auf `true`, wird JEDER
  Request auf /wartung umgeschrieben (Rewrite, nicht Redirect → die
  aufgerufene URL bleibt stehen, Deep-Links funktionieren nach der Wartung
  sofort wieder). Umschalten passiert in der Vercel-UI und wirkt ohne
  Redeploy.

  Die Originalseite wird dabei nicht verändert — sie liegt im selben
  Deployment und ist eine Flag-Änderung entfernt.

  Hinweis Next 16: `middleware.ts` ist deprecated und heißt jetzt `proxy.ts`.
  Der Proxy läuft per Default in der Node.js-Runtime; ein `runtime`-Export
  in dieser Datei würde einen Fehler werfen.
  ──────────────────────────────────────────────────────────────────────────
*/

const MAINTENANCE_PATH = "/wartung";
const BYPASS_COOKIE = "bj-bypass";
const BYPASS_PARAM = "preview";

/**
 * Liest das Wartungs-Flag. FAIL-OPEN: fehlt die EDGE_CONFIG-Verbindung
 * (lokal, Preview) oder wirft der Read einen Fehler, gilt `false` — ein
 * kaputter Store darf die Seite niemals abschalten.
 */
async function isMaintenanceOn(): Promise<boolean> {
  // Lokaler Test / Notfall: MAINTENANCE_MODE=1 erzwingt die Wartungsseite auch
  // ohne Edge Config. In Production bleibt das Flag im Store der Schalter.
  if (process.env.MAINTENANCE_MODE === "1") return true;
  if (!process.env.EDGE_CONFIG) return false;
  try {
    return (await get<boolean>("maintenance")) === true;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Bypass-Link: /?preview=<TOKEN> setzt das Cookie und leitet auf dieselbe
  // URL ohne Param um — danach ist die echte Seite normal browsbar.
  const token = process.env.MAINTENANCE_BYPASS_TOKEN;
  const provided = searchParams.get(BYPASS_PARAM);
  if (token && provided && provided === token) {
    const clean = request.nextUrl.clone();
    clean.searchParams.delete(BYPASS_PARAM);
    const response = NextResponse.redirect(clean);
    response.cookies.set({
      name: BYPASS_COOKIE,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: request.nextUrl.protocol === "https:",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  }

  if (!(await isMaintenanceOn())) return NextResponse.next();

  // Bereits freigeschaltet → echte Seite durchlassen.
  if (token && request.cookies.get(BYPASS_COOKIE)?.value === token) {
    return NextResponse.next();
  }

  // Die Wartungsseite selbst nie umschreiben (sonst Rewrite-Schleife).
  if (pathname === MAINTENANCE_PATH) return NextResponse.next();

  const target = request.nextUrl.clone();
  target.pathname = MAINTENANCE_PATH;
  target.search = "";

  return NextResponse.rewrite(target, {
    status: 503,
    headers: {
      "Retry-After": "86400",
      "X-Robots-Tag": "noindex",
      "Cache-Control": "no-store, must-revalidate",
    },
  });
}

export const config = {
  // Statische Assets und die Brand-/Font-Dateien der Wartungsseite bleiben
  // erreichbar, sonst lädt die Seite ohne Logo und ohne Schrift.
  matcher: "/((?!_next/static|_next/image|favicon.ico|brand/|fonts/).*)",
};
