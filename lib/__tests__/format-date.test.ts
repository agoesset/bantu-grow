import { describe, it, expect } from 'vitest'
import { formatDate, parseLooseDate } from '../format-date'

describe('formatDate', () => {
  it('formats an ISO date string to a human-readable format', () => {
    const result = formatDate('2026-06-24')
    // The result should contain 24, Jun/Juni, and 2026
    expect(result).toContain('24')
    expect(result).toContain('2026')
  })

  it('formats with default id-ID locale', () => {
    const result = formatDate('2026-01-15')
    expect(result).toContain('15')
    expect(result).toContain('2026')
  })

  it('accepts a custom locale', () => {
    const result = formatDate('2026-06-24', 'en-US')
    expect(result).toContain('24')
    expect(result).toContain('2026')
  })
})

describe('parseLooseDate', () => {
  it('converts "24 Jun 2026" to ISO format "2026-06-24"', () => {
    const result = parseLooseDate('24 Jun 2026')
    expect(result).toBe('2026-06-24')
  })

  it('converts "22 Jun 2026" to ISO format "2026-06-22"', () => {
    const result = parseLooseDate('22 Jun 2026')
    expect(result).toBe('2026-06-22')
  })

  it('converts "18 Jun 2026" to ISO format "2026-06-18"', () => {
    const result = parseLooseDate('18 Jun 2026')
    expect(result).toBe('2026-06-18')
  })

  it('converts "1 Jan 2025" to ISO format "2025-01-01"', () => {
    const result = parseLooseDate('1 Jan 2025')
    expect(result).toBe('2025-01-01')
  })
})
