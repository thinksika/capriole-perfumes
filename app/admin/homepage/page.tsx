'use client'
import { useState, useEffect } from 'react'

export default function AdminHomepagePage() {
  const [config, setConfig] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/homepage').then(r => r.json()).then(d => setConfig(d)).catch(() => {})
  }, [])

  const set = (key: string, val: any) => setConfig((c: any) => ({ ...c, [key]: val }))

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true); setError('')
    try {
      const res = await fetch('/api/homepage', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(config) })
      if (!res.ok) throw new Error('Failed to save')
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch { setError('Failed to save homepage settings') }
    setSaving(false)
  }

  const F = ({ id, label, children }: { id: string; label: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: '1.25rem' }}>
      <label htmlFor={id} style={{ display: 'block', fontSize: '0.55rem', letterSpacing: '0.15em', color: '#9A978F', marginBottom: '0.5rem', fontFamily: 'Inter, sans-serif' }}>{label}</label>
      {children}
    </div>
  )

  if (!config) return <div style={{ color: '#9A978F', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>Loading...</div>

  return (
    <div style={{ maxWidth: 800 }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '0.5rem' }}>CONTENT</div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#F4F0E8', fontWeight: 300 }}>HOMEPAGE</h1>
      </div>

      <form onSubmit={save}>
        {/* Hero section */}
        <div style={{ background: '#101010', border: '1px solid #1e1e1e', padding: '2rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A' }}>HERO SECTION</div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#C2BBAF', cursor: 'pointer' }}>
              <input type="checkbox" checked={!!config.heroVisible} onChange={e => set('heroVisible', e.target.checked)} style={{ width: 'auto', accentColor: '#C5A15A' }} />
              Visible
            </label>
          </div>
          <F id="hero-title" label="HEADING">
            <textarea id="hero-title" value={config.heroTitle || ''} onChange={e => set('heroTitle', e.target.value)} rows={3} placeholder="THE ART OF..." />
          </F>
          <F id="hero-subtitle" label="SUBHEADING">
            <textarea id="hero-subtitle" value={config.heroSubtitle || ''} onChange={e => set('heroSubtitle', e.target.value)} rows={2} placeholder="French & Arabian fragrances..." />
          </F>
          <F id="hero-img" label="HERO IMAGE URL">
            <input id="hero-img" value={config.heroImage || ''} onChange={e => set('heroImage', e.target.value)} placeholder="/images/hero-bg.jpg" />
          </F>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <F id="cta1-text" label="PRIMARY BUTTON TEXT">
              <input id="cta1-text" value={config.heroCta1Text || ''} onChange={e => set('heroCta1Text', e.target.value)} placeholder="SHOP THE COLLECTION" />
            </F>
            <F id="cta1-url" label="PRIMARY BUTTON URL">
              <input id="cta1-url" value={config.heroCta1Url || ''} onChange={e => set('heroCta1Url', e.target.value)} placeholder="/shop" />
            </F>
            <F id="cta2-text" label="SECONDARY BUTTON TEXT">
              <input id="cta2-text" value={config.heroCta2Text || ''} onChange={e => set('heroCta2Text', e.target.value)} placeholder="DISCOVER YOUR SCENT" />
            </F>
            <F id="cta2-url" label="SECONDARY BUTTON URL">
              <input id="cta2-url" value={config.heroCta2Url || ''} onChange={e => set('heroCta2Url', e.target.value)} placeholder="/discover" />
            </F>
          </div>
        </div>

        {error && <div style={{ background: 'rgba(224,112,112,0.1)', border: '1px solid rgba(224,112,112,0.3)', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.8rem', color: '#e07070' }}>{error}</div>}

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button type="submit" disabled={saving} style={{ background: saving ? '#9a7a3a' : '#C5A15A', border: 'none', color: '#070707', padding: '0.875rem 2rem', fontSize: '0.6rem', letterSpacing: '0.15em', fontFamily: 'Inter, sans-serif', fontWeight: 500, cursor: saving ? 'wait' : 'pointer' }} className="save-btn">
            {saving ? 'SAVING...' : 'SAVE & PUBLISH'}
          </button>
          <a href="/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: '#9A978F', fontFamily: 'Inter, sans-serif', textDecoration: 'none', borderBottom: '1px solid #2a2a2a', paddingBottom: 1 }}>PREVIEW SITE →</a>
          {saved && <span style={{ fontSize: '0.7rem', color: '#4a9', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}>SAVED ✓</span>}
        </div>
      </form>
      <style>{`.save-btn:hover{background:#D7BD80!important;}`}</style>
    </div>
  )
}
