import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getAllProducts, buildCatalogView } from '@/lib/catalog'
import { catalogMeta } from '@/lib/seo'
import { copy } from '@/content/copy'

const meta = catalogMeta()

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
}

export default function CatalogPage() {
  const products = getAllProducts()
  const catalogCards = buildCatalogView(products)

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
          {copy.catalogHeadline}
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">{copy.catalogDescription}</p>
      </div>

      {catalogCards.length === 0 ? (
        <div
          role="status"
          aria-live="polite"
          className="text-center py-16 text-muted-foreground"
        >
          <p>{copy.emptyCatalogMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalogCards.map((card) => (
            <Card key={card.slug} className="flex flex-col hover:shadow-md transition-shadow">
              <CardHeader>
                <span className="text-xs font-medium text-primary uppercase tracking-wider mb-1 block">
                  {card.niche}
                </span>
                <CardTitle className="text-lg">{card.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 gap-4">
                <CardDescription className="flex-1">{card.shortDescription}</CardDescription>
                <Link
                  href={card.href}
                  className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'self-start')}
                >
                  Lihat detail
                  <ArrowRight className="ml-1 h-3 w-3" aria-hidden="true" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
