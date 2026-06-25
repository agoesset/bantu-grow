export interface SocialLink {
  platform: 'instagram' | 'x' | 'github'
  url: string
  label: string
}

/**
 * Social media links configuration.
 * Only links with a non-empty, non-placeholder URL will be displayed in the footer.
 * To hide a link, set its url to an empty string.
 */
export const socialLinks: SocialLink[] = [
  {
    platform: 'instagram',
    url: '', // Set your Instagram URL here, e.g. 'https://instagram.com/bantugrow'
    label: 'Instagram',
  },
  {
    platform: 'x',
    url: '', // Set your X/Twitter URL here, e.g. 'https://x.com/bantugrow'
    label: 'X (Twitter)',
  },
  {
    platform: 'github',
    url: '', // Set your GitHub URL here, e.g. 'https://github.com/bantugrow'
    label: 'GitHub',
  },
]

/**
 * Returns only social links that have a valid (non-empty, non-placeholder) URL.
 */
export function getActiveSocialLinks(): SocialLink[] {
  return socialLinks.filter((link) => {
    if (!link.url || link.url.trim() === '') return false
    // Filter out obvious placeholder URLs
    if (link.url.includes('placeholder') || link.url === '#') return false
    return true
  })
}
