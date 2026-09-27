'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, X, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/lib/cart/cartStore'
import { formatPrice } from '@/lib/pricing/calculateDiscount'
import { getProductImage } from '@/lib/products/types'

const DEFAULT_WA = '233547151094'

function buildCartWhatsApp(items: ReturnType<typeof useCartStore.getState>['items'], subtotal: number, waNum: string): string {
  const lines = items.map(i =>
    `${i.quantity} × ${i.name} — ${formatPrice((i.discountedPrice ?? i.price) * i.quantity, 'GHS')}`
  ).join('\n')
  const msg = `CAPRIOLE PERFUMES\nORDER REQUEST\n\n${lines}\n\nSubtotal: ${formatPrice(subtotal, 'GHS')}\n\nPlease confirm my order and delivery details.`
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
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 1.5rem' }}>
        <ShoppingBag size={42} color="#252525" style={{ marginBottom: '1.5rem' }} />
        <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '2rem', color: '#F0EBE0', fontWeight: 400, marginBottom: '1rem' }}>YOUR BAG IS EMPTY.</h1>
        <p style={{ color: '#7A7570', marginBottom: '2rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem' }}>Discover a fragrance worth remembering.</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/shop" style={{ background: '#B8973A', color: '#070707', padding: '0.875rem 2rem', fontSize: '0.625rem', letterSpacing: '0.18em', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, textDecoration: 'none' }}>SHOP FRAGRANCES</Link>
          <Link href="/discover" style={{ background: 'transparent', border: '1px solid #252525', color: '#B8B0A3', padding: '0.875rem 2rem', fontSize: '0.625rem', letterSpacing: '0.18em', fontFamily: 'DM Sans, sans-serif', textDecoration: 'none' }}>DISCOVER YOUR SCENT</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#070707', minHeight: '100vh', padding: '3rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: 1100 }}>
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>YOUR</div>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: '#F0EBE0', fontWeight: 400 }}>SHOPPING BAG</h1>
          <p style={{ color: '#7A7570', fontSize: '0.8rem', marginTop: '0.5rem', fontFamily: 'DM Sans, sans-serif' }}>{count} item{count !== 1 ? 's' : ''}</p>
        </div>

        <div className="cart-grid">
          {/* Items */}
          <div>
            {items.map(item => {
              const imageSrc = item.thumbnail || getProductImage({ slug: item.slug })
              return (
                <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1.5rem', padding: '1.5rem 0', borderBottom: '1px solid #1c1c1c', alignItems: 'flex-start' }}>
                  <div style={{ background: '#131313', aspectRatio: '3/4', position: 'relative', border: '1px solid #1c1c1c', overflow: 'hidden' }}>
                    <Image src={imageSrc} alt={item.name} fill style={{ objectFit: 'cover' }} sizes="80px" />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                      <div>
                        <div style={{ fontSize: '0.5rem', letterSpacing: '0.18em', color: '#7A7570', marginBottom: 4, fontFamily: 'DM Sans, sans-serif' }}>CAPRIOLE</div>
                        <Link href={`/product/${item.slug}`} style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.1rem', color: '#F0EBE0', fontWeight: 400, textDecoration: 'none' }}>{item.name}</Link>
                        {item.family && <div style={{ fontSize: '0.7rem', color: '#7A7570', marginTop: 4, fontFamily: 'DM Sans, sans-serif' }}>{item.family}</div>}
                      </div>
                      <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#7A7570', cursor: 'pointer', display: 'flex', transition: 'color 0.15s', padding: 4 }} className="remove-cart-btn" aria-label="Remove item">
                        <X size={16} />
                      </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                      <div className="qty-control">
                        <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={10} /></button>
                        <input className="qty-value" readOnly value={item.quantity} />
                        <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={10} /></button>
                      </div>
                      <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.05rem', color: '#F0EBE0' }}>
                        {formatPrice((item.discountedPrice ?? item.price) * item.quantity, 'GHS')}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Summary */}
          <div style={{ position: 'sticky', top: 90 }}>
            <div style={{ background: '#101010', border: '1px solid #1c1c1c', padding: '2rem' }}>
              <div style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#B8973A', marginBottom: '1.5rem', fontFamily: 'DM Sans, sans-serif' }}>ORDER SUMMARY</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.7rem', color: '#7A7570', letterSpacing: '0.12em', fontFamily: 'DM Sans, sans-serif' }}>SUBTOTAL</span>
                <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.15rem', color: '#F0EBE0' }}>{formatPrice(sub, 'GHS')}</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#7A7570', marginBottom: '1.5rem', lineHeight: 1.6, fontFamily: 'DM Sans, sans-serif', paddingBottom: '1.5rem', borderBottom: '1px solid #1c1c1c' }}>
                Delivery fee confirmed on WhatsApp.
              </p>
              {/* PRIMARY: WhatsApp Order */}
              <a
                href={buildCartWhatsApp(items, sub, waNumber)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                  background: '#25D366', color: '#fff',
                  padding: '0.9rem', fontSize: '0.625rem', letterSpacing: '0.18em',
                  fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
                  marginBottom: '0.65rem', transition: 'background 0.2s', textDecoration: 'none',
                }}
                className="wa-order-link"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                ORDER VIA WHATSAPP
              </a>
              {/* SECONDARY: Full Checkout */}
              <Link
                href="/checkout"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: '#B8973A', color: '#070707',
                  padding: '0.8rem', fontSize: '0.625rem', letterSpacing: '0.18em',
                  fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
                  marginBottom: '0.65rem', transition: 'background 0.2s', textDecoration: 'none',
                }}
                className="checkout-link"
              >
                CHECKOUT
              </Link>
              <Link
                href="/shop"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'transparent', border: '1px solid #252525', color: '#B8B0A3',
                  padding: '0.8rem', fontSize: '0.625rem', letterSpacing: '0.18em',
                  fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s', textDecoration: 'none',
                }}
                className="continue-btn"
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .cart-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 4rem;
          align-items: flex-start;
        }
        .remove-cart-btn:hover { color: #F0EBE0 !important; }
        .wa-order-link:hover { background: #1da851 !important; }
        .checkout-link:hover { background: #C9AA5A !important; }
        .continue-btn:hover { border-color: #B8973A !important; color: #B8973A !important; }
        @media (max-width: 1024px) {
          .cart-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </div>
  )
}
