import type { Metadata } from 'next'
import { DecorIcon } from '@/components/decor-icon'
import { privacyMetadata } from '@/lib/seo'

export const metadata: Metadata = privacyMetadata()

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 md:px-8 py-12 md:py-16">
      <div className="relative border-y border-border/80 py-12">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />

        <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-8 md:text-4xl">
          Kebijakan Privasi
        </h1>

        <div className="prose prose-sm md:prose-base prose-neutral dark:prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            Terakhir diperbarui: 25 Juni 2026
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">1. Informasi yang Kami Kumpulkan</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            BantuGrow mengumpulkan informasi yang Anda berikan secara langsung kepada kami, termasuk:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
            <li>Nama lengkap</li>
            <li>Alamat email</li>
            <li>Nomor telepon (opsional)</li>
            <li>Informasi bisnis (nama usaha, kategori, dsb.)</li>
            <li>Data yang dimasukkan saat menggunakan layanan kami</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">2. Penggunaan Informasi</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Informasi yang kami kumpulkan digunakan untuk:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
            <li>Menyediakan, memelihara, dan meningkatkan layanan kami</li>
            <li>Mengirimkan pemberitahuan teknis dan pembaruan</li>
            <li>Merespons pertanyaan dan permintaan dukungan</li>
            <li>Mengirimkan informasi pemasaran (dengan persetujuan Anda)</li>
            <li>Menganalisis penggunaan layanan untuk peningkatan produk</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">3. Perlindungan Data</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang wajar untuk melindungi
            informasi pribadi Anda dari akses tidak sah, perubahan, pengungkapan, atau perusakan.
            Data Anda disimpan dengan enkripsi dan hanya diakses oleh personel yang berwenang.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">4. Berbagi Informasi</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            BantuGrow tidak menjual, memperdagangkan, atau menyewakan informasi pribadi Anda kepada
            pihak ketiga. Kami hanya membagikan data apabila diperlukan untuk menyediakan layanan
            (misalnya, penyedia infrastruktur cloud), atau jika diwajibkan oleh hukum yang berlaku.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">5. Cookie dan Teknologi Pelacakan</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Kami menggunakan cookie dan teknologi serupa untuk meningkatkan pengalaman pengguna,
            menganalisis trafik, dan memahami bagaimana layanan kami digunakan. Anda dapat mengatur
            preferensi cookie melalui pengaturan browser Anda.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">6. Hak Anda</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Anda memiliki hak untuk:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
            <li>Mengakses data pribadi yang kami simpan tentang Anda</li>
            <li>Meminta koreksi data yang tidak akurat</li>
            <li>Meminta penghapusan data pribadi Anda</li>
            <li>Menarik persetujuan penggunaan data kapan saja</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">7. Perubahan Kebijakan</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan signifikan
            akan kami beritahukan melalui email atau pemberitahuan di layanan kami. Penggunaan
            berkelanjutan atas layanan kami setelah perubahan berlaku dianggap sebagai persetujuan
            Anda terhadap kebijakan yang diperbarui.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">8. Hubungi Kami</h2>
          <p className="text-muted-foreground leading-relaxed">
            Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami di{' '}
            <a href="mailto:halo@bantugrow.id" className="text-primary hover:underline">
              halo@bantugrow.id
            </a>.
          </p>
        </div>
      </div>
    </div>
  )
}
