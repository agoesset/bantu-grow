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
  receivedAt: string
  name: string
  email: string
  message: string
  product?: string
}

// Gunakan deklarasi global agar tidak bermasalah dengan Vitest hoisting closure
declare global {
  var __mockProducts: Product[]
  var __mockBlogs: BlogPost[]
  var __mockLeads: Lead[]
}

globalThis.__mockProducts = []
globalThis.__mockBlogs = []
globalThis.__mockLeads = []

vi.mock('@/lib/db', () => ({
  readProducts: vi.fn().mockImplementation(() => {
    return globalThis.__mockProducts
  }),
  writeProducts: vi.fn().mockImplementation((p) => {
    globalThis.__mockProducts = p
  }),
  readBlogs: vi.fn().mockImplementation(() => {
    return globalThis.__mockBlogs
  }),
  writeBlogs: vi.fn().mockImplementation((b) => {
    globalThis.__mockBlogs = b
  }),
  readLeads: vi.fn().mockImplementation(() => {
    return globalThis.__mockLeads
  }),
  writeLeads: vi.fn().mockImplementation((l) => {
    globalThis.__mockLeads = l
  })
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
  deleteLead
} from '../admin'

describe('Admin Server Actions', () => {
  beforeEach(() => {
    cookieStore = {}
    
    globalThis.__mockProducts = [
      { slug: 'p1', name: 'Product 1', niche: 'n', shortDescription: 's', fullDescription: 'f', features: [] }
    ]
    
    globalThis.__mockBlogs = [
      { slug: 'b1', title: 'Blog 1', category: 'c', date: 'd', excerpt: 'e', author: 'a', content: [] }
    ]
    
    globalThis.__mockLeads = [
      { receivedAt: '2026-06-25T00:00:00.000Z', name: 'User', email: 'user@test.com', message: 'Hi' }
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
      const newBlog = { slug: 'b2', title: 'Blog 2', category: 'c', date: 'd', excerpt: 'e', author: 'a', content: [] }
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
      globalThis.__mockLeads.push({ receivedAt: '2026-06-26T00:00:00.000Z', name: 'User 2', email: 'user2@test.com', message: 'Hi 2' })
      const res = await getLeadsList()
      expect(res.success).toBe(true)
      expect(res.leads[0].name).toBe('User 2')
    })

    it('deletes a lead', async () => {
      const res = await deleteLead('2026-06-25T00:00:00.000Z')
      expect(res.success).toBe(true)
      expect(globalThis.__mockLeads).toHaveLength(0)
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
  })
})
