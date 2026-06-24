import { readProducts, readBlogs, readLeads } from '@/lib/db'
import Link from 'next/link'
import { ShoppingBag, BookOpen, MessageSquare, ArrowRight, Clock } from 'lucide-react'
import React from 'react'

export default async function AdminDashboardPage() {
  const products = readProducts()
  const blogs = readBlogs()
  const leads = readLeads()

  const stats = [
    {
      label: 'Total Produk',
      value: products.length,
      icon: ShoppingBag,
      color: 'text-primary bg-primary/10',
      href: '/admin/products',
    },
    {
      label: 'Total Artikel',
      value: blogs.length,
      icon: BookOpen,
      color: 'text-orange-500 bg-orange-500/10',
      href: '/admin/blogs',
    },
    {
      label: 'Pesan Masuk (Leads)',
      value: leads.length,
      icon: MessageSquare,
      color: 'text-emerald-500 bg-emerald-500/10',
      href: '/admin/leads',
    },
  ]

  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime())
    .slice(0, 3)

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
          Selamat Datang, Admin!
        </h2>
        <p className="text-sm text-muted-foreground">
          Kelola portofolio produk, artikel wawasan, dan tinjau prospek leads masuk di sini.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Link
              key={idx}
              href={stat.href}
              className="block rounded-xl border border-border/80 bg-card p-6 shadow-sm hover:border-primary/50 hover:shadow-md transition-all duration-300 relative group overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-muted-foreground">
                  {stat.label}
                </span>
                <div className={`p-2.5 rounded-lg ${stat.color} transition-transform group-hover:scale-110 duration-300`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </span>
              </div>
              <div className="mt-4 flex items-center text-xs font-semibold text-primary group-hover:underline">
                Kelola data
                <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          )
        })}
      </div>

      {/* Recent Leads Section */}
      <div className="rounded-xl border border-border/80 bg-card shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-border/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">
              Pesan Masuk Terbaru
            </h3>
          </div>
          <Link
            href="/admin/leads"
            className="inline-flex items-center text-xs font-semibold text-primary hover:underline"
          >
            Lihat Semua Leads
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            Belum ada pesan masuk dari pengunjung website.
          </div>
        ) : (
          <div className="divide-y divide-border/80">
            {recentLeads.map((lead, idx) => (
              <div key={idx} className="p-6 hover:bg-muted/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex flex-col">
                    <span className="font-bold text-foreground text-sm">
                      {lead.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {lead.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>
                      {new Date(lead.receivedAt).toLocaleString('id-ID', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed bg-muted/20 rounded-lg p-3 border border-border/40">
                  {lead.message}
                </p>
                {lead.productSlug && (
                  <div className="mt-3">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                      Produk: {lead.productSlug}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
