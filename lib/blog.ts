import { type BlogPost } from '@/content/blogs'
import { readBlogs } from '@/lib/db'

export { type BlogPost }

export function getAllBlogs(): BlogPost[] {
  return readBlogs()
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return readBlogs().find((b) => b.slug === slug)
}
