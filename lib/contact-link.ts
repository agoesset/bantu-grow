import type { Product } from '@/content/products'

/**
 * Build the href for the contact CTA button.
 * If a productSlug is provided, includes it as a query param.
 * e.g. /kontak?produk=pos
 */
export function buildContactHref(productSlug?: string): string {
  if (productSlug) {
    return `/kontak?produk=${encodeURIComponent(productSlug)}`
  }
  return '/kontak'
}

/**
 * Parse the `produk` query param from a URLSearchParams and find the matching product.
 * Returns the Product if found, undefined otherwise.
 */
export function parseContactSubject(
  query: URLSearchParams,
  products: Product[]
): Product | undefined {
  const slug = query.get('produk')
  if (!slug) return undefined
  return products.find((p) => p.slug === slug)
}
