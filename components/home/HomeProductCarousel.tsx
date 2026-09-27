'use client'
import Link from 'next/link'
import ProductCard from '@/components/product/ProductCard'
import { Product } from '@/lib/products/types'

interface HomeProductCarouselProps {
  products: Product[]
  viewAllHref?: string
  viewAllText?: string
}

export default function HomeProductCarousel({
  products,
  viewAllHref = '/shop',
  viewAllText = 'VIEW ALL FRAGRANCES →',
}: HomeProductCarouselProps) {
  if (!products || products.length === 0) return null

  return (
    <div>
      <div className="home-carousel-track">
        {products.map(product => (
          <div key={product.id} className="home-carousel-item">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {viewAllHref && (
        <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <Link
            href={viewAllHref}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontSize: '0.625rem',
              letterSpacing: '0.22em',
              color: '#B8973A',
              borderBottom: '1px solid rgba(184,151,58,0.4)',
              paddingBottom: '3px',
              fontFamily: 'DM Sans, sans-serif',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            className="view-all-link"
          >
            {viewAllText}
          </Link>
        </div>
      )}

      <style>{`
        .home-carousel-track {
          display: flex;
          gap: 1.25rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 1rem;
          scrollbar-width: thin;
          scrollbar-color: #2a2a2a transparent;
        }
        .home-carousel-item {
          scroll-snap-align: start;
          flex: 0 0 78vw;
          max-width: 280px;
        }
        @media (min-width: 768px) {
          .home-carousel-track {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2.5rem;
            overflow-x: visible;
          }
          .home-carousel-item {
            flex: initial;
            max-width: none;
          }
        }
        .view-all-link:hover {
          color: #F0EBE0 !important;
          border-color: #F0EBE0 !important;
        }
      `}</style>
    </div>
  )
}
