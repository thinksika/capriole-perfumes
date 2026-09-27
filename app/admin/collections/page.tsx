import { Metadata } from 'next'
import Link from 'next/link'
import prisma from '@/lib/prisma/db'

export const metadata: Metadata = { title: 'Collections' }

export default async function AdminCollectionsPage() {
  let collections: any[] = []
  try {
    collections = await prisma.collection.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      include: { products: true },
    })
  } catch {}

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '0.5rem' }}>MANAGE</div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#F4F0E8', fontWeight: 300 }}>COLLECTIONS</h1>
        </div>
        <Link href="/admin/collections/new" style={{ background: '#C5A15A', color: '#070707', padding: '0.75rem 1.5rem', fontSize: '0.6rem', letterSpacing: '0.15em', fontFamily: 'Inter, sans-serif', fontWeight: 500, textDecoration: 'none' }} className="new-btn">+ NEW COLLECTION</Link>
      </div>

      <div style={{ background: '#101010', border: '1px solid #1e1e1e' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
              {['NAME', 'SLUG', 'PRODUCTS', 'STATUS', 'ORDER', 'ACTIONS'].map(h => (
                <th key={h} style={{ fontSize: '0.5rem', letterSpacing: '0.15em', color: '#9A978F', textAlign: 'left', padding: '1rem', fontWeight: 400 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {collections.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid #1e1e1e' }} className="row">
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.95rem', color: '#F4F0E8' }}>{c.name}</div>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.75rem', color: '#9A978F' }}>{c.slug}</td>
                <td style={{ padding: '1rem', fontSize: '0.8rem', color: '#C2BBAF' }}>{c.products.length}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ fontSize: '0.55rem', letterSpacing: '0.1em', padding: '0.2rem 0.5rem', border: '1px solid', borderColor: c.published ? '#4a9' : '#9A978F', color: c.published ? '#4a9' : '#9A978F' }}>{c.published ? 'LIVE' : 'DRAFT'}</span>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.8rem', color: '#9A978F' }}>{c.sortOrder}</td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <Link href={`/admin/collections/${c.id}`} style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: '#C5A15A', borderBottom: '1px solid rgba(197,161,90,0.3)', paddingBottom: 1 }}>EDIT</Link>
                    <Link href={`/collections/${c.slug}`} target="_blank" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: '#9A978F', borderBottom: '1px solid #2a2a2a', paddingBottom: 1 }}>VIEW</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {collections.length === 0 && <p style={{ color: '#9A978F', fontSize: '0.8125rem', padding: '2rem' }}>No collections yet. <Link href="/admin/collections/new" style={{ color: '#C5A15A' }}>Create the first one →</Link></p>}
      </div>
      <style>{`.new-btn:hover{background:#D7BD80!important;}.row:hover{background:rgba(255,255,255,0.02)!important;}`}</style>
    </div>
  )
}
