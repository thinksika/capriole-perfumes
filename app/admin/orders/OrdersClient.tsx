'use client'
import { useState } from 'react'

const STATUS_COLORS: Record<string, string> = {
  pending: '#9A978F',
  confirmed: '#C5A15A',
  processing: '#7a9a8a',
  shipped: '#7a8aba',
  delivered: '#4a9',
  cancelled: '#e07070',
}

export default function AdminOrdersClient({ orders }: { orders: any[] }) {
  const [filter, setFilter] = useState('all')
  const [updating, setUpdating] = useState<string | null>(null)

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id)
    try {
      await fetch(`/api/orders/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
      window.location.reload()
    } catch {}
    setUpdating(null)
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '0.5rem' }}>MANAGE</div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#F4F0E8', fontWeight: 300 }}>ORDERS</h1>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{ padding: '0.4rem 0.875rem', border: '1px solid', borderColor: filter === s ? '#C5A15A' : '#2a2a2a', color: filter === s ? '#C5A15A' : '#9A978F', background: 'transparent', fontSize: '0.55rem', letterSpacing: '0.12em', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s' }}>
            {s.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ background: '#101010', border: '1px solid #1e1e1e' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
              {['ORDER', 'CUSTOMER', 'PHONE', 'ITEMS', 'TOTAL', 'DELIVERY', 'STATUS', 'DATE'].map(h => (
                <th key={h} style={{ fontSize: '0.5rem', letterSpacing: '0.12em', color: '#9A978F', textAlign: 'left', padding: '0.875rem', fontWeight: 400 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((order: any) => (
              <tr key={order.id} style={{ borderBottom: '1px solid #1e1e1e' }}>
                <td style={{ padding: '0.875rem' }}>
                  <div style={{ fontSize: '0.8rem', color: '#C5A15A', marginBottom: 2 }}>#{order.orderNumber}</div>
                </td>
                <td style={{ padding: '0.875rem', fontSize: '0.8rem', color: '#C2BBAF' }}>{order.customerName}</td>
                <td style={{ padding: '0.875rem', fontSize: '0.75rem', color: '#9A978F' }}>
                  <a href={`https://wa.me/${order.customerPhone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: '#9A978F', transition: 'color 0.15s' }} className="wa-order-link">{order.customerPhone}</a>
                </td>
                <td style={{ padding: '0.875rem', fontSize: '0.8rem', color: '#9A978F' }}>{order.items?.length ?? 0}</td>
                <td style={{ padding: '0.875rem', fontFamily: 'Cormorant Garamond, serif', fontSize: '0.9rem', color: '#F4F0E8' }}>GHS {order.total?.toFixed(2)}</td>
                <td style={{ padding: '0.875rem', fontSize: '0.75rem', color: '#9A978F' }}>{order.deliveryMethod === 'pickup' ? 'Pickup' : order.city || 'Delivery'}</td>
                <td style={{ padding: '0.875rem' }}>
                  <select
                    value={order.status}
                    disabled={updating === order.id}
                    onChange={e => updateStatus(order.id, e.target.value)}
                    style={{ background: '#070707', border: '1px solid #2a2a2a', color: STATUS_COLORS[order.status] || '#9A978F', padding: '0.25rem 0.5rem', fontSize: '0.6rem', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif', cursor: 'pointer', width: 'auto' }}
                  >
                    {['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
                      <option key={s} value={s}>{s.toUpperCase()}</option>
                    ))}
                  </select>
                </td>
                <td style={{ padding: '0.875rem', fontSize: '0.7rem', color: '#9A978F' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p style={{ color: '#9A978F', fontSize: '0.8125rem', padding: '2rem' }}>No orders found.</p>}
      </div>
      <style>{`.wa-order-link:hover{color:#25D366!important;}`}</style>
    </div>
  )
}
