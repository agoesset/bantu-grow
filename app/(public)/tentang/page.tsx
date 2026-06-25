import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DecorIcon } from '@/components/decor-icon'
import { aboutMeta } from '@/lib/seo'
import { copy } from '@/content/copy'

const meta = aboutMeta()

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
}

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 md:px-8 py-12 md:py-16">
      <div className="relative border-y border-border/80 py-12 mb-12">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />

        <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-8 md:text-4xl">
          {copy.aboutHeadline}
        </h1>

        {/* Mission */}
        <section aria-labelledby="mission-heading" className="mb-10 max-w-2xl">
          <h2 id="mission-heading" className="text-xl font-bold text-foreground mb-3">
            {copy.missionHeadline}
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{copy.missionText}</p>
        </section>

        {/* UMKM Focus */}
        <section aria-labelledby="umkm-focus-heading" className="mb-10 max-w-2xl">
          <h2 id="umkm-focus-heading" className="text-xl font-bold text-foreground mb-3">
            {copy.umkmFocusHeadline}
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{copy.umkmFocusText}</p>
        </section>

        {/* Contact channels */}
        <section aria-labelledby="contact-channels-heading" className="max-w-2xl">
          <h2 id="contact-channels-heading" className="text-xl font-bold text-foreground mb-4">
            {copy.contactChannelsHeadline}
          </h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/5 rounded-lg border border-primary/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  {copy.contactEmailLabel}
                </span>
                <a
                  href={`mailto:${copy.contactEmail}`}
                  className="block text-foreground hover:underline font-semibold text-sm md:text-base"
                  aria-label={`Kirim email ke ${copy.contactEmail}`}
                >
                  {copy.contactEmail}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="relative mx-auto flex w-full max-w-2xl flex-col justify-between gap-y-5 border-y border-border/80 px-6 py-8 dark:bg-[radial-gradient(35%_80%_at_25%_0%,--theme(--color-foreground/.08),transparent)]">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />

        <h2 className="text-center font-extrabold text-xl text-foreground">
          Ingin Tahu Lebih Lanjut?
        </h2>
        <p className="text-center text-muted-foreground text-sm max-w-md mx-auto">
          Hubungi kami sekarang atau jelajahi produk-produk BantuGrow.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button
            render={<Link href="/kontak" />}
            nativeButton={false}
          >
            Hubungi Kami
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            render={<Link href="/produk" />}
            nativeButton={false}
          >
            Lihat Produk
          </Button>
        </div>
      </div>
    </div>
  )
}
