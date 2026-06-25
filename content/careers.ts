export interface JobOpening {
  slug: string
  title: string
  department: string
  type: string
  location: string
  description: string
  requirements: string[]
}

export const jobOpenings: JobOpening[] = [
  {
    slug: 'fullstack-engineer',
    title: 'Fullstack Engineer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Remote (Indonesia)',
    description:
      'Bergabunglah dengan tim engineering BantuGrow untuk membangun produk SaaS yang membantu jutaan UMKM Indonesia. Anda akan bekerja dengan teknologi modern seperti Next.js, TypeScript, dan PostgreSQL untuk mengembangkan fitur-fitur baru yang berdampak langsung pada pengguna.',
    requirements: [
      'Minimal 2 tahun pengalaman sebagai fullstack developer',
      'Menguasai TypeScript, React, dan Node.js',
      'Familiar dengan database relasional (PostgreSQL/MySQL)',
      'Pengalaman dengan Next.js atau framework SSR lainnya',
      'Kemampuan komunikasi yang baik dalam Bahasa Indonesia dan Inggris',
      'Memiliki passion untuk membantu UMKM Indonesia',
    ],
  },
  {
    slug: 'product-designer',
    title: 'Product Designer',
    department: 'Design',
    type: 'Full-time',
    location: 'Remote (Indonesia)',
    description:
      'Sebagai Product Designer di BantuGrow, Anda akan merancang pengalaman pengguna yang intuitif untuk pelaku UMKM yang mungkin baru pertama kali menggunakan software bisnis. Tantangan utamanya adalah membuat produk yang powerful namun tetap sederhana.',
    requirements: [
      'Minimal 2 tahun pengalaman di UI/UX Design',
      'Menguasai Figma dan tools prototyping',
      'Portofolio yang menunjukkan kemampuan desain produk digital',
      'Memahami prinsip accessibility dan responsive design',
      'Pengalaman riset pengguna dan usability testing',
      'Empati terhadap pengguna non-teknis',
    ],
  },
  {
    slug: 'customer-success-specialist',
    title: 'Customer Success Specialist',
    department: 'Customer Success',
    type: 'Full-time',
    location: 'Jakarta / Remote',
    description:
      'Menjadi garda terdepan dalam memastikan pelanggan UMKM kami berhasil menggunakan produk BantuGrow. Anda akan membantu onboarding, menjawab pertanyaan, dan memastikan pelanggan mendapatkan nilai maksimal dari produk kami.',
    requirements: [
      'Minimal 1 tahun pengalaman di customer service atau customer success',
      'Kemampuan komunikasi yang sangat baik',
      'Sabar dan empati tinggi dalam melayani pelanggan',
      'Familiar dengan tools CRM dan helpdesk',
      'Memahami dasar-dasar bisnis UMKM di Indonesia',
      'Bersedia bekerja dengan jadwal yang fleksibel',
    ],
  },
]
