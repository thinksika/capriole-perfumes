'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const STATUSES = ['new', 'confirmed', 'processing', 'ready', 'out_for_delivery', 'completed', 'cancelled']
const STATUS_COLORS: Record<string, string> = {
  new: '#C5A15A',
  confirmed: '#7a9a8a',
  processing: '#7a8aba',
  ready: '#9a8aba',
  out_for_delivery: '#7abaab',
  completed: '#4a9',
  cancelled: '#e07070',
}

export default function OrderDetailClient({ order }: { order: any }) {
  const [status, setStatus] = useState(order.status)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const updateStatus = async (newStatus: string) => {
    setSaving(true)
    try {
      await fetch(`/api/orders/${order.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      setStatus(newStatus)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch {}
    setSaving(false)
  }

  const waNumber = order.customerPhone?.replace(/[^0-9]/g, '')
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ${order.customerName}, this is Capriole Perfumes regarding your order #${order.orderNumber}.`)}`

  const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div style={{ display: 'flex', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid #1e1e1e' }}>
      <span style={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: '#9A978F', width: 160, flexShrink: 0, fontFamily: 'Inter, sans-serif', paddingTop: 2 }}>{label}</span>
      <span style={{ fontSize: '0.875rem', color: '#F4F0E8', fontFamily: 'Inter, sans-serif' }}>{value}</span>
    </div>
  )

  return (
    <div style={{ maxWidth: 860 }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/admin/orders" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.6rem', letterSpacing: '0.12em', color: '#9A978F', textDecoration: 'none', marginBottom: '1rem' }}>
          <ArrowLeft size={13} /> BACK TO ORDERS
        </Link>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '0.5rem' }}>ORDER</div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#F4F0E8', fontWeight: 300 }}>#{order.orderNumber}</h1>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.7rem', color: STATUS_COLORS[status] || '#9A978F', border: `1px solid ${STATUS_COLORS[status] || '#9A978F'}`, padding: '0.3rem 0.75rem', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}>{status.toUpperCase().replace(/_/g, ' ')}</span>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#25D366', color: '#fff', padding: '0.5rem 1rem', fontSize: '0.6rem', letterSpacing: '0.12em', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}>CONTACT ON WHATSAPP</a>
          </div>
        </div>
      </div>

      {/* Status update */}
      <div style={{ background: '#101010', border: '1px solid #1e1e1e', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '1rem' }}>UPDATE STATUS</div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {STATUSES.map(s => (
            <button
              key={s}
              onClick={() => updateStatus(s)}
              disabled={saving || s === status}
              style={{
                padding: '0.4rem 0.875rem',
                border: '1px solid',
                borderColor: s === status ? STATUS_COLORS[s] || '#C5A15A' : '#2a2a2a',
                color: s === status ? STATUS_COLORS[s] || '#C5A15A' : '#9A978F',
                background: 'transparent',
                fontSize: '0.55rem', letterSpacing: '0.1em',
                cursor: s === status ? 'default' : 'pointer',
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.15s',
              }}
            >
              {s.toUpperCase().replace(/_/g, ' ')}
            </button>
          ))}
        </div>
        {saved && <div style={{ fontSize: '0.7rem', color: '#4a9', marginTop: '0.75rem', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}>STATUS UPDATED ✓</div>}
      </div>

      {/* Order info */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ background: '#101010', border: '1px solid #1e1e1e', padding: '1.5rem' }}>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '1rem' }}>CUSTOMER</div>
          <Row label="NAME" value={order.customerName} />
          <Row label="PHONE" value={<a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', textDecoration: 'none' }}>{order.customerPhone}</a>} />
          {order.customerEmail && <Row label="EMAIL" value={order.customerEmail} />}
        </div>
        <div style={{ background: '#101010', border: '1px solid #1e1e1e', padding: '1.5rem' }}>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '1rem' }}>DELIVERY</div>
          <Row label="METHOD" value={order.deliveryMethod === 'pickup' ? 'Store Pickup' : 'Delivery'} />
          {order.address && <Row label="ADDRESS" value={order.address} />}
          {order.city && <Row label="CITY" value={order.city} />}
          {order.region && <Row label="REGION" value={order.region} />}
          {order.notes && <Row label="NOTES" value={order.notes} />}
        </div>
      </div>

      {/* Items */}
      <div style={{ background: '#101010', border: '1px solid #1e1e1e', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '1rem' }}>ORDER ITEMS</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
              {['ITEM', 'UNIT PRICE', 'QTY', 'TOTAL'].map(h => (
                <th key={h} style={{ fontSize: '0.5rem', letterSpacing: '0.12em', color: '#9A978F', textAlign: 'left', padding: '0.5rem 0.75rem', fontWeight: 400 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {order.items.map((item: any) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #1e1e1e' }}>
                <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#F4F0E8', fontFamily: 'Cormorant Garamond, serif' }}>{item.name}</td>
                <td style={{ padding: '0.75rem', fontSize: '0.8rem', color: '#C2BBAF', fontFamily: 'Cormorant Garamond, serif' }}>GHS {item.price.toFixed(2)}</td>
                <td style={{ padding: '0.75rem', fontSize: '0.8rem', color: '#9A978F' }}>{item.quantity}</td>
                <td style={{ padding: '0.75rem', fontSize: '0.9rem', color: '#F4F0E8', fontFamily: 'Cormorant Garamond, serif' }}>GHS {item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ borderTop: '1px solid #1e1e1e', marginTop: '1rem', paddingTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.65rem', color: '#9A978F', fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}>SUBTOTAL</span>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', color: '#F4F0E8' }}>GHS {order.subtotal.toFixed(2)}</span>
          </div>
          {order.discountAmount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.65rem', color: '#9A978F', fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}>DISCOUNT</span>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', color: '#e07070' }}>-GHS {order.discountAmount.toFixed(2)}</span>
            </div>
          )}
          {order.deliveryFee > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.65rem', color: '#9A978F', fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}>DELIVERY</span>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', color: '#F4F0E8' }}>GHS {order.deliveryFee.toFixed(2)}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid #1e1e1e' }}>
            <span style={{ fontSize: '0.65rem', color: '#C5A15A', fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}>TOTAL</span>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', color: '#C5A15A' }}>GHS {order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Dates */}
      <div style={{ background: '#101010', border: '1px solid #1e1e1e', padding: '1.5rem' }}>
        <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '1rem' }}>TIMESTAMPS</div>
        <Row label="CREATED" value={new Date(order.createdAt).toLocaleString()} />
        <Row label="LAST UPDATED" value={new Date(order.updatedAt).toLocaleString()} />
      </div>
    </div>
  )
}
