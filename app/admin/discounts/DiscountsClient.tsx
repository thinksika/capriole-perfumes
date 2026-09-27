'use client'
import { useState } from 'react'

export default function DiscountsClient({ discounts: initial }: { discounts: any[] }) {
  const [discounts, setDiscounts] = useState<any[]>(initial)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', type: 'percentage', value: '', scope: 'all', startDate: '', endDate: '', active: true })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = (key: string, val: any) => setForm(f => ({ ...f, [key]: val }))

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.value) { setError('Name and value are required'); return }
    setSaving(true); setError('')
    try {
      const res = await fetch('/api/discounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(await res.text())
      const created = await res.json()
      setDiscounts(d => [created, ...d])
      setShowForm(false)
      setForm({ name: '', type: 'percentage', value: '', scope: 'all', startDate: '', endDate: '', active: true })
    } catch (err: any) { setError(err.message || 'Failed') }
    setSaving(false)
  }

  const toggleActive = async (id: string, current: boolean) => {
    try {
      const d = discounts.find(x => x.id === id)
      await fetch(`/api/discounts/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...d, active: !current }) })
      setDiscounts(ds => ds.map(x => x.id === id ? { ...x, active: !current } : x))
    } catch {}
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete discount "${name}"?`)) return
    try {
      await fetch(`/api/discounts/${id}`, { method: 'DELETE' })
      setDiscounts(ds => ds.filter(x => x.id !== id))
    } catch {}
  }

  const F = ({ id, label, children }: { id: string; label: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: '1rem' }}>
      <label htmlFor={id} style={{ display: 'block', fontSize: '0.55rem', letterSpacing: '0.15em', color: '#9A978F', marginBottom: '0.5rem', fontFamily: 'Inter, sans-serif' }}>{label}</label>
      {children}
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '0.5rem' }}>MANAGE</div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#F4F0E8', fontWeight: 300 }}>DISCOUNTS</h1>
        </div>
        <button onClick={() => setShowForm(s => !s)} style={{ background: '#C5A15A', border: 'none', color: '#070707', padding: '0.75rem 1.5rem', fontSize: '0.6rem', letterSpacing: '0.15em', fontFamily: 'Inter, sans-serif', fontWeight: 500, cursor: 'pointer' }} className="new-btn">{showForm ? 'CANCEL' : '+ NEW DISCOUNT'}</button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} style={{ background: '#101010', border: '1px solid #1e1e1e', padding: '2rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '1.5rem' }}>NEW DISCOUNT</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <F id="d-name" label="NAME *"><input id="d-name" value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. CAPRIOLE15" required /></F>
            <F id="d-type" label="TYPE">
              <select id="d-type" value={form.type} onChange={e => set('type', e.target.value)}>
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed (GHS)</option>
              </select>
            </F>
            <F id="d-value" label="VALUE *"><input id="d-value" type="number" step="0.01" min="0" value={form.value} onChange={e => set('value', e.target.value)} placeholder={form.type === 'percentage' ? '15' : '100'} required /></F>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <F id="d-scope" label="APPLIES TO">
              <select id="d-scope" value={form.scope} onChange={e => set('scope', e.target.value)}>
                <option value="all">All Products</option>
                <option value="collection">Collection</option>
                <option value="product">Specific Product</option>
              </select>
            </F>
            <F id="d-start" label="START DATE"><input id="d-start" type="date" value={form.startDate} onChange={e => set('startDate', e.target.value)} /></F>
            <F id="d-end" label="END DATE"><input id="d-end" type="date" value={form.endDate} onChange={e => set('endDate', e.target.value)} /></F>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#C2BBAF', cursor: 'pointer', marginBottom: '1.5rem' }}>
            <input type="checkbox" checked={form.active} onChange={e => set('active', e.target.checked)} style={{ width: 'auto', accentColor: '#C5A15A' }} />
            Active immediately
          </label>
          {error && <div style={{ background: 'rgba(224,112,112,0.1)', border: '1px solid rgba(224,112,112,0.3)', padding: '0.75rem', marginBottom: '1rem', fontSize: '0.8rem', color: '#e07070' }}>{error}</div>}
          <button type="submit" disabled={saving} style={{ background: saving ? '#9a7a3a' : '#C5A15A', border: 'none', color: '#070707', padding: '0.75rem 1.5rem', fontSize: '0.6rem', letterSpacing: '0.15em', fontFamily: 'Inter, sans-serif', fontWeight: 500, cursor: 'pointer' }}>
            {saving ? 'CREATING...' : 'CREATE DISCOUNT'}
          </button>
        </form>
      )}

      <div style={{ background: '#101010', border: '1px solid #1e1e1e' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
              {['NAME', 'TYPE', 'VALUE', 'SCOPE', 'EXPIRES', 'STATUS', 'ACTIONS'].map(h => (
                <th key={h} style={{ fontSize: '0.5rem', letterSpacing: '0.12em', color: '#9A978F', textAlign: 'left', padding: '0.875rem', fontWeight: 400 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {discounts.map(d => (
              <tr key={d.id} style={{ borderBottom: '1px solid #1e1e1e' }}>
                <td style={{ padding: '0.875rem', fontFamily: 'Cormorant Garamond, serif', fontSize: '0.95rem', color: '#F4F0E8' }}>{d.name}</td>
                <td style={{ padding: '0.875rem', fontSize: '0.75rem', color: '#9A978F' }}>{d.type}</td>
                <td style={{ padding: '0.875rem', fontFamily: 'Cormorant Garamond, serif', fontSize: '0.9rem', color: '#C5A15A' }}>{d.type === 'percentage' ? `${d.value}%` : `GHS ${d.value}`}</td>
                <td style={{ padding: '0.875rem', fontSize: '0.75rem', color: '#9A978F' }}>{d.scope}</td>
                <td style={{ padding: '0.875rem', fontSize: '0.75rem', color: '#9A978F' }}>{d.endDate ? new Date(d.endDate).toLocaleDateString() : '—'}</td>
                <td style={{ padding: '0.875rem' }}>
                  <button onClick={() => toggleActive(d.id, d.active)} style={{ fontSize: '0.55rem', letterSpacing: '0.1em', padding: '0.2rem 0.5rem', border: '1px solid', borderColor: d.active ? '#4a9' : '#9A978F', color: d.active ? '#4a9' : '#9A978F', background: 'transparent', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s' }}>
                    {d.active ? 'ACTIVE' : 'INACTIVE'}
                  </button>
                </td>
                <td style={{ padding: '0.875rem' }}>
                  <button onClick={() => handleDelete(d.id, d.name)} style={{ fontSize: '0.6rem', color: '#e07070', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif', transition: 'opacity 0.15s' }}>DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {discounts.length === 0 && <p style={{ color: '#9A978F', padding: '2rem', fontSize: '0.8125rem' }}>No discounts yet.</p>}
      </div>
      <style>{`.new-btn:hover{background:#D7BD80!important;}`}</style>
    </div>
  )
}
