import Link from "next/link";
import { navItems, contact } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink pt-24 pb-10">
      {/* Riesige Wortmarke als Abschluss */}
      <div className="shell">
        <p className="display select-none text-[22vw] leading-[0.7] text-bone/[0.06] md:text-[18vw]">
          Banijay
        </p>

        <div className="mt-12 grid gap-10 border-t border-white/10 pt-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="block h-3.5 w-7 rounded-full bg-magenta" />
              <span className="display text-xl text-bone">Banijay Germany</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-bone/55">
              Die Entertainment-Welt hinter den Momenten, über die Deutschland
              spricht.
            </p>
          </div>

          <div>
            <p className="eyebrow text-bone/40">Navigation</p>
            <ul className="mt-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-bone/70 transition-colors hover:text-magenta">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-bone/40">Kontakt</p>
            <address className="mt-4 space-y-2 text-sm not-italic text-bone/70">
              <p>{contact.address}</p>
              <p>
                <a href={`mailto:${contact.email}`} className="transition-colors hover:text-magenta">
                  {contact.email}
                </a>
              </p>
              <p>{contact.phone}</p>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-bone/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Banijay Germany GmbH</p>
          <div className="flex gap-6">
            <Link href="/impressum" className="transition-colors hover:text-bone">Impressum</Link>
            <Link href="/datenschutz" className="transition-colors hover:text-bone">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
