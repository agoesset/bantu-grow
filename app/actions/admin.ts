'use server'

import { cookies } from 'next/headers'
import {
  readProducts,
  writeProducts,
  readBlogs,
  writeBlogs,
  readLeads,
  writeLeads
} from '@/lib/db'
import { type Product } from '@/content/products'
import { type BlogPost } from '@/content/blogs'
import { type Lead } from '@/lib/lead-sink'

const ADMIN_COOKIE_NAME = 'bantugrow_admin_session'
const SESSION_TOKEN = 'bantugrow_authenticated_admin'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin'

export async function loginAdmin(password: string): Promise<{ success: boolean; error?: string }> {
  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies()
    cookieStore.set(ADMIN_COOKIE_NAME, SESSION_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: 'strict',
    })
    return { success: true }
  }
  return { success: false, error: 'Password salah' }
}

export async function logoutAdmin(): Promise<{ success: boolean }> {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE_NAME)
  return { success: true }
}

export async function checkAdminSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_COOKIE_NAME)
  return session?.value === SESSION_TOKEN
}

// Product mutators
export async function saveProduct(
  product: Product,
  isNew: boolean
): Promise<{ success: boolean; error?: string }> {
  const isAuthed = await checkAdminSession()
  if (!isAuthed) {
    return { success: false, error: 'Tidak terotorisasi' }
  }

  try {
    const products = readProducts()
    if (isNew) {
      const exists = products.some((p) => p.slug === product.slug)
      if (exists) {
        return { success: false, error: 'Slug produk sudah digunakan' }
      }
      products.push(product)
    } else {
      const idx = products.findIndex((p) => p.slug === product.slug)
      if (idx === -1) {
        return { success: false, error: 'Produk tidak ditemukan' }
      }
      products[idx] = product
    }
    writeProducts(products)
    return { success: true }
  } catch (err) {
    return { success: false, error: (err as Error).message || 'Terjadi kesalahan sistem' }
  }
}

export async function deleteProduct(slug: string): Promise<{ success: boolean; error?: string }> {
  const isAuthed = await checkAdminSession()
  if (!isAuthed) {
    return { success: false, error: 'Tidak terotorisasi' }
  }

  try {
    const products = readProducts()
    const filtered = products.filter((p) => p.slug !== slug)
    writeProducts(filtered)
    return { success: true }
  } catch (err) {
    return { success: false, error: (err as Error).message || 'Terjadi kesalahan sistem' }
  }
}

// Blog mutators
export async function saveBlog(
  post: BlogPost,
  isNew: boolean
): Promise<{ success: boolean; error?: string }> {
  const isAuthed = await checkAdminSession()
  if (!isAuthed) {
    return { success: false, error: 'Tidak terotorisasi' }
  }

  try {
    const blogs = readBlogs()
    if (isNew) {
      const exists = blogs.some((b) => b.slug === post.slug)
      if (exists) {
        return { success: false, error: 'Slug artikel sudah digunakan' }
      }
      blogs.push(post)
    } else {
      const idx = blogs.findIndex((b) => b.slug === post.slug)
      if (idx === -1) {
        return { success: false, error: 'Artikel tidak ditemukan' }
      }
      blogs[idx] = post
    }
    writeBlogs(blogs)
    return { success: true }
  } catch (err) {
    return { success: false, error: (err as Error).message || 'Terjadi kesalahan sistem' }
  }
}

export async function deleteBlog(slug: string): Promise<{ success: boolean; error?: string }> {
  const isAuthed = await checkAdminSession()
  if (!isAuthed) {
    return { success: false, error: 'Tidak terotorisasi' }
  }

  try {
    const blogs = readBlogs()
    const filtered = blogs.filter((b) => b.slug !== slug)
    writeBlogs(filtered)
    return { success: true }
  } catch (err) {
    return { success: false, error: (err as Error).message || 'Terjadi kesalahan sistem' }
  }
}

// Leads
export async function getLeadsList(): Promise<{ success: boolean; leads: Lead[]; error?: string }> {
  const isAuthed = await checkAdminSession()
  if (!isAuthed) {
    return { success: false, leads: [], error: 'Tidak terotorisasi' }
  }

  try {
    const leads = readLeads()
    const sorted = [...leads].sort(
      (a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()
    )
    return { success: true, leads: sorted }
  } catch (err) {
    return { success: false, leads: [], error: (err as Error).message || 'Terjadi kesalahan sistem' }
  }
}

export async function deleteLead(receivedAt: string): Promise<{ success: boolean; error?: string }> {
  const isAuthed = await checkAdminSession()
  if (!isAuthed) {
    return { success: false, error: 'Tidak terotorisasi' }
  }

  try {
    const leads = readLeads()
    const filtered = leads.filter((l) => l.receivedAt !== receivedAt)
    writeLeads(filtered)
    return { success: true }
  } catch (err) {
    return { success: false, error: (err as Error).message || 'Terjadi kesalahan sistem' }
  }
}
