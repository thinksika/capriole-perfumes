import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import HomeScentLibrary from '@/components/home/HomeScentLibrary'
import HomeFeaturedProducts from '@/components/home/HomeFeaturedProducts'
import prisma from '@/lib/prisma/db'

export const metadata: Metadata = {
  title: 'Capriole Perfumes — The Art of Leaving an Impression',
  description: 'Luxury French & Arabian fragrances for moments worth remembering. Explore the Capriole collection in Accra, Ghana.',
}

async function getFeaturedProducts() {
  try {
    return await prisma.product.findMany({
      where: { published: true, featured: true },
      include: { discounts: { include: { discount: true } } },
      take: 3,
      orderBy: { createdAt: 'desc' },
    })
  } catch { return [] }
}

export default async function HomePage() {
  const featured = await getFeaturedProducts()

  return (
    <>
      {/* SECTION 1: HERO */}
      <section
        id="hero"
        style={{
          position: 'relative',
          minHeight: '100vh',
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
        {/* Subtle dark gradient behind text for high legibility while preserving image brightness */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 20% 75%, rgba(7,7,7,0.75) 0%, rgba(7,7,7,0.3) 50%, transparent 80%), linear-gradient(to bottom, rgba(7,7,7,0.3) 0%, transparent 35%, rgba(7,7,7,0.85) 100%)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: '7.5rem', maxWidth: 650 }}>
          <div style={{ marginBottom: '1.25rem', fontSize: '0.55rem', letterSpacing: '0.28em', color: '#B8973A', fontFamily: 'DM Sans, sans-serif' }}>THE HOUSE OF CAPRIOLE</div>
          <h1
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)',
              fontWeight: 400,
              color: '#F0EBE0',
              lineHeight: 1.08,
              marginBottom: '1.5rem',
              letterSpacing: '-0.01em',
              textShadow: '0 2px 30px rgba(0,0,0,0.6)',
            }}
          >
            THE ART OF<br/>LEAVING AN<br/>IMPRESSION.
          </h1>
          <p style={{
            fontSize: '0.875rem',
            color: '#B8B0A3',
            marginBottom: '2.5rem',
            lineHeight: 1.7,
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 300,
          }}>
            French & Arabian fragrances<br/>for moments worth remembering.
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
                transition: 'all 0.25s ease',
              }}
              className="hero-btn-primary"
            >
              SHOP THE COLLECTION
            </Link>
            <Link
              href="/discover"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(7,7,7,0.3)', color: '#F0EBE0',
                border: '1px solid rgba(240,235,224,0.3)',
                backdropFilter: 'blur(4px)',
                padding: '0.875rem 2.25rem',
                fontSize: '0.625rem', letterSpacing: '0.22em',
                fontFamily: 'DM Sans, sans-serif', fontWeight: 400,
                transition: 'all 0.25s ease',
              }}
              className="hero-btn-secondary"
            >
              DISCOVER YOUR SCENT
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', opacity: 0.6
        }}>
          <span style={{ fontSize: '0.5rem', letterSpacing: '0.25em', color: '#7A7570', fontFamily: 'DM Sans, sans-serif' }}>SCROLL</span>
          <div className="scroll-line" style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, #7A7570, transparent)' }} />
        </div>
      </section>

      {/* SECTION 2: THE HOUSE */}
      <section style={{ padding: '7.5rem 0', background: '#070707' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '1.25rem', fontFamily: 'DM Sans, sans-serif' }}>THE HOUSE OF CAPRIOLE</div>
              <h2 style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                fontWeight: 400,
                color: '#F0EBE0',
                lineHeight: 1.08,
                marginBottom: '1.5rem',
              }}>
                FRAGRANCE<br/>IS PERSONAL.
              </h2>
              <p style={{ color: '#7A7570', fontSize: '0.875rem', lineHeight: 1.8, marginBottom: '1rem', fontFamily: 'DM Sans, sans-serif' }}>
                At Capriole Perfumes, fragrance is an expression of identity,
                mood and memory.
              </p>
              <p style={{ color: '#7A7570', fontSize: '0.875rem', lineHeight: 1.8, marginBottom: '2.5rem', fontFamily: 'DM Sans, sans-serif' }}>
                Explore a curated world of French and Arabian fragrances
                designed for different personalities, moments and occasions.
              </p>
              <Link
                href="/about"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                  fontSize: '0.625rem', letterSpacing: '0.2em',
                  color: '#B8973A',
                  borderBottom: '1px solid rgba(184,151,58,0.4)',
                  paddingBottom: '0.25rem',
                  transition: 'all 0.2s',
                  fontFamily: 'DM Sans, sans-serif',
                }}
                className="discover-house-link"
              >
                DISCOVER THE HOUSE →
              </Link>
            </div>
            <div style={{ position: 'relative', aspectRatio: '4/5', background: '#131313' }}>
              <Image
                src="/images/editorial/about.png"
                alt="The Capriole fragrance house"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div style={{
                position: 'absolute', bottom: '1rem', right: '1rem',
                background: '#070707',
                border: '1px solid #1c1c1c',
                padding: '1rem 1.25rem',
                zIndex: 1,
              }}>
                <div style={{ fontSize: '0.45rem', letterSpacing: '0.2em', color: '#7A7570', marginBottom: '0.25rem', fontFamily: 'DM Sans, sans-serif' }}>COLLECTIONS</div>
                <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.5rem', color: '#B8973A', fontWeight: 400 }}>40+</div>
                <div style={{ fontSize: '0.55rem', letterSpacing: '0.1em', color: '#7A7570', fontFamily: 'DM Sans, sans-serif' }}>SCENTS TO SAMPLE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SIGNATURE EDIT */}
      <section style={{ padding: '6rem 0', background: '#101010', borderTop: '1px solid #1c1c1c' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <div style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>CURATED</div>
              <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#F0EBE0', fontWeight: 400 }}>THE SIGNATURE EDIT</h2>
            </div>
            <Link href="/shop" style={{ fontSize: '0.625rem', letterSpacing: '0.18em', color: '#7A7570', borderBottom: '1px solid #252525', paddingBottom: 2, transition: 'all 0.2s', fontFamily: 'DM Sans, sans-serif' }} className="view-collection-link">
              VIEW THE COLLECTION →
            </Link>
          </div>
          <HomeFeaturedProducts products={featured as any} />
        </div>
      </section>

      {/* SECTION 4: SCENT LIBRARY */}
      <HomeScentLibrary />

      {/* SECTION 5: DISCOVER CTA */}
      <section style={{ padding: '7.5rem 0', background: '#070707', borderTop: '1px solid #1c1c1c' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '1.5rem', fontFamily: 'DM Sans, sans-serif' }}>DISCOVER YOUR SIGNATURE</div>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', color: '#F0EBE0', fontWeight: 400, lineHeight: 1.15, marginBottom: '1.5rem' }}>
            NOT SURE WHAT<br/>TO WEAR?
          </h2>
          <p style={{ color: '#7A7570', fontSize: '0.875rem', lineHeight: 1.8, marginBottom: '2.5rem', fontFamily: 'DM Sans, sans-serif' }}>
            Find a fragrance that matches your mood,<br/>
            your moment and the way you want to be remembered.
          </p>
          <Link href="/discover" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent', color: '#B8973A',
            border: '1px solid #B8973A',
            padding: '0.875rem 2.5rem',
            fontSize: '0.625rem', letterSpacing: '0.2em',
            fontFamily: 'DM Sans, sans-serif',
            transition: 'all 0.25s ease',
          }} className="find-scent-btn">
            FIND YOUR SCENT →
          </Link>
        </div>
      </section>

      {/* SECTION 6: EXPERIENCE PANELS */}
      <section style={{ borderTop: '1px solid #1c1c1c' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {[
            { num: '01', label: 'DISCOVER', desc: 'Explore an edited collection of French and Arabian fragrances.', href: '/shop', cta: 'EXPLORE THE COLLECTION' },
            { num: '02', label: 'SAMPLE', desc: 'Experience fragrances before committing. Explore 40+ scents.', href: '/samples', cta: 'SAMPLE THE COLLECTION' },
            { num: '03', label: 'VISIT', desc: 'Discover Capriole in Adabraka, Accra.', href: '/visit', cta: 'PLAN YOUR VISIT' },
          ].map((panel, i) => (
            <Link
              key={panel.num}
              href={panel.href}
              style={{
                display: 'block',
                padding: '4rem 3rem',
                borderRight: i < 2 ? '1px solid #1c1c1c' : 'none',
                background: '#070707',
                transition: 'background 0.3s',
              }}
              className="experience-panel"
            >
              <div style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#B8973A', marginBottom: '2rem', fontFamily: 'DM Sans, sans-serif' }}>{panel.num}</div>
              <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.6rem', color: '#F0EBE0', fontWeight: 400, marginBottom: '1rem' }}>{panel.label}</h3>
              <div style={{ width: 32, height: 1, background: '#B8973A', opacity: 0.4, marginBottom: '1rem' }} />
              <p style={{ color: '#7A7570', fontSize: '0.8125rem', lineHeight: 1.7, marginBottom: '2rem', fontFamily: 'DM Sans, sans-serif' }}>{panel.desc}</p>
              <span style={{ fontSize: '0.55rem', letterSpacing: '0.18em', color: '#B8973A', borderBottom: '1px solid rgba(184,151,58,0.3)', paddingBottom: 2, fontFamily: 'DM Sans, sans-serif' }}>{panel.cta} →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 7: EDITORIAL QUOTE */}
      <section style={{ padding: '8rem 0', background: '#070707', borderTop: '1px solid #1c1c1c', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 750, margin: '0 auto' }}>
          <div style={{ width: 1, height: 50, background: 'linear-gradient(to bottom, transparent, #B8973A)', margin: '0 auto 2.5rem', opacity: 0.5 }} />
          <h2 style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            fontWeight: 400,
            color: '#F0EBE0',
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
          }}>
            YOUR SCENT<br/>
            SAYS SOMETHING<br/>
            BEFORE YOU DO.
          </h2>
          <div style={{ width: 1, height: 50, background: 'linear-gradient(to top, transparent, #B8973A)', margin: '2.5rem auto 0', opacity: 0.5 }} />
        </div>
      </section>

      {/* SECTION 8: FINAL CTA */}
      <section style={{ padding: '5.5rem 0', background: '#101010', borderTop: '1px solid #1c1c1c', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#F0EBE0', fontWeight: 400, marginBottom: '0.35rem' }}>YOUR SCENT.</h2>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#F0EBE0', fontWeight: 400, marginBottom: '2.25rem' }}>YOUR SIGNATURE.</h2>
          <Link href="/shop" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: '#B8973A', color: '#070707',
            padding: '0.875rem 2.5rem',
            fontSize: '0.625rem', letterSpacing: '0.22em',
            fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
            transition: 'background 0.2s',
          }} className="hero-btn-primary">
            SHOP ALL FRAGRANCES →
          </Link>
        </div>
      </section>

      <style>{`
        main { padding-top: 0 !important; }
        .hero-btn-primary:hover { background: #C9AA5A !important; transform: translateY(-1px); }
        .hero-btn-secondary:hover { border-color: #B8973A !important; color: #B8973A !important; }
        .find-scent-btn:hover { background: rgba(184,151,58,0.1) !important; }
        .experience-panel:hover { background: #101010 !important; }
        .view-collection-link:hover { color: #F0EBE0 !important; border-color: #B8973A !important; }
        .discover-house-link:hover { border-color: #B8973A !important; }
        @media (max-width: 1024px) {
          section div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          section div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
          a[style*="borderRight"] { border-right: none !important; border-bottom: 1px solid #1c1c1c !important; }
        }
      `}</style>
    </>
  )
}
