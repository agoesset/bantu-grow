import Link from 'next/link'
import { Mail } from 'lucide-react'
import { copy } from '@/content/copy'

const navLinks = [
  { href: '/', label: copy.navHome },
  { href: '/produk', label: copy.navProducts },
  { href: '/tentang', label: copy.navAbout },
  { href: '/kontak', label: copy.navContact },
]

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company info */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-lg text-foreground">{copy.companyName}</h3>
            <p className="text-sm text-muted-foreground">{copy.footerDescription}</p>
          </div>

          {/* Navigation links */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Navigasi
            </h3>
            <nav aria-label="Footer navigasi">
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact details */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Kontak
            </h3>
            <a
              href={`mailto:${copy.contactEmail}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label={`Email: ${copy.contactEmail}`}
            >
              <Mail size={14} aria-hidden="true" />
              {copy.contactEmail}
            </a>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center">
          <p className="text-xs text-muted-foreground">{copy.footerRights}</p>
        </div>
      </div>
    </footer>
  )
}
