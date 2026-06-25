export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  image: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Dengan Point of Sale (POS) BantuGrow, pencatatan transaksi toko kelontong saya jadi otomatis dan stok barang terkontrol rapi. Tidak pusing lagi barang habis mendadak!',
    image: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=80',
    name: 'Budi Santoso',
    role: 'Pemilik Toko',
    company: 'Toko Kelontong Berkah',
  },
  {
    quote:
      "Mutaba'ah Digital sangat membantu komunitas remaja masjid kami dalam mencatat amalan harian secara mandiri. Laporan perkembangannya sangat informatif dan memotivasi.",
    image: 'https://ui-avatars.com/api/?name=Ustadz+Ahmad&background=random&size=80',
    name: 'Ustadz Ahmad',
    role: 'Ketua Yayasan',
    company: 'Masjid Baiturrahman',
  },
  {
    quote:
      'Sistem Management Travel Umroh mempermudah kami melacak kelengkapan dokumen dan progres pembayaran jamaah dalam satu dashboard. Sangat menghemat waktu operasional kami!',
    image: 'https://ui-avatars.com/api/?name=Hajah+Siti+Aminah&background=random&size=80',
    name: 'Hajah Siti Aminah',
    role: 'Pemilik',
    company: 'Al-Hikmah Travel & Umroh',
  },
]
