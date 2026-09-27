import Link from 'next/link'
import Image from 'next/image'

const shopLinks = [
  { label: 'All Fragrances', href: '/shop' },
  { label: 'Women', href: '/shop/women' },
  { label: 'Men', href: '/shop/men' },
  { label: 'Unisex', href: '/shop/unisex' },
  { label: 'Samples', href: '/samples' },
]

const infoLinks = [
  { label: 'Collections', href: '/collections' },
  { label: 'Discover Your Scent', href: '/discover' },
  { label: 'Fragrance Index', href: '/fragrance-index' },
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/journal' },
]

const careLinks = [
  { label: 'FAQ', href: '/faq' },
  { label: 'Visit Us', href: '/visit' },
  { label: 'Contact', href: '/contact' },
]

function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: '#070707', borderTop: '1px solid #1c1c1c', paddingTop: '5rem', paddingBottom: '2.5rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '4rem' }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'inline-block', marginBottom: '1.25rem', textDecoration: 'none' }}>
              <Image
                src="/images/capriole-logo.jpg"
                alt="CAPRIOLE Perfumes & Fragrances"
                width={170}
                height={50}
                style={{ objectFit: 'contain', height: 44, width: 'auto' }}
              />
            </Link>
            <p style={{ fontSize: '0.8125rem', color: '#7A7570', lineHeight: 1.7, maxWidth: 240, fontFamily: 'DM Sans, sans-serif' }}>
              THE ART OF LEAVING AN IMPRESSION.
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
              <a href="https://www.instagram.com/capriole_perfumes.gh" target="_blank" rel="noopener noreferrer"
                style={{ color: '#7A7570', transition: 'color 0.2s', display: 'flex' }} className="footer-social"
                aria-label="Follow Capriole on Instagram">
                <InstagramIcon />
              </a>
              <a href="https://wa.me/233547151094" target="_blank" rel="noopener noreferrer"
                style={{ color: '#7A7570', transition: 'color 0.2s', display: 'flex' }} className="footer-social"
                aria-label="Message Capriole on WhatsApp">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 style={{ fontSize: '0.625rem', letterSpacing: '0.2em', color: '#B8973A', marginBottom: '1.25rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>SHOP</h4>
            {shopLinks.map(l => (
              <Link key={l.href} href={l.href} style={{ display: 'block', fontSize: '0.8125rem', color: '#7A7570', padding: '0.3rem 0', transition: 'color 0.15s', fontFamily: 'DM Sans, sans-serif' }} className="footer-link">{l.label}</Link>
            ))}
          </div>

          {/* Explore */}
          <div>
            <h4 style={{ fontSize: '0.625rem', letterSpacing: '0.2em', color: '#B8973A', marginBottom: '1.25rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>EXPLORE</h4>
            {infoLinks.map(l => (
              <Link key={l.href} href={l.href} style={{ display: 'block', fontSize: '0.8125rem', color: '#7A7570', padding: '0.3rem 0', transition: 'color 0.15s', fontFamily: 'DM Sans, sans-serif' }} className="footer-link">{l.label}</Link>
            ))}
          </div>

          {/* Visit */}
          <div>
            <h4 style={{ fontSize: '0.625rem', letterSpacing: '0.2em', color: '#B8973A', marginBottom: '1.25rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>VISIT</h4>
            {careLinks.map(l => (
              <Link key={l.href} href={l.href} style={{ display: 'block', fontSize: '0.8125rem', color: '#7A7570', padding: '0.3rem 0', transition: 'color 0.15s', fontFamily: 'DM Sans, sans-serif' }} className="footer-link">{l.label}</Link>
            ))}
            <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: '#7A7570', lineHeight: 1.8, fontFamily: 'DM Sans, sans-serif' }}>
              <div>Adabraka, Accra</div>
              <div>Ghana</div>
              <div style={{ marginTop: '0.5rem' }}>
                <a href="https://wa.me/233547151094" style={{ color: '#7A7570', transition: 'color 0.15s' }} className="footer-link">+233 547 151 094</a>
              </div>
            </div>
          </div>
        </div>

        {/* VISIT THE HOUSE Closing Section */}
        <div style={{ borderTop: '1px solid #1c1c1c', borderBottom: '1px solid #1c1c1c', padding: '3rem 0', marginBottom: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '0.625rem', letterSpacing: '0.22em', color: '#B8973A', marginBottom: '0.75rem', fontFamily: 'DM Sans, sans-serif', textTransform: 'uppercase' }}>VISIT THE HOUSE</div>
            <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.5rem', color: '#F0EBE0', marginBottom: '0.5rem', fontWeight: 400 }}>Adabraka, Accra, Ghana</h3>
            <p style={{ fontSize: '0.8125rem', color: '#7A7570', maxWidth: 420, fontFamily: 'DM Sans, sans-serif' }}>
              Discover Capriole in person or speak with us directly.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/visit" style={{ fontSize: '0.6875rem', letterSpacing: '0.18em', color: '#B8973A', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif', borderBottom: '1px solid #B8973A', paddingBottom: '2px', transition: 'color 0.2s, border-color 0.2s' }} className="footer-action-link">
              VISIT US &rarr;
            </Link>
            <a href="https://wa.me/233547151094" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.6875rem', letterSpacing: '0.18em', color: '#B8973A', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif', borderBottom: '1px solid #B8973A', paddingBottom: '2px', transition: 'color 0.2s, border-color 0.2s' }} className="footer-action-link">
              ORDER VIA WHATSAPP &rarr;
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.7rem', color: '#7A7570', letterSpacing: '0.05em', fontFamily: 'DM Sans, sans-serif' }}>
            &copy; 2026 Capriole Perfumes. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {[['Privacy', '/faq'], ['Terms', '/faq']].map(([l, h]) => (
              <Link key={h + l} href={h} style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: '#7A7570', transition: 'color 0.15s', fontFamily: 'DM Sans, sans-serif' }} className="footer-link">{l}</Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-link:hover { color: #F0EBE0 !important; }
        .footer-action-link:hover { color: #F0EBE0 !important; border-color: #F0EBE0 !important; }
        .footer-social:hover { color: #B8973A !important; }
        @media (max-width: 768px) {
          footer div[style*="grid-template-columns: 1.5fr"] { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          footer div[style*="grid-template-columns: 1.5fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
