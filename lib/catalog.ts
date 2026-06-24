import { products as defaultProducts, type Product } from '@/content/products'

export { type Product }

export function getAllProducts(): Product[] {
  return defaultProducts
}

export function getProductBySlug(slug: string): Product | undefined {
  return defaultProducts.find((p) => p.slug === slug)
}

export interface ProductCardVM {
  slug: string
  name: string
  shortDescription: string
  niche: string
  href: string
}

export function buildCatalogView(products: Product[]): ProductCardVM[] {
  return products.map((p) => ({
    slug: p.slug,
    name: p.name,
    shortDescription: p.shortDescription,
    niche: p.niche,
    href: `/produk/${p.slug}`,
  }))
}

export interface ProductDetailVM {
  name: string
  fullDescription: string
  features: string[]
  contactHref: string
}

export function buildDetailView(product: Product): ProductDetailVM {
  return {
    name: product.name,
    fullDescription: product.fullDescription,
    features: [...product.features],
    contactHref: `/kontak?produk=${product.slug}`,
  }
}
