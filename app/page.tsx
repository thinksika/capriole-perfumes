import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ProductGrid from '@/components/product/ProductGrid'
import HomeCategoryGrid from '@/components/home/HomeCategoryGrid'
import { fetchAllProducts } from '@/lib/products/catalog'

export const metadata: Metadata = {
  title: 'Capriole Perfumes — Luxury French & Arabian Fragrances',
  description: 'Shop luxury French & Arabian perfumes. Accra, Ghana.',
}

export default async function HomePage() {
  const allProducts = await fetchAllProducts()
  const bestsellers = allProducts.filter(p => p.bestSeller || p.featured)

  return (
    <>
      {/* 1. HERO */}
      <section
        id="hero"
        style={{
          position: 'relative',
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
        }}
      >
        <Image
          src="/images/editorial/hero.png"
          alt="Capriole Perfumes — The Art of Leaving an Impression"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          sizes="100vw"
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(7,7,7,0.3) 0%, rgba(7,7,7,0.5) 50%, rgba(7,7,7,0.92) 100%)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: '4.5rem', maxWidth: 650 }}>
          <div style={{ marginBottom: '0.85rem', fontSize: '0.55rem', letterSpacing: '0.28em', color: '#B8973A', fontFamily: 'DM Sans, sans-serif' }}>CAPRIOLE PERFUMES</div>
          <h1
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
              fontWeight: 400,
              color: '#F0EBE0',
              lineHeight: 1.08,
              marginBottom: '1rem',
              letterSpacing: '-0.01em',
              textShadow: '0 2px 20px rgba(0,0,0,0.6)',
            }}
          >
            THE ART OF<br/>LEAVING AN<br/>IMPRESSION.
          </h1>
          <p style={{
            fontSize: '0.875rem',
            color: '#B8B0A3',
            marginBottom: '2rem',
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 300,
          }}>
            French &amp; Arabian fragrances.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              href="/shop"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: '#B8973A', color: '#070707',
                padding: '0.875rem 2.25rem',
                fontSize: '0.625rem', letterSpacing: '0.22em',
                fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
                textDecoration: 'none', transition: 'background 0.2s',
              }}
              className="hero-btn-primary"
            >
              SHOP NOW
            </Link>
            <Link
              href="/discover"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(7,7,7,0.4)', color: '#F0EBE0',
                border: '1px solid rgba(240,235,224,0.3)',
                backdropFilter: 'blur(4px)',
                padding: '0.875rem 2.25rem',
                fontSize: '0.625rem', letterSpacing: '0.22em',
                fontFamily: 'DM Sans, sans-serif', fontWeight: 400,
                textDecoration: 'none', transition: 'all 0.2s',
              }}
              className="hero-btn-secondary"
            >
              DISCOVER YOUR SCENT
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SHOP THE COLLECTION (MAIN HOMEPAGE SHOPPING SECTION - RESPONSIVE GRID) */}
      <section style={{ padding: '5.5rem 0', background: '#070707', borderTop: '1px solid #1c1c1c' }}>
        <div className="container">
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '0.5rem', fontFamily: 'DM Sans, sans-serif' }}>THE CATALOGUE</div>
            <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: '#F0EBE0', fontWeight: 400 }}>SHOP THE COLLECTION</h2>
          </div>
          <ProductGrid products={allProducts} columns={3} />
          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <Link
              href="/shop"
              style={{
                display: 'inline-flex', alignItems: 'center',
                fontSize: '0.625rem', letterSpacing: '0.22em',
                color: '#B8973A', borderBottom: '1px solid rgba(184,151,58,0.4)',
                paddingBottom: '3px', fontFamily: 'DM Sans, sans-serif',
                textTransform: 'uppercase', textDecoration: 'none',
              }}
              className="view-all-link"
            >
              VIEW ALL FRAGRANCES →
            </Link>
          </div>
        </div>
      </section>

      {/* 3. SHOP BY SCENT (RESPONSIVE VISUAL GRID) */}
      <section style={{ padding: '5.5rem 0', background: '#0a0a0a', borderTop: '1px solid #1c1c1c' }}>
        <div className="container">
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '0.5rem', fontFamily: 'DM Sans, sans-serif' }}>OLFACTORY FAMILIES</div>
            <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: '#F0EBE0', fontWeight: 400 }}>SHOP BY SCENT</h2>
          </div>
          <HomeCategoryGrid />
        </div>
      </section>

      {/* 4. FEATURED / BESTSELLERS (Rendered only when distinct bestseller data exists) */}
      {bestsellers.length > 0 && bestsellers.length < allProducts.length && (
        <section style={{ padding: '5.5rem 0', background: '#070707', borderTop: '1px solid #1c1c1c' }}>
          <div className="container">
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '0.5rem', fontFamily: 'DM Sans, sans-serif' }}>MOST LOVED</div>
              <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: '#F0EBE0', fontWeight: 400 }}>BESTSELLERS</h2>
            </div>
            <ProductGrid products={bestsellers} columns={3} />
          </div>
        </section>
      )}

      {/* 5. DISCOVER YOUR SCENT */}
      <section style={{ padding: '5rem 0', background: '#0d0d0d', borderTop: '1px solid #1c1c1c' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 540, margin: '0 auto' }}>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>PERSONAL DISCOVERY</div>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#F0EBE0', fontWeight: 400, marginBottom: '0.5rem' }}>
            FIND YOUR SCENT
          </h2>
          <p style={{ color: '#7A7570', fontSize: '0.875rem', marginBottom: '1.75rem', fontFamily: 'DM Sans, sans-serif' }}>
            Not sure what to wear?
          </p>
          <Link
            href="/discover"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: '#B8973A', color: '#070707',
              padding: '0.875rem 2.25rem',
              fontSize: '0.625rem', letterSpacing: '0.2em',
              fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
              textDecoration: 'none', transition: 'background 0.2s',
            }}
            className="hero-btn-primary"
          >
            START →
          </Link>
        </div>
      </section>

      {/* 6. SAMPLES */}
      <section style={{ padding: '5.5rem 0', background: '#070707', borderTop: '1px solid #1c1c1c' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div style={{ position: 'relative', aspectRatio: '16/10', background: '#121212', overflow: 'hidden', border: '1px solid #1c1c1c' }}>
              <Image
                src="/images/editorial/about.png"
                alt="Capriole fragrance samples"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <div style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>DISCOVERY SETS</div>
              <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#F0EBE0', fontWeight: 400, marginBottom: '0.75rem', lineHeight: 1.15 }}>
                DISCOVER BEFORE YOU COMMIT.
              </h2>
              <p style={{ color: '#7A7570', fontSize: '0.875rem', marginBottom: '1.75rem', fontFamily: 'DM Sans, sans-serif' }}>
                Explore Capriole fragrance samples.
              </p>
              <Link
                href="/samples"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  background: 'transparent', border: '1px solid #B8973A', color: '#B8973A',
                  padding: '0.875rem 2rem',
                  fontSize: '0.625rem', letterSpacing: '0.2em',
                  fontFamily: 'DM Sans, sans-serif', textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                className="samples-btn"
              >
                SHOP SAMPLES →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ABOUT CAPRIOLE */}
      <section style={{ padding: '5.5rem 0', background: '#0a0a0a', borderTop: '1px solid #1c1c1c' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>HERITAGE</div>
              <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#F0EBE0', fontWeight: 400, marginBottom: '0.75rem' }}>
                THE HOUSE OF CAPRIOLE
              </h2>
              <p style={{ color: '#7A7570', fontSize: '0.875rem', marginBottom: '1.75rem', fontFamily: 'DM Sans, sans-serif' }}>
                French &amp; Arabian fragrances.
              </p>
              <Link
                href="/about"
                style={{
                  fontSize: '0.625rem', letterSpacing: '0.2em',
                  color: '#B8973A', borderBottom: '1px solid rgba(184,151,58,0.4)',
                  paddingBottom: 3, fontFamily: 'DM Sans, sans-serif',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
                className="about-link"
              >
                ABOUT CAPRIOLE →
              </Link>
            </div>
            <div style={{ position: 'relative', aspectRatio: '16/10', background: '#121212', overflow: 'hidden', border: '1px solid #1c1c1c' }}>
              <Image
                src="/images/editorial/about-hero.png"
                alt="The House of Capriole"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. VISIT CAPRIOLE */}
      <section style={{ padding: '5.5rem 0', background: '#070707', borderTop: '1px solid #1c1c1c' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 540, margin: '0 auto' }}>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>BOUTIQUE</div>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#F0EBE0', fontWeight: 400, marginBottom: '0.5rem' }}>
            VISIT CAPRIOLE
          </h2>
          <p style={{ color: '#7A7570', fontSize: '0.875rem', marginBottom: '2rem', fontFamily: 'DM Sans, sans-serif' }}>
            Adabraka, Accra
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/visit"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: '#B8973A', color: '#070707',
                padding: '0.875rem 2rem',
                fontSize: '0.625rem', letterSpacing: '0.2em',
                fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
                textDecoration: 'none', transition: 'background 0.2s',
              }}
              className="hero-btn-primary"
            >
              GET DIRECTIONS
            </Link>
            <a
              href="https://wa.me/233547151094"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: '#25D366', color: '#fff',
                padding: '0.875rem 2rem',
                fontSize: '0.625rem', letterSpacing: '0.2em',
                fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
                textDecoration: 'none', transition: 'background 0.2s',
              }}
            >
              WHATSAPP
            </a>
          </div>
        </div>
      </section>

      <style>{`
        main { padding-top: 0 !important; }
        .hero-btn-primary:hover { background: #C9AA5A !important; }
        .hero-btn-secondary:hover { border-color: #B8973A !important; color: #B8973A !important; }
        .samples-btn:hover { background: rgba(184,151,58,0.1) !important; }
        .about-link:hover, .view-all-link:hover { color: #F0EBE0 !important; border-color: #F0EBE0 !important; }
        @media (max-width: 768px) {
          section div[style*="grid-template-columns: 1.2fr 1fr"],
          section div[style*="grid-template-columns: 1fr 1.2fr"] {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </>
  )
}
