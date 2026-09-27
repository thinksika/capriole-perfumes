import { Metadata } from 'next'
import prisma from '@/lib/prisma/db'

export const metadata: Metadata = { title: 'Customers' }

export default async function AdminCustomersPage() {
  let customers: any[] = []
  try {
    customers = await prisma.customer.findMany({ orderBy: { createdAt: 'desc' } })
  } catch {}

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '0.5rem' }}>MANAGE</div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#F4F0E8', fontWeight: 300 }}>CUSTOMERS</h1>
      </div>
      <div style={{ background: '#101010', border: '1px solid #1e1e1e' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
              {['NAME', 'PHONE', 'EMAIL', 'DATE'].map(h => (
                <th key={h} style={{ fontSize: '0.5rem', letterSpacing: '0.12em', color: '#9A978F', textAlign: 'left', padding: '0.875rem', fontWeight: 400 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid #1e1e1e' }}>
                <td style={{ padding: '0.875rem', fontFamily: 'Cormorant Garamond, serif', fontSize: '0.95rem', color: '#F4F0E8' }}>{c.name}</td>
                <td style={{ padding: '0.875rem' }}>
                  <a href={`https://wa.me/${c.phone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: '#9A978F', transition: 'color 0.15s' }} className="wa-link">{c.phone}</a>
                </td>
                <td style={{ padding: '0.875rem', fontSize: '0.8rem', color: '#9A978F' }}>{c.email || '—'}</td>
                <td style={{ padding: '0.875rem', fontSize: '0.75rem', color: '#9A978F' }}>{new Date(c.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {customers.length === 0 && <p style={{ color: '#9A978F', fontSize: '0.8125rem', padding: '2rem' }}>No customers yet.</p>}
      </div>
      <style>{`.wa-link:hover{color:#25D366!important;}`}</style>
    </div>
  )
}
