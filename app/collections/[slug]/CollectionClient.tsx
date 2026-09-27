'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import ProductGrid from '@/components/product/ProductGrid'
import { Product } from '@/lib/products/types'

interface CollectionClientProps {
  products: Product[]
  displayName: string
  slug: string
}

function applySorting(products: Product[], sort: string): Product[] {
  if (sort === 'price_asc')  return [...products].sort((a, b) => a.price - b.price)
  if (sort === 'price_desc') return [...products].sort((a, b) => b.price - a.price)
  if (sort === 'newest')     return [...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  return products
}

export default function CollectionClient({ products, displayName, slug }: CollectionClientProps) {
  const [sort, setSort] = useState('featured')
  const sorted = useMemo(() => applySorting(products, sort), [products, sort])
  const cols = sorted.length <= 3 ? 3 : 4

  return (
    <div className="cd-root">
      <div className="container">
        {/* Breadcrumb */}
        <div className="cd-breadcrumb">
          <Link href="/collections" className="cd-bc-link">COLLECTIONS</Link>
          <span className="cd-bc-sep">/</span>
          <span className="cd-bc-cur">{displayName.toUpperCase()}</span>
        </div>

        {/* Header */}
        <div className="cd-header">
          <div className="cd-eyebrow">COLLECTION</div>
          <h1 className="cd-title">{displayName.toUpperCase()}</h1>
        </div>

        {products.length === 0 ? (
          /* Empty state */
          <div className="cd-empty">
            <p className="cd-empty-text">No fragrances available in this collection.</p>
            <Link href="/shop" className="cd-view-all">VIEW ALL FRAGRANCES →</Link>
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div className="cd-toolbar">
              <span className="cd-count">
                {sorted.length} {sorted.length === 1 ? 'FRAGRANCE' : 'FRAGRANCES'}
              </span>
              <div className="cd-sort-wrap">
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="cd-sort"
                  aria-label="Sort products"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price_asc">Price: Low → High</option>
                  <option value="price_desc">Price: High → Low</option>
                </select>
                <ChevronDown size={12} className="cd-sort-chevron" />
              </div>
            </div>

            {/* Grid */}
            <ProductGrid products={sorted} columns={cols} />

            {/* View All */}
            <div className="cd-footer">
              <Link href="/shop" className="cd-view-all">VIEW ALL FRAGRANCES →</Link>
            </div>
          </>
        )}
      </div>

      <style>{`
        .cd-root {
          background: #070707;
          min-height: 100vh;
          padding: 3.5rem 0 6rem;
        }
        .cd-breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          color: #7A7570;
          font-family: DM Sans, sans-serif;
          text-transform: uppercase;
          margin-bottom: 2rem;
        }
        .cd-bc-link {
          color: #7A7570;
          text-decoration: none;
          transition: color 0.15s;
        }
        .cd-bc-link:hover { color: #F0EBE0; }
        .cd-bc-sep { color: #B8973A; }
        .cd-bc-cur { color: #B8973A; }

        .cd-header { margin-bottom: 2.5rem; }
        .cd-eyebrow {
          font-size: 0.5rem;
          letter-spacing: 0.25em;
          color: #B8973A;
          margin-bottom: 0.6rem;
          font-family: DM Sans, sans-serif;
          text-transform: uppercase;
        }
        .cd-title {
          font-family: Playfair Display, Georgia, serif;
          font-size: clamp(2rem, 4vw, 3.25rem);
          color: #F0EBE0;
          font-weight: 400;
          line-height: 1.1;
        }

        /* Toolbar */
        .cd-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid #1c1c1c;
        }
        .cd-count {
          font-size: 0.7rem;
          color: #7A7570;
          font-family: DM Sans, sans-serif;
          letter-spacing: 0.08em;
        }
        .cd-sort-wrap {
          position: relative;
        }
        .cd-sort-chevron {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          color: #7A7570;
          pointer-events: none;
        }
        .cd-sort {
          background: transparent;
          border: 1px solid #1c1c1c;
          color: #F0EBE0;
          padding: 0.4rem 2rem 0.4rem 0.75rem;
          font-size: 0.7rem;
          font-family: DM Sans, sans-serif;
          outline: none;
          -webkit-appearance: none;
          cursor: pointer;
          border-radius: 0;
          transition: border-color 0.15s;
        }
        .cd-sort:focus { border-color: #B8973A; }
        .cd-sort option { background: #111; }

        /* Footer */
        .cd-footer {
          margin-top: 3.5rem;
          text-align: center;
        }
        .cd-view-all {
          font-size: 0.625rem;
          letter-spacing: 0.22em;
          color: #B8973A;
          border-bottom: 1px solid rgba(184,151,58,0.4);
          padding-bottom: 3px;
          font-family: DM Sans, sans-serif;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.2s, border-color 0.2s;
        }
        .cd-view-all:hover {
          color: #F0EBE0;
          border-color: rgba(240,235,224,0.4);
        }

        /* Empty */
        .cd-empty {
          padding: 5rem 0;
          text-align: center;
        }
        .cd-empty-text {
          color: #7A7570;
          font-size: 0.875rem;
          font-family: DM Sans, sans-serif;
          margin-bottom: 1.5rem;
        }

        @media (max-width: 768px) {
          .cd-root { padding: 2.5rem 0 5rem; }
          .cd-toolbar { flex-wrap: wrap; gap: 0.75rem; }
        }
      `}</style>
    </div>
  )
}
