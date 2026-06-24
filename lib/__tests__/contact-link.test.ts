import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { buildContactHref, parseContactSubject } from '../contact-link'
import type { Product } from '@/content/products'

// Arbitrary for a product with a URL-safe slug
const productArb = fc.record({
  slug: fc.stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/).filter((s) => s.length > 0),
  name: fc.string({ minLength: 1 }),
  niche: fc.string({ minLength: 1 }),
  shortDescription: fc.string({ minLength: 1 }),
  fullDescription: fc.string({ minLength: 1 }),
  features: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
}) as fc.Arbitrary<Product>

// Catalog with unique slugs
const catalogArb = fc
  .array(productArb, { minLength: 1, maxLength: 10 })
  .map((products) => {
    const seen = new Set<string>()
    return products.filter((p) => {
      if (seen.has(p.slug)) return false
      seen.add(p.slug)
      return true
    })
  })
  .filter((products) => products.length > 0)

// ─── Property 4: Contact-CTA product round trip ───────────────────────────────
// Feature: bantugrow-company-profile, Property 4: Contact-CTA product round trip
describe('buildContactHref / parseContactSubject round trip', () => {
  it(
    'Property 4: round-trips any product slug through buildContactHref -> parseContactSubject',
    () => {
      // Validates: Requirements 4.2, 5.5
      fc.assert(
        fc.property(catalogArb, (products) => {
          for (const product of products) {
            const href = buildContactHref(product.slug)
            // Extract the query string from the href
            const url = new URL(href, 'http://localhost')
            const recovered = parseContactSubject(url.searchParams, products)

            expect(recovered).toBeDefined()
            expect(recovered!.slug).toBe(product.slug)
          }
        }),
        { numRuns: 100 }
      )
    }
  )

  it(
    'Property 4: buildContactHref(undefined) parses back to no pre-selected subject',
    () => {
      // Validates: Requirements 4.2, 5.5
      fc.assert(
        fc.property(catalogArb, (products) => {
          const href = buildContactHref(undefined)
          const url = new URL(href, 'http://localhost')
          const recovered = parseContactSubject(url.searchParams, products)
          expect(recovered).toBeUndefined()
        }),
        { numRuns: 100 }
      )
    }
  )
})

describe('buildContactHref', () => {
  it('returns /kontak without query when no slug given', () => {
    expect(buildContactHref()).toBe('/kontak')
  })

  it('returns /kontak?produk=pos for slug "pos"', () => {
    expect(buildContactHref('pos')).toBe('/kontak?produk=pos')
  })
})
