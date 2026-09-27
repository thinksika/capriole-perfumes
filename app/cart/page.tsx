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
  <svg width="14" height="14" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }}>
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
  const { items, removeItem, updateQuantity, subtotal, itemCount, closeCart } = useCartStore()
  const [waNumber, setWaNumber] = useState(DEFAULT_WA)
  const sub = subtotal()
  const count = itemCount()

  // Close the drawer immediately when the full cart page mounts
  useEffect(() => {
    closeCart()
  }, [closeCart])

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(d => {
      if (d.whatsappNumber) setWaNumber(d.whatsappNumber)
    }).catch(() => {})
  }, [])

  if (count === 0) {
    return (
      <div className="cart-empty-page">
        <ShoppingBag size={40} color="#252525" />
        <h1 className="cart-empty-title">YOUR BAG IS EMPTY.</h1>
        <p className="cart-empty-sub">Discover a fragrance worth remembering.</p>
        <Link href="/shop" className="cart-empty-cta">SHOP FRAGRANCES</Link>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="cart-inner">

        {/* ← CONTINUE SHOPPING */}
        <Link href="/shop" className="cart-back">
          <ArrowLeft size={13} />
          CONTINUE SHOPPING
        </Link>

        {/* Page heading */}
        <div className="cart-heading">
          <div className="cart-eyebrow">YOUR</div>
          <h1 className="cart-title">SHOPPING BAG</h1>
          <p className="cart-count">{count} item{count !== 1 ? 's' : ''}</p>
        </div>

        {/* Layout: items + summary */}
        <div className="cart-layout">

          {/* Items column */}
          <div className="cart-items">
            {items.map(item => {
              const imgSrc = item.thumbnail || getProductImage({ slug: item.slug })
              return (
                <div key={item.id} className="cart-item">
                  {/* Image */}
                  <div className="cart-item-img">
                    <Image
                      src={imgSrc}
                      alt={item.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="80px"
                    />
                  </div>

                  {/* Details */}
                  <div className="cart-item-body">
                    <div className="cart-item-top">
                      <div className="cart-item-info">
                        <div className="cart-item-brand">CAPRIOLE</div>
                        <Link href={`/product/${item.slug}`} className="cart-item-name">
                          {item.name}
                        </Link>
                        {item.family && <div className="cart-item-meta">{item.family}</div>}
                        {item.volume && <div className="cart-item-meta">{item.volume}</div>}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="cart-remove"
                        aria-label={`Remove ${item.name}`}
                      >
                        <X size={15} />
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
                        <input
                          className="qty-value"
                          readOnly
                          value={item.quantity}
                          aria-label="Quantity"
                        />
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                      <span className="cart-item-price">
                        {formatPrice((item.discountedPrice ?? item.price) * item.quantity, 'GHS')}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Summary column */}
          <div className="cart-summary-col">
            <div className="cart-summary-box">
              <div className="cart-summary-label">ORDER SUMMARY</div>

              <div className="cart-summary-row">
                <span className="cart-summary-key">SUBTOTAL</span>
                <span className="cart-summary-val">{formatPrice(sub, 'GHS')}</span>
              </div>

              <div className="cart-summary-total-row">
                <span className="cart-summary-key">TOTAL</span>
                <span className="cart-summary-total">{formatPrice(sub, 'GHS')}</span>
              </div>

              <p className="cart-delivery-note">Delivery fee confirmed on WhatsApp.</p>

              <a
                href={buildCartWhatsApp(items, sub, waNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="cart-btn-wa"
                aria-label="Order via WhatsApp"
              >
                {WA_ICON}
                ORDER VIA WHATSAPP
              </a>

              <Link href="/checkout" className="cart-btn-checkout">
                CHECKOUT
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ─── PAGE ROOT ─── */
        .cart-page {
          background: #070707;
          min-height: 100vh;
          /* push content below fixed header (64px desktop, 64px mobile) */
          padding-top: 64px;
        }
        .cart-inner {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 2rem 6rem;
        }

        /* ─── BACK LINK ─── */
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
          margin-bottom: 1.5rem;
          transition: color 0.15s;
        }
        .cart-back:hover { color: #F0EBE0; }

        /* ─── HEADING ─── */
        .cart-heading { margin-bottom: 2rem; }
        .cart-eyebrow {
          font-size: 0.55rem;
          letter-spacing: 0.25em;
          color: #B8973A;
          margin-bottom: 0.35rem;
          font-family: DM Sans, sans-serif;
        }
        .cart-title {
          font-family: Playfair Display, Georgia, serif;
          font-size: clamp(1.5rem, 4vw, 2.25rem);
          color: #F0EBE0;
          font-weight: 400;
          line-height: 1.1;
        }
        .cart-count {
          color: #7A7570;
          font-size: 0.8rem;
          margin-top: 0.25rem;
          font-family: DM Sans, sans-serif;
        }

        /* ─── TWO-COLUMN LAYOUT ─── */
        .cart-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 3rem;
          align-items: flex-start;
        }

        /* ─── CART ITEM ─── */
        .cart-item {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 1rem;
          padding: 1.25rem 0;
          border-bottom: 1px solid #1c1c1c;
        }
        .cart-item-img {
          position: relative;
          aspect-ratio: 3/4;
          background: #131313;
          border: 1px solid #1c1c1c;
          overflow: hidden;
          flex-shrink: 0;
        }
        .cart-item-body {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 0.75rem;
          min-width: 0;
        }
        .cart-item-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 0.5rem;
        }
        .cart-item-info { min-width: 0; flex: 1; }
        .cart-item-brand {
          font-size: 0.48rem;
          letter-spacing: 0.18em;
          color: #7A7570;
          margin-bottom: 2px;
          font-family: DM Sans, sans-serif;
        }
        .cart-item-name {
          font-family: Playfair Display, Georgia, serif;
          font-size: 0.975rem;
          color: #F0EBE0;
          font-weight: 400;
          text-decoration: none;
          line-height: 1.25;
          display: block;
          word-break: break-word;
          transition: color 0.15s;
        }
        .cart-item-name:hover { color: #B8973A; }
        .cart-item-meta {
          font-size: 0.7rem;
          color: #7A7570;
          margin-top: 2px;
          font-family: DM Sans, sans-serif;
        }
        .cart-remove {
          background: none;
          border: none;
          color: #7A7570;
          cursor: pointer;
          padding: 2px;
          flex-shrink: 0;
          display: flex;
          transition: color 0.15s;
        }
        .cart-remove:hover { color: #F0EBE0; }

        .cart-item-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .cart-item-price {
          font-family: Playfair Display, Georgia, serif;
          font-size: 1rem;
          color: #F0EBE0;
          white-space: nowrap;
        }

        /* ─── SUMMARY BOX ─── */
        .cart-summary-col { position: sticky; top: 80px; }
        .cart-summary-box {
          background: #101010;
          border: 1px solid #1c1c1c;
          padding: 1.5rem;
        }
        .cart-summary-label {
          font-size: 0.55rem;
          letter-spacing: 0.22em;
          color: #B8973A;
          margin-bottom: 1.25rem;
          font-family: DM Sans, sans-serif;
        }
        .cart-summary-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.5rem;
        }
        .cart-summary-total-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          border-top: 1px solid #1c1c1c;
          padding-top: 0.75rem;
          margin-top: 0.25rem;
          margin-bottom: 0.75rem;
        }
        .cart-summary-key {
          font-size: 0.6rem;
          color: #7A7570;
          letter-spacing: 0.12em;
          font-family: DM Sans, sans-serif;
        }
        .cart-summary-val {
          font-family: Playfair Display, Georgia, serif;
          font-size: 1rem;
          color: #F0EBE0;
        }
        .cart-summary-total {
          font-family: Playfair Display, Georgia, serif;
          font-size: 1.2rem;
          color: #F0EBE0;
        }
        .cart-delivery-note {
          font-size: 0.7rem;
          color: #7A7570;
          line-height: 1.5;
          margin-bottom: 1.25rem;
          font-family: DM Sans, sans-serif;
        }

        /* ─── CTA BUTTONS ─── */
        .cart-btn-wa {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: #25D366;
          color: #fff;
          padding: 0.9rem 1rem;
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
          white-space: nowrap;
        }
        .cart-btn-wa:hover { background: #1da851; }
        .cart-btn-checkout {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #B8973A;
          color: #070707;
          padding: 0.85rem 1rem;
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          font-family: DM Sans, sans-serif;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.2s;
          text-transform: uppercase;
          width: 100%;
          box-sizing: border-box;
        }
        .cart-btn-checkout:hover { background: #C9AA5A; }

        /* ─── EMPTY STATE ─── */
        .cart-empty-page {
          min-height: 100vh;
          padding-top: 64px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 1rem;
          padding-left: 1.25rem;
          padding-right: 1.25rem;
          padding-bottom: 4rem;
          background: #070707;
        }
        .cart-empty-title {
          font-family: Playfair Display, Georgia, serif;
          font-size: clamp(1.5rem, 5vw, 2rem);
          color: #F0EBE0;
          font-weight: 400;
        }
        .cart-empty-sub {
          color: #7A7570;
          font-family: DM Sans, sans-serif;
          font-size: 0.875rem;
        }
        .cart-empty-cta {
          background: #B8973A;
          color: #070707;
          padding: 0.875rem 2rem;
          font-size: 0.625rem;
          letter-spacing: 0.18em;
          font-family: DM Sans, sans-serif;
          font-weight: 500;
          text-decoration: none;
          margin-top: 0.5rem;
        }

        /* ─── DESKTOP: summary sticks ─── */
        @media (min-width: 1025px) {
          .cart-summary-col { position: sticky; top: 80px; }
        }

        /* ─── TABLET / MOBILE: stack layout ─── */
        @media (max-width: 1024px) {
          .cart-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .cart-summary-col { position: static; }
        }

        /* ─── MOBILE SPECIFIC ─── */
        @media (max-width: 768px) {
          .cart-inner {
            padding: 1.5rem 1.25rem 5rem;
          }
          .cart-item {
            grid-template-columns: 72px 1fr;
            gap: 0.875rem;
          }
        }

        /* ─── SMALL MOBILE (320px–375px) ─── */
        @media (max-width: 400px) {
          .cart-inner {
            padding: 1.25rem 1rem 5rem;
          }
          .cart-item {
            grid-template-columns: 64px 1fr;
            gap: 0.75rem;
          }
          .cart-item-name { font-size: 0.875rem; }
          .cart-btn-wa,
          .cart-btn-checkout {
            font-size: 0.55rem;
            letter-spacing: 0.12em;
            padding: 0.85rem 0.75rem;
          }
        }
      `}</style>
    </div>
  )
}
