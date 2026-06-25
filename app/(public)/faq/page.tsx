import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DecorIcon } from '@/components/decor-icon'
import { faqMetadata } from '@/lib/seo'
import { faqItems } from '@/content/faq'

export const metadata: Metadata = faqMetadata()

export default function FaqPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 md:px-8 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-3 md:text-4xl">
          Pertanyaan yang Sering Diajukan
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
          Temukan jawaban untuk pertanyaan umum seputar BantuGrow dan layanan kami.
        </p>
      </div>

      <div className="relative border-y border-border/80 py-8">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />

        <div className="divide-y divide-border/60">
          {faqItems.map((item, index) => (
            <details
              key={index}
              className="group py-4 first:pt-0 last:pb-0"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-left font-semibold text-foreground text-sm md:text-base hover:text-primary transition-colors list-none [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span className="shrink-0 text-muted-foreground group-open:rotate-45 transition-transform duration-200 text-lg">
                  +
                </span>
              </summary>
              <p className="mt-3 text-muted-foreground text-sm leading-relaxed pr-8">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground text-sm mb-4">
          Tidak menemukan jawaban yang Anda cari?
        </p>
        <Button
          render={<Link href="/kontak" />}
          nativeButton={false}
        >
          Hubungi Kami
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
