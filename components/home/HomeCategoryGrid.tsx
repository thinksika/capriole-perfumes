'use client'
import Link from 'next/link'
import Image from 'next/image'

const categories = [
  { name: 'OUD', image: '/images/collections/oud.png', href: '/collections/oud' },
  { name: 'MUSK & AMBER', image: '/images/collections/musk-amber.png', href: '/collections/musk-amber' },
  { name: 'FLORAL', image: '/images/collections/floral.png', href: '/collections/floral' },
  { name: 'WOODY', image: '/images/editorial/about-hero.png', href: '/collections/woody' },
  { name: 'FRESH', image: '/images/editorial/hero.png', href: '/collections/fresh-citrus' },
  { name: 'SWEET', image: '/images/collections/musk-amber.png', href: '/collections/sweet-gourmand' },
]

export default function HomeCategoryGrid() {
  return (
    <div className="category-grid">
      {categories.map((cat) => (
        <Link key={cat.name} href={cat.href} className="category-card" style={{ display: 'block', textDecoration: 'none' }}>
          <div style={{ position: 'relative', aspectRatio: '4/5', background: '#121212', overflow: 'hidden', border: '1px solid #1c1c1c' }}>
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
              className="cat-img"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,7,7,0.85) 0%, rgba(7,7,7,0.15) 60%, transparent 100%)' }} />
            <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem' }}>
              <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.2rem', color: '#F0EBE0', fontWeight: 400, letterSpacing: '0.05em', marginBottom: '0.35rem' }}>{cat.name}</h3>
              <span style={{ fontSize: '0.5rem', letterSpacing: '0.22em', color: '#B8973A', fontFamily: 'DM Sans, sans-serif', textTransform: 'uppercase' }}>EXPLORE →</span>
            </div>
          </div>
        </Link>
      ))}

      <style>{`
        .category-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1100px) {
          .category-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 1.25rem !important;
          }
        }
        @media (max-width: 640px) {
          .category-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.85rem !important;
          }
        }
        .category-card:hover .cat-img {
          transform: scale(1.05) !important;
        }
      `}</style>
    </div>
  )
}
