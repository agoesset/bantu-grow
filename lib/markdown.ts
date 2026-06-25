import { marked } from 'marked'

/**
 * Renders markdown string to HTML.
 * Uses the 'marked' library for full markdown support
 * (headings, lists, links, quotes, images, code blocks).
 */
export function renderMarkdown(markdown: string): string {
  return marked.parse(markdown, { async: false }) as string
}

/**
 * Gets rendered HTML from a BlogPost, handling both legacy content (string[])
 * and new contentMarkdown (string) formats.
 */
export function getBlogHtml(post: {
  content: string[]
  contentMarkdown?: string
}): string {
  if (post.contentMarkdown) {
    return renderMarkdown(post.contentMarkdown)
  }
  // Legacy: join paragraphs with double newline and render as markdown
  return renderMarkdown(post.content.join('\n\n'))
}
