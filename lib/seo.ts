import type { Metadata } from 'next'
import type { Product } from '@/content/products'
import type { BlogPost } from '@/content/blogs'

export interface PageMeta {
  title: string
  description: string
}

const SITE_NAME = 'BantuGrow'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bantugrow.id'

function buildMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      url: SITE_URL,
      type: 'website',
      locale: 'id_ID',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export function homeMeta(): PageMeta {
  return {
    title: `${SITE_NAME} — Solusi SaaS untuk UMKM Indonesia`,
    description:
      'BantuGrow menyediakan solusi perangkat lunak (SaaS) yang dirancang khusus untuk membantu UMKM Indonesia berkembang lebih cepat, efisien, dan terorganisir.',
  }
}

export function homeMetadata(): Metadata {
  const meta = homeMeta()
  return buildMetadata(meta.title, meta.description)
}

export function catalogMeta(): PageMeta {
  return {
    title: `Produk Kami — ${SITE_NAME}`,
    description:
      'Jelajahi rangkaian produk SaaS BantuGrow: Mutaba\'ah Digital, Management Travel Umroh, dan Point of Sale (POS). Temukan solusi yang tepat untuk bisnis UMKM Anda.',
  }
}

export function catalogMetadata(): Metadata {
  const meta = catalogMeta()
  return buildMetadata(meta.title, meta.description)
}

export function productMeta(product: Product): PageMeta {
  return {
    title: `${product.name} — ${SITE_NAME}`,
    description: product.shortDescription,
  }
}

export function productMetadata(product: Product): Metadata {
  const meta = productMeta(product)
  return buildMetadata(meta.title, meta.description)
}

export function aboutMeta(): PageMeta {
  return {
    title: `Tentang Kami — ${SITE_NAME}`,
    description:
      `Pelajari misi dan visi ${SITE_NAME}: membantu UMKM Indonesia tumbuh melalui teknologi SaaS yang tepat guna dan terjangkau.`,
  }
}

export function aboutMetadata(): Metadata {
  const meta = aboutMeta()
  return buildMetadata(meta.title, meta.description)
}

export function contactMeta(): PageMeta {
  return {
    title: `Hubungi Kami — ${SITE_NAME}`,
    description:
      `Hubungi tim ${SITE_NAME} untuk informasi produk, demo, atau pertanyaan lainnya. Kami siap membantu bisnis UMKM Anda.`,
  }
}

export function contactMetadata(): Metadata {
  const meta = contactMeta()
  return buildMetadata(meta.title, meta.description)
}

export function blogListMeta(): PageMeta {
  return {
    title: `Blog & Wawasan — ${SITE_NAME}`,
    description:
      'Dapatkan tips praktis, panduan digitalisasi, dan kabar terbaru dari tim BantuGrow untuk bisnis Anda.',
  }
}

export function blogListMetadata(): Metadata {
  const meta = blogListMeta()
  return buildMetadata(meta.title, meta.description)
}

export function blogPostMeta(post: BlogPost): PageMeta {
  return {
    title: `${post.title} — ${SITE_NAME}`,
    description: post.excerpt,
  }
}

export function blogPostMetadata(post: BlogPost): Metadata {
  const meta = blogPostMeta(post)
  return buildMetadata(meta.title, meta.description)
}

export function pricingMeta(): Metadata {
  const title = `Harga & Paket — ${SITE_NAME}`
  const description = 'Pilih paket BantuGrow yang sesuai dengan skala bisnis UMKM Anda. Mulai gratis, tanpa biaya tersembunyi.'
  return buildMetadata(title, description)
}
