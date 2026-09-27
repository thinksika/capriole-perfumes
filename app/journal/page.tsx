import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import prisma from '@/lib/prisma/db'

export const metadata: Metadata = {
  title: 'Journal — Capriole Perfumes',
  description: 'Fragrance stories, guides and inspiration from the house of Capriole Perfumes.',
}

async function getPosts() {
  try {
    return await prisma.journalPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
    })
  } catch { return [] }
}

export default async function JournalPage() {
  const posts = await getPosts()
  return (
    <div style={{ background: '#070707', minHeight: '100vh', padding: '4rem 0 6rem' }}>
      <div className="container">
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ fontSize: '0.5rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>STORIES</div>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#F0EBE0', fontWeight: 400 }}>THE JOURNAL</h1>
        </div>
        {posts.length === 0 ? (
          <p style={{ color: '#7A7570', fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif' }}>Journal articles coming soon.</p>
        ) : (
          <div className="journal-grid">
            {posts.map(post => (
              <Link key={post.id} href={`/journal/${post.slug}`} style={{ display: 'block', textDecoration: 'none' }} className="journal-link">
                <div style={{ aspectRatio: '16/9', background: '#151515', overflow: 'hidden', position: 'relative', marginBottom: '1.5rem' }}>
                  {post.coverImage ? (
                    <Image src={post.coverImage} alt={post.title} fill style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }} sizes="(max-width: 768px) 100vw, 33vw" className="journal-img" />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: '#101010', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 48, height: 48, border: '1px solid #B8973A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.5rem', color: '#B8973A', fontWeight: 400 }}>C</span>
                      </div>
                    </div>
                  )}
                </div>
                {post.publishedAt && (
                  <div style={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: '#7A7570', marginBottom: '0.5rem', fontFamily: 'DM Sans, sans-serif' }}>
                    {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}
                  </div>
                )}
                <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.25rem', color: '#F0EBE0', fontWeight: 400, lineHeight: 1.2, marginBottom: '0.75rem', transition: 'color 0.2s' }} className="journal-title">{post.title}</h2>
                {post.excerpt && <p style={{ fontSize: '0.8125rem', color: '#7A7570', lineHeight: 1.6, fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}>{post.excerpt}</p>}
                <div style={{ marginTop: '1rem', fontSize: '0.6rem', letterSpacing: '0.15em', color: '#B8973A', borderBottom: '1px solid rgba(184,151,58,0.3)', paddingBottom: 2, display: 'inline-flex', fontFamily: 'DM Sans, sans-serif' }}>READ →</div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <style>{`.journal-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:3rem;}@media(max-width:900px){.journal-grid{grid-template-columns:repeat(2,1fr)!important;}}@media(max-width:600px){.journal-grid{grid-template-columns:1fr!important;}}.journal-link:hover .journal-title{color:#B8973A!important;}.journal-link:hover .journal-img{transform:scale(1.04);}`}</style>
    </div>
  )
}
