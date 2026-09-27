'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Search, ShoppingBag, Menu } from 'lucide-react'
import { useCartStore } from '@/lib/cart/cartStore'
import MobileMenu from './MobileMenu'
import SearchOverlay from '../ui/SearchOverlay'

const shopLinks = [
  { label: 'All Fragrances', href: '/shop' },
  { label: 'Women', href: '/shop/women' },
  { label: 'Men', href: '/shop/men' },
  { label: 'Unisex', href: '/shop/unisex' },
  { label: 'Extraits de Parfum', href: '/shop/extraits' },
  { label: 'Eau de Parfum', href: '/shop/edp' },
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
  { label: 'Samples', href: '/samples' },
]

export default function Header({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { itemCount, openCart } = useCartStore()
  const pathname = usePathname()

  // Hydration safety
  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-close menu, search, and reset scroll on route change
  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
    document.body.style.overflow = ''
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 64,
            gap: '1rem',
          }}
        >
          {/* Official Capriole Logo (Left) */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <Image
              src="/images/capriole-logo.jpg"
              alt="CAPRIOLE Perfumes & Fragrances"
              width={160}
              height={48}
              style={{ objectFit: 'contain', height: 38, width: 'auto', maxHeight: 38 }}
              priority
              className="capriole-logo-img"
            />
          </Link>

          {/* Desktop Nav (Center) */}
          <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem' }} className="desktop-nav">
            {/* SHOP Dropdown */}
            <div className="nav-item" style={{ position: 'relative', paddingBottom: '0.75rem', marginBottom: '-0.75rem' }}>
              <Link href="/shop" style={{ textDecoration: 'none' }} className="nav-top-btn">
                SHOP
              </Link>
              <div className="nav-dropdown">
                {shopLinks.map(link => (
                  <Link key={link.href} href={link.href} className="nav-dd-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* COLLECTIONS Dropdown */}
            <div className="nav-item" style={{ position: 'relative', paddingBottom: '0.75rem', marginBottom: '-0.75rem' }}>
              <Link href="/collections" style={{ textDecoration: 'none' }} className="nav-top-btn">
                COLLECTIONS
              </Link>
              <div className="nav-dropdown">
                {collectionsLinks.map(link => (
                  <Link key={link.href} href={link.href} className="nav-dd-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* DISCOVER Dropdown */}
            <div className="nav-item" style={{ position: 'relative', paddingBottom: '0.75rem', marginBottom: '-0.75rem' }}>
              <Link href="/discover" style={{ textDecoration: 'none' }} className="nav-top-btn">
                DISCOVER
              </Link>
              <div className="nav-dropdown">
                {discoverLinks.map(link => (
                  <Link key={link.href} href={link.href} className="nav-dd-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/samples" style={{ fontSize: '0.625rem', letterSpacing: '0.22em', color: '#B8B0A3', fontWeight: 400, fontFamily: 'DM Sans, sans-serif', transition: 'color 0.2s', textDecoration: 'none' }} className="nav-link">SAMPLES</Link>
            <Link href="/about" style={{ fontSize: '0.625rem', letterSpacing: '0.22em', color: '#B8B0A3', fontWeight: 400, fontFamily: 'DM Sans, sans-serif', transition: 'color 0.2s', textDecoration: 'none' }} className="nav-link">ABOUT</Link>
            <Link href="/visit" style={{ fontSize: '0.625rem', letterSpacing: '0.22em', color: '#B8B0A3', fontWeight: 400, fontFamily: 'DM Sans, sans-serif', transition: 'color 0.2s', textDecoration: 'none' }} className="nav-link">VISIT</Link>
          </nav>

          {/* Right Actions — NO ACCOUNT ICON */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'flex-end', flexShrink: 0 }}>
            <button
              onClick={() => setSearchOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#B8B0A3', display: 'flex', alignItems: 'center', transition: 'color 0.2s', padding: 4 }}
              aria-label="Search fragrances"
              className="icon-btn"
            >
              <Search size={18} />
            </button>
            <button
              onClick={() => openCart()}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#B8B0A3', display: 'flex', alignItems: 'center', position: 'relative', transition: 'color 0.2s', padding: 4 }}
              aria-label={`Shopping bag${count > 0 ? `, ${count} item${count !== 1 ? 's' : ''}` : ''}`}
              className="icon-btn"
            >
              <ShoppingBag size={18} />
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
              <Menu size={22} />
            </button>
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .desktop-nav { display: none !important; }
            #mobile-menu-btn { display: flex !important; }
            .capriole-logo-img { height: 32px !important; }
          }
          @media (max-width: 360px) {
            .capriole-logo-img { height: 28px !important; }
          }
          .nav-top-btn {
            font-size: 0.625rem;
            letter-spacing: 0.22em;
            color: #B8B0A3;
            font-family: DM Sans, sans-serif;
            font-weight: 400;
            transition: color 0.2s;
            display: inline-block;
          }
          .nav-top-btn:hover, .nav-link:hover, .icon-btn:hover { color: #F0EBE0 !important; }
          .nav-dd-link {
            display: block;
            padding: 0.5rem 0;
            font-size: 0.75rem;
            letter-spacing: 0.08em;
            color: #7A7570;
            transition: color 0.15s;
            font-family: DM Sans, sans-serif;
            text-decoration: none;
          }
          .nav-dd-link:hover { color: #B8973A !important; }
        `}</style>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  )
}
