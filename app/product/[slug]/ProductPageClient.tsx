'use client'
import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Minus, Plus, Heart, ArrowLeft, ShoppingBag, Check } from 'lucide-react'
import { Product, parseNotes, parseImages, getEffectivePrice, getProductImage } from '@/lib/products/types'
import { formatPrice } from '@/lib/pricing/calculateDiscount'
import { useCartStore } from '@/lib/cart/cartStore'
import FragrancePyramid from '@/components/product/FragrancePyramid'
import ProductGrid from '@/components/product/ProductGrid'

const WA_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

interface Props {
  product: Product
  related: Product[]
  waNumber: string
}

export default function ProductPageClient({ product, related, waNumber }: Props) {
  const router = useRouter()
  const [qty, setQty] = useState(1)
  const [activeImg, setActiveImg] = useState(0)
  const [wishlist, setWishlist] = useState(false)
  const [addedToBag, setAddedToBag] = useState(false)
  const { addItem, closeCart } = useCartStore()

  // Close cart drawer if open when landing on a product page
  useEffect(() => { closeCart() }, [closeCart])

  const parsedImages = parseImages(product.images)
  const images = parsedImages.length > 0 ? parsedImages : [getProductImage(product)]
  const topNotes = parseNotes(product.topNotes)
  const heartNotes = parseNotes(product.heartNotes)
  const baseNotes = parseNotes(product.baseNotes)
  const character = parseNotes(product.character)
  const bestFor = parseNotes(product.bestFor)
  const effectivePrice = getEffectivePrice(product)
  const hasDiscount = effectivePrice < product.price
  const inStock = product.stockStatus !== 'out_of_stock'

  const handleAddToBag = useCallback(() => {
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
    // If qty > 1, add remaining
    for (let i = 1; i < qty; i++) {
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
    setAddedToBag(true)
    setTimeout(() => setAddedToBag(false), 2500)
  }, [addItem, product, qty, effectivePrice, hasDiscount, images, activeImg])

  // WhatsApp for direct product order
  const orderNum = `CP-${Math.floor(1000 + Math.random() * 9000)}`
  const waMsg = `CAPRIOLE PERFUMES\nORDER REQUEST\n\nOrder:\n#${orderNum}\n\nItem:\n${qty} × ${product.name}\n${formatPrice(effectivePrice, product.currency)}\n\nTotal:\n${formatPrice(effectivePrice * qty, product.currency)}\n\nPlease confirm my order and delivery details.`
  const waUrl = `https://wa.me/${waNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(waMsg)}`

  return (
    <div className="pp-root">
      <div className="container">
        {/* Back nav */}
        <button
          onClick={() => router.back()}
          className="pp-back"
          aria-label="Go back"
        >
          <ArrowLeft size={13} />
          <span>BACK</span>
        </button>

        {/* Breadcrumb */}
        <div className="pp-breadcrumb">
          <Link href="/" className="pp-bc-link">HOME</Link>
          <span>/</span>
          <Link href="/shop" className="pp-bc-link">SHOP</Link>
          <span>/</span>
          <span className="pp-bc-cur">{product.name.toUpperCase()}</span>
        </div>

        {/* Main layout */}
        <div className="pp-main">
          {/* Gallery */}
          <div className="pp-gallery">
            <div className="pp-main-img-wrap">
              <Image
                src={images[activeImg] || images[0]}
                alt={product.name}
                fill
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            {images.length > 1 && (
              <div className="pp-thumbs">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`pp-thumb ${i === activeImg ? 'active' : ''}`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <Image src={img} alt={`${product.name} ${i + 1}`} fill style={{ objectFit: 'cover' }} sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info panel */}
          <div className="pp-info">
            <div className="pp-brand">CAPRIOLE</div>
            <h1 className="pp-name">{product.name}</h1>

            {product.fragranceFamily && (
              <div className="pp-family">{product.fragranceFamily.toUpperCase()}</div>
            )}

            {/* Price */}
            <div className="pp-price-row">
              {hasDiscount ? (
                <>
                  <span className="pp-price-sale">{formatPrice(effectivePrice, product.currency)}</span>
                  <span className="pp-price-orig">{formatPrice(product.price, product.currency)}</span>
                  {product.discounts?.[0]?.discount?.value && (
                    <span className="pp-discount-badge">{product.discounts[0].discount.value}% OFF</span>
                  )}
                </>
              ) : (
                <span className="pp-price">{formatPrice(product.price, product.currency)}</span>
              )}
            </div>

            {/* Short description */}
            {product.shortDescription && (
              <p className="pp-short-desc">{product.shortDescription}</p>
            )}

            {/* Metadata */}
            <div className="pp-badges">
              {product.concentration && <span className="badge badge-muted">{product.concentration}</span>}
              {product.volume && <span className="badge badge-muted">{product.volume}</span>}
              {product.gender && <span className="badge badge-muted">{product.gender.charAt(0).toUpperCase() + product.gender.slice(1)}</span>}
              {product.stockStatus === 'low_stock' && <span className="badge badge-sale">Low Stock</span>}
            </div>

            {/* Quantity */}
            <div className="pp-qty-section">
              <div className="pp-section-label">QUANTITY</div>
              <div className="qty-control">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease quantity">
                  <Minus size={12} />
                </button>
                <input className="qty-value" readOnly value={qty} aria-label="Quantity" />
                <button className="qty-btn" onClick={() => setQty(q => q + 1)} aria-label="Increase quantity">
                  <Plus size={12} />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="pp-ctas">
              <button
                onClick={handleAddToBag}
                disabled={!inStock}
                className={`pp-add-btn ${addedToBag ? 'added' : ''} ${!inStock ? 'disabled' : ''}`}
                aria-label={inStock ? 'Add to bag' : 'Out of stock'}
              >
                {addedToBag ? (
                  <><Check size={14} /> ADDED TO BAG</>
                ) : inStock ? (
                  <><ShoppingBag size={14} /> ADD TO BAG</>
                ) : 'OUT OF STOCK'}
              </button>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pp-wa-btn"
                aria-label="Order via WhatsApp"
              >
                {WA_ICON}
                ORDER VIA WHATSAPP
              </a>

              <button
                onClick={() => setWishlist(w => !w)}
                className="pp-wishlist-btn"
                aria-label={wishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart size={14} fill={wishlist ? '#B8973A' : 'none'} />
                {wishlist ? 'SAVED TO WISHLIST' : 'ADD TO WISHLIST'}
              </button>
            </div>

            {/* Added to bag confirmation */}
            {addedToBag && (
              <div className="pp-added-banner" role="status" aria-live="polite">
                <Check size={13} />
                <span>Added to bag.</span>
                <Link href="/cart" className="pp-view-bag-link">VIEW BAG →</Link>
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="pp-details">
          {product.description && (
            <div className="pp-section">
              <div className="pp-section-label">FRAGRANCE STORY</div>
              <p className="pp-desc-text">{product.description}</p>
            </div>
          )}

          {(topNotes.length > 0 || heartNotes.length > 0 || baseNotes.length > 0) && (
            <div className="pp-section">
              <div className="pp-section-label">FRAGRANCE NOTES</div>
              <FragrancePyramid topNotes={topNotes} heartNotes={heartNotes} baseNotes={baseNotes} />
            </div>
          )}

          {character.length > 0 && (
            <div className="pp-section">
              <div className="pp-section-label">CHARACTER</div>
              <div className="pp-char-list">
                {character.map(c => (
                  <span key={c} className="pp-char-item">{c}</span>
                ))}
              </div>
            </div>
          )}

          {bestFor.length > 0 && (
            <div className="pp-section">
              <div className="pp-section-label">BEST FOR</div>
              <div className="pp-badges">
                {bestFor.map(b => <span key={b} className="badge badge-muted">{b}</span>)}
              </div>
            </div>
          )}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="pp-related">
            <div className="pp-related-header">
              <h2 className="pp-related-title">YOU MAY ALSO LIKE</h2>
              <Link href="/shop" className="pp-view-all">VIEW ALL →</Link>
            </div>
            <ProductGrid products={related} columns={3} />
          </div>
        )}
      </div>

      <style>{`
        .pp-root {
          background: #070707;
          min-height: 100vh;
          /* push below fixed 64px header */
          padding: calc(64px + 1.5rem) 0 6rem;
        }

        /* Back */
        .pp-back {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: none;
          border: none;
          color: #7A7570;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          font-family: DM Sans, sans-serif;
          cursor: pointer;
          padding: 0;
          margin-bottom: 1rem;
          transition: color 0.15s;
          text-transform: uppercase;
        }
        .pp-back:hover { color: #F0EBE0; }

        /* Breadcrumb */
        .pp-breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          color: #7A7570;
          font-family: DM Sans, sans-serif;
          text-transform: uppercase;
          margin-bottom: 2.5rem;
        }
        .pp-bc-link { color: #7A7570; text-decoration: none; transition: color 0.15s; }
        .pp-bc-link:hover { color: #F0EBE0; }
        .pp-bc-cur { color: #B8B0A3; }

        /* Main grid */
        .pp-main {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: flex-start;
          margin-bottom: 5rem;
        }

        /* Gallery */
        .pp-main-img-wrap {
          position: relative;
          aspect-ratio: 3/4;
          background: #0e0e0e;
          border: 1px solid #1c1c1c;
          overflow: hidden;
          margin-bottom: 0.75rem;
        }
        .pp-thumbs {
          display: flex;
          gap: 0.5rem;
        }
        .pp-thumb {
          width: 72px;
          aspect-ratio: 1;
          position: relative;
          background: #131313;
          border: 1px solid #1c1c1c;
          cursor: pointer;
          overflow: hidden;
          flex-shrink: 0;
          transition: border-color 0.15s;
        }
        .pp-thumb.active { border-color: #B8973A; }
        .pp-thumb:hover { border-color: #B8973A80; }

        /* Info */
        .pp-info { padding-top: 0.5rem; }
        .pp-brand {
          font-size: 0.55rem;
          letter-spacing: 0.22em;
          color: #7A7570;
          margin-bottom: 0.5rem;
          font-family: DM Sans, sans-serif;
        }
        .pp-name {
          font-family: Playfair Display, Georgia, serif;
          font-size: clamp(1.6rem, 3vw, 2.5rem);
          color: #F0EBE0;
          font-weight: 400;
          line-height: 1.15;
          margin-bottom: 0.5rem;
        }
        .pp-family {
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          color: #B8973A;
          margin-bottom: 1.25rem;
          font-family: DM Sans, sans-serif;
        }
        .pp-price-row {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }
        .pp-price {
          font-family: Playfair Display, Georgia, serif;
          font-size: 1.6rem;
          color: #F0EBE0;
        }
        .pp-price-sale {
          font-family: Playfair Display, Georgia, serif;
          font-size: 1.6rem;
          color: #C9AA5A;
        }
        .pp-price-orig {
          font-family: Playfair Display, Georgia, serif;
          font-size: 1rem;
          color: #7A7570;
          text-decoration: line-through;
        }
        .pp-discount-badge {
          font-size: 0.55rem;
          letter-spacing: 0.12em;
          background: rgba(184,151,58,0.15);
          color: #B8973A;
          padding: 0.2rem 0.5rem;
          font-family: DM Sans, sans-serif;
          border: 1px solid rgba(184,151,58,0.3);
        }
        .pp-short-desc {
          color: #7A7570;
          font-size: 0.875rem;
          line-height: 1.7;
          margin-bottom: 1.5rem;
          border-left: 2px solid #B8973A;
          padding-left: 1rem;
          font-family: DM Sans, sans-serif;
        }
        .pp-badges {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1.75rem;
        }
        .pp-qty-section { margin-bottom: 1.5rem; }
        .pp-section-label {
          font-size: 0.55rem;
          letter-spacing: 0.22em;
          color: #B8973A;
          margin-bottom: 0.75rem;
          font-family: DM Sans, sans-serif;
          text-transform: uppercase;
        }

        /* CTAs */
        .pp-ctas {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          margin-bottom: 1rem;
        }
        .pp-add-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          background: #B8973A;
          color: #070707;
          border: none;
          padding: 1rem;
          font-size: 0.625rem;
          letter-spacing: 0.22em;
          font-family: DM Sans, sans-serif;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
          text-transform: uppercase;
        }
        .pp-add-btn:hover:not(.disabled):not(.added) { background: #C9AA5A; }
        .pp-add-btn.added { background: #2d6a2d; color: #fff; }
        .pp-add-btn.disabled { background: #252525; color: #7A7570; cursor: not-allowed; }
        .pp-wa-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: transparent;
          border: 1px solid #252525;
          color: #B8B0A3;
          padding: 1rem;
          font-size: 0.625rem;
          letter-spacing: 0.22em;
          font-family: DM Sans, sans-serif;
          text-decoration: none;
          transition: all 0.2s;
          text-transform: uppercase;
        }
        .pp-wa-btn:hover { border-color: #25D366; color: #25D366; }
        .pp-wishlist-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: transparent;
          border: none;
          color: #7A7570;
          padding: 0.5rem;
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          font-family: DM Sans, sans-serif;
          cursor: pointer;
          transition: color 0.2s;
          text-transform: uppercase;
        }
        .pp-wishlist-btn:hover { color: #B8973A; }

        /* Added banner */
        .pp-added-banner {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(45,106,45,0.15);
          border: 1px solid rgba(45,106,45,0.4);
          padding: 0.75rem 1rem;
          font-size: 0.7rem;
          color: #7AC97A;
          font-family: DM Sans, sans-serif;
          animation: fadeIn 0.2s ease;
        }
        .pp-view-bag-link {
          margin-left: auto;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          color: #B8973A;
          text-decoration: none;
          border-bottom: 1px solid rgba(184,151,58,0.4);
          padding-bottom: 1px;
        }
        .pp-view-bag-link:hover { color: #F0EBE0; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }

        /* Details */
        .pp-details {
          border-top: 1px solid #1c1c1c;
          max-width: 800px;
          margin-bottom: 5rem;
        }
        .pp-section {
          padding: 2.5rem 0;
          border-bottom: 1px solid #1c1c1c;
        }
        .pp-desc-text {
          color: #B8B0A3;
          font-size: 0.9375rem;
          line-height: 1.8;
          font-family: DM Sans, sans-serif;
          margin: 0;
        }
        .pp-char-list {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .pp-char-item {
          font-family: Playfair Display, Georgia, serif;
          font-size: 1.2rem;
          color: #F0EBE0;
          font-weight: 400;
        }

        /* Related */
        .pp-related { margin-top: 1rem; }
        .pp-related-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
        }
        .pp-related-title {
          font-family: Playfair Display, Georgia, serif;
          font-size: 1.75rem;
          color: #F0EBE0;
          font-weight: 400;
        }
        .pp-view-all {
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          color: #7A7570;
          border-bottom: 1px solid #252525;
          padding-bottom: 2px;
          font-family: DM Sans, sans-serif;
          text-decoration: none;
          transition: color 0.15s, border-color 0.15s;
        }
        .pp-view-all:hover { color: #B8973A; border-color: #B8973A; }

        /* Mobile */
        @media (max-width: 768px) {
          .pp-root { padding: 2rem 0 5rem; }
          .pp-main { grid-template-columns: 1fr; gap: 2rem; }
          .pp-info { padding-top: 0; }
          .pp-details { max-width: 100%; }
          .pp-related-title { font-size: 1.25rem; }
        }
        @media (max-width: 480px) {
          .pp-back { margin-bottom: 0.75rem; }
          .pp-name { font-size: 1.5rem; }
        }
      `}</style>
    </div>
  )
}
