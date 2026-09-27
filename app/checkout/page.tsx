'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useCartStore } from '@/lib/cart/cartStore'
import { formatPrice } from '@/lib/pricing/calculateDiscount'
import { buildWhatsAppUrl } from '@/lib/whatsapp/orderBuilder'

const WA_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

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

  const Field = ({ id, label, required, error, children }: {
    id: string; label: string; required?: boolean; error?: string; children: React.ReactNode
  }) => (
    <div className="co-field">
      <label htmlFor={id} className={`co-label ${error ? 'co-label-err' : ''}`}>
        {label}{required && ' *'}
      </label>
      {children}
      {error && <div className="co-field-err">{error}</div>}
    </div>
  )

  if (!items.length && typeof window !== 'undefined') {
    return (
      <div className="co-empty">
        <h1 className="co-empty-title">YOUR BAG IS EMPTY.</h1>
        <p className="co-empty-sub">Discover a fragrance worth remembering.</p>
        <Link href="/shop" className="co-empty-btn">SHOP FRAGRANCES</Link>
      </div>
    )
  }

  return (
    <div className="co-root">
      <div className="container co-container">
        {/* Back */}
        <Link href="/cart" className="co-back">
          <ArrowLeft size={13} />
          BACK TO BAG
        </Link>

        {/* Header */}
        <div className="co-header">
          <div className="co-eyebrow">CHECKOUT</div>
          <h1 className="co-title">PLACE YOUR ORDER</h1>
        </div>

        <div className="co-grid">
          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Contact */}
            <div className="co-section">
              <div className="co-section-title">CONTACT INFORMATION</div>
              <Field id="name" label="FULL NAME" required error={errors.name}>
                <input
                  id="name" type="text" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Your full name"
                  style={{ borderColor: errors.name ? '#e07070' : undefined }}
                  autoComplete="name"
                  className="co-input"
                />
              </Field>
              <Field id="phone" label="PHONE NUMBER" required error={errors.phone}>
                <input
                  id="phone" type="tel" value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="e.g. 0247151094"
                  style={{ borderColor: errors.phone ? '#e07070' : undefined }}
                  autoComplete="tel"
                  className="co-input"
                />
              </Field>
            </div>

            {/* Delivery */}
            <div className="co-section">
              <div className="co-section-title">DELIVERY METHOD</div>
              <div className="co-delivery-tabs">
                {([['delivery', 'DELIVERY', 'We bring it to you.'], ['pickup', 'STORE PICKUP', 'Collect from Adabraka, Accra.']] as const).map(([val, label, desc]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, deliveryMethod: val }))}
                    className={`co-delivery-tab ${form.deliveryMethod === val ? 'active' : ''}`}
                  >
                    <div className="co-delivery-tab-label">{label}</div>
                    <div className="co-delivery-tab-desc">{desc}</div>
                  </button>
                ))}
              </div>

              {form.deliveryMethod === 'delivery' && (
                <>
                  <Field id="address" label="DELIVERY ADDRESS" required error={errors.address}>
                    <input
                      id="address" type="text" value={form.address}
                      onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                      placeholder="Street address, neighbourhood"
                      style={{ borderColor: errors.address ? '#e07070' : undefined }}
                      className="co-input"
                    />
                  </Field>
                  <div className="co-two-col">
                    <Field id="city" label="CITY" required error={errors.city}>
                      <input
                        id="city" type="text" value={form.city}
                        onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                        placeholder="e.g. Accra"
                        style={{ borderColor: errors.city ? '#e07070' : undefined }}
                        className="co-input"
                      />
                    </Field>
                    <Field id="region" label="REGION">
                      <input
                        id="region" type="text" value={form.region}
                        onChange={e => setForm(f => ({ ...f, region: e.target.value }))}
                        placeholder="e.g. Greater Accra"
                        className="co-input"
                      />
                    </Field>
                  </div>
                </>
              )}
            </div>

            {/* Notes */}
            <div className="co-section">
              <Field id="notes" label="DELIVERY NOTES (OPTIONAL)">
                <textarea
                  id="notes" value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  placeholder="Special instructions, preferred delivery time, gate code, etc."
                  rows={3}
                  className="co-input"
                />
              </Field>
            </div>

            {errors.submit && (
              <div className="co-error-banner">{errors.submit}</div>
            )}

            <p className="co-disclaimer">
              By placing this order, you will be directed to WhatsApp to confirm with Capriole Perfumes. No payment is collected online.
            </p>

            <button
              type="submit"
              disabled={submitting}
              className={`co-submit-btn ${submitting ? 'submitting' : ''}`}
            >
              {WA_ICON}
              {submitting ? 'PREPARING ORDER…' : 'PLACE ORDER VIA WHATSAPP'}
            </button>
          </form>

          {/* Order summary */}
          <div className="co-summary-wrap">
            <div className="co-summary">
              <div className="co-summary-label">ORDER SUMMARY</div>
              {items.map(item => (
                <div key={item.id} className="co-summary-item">
                  <div className="co-summary-item-info">
                    <div className="co-summary-item-name">{item.name}</div>
                    <div className="co-summary-item-qty">Qty: {item.quantity}</div>
                  </div>
                  <div className="co-summary-item-price">
                    {formatPrice((item.discountedPrice ?? item.price) * item.quantity, 'GHS')}
                  </div>
                </div>
              ))}
              <div className="co-summary-total-row">
                <span className="co-summary-key">SUBTOTAL</span>
                <span className="co-summary-total">{formatPrice(sub, 'GHS')}</span>
              </div>
              <p className="co-summary-note">
                Delivery fee to be confirmed by Capriole Perfumes on WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .co-root {
          background: #070707;
          min-height: 100vh;
          padding: 2.5rem 0 6rem;
        }
        .co-container { max-width: 1100px; }

        .co-back {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: #7A7570;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          font-family: DM Sans, sans-serif;
          text-decoration: none;
          text-transform: uppercase;
          margin-bottom: 1.25rem;
          transition: color 0.15s;
        }
        .co-back:hover { color: #F0EBE0; }

        .co-header { margin-bottom: 2.5rem; }
        .co-eyebrow {
          font-size: 0.55rem;
          letter-spacing: 0.25em;
          color: #B8973A;
          margin-bottom: 0.5rem;
          font-family: DM Sans, sans-serif;
        }
        .co-title {
          font-family: Playfair Display, Georgia, serif;
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          color: #F0EBE0;
          font-weight: 400;
        }

        .co-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 4rem;
          align-items: flex-start;
        }

        /* Form sections */
        .co-section { margin-bottom: 2.5rem; }
        .co-section-title {
          font-size: 0.55rem;
          letter-spacing: 0.22em;
          color: #B8973A;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #1c1c1c;
          font-family: DM Sans, sans-serif;
        }
        .co-field { margin-bottom: 1.25rem; }
        .co-label {
          display: block;
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          color: #7A7570;
          margin-bottom: 0.5rem;
          font-family: DM Sans, sans-serif;
          text-transform: uppercase;
        }
        .co-label-err { color: #e07070; }
        .co-field-err {
          font-size: 0.7rem;
          color: #e07070;
          margin-top: 0.3rem;
          font-family: DM Sans, sans-serif;
        }
        .co-input {
          width: 100%;
          background: transparent;
          border: 1px solid #252525;
          color: #F0EBE0;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          font-family: DM Sans, sans-serif;
          outline: none;
          transition: border-color 0.15s;
          border-radius: 0;
          box-sizing: border-box;
          resize: vertical;
        }
        .co-input:focus { border-color: #B8973A; }
        .co-input::placeholder { color: #4a4a4a; }

        .co-delivery-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .co-delivery-tab {
          background: transparent;
          border: 1px solid #252525;
          padding: 1rem;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s;
        }
        .co-delivery-tab.active {
          background: rgba(184,151,58,0.08);
          border-color: #B8973A;
        }
        .co-delivery-tab-label {
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          color: #7A7570;
          margin-bottom: 0.2rem;
          font-family: DM Sans, sans-serif;
          font-weight: 500;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .co-delivery-tab.active .co-delivery-tab-label { color: #B8973A; }
        .co-delivery-tab-desc {
          font-size: 0.75rem;
          color: #7A7570;
          font-family: DM Sans, sans-serif;
        }

        .co-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .co-error-banner {
          background: rgba(224,112,112,0.1);
          border: 1px solid rgba(224,112,112,0.3);
          padding: 0.875rem 1rem;
          margin-bottom: 1.25rem;
          font-size: 0.8125rem;
          color: #e07070;
          font-family: DM Sans, sans-serif;
        }

        .co-disclaimer {
          font-size: 0.75rem;
          color: #7A7570;
          line-height: 1.6;
          margin-bottom: 1.25rem;
          font-family: DM Sans, sans-serif;
        }

        .co-submit-btn {
          width: 100%;
          background: #B8973A;
          border: none;
          color: #070707;
          padding: 1rem;
          font-size: 0.625rem;
          letter-spacing: 0.22em;
          font-family: DM Sans, sans-serif;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          text-transform: uppercase;
          box-sizing: border-box;
        }
        .co-submit-btn:hover:not(.submitting) { background: #C9AA5A; }
        .co-submit-btn.submitting { background: #9a7a3a; cursor: wait; }

        /* Summary */
        .co-summary-wrap { position: sticky; top: 90px; }
        .co-summary {
          background: #101010;
          border: 1px solid #1c1c1c;
          padding: 1.75rem;
        }
        .co-summary-label {
          font-size: 0.55rem;
          letter-spacing: 0.22em;
          color: #B8973A;
          margin-bottom: 1.5rem;
          font-family: DM Sans, sans-serif;
        }
        .co-summary-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #1c1c1c;
        }
        .co-summary-item:last-of-type { border-bottom: none; }
        .co-summary-item-name {
          font-size: 0.875rem;
          color: #F0EBE0;
          font-family: Playfair Display, Georgia, serif;
          line-height: 1.25;
        }
        .co-summary-item-qty {
          font-size: 0.65rem;
          color: #7A7570;
          margin-top: 2px;
          font-family: DM Sans, sans-serif;
        }
        .co-summary-item-price {
          font-family: Playfair Display, Georgia, serif;
          font-size: 0.95rem;
          color: #F0EBE0;
          flex-shrink: 0;
        }
        .co-summary-total-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding-top: 0.75rem;
          margin-top: 0.25rem;
          border-top: 1px solid #1c1c1c;
          margin-bottom: 0.75rem;
        }
        .co-summary-key {
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          color: #7A7570;
          font-family: DM Sans, sans-serif;
        }
        .co-summary-total {
          font-family: Playfair Display, Georgia, serif;
          font-size: 1.2rem;
          color: #F0EBE0;
        }
        .co-summary-note {
          font-size: 0.7rem;
          color: #7A7570;
          line-height: 1.5;
          font-family: DM Sans, sans-serif;
          margin: 0;
        }

        /* Empty */
        .co-empty {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem;
          gap: 1rem;
        }
        .co-empty-title {
          font-family: Playfair Display, Georgia, serif;
          font-size: 2rem;
          color: #F0EBE0;
          font-weight: 400;
        }
        .co-empty-sub { color: #7A7570; font-family: DM Sans, sans-serif; }
        .co-empty-btn {
          background: #B8973A;
          color: #070707;
          padding: 0.875rem 2rem;
          font-size: 0.625rem;
          letter-spacing: 0.18em;
          font-family: DM Sans, sans-serif;
          font-weight: 500;
          text-decoration: none;
          margin-top: 0.5rem;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .co-grid { grid-template-columns: 1fr; }
          .co-summary-wrap { position: static; }
        }
        @media (max-width: 600px) {
          .co-root { padding: 1.75rem 0 5rem; }
          .co-delivery-tabs { grid-template-columns: 1fr; }
          .co-two-col { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
