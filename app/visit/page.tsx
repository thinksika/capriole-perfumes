import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Visit — Capriole Perfumes',
  description: 'Visit Capriole Perfumes in Adabraka, Accra, Ghana. Store hours, directions and contact information.',
}

const HOURS = [
  { day: 'Monday', hours: '8:30 AM – 6:00 PM' },
  { day: 'Tuesday', hours: '8:30 AM – 6:00 PM' },
  { day: 'Wednesday', hours: '8:30 AM – 6:00 PM' },
  { day: 'Thursday', hours: '8:30 AM – 6:00 PM' },
  { day: 'Friday', hours: '8:30 AM – 6:00 PM' },
  { day: 'Saturday', hours: '9:00 AM – 2:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
]

export default function VisitPage() {
  return (
    <div style={{ background: '#070707', minHeight: '100vh', padding: '4rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: 900 }}>
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ fontSize: '0.5rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>CAPRIOLE PERFUMES</div>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#F0EBE0', fontWeight: 400, lineHeight: 1.05, marginBottom: '1rem' }}>VISIT<br/>CAPRIOLE</h1>
          <p style={{ color: '#7A7570', fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif' }}>Adabraka, Accra, Ghana</p>
        </div>

        <div className="visit-grid">
          <div>
            <div style={{ marginBottom: '3rem', paddingBottom: '3rem', borderBottom: '1px solid #1e1e1e' }}>
              <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#B8973A', marginBottom: '1.5rem', fontFamily: 'DM Sans, sans-serif' }}>ADDRESS</div>
              <p style={{ color: '#B8B0A3', fontSize: '1rem', lineHeight: 1.8, fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400, marginBottom: '1.5rem' }}>Adabraka<br/>Accra<br/>Ghana</p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href="https://maps.google.com/?q=Adabraka,Accra,Ghana" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#B8973A', color: '#070707', padding: '0.75rem 1.5rem', fontSize: '0.6rem', letterSpacing: '0.15em', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, textDecoration: 'none', transition: 'background 0.2s' }} className="directions-btn">GET DIRECTIONS</a>
                <a href="https://wa.me/233547151094" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid #2a2a2a', color: '#B8B0A3', padding: '0.75rem 1.5rem', fontSize: '0.6rem', letterSpacing: '0.15em', fontFamily: 'DM Sans, sans-serif', textDecoration: 'none', transition: 'all 0.2s' }} className="outline-btn">WHATSAPP</a>
                <a href="tel:+233547151094" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid #2a2a2a', color: '#B8B0A3', padding: '0.75rem 1.5rem', fontSize: '0.6rem', letterSpacing: '0.15em', fontFamily: 'DM Sans, sans-serif', textDecoration: 'none', transition: 'all 0.2s' }} className="outline-btn">CALL</a>
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#B8973A', marginBottom: '1.5rem', fontFamily: 'DM Sans, sans-serif' }}>STORE HOURS</div>
              {HOURS.map(h => (
                <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.625rem 0', borderBottom: '1px solid #101010' }}>
                  <span style={{ fontSize: '0.8rem', color: '#7A7570', fontFamily: 'DM Sans, sans-serif' }}>{h.day}</span>
                  <span style={{ fontSize: '0.8rem', color: h.hours === 'Closed' ? '#7A7570' : '#B8B0A3', fontFamily: 'DM Sans, sans-serif' }}>{h.hours}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ background: '#101010', border: '1px solid #1e1e1e', padding: '2rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#B8973A', marginBottom: '1rem', fontFamily: 'DM Sans, sans-serif' }}>FOLLOW US</div>
              <p style={{ color: '#7A7570', fontSize: '0.8rem', lineHeight: 1.7, marginBottom: '1.25rem', fontFamily: 'DM Sans, sans-serif' }}>Stay updated on new arrivals, announcements and fragrance stories.</p>
              <a href="https://www.instagram.com/capriole_perfumes.gh" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.6rem', letterSpacing: '0.15em', color: '#B8973A', borderBottom: '1px solid rgba(184,151,58,0.3)', paddingBottom: 2, fontFamily: 'DM Sans, sans-serif' }}>@capriole_perfumes.gh →</a>
            </div>
            <div style={{ background: '#101010', border: '1px solid #1e1e1e', padding: '2rem' }}>
              <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#B8973A', marginBottom: '1rem', fontFamily: 'DM Sans, sans-serif' }}>ORDER ONLINE</div>
              <p style={{ color: '#7A7570', fontSize: '0.8rem', lineHeight: 1.7, marginBottom: '1.25rem', fontFamily: 'DM Sans, sans-serif' }}>Cannot visit in person? Shop online and order via WhatsApp.</p>
              <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.6rem', letterSpacing: '0.15em', color: '#B8973A', borderBottom: '1px solid rgba(184,151,58,0.3)', paddingBottom: 2, fontFamily: 'DM Sans, sans-serif' }}>SHOP NOW →</Link>
            </div>
          </div>
        </div>
      </div>
      <style>{`.visit-grid{display:grid;grid-template-columns:1fr 1fr;gap:5rem;}.directions-btn:hover{background:#C9AA5A!important;}.outline-btn:hover{border-color:#B8973A!important;color:#B8973A!important;}@media(max-width:768px){.visit-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  )
}
