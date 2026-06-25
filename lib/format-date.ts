/**
 * Formats an ISO date string (e.g., '2026-06-24') to a human-readable format.
 * Default locale is 'id-ID' with day + short month + year (e.g., '24 Jun 2026').
 */
export function formatDate(isoString: string, locale: string = 'id-ID'): string {
  const date = new Date(isoString)
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

/**
 * Converts a free-format date string like '24 Jun 2026' to ISO format '2026-06-24'.
 * Useful for migration/seeding purposes.
 */
export function parseLooseDate(dateStr: string): string {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
