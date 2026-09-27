'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { SlidersHorizontal, X, Search, ChevronDown } from 'lucide-react'
import ProductGrid from '@/components/product/ProductGrid'
import { Product } from '@/lib/products/types'
import { searchProducts } from '@/lib/search/searchProducts'

/* ─── derive available filter values from real product data ─── */
function getAvailableFilters(products: Product[]) {
  const genders = [...new Set(products.map(p => p.gender).filter(Boolean))] as string[]
  const families = [...new Set(products.map(p => p.fragranceFamily).filter(Boolean))] as string[]
  const concentrations = [...new Set(products.map(p => p.concentration).filter(Boolean))] as string[]
  return { genders, families, concentrations }
}

/* ─── sort helper ─── */
function applySorting(products: Product[], sort: string): Product[] {
  if (sort === 'price_asc')  return [...products].sort((a, b) => a.price - b.price)
  if (sort === 'price_desc') return [...products].sort((a, b) => b.price - a.price)
  if (sort === 'newest')     return [...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  return products // featured = default order
}

/* ─── capitalise helper ─── */
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

interface ShopClientProps {
  products: Product[]
  initialFilters?: {
    gender?: string
    family?: string
    concentration?: string
  }
}

export default function ShopClient({ products, initialFilters }: ShopClientProps) {
  const available = useMemo(() => getAvailableFilters(products), [products])

  const [search, setSearch]       = useState('')
  const [gender, setGender]       = useState(initialFilters?.gender       || '')
  const [family, setFamily]       = useState(initialFilters?.family       || '')
  const [conc, setConc]           = useState(initialFilters?.concentration || '')
  const [sort, setSort]           = useState('featured')
  const [filterOpen, setFilterOpen] = useState(false)

  const hasActiveFilters = !!(gender || family || conc || search)

  const filtered = useMemo(() => {
    const base = searchProducts(products, {
      query:         search.trim() || undefined,
      gender:        gender        || undefined,
      family:        family        || undefined,
      concentration: conc          || undefined,
    })
    return applySorting(base, sort)
  }, [products, search, gender, family, conc, sort])

  const clearAll = () => { setSearch(''); setGender(''); setFamily(''); setConc('') }

  /* column count: 3 when ≤4 products, 4 otherwise */
  const cols = filtered.length <= 4 ? 3 : 4

  /* ── reusable filter panel content ── */
  const FilterPanel = () => (
    <div className="shop-filter-panel">
      {/* Gender */}
      {available.genders.length > 0 && (
        <div className="shop-filter-group">
          <div className="shop-filter-label">GENDER</div>
          {available.genders.map(g => (
            <button
              key={g}
              onClick={() => setGender(prev => prev === g ? '' : g)}
              className={`shop-filter-btn ${gender === g ? 'active' : ''}`}
            >
              <span className="shop-filter-check">{gender === g ? '✓' : ''}</span>
              {cap(g)}
            </button>
          ))}
        </div>
      )}

      {/* Fragrance Family */}
      {available.families.length > 0 && (
        <div className="shop-filter-group">
          <div className="shop-filter-label">FRAGRANCE FAMILY</div>
          {available.families.map(f => (
            <button
              key={f}
              onClick={() => setFamily(prev => prev === f ? '' : f)}
              className={`shop-filter-btn ${family === f ? 'active' : ''}`}
            >
              <span className="shop-filter-check">{family === f ? '✓' : ''}</span>
              {f}
            </button>
          ))}
        </div>
      )}

      {/* Concentration */}
      {available.concentrations.length > 0 && (
        <div className="shop-filter-group">
          <div className="shop-filter-label">CONCENTRATION</div>
          {available.concentrations.map(c => (
            <button
              key={c}
              onClick={() => setConc(prev => prev === c ? '' : c)}
              className={`shop-filter-btn ${conc === c ? 'active' : ''}`}
            >
              <span className="shop-filter-check">{conc === c ? '✓' : ''}</span>
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="shop-root">

      {/* ── Page Header ─────────────────────────────────────────── */}
      <div className="shop-page-header">
        <div className="container">
          <div className="shop-breadcrumb">
            <Link href="/" className="shop-bc-link">HOME</Link>
            <span className="shop-bc-sep">/</span>
            <span className="shop-bc-cur">SHOP</span>
          </div>
          <h1 className="shop-heading">THE COLLECTION</h1>
          <p className="shop-subheading">Explore the Capriole fragrance collection.</p>
        </div>
      </div>

      {/* ── Toolbar: Tabs + Search ───────────────────────────────── */}
      <div className="shop-toolbar-wrap">
        <div className="container shop-toolbar">
          {/* Quick-filter tabs */}
          <div className="shop-tabs" role="tablist">
            {[
              { id: 'all',    label: 'ALL' },
              ...(available.genders.includes('women')  ? [{ id: 'women',  label: 'WOMEN'  }] : []),
              ...(available.genders.includes('men')    ? [{ id: 'men',    label: 'MEN'    }] : []),
              ...(available.genders.includes('unisex') ? [{ id: 'unisex', label: 'UNISEX' }] : []),
              { id: 'edp',    label: 'EDP' },
              { id: 'samples',label: 'SAMPLES' },
            ].map(tab => {
              const isActive =
                tab.id === 'all'     ? !gender && !family && !conc && !search :
                tab.id === 'women'   ? gender === 'women'  :
                tab.id === 'men'     ? gender === 'men'    :
                tab.id === 'unisex'  ? gender === 'unisex' :
                tab.id === 'edp'     ? conc === 'Eau de Parfum' :
                tab.id === 'samples' ? false : false
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    clearAll()
                    if (tab.id === 'women')  setGender('women')
                    if (tab.id === 'men')    setGender('men')
                    if (tab.id === 'unisex') setGender('unisex')
                    if (tab.id === 'edp')    setConc('Eau de Parfum')
                  }}
                  className={`shop-tab${isActive ? ' active' : ''}`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Search */}
          <div className="shop-search-wrap">
            <Search size={13} className="shop-search-icon" />
            <input
              type="text"
              placeholder="Search fragrances..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="shop-search-input"
              aria-label="Search fragrances"
            />
            {search && (
              <button onClick={() => setSearch('')} className="shop-search-clear" aria-label="Clear search">
                <X size={12} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Area ───────────────────────────────────────────── */}
      <div className="container shop-body">

        {/* Mobile filter/sort bar (hidden on desktop) */}
        <div className="shop-mobile-bar">
          <button
            onClick={() => setFilterOpen(true)}
            className="shop-mobile-btn"
            aria-label="Open filters"
          >
            <SlidersHorizontal size={14} />
            FILTER
            {hasActiveFilters && <span className="shop-filter-dot" />}
          </button>

          <div className="shop-sort-wrap">
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="shop-sort-select"
              aria-label="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
            </select>
            <ChevronDown size={12} className="shop-sort-chevron" />
          </div>
        </div>

        {/* Desktop layout: sidebar + grid */}
        <div className="shop-layout">

          {/* Desktop sidebar (hidden on mobile) */}
          <aside className="shop-sidebar" aria-label="Filters">
            <div className="shop-sidebar-header">
              <span className="shop-filter-label" style={{ marginBottom: 0 }}>FILTERS</span>
              {hasActiveFilters && (
                <button onClick={clearAll} className="shop-clear-btn">CLEAR</button>
              )}
            </div>

            {/* Sort — desktop only */}
            <div className="shop-filter-group">
              <div className="shop-filter-label">SORT BY</div>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="shop-sort-select sidebar-sort"
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price_asc">Price ↑</option>
                <option value="price_desc">Price ↓</option>
              </select>
            </div>

            <FilterPanel />
          </aside>

          {/* Product grid */}
          <div className="shop-grid-area">
            {/* Count + clear */}
            <div className="shop-count-row">
              <span className="shop-count">
                {filtered.length} {filtered.length === 1 ? 'FRAGRANCE' : 'FRAGRANCES'}
              </span>
              {hasActiveFilters && (
                <button onClick={clearAll} className="shop-clear-btn desktop-only">CLEAR ALL</button>
              )}
            </div>

            {filtered.length > 0 ? (
              <ProductGrid products={filtered} columns={cols} />
            ) : (
              <div className="shop-empty">
                <h3 className="shop-empty-heading">No fragrances found.</h3>
                <p className="shop-empty-text">Try adjusting your filters or search.</p>
                <button onClick={clearAll} className="shop-empty-btn">CLEAR FILTERS</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile Filter Drawer ─────────────────────────────────── */}
      {filterOpen && (
        <>
          <div
            className="shop-drawer-overlay"
            onClick={() => setFilterOpen(false)}
            aria-hidden="true"
          />
          <div className="shop-drawer" role="dialog" aria-modal="true" aria-label="Filter fragrances">
            <div className="shop-drawer-header">
              <span className="shop-filter-label" style={{ marginBottom: 0 }}>FILTER FRAGRANCES</span>
              <button
                onClick={() => setFilterOpen(false)}
                className="shop-drawer-close"
                aria-label="Close filters"
              >
                <X size={18} />
              </button>
            </div>

            <div className="shop-drawer-body">
              {/* Sort in drawer */}
              <div className="shop-filter-group">
                <div className="shop-filter-label">SORT BY</div>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="shop-sort-select"
                  aria-label="Sort products"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price_asc">Price: Low → High</option>
                  <option value="price_desc">Price: High → Low</option>
                </select>
              </div>

              <FilterPanel />
            </div>

            <div className="shop-drawer-footer">
              <button onClick={() => setFilterOpen(false)} className="shop-apply-btn">
                SHOW {filtered.length} {filtered.length === 1 ? 'FRAGRANCE' : 'FRAGRANCES'}
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── Styles ──────────────────────────────────────────────── */}
      <style>{`
        /* Root */
        .shop-root {
          min-height: 100vh;
          background: #070707;
          color: #F0EBE0;
        }

        /* Page header */
        .shop-page-header {
          border-bottom: 1px solid #1c1c1c;
          padding: 3.5rem 0 2.5rem;
        }
        .shop-breadcrumb {
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          color: #7A7570;
          margin-bottom: 1.25rem;
          font-family: DM Sans, sans-serif;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .shop-bc-link { color: #7A7570; text-decoration: none; transition: color 0.15s; }
        .shop-bc-link:hover { color: #F0EBE0; }
        .shop-bc-sep  { color: #B8973A; }
        .shop-bc-cur  { color: #B8973A; }
        .shop-heading {
          font-family: Playfair Display, Georgia, serif;
          font-size: clamp(2rem, 4.5vw, 3.25rem);
          color: #F0EBE0;
          font-weight: 400;
          margin-bottom: 0.4rem;
          line-height: 1.1;
        }
        .shop-subheading {
          color: #7A7570;
          font-size: 0.875rem;
          font-family: DM Sans, sans-serif;
          margin: 0;
        }

        /* Toolbar */
        .shop-toolbar-wrap {
          border-bottom: 1px solid #1c1c1c;
          background: #0a0a0a;
        }
        .shop-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding-top: 0.875rem;
          padding-bottom: 0.875rem;
          flex-wrap: wrap;
        }
        .shop-tabs {
          display: flex;
          gap: 0.375rem;
          overflow-x: auto;
          scrollbar-width: none;
          flex-shrink: 0;
        }
        .shop-tabs::-webkit-scrollbar { display: none; }
        .shop-tab {
          background: transparent;
          color: #7A7570;
          border: 1px solid #1c1c1c;
          padding: 0.375rem 0.875rem;
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          font-family: DM Sans, sans-serif;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.18s ease;
          white-space: nowrap;
          text-transform: uppercase;
        }
        .shop-tab:hover { border-color: #B8973A; color: #B8973A; }
        .shop-tab.active { background: #B8973A; color: #070707; border-color: #B8973A; }

        /* Search */
        .shop-search-wrap {
          position: relative;
          width: 100%;
          max-width: 240px;
          flex-shrink: 0;
        }
        .shop-search-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #7A7570;
          pointer-events: none;
        }
        .shop-search-input {
          width: 100%;
          background: #111;
          border: 1px solid #1c1c1c;
          border-radius: 0;
          padding: 0.4rem 2rem 0.4rem 2rem;
          font-size: 0.75rem;
          color: #F0EBE0;
          font-family: DM Sans, sans-serif;
          outline: none;
          transition: border-color 0.15s;
        }
        .shop-search-input:focus { border-color: #B8973A; }
        .shop-search-input::placeholder { color: #3a3a3a; }
        .shop-search-clear {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #7A7570;
          cursor: pointer;
          display: flex;
          padding: 2px;
        }

        /* Body layout */
        .shop-body {
          padding-top: 2.5rem;
          padding-bottom: 6rem;
        }

        /* Mobile bar (hidden ≥ 1024px) */
        .shop-mobile-bar {
          display: none;
          margin-bottom: 2rem;
          gap: 0.75rem;
          align-items: center;
        }
        .shop-mobile-btn {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          background: #111;
          border: 1px solid #1c1c1c;
          color: #B8973A;
          padding: 0.625rem 1.125rem;
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          font-family: DM Sans, sans-serif;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          position: relative;
          transition: border-color 0.15s;
          text-transform: uppercase;
        }
        .shop-mobile-btn:hover { border-color: #B8973A; }
        .shop-filter-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #B8973A;
          margin-left: 2px;
        }
        .shop-sort-wrap {
          position: relative;
          flex: 1;
        }
        .shop-sort-chevron {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #7A7570;
          pointer-events: none;
        }
        .shop-sort-select {
          width: 100%;
          background: #111;
          border: 1px solid #1c1c1c;
          color: #F0EBE0;
          padding: 0.6rem 2rem 0.6rem 0.75rem;
          font-size: 0.75rem;
          font-family: DM Sans, sans-serif;
          outline: none;
          -webkit-appearance: none;
          cursor: pointer;
          transition: border-color 0.15s;
          border-radius: 0;
        }
        .shop-sort-select:focus { border-color: #B8973A; }
        .shop-sort-select option { background: #111; }

        /* Desktop layout grid */
        .shop-layout {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 3rem;
          align-items: start;
        }

        /* Sidebar */
        .shop-sidebar {
          position: sticky;
          top: 80px;
        }
        .shop-sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.75rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #1c1c1c;
        }
        .shop-filter-panel {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .shop-filter-group {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .shop-filter-label {
          font-size: 0.55rem;
          letter-spacing: 0.22em;
          color: #B8973A;
          margin-bottom: 0.875rem;
          font-family: DM Sans, sans-serif;
          font-weight: 500;
          text-transform: uppercase;
          display: block;
        }
        .shop-filter-btn {
          display: flex;
          width: 100%;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.35rem 0;
          font-size: 0.8125rem;
          color: #7A7570;
          transition: color 0.15s;
          font-family: DM Sans, sans-serif;
          text-align: left;
        }
        .shop-filter-btn:hover { color: #F0EBE0; }
        .shop-filter-btn.active { color: #B8973A; }
        .shop-filter-check {
          width: 14px;
          height: 14px;
          border: 1px solid #252525;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 0.55rem;
          color: #B8973A;
          transition: border-color 0.15s;
        }
        .shop-filter-btn.active .shop-filter-check { border-color: #B8973A; }
        .shop-clear-btn {
          background: none;
          border: none;
          color: #B8973A;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          font-family: DM Sans, sans-serif;
          cursor: pointer;
          text-transform: uppercase;
          text-decoration: underline;
          padding: 0;
          transition: color 0.15s;
        }
        .shop-clear-btn:hover { color: #F0EBE0; }
        .sidebar-sort {
          background: transparent;
          border: 1px solid #1c1c1c;
          padding: 0.4rem 0.6rem;
          font-size: 0.7rem;
          width: 100%;
        }

        /* Product area */
        .shop-grid-area {}
        .shop-count-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .shop-count {
          font-size: 0.7rem;
          color: #7A7570;
          font-family: DM Sans, sans-serif;
          letter-spacing: 0.08em;
        }
        .desktop-only { display: block; }

        /* Empty state */
        .shop-empty {
          padding: 5rem 2rem;
          text-align: center;
          border: 1px solid #1c1c1c;
          background: #0a0a0a;
        }
        .shop-empty-heading {
          font-family: Playfair Display, Georgia, serif;
          font-size: 1.5rem;
          color: #F0EBE0;
          font-weight: 400;
          margin-bottom: 0.5rem;
        }
        .shop-empty-text {
          color: #7A7570;
          font-size: 0.875rem;
          font-family: DM Sans, sans-serif;
          margin-bottom: 1.5rem;
        }
        .shop-empty-btn {
          background: #B8973A;
          color: #070707;
          border: none;
          padding: 0.75rem 2rem;
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          font-family: DM Sans, sans-serif;
          font-weight: 500;
          cursor: pointer;
          text-transform: uppercase;
          transition: background 0.2s;
        }
        .shop-empty-btn:hover { background: #C9AA5A; }

        /* Drawer */
        .shop-drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.72);
          z-index: 80;
          backdrop-filter: blur(4px);
        }
        .shop-drawer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #0f0f0f;
          border-top: 1px solid #1c1c1c;
          z-index: 81;
          max-height: 88vh;
          display: flex;
          flex-direction: column;
          border-radius: 0;
        }
        .shop-drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.375rem 1.5rem;
          border-bottom: 1px solid #1c1c1c;
          flex-shrink: 0;
        }
        .shop-drawer-close {
          background: none;
          border: none;
          cursor: pointer;
          color: #7A7570;
          display: flex;
          padding: 4px;
          transition: color 0.15s;
        }
        .shop-drawer-close:hover { color: #F0EBE0; }
        .shop-drawer-body {
          padding: 1.5rem;
          overflow-y: auto;
          flex: 1;
        }
        .shop-drawer-footer {
          padding: 1.25rem 1.5rem;
          border-top: 1px solid #1c1c1c;
          flex-shrink: 0;
        }
        .shop-apply-btn {
          width: 100%;
          background: #B8973A;
          border: none;
          color: #070707;
          padding: 0.9rem;
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          font-family: DM Sans, sans-serif;
          font-weight: 500;
          cursor: pointer;
          text-transform: uppercase;
          transition: background 0.2s;
        }
        .shop-apply-btn:hover { background: #C9AA5A; }

        /* Responsive breakpoints */
        @media (max-width: 1024px) {
          .shop-layout { grid-template-columns: 1fr; }
          .shop-sidebar { display: none; }
          .shop-mobile-bar { display: flex; }
          .desktop-only { display: none !important; }
        }

        @media (max-width: 768px) {
          .shop-page-header { padding: 2.5rem 0 2rem; }
          .shop-toolbar { flex-direction: column; align-items: stretch; }
          .shop-search-wrap { max-width: 100%; }
          .shop-tabs { padding-bottom: 0; }
          .shop-body { padding-top: 1.75rem; padding-bottom: 4rem; }
          .shop-sort-select { font-size: 0.8125rem; }
        }

        @media (max-width: 480px) {
          .shop-mobile-btn { padding: 0.55rem 0.875rem; }
        }
      `}</style>
    </div>
  )
}
