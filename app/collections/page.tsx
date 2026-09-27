import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Collections — Capriole Perfumes',
  description: 'Explore the Capriole fragrance collections — Floral, Oud, Musk & Amber, Woody and more.',
}

const COLLECTIONS = [
  { name: 'Floral', slug: 'floral', image: '/images/collections/floral.png', philosophy: 'Light, romantic, feminine.' },
  { name: 'Musk & Amber', slug: 'musk-amber', image: '/images/collections/musk-amber.png', philosophy: 'Warm, sensual, enveloping.' },
  { name: 'Oud', slug: 'oud', image: '/images/collections/oud.png', philosophy: 'The sacred wood of the East.' },
  { name: 'Woody', slug: 'woody', image: '/images/editorial/about.png', philosophy: 'Grounded, warm, sophisticated.' },
  { name: 'Fresh & Citrus', slug: 'fresh-citrus', image: '/images/collections/floral.png', philosophy: 'Clean, crisp, energising.' },
  { name: 'Sweet & Gourmand', slug: 'sweet-gourmand', image: '/images/editorial/hero.png', philosophy: 'Playful, bold, indulgent.' },
]

export default function CollectionsPage() {
  return (
    <div style={{ background: '#070707', minHeight: '100vh', padding: '4rem 0 6rem' }}>
      <div className="container">
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ fontSize: '0.5rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>CAPRIOLE</div>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#F0EBE0', fontWeight: 400, marginBottom: '0.75rem' }}>THE COLLECTIONS</h1>
          <p style={{ color: '#7A7570', fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif' }}>Explore fragrances by family and character.</p>
        </div>
        <div className="collections-grid">
          {COLLECTIONS.map((col) => (
            <Link key={col.slug} href={`/collections/${col.slug}`} style={{ display: 'block', position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#101010' }} className="collection-card">
              <Image src={col.image} alt={col.name} fill style={{ objectFit: 'cover', transition: 'transform 0.6s ease', filter: 'brightness(0.55)' }} sizes="(max-width: 768px) 100vw, 50vw" className="collection-img" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,7,7,0.9) 0%, rgba(7,7,7,0.1) 60%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem' }}>
                <div style={{ fontSize: '0.45rem', letterSpacing: '0.2em', color: '#B8973A', marginBottom: '0.5rem', fontFamily: 'DM Sans, sans-serif' }}>COLLECTION</div>
                <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.25rem, 2.5vw, 2rem)', color: '#F0EBE0', fontWeight: 400, marginBottom: '0.5rem' }}>{col.name.toUpperCase()}</h2>
                {col.philosophy && <p style={{ fontSize: '0.75rem', color: '#B8B0A3', marginBottom: '1rem', fontFamily: 'DM Sans, sans-serif' }}>{col.philosophy}</p>}
                <span style={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: '#B8973A', borderBottom: '1px solid rgba(184,151,58,0.4)', paddingBottom: 2, fontFamily: 'DM Sans, sans-serif' }}>EXPLORE →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <style>{`.collections-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:#1e1e1e;}.collection-card:hover .collection-img{transform:scale(1.04);filter:brightness(0.75)!important;}@media(max-width:640px){.collections-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  )
}
