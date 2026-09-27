'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const families = [
  {
    id: 'floral',
    label: 'FLORAL',
    description: 'Light, romantic and feminine. Rose, jasmine, and fresh petals that evoke timeless beauty and softness.',
    href: '/collections/floral',
    image: '/images/collections/floral.png',
    color: '#D4AFB8',
    bgTint: 'rgba(212, 175, 184, 0.04)',
    tagline: 'BLOOMS & FRESH PETALS',
  },
  {
    id: 'woody',
    label: 'WOODY',
    description: 'Grounded, warm and sophisticated. Sandalwood, cedar and vetiver — earthy depth and quiet confidence.',
    href: '/collections/woody',
    image: '/images/collections/oud.png',
    color: '#A68059',
    bgTint: 'rgba(166, 128, 89, 0.05)',
    tagline: 'EARTHY TIMELESSNESS & CEDAR',
  },
  {
    id: 'oud',
    label: 'OUD',
    description: 'Rich, opulent and commanding. The sacred wood of the East — deeply complex, smoky and unforgettable.',
    href: '/collections/oud',
    image: '/images/collections/oud.png',
    color: '#B8973A',
    bgTint: 'rgba(184, 151, 58, 0.06)',
    tagline: 'SACRED WOOD OF THE EAST',
  },
  {
    id: 'musk',
    label: 'MUSK',
    description: 'Soft, clean and intimate. A skin-close warmth with velvet undertones that linger long after you leave.',
    href: '/collections/musk-amber',
    image: '/images/collections/musk-amber.png',
    color: '#C2BBAF',
    bgTint: 'rgba(194, 187, 175, 0.04)',
    tagline: 'INTIMATE VELVET SKIN SCENT',
  },
  {
    id: 'amber',
    label: 'AMBER',
    description: 'Warm, sensual and enveloping. Golden resins and sweet spices create a rich, glowing trail.',
    href: '/collections/musk-amber',
    image: '/images/collections/musk-amber.png',
    color: '#8C6D38',
    bgTint: 'rgba(140, 109, 56, 0.06)',
    tagline: 'GOLDEN RESINS & SWEET SPICE',
  },
  {
    id: 'fresh',
    label: 'FRESH',
    description: 'Clean, crisp and energising. Sparkling citrus and green accords for effortless vitality.',
    href: '/collections/fresh-citrus',
    image: '/images/editorial/hero.png',
    color: '#A8B0A2',
    bgTint: 'rgba(168, 176, 162, 0.04)',
    tagline: 'CRISP CITRUS & VITALITY',
  },
  {
    id: 'sweet',
    label: 'SWEET',
    description: 'Playful, bold and indulgent. Honey, vanilla and gourmand notes that craft a delicious signature.',
    href: '/collections/sweet-gourmand',
    image: '/images/collections/floral.png',
    color: '#C5906A',
    bgTint: 'rgba(197, 144, 106, 0.05)',
    tagline: 'HONEY & INDULGENT GOURMAND',
  },
]

export default function HomeScentLibrary() {
  const [active, setActive] = useState<string>('oud')
  const activeFamily = families.find(f => f.id === active) || families[2]

  return (
    <section style={{ padding: '6.5rem 0', background: '#0D0D0D', borderTop: '1px solid #1c1c1c' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '0.75rem', fontFamily: 'DM Sans, sans-serif', textTransform: 'uppercase' }}>EXPLORE</div>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: '#F0EBE0', fontWeight: 400 }}>THE SCENT LIBRARY</h2>
        </div>

        {/* Family selector tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '3.5rem' }}>
          {families.map(f => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className="filter-chip"
              style={{
                borderColor: active === f.id ? f.color : '#252525',
                color: active === f.id ? f.color : '#7A7570',
                background: active === f.id ? f.bgTint : 'transparent',
                fontFamily: 'DM Sans, sans-serif',
                padding: '0.5rem 1.15rem',
                fontSize: '0.625rem',
                letterSpacing: '0.18em',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Rich Editorial Photographic Display */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '3.5rem',
          alignItems: 'center',
          background: '#131313',
          border: '1px solid #1c1c1c',
          borderLeft: `3px solid ${activeFamily.color}`,
          maxWidth: 980,
          margin: '0 auto',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
        }}>
          {/* Editorial Image */}
          <div style={{ position: 'relative', aspectRatio: '4/3', minHeight: 340, background: '#070707' }}>
            <Image
              src={activeFamily.image}
              alt={activeFamily.label}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, transparent 60%, rgba(19,19,19,0.8) 100%)',
            }} />
          </div>

          {/* Info */}
          <div style={{ padding: '2.5rem 2.5rem 2.5rem 0' }}>
            <div style={{ fontSize: '0.5rem', letterSpacing: '0.24em', color: activeFamily.color, marginBottom: '0.5rem', fontFamily: 'DM Sans, sans-serif', textTransform: 'uppercase' }}>
              {activeFamily.tagline}
            </div>
            <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '2rem', color: '#F0EBE0', fontWeight: 400, marginBottom: '1rem', lineHeight: 1.1 }}>
              {activeFamily.label}
            </h3>
            <p style={{ color: '#B8B0A3', fontSize: '0.875rem', lineHeight: 1.8, fontFamily: 'DM Sans, sans-serif', marginBottom: '2rem' }}>
              {activeFamily.description}
            </p>
            <Link
              href={activeFamily.href}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                fontSize: '0.625rem', letterSpacing: '0.2em',
                color: activeFamily.color,
                borderBottom: `1px solid ${activeFamily.color}60`,
                paddingBottom: 3,
                fontFamily: 'DM Sans, sans-serif',
                transition: 'all 0.2s ease',
              }}
              className="scent-family-link"
            >
              EXPLORE {activeFamily.label} COLLECTION &rarr;
            </Link>
          </div>
        </div>
      </div>
      <style>{`
        .scent-family-link:hover {
          opacity: 0.8;
          border-bottom-color: currentColor !important;
        }
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1.2fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
          div[style*="padding: 2.5rem 2.5rem 2.5rem 0"] {
            padding: 2rem !important;
          }
        }
      `}</style>
    </section>
  )
}

