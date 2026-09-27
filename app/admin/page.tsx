import { Metadata } from 'next'
import Link from 'next/link'
import prisma from '@/lib/prisma/db'

export const metadata: Metadata = { title: 'Dashboard' }

async function getStats() {
  try {
    const [products, orders, customers, subscribers] = await Promise.all([
      prisma.product.count({ where: { published: true } }),
      prisma.order.count(),
      prisma.customer.count(),
      prisma.newsletterSubscriber.count(),
    ])
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { items: true },
    })
    const revenue = await prisma.order.aggregate({
      where: { status: { in: ['confirmed', 'processing', 'shipped', 'delivered'] } },
      _sum: { total: true },
    })
    return { products, orders, customers, subscribers, recentOrders, revenue: revenue._sum.total || 0 }
  } catch { return { products: 0, orders: 0, customers: 0, subscribers: 0, recentOrders: [], revenue: 0 } }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '0.5rem' }}>ADMIN</div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#F4F0E8', fontWeight: 300 }}>DASHBOARD</h1>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '3rem' }}>
        {[{
          label: 'PRODUCTS', value: stats.products, href: '/admin/products', color: '#C5A15A'
        }, {
          label: 'ORDERS', value: stats.orders, href: '/admin/orders', color: '#C5A15A'
        }, {
          label: 'CUSTOMERS', value: stats.customers, href: '/admin/customers', color: '#C5A15A'
        }, {
          label: 'SUBSCRIBERS', value: stats.subscribers, href: '/admin/newsletter', color: '#C5A15A'
        }].map(stat => (
          <Link key={stat.label} href={stat.href} style={{ display: 'block', background: '#101010', border: '1px solid #1e1e1e', padding: '1.5rem', textDecoration: 'none', transition: 'border-color 0.2s' }} className="stat-card">
            <div style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: '#9A978F', marginBottom: '0.75rem' }}>{stat.label}</div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', color: stat.color, fontWeight: 300 }}>{stat.value}</div>
          </Link>
        ))}
      </div>

      {/* Revenue */}
      <div style={{ background: '#101010', border: '1px solid #1e1e1e', padding: '1.5rem', marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: '#9A978F', marginBottom: '0.5rem' }}>CONFIRMED REVENUE</div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#C5A15A', fontWeight: 300 }}>GHS {stats.revenue.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
        <Link href="/admin/orders" style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: '#C5A15A', borderBottom: '1px solid rgba(197,161,90,0.3)', paddingBottom: 2 }}>VIEW ORDERS →</Link>
      </div>

      {/* Recent orders */}
      <div style={{ background: '#101010', border: '1px solid #1e1e1e', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A' }}>RECENT ORDERS</div>
          <Link href="/admin/orders" style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: '#9A978F' }}>VIEW ALL →</Link>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
              {['ORDER', 'CUSTOMER', 'TOTAL', 'STATUS', 'DATE'].map(h => (
                <th key={h} style={{ fontSize: '0.5rem', letterSpacing: '0.15em', color: '#9A978F', textAlign: 'left', padding: '0.5rem 0.75rem 0.75rem', fontWeight: 400 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stats.recentOrders.map((order: any) => (
              <tr key={order.id} style={{ borderBottom: '1px solid #101010' }}>
                <td style={{ padding: '0.75rem', fontSize: '0.8rem', color: '#C5A15A' }}>#{order.orderNumber}</td>
                <td style={{ padding: '0.75rem', fontSize: '0.8rem', color: '#C2BBAF' }}>{order.customerName}</td>
                <td style={{ padding: '0.75rem', fontSize: '0.8rem', color: '#F4F0E8', fontFamily: 'Cormorant Garamond, serif' }}>GHS {order.total.toFixed(2)}</td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{ fontSize: '0.55rem', letterSpacing: '0.1em', padding: '0.25rem 0.5rem', border: '1px solid', borderColor: order.status === 'delivered' ? '#4a9' : order.status === 'pending' ? '#9A978F' : '#C5A15A', color: order.status === 'delivered' ? '#4a9' : order.status === 'pending' ? '#9A978F' : '#C5A15A' }}>{order.status.toUpperCase()}</span>
                </td>
                <td style={{ padding: '0.75rem', fontSize: '0.75rem', color: '#9A978F' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {stats.recentOrders.length === 0 && <p style={{ color: '#9A978F', fontSize: '0.8125rem', padding: '1rem 0.75rem' }}>No orders yet.</p>}
      </div>

      <style>{`.stat-card:hover{border-color:#C5A15A!important;}@media(max-width:1024px){div[style*="grid-template-columns: repeat(4, 1fr)"]{grid-template-columns:repeat(2,1fr)!important;}}`}</style>
    </div>
  )
}
