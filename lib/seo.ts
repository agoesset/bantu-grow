import type { Product } from '@/content/products'
import type { BlogPost } from '@/content/blogs'

export interface PageMeta {
  title: string
  description: string
}

const SITE_NAME = 'BantuGrow'

export function homeMeta(): PageMeta {
  return {
    title: `${SITE_NAME} — Solusi SaaS untuk UMKM Indonesia`,
    description:
      'BantuGrow menyediakan solusi perangkat lunak (SaaS) yang dirancang khusus untuk membantu UMKM Indonesia berkembang lebih cepat, efisien, dan terorganisir.',
  }
}

export function catalogMeta(): PageMeta {
  return {
    title: `Produk Kami — ${SITE_NAME}`,
    description:
      'Jelajahi rangkaian produk SaaS BantuGrow: Mutaba\'ah Digital, Management Travel Umroh, dan Point of Sale (POS). Temukan solusi yang tepat untuk bisnis UMKM Anda.',
  }
}

export function productMeta(product: Product): PageMeta {
  return {
    title: `${product.name} — ${SITE_NAME}`,
    description: product.shortDescription,
  }
}

export function aboutMeta(): PageMeta {
  return {
    title: `Tentang Kami — ${SITE_NAME}`,
    description:
      `Pelajari misi dan visi ${SITE_NAME}: membantu UMKM Indonesia tumbuh melalui teknologi SaaS yang tepat guna dan terjangkau.`,
  }
}

export function contactMeta(): PageMeta {
  return {
    title: `Hubungi Kami — ${SITE_NAME}`,
    description:
      `Hubungi tim ${SITE_NAME} untuk informasi produk, demo, atau pertanyaan lainnya. Kami siap membantu bisnis UMKM Anda.`,
  }
}

export function blogListMeta(): PageMeta {
  return {
    title: `Blog & Wawasan — ${SITE_NAME}`,
    description:
      'Dapatkan tips praktis, panduan digitalisasi, dan kabar terbaru dari tim BantuGrow untuk bisnis Anda.',
  }
}

export function blogPostMeta(post: BlogPost): PageMeta {
  return {
    title: `${post.title} — ${SITE_NAME}`,
    description: post.excerpt,
  }
}

