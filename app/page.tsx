import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getAllProducts, buildCatalogView } from '@/lib/catalog'
import { homeMeta } from '@/lib/seo'
import { copy } from '@/content/copy'

const meta = homeMeta()

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
}

export default function HomePage() {
  const products = getAllProducts()
  const catalogCards = buildCatalogView(products)

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-b from-primary/5 to-background py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6 text-foreground">
            {copy.heroHeadline}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
            {copy.heroDescription}
          </p>
          <Link href="/kontak" className={cn(buttonVariants({ size: 'lg' }))}>
            {copy.heroCta}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ── Product highlights ── */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-center mb-2 text-foreground">Produk Kami</h2>
          <p className="text-center text-muted-foreground mb-10">
            Solusi digital untuk berbagai kebutuhan UMKM Indonesia
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {catalogCards.map((card) => (
              <Card key={card.slug} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <span className="text-xs font-medium text-primary uppercase tracking-wider mb-1 block">
                    {card.niche}
                  </span>
                  <CardTitle className="text-lg">{card.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{card.shortDescription}</CardDescription>
                  <Link
                    href={card.href}
                    className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                  >
                    Pelajari lebih lanjut
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Value proposition ── */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-2">{copy.valuePropHeadline}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{copy.valuePropDescription}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {copy.valuePropItems.map((item) => (
              <div key={item.title} className="flex flex-col gap-3">
                <CheckCircle className="h-8 w-8 text-primary" aria-hidden="true" />
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Siap Tumbuh Bersama BantuGrow?</h2>
          <p className="mb-8 opacity-90">
            Hubungi kami sekarang dan temukan solusi terbaik untuk bisnis UMKM Anda.
          </p>
          <Link href="/kontak" className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }))}>
            {copy.heroCta}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  )
}
