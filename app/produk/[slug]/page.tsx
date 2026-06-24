import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getAllProducts, getProductBySlug, buildDetailView } from '@/lib/catalog'
import { buildContactHref } from '@/lib/contact-link'
import { productMeta } from '@/lib/seo'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const products = getAllProducts()
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) {
    return { title: 'Produk Tidak Ditemukan — BantuGrow' }
  }
  const meta = productMeta(product)
  return { title: meta.title, description: meta.description }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const vm = buildDetailView(product)
  const contactHref = buildContactHref(product.slug)

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 max-w-4xl">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <Link href="/produk" className="hover:underline">
          Produk
        </Link>
        <span className="mx-2">/</span>
        <span>{vm.name}</span>
      </nav>

      {/* Product header */}
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-4">{vm.name}</h1>

      {/* Full description */}
      <p className="text-muted-foreground text-base leading-relaxed mb-8">
        {vm.fullDescription}
      </p>

      {/* Features */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-foreground mb-4">Fitur Utama</h2>
        <ul className="flex flex-col gap-3">
          {vm.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle
                className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Product-aware CTA */}
      <div className="rounded-xl bg-primary/5 border p-6 md:p-8 text-center">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Tertarik dengan {vm.name}?
        </h2>
        <p className="text-muted-foreground mb-6">
          Hubungi tim BantuGrow sekarang dan dapatkan informasi lebih lanjut tentang produk ini.
        </p>
        <Link href={contactHref} className={cn(buttonVariants({ size: 'lg' }))}>
          Hubungi Kami
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
