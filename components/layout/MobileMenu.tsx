'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  { label: 'SHOP', href: '/shop' },
  { label: 'COLLECTIONS', href: '/collections' },
  { label: 'DISCOVER YOUR SCENT', href: '/discover' },
  { label: 'SAMPLES', href: '/samples' },
  { label: 'ABOUT', href: '/about' },
  { label: 'VISIT', href: '/visit' },
  { label: 'CONTACT', href: '/contact' },
]

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()

  // Handle body overflow lock safely
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Auto-close menu when route changes
  useEffect(() => {
    if (isOpen) {
      onClose()
      document.body.style.overflow = ''
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname])

  if (!isOpen) return null

  const handleLinkClick = () => {
    onClose()
    document.body.style.overflow = ''
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={handleLinkClick}
        style={{
          position: 'fixed', inset: 0, zIndex: 88,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(6px)',
        }}
      />
      {/* Menu Drawer */}
      <div
        className="mobile-menu open"
        style={{
          position: 'fixed',
          inset: 0,
          background: '#070707',
          zIndex: 89,
          display: 'flex',
          flexDirection: 'column',
          padding: '1.75rem 1.25rem',
          overflowY: 'auto',
          maxWidth: '100vw',
          width: '100%',
          boxSizing: 'border-box',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <Link href="/" onClick={handleLinkClick} style={{ textDecoration: 'none' }}>
            <Image
              src="/images/capriole-logo.jpg"
              alt="CAPRIOLE Perfumes & Fragrances"
              width={140}
              height={40}
              style={{ objectFit: 'contain', height: 32, width: 'auto' }}
            />
          </Link>
          <button onClick={handleLinkClick} style={{ background: 'none', border: 'none', color: '#7A7570', cursor: 'pointer', display: 'flex', padding: 6 }} aria-label="Close menu">
            <X size={22} />
          </button>
        </div>

        <nav style={{ flex: 1 }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              style={{
                display: 'block',
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: 'clamp(1.2rem, 5vw, 1.6rem)',
                fontWeight: 400,
                color: '#B8B0A3',
                padding: '0.75rem 0',
                borderBottom: '1px solid #1c1c1c',
                transition: 'color 0.2s',
                textDecoration: 'none',
              }}
              className="mobile-nav-link"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #1c1c1c', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a
            href="https://www.instagram.com/capriole_perfumes.gh"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.625rem', letterSpacing: '0.15em', color: '#7A7570', transition: 'color 0.2s', fontFamily: 'DM Sans, sans-serif', textDecoration: 'none' }}
            className="mobile-social-link"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            INSTAGRAM
          </a>
          <a
            href="https://wa.me/233547151094"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.625rem', letterSpacing: '0.15em', color: '#7A7570', transition: 'color 0.2s', fontFamily: 'DM Sans, sans-serif', textDecoration: 'none' }}
            className="mobile-social-link"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WHATSAPP
          </a>
        </div>

        <style>{`
          .mobile-nav-link:hover { color: #F0EBE0 !important; }
          .mobile-social-link:hover { color: #B8973A !important; }
        `}</style>
      </div>
    </>
  )
}
