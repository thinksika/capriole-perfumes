'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { Product, getEffectivePrice, getProductImage } from '@/lib/products/types'
import { formatPrice } from '@/lib/pricing/calculateDiscount'
import { useCartStore } from '@/lib/cart/cartStore'

interface ProductCardProps {
  product: Product
  onQuickView?: (product: Product) => void
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [addedToBag, setAddedToBag] = useState(false)
  const { addItem } = useCartStore()
  
  const imageUrl = getProductImage(product)
  const effectivePrice = getEffectivePrice(product)
  const hasDiscount = effectivePrice < product.price
  const inStock = product.stockStatus !== 'out_of_stock'

  const handleAddToBag = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!inStock) return
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      compareAtPrice: product.compareAtPrice ?? undefined,
      discountedPrice: hasDiscount ? effectivePrice : undefined,
      thumbnail: imageUrl,
      volume: product.volume ?? undefined,
      family: product.fragranceFamily ?? undefined,
    })
    setAddedToBag(true)
    setTimeout(() => setAddedToBag(false), 2000)
  }

  return (
    <article style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <Link href={`/product/${product.slug}`} style={{ display: 'block', flex: 1, textDecoration: 'none' }}>
        {/* Image */}
        <div
          className="product-image-wrap"
          style={{ position: 'relative', aspectRatio: '3/4', background: '#131313', overflow: 'hidden' }}
        >
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            style={{ objectFit: 'cover' }}
          />

          {/* Badges */}
          <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {product.newArrival && <span className="badge badge-gold">New</span>}
            {product.bestSeller && <span className="badge badge-muted">Best Seller</span>}
            {hasDiscount && <span className="badge badge-sale">Sale</span>}
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsWishlisted(!isWishlisted) }}
            style={{
              position: 'absolute', top: '0.75rem', right: '0.75rem',
              background: 'rgba(7,7,7,0.7)', border: '1px solid #1c1c1c',
              width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s', zIndex: 5,
            }}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={14} fill={isWishlisted ? '#B8973A' : 'none'} color={isWishlisted ? '#B8973A' : '#7A7570'} />
          </button>

          {/* Hover overlay for desktop */}
          {inStock && (
            <div className="product-hover-overlay" style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'rgba(7,7,7,0.9)',
              padding: '0.875rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              transform: 'translateY(100%)',
              transition: 'transform 0.3s ease',
              zIndex: 6,
            }}>
              {onQuickView && (
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuickView(product) }}
                  style={{
                    background: 'transparent', border: '1px solid #252525',
                    color: '#B8B0A3', fontSize: '0.625rem', letterSpacing: '0.18em',
                    fontFamily: 'DM Sans, sans-serif', padding: '0.625rem',
                    cursor: 'pointer', transition: 'all 0.2s', width: '100%',
                  }}
                  className="quick-view-btn"
                >
                  QUICK VIEW
                </button>
              )}
              <button
                onClick={handleAddToBag}
                style={{
                  background: '#B8973A', border: 'none', color: '#070707',
                  fontSize: '0.625rem', letterSpacing: '0.18em',
                  fontFamily: 'DM Sans, sans-serif', padding: '0.625rem',
                  cursor: 'pointer', transition: 'background 0.2s', width: '100%', fontWeight: 500,
                }}
              >
                {addedToBag ? 'ADDED ✓' : 'ADD TO BAG'}
              </button>
            </div>
          )}
          {!inStock && (
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'rgba(7,7,7,0.85)', padding: '0.75rem',
              textAlign: 'center', fontSize: '0.6rem', letterSpacing: '0.18em', color: '#7A7570',
              fontFamily: 'DM Sans, sans-serif',
            }}>OUT OF STOCK</div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '1rem 0 0.5rem' }}>
          <div style={{ fontSize: '0.5rem', letterSpacing: '0.22em', color: '#7A7570', marginBottom: '0.375rem', fontFamily: 'DM Sans, sans-serif' }}>CAPRIOLE</div>
          <h3 style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: '1.05rem', fontWeight: 400, color: '#F0EBE0',
            marginBottom: '0.25rem', lineHeight: 1.2,
          }}>{product.name}</h3>
          {product.fragranceFamily && (
            <div style={{ fontSize: '0.625rem', letterSpacing: '0.08em', color: '#7A7570', marginBottom: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>
              {product.fragranceFamily}
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            {hasDiscount ? (
              <>
                <span className="price price-sale">{formatPrice(effectivePrice, product.currency)}</span>
                <span className="price-original">{formatPrice(product.price, product.currency)}</span>
              </>
            ) : (
              <span className="price">{formatPrice(product.price, product.currency)}</span>
            )}
          </div>
        </div>
      </Link>

      {/* Mobile touch ADD TO BAG button */}
      {inStock && (
        <button
          onClick={handleAddToBag}
          style={{
            width: '100%',
            background: '#B8973A', border: 'none', color: '#070707',
            fontSize: '0.625rem', letterSpacing: '0.15em',
            fontFamily: 'DM Sans, sans-serif', padding: '0.55rem',
            cursor: 'pointer', transition: 'background 0.2s', fontWeight: 500,
            textTransform: 'uppercase', marginTop: '0.25rem'
          }}
          className="mobile-add-btn"
        >
          {addedToBag ? 'ADDED TO BAG ✓' : 'ADD TO BAG'}
        </button>
      )}

      <style>{`
        article:hover .product-hover-overlay {
          transform: translateY(0) !important;
        }
        .quick-view-btn:hover {
          border-color: #B8973A !important;
          color: #B8973A !important;
        }
        .mobile-add-btn {
          display: none;
        }
        @media (max-width: 768px) {
          .mobile-add-btn {
            display: block !important;
          }
          .product-hover-overlay {
            display: none !important;
          }
        }
      `}</style>
    </article>
  )
}
