import { type BlogPost } from '@/content/blogs'
import { readBlogs } from '@/lib/db'

export { type BlogPost }

export async function getAllBlogs(): Promise<BlogPost[]> {
  const blogs = await readBlogs()
  return blogs.sort((a, b) => b.date.localeCompare(a.date))
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | undefined> {
  const blogs = await readBlogs()
  return blogs.find((b) => b.slug === slug)
}
