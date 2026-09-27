'use client'
import { useState } from 'react'

const STATUS_OPTIONS = ['in_stock', 'low_stock', 'out_of_stock']
const STATUS_COLOR: Record<string, string> = { in_stock: '#4a9', low_stock: '#C5A15A', out_of_stock: '#e07070' }
const STATUS_LABEL: Record<string, string> = { in_stock: 'IN STOCK', low_stock: 'LOW STOCK', out_of_stock: 'OUT OF STOCK' }

export default function InventoryClient({ products }: { products: any[] }) {
  const [rows, setRows] = useState<any[]>(products)
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)

  const update = async (id: string, stockQuantity: number, stockStatus: string) => {
    setSaving(id)
    try {
      await fetch('/api/inventory', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, stockQuantity, stockStatus }),
      })
      setRows(r => r.map(p => p.id === id ? { ...p, stockQuantity, stockStatus } : p))
      setSaved(id)
      setTimeout(() => setSaved(null), 2000)
    } catch {}
    setSaving(null)
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '0.5rem' }}>MANAGE</div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#F4F0E8', fontWeight: 300 }}>INVENTORY</h1>
      </div>
      <div style={{ background: '#101010', border: '1px solid #1e1e1e' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
              {['PRODUCT', 'STOCK QTY', 'STATUS', ''].map(h => (
                <th key={h} style={{ fontSize: '0.5rem', letterSpacing: '0.15em', color: '#9A978F', textAlign: 'left', padding: '1rem', fontWeight: 400 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #1e1e1e' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.95rem', color: '#F4F0E8' }}>{p.name}</div>
                  <div style={{ fontSize: '0.65rem', color: '#9A978F' }}>{p.slug}</div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <input
                    type="number" min="0"
                    defaultValue={p.stockQuantity}
                    onBlur={e => update(p.id, parseInt(e.target.value) || 0, p.stockStatus)}
                    style={{ width: 80, background: '#070707', border: '1px solid #2a2a2a', color: '#F4F0E8', padding: '0.4rem 0.5rem', fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}
                  />
                </td>
                <td style={{ padding: '1rem' }}>
                  <select
                    defaultValue={p.stockStatus}
                    onChange={e => update(p.id, p.stockQuantity, e.target.value)}
                    style={{ background: '#070707', border: '1px solid #2a2a2a', color: STATUS_COLOR[p.stockStatus] || '#9A978F', padding: '0.4rem 0.5rem', fontSize: '0.6rem', letterSpacing: '0.08em', fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}
                  >
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
                  </select>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.65rem', color: '#4a9', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}>
                  {saving === p.id ? 'SAVING...' : saved === p.id ? 'SAVED ✓' : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p style={{ color: '#9A978F', padding: '2rem', fontSize: '0.8125rem' }}>No products found.</p>}
      </div>
    </div>
  )
}
