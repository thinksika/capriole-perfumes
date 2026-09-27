import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Samples — Capriole Perfumes',
  description: 'Sample the Capriole fragrance collection. Experience 40+ scents before you commit.',
}

export default function SamplesPage() {
  return (
    <div style={{ background: '#070707', minHeight: '100vh', padding: '4rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: 900 }}>
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ fontSize: '0.5rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>TRY BEFORE YOU COMMIT</div>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#F0EBE0', fontWeight: 400, lineHeight: 1.05, marginBottom: '1.5rem' }}>SAMPLE THE<br/>COLLECTION</h1>
          <p style={{ color: '#7A7570', fontSize: '0.9375rem', lineHeight: 1.8, maxWidth: 480, fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}>A signature fragrance is a commitment. Sample the Capriole collection first — explore over 40 scents before choosing yours.</p>
        </div>

        <div className="samples-grid" style={{ marginBottom: '6rem' }}>
          {[{
            step: '01',
            title: 'CHOOSE YOUR SAMPLES',
            desc: 'Tell us which fragrance families or specific scents you are interested in.',
          }, {
            step: '02',
            title: 'WE PREPARE YOUR SET',
            desc: 'Capriole curates your sample selection. Freshly decanted for accuracy.',
          }, {
            step: '03',
            title: 'WEAR & DECIDE',
            desc: 'Test each scent on your skin for at least 4 hours before deciding.',
          }].map(item => (
            <div key={item.step} style={{ background: '#070707', padding: '3rem 2.5rem', borderTop: '1px solid #1e1e1e' }}>
              <div style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: '#B8973A', marginBottom: '1.5rem', fontFamily: 'DM Sans, sans-serif' }}>{item.step}</div>
              <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.25rem', color: '#F0EBE0', fontWeight: 400, marginBottom: '1rem' }}>{item.title}</h3>
              <div style={{ width: 30, height: 1, background: '#B8973A', opacity: 0.4, marginBottom: '1rem' }} />
              <p style={{ color: '#7A7570', fontSize: '0.8125rem', lineHeight: 1.7, fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
          <div style={{ fontSize: '0.5rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '1.5rem', fontFamily: 'DM Sans, sans-serif' }}>REQUEST YOUR SAMPLES</div>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#F0EBE0', fontWeight: 400, marginBottom: '1.5rem' }}>READY TO SAMPLE?</h2>
          <p style={{ color: '#7A7570', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '2.5rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}>Message us on WhatsApp to request samples. Tell us your fragrance preferences and we will help you find your signature.</p>
          <a href="https://wa.me/233547151094?text=Hello%20Capriole%20Perfumes,%20I%20would%20like%20to%20request%20some%20fragrance%20samples." target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', background: '#B8973A', color: '#070707', padding: '0.875rem 2.5rem', fontSize: '0.6rem', letterSpacing: '0.2em', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, textDecoration: 'none', transition: 'background 0.2s', marginBottom: '1rem' }} className="sample-btn">
            REQUEST SAMPLES VIA WHATSAPP
          </a>
          <div style={{ marginTop: '1.5rem' }}>
            <Link href="/discover" style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: '#7A7570', borderBottom: '1px solid #2a2a2a', paddingBottom: 2, fontFamily: 'DM Sans, sans-serif' }}>OR DISCOVER YOUR SCENT FIRST →</Link>
          </div>
        </div>
      </div>
      <style>{`.sample-btn:hover{background:#C9AA5A!important;}.samples-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#1e1e1e;}@media(max-width:768px){.samples-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  )
}
