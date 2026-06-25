import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { CallToAction } from '@/components/cta'
import { DecorIcon } from '@/components/decor-icon'
import { cn } from '@/lib/utils'
import { getAllBlogs, getBlogBySlug } from '@/lib/blog'
import { blogPostMeta, blogPostMetadata } from '@/lib/seo'
import { copy } from '@/content/copy'
import { formatDate } from '@/lib/format-date'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const blogs = await getAllBlogs()
  return blogs.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogBySlug(slug)
  if (!post) {
    return { title: 'Artikel Tidak Ditemukan — BantuGrow' }
  }
  return blogPostMetadata(post)
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 md:px-8 py-12 md:py-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
        <Link href="/blog" className="hover:underline hover:text-foreground transition-colors">
          Blog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium line-clamp-1 inline-block max-w-[250px] md:max-w-[400px] align-bottom">
          {post.title}
        </span>
      </nav>

      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/blog"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), "inline-flex items-center gap-1.5")}
        >
          <ArrowLeft className="h-4 w-4" />
          {copy.blogBackToList}
        </Link>
      </div>

      <article className="relative border-y border-border/80 py-12 mb-16 bg-card/10 rounded-lg">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />

        {/* Category & Date */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            {post.category}
          </span>
          <span className="text-muted-foreground text-xs">•</span>
          <span className="text-muted-foreground text-xs">{formatDate(post.date)}</span>
        </div>

        {/* Article title */}
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-6 md:text-4xl leading-tight">
          {post.title}
        </h1>

        {/* Author info */}
        <div className="text-sm text-muted-foreground mb-10 flex items-center gap-2">
          <span>Oleh</span>
          <span className="font-semibold text-foreground">{post.author}</span>
        </div>

        {/* Body content */}
        <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed flex flex-col gap-6">
          {post.content.map((para, idx) => (
            <p key={idx} className="text-base md:text-lg">
              {para}
            </p>
          ))}
        </div>
      </article>

      {/* CTA section */}
      <section className="relative">
        <CallToAction />
      </section>
    </div>
  )
}
