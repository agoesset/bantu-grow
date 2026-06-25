import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { DecorIcon } from '@/components/decor-icon'
import { CallToAction } from '@/components/cta'
import { cn } from '@/lib/utils'
import { getAllProducts, buildCatalogView } from '@/lib/catalog'
import { catalogMetadata } from '@/lib/seo'
import { copy } from '@/content/copy'

export const metadata: Metadata = catalogMetadata()

export default async function CatalogPage() {
  const products = await getAllProducts()
  const catalogCards = buildCatalogView(products)

  return (
    <div className="mx-auto w-full max-w-5xl px-4 md:px-8 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-3 md:text-4xl">
          {copy.catalogHeadline}
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">{copy.catalogDescription}</p>
      </div>

      <div className="relative border-y border-border/80 py-12 mb-16">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />

        {catalogCards.length === 0 ? (
          <div
            role="status"
            aria-live="polite"
            className="text-center py-16 text-muted-foreground"
          >
            <p>{copy.emptyCatalogMessage}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-dashed divide-border/80 border border-dashed border-border/80 rounded-lg overflow-hidden bg-card">
            {catalogCards.map((card) => (
              <div key={card.slug} className="flex flex-col p-6 md:p-8 hover:bg-muted/10 transition-colors">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                  {card.niche}
                </span>
                <h2 className="text-lg font-bold text-foreground mb-3">{card.name}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">{card.shortDescription}</p>
                <Link
                  href={card.href}
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "self-start mt-auto")}
                >
                  Lihat Detail
                  <ArrowRight className="ml-1 h-3.5 w-3.5 text-primary" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <CallToAction />
      </div>
    </div>
  )
}
