import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — The House of Capriole',
  description: 'Discover the story behind Capriole Perfumes — a fragrance house dedicated to the art of leaving an impression.',
}

export default function AboutPage() {
  return (
    <div style={{ background: '#070707', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ position: 'relative', height: '70vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <Image src="/images/editorial/about.png" alt="The House of Capriole" fill style={{ objectFit: 'cover' }} sizes="100vw" priority />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(7,7,7,0.1) 0%, rgba(7,7,7,0.85) 100%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: '5rem' }}>
          <div style={{ fontSize: '0.5rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '1rem', fontFamily: 'DM Sans, sans-serif' }}>THE HOUSE</div>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#F0EBE0', fontWeight: 400, lineHeight: 1.0 }}>THE HOUSE OF<br/>CAPRIOLE</h1>
        </div>
      </section>

      {/* Vision */}
      <section style={{ padding: '8rem 0', borderBottom: '1px solid #1e1e1e' }}>
        <div className="container about-grid">
          <div>
            <div style={{ fontSize: '0.5rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '1rem', fontFamily: 'DM Sans, sans-serif' }}>01</div>
            <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.5rem', color: '#F0EBE0', fontWeight: 400 }}>THE VISION</h2>
          </div>
          <div>
            <p style={{ color: '#B8B0A3', fontSize: '1rem', lineHeight: 1.8, marginBottom: '1rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}>Capriole Perfumes was founded on a single belief: that fragrance is one of the most intimate and powerful forms of self-expression available to us.</p>
            <p style={{ color: '#7A7570', fontSize: '0.9rem', lineHeight: 1.8, fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}>We source and curate the finest French and Arabian fragrances, carefully selected for their quality, character and ability to leave a lasting impression. Our mission is not to sell a product, but to help you find a scent that truly belongs to you.</p>
          </div>
        </div>
      </section>

      {/* Collection */}
      <section style={{ padding: '8rem 0', borderBottom: '1px solid #1e1e1e' }}>
        <div className="container about-grid">
          <div>
            <div style={{ fontSize: '0.5rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '1rem', fontFamily: 'DM Sans, sans-serif' }}>02</div>
            <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.5rem', color: '#F0EBE0', fontWeight: 400 }}>THE COLLECTION</h2>
          </div>
          <div>
            <p style={{ color: '#B8B0A3', fontSize: '1rem', lineHeight: 1.8, marginBottom: '1rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}>Our collection spans fragrance families from floral and woody to deep oud and musk. Each fragrance is chosen for its quality ingredients, its performance and its character.</p>
            <p style={{ color: '#7A7570', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '2rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}>We believe in high-performance, long-lasting fragrances. We offer over 40 scents to sample, because we believe you should experience a fragrance before you commit to it.</p>
            <Link href="/shop" style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: '#B8973A', borderBottom: '1px solid rgba(184,151,58,0.3)', paddingBottom: 2, fontFamily: 'DM Sans, sans-serif' }}>EXPLORE THE COLLECTION →</Link>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section style={{ padding: '8rem 0', borderBottom: '1px solid #1e1e1e' }}>
        <div className="container about-grid">
          <div>
            <div style={{ fontSize: '0.5rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '1rem', fontFamily: 'DM Sans, sans-serif' }}>03</div>
            <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.5rem', color: '#F0EBE0', fontWeight: 400 }}>THE EXPERIENCE</h2>
          </div>
          <div>
            <p style={{ color: '#B8B0A3', fontSize: '1rem', lineHeight: 1.8, marginBottom: '1rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}>Quality. French &amp; Arabian Perfumes. Long-lasting. High performance.</p>
            <p style={{ color: '#7A7570', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '2rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}>We make it easy to discover your next signature. Samples are available so you can test in your own environment, at your own pace, before choosing the fragrance that becomes part of your identity.</p>
            <Link href="/samples" style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: '#B8973A', borderBottom: '1px solid rgba(184,151,58,0.3)', paddingBottom: 2, fontFamily: 'DM Sans, sans-serif' }}>DISCOVER SAMPLES →</Link>
          </div>
        </div>
      </section>

      {/* The Store */}
      <section style={{ padding: '8rem 0' }}>
        <div className="container about-grid">
          <div>
            <div style={{ fontSize: '0.5rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '1rem', fontFamily: 'DM Sans, sans-serif' }}>04</div>
            <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.5rem', color: '#F0EBE0', fontWeight: 400 }}>THE STORE</h2>
          </div>
          <div>
            <p style={{ color: '#B8B0A3', fontSize: '1rem', lineHeight: 1.8, marginBottom: '1rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}>Visit us in Adabraka, Accra, Ghana.</p>
            <p style={{ color: '#7A7570', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '2rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}>Our store is open Monday to Friday, 8:30 AM to 6:00 PM, and Saturday 9:00 AM to 2:00 PM. Come and explore the collection in person.</p>
            <Link href="/visit" style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: '#B8973A', borderBottom: '1px solid rgba(184,151,58,0.3)', paddingBottom: 2, fontFamily: 'DM Sans, sans-serif' }}>PLAN YOUR VISIT →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#101010', borderTop: '1px solid #1e1e1e', padding: '5rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 500 }}>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '2rem', color: '#F0EBE0', fontWeight: 400, marginBottom: '1.5rem' }}>DISCOVER YOUR SIGNATURE.</h2>
          <Link href="/discover" style={{ display: 'inline-flex', alignItems: 'center', background: '#B8973A', color: '#070707', padding: '0.875rem 2.5rem', fontSize: '0.6rem', letterSpacing: '0.2em', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>FIND YOUR SCENT</Link>
        </div>
      </section>

      <style>{`.about-grid{display:grid;grid-template-columns:1fr 2fr;gap:4rem;max-width:900px;}@media(max-width:768px){.about-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  )
}
