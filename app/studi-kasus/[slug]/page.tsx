import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CheckCircle, Quote } from 'lucide-react'
import { DecorIcon } from '@/components/decor-icon'
import { caseStudyMetadata } from '@/lib/seo'
import { caseStudies } from '@/content/case-studies'

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const study = caseStudies.find((s) => s.slug === slug)
  if (!study) return {}
  return caseStudyMetadata(study)
}

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const study = caseStudies.find((s) => s.slug === slug)

  if (!study) {
    notFound()
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 md:px-8 py-12 md:py-16">
      <Link
        href="/studi-kasus"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Kembali ke Studi Kasus
      </Link>

      <div className="relative border-y border-border/80 py-12">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />

        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
          {study.niche}
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mt-2 mb-3">
          {study.title}
        </h1>
        <p className="text-muted-foreground text-sm mb-10">
          Klien: <span className="font-medium text-foreground">{study.client}</span>
        </p>

        {/* Challenge */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-3">Tantangan</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">{study.challenge}</p>
        </section>

        {/* Solution */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-3">Solusi</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">{study.solution}</p>
        </section>

        {/* Results */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-3">Hasil</h2>
          <ul className="space-y-3">
            {study.results.map((result, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">{result}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Testimonial */}
        <section className="mt-10 p-6 bg-primary/5 rounded-lg border border-primary/10">
          <Quote className="h-6 w-6 text-primary/40 mb-3" aria-hidden="true" />
          <blockquote className="text-sm text-foreground italic leading-relaxed mb-4">
            &ldquo;{study.testimonial.quote}&rdquo;
          </blockquote>
          <div>
            <p className="text-sm font-semibold text-foreground">{study.testimonial.name}</p>
            <p className="text-xs text-muted-foreground">{study.testimonial.role}</p>
          </div>
        </section>
      </div>
    </div>
  )
}
