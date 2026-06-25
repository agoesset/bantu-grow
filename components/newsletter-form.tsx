'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('loading')
    try {
      const { subscribeNewsletter } = await import('@/app/actions/subscribe-newsletter')
      const result = await subscribeNewsletter(email)
      if (result.status === 'success') {
        setStatus('success')
        setMessage('Terima kasih! Anda berhasil berlangganan newsletter kami.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(result.message || 'Terjadi kesalahan. Silakan coba lagi.')
      }
    } catch {
      setStatus('error')
      setMessage('Terjadi kesalahan. Silakan coba lagi.')
    }
  }

  return (
    <div className="w-full">
      {status === 'success' ? (
        <p className="text-sm text-primary font-medium">{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan email Anda"
            required
            className="flex-grow rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            aria-label="Alamat email untuk newsletter"
          />
          <Button type="submit" size="sm" disabled={status === 'loading'}>
            {status === 'loading' ? 'Mengirim...' : 'Langganan'}
            <Send className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
          </Button>
        </form>
      )}
      {status === 'error' && (
        <p className="mt-2 text-xs text-destructive">{message}</p>
      )}
    </div>
  )
}
