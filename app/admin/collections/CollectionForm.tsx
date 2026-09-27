'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CollectionForm({ collection, allProducts }: { collection?: any; allProducts?: any[] }) {
  const router = useRouter()
  const isEdit = !!collection
  const [form, setForm] = useState({
    name: collection?.name || '',
    slug: collection?.slug || '',
    description: collection?.description || '',
    philosophy: collection?.philosophy || '',
    image: collection?.image || '',
    published: collection?.published ?? true,
    sortOrder: collection?.sortOrder?.toString() || '0',
  })
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(
    collection?.products?.map((cp: any) => cp.productId) || []
  )
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  const set = (key: string, val: any) => setForm(f => ({ ...f, [key]: val }))
  const autoSlug = (n: string) => n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  const toggleProduct = (id: string) => {
    setSelectedProductIds(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name) { setError('Name is required'); return }
    setSaving(true); setError('')
    const payload = { ...form, sortOrder: parseInt(form.sortOrder) || 0, productIds: selectedProductIds }
    try {
      const url = isEdit ? `/api/collections/${collection.id}` : '/api/collections'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error(await res.text())
      setSaved(true)
      setTimeout(() => router.push('/admin/collections'), 800)
    } catch (err: any) {
      setError(err.message || 'Failed to save')
    } finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!isEdit || !confirm(`Delete "${collection.name}"? This cannot be undone.`)) return
    try {
      await fetch(`/api/collections/${collection.id}`, { method: 'DELETE' })
      router.push('/admin/collections')
    } catch { setError('Failed to delete') }
  }

  const F = ({ id, label, children }: { id: string; label: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: '1.25rem' }}>
      <label htmlFor={id} style={{ display: 'block', fontSize: '0.55rem', letterSpacing: '0.15em', color: '#9A978F', marginBottom: '0.5rem', fontFamily: 'Inter, sans-serif' }}>{label}</label>
      {children}
    </div>
  )

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 760 }}>
      <div style={{ background: '#101010', border: '1px solid #1e1e1e', padding: '2rem', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '1.5rem' }}>COLLECTION DETAILS</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <F id="col-name" label="NAME *">
            <input id="col-name" value={form.name} onChange={e => { set('name', e.target.value); if (!isEdit) set('slug', autoSlug(e.target.value)) }} placeholder="e.g. Oud" required />
          </F>
          <F id="col-slug" label="SLUG">
            <input id="col-slug" value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="e.g. oud" />
          </F>
        </div>
        <F id="col-desc" label="DESCRIPTION">
          <textarea id="col-desc" value={form.description} onChange={e => set('description', e.target.value)} rows={3} placeholder="Short collection description" />
        </F>
        <F id="col-philosophy" label="PHILOSOPHY / BRAND STORY">
          <textarea id="col-philosophy" value={form.philosophy} onChange={e => set('philosophy', e.target.value)} rows={3} placeholder="Longer story about this collection" />
        </F>
        <F id="col-image" label="COVER IMAGE URL">
          <input id="col-image" value={form.image} onChange={e => set('image', e.target.value)} placeholder="/images/..." />
        </F>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <F id="col-order" label="SORT ORDER">
            <input id="col-order" type="number" min="0" value={form.sortOrder} onChange={e => set('sortOrder', e.target.value)} />
          </F>
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: '#9A978F', marginBottom: '0.75rem', fontFamily: 'Inter, sans-serif' }}>VISIBILITY</div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#C2BBAF', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.published} onChange={e => set('published', e.target.checked)} style={{ width: 'auto', accentColor: '#C5A15A' }} />
              Published (visible on site)
            </label>
          </div>
        </div>
      </div>

      {allProducts && allProducts.length > 0 && (
        <div style={{ background: '#101010', border: '1px solid #1e1e1e', padding: '2rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '1rem' }}>PRODUCTS IN THIS COLLECTION ({selectedProductIds.length} selected)</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', maxHeight: 300, overflowY: 'auto' }}>
            {allProducts.map(p => (
              <label key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', cursor: 'pointer', background: selectedProductIds.includes(p.id) ? 'rgba(197,161,90,0.08)' : 'transparent', border: `1px solid ${selectedProductIds.includes(p.id) ? '#C5A15A' : '#1e1e1e'}`, transition: 'all 0.15s' }}>
                <input type="checkbox" checked={selectedProductIds.includes(p.id)} onChange={() => toggleProduct(p.id)} style={{ width: 'auto', accentColor: '#C5A15A' }} />
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#F4F0E8', fontFamily: 'Cormorant Garamond, serif' }}>{p.name}</div>
                  {p.fragranceFamily && <div style={{ fontSize: '0.65rem', color: '#9A978F' }}>{p.fragranceFamily}</div>}
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {error && <div style={{ background: 'rgba(224,112,112,0.1)', border: '1px solid rgba(224,112,112,0.3)', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.8rem', color: '#e07070' }}>{error}</div>}

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <button type="submit" disabled={saving} style={{ background: saving ? '#9a7a3a' : '#C5A15A', border: 'none', color: '#070707', padding: '0.875rem 2rem', fontSize: '0.6rem', letterSpacing: '0.15em', fontFamily: 'Inter, sans-serif', fontWeight: 500, cursor: saving ? 'wait' : 'pointer' }} className="save-btn">
          {saving ? 'SAVING...' : isEdit ? 'SAVE CHANGES' : 'CREATE COLLECTION'}
        </button>
        <button type="button" onClick={() => router.push('/admin/collections')} style={{ background: 'transparent', border: '1px solid #2a2a2a', color: '#C2BBAF', padding: '0.875rem 1.5rem', fontSize: '0.6rem', letterSpacing: '0.15em', fontFamily: 'Inter, sans-serif', cursor: 'pointer' }} className="cancel-btn">CANCEL</button>
        {isEdit && <button type="button" onClick={handleDelete} style={{ background: 'transparent', border: '1px solid rgba(224,112,112,0.3)', color: '#e07070', padding: '0.875rem 1.5rem', fontSize: '0.6rem', letterSpacing: '0.15em', fontFamily: 'Inter, sans-serif', cursor: 'pointer', marginLeft: 'auto' }} className="delete-btn">DELETE</button>}
        {saved && <span style={{ fontSize: '0.7rem', color: '#4a9', letterSpacing: '0.1em' }}>SAVED ✓</span>}
      </div>
      <style>{`.save-btn:hover{background:#D7BD80!important;}.cancel-btn:hover{border-color:#C5A15A!important;color:#C5A15A!important;}.delete-btn:hover{background:rgba(224,112,112,0.1)!important;}`}</style>
    </form>
  )
}
