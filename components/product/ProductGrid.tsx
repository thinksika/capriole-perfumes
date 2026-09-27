import ProductCard from './ProductCard'
import ProductSkeleton from './ProductSkeleton'
import { Product } from '@/lib/products/types'

interface ProductGridProps {
  products?: Product[]
  loading?: boolean
  onQuickView?: (product: Product) => void
  columns?: number
}

export default function ProductGrid({ products, loading, onQuickView, columns = 3 }: ProductGridProps) {
  if (loading) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '1px',
        background: '#1e1e1e',
      }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ background: '#070707', padding: '1rem' }}>
            <ProductSkeleton />
          </div>
        ))}
      </div>
    )
  }

  if (!products?.length) {
    return (
      <div style={{ padding: '5rem 2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#7A7570', marginBottom: '1rem', fontFamily: 'DM Sans, sans-serif' }}>NO RESULTS</div>
        <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.5rem', color: '#F0EBE0', fontWeight: 400, marginBottom: '1rem' }}>No fragrances found.</h3>
        <p style={{ color: '#7A7570', fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif' }}>Try adjusting your filters or explore all fragrances.</p>
      </div>
    )
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: '2rem',
    }}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
        />
      ))}
      <style>{`
        @media (max-width: 1024px) {
          div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }
        }
        @media (max-width: 360px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
