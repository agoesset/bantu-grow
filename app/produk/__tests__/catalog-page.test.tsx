import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

// Mock catalog module to allow test overrides
vi.mock('@/lib/catalog', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/lib/catalog')>()
  return {
    ...original,
    getAllProducts: vi.fn(original.getAllProducts),
    buildCatalogView: vi.fn(original.buildCatalogView),
  }
})

import CatalogPage from '../page'
import * as catalog from '@/lib/catalog'

describe('CatalogPage', () => {
  it('renders the catalog headline', () => {
    render(<CatalogPage />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent(/produk kami/i)
  })

  it('renders product cards when products exist', () => {
    render(<CatalogPage />)
    expect(screen.getByText(/mutaba'ah digital/i)).toBeInTheDocument()
    expect(screen.getByText(/management travel umroh/i)).toBeInTheDocument()
    expect(screen.getByText(/point of sale/i)).toBeInTheDocument()
  })

  it('shows niche labels on product cards', () => {
    render(<CatalogPage />)
    expect(screen.getByText(/ibadah & komunitas/i)).toBeInTheDocument()
  })

  it('renders links to product detail pages', () => {
    render(<CatalogPage />)
    const detailLinks = screen.getAllByRole('link', { name: /lihat detail/i })
    expect(detailLinks.length).toBeGreaterThan(0)
    const hasSlugLink = detailLinks.some((l) => l.getAttribute('href')?.startsWith('/produk/'))
    expect(hasSlugLink).toBe(true)
  })

  it('shows empty-catalog message when there are no products', () => {
    // Override getAllProducts to return empty array
    vi.mocked(catalog.getAllProducts).mockReturnValueOnce([])
    render(<CatalogPage />)
    expect(
      screen.getByText(/belum ada produk yang tersedia/i)
    ).toBeInTheDocument()
  })
})
