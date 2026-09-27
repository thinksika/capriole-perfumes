import { Metadata } from 'next'
import Link from 'next/link'
import prisma from '@/lib/prisma/db'

export const metadata: Metadata = { title: 'Products' }

export default async function AdminProductsPage() {
  let products: any[] = []
  try {
    products = await prisma.product.findMany({
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
      include: { discounts: { include: { discount: true } } },
    })
  } catch {}

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '0.5rem' }}>MANAGE</div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#F4F0E8', fontWeight: 300 }}>PRODUCTS</h1>
        </div>
        <Link href="/admin/products/new" style={{ background: '#C5A15A', color: '#070707', padding: '0.75rem 1.5rem', fontSize: '0.6rem', letterSpacing: '0.15em', fontFamily: 'Inter, sans-serif', fontWeight: 500, transition: 'background 0.2s' }} className="new-product-btn">+ NEW PRODUCT</Link>
      </div>

      <div style={{ background: '#101010', border: '1px solid #1e1e1e' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
              {['NAME', 'FAMILY', 'PRICE', 'STOCK', 'STATUS', 'ACTIONS'].map(h => (
                <th key={h} style={{ fontSize: '0.5rem', letterSpacing: '0.15em', color: '#9A978F', textAlign: 'left', padding: '1rem', fontWeight: 400 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #1e1e1e' }} className="product-row">
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.95rem', color: '#F4F0E8', marginBottom: 2 }}>{p.name}</div>
                  <div style={{ fontSize: '0.65rem', color: '#9A978F' }}>{p.slug}</div>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.8rem', color: '#9A978F' }}>{p.fragranceFamily || '—'}</td>
                <td style={{ padding: '1rem', fontFamily: 'Cormorant Garamond, serif', fontSize: '0.9rem', color: '#F4F0E8' }}>GHS {p.price.toFixed(2)}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ fontSize: '0.55rem', letterSpacing: '0.1em', padding: '0.2rem 0.5rem', border: '1px solid', borderColor: p.stockStatus === 'in_stock' ? '#4a9' : p.stockStatus === 'low_stock' ? '#C5A15A' : '#e07070', color: p.stockStatus === 'in_stock' ? '#4a9' : p.stockStatus === 'low_stock' ? '#C5A15A' : '#e07070' }}>{p.stockStatus === 'in_stock' ? 'IN STOCK' : p.stockStatus === 'low_stock' ? 'LOW' : 'OUT'}</span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ fontSize: '0.55rem', letterSpacing: '0.1em', padding: '0.2rem 0.5rem', border: '1px solid', borderColor: p.published ? '#4a9' : '#9A978F', color: p.published ? '#4a9' : '#9A978F' }}>{p.published ? 'LIVE' : 'DRAFT'}</span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <Link href={`/admin/products/${p.id}`} style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: '#C5A15A', borderBottom: '1px solid rgba(197,161,90,0.3)', paddingBottom: 1 }}>EDIT</Link>
                    <Link href={`/product/${p.slug}`} target="_blank" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: '#9A978F', borderBottom: '1px solid #2a2a2a', paddingBottom: 1 }}>VIEW</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && <p style={{ color: '#9A978F', fontSize: '0.8125rem', padding: '2rem' }}>No products yet. <Link href="/admin/products/new" style={{ color: '#C5A15A' }}>Create the first one →</Link></p>}
      </div>
      <style>{`.new-product-btn:hover{background:#D7BD80!important;}.product-row:hover{background:rgba(255,255,255,0.02)!important;}`}</style>
    </div>
  )
}
