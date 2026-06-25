import { describe, it, expect } from 'vitest'
import { getAllBlogs, getBlogBySlug } from '../blog'

describe('blog query logic', () => {
  it('returns all mock blog posts', async () => {
    const blogs = await getAllBlogs()
    expect(blogs).toBeDefined()
    expect(blogs.length).toBe(3)
  })

  it('returns the blog post when slug exists', async () => {
    const blog = await getBlogBySlug('cara-mudah-kelola-stok-barang-umkm')
    expect(blog).toBeDefined()
    expect(blog!.slug).toBe('cara-mudah-kelola-stok-barang-umkm')
    expect(blog!.title).toBe('Cara Mudah Mengelola Stok Barang untuk UMKM Ritel')
  })

  it('returns undefined for a non-existent slug', async () => {
    const blog = await getBlogBySlug('non-existent-blog-slug')
    expect(blog).toBeUndefined()
  })
})
