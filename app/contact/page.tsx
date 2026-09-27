import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Capriole Perfumes',
  description: 'Get in touch with Capriole Perfumes. WhatsApp, Instagram, and in-store in Adabraka, Accra.',
}

export default function ContactPage() {
  return (
    <div style={{ background: '#070707', minHeight: '100vh', padding: '4rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: 900 }}>
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ fontSize: '0.5rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>GET IN TOUCH</div>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#F0EBE0', fontWeight: 400 }}>CONTACT</h1>
        </div>
        <div className="contact-grid">
          <div>
            <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#B8973A', marginBottom: '1.5rem', fontFamily: 'DM Sans, sans-serif' }}>CAPRIOLE PERFUMES</div>
            <p style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.1rem', color: '#B8B0A3', lineHeight: 1.8, marginBottom: '2rem' }}>Adabraka<br/>Accra<br/>Ghana</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href="https://wa.me/233547151094" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', background: '#B8973A', color: '#070707', padding: '0.875rem', fontSize: '0.6rem', letterSpacing: '0.15em', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, textDecoration: 'none', transition: 'background 0.2s' }} className="wa-contact-btn">WHATSAPP</a>
              <a href="tel:+233547151094" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid #2a2a2a', color: '#B8B0A3', padding: '0.875rem', fontSize: '0.6rem', letterSpacing: '0.15em', fontFamily: 'DM Sans, sans-serif', textDecoration: 'none', transition: 'all 0.2s' }} className="call-btn">CALL +233 547 151 094</a>
              <a href="https://www.instagram.com/capriole_perfumes.gh" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid #2a2a2a', color: '#B8B0A3', padding: '0.875rem', fontSize: '0.6rem', letterSpacing: '0.15em', fontFamily: 'DM Sans, sans-serif', textDecoration: 'none', transition: 'all 0.2s' }} className="call-btn">INSTAGRAM</a>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#B8973A', marginBottom: '1.5rem', fontFamily: 'DM Sans, sans-serif' }}>SEND A MESSAGE</div>
            <p style={{ color: '#7A7570', fontSize: '0.8125rem', lineHeight: 1.7, marginBottom: '1.5rem', fontFamily: 'DM Sans, sans-serif' }}>For general enquiries, orders and fragrance consultations, message us on WhatsApp for the fastest response.</p>
            <a href="https://wa.me/233547151094?text=Hello%20Capriole%20Perfumes,%20I%20have%20an%20enquiry." target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#B8973A', color: '#070707', padding: '0.875rem', fontSize: '0.6rem', letterSpacing: '0.15em', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, textDecoration: 'none', transition: 'background 0.2s', marginBottom: '0.75rem' }} className="wa-contact-btn">MESSAGE ON WHATSAPP</a>
            <p style={{ color: '#7A7570', fontSize: '0.7rem', textAlign: 'center', lineHeight: 1.6, fontFamily: 'DM Sans, sans-serif' }}>We respond to all messages within 24 hours during business days.</p>
          </div>
        </div>
      </div>
      <style>{`.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:5rem;}.wa-contact-btn:hover{background:#C9AA5A!important;}.call-btn:hover{border-color:#B8973A!important;color:#B8973A!important;}@media(max-width:768px){.contact-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  )
}
