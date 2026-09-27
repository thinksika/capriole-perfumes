'use client'
import Link from 'next/link'
import Image from 'next/image'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/lib/cart/cartStore'
import { formatPrice } from '@/lib/pricing/calculateDiscount'

const WA_NUMBER = '233547151094'

function buildQuickWhatsApp(items: ReturnType<typeof useCartStore.getState>['items'], subtotal: number): string {
  const lines = items.map(i =>
    `${i.quantity} × ${i.name} — ${formatPrice((i.discountedPrice ?? i.price) * i.quantity, 'GHS')}`
  ).join('\n')
  const total = formatPrice(subtotal, 'GHS')
  const msg = `CAPRIOLE PERFUMES\nQUICK ORDER\n\n${lines}\n\nSubtotal: ${total}\n\nPlease confirm my order and delivery details.`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, itemCount } = useCartStore()
  const sub = subtotal()
  const count = itemCount()

  return (
    <>
      {isOpen && (
        <div className="overlay" onClick={closeCart} style={{ zIndex: 58 }} />
      )}
      <div className={`drawer ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #1e1e1e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: '#B8973A', fontFamily: 'DM Sans, sans-serif' }}>YOUR BAG</div>
            {count > 0 && <div style={{ fontSize: '0.75rem', color: '#7A7570', marginTop: 2, fontFamily: 'DM Sans, sans-serif' }}>{count} item{count !== 1 ? 's' : ''}</div>}
          </div>
          <button onClick={closeCart} style={{ background: 'none', border: 'none', color: '#7A7570', cursor: 'pointer', display: 'flex', padding: 4 }} aria-label="Close cart">
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {count === 0 ? (
            <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
              <ShoppingBag size={32} color="#2a2a2a" style={{ margin: '0 auto 1.5rem' }} />
              <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.25rem', color: '#F0EBE0', fontWeight: 400, marginBottom: '0.75rem' }}>YOUR BAG IS EMPTY.</div>
              <p style={{ fontSize: '0.8125rem', color: '#7A7570', marginBottom: '1.5rem', fontFamily: 'DM Sans, sans-serif' }}>Discover a fragrance worth remembering.</p>
              <Link
                href="/shop"
                onClick={closeCart}
                style={{
                  display: 'inline-flex', alignItems: 'center',
                  fontSize: '0.6rem', letterSpacing: '0.15em',
                  color: '#B8973A', borderBottom: '1px solid #B8973A',
                  paddingBottom: '2px', transition: 'opacity 0.2s',
                  fontFamily: 'DM Sans, sans-serif',
                }}
              >
                SHOP FRAGRANCES
              </Link>
            </div>
          ) : (
            <div style={{ padding: '1rem 0' }}>
              {items.map(item => (
                <div key={item.id} style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #1e1e1e', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  {/* Image */}
                  <div style={{ width: 72, height: 96, background: '#151515', flexShrink: 0, position: 'relative' }}>
                    {item.thumbnail ? (
                      <Image src={item.thumbnail} alt={item.name} fill style={{ objectFit: 'cover' }} sizes="72px" />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1rem', color: '#B8973A' }}>C</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.5rem', letterSpacing: '0.15em', color: '#7A7570', marginBottom: 2, fontFamily: 'DM Sans, sans-serif' }}>CAPRIOLE</div>
                    <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '0.95rem', color: '#F0EBE0', fontWeight: 400, marginBottom: 4, lineHeight: 1.2 }}>{item.name}</div>
                    {item.family && <div style={{ fontSize: '0.6rem', color: '#7A7570', marginBottom: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>{item.family}</div>}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {/* Quantity */}
                      <div className="qty-control">
                        <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                          <Minus size={10} />
                        </button>
                        <input className="qty-value" readOnly value={item.quantity} />
                        <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
                          <Plus size={10} />
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                        <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '0.9rem', color: '#F0EBE0' }}>
                          {formatPrice((item.discountedPrice ?? item.price) * item.quantity, 'GHS')}
                        </span>
                        <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#7A7570', cursor: 'pointer', fontSize: '0.6rem', letterSpacing: '0.1em', fontFamily: 'DM Sans, sans-serif', padding: 0, transition: 'color 0.15s' }} className="remove-btn">
                          REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {count > 0 && (
          <div style={{ padding: '1.5rem', borderTop: '1px solid #1e1e1e' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: '#7A7570', fontFamily: 'DM Sans, sans-serif' }}>SUBTOTAL</span>
              <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1rem', color: '#F0EBE0' }}>{formatPrice(sub, 'GHS')}</span>
            </div>
            {/* Primary: WhatsApp Order */}
            <a
              href={buildQuickWhatsApp(items, sub)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeCart}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                background: '#25D366', color: '#fff',
                padding: '0.875rem', width: '100%',
                fontSize: '0.6rem', letterSpacing: '0.15em',
                fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
                marginBottom: '0.6rem', transition: 'background 0.2s',
                textDecoration: 'none',
              }}
              className="wa-order-btn"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              ORDER VIA WHATSAPP
            </a>
            {/* Secondary: Full Checkout */}
            <Link
              href="/checkout"
              onClick={closeCart}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#B8973A', color: '#070707',
                padding: '0.75rem', width: '100%',
                fontSize: '0.6rem', letterSpacing: '0.15em',
                fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
                marginBottom: '0.6rem', transition: 'background 0.2s',
              }}
              className="checkout-btn"
            >
              CHECKOUT
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'transparent', border: '1px solid #2a2a2a', color: '#B8B0A3',
                padding: '0.75rem', width: '100%',
                fontSize: '0.6rem', letterSpacing: '0.15em',
                fontFamily: 'DM Sans, sans-serif',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              className="view-bag-btn"
            >
              VIEW BAG
            </Link>
          </div>
        )}

        <style>{`
          .remove-btn:hover { color: #F0EBE0 !important; }
          .wa-order-btn:hover { background: #1da851 !important; }
          .checkout-btn:hover { background: #C9AA5A !important; }
          .view-bag-btn:hover { border-color: #B8973A !important; color: #B8973A !important; }
        `}</style>
      </div>
    </>
  )
}
