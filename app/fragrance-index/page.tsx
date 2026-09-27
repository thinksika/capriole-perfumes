import { Metadata } from 'next'
import Link from 'next/link'
import prisma from '@/lib/prisma/db'

export const metadata: Metadata = {
  title: 'Fragrance Index — Capriole Perfumes',
  description: 'The complete Capriole fragrance index. Browse all perfumes alphabetically.',
}

export default async function FragranceIndexPage() {
  let products: { id: string; name: string; slug: string; fragranceFamily: string | null; gender: string | null; concentration: string | null }[] = []
  try {
    products = await prisma.product.findMany({
      where: { published: true },
      select: { id: true, name: true, slug: true, fragranceFamily: true, gender: true, concentration: true },
      orderBy: { name: 'asc' },
    })
  } catch {}

  const grouped: Record<string, typeof products> = {}
  for (const p of products) {
    const letter = p.name[0].toUpperCase()
    if (!grouped[letter]) grouped[letter] = []
    grouped[letter].push(p)
  }
  const letters = Object.keys(grouped).sort()

  return (
    <div style={{ background: '#070707', minHeight: '100vh', padding: '4rem 0 6rem' }}>
      <div className="container">
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ fontSize: '0.5rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>REFERENCE</div>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#F0EBE0', fontWeight: 400 }}>FRAGRANCE INDEX</h1>
        </div>
        {letters.length > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #1e1e1e' }}>
            {letters.map(l => (
              <a key={l} href={`#letter-${l}`} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #2a2a2a', fontSize: '0.75rem', color: '#7A7570', transition: 'all 0.15s', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif' }} className="letter-nav">{l}</a>
            ))}
          </div>
        )}
        {letters.map(letter => (
          <div key={letter} id={`letter-${letter}`} style={{ marginBottom: '3rem' }}>
            <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '2rem', color: '#B8973A', fontWeight: 400, marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid #1e1e1e' }}>{letter}</div>
            {grouped[letter].map(p => (
              <Link key={p.id} href={`/product/${p.slug}`} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '2rem', alignItems: 'center', padding: '0.875rem 0', borderBottom: '1px solid #101010', textDecoration: 'none', transition: 'padding 0.15s' }} className="index-row">
                <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.1rem', color: '#F0EBE0', fontWeight: 400, transition: 'color 0.15s' }} className="index-name">{p.name}</span>
                {p.fragranceFamily && <span style={{ fontSize: '0.65rem', color: '#7A7570', letterSpacing: '0.05em', fontFamily: 'DM Sans, sans-serif' }}>{p.fragranceFamily}</span>}
                {p.gender && <span style={{ fontSize: '0.65rem', color: '#7A7570', textTransform: 'capitalize', letterSpacing: '0.05em', fontFamily: 'DM Sans, sans-serif' }}>{p.gender}</span>}
              </Link>
            ))}
          </div>
        ))}
        {products.length === 0 && (
          <p style={{ color: '#7A7570', fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif' }}>The fragrance index is being built. <Link href="/shop" style={{ color: '#B8973A' }}>Browse the shop →</Link></p>
        )}
      </div>
      <style>{`.letter-nav:hover{border-color:#B8973A!important;color:#B8973A!important;}.index-row:hover{background:#101010!important;padding-left:0.75rem!important;}.index-row:hover .index-name{color:#B8973A!important;}`}</style>
    </div>
  )
}
