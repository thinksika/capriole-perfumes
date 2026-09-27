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
      <div className={`product-grid product-grid-${columns}`}>
        {Array.from({ length: columns * 2 }).map((_, i) => (
          <div key={i} className="product-grid-cell">
            <ProductSkeleton />
          </div>
        ))}
        <ProductGridStyles />
      </div>
    )
  }

  if (!products?.length) {
    return (
      <div style={{ padding: '5rem 2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#7A7570', marginBottom: '1rem', fontFamily: 'DM Sans, sans-serif' }}>
          NO RESULTS
        </div>
        <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.5rem', color: '#F0EBE0', fontWeight: 400, marginBottom: '1rem' }}>
          No fragrances found.
        </h3>
        <p style={{ color: '#7A7570', fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif' }}>
          Try adjusting your filters or explore all fragrances.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className={`product-grid product-grid-${columns}`}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={onQuickView}
          />
        ))}
      </div>
      <ProductGridStyles />
    </>
  )
}

function ProductGridStyles() {
  return (
    <style>{`
      .product-grid {
        display: grid;
        gap: 2rem;
        width: 100%;
      }
      .product-grid-2 { grid-template-columns: repeat(2, 1fr); }
      .product-grid-3 { grid-template-columns: repeat(3, 1fr); }
      .product-grid-4 { grid-template-columns: repeat(4, 1fr); }

      @media (max-width: 1024px) {
        .product-grid-4 { grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
      }
      @media (max-width: 768px) {
        .product-grid-3,
        .product-grid-4 { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
      }
      @media (max-width: 480px) {
        .product-grid-2,
        .product-grid-3,
        .product-grid-4 { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
      }
    `}</style>
  )
}
