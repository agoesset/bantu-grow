import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { DecorIcon } from '@/components/decor-icon'
import { caseStudiesMetadata } from '@/lib/seo'
import { caseStudies } from '@/content/case-studies'

export const metadata: Metadata = caseStudiesMetadata()

export default function CaseStudiesPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 md:px-8 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-3 md:text-4xl">
          Studi Kasus
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
          Pelajari bagaimana UMKM Indonesia berhasil bertumbuh bersama BantuGrow.
        </p>
      </div>

      <div className="relative border-y border-border/80 py-12">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/studi-kasus/${study.slug}`}
              className="group flex flex-col rounded-lg border border-border/80 p-6 bg-card hover:shadow-md hover:border-primary/30 transition-all"
            >
              <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                {study.niche}
              </span>
              <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {study.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow line-clamp-3">
                {study.challenge}
              </p>
              <div className="flex items-center gap-1 text-sm font-medium text-primary">
                Baca Selengkapnya
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
