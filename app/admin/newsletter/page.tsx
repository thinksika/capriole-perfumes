import { Metadata } from 'next'
import prisma from '@/lib/prisma/db'

export const metadata: Metadata = { title: 'Newsletter' }

export default async function AdminNewsletterPage() {
  let subscribers: any[] = []
  try {
    subscribers = await prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: 'desc' } })
  } catch {}

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '0.5rem' }}>MANAGE</div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#F4F0E8', fontWeight: 300 }}>NEWSLETTER</h1>
        </div>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#C5A15A', fontWeight: 300 }}>{subscribers.length} subscribers</div>
      </div>
      <div style={{ background: '#101010', border: '1px solid #1e1e1e' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
              {['EMAIL', 'DATE SUBSCRIBED'].map(h => (
                <th key={h} style={{ fontSize: '0.5rem', letterSpacing: '0.12em', color: '#9A978F', textAlign: 'left', padding: '0.875rem', fontWeight: 400 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subscribers.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid #1e1e1e' }}>
                <td style={{ padding: '0.875rem', fontSize: '0.8rem', color: '#C2BBAF' }}>{s.email}</td>
                <td style={{ padding: '0.875rem', fontSize: '0.75rem', color: '#9A978F' }}>{new Date(s.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {subscribers.length === 0 && <p style={{ color: '#9A978F', fontSize: '0.8125rem', padding: '2rem' }}>No subscribers yet.</p>}
      </div>
    </div>
  )
}
