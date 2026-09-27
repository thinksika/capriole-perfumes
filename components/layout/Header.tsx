'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, ShoppingBag, Menu } from 'lucide-react'
import { useCartStore } from '@/lib/cart/cartStore'
import MobileMenu from './MobileMenu'
import SearchOverlay from '../ui/SearchOverlay'

const shopLinks = [
  { label: 'All Fragrances', href: '/shop' },
  { label: 'Women', href: '/shop?gender=women' },
  { label: 'Men', href: '/shop?gender=men' },
  { label: 'Unisex', href: '/shop?gender=unisex' },
  { label: 'Extraits de Parfum', href: '/shop?concentration=Extrait+de+Parfum' },
  { label: 'Eau de Parfum', href: '/shop?concentration=Eau+de+Parfum' },
  { label: 'Samples', href: '/samples' },
]

const collectionsLinks = [
  { label: 'Floral', href: '/collections/floral' },
  { label: 'Musk & Amber', href: '/collections/musk-amber' },
  { label: 'Woody', href: '/collections/woody' },
  { label: 'Oud', href: '/collections/oud' },
  { label: 'Fresh & Citrus', href: '/collections/fresh-citrus' },
  { label: 'Sweet & Gourmand', href: '/collections/sweet-gourmand' },
]

const discoverLinks = [
  { label: 'Discover Your Scent', href: '/discover' },
  { label: 'Fragrance Index', href: '/fragrance-index' },
  { label: 'Samples', href: '/samples' },
]


export default function Header({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { itemCount, openCart } = useCartStore()

  // Fix hydration: only read client-side store after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!transparent) return
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [transparent])

  const isSolid = !transparent || scrolled
  const count = mounted ? itemCount() : 0

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 70,
          transition: 'background 0.35s ease, border-color 0.35s ease',
          background: isSolid ? 'rgba(7,7,7,0.97)' : 'transparent',
          borderBottom: isSolid ? '1px solid #1c1c1c' : '1px solid transparent',
          backdropFilter: isSolid ? 'blur(16px)' : 'none',
        }}
      >
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            alignItems: 'center',
            height: 64,
            gap: '1.5rem',
          }}
        >
          {/* Logo (Left) */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              width: 36, height: 36,
              border: '1px solid #B8973A',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.15rem', color: '#B8973A', fontWeight: 400 }}>C</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '0.95rem', color: '#F0EBE0', letterSpacing: '0.18em', fontWeight: 400 }}>CAPRIOLE</span>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.42rem', letterSpacing: '0.22em', color: '#7A7570', marginTop: 3 }}>PERFUMES &amp; FRAGRANCES</span>
            </div>
          </Link>

          {/* Desktop Nav (Center) */}
          <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem' }} className="desktop-nav">
            {[{ label: 'SHOP', links: shopLinks }, { label: 'COLLECTIONS', links: collectionsLinks }, { label: 'DISCOVER', links: discoverLinks }].map(({ label, links }) => (
              <div key={label} className="nav-item" style={{ position: 'relative', paddingBottom: '0.75rem', marginBottom: '-0.75rem' }}>
                <button style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '0.625rem', letterSpacing: '0.22em', color: '#B8B0A3',
                  fontFamily: 'DM Sans, sans-serif', fontWeight: 400,
                  transition: 'color 0.2s',
                }} className="nav-top-btn">
                  {label}
                </button>
                <div className="nav-dropdown">
                  {links.map(link => (
                    <Link key={link.href} href={link.href} style={{
                      display: 'block', padding: '0.5rem 0',
                      fontSize: '0.75rem', letterSpacing: '0.08em',
                      color: '#7A7570', transition: 'color 0.15s',
                      fontFamily: 'DM Sans, sans-serif',
                    }} className="nav-dd-link">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link href="/samples" style={{ fontSize: '0.625rem', letterSpacing: '0.22em', color: '#B8B0A3', fontWeight: 400, fontFamily: 'DM Sans, sans-serif', transition: 'color 0.2s' }} className="nav-link">SAMPLES</Link>
            <Link href="/about" style={{ fontSize: '0.625rem', letterSpacing: '0.22em', color: '#B8B0A3', fontWeight: 400, fontFamily: 'DM Sans, sans-serif', transition: 'color 0.2s' }} className="nav-link">ABOUT</Link>
            <Link href="/journal" style={{ fontSize: '0.625rem', letterSpacing: '0.22em', color: '#B8B0A3', fontWeight: 400, fontFamily: 'DM Sans, sans-serif', transition: 'color 0.2s' }} className="nav-link">JOURNAL</Link>
          </nav>

          {/* Right Actions — NO ACCOUNT ICON */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.15rem', justifyContent: 'flex-end' }}>
            <button
              onClick={() => setSearchOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#B8B0A3', display: 'flex', alignItems: 'center', transition: 'color 0.2s', padding: 4 }}
              aria-label="Search fragrances"
              className="icon-btn"
            >
              <Search size={17} />
            </button>
            <button
              onClick={() => openCart()}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#B8B0A3', display: 'flex', alignItems: 'center', position: 'relative', transition: 'color 0.2s', padding: 4 }}
              aria-label={`Shopping bag${count > 0 ? `, ${count} item${count !== 1 ? 's' : ''}` : ''}`}
              className="icon-btn"
            >
              <ShoppingBag size={17} />
              {count > 0 && (
                <span style={{
                  position: 'absolute', top: -4, right: -4,
                  background: '#B8973A', color: '#070707',
                  width: 15, height: 15, borderRadius: '50%',
                  fontSize: '0.5rem', fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'DM Sans, sans-serif',
                }}>{count}</span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#B8B0A3', display: 'none', padding: 4 }}
              aria-label="Open navigation menu"
              id="mobile-menu-btn"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .container { grid-template-columns: auto auto !important; }
            .desktop-nav { display: none !important; }
            #mobile-menu-btn { display: flex !important; }
          }
          .nav-link:hover { color: #F0EBE0 !important; }
          .nav-top-btn:hover { color: #F0EBE0 !important; }
          .nav-dd-link:hover { color: #B8973A !important; }
          .icon-btn:hover { color: #F0EBE0 !important; }
        `}</style>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  )
}
