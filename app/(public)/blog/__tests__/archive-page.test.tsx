import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import BlogArchivePage from '../page'

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe('BlogArchivePage', () => {
  it('renders the blog headline', async () => {
    const jsx = await BlogArchivePage()
    render(jsx)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent(/artikel & wawasan terbaru/i)
  })

  it('renders blog post cards', async () => {
    const jsx = await BlogArchivePage()
    render(jsx)
    expect(screen.getByText(/cara mudah mengelola stok barang untuk umkm ritel/i)).toBeInTheDocument()
    expect(screen.getByText(/strategi efisiensi operasional biro perjalanan umroh/i)).toBeInTheDocument()
    expect(screen.getByText(/meningkatkan konsistensi ibadah komunitas di era digital/i)).toBeInTheDocument()
  })

  it('renders author names and dates', async () => {
    const jsx = await BlogArchivePage()
    render(jsx)
    expect(screen.getByText(/tim retail bantugrow/i)).toBeInTheDocument()
    expect(screen.getByText(/24 Jun 2026/i)).toBeInTheDocument()
  })

  it('renders links to blog detail pages', async () => {
    const jsx = await BlogArchivePage()
    render(jsx)
    const detailLinks = screen.getAllByRole('link')
    // We expect some links to point to blog details
    const hasBlogSlugLink = detailLinks.some((l) => l.getAttribute('href')?.startsWith('/blog/'))
    expect(hasBlogSlugLink).toBe(true)
  })

  it('renders CTA banner at the bottom', async () => {
    const jsx = await BlogArchivePage()
    render(jsx)
    expect(screen.getByText(/siap tumbuh bersama bantugrow\?/i)).toBeInTheDocument()
  })
})
