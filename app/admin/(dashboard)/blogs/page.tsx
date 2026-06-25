import { readBlogs } from '@/lib/db'
import { BlogManager } from './BlogManager'
import React from 'react'

export const dynamic = 'force-dynamic'

export default async function AdminBlogsPage() {
  const blogs = await readBlogs()
  return <BlogManager initialBlogs={blogs} />
}
