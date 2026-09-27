'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, BookOpen, Mail, ArrowLeft, LogOut } from 'lucide-react'

const NAV = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Journal', href: '/admin/journal', icon: BookOpen },
  { label: 'Newsletter', href: '/admin/newsletter', icon: Mail },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/admin', { method: 'DELETE' })
    sessionStorage.removeItem('capriole-admin')
    router.push('/admin/login')
  }

  return (
    <aside className="admin-sidebar">
      {/* Logo */}
      <div style={{ padding: '1.5rem', borderBottom: '1px solid #1e1e1e' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 32, height: 32, border: '1px solid #C5A15A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', color: '#C5A15A' }}>C</span>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: '#F4F0E8' }}>CAPRIOLE</div>
            <div style={{ fontSize: '0.45rem', letterSpacing: '0.15em', color: '#9A978F' }}>ADMIN</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: '1rem 0' }}>
        {NAV.map(item => {
          const Icon = item.icon
          const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.75rem 1.5rem',
                fontSize: '0.7rem', letterSpacing: '0.08em',
                color: isActive ? '#C5A15A' : '#9A978F',
                background: isActive ? 'rgba(197,161,90,0.08)' : 'transparent',
                borderLeft: isActive ? '2px solid #C5A15A' : '2px solid transparent',
                transition: 'all 0.15s',
                fontFamily: 'Inter, sans-serif',
              }}
              className="sidebar-link"
            >
              <Icon size={15} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem 1.5rem', borderTop: '1px solid #1e1e1e', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.65rem', color: '#9A978F', transition: 'color 0.15s' }} className="sidebar-link">
          <ArrowLeft size={13} />
          Back to site
        </Link>
        <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.65rem', color: '#9A978F', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'Inter, sans-serif', transition: 'color 0.15s' }} className="sidebar-link">
          <LogOut size={13} />
          Sign out
        </button>
      </div>

      <style>{`.sidebar-link:hover{color:#F4F0E8!important;}`}</style>
    </aside>
  )
}
