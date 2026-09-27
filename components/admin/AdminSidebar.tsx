'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Package, ShoppingBag, Users, Settings,
  BookOpen, Mail, ArrowLeft, LogOut, Layers, Tag,
  Archive, Home, ChevronDown, ChevronRight, Globe
} from 'lucide-react'

type NavSection = {
  label: string
  items: { label: string; href: string; icon: React.ElementType }[]
}

const NAV: NavSection[] = [
  {
    label: '',
    items: [
      { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    ],
  },
  {
    label: 'CATALOG',
    items: [
      { label: 'Products', href: '/admin/products', icon: Package },
      { label: 'Collections', href: '/admin/collections', icon: Layers },
      { label: 'Inventory', href: '/admin/inventory', icon: Archive },
      { label: 'Discounts', href: '/admin/discounts', icon: Tag },
    ],
  },
  {
    label: 'ORDERS',
    items: [
      { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
      { label: 'Customers', href: '/admin/customers', icon: Users },
    ],
  },
  {
    label: 'CONTENT',
    items: [
      { label: 'Homepage', href: '/admin/homepage', icon: Home },
      { label: 'Journal', href: '/admin/journal', icon: BookOpen },
      { label: 'Newsletter', href: '/admin/newsletter', icon: Mail },
    ],
  },
  {
    label: 'SETTINGS',
    items: [
      { label: 'Settings', href: '/admin/settings', icon: Settings },
    ],
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    await fetch('/api/auth/admin', { method: 'DELETE' })
    sessionStorage.removeItem('capriole-admin')
    router.push('/admin/login')
  }

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #1e1e1e', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div style={{
            width: 30, height: 30, border: '1px solid #C5A15A',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '0.875rem', color: '#C5A15A' }}>C</span>
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: '#F0EBE0', fontFamily: 'DM Sans, sans-serif' }}>CAPRIOLE</div>
            <div style={{ fontSize: '0.42rem', letterSpacing: '0.18em', color: '#7A7570', fontFamily: 'DM Sans, sans-serif' }}>ADMIN PANEL</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: '0.75rem 0', flex: 1, overflowY: 'auto' }}>
        {NAV.map((section, si) => (
          <div key={si} style={{ marginBottom: '0.25rem' }}>
            {section.label && (
              <div style={{
                fontSize: '0.42rem', letterSpacing: '0.22em', color: '#3a3a3a',
                padding: '0.875rem 1.5rem 0.375rem',
                fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
              }}>
                {section.label}
              </div>
            )}
            {section.items.map(item => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.625rem',
                    padding: '0.625rem 1.5rem',
                    fontSize: '0.7rem', letterSpacing: '0.06em',
                    color: active ? '#C5A15A' : '#7A7570',
                    background: active ? 'rgba(197,161,90,0.07)' : 'transparent',
                    borderLeft: active ? '2px solid #C5A15A' : '2px solid transparent',
                    transition: 'all 0.12s',
                    fontFamily: 'DM Sans, sans-serif',
                    textDecoration: 'none',
                  }}
                  className="sidebar-link"
                >
                  <Icon size={14} />
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div style={{
        padding: '1rem 1.5rem', borderTop: '1px solid #1e1e1e',
        display: 'flex', flexDirection: 'column', gap: '0.375rem', flexShrink: 0,
      }}>
        <Link
          href="/"
          target="_blank"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.65rem', color: '#7A7570', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif', transition: 'color 0.12s' }}
          className="sidebar-link"
        >
          <Globe size={13} />
          View site
        </Link>
        <button
          onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.65rem', color: '#7A7570', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'DM Sans, sans-serif', transition: 'color 0.12s' }}
          className="sidebar-link"
        >
          <LogOut size={13} />
          Sign out
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="admin-sidebar-desktop" style={{
        width: 220, background: '#0a0a0a', borderRight: '1px solid #1e1e1e',
        display: 'flex', flexDirection: 'column', height: '100vh',
        position: 'sticky', top: 0, flexShrink: 0,
      }}>
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="admin-mobile-bar" style={{
        display: 'none', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        background: '#0a0a0a', borderBottom: '1px solid #1e1e1e',
        padding: '0.875rem 1.25rem', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: '#C5A15A', fontFamily: 'DM Sans, sans-serif' }}>CAPRIOLE ADMIN</div>
        <button
          onClick={() => setMobileOpen(v => !v)}
          style={{ background: 'none', border: 'none', color: '#7A7570', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.65rem', letterSpacing: '0.1em', fontFamily: 'DM Sans, sans-serif' }}
        >
          {mobileOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          MENU
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: 45, left: 0, right: 0, bottom: 0, zIndex: 190,
          background: '#0a0a0a', borderTop: '1px solid #1e1e1e',
          display: 'flex', flexDirection: 'column', overflowY: 'auto',
        }}>
          <SidebarContent />
        </div>
      )}

      <style>{`
        .sidebar-link:hover { color: #F0EBE0 !important; }
        @media (max-width: 768px) {
          .admin-sidebar-desktop { display: none !important; }
          .admin-mobile-bar { display: flex !important; }
          .admin-main { padding-top: 60px !important; }
        }
      `}</style>
    </>
  )
}
