'use client'

import React, { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { saveBlog, deleteBlog } from '@/app/actions/admin'
import { type BlogPost } from '@/content/blogs'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2, X, Check, AlertCircle, Loader2 } from 'lucide-react'
import { formatDate } from '@/lib/format-date'

interface BlogManagerProps {
  initialBlogs: BlogPost[]
}

export function BlogManager({ initialBlogs }: BlogManagerProps) {
  const router = useRouter()
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs)
  const [showForm, setShowForm] = useState(false)
  const [isNew, setIsNew] = useState(true)
  const [loading, setLoading] = useState(false)
  const [isPending, startTransition] = useTransition()

  const [formData, setFormData] = useState<{
    slug: string
    title: string
    category: string
    date: string
    excerpt: string
    author: string
    contentMarkdown: string
  }>({
    slug: '',
    title: '',
    category: '',
    date: '',
    excerpt: '',
    author: 'Tim BantuGrow',
    contentMarkdown: '',
  })

  const [error, setError] = useState<string | null>(null)

  const handleOpenAdd = () => {
    setIsNew(true)
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    const isoDate = `${year}-${month}-${day}`

    setFormData({
      slug: '',
      title: '',
      category: '',
      date: isoDate,
      excerpt: '',
      author: 'Tim BantuGrow',
      contentMarkdown: '',
    })
    setError(null)
    setShowForm(true)
  }

  const handleOpenEdit = (post: BlogPost) => {
    setIsNew(false)
    setFormData({
      slug: post.slug,
      title: post.title,
      category: post.category,
      date: post.date,
      excerpt: post.excerpt,
      author: post.author,
      contentMarkdown: post.content.join('\n\n'),
    })
    setError(null)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setError(null)
  }

  const handleDelete = async (slug: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus artikel blog ini?')) {
      return
    }

    try {
      const res = await deleteBlog(slug)
      if (res.success) {
        setBlogs(blogs.filter((b) => b.slug !== slug))
        startTransition(() => {
          router.refresh()
        })
      } else {
        alert(res.error || 'Gagal menghapus artikel')
      }
    } catch (err) {
      alert('Terjadi kesalahan koneksi')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // Validasi dasar
    if (!formData.slug.trim() || !formData.title.trim() || !formData.category.trim() || !formData.author.trim()) {
      setError('Slug, judul, kategori, dan penulis artikel wajib diisi.')
      setLoading(false)
      return
    }

    // Memecah markdown text/paragraf berdasarkan double line break (\n\n)
    const content = formData.contentMarkdown
      .split('\n\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0)

    if (content.length === 0) {
      setError('Isi artikel tidak boleh kosong.')
      setLoading(false)
      return
    }

    const payload: BlogPost = {
      slug: formData.slug.trim(),
      title: formData.title.trim(),
      category: formData.category.trim(),
      date: formData.date.trim(),
      excerpt: formData.excerpt.trim(),
      author: formData.author.trim(),
      content,
    }

    try {
      const res = await saveBlog(payload, isNew)
      if (res.success) {
        if (isNew) {
          setBlogs([...blogs, payload])
        } else {
          setBlogs(blogs.map((b) => (b.slug === payload.slug ? payload : b)))
        }
        setShowForm(false)
        startTransition(() => {
          router.refresh()
        })
      } else {
        setError(res.error || 'Gagal menyimpan artikel')
      }
    } catch (err) {
      setError('Terjadi kesalahan jaringan/server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
            Kelola Blog
          </h2>
          <p className="text-sm text-muted-foreground">
            Tulis, ubah, atau hapus artikel wawasan BantuGrow untuk publikasi website.
          </p>
        </div>
        {!showForm && (
          <Button onClick={handleOpenAdd} className="inline-flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Tulis Artikel
          </Button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="border border-border/80 bg-card rounded-xl p-6 shadow-sm space-y-6 relative overflow-hidden dark:bg-[radial-gradient(30%_30%_at_100%_0%,--theme(--color-primary/.04),transparent)]">
          <div className="flex items-center justify-between border-b border-border/80 pb-4 mb-4">
            <h3 className="text-lg font-bold text-foreground">
              {isNew ? 'Tulis Artikel Baru' : 'Ubah Detail Artikel'}
            </h3>
            <button
              type="button"
              onClick={handleCloseForm}
              className="p-1.5 rounded-lg hover:bg-muted dark:hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive animate-in fade-in">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 col-span-1">
              <label htmlFor="slug" className="text-sm font-semibold text-foreground">
                Slug Artikel (Contoh: tips-kelola-keuangan)
              </label>
              <input
                id="slug"
                type="text"
                disabled={!isNew}
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                placeholder="Masukkan slug unik"
                className="block w-full rounded-lg border border-input bg-transparent py-2 px-3 text-sm placeholder-muted-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary text-foreground disabled:opacity-50"
              />
            </div>

            <div className="space-y-2 col-span-1">
              <label htmlFor="category" className="text-sm font-semibold text-foreground">
                Kategori Artikel
              </label>
              <input
                id="category"
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Contoh: Bisnis, UMKM, Teknologi"
                className="block w-full rounded-lg border border-input bg-transparent py-2 px-3 text-sm placeholder-muted-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary text-foreground"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="title" className="text-sm font-semibold text-foreground">
                Judul Artikel
              </label>
              <input
                id="title"
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Masukkan judul artikel yang menarik"
                className="block w-full rounded-lg border border-input bg-transparent py-2 px-3 text-sm placeholder-muted-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary text-foreground font-semibold"
              />
            </div>

            <div className="space-y-2 col-span-1">
              <label htmlFor="author" className="text-sm font-semibold text-foreground">
                Penulis
              </label>
              <input
                id="author"
                type="text"
                required
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="Nama penulis artikel"
                className="block w-full rounded-lg border border-input bg-transparent py-2 px-3 text-sm placeholder-muted-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary text-foreground"
              />
            </div>

            <div className="space-y-2 col-span-1">
              <label htmlFor="date" className="text-sm font-semibold text-foreground">
                Tanggal Rilis (Format Bebas)
              </label>
              <input
                id="date"
                type="text"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder="Contoh: 25 Jun 2026"
                className="block w-full rounded-lg border border-input bg-transparent py-2 px-3 text-sm placeholder-muted-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary text-foreground"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="excerpt" className="text-sm font-semibold text-foreground">
                Kutipan Singkat (Excerpt)
              </label>
              <input
                id="excerpt"
                type="text"
                required
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Kutipan singkat penarik minat pembaca untuk ringkasan kartu"
                className="block w-full rounded-lg border border-input bg-transparent py-2 px-3 text-sm placeholder-muted-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary text-foreground"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="contentMarkdown" className="text-sm font-semibold text-foreground flex flex-col">
                <span>Isi Artikel Lengkap</span>
                <span className="text-xs text-muted-foreground font-normal mt-0.5">
                  Gunakan **jarak baris ganda (dua kali enter)** untuk memisahkan antar-paragraf di website.
                </span>
              </label>
              <textarea
                id="contentMarkdown"
                rows={12}
                required
                value={formData.contentMarkdown}
                onChange={(e) => setFormData({ ...formData, contentMarkdown: e.target.value })}
                placeholder="Tuliskan isi paragraf artikel di sini...&#10;&#10;Ini adalah contoh paragraf kedua setelah menekan enter dua kali."
                className="block w-full rounded-lg border border-input bg-transparent py-2.5 px-3 text-sm placeholder-muted-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary text-foreground resize-y leading-relaxed"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-border/80 pt-4 mt-6">
            <Button type="button" variant="outline" onClick={handleCloseForm}>
              Batal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Simpan Artikel
                </>
              )}
            </Button>
          </div>
        </form>
      )}

      {/* Blogs list table */}
      <div className="rounded-xl border border-border/80 bg-card shadow-sm overflow-hidden">
        {blogs.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            Belum ada artikel blog di database. Klik tombol &quot;Tulis Artikel&quot; untuk memulai.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/40 border-b border-border/80 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  <th className="px-6 py-4">Judul / Slug</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4 hidden md:table-cell">Penulis & Tanggal</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/80 text-sm text-foreground">
                {blogs.map((post) => (
                  <tr key={post.slug} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col max-w-sm">
                        <span className="font-bold text-foreground text-sm line-clamp-1">
                          {post.title}
                        </span>
                        <span className="text-xs text-muted-foreground font-mono">
                          /blog/{post.slug}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell text-muted-foreground text-xs">
                      <div className="flex flex-col">
                        <span>Oleh: <strong className="text-foreground">{post.author}</strong></span>
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenEdit(post)}
                          aria-label={`Ubah artikel ${post.title}`}
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(post.slug)}
                          aria-label={`Hapus artikel ${post.title}`}
                          className="h-8 w-8 text-destructive hover:bg-destructive/5"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
