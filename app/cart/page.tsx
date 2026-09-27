'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCartStore } from '@/lib/cart/cartStore'
import { formatPrice } from '@/lib/pricing/calculateDiscount'
import { getProductImage } from '@/lib/products/types'

const DEFAULT_WA = '233547151094'
const WA_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

function buildCartWhatsApp(
  items: ReturnType<typeof useCartStore.getState>['items'],
  subtotal: number,
  waNum: string
): string {
  const orderNum = `CP-${Math.floor(1000 + Math.random() * 9000)}`
  const itemLines = items
    .map(i => `${i.quantity} × ${i.name}\n${formatPrice((i.discountedPrice ?? i.price) * i.quantity, 'GHS')}`)
    .join('\n\n')
  const msg =
    `CAPRIOLE PERFUMES\nORDER REQUEST\n\n` +
    `Order:\n#${orderNum}\n\n` +
    `Items:\n\n${itemLines}\n\n` +
    `Subtotal:\n${formatPrice(subtotal, 'GHS')}\n\n` +
    `Please confirm my order and delivery details.`
  return `https://wa.me/${waNum.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCartStore()
  const [waNumber, setWaNumber] = useState(DEFAULT_WA)
  const sub = subtotal()
  const count = itemCount()

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(d => {
      if (d.whatsappNumber) setWaNumber(d.whatsappNumber)
    }).catch(() => {})
  }, [])

  if (count === 0) {
    return (
      <div className="cart-empty">
        <ShoppingBag size={42} color="#252525" />
        <h1 className="cart-empty-title">YOUR BAG IS EMPTY.</h1>
        <p className="cart-empty-sub">Discover a fragrance worth remembering.</p>
        <div className="cart-empty-actions">
          <Link href="/shop" className="btn-gold">SHOP FRAGRANCES</Link>
          <Link href="/discover" className="btn-outline-muted">DISCOVER YOUR SCENT</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-root">
      <div className="container cart-container">
        {/* Back */}
        <Link href="/shop" className="cart-back">
          <ArrowLeft size={13} />
          CONTINUE SHOPPING
        </Link>

        {/* Header */}
        <div className="cart-header">
          <div className="cart-eyebrow">YOUR</div>
          <h1 className="cart-title">SHOPPING BAG</h1>
          <p className="cart-count">{count} item{count !== 1 ? 's' : ''}</p>
        </div>

        <div className="cart-grid">
          {/* Items */}
          <div>
            {items.map(item => {
              const imageSrc = item.thumbnail || getProductImage({ slug: item.slug })
              return (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-img-wrap">
                    <Image src={imageSrc} alt={item.name} fill style={{ objectFit: 'cover' }} sizes="80px" />
                  </div>
                  <div className="cart-item-body">
                    <div className="cart-item-top">
                      <div>
                        <div className="cart-item-brand">CAPRIOLE</div>
                        <Link href={`/product/${item.slug}`} className="cart-item-name">{item.name}</Link>
                        {item.volume && <div className="cart-item-meta">{item.volume}</div>}
                        {item.family && <div className="cart-item-meta">{item.family}</div>}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="cart-remove-btn"
                        aria-label={`Remove ${item.name}`}
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="cart-item-bottom">
                      <div className="qty-control">
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={10} />
                        </button>
                        <input className="qty-value" readOnly value={item.quantity} aria-label="Quantity" />
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                      <span className="cart-item-total">
                        {formatPrice((item.discountedPrice ?? item.price) * item.quantity, 'GHS')}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Summary */}
          <div className="cart-summary-wrap">
            <div className="cart-summary">
              <div className="cart-summary-label">ORDER SUMMARY</div>

              <div className="cart-summary-row">
                <span className="cart-summary-key">SUBTOTAL</span>
                <span className="cart-summary-val">{formatPrice(sub, 'GHS')}</span>
              </div>
              <p className="cart-delivery-note">Delivery fee confirmed on WhatsApp.</p>

              <div className="cart-summary-total-row">
                <span className="cart-summary-key">TOTAL</span>
                <span className="cart-summary-total-val">{formatPrice(sub, 'GHS')}</span>
              </div>

              <a
                href={buildCartWhatsApp(items, sub, waNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="cart-wa-btn"
                aria-label="Order via WhatsApp"
              >
                {WA_ICON}
                ORDER VIA WHATSAPP
              </a>

              <Link href="/checkout" className="cart-checkout-btn">
                CHECKOUT
              </Link>

              <Link href="/shop" className="cart-continue-btn">
                CONTINUE SHOPPING
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cart-root {
          background: #070707;
          min-height: 100vh;
          padding: 2.5rem 0 6rem;
        }
        .cart-container { max-width: 1100px; }

        .cart-back {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: #7A7570;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          font-family: DM Sans, sans-serif;
          text-decoration: none;
          text-transform: uppercase;
          margin-bottom: 1.25rem;
          transition: color 0.15s;
        }
        .cart-back:hover { color: #F0EBE0; }

        .cart-header { margin-bottom: 2.5rem; }
        .cart-eyebrow {
          font-size: 0.55rem;
          letter-spacing: 0.25em;
          color: #B8973A;
          margin-bottom: 0.5rem;
          font-family: DM Sans, sans-serif;
        }
        .cart-title {
          font-family: Playfair Display, Georgia, serif;
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          color: #F0EBE0;
          font-weight: 400;
        }
        .cart-count {
          color: #7A7570;
          font-size: 0.8rem;
          margin-top: 0.25rem;
          font-family: DM Sans, sans-serif;
        }

        .cart-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 3.5rem;
          align-items: flex-start;
        }

        /* Cart item */
        .cart-item {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 1.25rem;
          padding: 1.5rem 0;
          border-bottom: 1px solid #1c1c1c;
          align-items: flex-start;
        }
        .cart-item-img-wrap {
          background: #131313;
          aspect-ratio: 3/4;
          position: relative;
          border: 1px solid #1c1c1c;
          overflow: hidden;
        }
        .cart-item-body { display: flex; flex-direction: column; gap: 0.75rem; }
        .cart-item-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 0.75rem; }
        .cart-item-brand { font-size: 0.5rem; letter-spacing: 0.18em; color: #7A7570; margin-bottom: 2px; font-family: DM Sans, sans-serif; }
        .cart-item-name {
          font-family: Playfair Display, Georgia, serif;
          font-size: 1rem;
          color: #F0EBE0;
          font-weight: 400;
          text-decoration: none;
          line-height: 1.2;
          transition: color 0.15s;
        }
        .cart-item-name:hover { color: #B8973A; }
        .cart-item-meta { font-size: 0.7rem; color: #7A7570; margin-top: 2px; font-family: DM Sans, sans-serif; }
        .cart-remove-btn {
          background: none; border: none; color: #7A7570;
          cursor: pointer; padding: 2px; flex-shrink: 0;
          display: flex; transition: color 0.15s;
        }
        .cart-remove-btn:hover { color: #F0EBE0; }
        .cart-item-bottom { display: flex; justify-content: space-between; align-items: center; }
        .cart-item-total {
          font-family: Playfair Display, Georgia, serif;
          font-size: 1rem;
          color: #F0EBE0;
        }

        /* Summary */
        .cart-summary-wrap { position: sticky; top: 90px; }
        .cart-summary {
          background: #101010;
          border: 1px solid #1c1c1c;
          padding: 1.75rem;
        }
        .cart-summary-label {
          font-size: 0.55rem;
          letter-spacing: 0.22em;
          color: #B8973A;
          margin-bottom: 1.5rem;
          font-family: DM Sans, sans-serif;
        }
        .cart-summary-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.5rem;
        }
        .cart-summary-key {
          font-size: 0.65rem;
          color: #7A7570;
          letter-spacing: 0.12em;
          font-family: DM Sans, sans-serif;
        }
        .cart-summary-val {
          font-family: Playfair Display, Georgia, serif;
          font-size: 1.1rem;
          color: #F0EBE0;
        }
        .cart-delivery-note {
          font-size: 0.7rem;
          color: #7A7570;
          line-height: 1.5;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #1c1c1c;
          font-family: DM Sans, sans-serif;
        }
        .cart-summary-total-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 1.5rem;
          padding-top: 0.25rem;
        }
        .cart-summary-total-val {
          font-family: Playfair Display, Georgia, serif;
          font-size: 1.3rem;
          color: #F0EBE0;
        }

        /* CTA buttons */
        .cart-wa-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: #25D366;
          color: #fff;
          padding: 0.9rem;
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          font-family: DM Sans, sans-serif;
          font-weight: 500;
          margin-bottom: 0.6rem;
          text-decoration: none;
          transition: background 0.2s;
          text-transform: uppercase;
          width: 100%;
          box-sizing: border-box;
        }
        .cart-wa-btn:hover { background: #1da851; }
        .cart-checkout-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #B8973A;
          color: #070707;
          padding: 0.8rem;
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          font-family: DM Sans, sans-serif;
          font-weight: 500;
          margin-bottom: 0.6rem;
          text-decoration: none;
          transition: background 0.2s;
          text-transform: uppercase;
          width: 100%;
          box-sizing: border-box;
        }
        .cart-checkout-btn:hover { background: #C9AA5A; }
        .cart-continue-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid #252525;
          color: #B8B0A3;
          padding: 0.8rem;
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          font-family: DM Sans, sans-serif;
          text-decoration: none;
          transition: all 0.2s;
          text-transform: uppercase;
          width: 100%;
          box-sizing: border-box;
        }
        .cart-continue-btn:hover { border-color: #B8973A; color: #B8973A; }

        /* Empty state */
        .cart-empty {
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 4rem 1.5rem;
          gap: 1rem;
        }
        .cart-empty-title {
          font-family: Playfair Display, Georgia, serif;
          font-size: 2rem;
          color: #F0EBE0;
          font-weight: 400;
        }
        .cart-empty-sub {
          color: #7A7570;
          font-family: DM Sans, sans-serif;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }
        .cart-empty-actions { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; }
        .btn-gold {
          background: #B8973A;
          color: #070707;
          padding: 0.875rem 2rem;
          font-size: 0.625rem;
          letter-spacing: 0.18em;
          font-family: DM Sans, sans-serif;
          font-weight: 500;
          text-decoration: none;
        }
        .btn-outline-muted {
          background: transparent;
          border: 1px solid #252525;
          color: #B8B0A3;
          padding: 0.875rem 2rem;
          font-size: 0.625rem;
          letter-spacing: 0.18em;
          font-family: DM Sans, sans-serif;
          text-decoration: none;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .cart-grid { grid-template-columns: 1fr; gap: 2rem; }
          .cart-summary-wrap { position: static; }
        }
        @media (max-width: 600px) {
          .cart-root { padding: 1.75rem 0 5rem; }
          .cart-item { grid-template-columns: 64px 1fr; gap: 1rem; }
          .cart-item-img-wrap { width: 64px; }
        }
      `}</style>
    </div>
  )
}
