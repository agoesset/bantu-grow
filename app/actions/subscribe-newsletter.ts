'use server'

import { getDb } from '@/lib/db'

export type SubscribeResult =
  | { status: 'success' }
  | { status: 'error'; message: string }

export async function subscribeNewsletter(email: string): Promise<SubscribeResult> {
  // Basic email validation
  const trimmed = email.trim().toLowerCase()
  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return { status: 'error', message: 'Format email tidak valid.' }
  }

  try {
    const db = await getDb()

    // Check if already subscribed
    const existing = await db.get<{ email: string }>(
      'SELECT email FROM newsletter_subscribers WHERE email = ?',
      [trimmed]
    )

    if (existing) {
      return { status: 'success' } // Already subscribed, return success silently
    }

    await db.run(
      'INSERT INTO newsletter_subscribers (email, subscribed_at) VALUES (?, ?)',
      [trimmed, new Date().toISOString()]
    )

    return { status: 'success' }
  } catch (error) {
    console.error('[BantuGrow] Newsletter subscription error:', error)
    return { status: 'error', message: 'Terjadi kesalahan server. Silakan coba lagi.' }
  }
}
