import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 2rem' }}>
      <div style={{ fontSize: '0.55rem', letterSpacing: '0.3em', color: '#B8973A', marginBottom: '1.5rem', fontFamily: 'DM Sans, sans-serif' }}>404</div>
      <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#F0EBE0', fontWeight: 400, lineHeight: 1, marginBottom: '1.5rem' }}>NOTHING<br/>FOUND.</h1>
      <div style={{ width: 1, height: 60, background: 'linear-gradient(to bottom, #B8973A, transparent)', margin: '0 auto 2rem', opacity: 0.5 }} />
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.6rem', letterSpacing: '0.2em', color: '#B8973A', borderBottom: '1px solid rgba(184,151,58,0.3)', paddingBottom: 2, fontFamily: 'DM Sans, sans-serif' }}>
        RETURN TO THE HOUSE →
      </Link>
    </div>
  )
}
