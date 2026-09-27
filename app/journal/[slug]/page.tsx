import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import prisma from '@/lib/prisma/db'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.journalPost.findUnique({ where: { slug } })
  if (!post) return { title: 'Not Found' }
  return {
    title: `${post.title} | Journal | Capriole Perfumes`,
    description: post.excerpt || undefined,
  }
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params
  let post: { title: string; coverImage: string | null; publishedAt: Date | null; content: string | null; excerpt: string | null } | null = null
  try {
    post = await prisma.journalPost.findUnique({ where: { slug, published: true } })
  } catch {}
  if (!post) notFound()

  return (
    <div style={{ background: '#070707', minHeight: '100vh', padding: '4rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: 720 }}>
        <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.65rem', color: '#7A7570', letterSpacing: '0.1em', fontFamily: 'DM Sans, sans-serif' }}>
          <Link href="/journal" style={{ color: '#7A7570', transition: 'color 0.15s' }} className="breadcrumb-link">JOURNAL</Link>
          <span>/</span>
          <span style={{ color: '#B8B0A3' }}>ARTICLE</span>
        </div>
        {post.coverImage && (
          <div style={{ position: 'relative', aspectRatio: '16/9', marginBottom: '3rem', overflow: 'hidden' }}>
            <Image src={post.coverImage} alt={post.title} fill style={{ objectFit: 'cover' }} sizes="100vw" priority />
          </div>
        )}
        {post.publishedAt && (
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: '#7A7570', marginBottom: '1rem', fontFamily: 'DM Sans, sans-serif' }}>
            {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}
          </div>
        )}
        <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: '#F0EBE0', fontWeight: 400, lineHeight: 1.1, marginBottom: '2rem' }}>{post.title}</h1>
        <div style={{ width: 40, height: 1, background: '#B8973A', opacity: 0.5, marginBottom: '2.5rem' }} />
        <div style={{ fontSize: '0.9375rem', color: '#B8B0A3', lineHeight: 1.8, whiteSpace: 'pre-line', fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}>{post.content}</div>
        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #1e1e1e' }}>
          <Link href="/journal" style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: '#B8973A', borderBottom: '1px solid rgba(184,151,58,0.3)', paddingBottom: 2, fontFamily: 'DM Sans, sans-serif' }}>← BACK TO JOURNAL</Link>
        </div>
      </div>
      <style>{`.breadcrumb-link:hover{color:#F0EBE0!important;}`}</style>
    </div>
  )
}
