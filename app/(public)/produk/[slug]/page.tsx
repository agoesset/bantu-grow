import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DecorIcon } from '@/components/decor-icon'
import { cn } from '@/lib/utils'
import { getAllProducts, getProductBySlug, buildDetailView } from '@/lib/catalog'
import { buildContactHref } from '@/lib/contact-link'
import { productMeta } from '@/lib/seo'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) {
    return { title: 'Produk Tidak Ditemukan — BantuGrow' }
  }
  const meta = productMeta(product)
  return { title: meta.title, description: meta.description }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const vm = buildDetailView(product)
  const contactHref = buildContactHref(product.slug)

  return (
    <div className="mx-auto w-full max-w-4xl px-4 md:px-8 py-12 md:py-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
        <Link href="/produk" className="hover:underline hover:text-foreground transition-colors">
          Produk
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{vm.name}</span>
      </nav>

      <div className="relative border-y border-border/80 py-12 mb-12">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />

        {/* Product header */}
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-6 md:text-4xl">{vm.name}</h1>

        {/* Full description */}
        <p className="text-muted-foreground text-base leading-relaxed mb-10 max-w-3xl">
          {vm.fullDescription}
        </p>

        {/* Features */}
        <div className="border border-dashed border-border/80 rounded-lg p-6 md:p-8 bg-card max-w-3xl">
          <h2 className="text-xl font-bold text-foreground mb-6">Fitur Utama</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vm.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle
                  className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span className="text-muted-foreground text-sm leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Product-aware CTA */}
      <div className="relative mx-auto flex w-full max-w-3xl flex-col justify-between gap-y-5 border-y border-border/80 px-6 py-10 dark:bg-[radial-gradient(35%_80%_at_25%_0%,--theme(--color-foreground/.08),transparent)]">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />

        <h2 className="text-center font-extrabold text-xl md:text-2xl text-foreground">
          Tertarik dengan {vm.name}?
        </h2>
        <p className="text-center text-muted-foreground text-sm max-w-lg mx-auto">
          Hubungi tim BantuGrow sekarang dan dapatkan informasi lebih lanjut atau kustomisasi sesuai kebutuhan bisnis Anda.
        </p>
        <div className="flex justify-center pt-2">
          <Button
            size="lg"
            render={<Link href={contactHref} />}
            nativeButton={false}
          >
            Hubungi Kami
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  )
}
