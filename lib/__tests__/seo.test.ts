import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { homeMeta, catalogMeta, productMeta, type PageMeta } from '../seo'
import type { Product } from '@/content/products'

// Arbitrary for a product with unique slug and name
const productArb = fc.record({
  slug: fc.stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/).filter((s) => s.length > 0),
  name: fc.string({ minLength: 1, maxLength: 80 }).map((s) => s.trim()).filter((s) => s.length > 0),
  niche: fc.string({ minLength: 1 }).map((s) => s.trim()).filter((s) => s.length > 0),
  shortDescription: fc.string({ minLength: 1, maxLength: 300 }).map((s) => s.trim()).filter((s) => s.length > 0),
  fullDescription: fc.string({ minLength: 1 }).map((s) => s.trim()).filter((s) => s.length > 0),
  features: fc.array(fc.string({ minLength: 1 }).map((s) => s.trim()).filter((s) => s.length > 0), { minLength: 1 }),
}) as fc.Arbitrary<Product>

// Catalog of products with unique slugs and names
const catalogArb = fc
  .array(productArb, { minLength: 0, maxLength: 10 })
  .map((products) => {
    const seenSlugs = new Set<string>()
    const seenNames = new Set<string>()
    return products.filter((p) => {
      if (seenSlugs.has(p.slug) || seenNames.has(p.name)) return false
      seenSlugs.add(p.slug)
      seenNames.add(p.name)
      return true
    })
  })

// ─── Property 7: SEO metadata presence and title uniqueness ──────────────────
// Feature: bantugrow-company-profile, Property 7: SEO metadata presence and title uniqueness
describe('SEO metadata builders', () => {
  it(
    'Property 7: all pages produce non-empty title and description, and titles are pairwise distinct',
    () => {
      // Validates: Requirements 9.1
      fc.assert(
        fc.property(catalogArb, (products) => {
          const allMeta: PageMeta[] = [
            homeMeta(),
            catalogMeta(),
            ...products.map((p) => productMeta(p)),
          ]

          // Each meta has non-empty title and description
          for (const meta of allMeta) {
            expect(meta.title.trim().length).toBeGreaterThan(0)
            expect(meta.description.trim().length).toBeGreaterThan(0)
          }

          // All titles are pairwise distinct
          const titles = allMeta.map((m) => m.title)
          const uniqueTitles = new Set(titles)
          expect(uniqueTitles.size).toBe(titles.length)
        }),
        { numRuns: 100 }
      )
    }
  )

  it('homeMeta returns non-empty title and description', () => {
    const meta = homeMeta()
    expect(meta.title).toBeTruthy()
    expect(meta.description).toBeTruthy()
  })

  it('catalogMeta returns non-empty title and description', () => {
    const meta = catalogMeta()
    expect(meta.title).toBeTruthy()
    expect(meta.description).toBeTruthy()
  })

  it('productMeta returns title containing product name', () => {
    const product: Product = {
      slug: 'pos',
      name: 'Point of Sale',
      niche: 'Ritel',
      shortDescription: 'Aplikasi kasir.',
      fullDescription: 'Aplikasi kasir modern.',
      features: ['Fitur 1'],
    }
    const meta = productMeta(product)
    expect(meta.title).toContain('Point of Sale')
    expect(meta.description).toBeTruthy()
  })

  it('homeMeta and catalogMeta have different titles', () => {
    expect(homeMeta().title).not.toBe(catalogMeta().title)
  })
})
