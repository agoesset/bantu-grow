import type { Metadata } from 'next'
import { Outfit, Plus_Jakarta_Sans, Geist_Mono } from 'next/font/google'
import './globals.css'
import { WhatsAppFab } from '@/components/whatsapp-fab'
import { ThemeProvider } from '@/components/theme-provider'

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
})

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'BantuGrow — Solusi SaaS untuk UMKM Indonesia',
  description:
    'BantuGrow menyediakan solusi perangkat lunak (SaaS) yang dirancang khusus untuk membantu UMKM Indonesia berkembang lebih cepat, efisien, dan terorganisir.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      className={`${outfit.variable} ${jakarta.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Plausible Analytics (privacy-friendly, no cookies)
          To activate: uncomment the script below and set data-domain to your actual domain.
          Sign up at https://plausible.io and add your domain there.
        */}
        {/* <script defer data-domain="bantugrow.id" src="https://plausible.io/js/script.js"></script> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('color-scheme');
                if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <main className="flex-1">{children}</main>
          <WhatsAppFab />
        </ThemeProvider>
      </body>
    </html>
  )
}
