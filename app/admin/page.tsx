import { Metadata } from 'next'
import Link from 'next/link'
import prisma from '@/lib/prisma/db'

export const metadata: Metadata = { title: 'Dashboard' }

async function getStats() {
  try {
    const [
      totalProducts,
      activeProducts,
      outOfStock,
      totalOrders,
      newOrders,
      completedOrders,
      cancelledOrders,
      totalCustomers,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { published: true } }),
      prisma.product.count({ where: { stockStatus: 'out_of_stock' } }),
      prisma.order.count(),
      prisma.order.count({ where: { status: 'new' } }),
      prisma.order.count({ where: { status: 'completed' } }),
      prisma.order.count({ where: { status: 'cancelled' } }),
      prisma.customer.count(),
    ])

    const recentOrders = await prisma.order.findMany({
      take: 8,
      orderBy: { createdAt: 'desc' },
      include: { items: true },
    })

    const revenue = await prisma.order.aggregate({
      where: { status: { in: ['confirmed', 'processing', 'ready', 'out_for_delivery', 'completed'] } },
      _sum: { total: true },
    })

    const lowStock = await prisma.product.count({ where: { stockStatus: 'low_stock' } })

    const recentProducts = await prisma.product.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, price: true, published: true, stockStatus: true },
    })

    return {
      totalProducts, activeProducts, outOfStock, totalOrders,
      newOrders, completedOrders, cancelledOrders, totalCustomers,
      lowStock, recentOrders, revenue: revenue._sum.total || 0, recentProducts,
    }
  } catch {
    return {
      totalProducts: 0, activeProducts: 0, outOfStock: 0, totalOrders: 0,
      newOrders: 0, completedOrders: 0, cancelledOrders: 0, totalCustomers: 0,
      lowStock: 0, recentOrders: [], revenue: 0, recentProducts: [],
    }
  }
}

const STATUS_COLOR: Record<string, string> = {
  new: '#C5A15A', confirmed: '#7a9a8a', processing: '#7a8aba',
  ready: '#9a8aba', out_for_delivery: '#7abaab', completed: '#4a9', cancelled: '#e07070',
}
const STATUS_LABEL: Record<string, string> = {
  new: 'NEW', confirmed: 'CONFIRMED', processing: 'PROCESSING',
  ready: 'READY', out_for_delivery: 'OUT FOR DELIVERY', completed: 'COMPLETED', cancelled: 'CANCELLED',
}

export default async function AdminDashboard() {
  const s = await getStats()

  const StatCard = ({ label, value, href, sub }: { label: string; value: number; href: string; sub?: string }) => (
    <Link href={href} style={{ display: 'block', background: '#101010', border: '1px solid #1e1e1e', padding: '1.25rem 1.5rem', textDecoration: 'none', transition: 'border-color 0.15s' }} className="stat-card">
      <div style={{ fontSize: '0.48rem', letterSpacing: '0.2em', color: '#7A7570', marginBottom: '0.625rem', fontFamily: 'DM Sans, sans-serif' }}>{label}</div>
      <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '2.25rem', color: '#C5A15A', fontWeight: 400, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: '0.6rem', color: '#7A7570', marginTop: '0.375rem', fontFamily: 'DM Sans, sans-serif' }}>{sub}</div>}
    </Link>
  )

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.48rem', letterSpacing: '0.22em', color: '#C5A15A', marginBottom: '0.5rem', fontFamily: 'DM Sans, sans-serif' }}>ADMIN</div>
        <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '2rem', color: '#F0EBE0', fontWeight: 400 }}>DASHBOARD</h1>
      </div>

      {/* Revenue banner */}
      <div style={{ background: '#101010', border: '1px solid #1e1e1e', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.48rem', letterSpacing: '0.2em', color: '#7A7570', marginBottom: '0.375rem', fontFamily: 'DM Sans, sans-serif' }}>CONFIRMED REVENUE</div>
          <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.75rem', color: '#C5A15A', fontWeight: 400 }}>
            GHS {s.revenue.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/admin/orders" style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: '#C5A15A', borderBottom: '1px solid rgba(197,161,90,0.3)', paddingBottom: 1, fontFamily: 'DM Sans, sans-serif', textDecoration: 'none' }}>VIEW ORDERS →</Link>
          <Link href="/admin/products/new" style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: '#7A7570', borderBottom: '1px solid #2a2a2a', paddingBottom: 1, fontFamily: 'DM Sans, sans-serif', textDecoration: 'none' }}>ADD PRODUCT →</Link>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }} className="stats-grid">
        <StatCard label="TOTAL PRODUCTS" value={s.totalProducts} href="/admin/products" sub={`${s.activeProducts} published`} />
        <StatCard label="TOTAL ORDERS" value={s.totalOrders} href="/admin/orders" sub={`${s.newOrders} new`} />
        <StatCard label="CUSTOMERS" value={s.totalCustomers} href="/admin/customers" />
        <StatCard label="COMPLETED ORDERS" value={s.completedOrders} href="/admin/orders" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }} className="stats-grid">
        <StatCard label="NEW ORDERS" value={s.newOrders} href="/admin/orders" />
        <StatCard label="OUT OF STOCK" value={s.outOfStock} href="/admin/inventory" />
        <StatCard label="LOW STOCK" value={s.lowStock} href="/admin/inventory" />
        <StatCard label="CANCELLED" value={s.cancelledOrders} href="/admin/orders" />
      </div>

      {/* Recent orders + recent products */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '1.5rem' }} className="dash-cols">
        {/* Recent orders */}
        <div style={{ background: '#101010', border: '1px solid #1e1e1e', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.48rem', letterSpacing: '0.2em', color: '#C5A15A', fontFamily: 'DM Sans, sans-serif' }}>RECENT ORDERS</div>
            <Link href="/admin/orders" style={{ fontSize: '0.55rem', letterSpacing: '0.12em', color: '#7A7570', fontFamily: 'DM Sans, sans-serif', textDecoration: 'none' }}>VIEW ALL →</Link>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
                {['ORDER', 'CUSTOMER', 'TOTAL', 'STATUS'].map(h => (
                  <th key={h} style={{ fontSize: '0.45rem', letterSpacing: '0.12em', color: '#7A7570', textAlign: 'left', padding: '0.5rem 0.625rem', fontWeight: 400, fontFamily: 'DM Sans, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.recentOrders.map((order: any) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #141414' }}>
                  <td style={{ padding: '0.625rem' }}>
                    <Link href={`/admin/orders/${order.id}`} style={{ fontSize: '0.75rem', color: '#C5A15A', fontFamily: 'Playfair Display, serif', textDecoration: 'none' }}>
                      #{order.orderNumber}
                    </Link>
                  </td>
                  <td style={{ padding: '0.625rem', fontSize: '0.75rem', color: '#B8B0A3', fontFamily: 'DM Sans, sans-serif' }}>{order.customerName}</td>
                  <td style={{ padding: '0.625rem', fontSize: '0.85rem', color: '#F0EBE0', fontFamily: 'Playfair Display, serif' }}>GHS {order.total.toFixed(2)}</td>
                  <td style={{ padding: '0.625rem' }}>
                    <span style={{ fontSize: '0.48rem', letterSpacing: '0.08em', color: STATUS_COLOR[order.status] || '#7A7570', fontFamily: 'DM Sans, sans-serif' }}>
                      {STATUS_LABEL[order.status] || order.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {s.recentOrders.length === 0 && <p style={{ color: '#7A7570', fontSize: '0.8rem', padding: '1rem 0', fontFamily: 'DM Sans, sans-serif' }}>No orders yet.</p>}
        </div>

        {/* Recent products */}
        <div style={{ background: '#101010', border: '1px solid #1e1e1e', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.48rem', letterSpacing: '0.2em', color: '#C5A15A', fontFamily: 'DM Sans, sans-serif' }}>RECENT PRODUCTS</div>
            <Link href="/admin/products" style={{ fontSize: '0.55rem', letterSpacing: '0.12em', color: '#7A7570', fontFamily: 'DM Sans, sans-serif', textDecoration: 'none' }}>VIEW ALL →</Link>
          </div>
          {s.recentProducts.map((p: any) => (
            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.625rem 0', borderBottom: '1px solid #141414' }}>
              <div>
                <Link href={`/admin/products/${p.id}`} style={{ fontSize: '0.8rem', color: '#F0EBE0', fontFamily: 'Playfair Display, serif', textDecoration: 'none', display: 'block' }}>{p.name}</Link>
                <div style={{ fontSize: '0.55rem', color: p.published ? '#4a9' : '#7A7570', fontFamily: 'DM Sans, sans-serif', marginTop: 2 }}>{p.published ? 'LIVE' : 'DRAFT'}</div>
              </div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '0.85rem', color: '#C5A15A' }}>GHS {p.price.toFixed(2)}</div>
            </div>
          ))}
          {s.recentProducts.length === 0 && <p style={{ color: '#7A7570', fontSize: '0.8rem', fontFamily: 'DM Sans, sans-serif' }}>No products yet.</p>}

          <div style={{ marginTop: '1.5rem', borderTop: '1px solid #1e1e1e', paddingTop: '1.25rem' }}>
            <div style={{ fontSize: '0.48rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '0.875rem', fontFamily: 'DM Sans, sans-serif' }}>QUICK ACTIONS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { label: '+ ADD PRODUCT', href: '/admin/products/new' },
                { label: '→ MANAGE COLLECTIONS', href: '/admin/collections' },
                { label: '→ EDIT HOMEPAGE', href: '/admin/homepage' },
                { label: '→ SITE SETTINGS', href: '/admin/settings' },
              ].map(a => (
                <Link key={a.href} href={a.href} style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: '#7A7570', fontFamily: 'DM Sans, sans-serif', textDecoration: 'none', transition: 'color 0.12s' }} className="quick-link">
                  {a.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .stat-card:hover { border-color: #C5A15A !important; }
        .quick-link:hover { color: #C5A15A !important; }
        @media (max-width: 1200px) { .stats-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 900px) { .dash-cols { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px) { .stats-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </div>
  )
}
