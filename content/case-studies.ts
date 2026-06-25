export interface CaseStudy {
  slug: string
  title: string
  client: string
  niche: string
  challenge: string
  solution: string
  results: string[]
  testimonial: {
    quote: string
    name: string
    role: string
  }
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'warung-barokah-pos',
    title: 'Warung Barokah: Dari Catatan Manual ke POS Digital',
    client: 'Warung Barokah',
    niche: 'Retail & Warung',
    challenge:
      'Warung Barokah mengalami kesulitan melacak stok barang dan omzet harian karena masih menggunakan buku catatan manual. Sering terjadi selisih stok dan tidak ada laporan keuangan yang akurat.',
    solution:
      'Implementasi BantuGrow POS memungkinkan Warung Barokah mencatat setiap transaksi secara digital, melacak stok otomatis, dan menghasilkan laporan harian secara real-time melalui dashboard yang mudah dipahami.',
    results: [
      'Pengurangan selisih stok sebesar 95%',
      'Peningkatan efisiensi pencatatan 3x lebih cepat',
      'Laporan keuangan otomatis setiap hari',
      'Peningkatan omzet 25% dalam 3 bulan pertama',
    ],
    testimonial: {
      quote:
        'Dulu saya pusing setiap akhir bulan menghitung untung rugi. Sekarang dengan BantuGrow POS, semuanya sudah otomatis dan akurat. Bisnis saya jadi lebih terorganisir.',
      name: 'Pak Hasan',
      role: 'Pemilik Warung Barokah',
    },
  },
  {
    slug: 'travel-amanah-umroh',
    title: 'Travel Amanah: Mengelola 500+ Jamaah dengan Mudah',
    client: 'Travel Amanah',
    niche: 'Travel Umroh',
    challenge:
      'Travel Amanah kesulitan mengelola data ratusan jamaah, jadwal keberangkatan, dan dokumen persyaratan. Koordinasi dengan tim di lapangan juga tidak efisien karena semua dilakukan via grup chat.',
    solution:
      'Dengan Management Travel Umroh dari BantuGrow, Travel Amanah dapat mengelola seluruh data jamaah, jadwal, dan dokumen dalam satu platform terintegrasi. Fitur notifikasi otomatis memastikan tidak ada jamaah yang terlewat.',
    results: [
      'Pengelolaan 500+ jamaah dalam satu dashboard',
      'Pengurangan waktu administrasi sebesar 60%',
      'Zero missed documents berkat reminder otomatis',
      'Rating kepuasan jamaah naik dari 4.0 ke 4.8/5',
    ],
    testimonial: {
      quote:
        'BantuGrow mengubah cara kami bekerja. Tidak ada lagi dokumen yang tercecer atau jamaah yang lupa briefing. Semuanya terkelola rapi dan profesional.',
      name: 'Bu Fatimah',
      role: 'Direktur Travel Amanah',
    },
  },
  {
    slug: 'pesantren-nurul-iman-mutabaah',
    title: 'Pesantren Nurul Iman: Digitalisasi Mutaba\'ah Santri',
    client: 'Pesantren Nurul Iman',
    niche: 'Pendidikan & Pesantren',
    challenge:
      'Pesantren Nurul Iman dengan 300+ santri kesulitan memantau progres hafalan dan ibadah harian secara konsisten. Ustadz harus mengisi buku mutaba\'ah manual yang sering hilang atau rusak.',
    solution:
      'Mutaba\'ah Digital BantuGrow memungkinkan pencatatan progres hafalan, tilawah, dan ibadah harian secara digital. Wali santri dapat melihat progres anak mereka secara real-time melalui dashboard.',
    results: [
      'Pencatatan progres 300+ santri tanpa kertas',
      'Peningkatan konsistensi pencatatan sebesar 80%',
      'Wali santri dapat memantau dari rumah',
      'Peningkatan motivasi santri berkat sistem gamifikasi',
    ],
    testimonial: {
      quote:
        'Alhamdulillah, dengan BantuGrow kami bisa memantau perkembangan setiap santri dengan lebih mudah. Wali santri juga merasa lebih tenang karena bisa melihat progres langsung.',
      name: 'Ustadz Ahmad',
      role: 'Mudir Pesantren Nurul Iman',
    },
  },
]
