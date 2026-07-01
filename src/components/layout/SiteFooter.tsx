import Link from "next/link";
import { NAV_ITEMS, CONTACT, SITE } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container grid gap-12 py-16 lg:grid-cols-[2fr_1fr_1fr] lg:py-20">
        {/* Marke + Claim */}
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/banijay-logo.png" alt="Banijay Germany" className="h-8 w-auto" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">{SITE.tagline}</p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Navigation</h3>
          <ul className="mt-4 space-y-2.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-foreground hover:text-muted-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontakt */}
        <div>
          <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Kontakt</h3>
          <address className="mt-4 space-y-2.5 text-sm not-italic text-foreground">
            <p>
              {CONTACT.street}
              <br />
              {CONTACT.city}
            </p>
            <p>
              <a href={`mailto:${CONTACT.email}`} className="hover:text-muted-foreground">
                {CONTACT.email}
              </a>
            </p>
            <p>{CONTACT.phone}</p>
          </address>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Banijay Germany. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <Link href="/impressum" className="hover:text-foreground">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-foreground">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
