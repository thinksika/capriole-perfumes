'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, ChevronUp, Minus, Plus, Heart } from 'lucide-react'
import { Product, parseNotes, parseImages, getEffectivePrice, getProductImage } from '@/lib/products/types'
import { formatPrice } from '@/lib/pricing/calculateDiscount'
import { useCartStore } from '@/lib/cart/cartStore'
import FragrancePyramid from '@/components/product/FragrancePyramid'
import FragranceProfile from '@/components/product/FragranceProfile'
import ProductGrid from '@/components/product/ProductGrid'

interface Props {
  product: Product
  related: Product[]
  waNumber: string
}

export default function ProductPageClient({ product, related, waNumber }: Props) {
  const [qty, setQty] = useState(1)
  const [activeImg, setActiveImg] = useState(0)
  const [wishlist, setWishlist] = useState(false)
  const [showDetails, setShowDetails] = useState(true)
  const { addItem } = useCartStore()

  const parsedImages = parseImages(product.images)
  const images = parsedImages.length > 0 ? parsedImages : [getProductImage(product)]
  const topNotes = parseNotes(product.topNotes)
  const heartNotes = parseNotes(product.heartNotes)
  const baseNotes = parseNotes(product.baseNotes)
  const character = parseNotes(product.character)
  const bestFor = parseNotes(product.bestFor)
  const mainAccords = parseNotes(product.mainAccords)
  const effectivePrice = getEffectivePrice(product)
  const hasDiscount = effectivePrice < product.price
  const inStock = product.stockStatus !== 'out_of_stock'

  const handleAddToBag = () => {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        discountedPrice: hasDiscount ? effectivePrice : undefined,
        thumbnail: images[activeImg] || images[0],
        volume: product.volume ?? undefined,
        family: product.fragranceFamily ?? undefined,
      })
    }
  }

  const waMessage = `Hi Capriole Perfumes, I'd like to order:\n\n${product.name}\n${formatPrice(effectivePrice, product.currency)}\n\nPlease advise on availability and delivery.`
  const waUrl = `https://wa.me/${waNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(waMessage)}`

  return (
    <div style={{ background: '#070707', minHeight: '100vh' }}>
      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '2.5rem', fontSize: '0.625rem', letterSpacing: '0.12em', color: '#7A7570', fontFamily: 'DM Sans, sans-serif' }}>
          <Link href="/" style={{ color: '#7A7570', transition: 'color 0.15s' }} className="breadcrumb-link">HOME</Link>
          <span>/</span>
          <Link href="/shop" style={{ color: '#7A7570', transition: 'color 0.15s' }} className="breadcrumb-link">SHOP</Link>
          <span>/</span>
          <span style={{ color: '#B8B0A3' }}>{product.name.toUpperCase()}</span>
        </div>

        {/* Main layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'flex-start', marginBottom: '6rem' }}>
          {/* Gallery */}
          <div>
            {/* Main image */}
            <div style={{ position: 'relative', aspectRatio: '3/4', background: '#131313', marginBottom: '1rem', overflow: 'hidden', border: '1px solid #1c1c1c' }}>
              <Image src={images[activeImg] || images[0]} alt={product.name} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" priority />
            </div>
            {/* Thumbnails */}
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} style={{ width: 80, aspectRatio: '1', background: '#131313', border: `1px solid ${i === activeImg ? '#B8973A' : '#1c1c1c'}`, cursor: 'pointer', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                    <Image src={img} alt={`${product.name} view ${i + 1}`} fill style={{ objectFit: 'cover' }} sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div style={{ paddingTop: '1rem' }}>
            <div style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#7A7570', marginBottom: '0.5rem', fontFamily: 'DM Sans, sans-serif' }}>CAPRIOLE</div>
            <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: '#F0EBE0', fontWeight: 400, lineHeight: 1.15, marginBottom: '0.75rem' }}>{product.name}</h1>
            {product.fragranceFamily && (
              <div style={{ fontSize: '0.625rem', letterSpacing: '0.15em', color: '#B8973A', marginBottom: '1.25rem', fontFamily: 'DM Sans, sans-serif' }}>{product.fragranceFamily.toUpperCase()}</div>
            )}
            
            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {hasDiscount ? (
                <>
                  <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.5rem', color: '#C9AA5A' }}>{formatPrice(effectivePrice, product.currency)}</span>
                  <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1rem', color: '#7A7570', textDecoration: 'line-through' }}>{formatPrice(product.price, product.currency)}</span>
                </>
              ) : (
                <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.5rem', color: '#F0EBE0' }}>{formatPrice(product.price, product.currency)}</span>
              )}
            </div>

            {/* Short description */}
            {product.shortDescription && (
              <p style={{ color: '#7A7570', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '2rem', borderLeft: '2px solid #B8973A', paddingLeft: '1rem', fontFamily: 'DM Sans, sans-serif' }}>{product.shortDescription}</p>
            )}

            {/* Metadata chips */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {product.concentration && <span className="badge badge-muted">{product.concentration}</span>}
              {product.volume && <span className="badge badge-muted">{product.volume}</span>}
              {product.gender && <span className="badge badge-muted">{product.gender.charAt(0).toUpperCase() + product.gender.slice(1)}</span>}
              {product.stockStatus === 'low_stock' && <span className="badge badge-sale">Low Stock</span>}
            </div>

            {/* Quantity */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.55rem', letterSpacing: '0.18em', color: '#7A7570', marginBottom: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>QUANTITY</div>
              <div className="qty-control">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease"><Minus size={12} /></button>
                <input className="qty-value" readOnly value={qty} />
                <button className="qty-btn" onClick={() => setQty(q => q + 1)} aria-label="Increase"><Plus size={12} /></button>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <button
                onClick={handleAddToBag}
                disabled={!inStock}
                style={{
                  background: inStock ? '#B8973A' : '#252525',
                  color: inStock ? '#070707' : '#7A7570',
                  border: 'none',
                  padding: '1rem',
                  fontSize: '0.625rem', letterSpacing: '0.22em',
                  fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
                  cursor: inStock ? 'pointer' : 'not-allowed',
                  transition: 'background 0.2s',
                  width: '100%',
                }}
                className={inStock ? 'add-to-bag-btn' : ''}
              >
                {inStock ? 'ADD TO BAG' : 'OUT OF STOCK'}
              </button>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  background: 'transparent', border: '1px solid #252525',
                  color: '#B8B0A3', padding: '1rem',
                  fontSize: '0.625rem', letterSpacing: '0.22em',
                  fontFamily: 'DM Sans, sans-serif',
                  transition: 'all 0.2s',
                }}
                className="wa-btn"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                BUY VIA WHATSAPP
              </a>
              <button onClick={() => setWishlist(!wishlist)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'transparent', border: 'none', color: wishlist ? '#B8973A' : '#7A7570', padding: '0.5rem', fontSize: '0.625rem', letterSpacing: '0.18em', fontFamily: 'DM Sans, sans-serif', cursor: 'pointer', transition: 'color 0.2s' }}>
                <Heart size={14} fill={wishlist ? '#B8973A' : 'none'} /> {wishlist ? 'SAVED TO WISHLIST' : 'ADD TO WISHLIST'}
              </button>
            </div>
          </div>
        </div>

        {/* Details section */}
        <div style={{ borderTop: '1px solid #1c1c1c', maxWidth: 800 }}>
          {/* Fragrance story */}
          {product.description && (
            <div style={{ padding: '3rem 0', borderBottom: '1px solid #1c1c1c' }}>
              <div style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#B8973A', marginBottom: '1.5rem', fontFamily: 'DM Sans, sans-serif' }}>FRAGRANCE STORY</div>
              <p style={{ color: '#B8B0A3', fontSize: '0.9375rem', lineHeight: 1.8, fontFamily: 'DM Sans, sans-serif' }}>{product.description}</p>
            </div>
          )}

          {/* Fragrance notes */}
          {(topNotes.length > 0 || heartNotes.length > 0 || baseNotes.length > 0) && (
            <div style={{ padding: '3rem 0', borderBottom: '1px solid #1c1c1c' }}>
              <div style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#B8973A', marginBottom: '1.5rem', fontFamily: 'DM Sans, sans-serif' }}>FRAGRANCE NOTES</div>
              <FragrancePyramid topNotes={topNotes} heartNotes={heartNotes} baseNotes={baseNotes} />
            </div>
          )}

          {/* Character */}
          {character.length > 0 && (
            <div style={{ padding: '3rem 0', borderBottom: '1px solid #1c1c1c' }}>
              <div style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#B8973A', marginBottom: '1.5rem', fontFamily: 'DM Sans, sans-serif' }}>FRAGRANCE CHARACTER</div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {character.map(c => <span key={c} style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.25rem', color: '#F0EBE0', fontWeight: 400 }}>{c}</span>)}
              </div>
            </div>
          )}

          {/* Best For */}
          {bestFor.length > 0 && (
            <div style={{ padding: '3rem 0', borderBottom: '1px solid #1c1c1c' }}>
              <div style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#B8973A', marginBottom: '1.5rem', fontFamily: 'DM Sans, sans-serif' }}>BEST FOR</div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {bestFor.map(b => <span key={b} className="badge badge-muted">{b}</span>)}
              </div>
            </div>
          )}

          {/* Profile */}
          <div style={{ padding: '3rem 0', borderBottom: related.length > 0 ? '1px solid #1c1c1c' : 'none' }}>
            <div style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#B8973A', marginBottom: '1.5rem', fontFamily: 'DM Sans, sans-serif' }}>FRAGRANCE PROFILE</div>
            <FragranceProfile
              freshness={product.freshness}
              sweetness={product.sweetness}
              warmth={product.warmth}
              woody={product.woody}
              spicy={product.spicy}
              projection={product.projection}
              longevity={product.longevity}
            />
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div style={{ marginTop: '5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.75rem', color: '#F0EBE0', fontWeight: 400 }}>YOU MAY ALSO LIKE</h2>
              <Link href="/shop" style={{ fontSize: '0.625rem', letterSpacing: '0.18em', color: '#7A7570', borderBottom: '1px solid #252525', paddingBottom: 2, fontFamily: 'DM Sans, sans-serif' }}>VIEW ALL →</Link>
            </div>
            <ProductGrid products={related} columns={3} />
          </div>
        )}
      </div>

      <style>{`
        .add-to-bag-btn:hover { background: #C9AA5A !important; }
        .wa-btn:hover { border-color: #25D366 !important; color: #25D366 !important; }
        .breadcrumb-link:hover { color: #F0EBE0 !important; }
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </div>
  )
}
