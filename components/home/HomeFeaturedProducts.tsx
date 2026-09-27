'use client'
import Image from 'next/image'
import Link from 'next/link'
import ProductCard from '@/components/product/ProductCard'
import { Product } from '@/lib/products/types'

export default function HomeFeaturedProducts({ products }: { products: Product[] }) {
  if (!products.length) {
    const defaultFeatured = [
      {
        name: 'Capriole Atlas Dubai',
        family: 'Oriental Woody Amber',
        price: 'GHS 1,800.00',
        image: '/images/products/atlas-dubai.png',
        slug: 'capriole-atlas-dubai',
        note: 'Golden Amber & Oud',
      },
      {
        name: 'Capriole Scandal',
        family: 'Sweet Gourmand Floral',
        price: 'GHS 1,020.00',
        originalPrice: 'GHS 1,200.00',
        image: '/images/products/scandal.png',
        slug: 'capriole-scandal',
        note: 'Honey & Gardenia',
      },
      {
        name: 'Rose Kabuki',
        family: 'Floral Woody',
        price: 'GHS 1,020.00',
        originalPrice: 'GHS 1,200.00',
        image: '/images/products/kabuki.png',
        slug: 'rose-kabuki',
        note: 'Fresh Rose & Cassis',
      },
    ]

    return (
      <div className="editorial-featured-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
        {defaultFeatured.map((p, i) => (
          <Link key={i} href={`/product/${p.slug}`} className="signature-edit-card" style={{ display: 'flex', flexDirection: 'column', background: '#121212', border: '1px solid #1c1c1c', transition: 'all 0.3s ease' }}>
            <div className="product-image-wrap" style={{ aspectRatio: '3/4', background: '#090909', position: 'relative', overflow: 'hidden' }}>
              <Image src={p.image} alt={p.name} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
              <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                <span style={{ fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8973A', border: '1px solid #B8973A', padding: '0.2rem 0.5rem', fontFamily: 'DM Sans, sans-serif' }}>SIGNATURE</span>
              </div>
            </div>
            <div style={{ padding: '1.75rem 1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.5rem', letterSpacing: '0.24em', color: '#B8973A', marginBottom: '0.35rem', fontFamily: 'DM Sans, sans-serif', textTransform: 'uppercase' }}>{p.note}</div>
                <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.25rem', color: '#F0EBE0', fontWeight: 400, marginBottom: '0.35rem', lineHeight: 1.2 }}>{p.name}</h3>
                <div style={{ fontSize: '0.6875rem', color: '#7A7570', marginBottom: '1.25rem', fontFamily: 'DM Sans, sans-serif' }}>{p.family}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '1rem', borderTop: '1px solid #1c1c1c' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.1rem', color: '#F0EBE0' }}>{p.price}</span>
                  {p.originalPrice && <span style={{ fontSize: '0.8rem', color: '#7A7570', textDecoration: 'line-through' }}>{p.originalPrice}</span>}
                </div>
                <span style={{ fontSize: '0.55rem', letterSpacing: '0.18em', color: '#B8973A', fontFamily: 'DM Sans, sans-serif', textTransform: 'uppercase' }}>EXPLORE &rarr;</span>
              </div>
            </div>
          </Link>
        ))}
        <style>{`
          .signature-edit-card:hover {
            border-color: #B8973A !important;
            transform: translateY(-2px);
          }
          @media (max-width: 900px) {
            .editorial-featured-grid {
              grid-template-columns: 1fr !important;
              gap: 1.5rem !important;
            }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="editorial-featured-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
      {products.map(p => <ProductCard key={p.id} product={p} />)}
      <style>{`
        @media (max-width: 900px) {
          .editorial-featured-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  )
}

