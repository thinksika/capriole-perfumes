'use client'
import { useState, useEffect, useRef } from 'react'
import { X, Search } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Product, getProductImage } from '@/lib/products/types'
import { formatPrice } from '@/lib/pricing/calculateDiscount'

export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data.products ?? [])
      } catch {}
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  return (
    <div className="search-overlay" style={{ position: 'fixed', inset: 0, background: '#070707', zIndex: 80, display: 'flex', flexDirection: 'column', padding: '1.5rem 1rem' }}>
      <div className="container" style={{ maxWidth: 800, height: '100%', display: 'flex', flexDirection: 'column', padding: 0 }}>
        {/* Close */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '1rem' }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#7A7570', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.625rem', letterSpacing: '0.15em', fontFamily: 'DM Sans, sans-serif' }}>
            CLOSE <X size={18} />
          </button>
        </div>

        {/* Input */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
          <Search size={20} color="#B8973A" style={{ position: 'absolute', left: 4 }} />
          <input
            ref={inputRef}
            className="search-input"
            style={{ paddingLeft: '2.25rem', fontSize: 'clamp(1.2rem, 3.5vw, 2.2rem)' }}
            type="text"
            placeholder="Search fragrances, notes, families..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        {/* Results */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {loading && (
            <div style={{ padding: '2rem 0', color: '#7A7570', fontSize: '0.8125rem', fontFamily: 'DM Sans, sans-serif' }}>Searching catalogue...</div>
          )}
          {!loading && query && results.length === 0 && (
            <div style={{ padding: '3rem 0', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.5rem', color: '#F0EBE0', fontWeight: 400, marginBottom: '1rem' }}>WE COULDN'T FIND THAT SCENT.</div>
              <p style={{ color: '#7A7570', fontSize: '0.875rem', marginBottom: '1.5rem', fontFamily: 'DM Sans, sans-serif' }}>Check spelling or explore our scent families.</p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/collections" onClick={onClose} style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: '#B8973A', borderBottom: '1px solid #B8973A', paddingBottom: 2, fontFamily: 'DM Sans, sans-serif', textDecoration: 'none' }}>VIEW COLLECTIONS</Link>
                <Link href="/discover" onClick={onClose} style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: '#7A7570', borderBottom: '1px solid #7A7570', paddingBottom: 2, fontFamily: 'DM Sans, sans-serif', textDecoration: 'none' }}>DISCOVER YOUR SCENT</Link>
              </div>
            </div>
          )}
          {!loading && results.map(product => {
            const imageSrc = product.thumbnail || getProductImage({ slug: product.slug })
            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                onClick={onClose}
                style={{ display: 'flex', gap: '1.25rem', padding: '1rem 0', borderBottom: '1px solid #1c1c1c', alignItems: 'center', textDecoration: 'none' }}
                className="search-result-link"
              >
                <div style={{ width: 48, height: 60, background: '#121212', flexShrink: 0, position: 'relative', border: '1px solid #1c1c1c', overflow: 'hidden' }}>
                  <Image src={imageSrc} alt={product.name} fill style={{ objectFit: 'cover' }} sizes="48px" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.5rem', letterSpacing: '0.15em', color: '#7A7570', marginBottom: 2, fontFamily: 'DM Sans, sans-serif' }}>CAPRIOLE</div>
                  <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.05rem', color: '#F0EBE0', fontWeight: 400, lineHeight: 1.2 }}>{product.name}</div>
                  {product.fragranceFamily && <div style={{ fontSize: '0.6875rem', color: '#7A7570', marginTop: 4, fontFamily: 'DM Sans, sans-serif' }}>{product.fragranceFamily}</div>}
                </div>
                <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '0.95rem', color: '#F0EBE0', flexShrink: 0 }}>
                  {formatPrice(product.price, product.currency || 'GHS')}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
      <style>{`.search-result-link:hover { opacity: 0.7 !important; }`}</style>
    </div>
  )
}
