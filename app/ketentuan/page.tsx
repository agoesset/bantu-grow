import type { Metadata } from 'next'
import { DecorIcon } from '@/components/decor-icon'
import { termsMetadata } from '@/lib/seo'

export const metadata: Metadata = termsMetadata()

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 md:px-8 py-12 md:py-16">
      <div className="relative border-y border-border/80 py-12">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />

        <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-8 md:text-4xl">
          Syarat & Ketentuan
        </h1>

        <div className="prose prose-sm md:prose-base prose-neutral dark:prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            Terakhir diperbarui: Januari 2024
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">1. Penerimaan Syarat</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Dengan mengakses dan menggunakan layanan BantuGrow, Anda menyetujui untuk terikat oleh
            syarat dan ketentuan ini. Jika Anda tidak menyetujui salah satu bagian dari syarat ini,
            Anda tidak diperkenankan menggunakan layanan kami.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">2. Deskripsi Layanan</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            BantuGrow menyediakan platform perangkat lunak berbasis cloud (SaaS) yang dirancang untuk
            membantu UMKM Indonesia mengelola operasional bisnis mereka. Layanan kami mencakup namun
            tidak terbatas pada manajemen penjualan, pencatatan, dan pelaporan.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">3. Akun Pengguna</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Untuk menggunakan layanan kami, Anda harus:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
            <li>Membuat akun dengan informasi yang akurat dan lengkap</li>
            <li>Menjaga kerahasiaan kredensial akun Anda</li>
            <li>Bertanggung jawab atas semua aktivitas di akun Anda</li>
            <li>Memberitahukan kami segera jika terjadi penggunaan tidak sah</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">4. Pembayaran dan Penagihan</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Biaya berlangganan ditagihkan sesuai paket yang Anda pilih. Pembayaran dilakukan di muka
            untuk periode berlangganan yang dipilih. Kami berhak mengubah harga dengan pemberitahuan
            minimal 30 hari sebelumnya.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">5. Penggunaan yang Dilarang</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Anda tidak diperkenankan menggunakan layanan kami untuk:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
            <li>Aktivitas yang melanggar hukum yang berlaku di Indonesia</li>
            <li>Menyebarkan malware atau konten berbahaya</li>
            <li>Mengganggu atau merusak infrastruktur layanan</li>
            <li>Menyalahgunakan data pengguna lain</li>
            <li>Melakukan reverse engineering terhadap platform kami</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">6. Kepemilikan Data</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Anda mempertahankan semua hak atas data yang Anda masukkan ke dalam platform kami.
            BantuGrow tidak mengklaim kepemilikan atas konten atau data bisnis Anda. Kami hanya
            menggunakan data tersebut untuk menyediakan layanan sesuai perjanjian ini.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">7. Pembatasan Tanggung Jawab</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            BantuGrow menyediakan layanan &quot;sebagaimana adanya&quot; dan tidak memberikan jaminan
            bahwa layanan akan selalu tersedia tanpa gangguan. Tanggung jawab maksimal kami terbatas
            pada jumlah yang Anda bayarkan dalam 12 bulan terakhir.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">8. Penghentian Layanan</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Kami berhak menangguhkan atau menghentikan akun Anda jika terjadi pelanggaran terhadap
            syarat dan ketentuan ini. Anda juga dapat menghentikan langganan kapan saja. Setelah
            penghentian, Anda memiliki waktu 30 hari untuk mengunduh data Anda.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">9. Perubahan Syarat</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            BantuGrow berhak memperbarui syarat dan ketentuan ini kapan saja. Perubahan material
            akan diberitahukan minimal 14 hari sebelum berlaku efektif melalui email atau notifikasi
            di platform.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">10. Hukum yang Berlaku</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik
            Indonesia. Setiap perselisihan akan diselesaikan melalui musyawarah terlebih dahulu,
            dan jika tidak tercapai, melalui pengadilan yang berwenang di Indonesia.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">11. Hubungi Kami</h2>
          <p className="text-muted-foreground leading-relaxed">
            Untuk pertanyaan mengenai syarat dan ketentuan ini, hubungi kami di{' '}
            <a href="mailto:halo@bantugrow.id" className="text-primary hover:underline">
              halo@bantugrow.id
            </a>.
          </p>
        </div>
      </div>
    </div>
  )
}
