import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ContactForm } from '../ContactForm'
import { products } from '@/content/products'

// Mock the server action
vi.mock('@/app/actions/submit-lead', () => ({
  submitLead: vi.fn().mockResolvedValue({ status: 'success' }),
}))

// Mock React's useActionState to avoid SSR/server action issues in tests
vi.mock('react', async (importOriginal) => {
  const React = await importOriginal<typeof import('react')>()
  return {
    ...React,
    useActionState: (action: unknown, initialState: unknown) => [initialState, vi.fn(), false],
  }
})

describe('ContactForm', () => {
  it('renders name field', () => {
    render(<ContactForm products={products} />)
    expect(screen.getByLabelText(/nama lengkap/i)).toBeInTheDocument()
  })

  it('renders email field', () => {
    render(<ContactForm products={products} />)
    expect(screen.getByLabelText(/alamat email/i)).toBeInTheDocument()
  })

  it('renders message field', () => {
    render(<ContactForm products={products} />)
    expect(screen.getByLabelText(/pesan/i)).toBeInTheDocument()
  })

  it('renders product subject select field', () => {
    render(<ContactForm products={products} />)
    const select = screen.getByRole('combobox', { name: /produk yang diminati/i })
    expect(select).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<ContactForm products={products} />)
    expect(screen.getByRole('button', { name: /kirim pesan/i })).toBeInTheDocument()
  })

  it('pre-selects product when preSelectedSlug is provided', () => {
    render(<ContactForm products={products} preSelectedSlug="pos" />)
    const select = screen.getByRole('combobox', { name: /produk yang diminati/i }) as HTMLSelectElement
    expect(select.value).toBe('pos')
  })

  it('renders all product options in the select', () => {
    render(<ContactForm products={products} />)
    for (const p of products) {
      expect(screen.getByRole('option', { name: p.name })).toBeInTheDocument()
    }
  })
})
