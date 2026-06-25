import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'BantuGrow — Solusi SaaS untuk UMKM Indonesia'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: '#f8fafc',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              background: '#22c55e',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#ffffff',
            }}
          >
            BG
          </div>
          <span
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              letterSpacing: '-1px',
            }}
          >
            BantuGrow
          </span>
        </div>
        <p
          style={{
            fontSize: '28px',
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.4,
          }}
        >
          Solusi SaaS untuk UMKM Indonesia
        </p>
        <p
          style={{
            fontSize: '20px',
            color: '#64748b',
            textAlign: 'center',
            maxWidth: '700px',
            marginTop: '16px',
            lineHeight: 1.5,
          }}
        >
          Tumbuhkan bisnis Anda lebih cepat, efisien, dan terorganisir dengan teknologi yang tepat guna.
        </p>
      </div>
    ),
    { ...size }
  )
}
