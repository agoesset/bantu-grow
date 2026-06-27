import { describe, it, expect, vi, beforeEach } from 'vitest'

let cookieStore: Record<string, string> = {}

vi.mock('next/headers', () => {
  return {
    cookies: () => ({
      get: (name: string) => cookieStore[name] ? { value: cookieStore[name] } : undefined,
      set: (name: string, value: string) => {
        cookieStore[name] = value
      },
      delete: (name: string) => {
        delete cookieStore[name]
      }
    })
  }
})

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

interface Product {
  slug: string
  name: string
  niche: string
  shortDescription: string
  fullDescription: string
  features: string[]
}

interface BlogPost {
  slug: string
  title: string
  category: string
  date: string
  excerpt: string
  author: string
  content: string[]
}

interface Lead {
  id: string
  receivedAt: string
  name: string
  email: string
  message: string
  productSlug?: string
}

interface DemoRequest {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  productInterest?: string
  preferredTime?: string
  createdAt: string
}

// Gunakan deklarasi global agar tidak bermasalah dengan Vitest hoisting closure
declare global {
  var __mockProducts: Product[]
  var __mockBlogs: BlogPost[]
  var __mockLeads: Lead[]
  var __mockDemoRequests: DemoRequest[]
}

globalThis.__mockProducts = []
globalThis.__mockBlogs = []
globalThis.__mockLeads = []
globalThis.__mockDemoRequests = []

vi.mock('@/lib/db', () => ({
  readProducts: vi.fn().mockImplementation(() => {
    return globalThis.__mockProducts
  }),
  insertProduct: vi.fn().mockImplementation((p: Product) => {
    globalThis.__mockProducts.push(p)
  }),
  updateProduct: vi.fn().mockImplementation((p: Product) => {
    const idx = globalThis.__mockProducts.findIndex((x) => x.slug === p.slug)
    if (idx !== -1) globalThis.__mockProducts[idx] = p
  }),
  deleteProductBySlug: vi.fn().mockImplementation((slug: string) => {
    globalThis.__mockProducts = globalThis.__mockProducts.filter((x) => x.slug !== slug)
  }),
  readBlogs: vi.fn().mockImplementation(() => {
    return globalThis.__mockBlogs
  }),
  insertBlog: vi.fn().mockImplementation((b: BlogPost) => {
    globalThis.__mockBlogs.push(b)
  }),
  updateBlog: vi.fn().mockImplementation((b: BlogPost) => {
    const idx = globalThis.__mockBlogs.findIndex((x) => x.slug === b.slug)
    if (idx !== -1) globalThis.__mockBlogs[idx] = b
  }),
  deleteBlogBySlug: vi.fn().mockImplementation((slug: string) => {
    globalThis.__mockBlogs = globalThis.__mockBlogs.filter((x) => x.slug !== slug)
  }),
  readLeads: vi.fn().mockImplementation(() => {
    return globalThis.__mockLeads
  }),
  insertLead: vi.fn().mockImplementation((l: Lead) => {
    globalThis.__mockLeads.push(l)
  }),
  deleteLeadById: vi.fn().mockImplementation((id: string) => {
    globalThis.__mockLeads = globalThis.__mockLeads.filter((x) => x.id !== id)
  }),
  readDemoRequests: vi.fn().mockImplementation(() => {
    return globalThis.__mockDemoRequests
  }),
  deleteDemoRequestById: vi.fn().mockImplementation((id: string) => {
    globalThis.__mockDemoRequests = globalThis.__mockDemoRequests.filter((x) => x.id !== id)
  }),
}))

import {
  loginAdmin,
  logoutAdmin,
  checkAdminSession,
  saveProduct,
  deleteProduct,
  saveBlog,
  deleteBlog,
  getLeadsList,
  deleteLead,
  getDemoRequestsList,
  deleteDemoRequest
} from '../admin'

describe('Admin Server Actions', () => {
  beforeEach(() => {
    cookieStore = {}
    
    globalThis.__mockProducts = [
      { slug: 'p1', name: 'Product 1', niche: 'n', shortDescription: 's', fullDescription: 'f', features: [] }
    ]
    
    globalThis.__mockBlogs = [
      { slug: 'b1', title: 'Blog 1', category: 'c', date: '2026-06-24', excerpt: 'e', author: 'a', content: [] }
    ]
    
    globalThis.__mockLeads = [
      { id: 'lead-uuid-1', receivedAt: '2026-06-25T00:00:00.000Z', name: 'User', email: 'user@test.com', message: 'Hi' }
    ]

    globalThis.__mockDemoRequests = [
      { id: 'demo-uuid-1', name: 'Demo User', email: 'demouser@test.com', company: 'Test Corp', createdAt: '2026-06-26T00:00:00.000Z' }
    ]
  })

  it('allows login with correct password', async () => {
    const res = await loginAdmin('admin')
    expect(res.success).toBe(true)
    expect(cookieStore['bantugrow_admin_session']).toBe('bantugrow_authenticated_admin')
  })

  it('denies login with incorrect password', async () => {
    const res = await loginAdmin('wrongpass')
    expect(res.success).toBe(false)
    expect(res.error).toBe('Password salah')
    expect(cookieStore['bantugrow_admin_session']).toBeUndefined()
  })

  it('logs out and deletes cookie', async () => {
    cookieStore['bantugrow_admin_session'] = 'bantugrow_authenticated_admin'
    const res = await logoutAdmin()
    expect(res.success).toBe(true)
    expect(cookieStore['bantugrow_admin_session']).toBeUndefined()
  })

  it('checks admin session correctly', async () => {
    expect(await checkAdminSession()).toBe(false)
    cookieStore['bantugrow_admin_session'] = 'bantugrow_authenticated_admin'
    expect(await checkAdminSession()).toBe(true)
  })

  describe('authenticated operations', () => {
    beforeEach(() => {
      cookieStore['bantugrow_admin_session'] = 'bantugrow_authenticated_admin'
    })

    it('saves a new product successfully', async () => {
      const newProduct = { slug: 'p2', name: 'Product 2', niche: 'n', shortDescription: 's', fullDescription: 'f', features: [] }
      const res = await saveProduct(newProduct, true)
      expect(res.success).toBe(true)
      expect(globalThis.__mockProducts).toHaveLength(2)
      expect(globalThis.__mockProducts[1].slug).toBe('p2')
    })

    it('prevents saving product with duplicate slug', async () => {
      const dupProduct = { slug: 'p1', name: 'Product 1 Duplicate', niche: 'n', shortDescription: 's', fullDescription: 'f', features: [] }
      const res = await saveProduct(dupProduct, true)
      expect(res.success).toBe(false)
      expect(res.error).toBe('Slug produk sudah digunakan')
    })

    it('edits an existing product', async () => {
      const updatedProduct = { slug: 'p1', name: 'Product 1 Updated', niche: 'n', shortDescription: 's', fullDescription: 'f', features: [] }
      const res = await saveProduct(updatedProduct, false)
      expect(res.success).toBe(true)
      expect(globalThis.__mockProducts[0].name).toBe('Product 1 Updated')
    })

    it('deletes a product', async () => {
      const res = await deleteProduct('p1')
      expect(res.success).toBe(true)
      expect(globalThis.__mockProducts).toHaveLength(0)
    })

    it('saves a new blog successfully', async () => {
      const newBlog = { slug: 'b2', title: 'Blog 2', category: 'c', date: '2026-06-22', excerpt: 'e', author: 'a', content: [] }
      const res = await saveBlog(newBlog, true)
      expect(res.success).toBe(true)
      expect(globalThis.__mockBlogs).toHaveLength(2)
      expect(globalThis.__mockBlogs[1].slug).toBe('b2')
    })

    it('deletes a blog', async () => {
      const res = await deleteBlog('b1')
      expect(res.success).toBe(true)
      expect(globalThis.__mockBlogs).toHaveLength(0)
    })

    it('gets lead list sorted by date', async () => {
      globalThis.__mockLeads.push({ id: 'lead-uuid-2', receivedAt: '2026-06-26T00:00:00.000Z', name: 'User 2', email: 'user2@test.com', message: 'Hi 2' })
      const res = await getLeadsList()
      expect(res.success).toBe(true)
      expect(res.leads[0].name).toBe('User 2')
    })

    it('deletes a lead by id', async () => {
      const res = await deleteLead('lead-uuid-1')
      expect(res.success).toBe(true)
      expect(globalThis.__mockLeads).toHaveLength(0)
    })

    it('gets demo requests list', async () => {
      const res = await getDemoRequestsList()
      expect(res.success).toBe(true)
      expect(res.demoRequests).toHaveLength(1)
      expect(res.demoRequests[0].name).toBe('Demo User')
    })

    it('deletes a demo request by id', async () => {
      const res = await deleteDemoRequest('demo-uuid-1')
      expect(res.success).toBe(true)
      expect(globalThis.__mockDemoRequests).toHaveLength(0)
    })
  })

  describe('unauthenticated operations prevention', () => {
    it('prevents saving product if not authenticated', async () => {
      const newProduct = { slug: 'p2', name: 'Product 2', niche: 'n', shortDescription: 's', fullDescription: 'f', features: [] }
      const res = await saveProduct(newProduct, true)
      expect(res.success).toBe(false)
      expect(res.error).toBe('Tidak terotorisasi')
    })

    it('prevents deleting product if not authenticated', async () => {
      const res = await deleteProduct('p1')
      expect(res.success).toBe(false)
      expect(res.error).toBe('Tidak terotorisasi')
    })

    it('prevents getting demo requests if not authenticated', async () => {
      const res = await getDemoRequestsList()
      expect(res.success).toBe(false)
      expect(res.error).toBe('Tidak terotorisasi')
    })

    it('prevents deleting demo request if not authenticated', async () => {
      const res = await deleteDemoRequest('demo-uuid-1')
      expect(res.success).toBe(false)
      expect(res.error).toBe('Tidak terotorisasi')
    })
  })
})
