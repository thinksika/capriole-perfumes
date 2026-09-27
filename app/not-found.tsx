import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 2rem', background: '#070707' }}>
      <div style={{ fontSize: '0.55rem', letterSpacing: '0.3em', color: '#B8973A', marginBottom: '1.5rem', fontFamily: 'DM Sans, sans-serif' }}>404 · NOT FOUND</div>
      <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#F0EBE0', fontWeight: 400, lineHeight: 1.15, maxWidth: 640, marginBottom: '1.5rem' }}>
        THE SCENT YOU SEEK<br/>COULD NOT BE FOUND.
      </h1>
      <p style={{ color: '#7A7570', fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif', marginBottom: '2.5rem', maxWidth: 420, lineHeight: 1.6 }}>
        The perfume formulation or page you requested may have been archived or relocated.
      </p>
      <div style={{ width: 1, height: 50, background: 'linear-gradient(to bottom, #B8973A, transparent)', margin: '0 auto 2.5rem', opacity: 0.5 }} />
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#B8973A', color: '#070707', padding: '0.875rem 2rem', fontSize: '0.625rem', letterSpacing: '0.2em', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, textDecoration: 'none', transition: 'background 0.2s' }}>
        BACK TO CAPRIOLE →
      </Link>
    </div>
  )
}
