import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FAQ — Capriole Perfumes',
  description: 'Frequently asked questions about Capriole Perfumes, orders, delivery and fragrances.',
}

const FAQS = [
  {
    category: 'ORDERING',
    items: [
      { q: 'How do I place an order?', a: 'Add items to your bag, proceed to checkout, fill in your details and you will be connected to Capriole on WhatsApp to confirm your order. No payment is processed online.' },
      { q: 'Do you accept online payments?', a: 'We do not process payments on the website. Payment is arranged directly with Capriole on WhatsApp. We accept mobile money (MTN, Vodafone, AirtelTigo) and cash on delivery in Accra.' },
      { q: 'Can I order by WhatsApp directly?', a: 'Yes. You can message us directly on WhatsApp at +233 547 151 094 to place an order at any time.' },
    ],
  },
  {
    category: 'DELIVERY',
    items: [
      { q: 'Do you deliver in Accra?', a: 'Yes. We deliver within Accra and the Greater Accra region. Delivery fees depend on your location and will be confirmed at the time of order.' },
      { q: 'Can I pick up in-store?', a: 'Yes. You are welcome to collect your order from our store in Adabraka, Accra at no additional cost. Store hours: Mon–Fri 8:30 AM – 6:00 PM, Sat 9:00 AM – 2:00 PM.' },
      { q: 'How long does delivery take?', a: 'For Accra orders, we typically deliver within 1–3 business days after order confirmation.' },
    ],
  },
  {
    category: 'FRAGRANCES',
    items: [
      { q: 'Are your fragrances genuine?', a: 'All Capriole fragrances are 100% genuine. We source directly and stand fully behind the quality of every product we sell.' },
      { q: 'Can I sample before I buy?', a: 'Yes. We offer samples so you can experience fragrances before committing. Message us on WhatsApp to request samples.' },
      { q: 'How long do the fragrances last?', a: 'Our fragrances are formulated for high longevity and genuine performance. Most of our Eau de Parfum fragrances last 8–12 hours depending on skin type and application.' },
      { q: 'What concentration are your fragrances?', a: 'We carry a range of concentrations including Extrait de Parfum and Eau de Parfum. Each product page specifies the concentration.' },
    ],
  },
  {
    category: 'RETURNS',
    items: [
      { q: 'Do you accept returns?', a: 'We accept returns on unopened, unused products within 7 days of delivery. Opened fragrances cannot be returned unless there is a quality issue. Contact us on WhatsApp to initiate a return.' },
    ],
  },
]

export default function FAQPage() {
  return (
    <div style={{ background: '#070707', minHeight: '100vh', padding: '4rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: 800 }}>
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ fontSize: '0.5rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>HELP</div>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#F0EBE0', fontWeight: 400 }}>FREQUENTLY ASKED<br/>QUESTIONS</h1>
        </div>
        {FAQS.map(section => (
          <div key={section.category} style={{ marginBottom: '4rem' }}>
            <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#B8973A', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #1e1e1e', fontFamily: 'DM Sans, sans-serif' }}>{section.category}</div>
            {section.items.map((item, i) => (
              <details key={i} style={{ borderBottom: '1px solid #1e1e1e', cursor: 'pointer' }} className="faq-item">
                <summary style={{ padding: '1.25rem 0', fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.1rem', color: '#F0EBE0', fontWeight: 400, listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {item.q}
                  <span className="faq-icon" style={{ fontSize: '1.25rem', color: '#B8973A', flexShrink: 0, marginLeft: '1rem', transition: 'transform 0.2s' }}>+</span>
                </summary>
                <div style={{ paddingBottom: '1.25rem', color: '#7A7570', fontSize: '0.875rem', lineHeight: 1.8, fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}>{item.a}</div>
              </details>
            ))}
          </div>
        ))}
        <div style={{ background: '#101010', border: '1px solid #1e1e1e', padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#B8973A', marginBottom: '1rem', fontFamily: 'DM Sans, sans-serif' }}>STILL HAVE QUESTIONS?</div>
          <p style={{ color: '#7A7570', fontSize: '0.875rem', marginBottom: '1.5rem', fontFamily: 'DM Sans, sans-serif' }}>We are happy to help. Message us on WhatsApp.</p>
          <a href="https://wa.me/233547151094" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', background: '#B8973A', color: '#070707', padding: '0.75rem 2rem', fontSize: '0.6rem', letterSpacing: '0.15em', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, textDecoration: 'none', transition: 'background 0.2s' }} className="faq-wa-btn">WHATSAPP US</a>
        </div>
      </div>
      <style>{`.faq-wa-btn:hover{background:#C9AA5A!important;}.faq-item[open] .faq-icon{transform:rotate(45deg);}`}</style>
    </div>
  )
}
