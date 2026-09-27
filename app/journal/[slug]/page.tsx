import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import prisma from '@/lib/prisma/db'
import { JOURNAL_ARTICLES } from '@/lib/journal/articles'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const fallback = JOURNAL_ARTICLES.find(a => a.slug === slug)
  try {
    const post = await prisma.journalPost.findUnique({ where: { slug } })
    if (post) {
      return {
        title: `${post.title} — Journal | Capriole Perfumes`,
        description: post.excerpt || undefined,
      }
    }
  } catch {}
  if (fallback) {
    return {
      title: `${fallback.title} — Journal | Capriole Perfumes`,
      description: fallback.excerpt,
    }
  }
  return { title: 'Article — Capriole Journal' }
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params
  let title = ''
  let content = ''
  let coverImage = '/images/editorial/hero.png'
  let publishedAt = '2026-03-01'
  let category = 'HAUTE PARFUMERIE'
  let found = false

  try {
    const post = await prisma.journalPost.findUnique({ where: { slug, published: true } })
    if (post) {
      title = post.title.toUpperCase()
      content = post.content || ''
      if (post.coverImage) coverImage = post.coverImage
      if (post.publishedAt) publishedAt = post.publishedAt.toISOString().split('T')[0]
      found = true
    }
  } catch {}

  if (!found) {
    const fallback = JOURNAL_ARTICLES.find(a => a.slug === slug)
    if (fallback) {
      title = fallback.title
      content = fallback.content
      coverImage = fallback.coverImage
      publishedAt = fallback.publishedAt
      category = fallback.category
      found = true
    }
  }

  if (!found) notFound()

  return (
    <div style={{ background: '#070707', minHeight: '100vh', padding: '4rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: 760 }}>
        {/* Breadcrumbs */}
        <div style={{ marginBottom: '2.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.625rem', color: '#7A7570', letterSpacing: '0.12em', fontFamily: 'DM Sans, sans-serif' }}>
          <Link href="/journal" style={{ color: '#7A7570', textDecoration: 'none' }} className="breadcrumb-link">JOURNAL</Link>
          <span>/</span>
          <span style={{ color: '#B8973A' }}>{category}</span>
        </div>

        {/* Hero Cover */}
        <div style={{ position: 'relative', aspectRatio: '16/9', marginBottom: '3rem', overflow: 'hidden', border: '1px solid #1c1c1c' }}>
          <Image src={coverImage} alt={title} fill style={{ objectFit: 'cover' }} sizes="100vw" priority />
        </div>

        {/* Date & Title */}
        <div style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#B8973A', marginBottom: '1rem', fontFamily: 'DM Sans, sans-serif' }}>
          {publishedAt.toUpperCase()} · BY CAPRIOLE PARFUMS
        </div>
        <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: '#F0EBE0', fontWeight: 400, lineHeight: 1.2, marginBottom: '2rem' }}>
          {title}
        </h1>
        <div style={{ width: 40, height: 1, background: '#B8973A', opacity: 0.5, marginBottom: '2.5rem' }} />

        {/* Article Body */}
        <div style={{ fontSize: '0.95rem', color: '#C2BBAF', lineHeight: 1.85, whiteSpace: 'pre-line', fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}>
          {content}
        </div>

        {/* Back Link */}
        <div style={{ marginTop: '4rem', paddingTop: '2.5rem', borderTop: '1px solid #1c1c1c', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/journal" style={{ fontSize: '0.625rem', letterSpacing: '0.18em', color: '#B8973A', textDecoration: 'none', borderBottom: '1px solid rgba(184,151,58,0.3)', paddingBottom: 2, fontFamily: 'DM Sans, sans-serif' }}>
            ← BACK TO JOURNAL
          </Link>
          <Link href="/shop" style={{ fontSize: '0.625rem', letterSpacing: '0.18em', color: '#B8B0A3', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif' }}>
            DISCOVER THE CATALOGUE →
          </Link>
        </div>
      </div>
      <style>{`.breadcrumb-link:hover{color:#F0EBE0!important;}`}</style>
    </div>
  )
}
