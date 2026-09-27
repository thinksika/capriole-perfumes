'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Copy, Phone } from 'lucide-react'

interface OrderData {
  orderNumber: string
  waUrl: string
  items: Array<{ name: string; quantity: number; price: number; total: number }>
  total: number
}

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<OrderData | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem('capriole_order')
    if (stored) setOrder(JSON.parse(stored))
  }, [])

  const copyDetails = () => {
    if (!order) return
    const text = `CAPRIOLE PERFUMES ORDER\n\nOrder: #${order.orderNumber}\n\nItems:\n${order.items.map(i => `${i.quantity}x ${i.name} — GHS ${i.total.toFixed(2)}`).join('\n')}\n\nTotal: GHS ${order.total.toFixed(2)}`
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }).catch(() => {})
  }

  return (
    <div style={{ minHeight: '100vh', background: '#070707', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: 560, width: '100%', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <CheckCircle size={48} color="#B8973A" strokeWidth={1} />
        </div>

        <div style={{ fontSize: '0.5rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>ORDER REQUEST READY</div>
        <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#F0EBE0', fontWeight: 400, marginBottom: '0.5rem' }}>THANK YOU.</h1>

        {order && (
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#7A7570', fontSize: '0.875rem', marginBottom: '0.5rem', fontFamily: 'DM Sans, sans-serif' }}>Your order has been prepared.</p>
            <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.25rem', color: '#C9AA5A' }}>#{order.orderNumber}</div>
          </div>
        )}

        <p style={{ color: '#7A7570', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '2.5rem', fontFamily: 'DM Sans, sans-serif' }}>
          Your order summary has been prepared for Capriole Perfumes on WhatsApp.
          Please open WhatsApp to send your order and confirm delivery details.
        </p>

        {/* Primary: Open WhatsApp */}
        {order?.waUrl && (
          <a
            href={order.waUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
              background: '#25D366', color: '#fff',
              padding: '1rem 2.5rem',
              fontSize: '0.6rem', letterSpacing: '0.2em',
              fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
              width: '100%', marginBottom: '1rem',
              transition: 'background 0.2s', textDecoration: 'none',
            }}
            className="open-wa-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            OPEN WHATSAPP
          </a>
        )}

        {/* Fallback options */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
          <button onClick={copyDetails} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'transparent', border: '1px solid #2a2a2a', color: '#B8B0A3', padding: '0.875rem', fontSize: '0.6rem', letterSpacing: '0.15em', fontFamily: 'DM Sans, sans-serif', cursor: 'pointer', transition: 'all 0.2s' }} className="fallback-btn">
            <Copy size={14} /> {copied ? 'COPIED!' : 'COPY DETAILS'}
          </button>
          <a href="tel:+233547151094" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'transparent', border: '1px solid #2a2a2a', color: '#B8B0A3', padding: '0.875rem', fontSize: '0.6rem', letterSpacing: '0.15em', fontFamily: 'DM Sans, sans-serif', textDecoration: 'none', transition: 'all 0.2s' }} className="fallback-btn">
            <Phone size={14} /> CALL CAPRIOLE
          </a>
        </div>

        <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.6rem', letterSpacing: '0.15em', color: '#7A7570', borderBottom: '1px solid #2a2a2a', paddingBottom: 2, transition: 'color 0.2s, border-color 0.2s', fontFamily: 'DM Sans, sans-serif' }} className="back-shop-link">
          BACK TO SHOP
        </Link>

        <style>{`
          .open-wa-btn:hover { background: #1da851 !important; }
          .fallback-btn:hover { border-color: #B8973A !important; color: #B8973A !important; }
          .back-shop-link:hover { color: #F0EBE0 !important; border-color: #7A7570 !important; }
        `}</style>
      </div>
    </div>
  )
}
