'use client'
import { useState, useEffect, useRef } from 'react'
import { X, Search } from 'lucide-react'
import Link from 'next/link'
import { Product } from '@/lib/products/types'
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
    <div className="search-overlay" style={{ zIndex: 80 }}>
      <div className="container" style={{ maxWidth: 800, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Close */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '1rem' }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#9A978F', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.6rem', letterSpacing: '0.15em', fontFamily: 'Inter, sans-serif' }}>
            CLOSE <X size={16} />
          </button>
        </div>

        {/* Input */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={20} color="#9A978F" style={{ position: 'absolute', left: 0 }} />
          <input
            ref={inputRef}
            className="search-input"
            style={{ paddingLeft: '2rem' }}
            type="text"
            placeholder="Search fragrances, notes, families..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        {/* Results */}
        <div style={{ marginTop: '2rem', overflowY: 'auto', flex: 1 }}>
          {loading && (
            <div style={{ padding: '2rem 0', color: '#9A978F', fontSize: '0.8125rem' }}>Searching...</div>
          )}
          {!loading && query && results.length === 0 && (
            <div style={{ padding: '3rem 0', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#F4F0E8', fontWeight: 400, marginBottom: '1rem' }}>WE COULDN'T FIND THAT SCENT.</div>
              <p style={{ color: '#9A978F', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Check spelling. Try a fragrance family. Explore the collections.</p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/collections" onClick={onClose} style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: '#C5A15A', borderBottom: '1px solid #C5A15A', paddingBottom: 2 }}>VIEW COLLECTIONS</Link>
                <Link href="/discover" onClick={onClose} style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: '#9A978F', borderBottom: '1px solid #9A978F', paddingBottom: 2 }}>DISCOVER YOUR SCENT</Link>
              </div>
            </div>
          )}
          {!loading && results.map(product => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              onClick={onClose}
              style={{ display: 'flex', gap: '1.25rem', padding: '1rem 0', borderBottom: '1px solid #1e1e1e', alignItems: 'center', transition: 'opacity 0.2s' }}
              className="search-result-link"
            >
              <div style={{ width: 56, height: 72, background: '#151515', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.5rem', letterSpacing: '0.15em', color: '#9A978F', marginBottom: 2 }}>CAPRIOLE</div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', color: '#F4F0E8', fontWeight: 400, lineHeight: 1.2 }}>{product.name}</div>
                {product.fragranceFamily && <div style={{ fontSize: '0.6875rem', color: '#9A978F', marginTop: 4 }}>{product.fragranceFamily}</div>}
              </div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.9rem', color: '#F4F0E8', flexShrink: 0 }}>
                {formatPrice(product.price, product.currency)}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <style>{`.search-result-link:hover { opacity: 0.7 !important; }`}</style>
    </div>
  )
}
