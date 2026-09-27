'use client'
import { useState } from 'react'
import Link from 'next/link'

const ALL_STATUSES = ['new', 'confirmed', 'processing', 'ready', 'out_for_delivery', 'completed', 'cancelled']

const STATUS_COLORS: Record<string, string> = {
  new: '#C5A15A',
  confirmed: '#7a9a8a',
  processing: '#7a8aba',
  ready: '#9a8aba',
  out_for_delivery: '#7abaab',
  completed: '#4a9',
  cancelled: '#e07070',
}

const STATUS_LABEL: Record<string, string> = {
  new: 'NEW',
  confirmed: 'CONFIRMED',
  processing: 'PROCESSING',
  ready: 'READY',
  out_for_delivery: 'OUT FOR DELIVERY',
  completed: 'COMPLETED',
  cancelled: 'CANCELLED',
}

export default function AdminOrdersClient({ orders }: { orders: any[] }) {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [updating, setUpdating] = useState<string | null>(null)
  const [localOrders, setLocalOrders] = useState<any[]>(orders)

  const filtered = localOrders.filter(o => {
    if (filter !== 'all' && o.status !== filter) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        o.orderNumber?.toLowerCase().includes(q) ||
        o.customerName?.toLowerCase().includes(q) ||
        o.customerPhone?.includes(q)
      )
    }
    return true
  })

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id)
    try {
      await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      setLocalOrders(os => os.map(o => o.id === id ? { ...o, status } : o))
    } catch {}
    setUpdating(null)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '0.5rem', fontFamily: 'DM Sans, sans-serif' }}>MANAGE</div>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '2rem', color: '#F0EBE0', fontWeight: 400 }}>ORDERS</h1>
        </div>
        <input
          type="search"
          placeholder="Search by order #, name, phone..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: 260 }}
        />
      </div>

      {/* Status filters */}
      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {['all', ...ALL_STATUSES].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              padding: '0.35rem 0.75rem',
              border: '1px solid',
              borderColor: filter === s ? '#C5A15A' : '#2a2a2a',
              color: filter === s ? '#C5A15A' : '#7A7570',
              background: 'transparent',
              fontSize: '0.5rem', letterSpacing: '0.12em',
              cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
              transition: 'all 0.12s',
            }}
          >
            {s === 'all' ? 'ALL' : STATUS_LABEL[s]}
          </button>
        ))}
      </div>

      <div style={{ background: '#101010', border: '1px solid #1e1e1e', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
              {['ORDER', 'CUSTOMER', 'PHONE', 'ITEMS', 'TOTAL', 'STATUS', 'DATE', ''].map(h => (
                <th key={h} style={{ fontSize: '0.48rem', letterSpacing: '0.12em', color: '#7A7570', textAlign: 'left', padding: '0.875rem', fontWeight: 400, fontFamily: 'DM Sans, sans-serif' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((order: any) => (
              <tr key={order.id} style={{ borderBottom: '1px solid #1a1a1a' }} className="order-row">
                <td style={{ padding: '0.875rem' }}>
                  <Link href={`/admin/orders/${order.id}`} style={{ fontSize: '0.8rem', color: '#C5A15A', fontFamily: 'Playfair Display, serif', textDecoration: 'none' }}>
                    #{order.orderNumber}
                  </Link>
                </td>
                <td style={{ padding: '0.875rem', fontSize: '0.8rem', color: '#B8B0A3', fontFamily: 'DM Sans, sans-serif' }}>{order.customerName}</td>
                <td style={{ padding: '0.875rem', fontSize: '0.75rem', color: '#7A7570' }}>
                  <a
                    href={`https://wa.me/${order.customerPhone?.replace(/[^0-9]/g, '')}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ color: '#7A7570', transition: 'color 0.12s' }}
                    className="wa-link"
                  >
                    {order.customerPhone}
                  </a>
                </td>
                <td style={{ padding: '0.875rem', fontSize: '0.8rem', color: '#7A7570', fontFamily: 'DM Sans, sans-serif' }}>{order.items?.length ?? 0}</td>
                <td style={{ padding: '0.875rem', fontFamily: 'Playfair Display, serif', fontSize: '0.9rem', color: '#F0EBE0' }}>GHS {order.total?.toFixed(2)}</td>
                <td style={{ padding: '0.875rem' }}>
                  <select
                    value={order.status}
                    disabled={updating === order.id}
                    onChange={e => updateStatus(order.id, e.target.value)}
                    style={{
                      background: '#070707', border: '1px solid #2a2a2a',
                      color: STATUS_COLORS[order.status] || '#7A7570',
                      padding: '0.25rem 0.4rem', fontSize: '0.55rem',
                      letterSpacing: '0.08em', fontFamily: 'DM Sans, sans-serif',
                      cursor: 'pointer', width: 'auto',
                    }}
                  >
                    {ALL_STATUSES.map(s => (
                      <option key={s} value={s}>{STATUS_LABEL[s]}</option>
                    ))}
                  </select>
                </td>
                <td style={{ padding: '0.875rem', fontSize: '0.7rem', color: '#7A7570', fontFamily: 'DM Sans, sans-serif' }}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '0.875rem' }}>
                  <Link href={`/admin/orders/${order.id}`} style={{ fontSize: '0.55rem', letterSpacing: '0.1em', color: '#C5A15A', borderBottom: '1px solid rgba(197,161,90,0.3)', paddingBottom: 1, fontFamily: 'DM Sans, sans-serif', textDecoration: 'none' }}>
                    VIEW →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p style={{ color: '#7A7570', fontSize: '0.8125rem', padding: '2rem', fontFamily: 'DM Sans, sans-serif' }}>
            {search ? `No orders matching "${search}".` : 'No orders found.'}
          </p>
        )}
      </div>

      <style>{`
        .order-row:hover { background: rgba(255,255,255,0.015) !important; }
        .wa-link:hover { color: #25D366 !important; }
      `}</style>
    </div>
  )
}
