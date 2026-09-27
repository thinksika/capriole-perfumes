'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ProductFormProps {
  product?: any
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter()
  const isEdit = !!product

  const [form, setForm] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    price: product?.price?.toString() || '',
    compareAtPrice: product?.compareAtPrice?.toString() || '',
    fragranceFamily: product?.fragranceFamily || '',
    concentration: product?.concentration || '',
    gender: product?.gender || 'unisex',
    volume: product?.volume || '',
    description: product?.description || '',
    shortDescription: product?.shortDescription || '',
    topNotes: product?.topNotes || '',
    heartNotes: product?.heartNotes || '',
    baseNotes: product?.baseNotes || '',
    character: product?.character || '',
    intensity: product?.intensity?.toString() || '',
    longevity: product?.longevity?.toString() || '',
    projection: product?.projection?.toString() || '',
    stockStatus: product?.stockStatus || 'in_stock',
    stockQuantity: product?.stockQuantity?.toString() || '0',
    published: product?.published ?? true,
    featured: product?.featured ?? false,
    bestSeller: product?.bestSeller ?? false,
    newArrival: product?.newArrival ?? false,
    sampleAvailable: product?.sampleAvailable ?? false,
  })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  const set = (key: string, val: any) => setForm(f => ({ ...f, [key]: val }))

  const autoSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.price) { setError('Name and price are required'); return }
    setSaving(true); setError('')

    const payload = {
      ...form,
      price: parseFloat(form.price),
      compareAtPrice: form.compareAtPrice ? parseFloat(form.compareAtPrice) : null,
      intensity: form.intensity ? parseInt(form.intensity) : null,
      longevity: form.longevity ? parseInt(form.longevity) : null,
      projection: form.projection ? parseInt(form.projection) : null,
      stockQuantity: parseInt(form.stockQuantity) || 0,
    }

    try {
      const url = isEdit ? `/api/products/${product.id}` : '/api/products'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(await res.text())
      setSaved(true)
      setTimeout(() => router.push('/admin/products'), 1000)
    } catch (err: any) {
      setError(err.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!isEdit) return
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return
    try {
      await fetch(`/api/products/${product.id}`, { method: 'DELETE' })
      router.push('/admin/products')
    } catch {
      setError('Failed to delete')
    }
  }

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ background: '#101010', border: '1px solid #1e1e1e', padding: '2rem', marginBottom: '1.5rem' }}>
      <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '1.5rem' }}>{title}</div>
      {children}
    </div>
  )

  const Field = ({ id, label, required, children }: { id: string; label: string; required?: boolean; children: React.ReactNode }) => (
    <div style={{ marginBottom: '1.25rem' }}>
      <label htmlFor={id} style={{ display: 'block', fontSize: '0.55rem', letterSpacing: '0.15em', color: '#9A978F', marginBottom: '0.5rem', fontFamily: 'Inter, sans-serif' }}>{label}{required && ' *'}</label>
      {children}
    </div>
  )

  const Check = ({ id, label, checked, onChange }: { id: string; label: string; checked: boolean; onChange: (v: boolean) => void }) => (
    <label htmlFor={id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.8rem', color: '#C2BBAF', marginBottom: '0.75rem' }}>
      <input id={id} type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} style={{ width: 'auto', accentColor: '#B8973A' }} />
      {label}
    </label>
  )

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 860 }}>
      <Section title="BASIC INFORMATION">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Field id="prod-name" label="PRODUCT NAME" required>
            <input id="prod-name" value={form.name} onChange={e => { set('name', e.target.value); if (!isEdit) set('slug', autoSlug(e.target.value)) }} placeholder="e.g. Capriole Atlas Dubai" required />
          </Field>
          <Field id="prod-slug" label="SLUG">
            <input id="prod-slug" value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="e.g. capriole-atlas-dubai" />
          </Field>
        </div>
        <Field id="prod-short" label="SHORT DESCRIPTION">
          <input id="prod-short" value={form.shortDescription} onChange={e => set('shortDescription', e.target.value)} placeholder="Brief tagline (shown in product cards)" />
        </Field>
        <Field id="prod-desc" label="FULL DESCRIPTION">
          <textarea id="prod-desc" value={form.description} onChange={e => set('description', e.target.value)} rows={4} placeholder="Full product description..." />
        </Field>
        <Field id="prod-char" label="CHARACTER">
          <input id="prod-char" value={form.character} onChange={e => set('character', e.target.value)} placeholder="e.g. Bold. Woody. Commanding." />
        </Field>
      </Section>

      <Section title="PRICING & DETAILS">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <Field id="prod-price" label="PRICE (GHS)" required>
            <input id="prod-price" type="number" step="0.01" min="0" value={form.price} onChange={e => set('price', e.target.value)} placeholder="0.00" required />
          </Field>
          <Field id="prod-compare" label="COMPARE AT PRICE (GHS)">
            <input id="prod-compare" type="number" step="0.01" min="0" value={form.compareAtPrice} onChange={e => set('compareAtPrice', e.target.value)} placeholder="0.00" />
          </Field>
          <Field id="prod-volume" label="VOLUME">
            <input id="prod-volume" value={form.volume} onChange={e => set('volume', e.target.value)} placeholder="e.g. 100ml" />
          </Field>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <Field id="prod-family" label="FRAGRANCE FAMILY">
            <input id="prod-family" value={form.fragranceFamily} onChange={e => set('fragranceFamily', e.target.value)} placeholder="e.g. Floral, Oud, Woody" />
          </Field>
          <Field id="prod-conc" label="CONCENTRATION">
            <input id="prod-conc" value={form.concentration} onChange={e => set('concentration', e.target.value)} placeholder="e.g. Eau de Parfum" />
          </Field>
          <Field id="prod-gender" label="GENDER">
            <select id="prod-gender" value={form.gender} onChange={e => set('gender', e.target.value)}>
              <option value="unisex">Unisex</option>
              <option value="women">Women</option>
              <option value="men">Men</option>
            </select>
          </Field>
        </div>
      </Section>

      <Section title="FRAGRANCE PYRAMID">
        <Field id="prod-top" label="TOP NOTES">
          <input id="prod-top" value={form.topNotes} onChange={e => set('topNotes', e.target.value)} placeholder="e.g. Bergamot, Lemon, Pink Pepper" />
        </Field>
        <Field id="prod-heart" label="HEART NOTES">
          <input id="prod-heart" value={form.heartNotes} onChange={e => set('heartNotes', e.target.value)} placeholder="e.g. Rose, Jasmine, Iris" />
        </Field>
        <Field id="prod-base" label="BASE NOTES">
          <input id="prod-base" value={form.baseNotes} onChange={e => set('baseNotes', e.target.value)} placeholder="e.g. Sandalwood, Oud, Musk" />
        </Field>
      </Section>

      <Section title="PERFORMANCE RATINGS">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {[['intensity', 'INTENSITY (1–10)', form.intensity], ['longevity', 'LONGEVITY (1–10)', form.longevity], ['projection', 'PROJECTION (1–10)', form.projection]].map(([key, label, val]) => (
            <Field key={key as string} id={`prod-${key}`} label={label as string}>
              <input id={`prod-${key}`} type="number" min="1" max="10" value={val as string} onChange={e => set(key as string, e.target.value)} placeholder="1–10" />
            </Field>
          ))}
        </div>
      </Section>

      <Section title="INVENTORY">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Field id="prod-stock-qty" label="STOCK QUANTITY">
            <input id="prod-stock-qty" type="number" min="0" value={form.stockQuantity} onChange={e => set('stockQuantity', e.target.value)} />
          </Field>
          <Field id="prod-stock-status" label="STOCK STATUS">
            <select id="prod-stock-status" value={form.stockStatus} onChange={e => set('stockStatus', e.target.value)}>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </Field>
        </div>
      </Section>

      <Section title="VISIBILITY & LABELS">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 2rem' }}>
          <Check id="prod-published" label="Published (visible on site)" checked={form.published} onChange={v => set('published', v)} />
          <Check id="prod-featured" label="Featured (shown on homepage)" checked={form.featured} onChange={v => set('featured', v)} />
          <Check id="prod-bestseller" label="Best Seller badge" checked={form.bestSeller} onChange={v => set('bestSeller', v)} />
          <Check id="prod-new" label="New Arrival badge" checked={form.newArrival} onChange={v => set('newArrival', v)} />
          <Check id="prod-sample" label="Sample Available" checked={form.sampleAvailable} onChange={v => set('sampleAvailable', v)} />
        </div>
      </Section>

      {error && <div style={{ background: 'rgba(224,112,112,0.1)', border: '1px solid rgba(224,112,112,0.3)', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.8rem', color: '#e07070' }}>{error}</div>}

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <button type="submit" disabled={saving} style={{ background: saving ? '#9a7a3a' : '#C5A15A', border: 'none', color: '#070707', padding: '0.875rem 2rem', fontSize: '0.6rem', letterSpacing: '0.15em', fontFamily: 'Inter, sans-serif', fontWeight: 500, cursor: saving ? 'wait' : 'pointer', transition: 'background 0.2s' }} className="save-prod-btn">
          {saving ? 'SAVING...' : isEdit ? 'SAVE CHANGES' : 'CREATE PRODUCT'}
        </button>
        <button type="button" onClick={() => router.push('/admin/products')} style={{ background: 'transparent', border: '1px solid #2a2a2a', color: '#C2BBAF', padding: '0.875rem 1.5rem', fontSize: '0.6rem', letterSpacing: '0.15em', fontFamily: 'Inter, sans-serif', cursor: 'pointer', transition: 'all 0.2s' }} className="cancel-btn">CANCEL</button>
        {isEdit && <button type="button" onClick={handleDelete} style={{ background: 'transparent', border: '1px solid rgba(224,112,112,0.3)', color: '#e07070', padding: '0.875rem 1.5rem', fontSize: '0.6rem', letterSpacing: '0.15em', fontFamily: 'Inter, sans-serif', cursor: 'pointer', marginLeft: 'auto', transition: 'all 0.2s' }} className="delete-btn">DELETE PRODUCT</button>}
        {saved && <span style={{ fontSize: '0.7rem', color: '#4a9', letterSpacing: '0.1em' }}>SAVED ✓ — REDIRECTING...</span>}
      </div>

      <style>{`.save-prod-btn:hover{background:#D7BD80!important;}.cancel-btn:hover{border-color:#C5A15A!important;color:#C5A15A!important;}.delete-btn:hover{background:rgba(224,112,112,0.1)!important;}@media(max-width:768px){div[style*="grid-template-columns: repeat(3, 1fr)"]{grid-template-columns:1fr!important;}div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;}}`}</style>
    </form>
  )
}
