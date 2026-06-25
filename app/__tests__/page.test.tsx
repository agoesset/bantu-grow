import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomePage from '../page'

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe('Home page', () => {
  it('renders a single h1 with the hero headline', async () => {
    const jsx = await HomePage()
    render(jsx)
    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings).toHaveLength(1)
    expect(headings[0]).toHaveTextContent(/tumbuhkan bisnis umkm/i)
  })

  it('renders hero description text', async () => {
    const jsx = await HomePage()
    render(jsx)
    expect(screen.getByText(/solusi perangkat lunak/i)).toBeInTheDocument()
  })

  it('renders a CTA button linking to /kontak', async () => {
    const jsx = await HomePage()
    render(jsx)
    const ctaLinks = screen.getAllByRole('link', { name: /hubungi kami/i })
    const hasKontakLink = ctaLinks.some((l) => l.getAttribute('href') === '/kontak')
    expect(hasKontakLink).toBe(true)
  })

  it('renders product highlights from catalog', async () => {
    const jsx = await HomePage()
    render(jsx)
    expect(screen.getByRole('heading', { level: 3, name: /mutaba'ah digital/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: /management travel umroh/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: /point of sale/i })).toBeInTheDocument()
  })

  it('renders value proposition section', async () => {
    const jsx = await HomePage()
    render(jsx)
    expect(screen.getByText(/mengapa memilih bantugrow/i)).toBeInTheDocument()
  })
})
