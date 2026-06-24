import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { aboutMeta } from '@/lib/seo'
import { copy } from '@/content/copy'

const meta = aboutMeta()

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">
        {copy.aboutHeadline}
      </h1>

      {/* Mission */}
      <section aria-labelledby="mission-heading" className="mb-10">
        <h2 id="mission-heading" className="text-xl font-semibold text-foreground mb-3">
          {copy.missionHeadline}
        </h2>
        <p className="text-muted-foreground leading-relaxed">{copy.missionText}</p>
      </section>

      {/* UMKM Focus */}
      <section aria-labelledby="umkm-focus-heading" className="mb-10">
        <h2 id="umkm-focus-heading" className="text-xl font-semibold text-foreground mb-3">
          {copy.umkmFocusHeadline}
        </h2>
        <p className="text-muted-foreground leading-relaxed">{copy.umkmFocusText}</p>
      </section>

      {/* Contact channels */}
      <section aria-labelledby="contact-channels-heading" className="mb-10">
        <h2 id="contact-channels-heading" className="text-xl font-semibold text-foreground mb-4">
          {copy.contactChannelsHeadline}
        </h2>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                {copy.contactEmailLabel}
              </span>
              <a
                href={`mailto:${copy.contactEmail}`}
                className="block text-foreground hover:underline font-medium"
                aria-label={`Kirim email ke ${copy.contactEmail}`}
              >
                {copy.contactEmail}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="rounded-xl bg-primary/5 border p-6 text-center mt-8">
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Ingin Tahu Lebih Lanjut?
        </h2>
        <p className="text-muted-foreground mb-4 text-sm">
          Hubungi kami atau jelajahi produk-produk BantuGrow.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/kontak" className={buttonVariants()}>
            Hubungi Kami
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/produk" className={cn(buttonVariants({ variant: 'outline' }))}>
            Lihat Produk
          </Link>
        </div>
      </div>
    </div>
  )
}
