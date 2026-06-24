import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from '../Footer'

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe('Footer', () => {
  it('renders company name', () => {
    render(<Footer />)
    expect(screen.getByText('BantuGrow')).toBeInTheDocument()
  })

  it('renders all four nav links', () => {
    render(<Footer />)
    const nav = screen.getByRole('navigation', { name: /footer navigasi/i })
    expect(nav).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /beranda/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /produk/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /tentang/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /kontak/i })).toBeInTheDocument()
  })

  it('renders the company contact email', () => {
    render(<Footer />)
    const emailLink = screen.getByRole('link', { name: /halo@bantugrow\.id/i })
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', 'mailto:halo@bantugrow.id')
  })

  it('renders footer rights text', () => {
    render(<Footer />)
    expect(screen.getByText(/semua hak dilindungi/i)).toBeInTheDocument()
  })
})
