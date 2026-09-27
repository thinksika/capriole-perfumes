import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import prisma from '@/lib/prisma/db'
import { JOURNAL_ARTICLES } from '@/lib/journal/articles'

export const metadata: Metadata = {
  title: 'The Journal — Capriole Perfumes',
  description: 'Stories, rituals and perspectives from the world of luxury fragrance.',
}

async function getPosts() {
  try {
    const dbPosts = await prisma.journalPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
    })
    if (dbPosts.length > 0) {
      return dbPosts.map(p => ({
        id: p.id,
        slug: p.slug,
        title: p.title.toUpperCase(),
        category: 'HAUTE PARFUMERIE',
        excerpt: p.excerpt || '',
        coverImage: p.coverImage || '/images/editorial/hero.png',
        publishedAt: p.publishedAt ? p.publishedAt.toISOString().split('T')[0] : '2026-03-01',
      }))
    }
  } catch {}
  return JOURNAL_ARTICLES
}

export default async function JournalPage() {
  const posts = await getPosts()
  const featured = posts[0]
  const restPosts = posts.slice(1)

  return (
    <div style={{ background: '#070707', minHeight: '100vh', padding: '4rem 0 6rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 4rem' }}>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.3em', color: '#B8973A', marginBottom: '1rem', fontFamily: 'DM Sans, sans-serif' }}>EDITORIAL</div>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#F0EBE0', fontWeight: 400, letterSpacing: '-0.01em', marginBottom: '1rem' }}>
            THE JOURNAL
          </h1>
          <p style={{ color: '#9A978F', fontSize: '0.9375rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 300, lineHeight: 1.7 }}>
            Stories, rituals and perspectives from the world of fragrance.
          </p>
          <div style={{ width: 40, height: 1, background: '#B8973A', margin: '2rem auto 0', opacity: 0.5 }} />
        </div>

        {/* Featured Article */}
        {featured && (
          <Link href={`/journal/${featured.slug}`} style={{ display: 'block', textDecoration: 'none', marginBottom: '5rem' }} className="featured-card">
            <div className="featured-grid">
              <div style={{ position: 'relative', aspectRatio: '16/10', background: '#121212', overflow: 'hidden' }}>
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.7s ease' }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="journal-img"
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem 1rem' }}>
                <div style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#B8973A', marginBottom: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>
                  FEATURED STORY · {featured.category}
                </div>
                <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#F0EBE0', fontWeight: 400, lineHeight: 1.25, marginBottom: '1.25rem', transition: 'color 0.2s' }} className="journal-title">
                  {featured.title}
                </h2>
                <p style={{ color: '#9A978F', fontSize: '0.9rem', lineHeight: 1.7, fontFamily: 'DM Sans, sans-serif', fontWeight: 300, marginBottom: '1.75rem' }}>
                  {featured.excerpt}
                </p>
                <span style={{ fontSize: '0.625rem', letterSpacing: '0.2em', color: '#B8973A', fontFamily: 'DM Sans, sans-serif', borderBottom: '1px solid rgba(184,151,58,0.4)', paddingBottom: 3, width: 'fit-content' }}>
                  READ ARTICLE →
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Secondary Articles Grid */}
        <div className="journal-grid">
          {restPosts.map(post => (
            <Link key={post.slug} href={`/journal/${post.slug}`} style={{ display: 'block', textDecoration: 'none' }} className="journal-card">
              <div style={{ aspectRatio: '16/10', background: '#121212', overflow: 'hidden', position: 'relative', marginBottom: '1.5rem' }}>
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="journal-img"
                />
              </div>
              <div style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: '#B8973A', marginBottom: '0.5rem', fontFamily: 'DM Sans, sans-serif' }}>
                {post.category}
              </div>
              <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.25rem', color: '#F0EBE0', fontWeight: 400, lineHeight: 1.3, marginBottom: '0.75rem', transition: 'color 0.2s' }} className="journal-title">
                {post.title}
              </h3>
              <p style={{ fontSize: '0.8125rem', color: '#7A7570', lineHeight: 1.6, fontFamily: 'DM Sans, sans-serif', fontWeight: 300, marginBottom: '1.25rem' }}>
                {post.excerpt}
              </p>
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.18em', color: '#B8973A', borderBottom: '1px solid rgba(184,151,58,0.3)', paddingBottom: 2, display: 'inline-flex', fontFamily: 'DM Sans, sans-serif' }}>
                READ ARTICLE →
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .featured-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 3rem;
          background: #0f0f0f;
          border: 1px solid #1c1c1c;
        }
        .journal-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem 2.5rem;
        }
        @media (max-width: 960px) {
          .featured-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
          .journal-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 2rem !important; }
        }
        @media (max-width: 640px) {
          .journal-grid { grid-template-columns: 1fr !important; }
        }
        .featured-card:hover .journal-title, .journal-card:hover .journal-title { color: #B8973A !important; }
        .featured-card:hover .journal-img, .journal-card:hover .journal-img { transform: scale(1.04) !important; }
      `}</style>
    </div>
  )
}
