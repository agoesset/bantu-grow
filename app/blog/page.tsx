import type { Metadata } from 'next'
import { BlogsSection } from '@/components/blogs-section'
import { CallToAction } from '@/components/cta'
import { getAllBlogs } from '@/lib/blog'
import { blogListMetadata } from '@/lib/seo'

export const metadata: Metadata = blogListMetadata()

export default async function BlogArchivePage() {
  const posts = await getAllBlogs()

  return (
    <div className="mx-auto w-full max-w-5xl px-4 md:px-8 py-12 md:py-16 flex flex-col gap-16">
      {/* Blog section */}
      <section className="relative">
        <BlogsSection posts={posts} />
      </section>

      {/* CTA section */}
      <section className="relative">
        <CallToAction />
      </section>
    </div>
  )
}
