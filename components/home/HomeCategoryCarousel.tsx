'use client'
import Link from 'next/link'
import Image from 'next/image'

const categories = [
  { name: 'OUD', note: 'Rich & Opulent', image: '/images/collections/oud.png', href: '/collections/oud' },
  { name: 'MUSK & AMBER', note: 'Warm & Sensual', image: '/images/collections/musk-amber.png', href: '/collections/musk-amber' },
  { name: 'FLORAL', note: 'Romantic & Fresh', image: '/images/collections/floral.png', href: '/collections/floral' },
  { name: 'WOODY', note: 'Grounded & Earthy', image: '/images/editorial/about-hero.png', href: '/collections/woody' },
  { name: 'FRESH', note: 'Crisp & Energising', image: '/images/editorial/hero.png', href: '/collections/fresh-citrus' },
  { name: 'SWEET', note: 'Gourmand & Bold', image: '/images/collections/musk-amber.png', href: '/collections/sweet-gourmand' },
  { name: 'WOMEN', note: 'Feminine Elegance', image: '/images/products/kabuki.png', href: '/shop/women' },
  { name: 'MEN', note: 'Sophisticated Distinction', image: '/images/products/atlas-dubai.png', href: '/shop/men' },
  { name: 'UNISEX', note: 'Universal Appeal', image: '/images/products/scandal.png', href: '/shop/unisex' },
]

export default function HomeCategoryCarousel() {
  return (
    <div className="category-carousel-track">
      {categories.map((cat) => (
        <Link key={cat.name} href={cat.href} className="category-card" style={{ display: 'block', textDecoration: 'none' }}>
          <div style={{ position: 'relative', aspectRatio: '4/5', background: '#121212', overflow: 'hidden', border: '1px solid #1c1c1c' }}>
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              sizes="(max-width: 640px) 60vw, (max-width: 1024px) 33vw, 20vw"
              style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
              className="cat-img"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,7,7,0.85) 0%, rgba(7,7,7,0.2) 60%, transparent 100%)' }} />
            <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem' }}>
              <div style={{ fontSize: '0.48rem', letterSpacing: '0.22em', color: '#B8973A', marginBottom: 4, fontFamily: 'DM Sans, sans-serif', textTransform: 'uppercase' }}>{cat.note}</div>
              <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.2rem', color: '#F0EBE0', fontWeight: 400, letterSpacing: '0.05em' }}>{cat.name}</h3>
            </div>
          </div>
        </Link>
      ))}

      <style>{`
        .category-carousel-track {
          display: flex;
          gap: 1.25rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 1rem;
          scrollbar-width: thin;
          scrollbar-color: #2a2a2a transparent;
        }
        .category-card {
          scroll-snap-align: start;
          flex: 0 0 65vw;
          max-width: 240px;
        }
        @media (min-width: 768px) {
          .category-carousel-track {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            overflow-x: visible;
          }
          .category-card {
            flex: initial;
            max-width: none;
          }
        }
        @media (min-width: 1100px) {
          .category-carousel-track {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .category-card:hover .cat-img {
          transform: scale(1.05) !important;
        }
      `}</style>
    </div>
  )
}
