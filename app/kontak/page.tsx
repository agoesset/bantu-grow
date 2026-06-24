import type { Metadata } from 'next'
import { contactMeta } from '@/lib/seo'
import { getAllProducts } from '@/lib/catalog'
import { parseContactSubject } from '@/lib/contact-link'
import { copy } from '@/content/copy'
import { ContactForm } from './ContactForm'

const meta = contactMeta()

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
}

interface PageProps {
  searchParams: Promise<{ produk?: string }>
}

export default async function ContactPage({ searchParams }: PageProps) {
  const params = await searchParams
  const products = getAllProducts()

  // Determine pre-selected product from query param
  const urlParams = new URLSearchParams(params.produk ? `produk=${params.produk}` : '')
  const preSelected = parseContactSubject(urlParams, products)

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
        {copy.contactHeadline}
      </h1>
      <p className="text-muted-foreground mb-8">{copy.contactDescription}</p>

      <ContactForm products={products} preSelectedSlug={preSelected?.slug} />
    </div>
  )
}
