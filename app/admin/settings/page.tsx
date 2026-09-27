'use client'
import { useState, useEffect } from 'react'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(d => setSettings(d)).catch(() => {})
  }, [])

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await fetch('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {}
    setSaving(false)
  }

  const Field = ({ id, label, value, onChange, type = 'text' }: { id: string; label: string; value: string; onChange: (v: string) => void; type?: string }) => (
    <div style={{ marginBottom: '1.25rem' }}>
      <label htmlFor={id} style={{ display: 'block', fontSize: '0.55rem', letterSpacing: '0.15em', color: '#9A978F', marginBottom: '0.5rem', fontFamily: 'Inter, sans-serif' }}>{label}</label>
      <input id={id} type={type} value={value || ''} onChange={e => onChange(e.target.value)} />
    </div>
  )

  return (
    <div style={{ maxWidth: 700 }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '0.5rem' }}>ADMIN</div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#F4F0E8', fontWeight: 300 }}>SETTINGS</h1>
      </div>

      <form onSubmit={save}>
        <div style={{ background: '#101010', border: '1px solid #1e1e1e', padding: '2rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '1.5rem' }}>BUSINESS INFORMATION</div>
          <Field id="businessName" label="BUSINESS NAME" value={settings.businessName} onChange={v => setSettings((s: any) => ({ ...s, businessName: v }))} />
          <Field id="tagline" label="TAGLINE" value={settings.tagline} onChange={v => setSettings((s: any) => ({ ...s, tagline: v }))} />
          <Field id="phone" label="PHONE NUMBER" value={settings.phone} onChange={v => setSettings((s: any) => ({ ...s, phone: v }))} type="tel" />
          <Field id="whatsappNumber" label="WHATSAPP NUMBER" value={settings.whatsappNumber} onChange={v => setSettings((s: any) => ({ ...s, whatsappNumber: v }))} type="tel" />
          <Field id="instagram" label="INSTAGRAM HANDLE" value={settings.instagram} onChange={v => setSettings((s: any) => ({ ...s, instagram: v }))} />
          <Field id="address" label="STORE ADDRESS" value={settings.address} onChange={v => setSettings((s: any) => ({ ...s, address: v }))} />
          <Field id="googleMapsUrl" label="GOOGLE MAPS URL" value={settings.googleMapsUrl} onChange={v => setSettings((s: any) => ({ ...s, googleMapsUrl: v }))} />
        </div>

        <div style={{ background: '#101010', border: '1px solid #1e1e1e', padding: '2rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '1.5rem' }}>DELIVERY</div>
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#C2BBAF', cursor: 'pointer' }}>
              <input type="checkbox" checked={!!settings.deliveryEnabled} onChange={e => setSettings((s: any) => ({ ...s, deliveryEnabled: e.target.checked }))} style={{ width: 'auto' }} />
              Delivery enabled
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#C2BBAF', cursor: 'pointer' }}>
              <input type="checkbox" checked={!!settings.pickupEnabled} onChange={e => setSettings((s: any) => ({ ...s, pickupEnabled: e.target.checked }))} style={{ width: 'auto' }} />
              Pickup enabled
            </label>
          </div>
          <Field id="deliveryFee" label="DEFAULT DELIVERY FEE (GHS)" value={settings.deliveryFee?.toString()} onChange={v => setSettings((s: any) => ({ ...s, deliveryFee: parseFloat(v) || 0 }))} type="number" />
          <Field id="freeDeliveryThreshold" label="FREE DELIVERY THRESHOLD (GHS)" value={settings.freeDeliveryThreshold?.toString()} onChange={v => setSettings((s: any) => ({ ...s, freeDeliveryThreshold: parseFloat(v) || 0 }))} type="number" />
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button type="submit" disabled={saving} style={{ background: saving ? '#9a7a3a' : '#C5A15A', border: 'none', color: '#070707', padding: '0.875rem 2rem', fontSize: '0.6rem', letterSpacing: '0.15em', fontFamily: 'Inter, sans-serif', fontWeight: 500, cursor: saving ? 'wait' : 'pointer', transition: 'background 0.2s' }} className="save-btn">
            {saving ? 'SAVING...' : 'SAVE SETTINGS'}
          </button>
          {saved && <span style={{ fontSize: '0.7rem', color: '#4a9', letterSpacing: '0.1em' }}>SAVED ✓</span>}
        </div>
      </form>
      <style>{`.save-btn:hover{background:#D7BD80!important;}`}</style>
    </div>
  )
}
