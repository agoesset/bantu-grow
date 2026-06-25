'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import {
  readProducts,
  insertProduct,
  updateProduct,
  deleteProductBySlug,
  readBlogs,
  insertBlog,
  updateBlog,
  deleteBlogBySlug,
  readLeads,
  deleteLeadById,
} from '@/lib/db'
import { type Product } from '@/content/products'
import { type BlogPost } from '@/content/blogs'
import { type Lead } from '@/lib/lead-sink'

const ADMIN_COOKIE_NAME = 'bantugrow_admin_session'

// In production, ADMIN_PASSWORD must be set via environment variable.
// In non-production environments, fall back to 'admin' for development convenience.
function getAdminPassword(): string {
  const envPassword = process.env.ADMIN_PASSWORD
  if (envPassword) return envPassword
  if (process.env.NODE_ENV === 'production') {
    throw new Error('ADMIN_PASSWORD environment variable is required in production')
  }
  return 'admin'
}

// In-memory store of valid session tokens
const validTokens = new Set<string>()

// Legacy static token accepted only in non-production for backward compatibility (tests)
const LEGACY_TOKEN = 'bantugrow_authenticated_admin'

// ─── Login Rate Limiting ───────────────────────────────────────────────────────
const LOGIN_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const LOGIN_RATE_LIMIT_MAX = 5
const loginAttemptMap = new Map<string, number[]>()

function isLoginRateLimited(key: string): boolean {
  const now = Date.now()
  const timestamps = loginAttemptMap.get(key) ?? []
  const recent = timestamps.filter((t) => now - t < LOGIN_RATE_LIMIT_WINDOW_MS)
  loginAttemptMap.set(key, recent)

  if (recent.length >= LOGIN_RATE_LIMIT_MAX) {
    return true
  }
  recent.push(now)
  loginAttemptMap.set(key, recent)
  return false
}

export async function loginAdmin(password: string): Promise<{ success: boolean; error?: string }> {
  // Rate limit login attempts (keyed by a generic constant since we don't have IP in server actions easily)
  if (isLoginRateLimited('global')) {
    return { success: false, error: 'Terlalu banyak percobaan login. Coba lagi dalam 15 menit.' }
  }

  if (password === getAdminPassword()) {
    // In production, use random session tokens for security.
    // In non-production, use a static token for test compatibility.
    const token =
      process.env.NODE_ENV === 'production' ? crypto.randomUUID() : LEGACY_TOKEN
    validTokens.add(token)

    const cookieStore = await cookies()
    cookieStore.set(ADMIN_COOKIE_NAME, token, {
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
  const session = cookieStore.get(ADMIN_COOKIE_NAME)
  if (session?.value) {
    validTokens.delete(session.value)
  }
  cookieStore.delete(ADMIN_COOKIE_NAME)
  return { success: true }
}

export async function checkAdminSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_COOKIE_NAME)
  if (!session?.value) return false

  // Check if the token is in our valid tokens set
  if (validTokens.has(session.value)) return true

  // In non-production, accept legacy static token for backward compatibility
  if (process.env.NODE_ENV !== 'production' && session.value === LEGACY_TOKEN) {
    return true
  }

  return false
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
    if (isNew) {
      const products = await readProducts()
      const exists = products.some((p) => p.slug === product.slug)
      if (exists) {
        return { success: false, error: 'Slug produk sudah digunakan' }
      }
      await insertProduct(product)
    } else {
      await updateProduct(product)
    }
    revalidatePath('/produk', 'page')
    revalidatePath('/admin', 'layout')
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
    await deleteProductBySlug(slug)
    revalidatePath('/produk', 'page')
    revalidatePath('/admin', 'layout')
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
    if (isNew) {
      const blogs = await readBlogs()
      const exists = blogs.some((b) => b.slug === post.slug)
      if (exists) {
        return { success: false, error: 'Slug artikel sudah digunakan' }
      }
      await insertBlog(post)
    } else {
      await updateBlog(post)
    }
    revalidatePath('/blog', 'page')
    revalidatePath('/admin', 'layout')
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
    await deleteBlogBySlug(slug)
    revalidatePath('/blog', 'page')
    revalidatePath('/admin', 'layout')
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
    const leads = await readLeads()
    const sorted = [...leads].sort(
      (a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()
    )
    return { success: true, leads: sorted }
  } catch (err) {
    return { success: false, leads: [], error: (err as Error).message || 'Terjadi kesalahan sistem' }
  }
}

export async function deleteLead(id: string): Promise<{ success: boolean; error?: string }> {
  const isAuthed = await checkAdminSession()
  if (!isAuthed) {
    return { success: false, error: 'Tidak terotorisasi' }
  }

  try {
    await deleteLeadById(id)
    revalidatePath('/admin', 'layout')
    return { success: true }
  } catch (err) {
    return { success: false, error: (err as Error).message || 'Terjadi kesalahan sistem' }
  }
}
