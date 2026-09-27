'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCartStore } from '@/lib/cart/cartStore'
import { formatPrice } from '@/lib/pricing/calculateDiscount'
import { buildWhatsAppUrl } from '@/lib/whatsapp/orderBuilder'

interface FormData {
  name: string
  phone: string
  deliveryMethod: 'delivery' | 'pickup'
  address: string
  city: string
  region: string
  notes: string
}

interface FieldError {
  [key: string]: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, clearCart } = useCartStore()
  const sub = subtotal()
  const [form, setForm] = useState<FormData>({
    name: '', phone: '',
    deliveryMethod: 'delivery',
    address: '', city: '', region: '', notes: '',
  })
  const [errors, setErrors] = useState<FieldError>({})
  const [submitting, setSubmitting] = useState(false)
  const [waNumber, setWaNumber] = useState('+233547151094')

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(d => {
      if (d.whatsappNumber) setWaNumber(d.whatsappNumber)
    }).catch(() => {})
  }, [])

  const validate = (): boolean => {
    const e: FieldError = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    if (form.phone && !/^[+]?[\d\s\-()]{7,20}$/.test(form.phone)) e.phone = 'Enter a valid phone number'
    if (form.deliveryMethod === 'delivery' && !form.address.trim()) e.address = 'Delivery address is required'
    if (form.deliveryMethod === 'delivery' && !form.city.trim()) e.city = 'City is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    if (!items.length) { alert('Your bag is empty'); return }
    setSubmitting(true)

    try {
      const orderItems = items.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.discountedPrice ?? item.price,
        quantity: item.quantity,
        total: (item.discountedPrice ?? item.price) * item.quantity,
      }))

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.name,
          customerPhone: form.phone,
          deliveryMethod: form.deliveryMethod,
          address: form.address || undefined,
          city: form.city || undefined,
          region: form.region || undefined,
          notes: form.notes || undefined,
          items: orderItems,
          subtotal: sub,
          total: sub,
        }),
      })

      if (!res.ok) throw new Error('Failed to create order')
      const order = await res.json()

      // Build WhatsApp URL
      const waUrl = buildWhatsAppUrl(waNumber, {
        orderNumber: order.orderNumber,
        customerName: form.name,
        customerPhone: form.phone,
        items: items,
        subtotal: sub,
        total: sub,
        deliveryMethod: form.deliveryMethod,
        address: form.address,
        city: form.city,
        region: form.region,
        notes: form.notes,
      })

      clearCart()

      // Store order data in session storage for confirmation page
      sessionStorage.setItem('capriole_order', JSON.stringify({
        orderNumber: order.orderNumber,
        waUrl,
        items: orderItems,
        total: sub,
      }))

      router.push('/order-confirmation')
    } catch {
      setErrors({ submit: 'Something went wrong. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  const Field = ({ id, label, required, error, children }: { id: string; label: string; required?: boolean; error?: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: '1.5rem' }}>
      <label htmlFor={id} style={{ display: 'block', fontSize: '0.625rem', letterSpacing: '0.18em', color: error ? '#e07070' : '#7A7570', marginBottom: '0.5rem', fontFamily: 'DM Sans, sans-serif' }}>
        {label}{required && ' *'}
      </label>
      {children}
      {error && <div style={{ fontSize: '0.7rem', color: '#e07070', marginTop: '0.375rem', fontFamily: 'DM Sans, sans-serif' }}>{error}</div>}
    </div>
  )

  if (!items.length && typeof window !== 'undefined') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '2rem', color: '#F0EBE0', fontWeight: 400, marginBottom: '1rem' }}>YOUR BAG IS EMPTY.</h1>
        <p style={{ color: '#7A7570', marginBottom: '2rem', fontFamily: 'DM Sans, sans-serif' }}>Discover a fragrance worth remembering.</p>
        <Link href="/shop" style={{ background: '#B8973A', color: '#070707', padding: '0.875rem 2rem', fontSize: '0.625rem', letterSpacing: '0.18em', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>SHOP FRAGRANCES</Link>
      </div>
    )
  }

  return (
    <div style={{ background: '#070707', minHeight: '100vh', padding: '3rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: 1100 }}>
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>CHECKOUT</div>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: '#F0EBE0', fontWeight: 400 }}>PLACE YOUR ORDER</h1>
        </div>

        <div className="checkout-grid">
          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Contact */}
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#B8973A', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid #1c1c1c', fontFamily: 'DM Sans, sans-serif' }}>CONTACT INFORMATION</div>
              <Field id="name" label="FULL NAME" required error={errors.name}>
                <input id="name" type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your full name" style={{ borderColor: errors.name ? '#e07070' : undefined }} autoComplete="name" />
              </Field>
              <Field id="phone" label="PHONE NUMBER" required error={errors.phone}>
                <input id="phone" type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="e.g. 0247151094 or +233247151094" style={{ borderColor: errors.phone ? '#e07070' : undefined }} autoComplete="tel" />
              </Field>
            </div>

            {/* Delivery */}
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#B8973A', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid #1c1c1c', fontFamily: 'DM Sans, sans-serif' }}>DELIVERY METHOD</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                {[['delivery', 'DELIVERY', 'We bring it to you.'], ['pickup', 'STORE PICKUP', 'Collect from Adabraka, Accra.']].map(([val, label, desc]) => (
                  <button key={val} type="button" onClick={() => setForm(f => ({ ...f, deliveryMethod: val as 'delivery' | 'pickup' }))}
                    style={{
                      background: form.deliveryMethod === val ? 'rgba(184,151,58,0.08)' : 'transparent',
                      border: `1px solid ${form.deliveryMethod === val ? '#B8973A' : '#252525'}`,
                      padding: '1.25rem', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                    }}>
                    <div style={{ fontSize: '0.625rem', letterSpacing: '0.18em', color: form.deliveryMethod === val ? '#B8973A' : '#7A7570', marginBottom: '0.25rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>{label}</div>
                    <div style={{ fontSize: '0.75rem', color: '#7A7570', fontFamily: 'DM Sans, sans-serif' }}>{desc}</div>
                  </button>
                ))}
              </div>
              {form.deliveryMethod === 'delivery' && (
                <>
                  <Field id="address" label="DELIVERY ADDRESS" required error={errors.address}>
                    <input id="address" type="text" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="Street address" style={{ borderColor: errors.address ? '#e07070' : undefined }} />
                  </Field>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Field id="city" label="CITY" required error={errors.city}>
                      <input id="city" type="text" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="e.g. Accra" style={{ borderColor: errors.city ? '#e07070' : undefined }} />
                    </Field>
                    <Field id="region" label="REGION">
                      <input id="region" type="text" value={form.region} onChange={e => setForm(f => ({ ...f, region: e.target.value }))} placeholder="e.g. Greater Accra" />
                    </Field>
                  </div>
                </>
              )}
            </div>

            {/* Notes */}
            <div style={{ marginBottom: '3rem' }}>
              <Field id="notes" label="ADDITIONAL NOTES">
                <textarea id="notes" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Special instructions, preferred delivery times, etc." rows={3} />
              </Field>
            </div>

            {errors.submit && <div style={{ background: 'rgba(224,112,112,0.1)', border: '1px solid rgba(224,112,112,0.3)', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.8125rem', color: '#e07070', fontFamily: 'DM Sans, sans-serif' }}>{errors.submit}</div>}

            <div style={{ fontSize: '0.75rem', color: '#7A7570', lineHeight: 1.6, marginBottom: '1.5rem', fontFamily: 'DM Sans, sans-serif' }}>
              By placing this order, you will be directed to WhatsApp to confirm your order with Capriole Perfumes. No payment is collected online.
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%',
                background: submitting ? '#9a7a3a' : '#B8973A',
                border: 'none', color: '#070707',
                padding: '1rem',
                fontSize: '0.625rem', letterSpacing: '0.22em',
                fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
                cursor: submitting ? 'wait' : 'pointer',
                transition: 'background 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {submitting ? 'PREPARING ORDER...' : 'PLACE ORDER VIA WHATSAPP'}
            </button>
          </form>

          {/* Order summary */}
          <div style={{ position: 'sticky', top: 90 }}>
            <div style={{ background: '#101010', border: '1px solid #1c1c1c', padding: '2rem' }}>
              <div style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#B8973A', marginBottom: '1.5rem', fontFamily: 'DM Sans, sans-serif' }}>ORDER SUMMARY</div>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #1c1c1c' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.875rem', color: '#F0EBE0', fontFamily: 'Playfair Display, Georgia, serif', lineHeight: 1.2 }}>{item.name}</div>
                    <div style={{ fontSize: '0.65rem', color: '#7A7570', marginTop: 2, fontFamily: 'DM Sans, sans-serif' }}>Qty: {item.quantity}</div>
                  </div>
                  <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '0.95rem', color: '#F0EBE0', flexShrink: 0 }}>
                    {formatPrice((item.discountedPrice ?? item.price) * item.quantity, 'GHS')}
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem' }}>
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: '#7A7570', fontFamily: 'DM Sans, sans-serif' }}>SUBTOTAL</span>
                <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.15rem', color: '#F0EBE0' }}>{formatPrice(sub, 'GHS')}</span>
              </div>
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #1c1c1c', fontSize: '0.75rem', color: '#7A7570', lineHeight: 1.6, fontFamily: 'DM Sans, sans-serif' }}>
                Delivery fee to be confirmed by Capriole Perfumes on WhatsApp.
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`.checkout-grid{display:grid;grid-template-columns:1fr 380px;gap:4rem;align-items:flex-start;}@media(max-width:1024px){.checkout-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  )
}
