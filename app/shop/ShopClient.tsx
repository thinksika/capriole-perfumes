'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { SlidersHorizontal, X, Search } from 'lucide-react'
import ProductGrid from '@/components/product/ProductGrid'
import { Product } from '@/lib/products/types'
import { searchProducts } from '@/lib/search/searchProducts'

const CATEGORY_TABS = [
  { id: 'all', label: 'ALL' },
  { id: 'women', label: 'WOMEN', filter: { gender: 'women' } },
  { id: 'men', label: 'MEN', filter: { gender: 'men' } },
  { id: 'unisex', label: 'UNISEX', filter: { gender: 'unisex' } },
  { id: 'edp', label: 'EDP', filter: { concentration: 'Eau de Parfum' } },
  { id: 'extrait', label: 'EXTRAIT', filter: { concentration: 'Extrait' } },
  { id: 'samples', label: 'SAMPLES', filter: { isSample: true } },
]

const FAMILIES = ['Floral', 'Woody', 'Oud', 'Musk', 'Amber', 'Fresh', 'Sweet']
const GENDERS = ['Women', 'Men', 'Unisex']
const CONCENTRATIONS = ['Eau de Parfum', 'Extrait de Parfum']

interface ShopClientProps {
  products: Product[]
  initialFilters?: {
    gender?: string
    family?: string
    concentration?: string
    featured?: boolean
    newArrival?: boolean
    bestSeller?: boolean
  }
}

export default function ShopClient({ products, initialFilters }: ShopClientProps) {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    gender: initialFilters?.gender || '',
    family: initialFilters?.family || '',
    concentration: initialFilters?.concentration || '',
    featured: initialFilters?.featured || false,
    newArrival: initialFilters?.newArrival || false,
    bestSeller: initialFilters?.bestSeller || false,
  })
  const [sort, setSort] = useState('featured')
  const [filterOpen, setFilterOpen] = useState(false)

  // Combined tab + drawer filter logic
  const filtered = useMemo(() => {
    let base = searchProducts(products, {
      query: searchQuery.trim() || undefined,
      gender: filters.gender || (activeTab === 'women' ? 'women' : activeTab === 'men' ? 'men' : activeTab === 'unisex' ? 'unisex' : undefined),
      family: filters.family || undefined,
      concentration: filters.concentration || (activeTab === 'edp' ? 'Eau de Parfum' : activeTab === 'extrait' ? 'Extrait' : undefined),
      featured: filters.featured || undefined,
      newArrival: filters.newArrival || undefined,
      bestSeller: filters.bestSeller || undefined,
    })

    if (activeTab === 'samples') {
      base = base.filter(p => p.sampleAvailable || p.slug.includes('sample'))
    }

    if (sort === 'price_asc') base = [...base].sort((a, b) => a.price - b.price)
    else if (sort === 'price_desc') base = [...base].sort((a, b) => b.price - a.price)
    else if (sort === 'newest') base = [...base].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    return base
  }, [products, searchQuery, activeTab, filters, sort])

  const clearAllFilters = () => {
    setActiveTab('all')
    setSearchQuery('')
    setFilters({
      gender: '',
      family: '',
      concentration: '',
      featured: false,
      newArrival: false,
      bestSeller: false,
    })
  }

  const FilterContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Gender */}
      <div>
        <div style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#B8973A', marginBottom: '1rem', fontFamily: 'DM Sans, sans-serif' }}>GENDER</div>
        {GENDERS.map(g => (
          <button
            key={g}
            onClick={() => setFilters(f => ({ ...f, gender: f.gender === g.toLowerCase() ? '' : g.toLowerCase() }))}
            style={{
              display: 'flex', width: '100%', alignItems: 'center', gap: '0.5rem',
              background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem 0',
              fontSize: '0.8rem', color: filters.gender === g.toLowerCase() ? '#B8973A' : '#7A7570',
              transition: 'color 0.15s', fontFamily: 'DM Sans, sans-serif'
            }}
          >
            <span style={{ width: 14, height: 14, border: `1px solid ${filters.gender === g.toLowerCase() ? '#B8973A' : '#252525'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.6rem', color: '#B8973A' }}>
              {filters.gender === g.toLowerCase() ? '✓' : ''}
            </span>
            {g}
          </button>
        ))}
      </div>
      {/* Family */}
      <div>
        <div style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#B8973A', marginBottom: '1rem', fontFamily: 'DM Sans, sans-serif' }}>FRAGRANCE FAMILY</div>
        {FAMILIES.map(f => (
          <button
            key={f}
            onClick={() => setFilters(prev => ({ ...prev, family: prev.family === f ? '' : f }))}
            style={{
              display: 'flex', width: '100%', alignItems: 'center', gap: '0.5rem',
              background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem 0',
              fontSize: '0.8rem', color: filters.family === f ? '#B8973A' : '#7A7570',
              transition: 'color 0.15s', fontFamily: 'DM Sans, sans-serif'
            }}
          >
            <span style={{ width: 14, height: 14, border: `1px solid ${filters.family === f ? '#B8973A' : '#252525'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.6rem', color: '#B8973A' }}>
              {filters.family === f ? '✓' : ''}
            </span>
            {f}
          </button>
        ))}
      </div>
      {/* Concentration */}
      <div>
        <div style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#B8973A', marginBottom: '1rem', fontFamily: 'DM Sans, sans-serif' }}>CONCENTRATION</div>
        {CONCENTRATIONS.map(c => (
          <button
            key={c}
            onClick={() => setFilters(f => ({ ...f, concentration: f.concentration === c ? '' : c }))}
            style={{
              display: 'flex', width: '100%', alignItems: 'center', gap: '0.5rem',
              background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem 0',
              fontSize: '0.8rem', color: filters.concentration === c ? '#B8973A' : '#7A7570',
              transition: 'color 0.15s', fontFamily: 'DM Sans, sans-serif'
            }}
          >
            <span style={{ width: 14, height: 14, border: `1px solid ${filters.concentration === c ? '#B8973A' : '#252525'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.6rem', color: '#B8973A' }}>
              {filters.concentration === c ? '✓' : ''}
            </span>
            {c}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#070707', color: '#F0EBE0' }}>
      {/* Page header */}
      <div style={{ borderBottom: '1px solid #1c1c1c', paddingTop: '4rem', paddingBottom: '2.5rem' }}>
        <div className="container">
          {/* Breadcrumb */}
          <div style={{ fontSize: '0.625rem', letterSpacing: '0.2em', color: '#7A7570', marginBottom: '1.25rem', fontFamily: 'DM Sans, sans-serif', textTransform: 'uppercase' }}>
            <Link href="/" style={{ textDecoration: 'none', color: '#7A7570' }} className="breadcrumb-link">HOME</Link>
            <span style={{ margin: '0 0.5rem', color: '#B8973A' }}>/</span>
            <span style={{ color: '#B8973A' }}>SHOP</span>
          </div>

          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', color: '#F0EBE0', fontWeight: 400, marginBottom: '0.5rem', lineHeight: 1.1 }}>
            THE COLLECTION
          </h1>
          <p style={{ color: '#7A7570', fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif' }}>
            Explore the Capriole fragrance collection.
          </p>
        </div>
      </div>

      {/* Category Tabs + Search Bar */}
      <div style={{ borderBottom: '1px solid #1c1c1c', background: '#0a0a0a' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', paddingTop: '1rem', paddingBottom: '1rem' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem', scrollbarWidth: 'none' }} className="category-tabs">
            {CATEGORY_TABS.map(tab => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    background: isActive ? '#B8973A' : 'transparent',
                    color: isActive ? '#070707' : '#7A7570',
                    border: `1px solid ${isActive ? '#B8973A' : '#1c1c1c'}`,
                    padding: '0.4rem 0.875rem',
                    fontSize: '0.625rem',
                    letterSpacing: '0.18em',
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Search box */}
          <div style={{ position: 'relative', width: '100%', maxWidth: 260 }}>
            <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#7A7570' }} />
            <input
              type="text"
              placeholder="Search fragrances..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: '#121212',
                border: '1px solid #1c1c1c',
                borderRadius: 0,
                padding: '0.45rem 0.75rem 0.45rem 2.25rem',
                fontSize: '0.75rem',
                color: '#F0EBE0',
                fontFamily: 'DM Sans, sans-serif',
                outline: 'none',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#7A7570', cursor: 'pointer', display: 'flex', padding: 2 }}
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
        {/* Mobile filter bar */}
        <div style={{ display: 'none', borderBottom: '1px solid #1c1c1c', paddingBottom: '1.5rem', marginBottom: '2rem' }} id="mobile-filter-bar">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={() => setFilterOpen(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: '#121212', border: '1px solid #1c1c1c',
                color: '#B8973A', padding: '0.625rem 1.25rem',
                fontSize: '0.625rem', letterSpacing: '0.18em',
                cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                fontWeight: 500,
              }}
            >
              <SlidersHorizontal size={14} /> FILTER
            </button>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              style={{
                flex: 1, background: '#121212', border: '1px solid #1c1c1c',
                color: '#F0EBE0', padding: '0.625rem', fontSize: '0.75rem',
                fontFamily: 'DM Sans, sans-serif', outline: 'none',
              }}
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '3.5rem' }}>
          {/* Desktop Sidebar */}
          <aside style={{ position: 'sticky', top: 90, alignSelf: 'flex-start' }} id="desktop-sidebar">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#B8973A', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>FILTERS</div>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: '#7A7570', fontSize: '0.65rem', fontFamily: 'DM Sans, sans-serif', cursor: 'pointer', outline: 'none' }}
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price_asc">Price ↑</option>
                <option value="price_desc">Price ↓</option>
              </select>
            </div>
            <FilterContent />
          </aside>

          {/* Product Grid Area */}
          <div>
            {/* Count & Clear All */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#7A7570', fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.05em' }}>
                {filtered.length} FRAGRANCE{filtered.length !== 1 ? 'S' : ''}
              </div>
              {(activeTab !== 'all' || searchQuery || filters.gender || filters.family || filters.concentration) && (
                <button
                  onClick={clearAllFilters}
                  style={{ background: 'none', border: 'none', color: '#B8973A', fontSize: '0.65rem', letterSpacing: '0.15em', fontFamily: 'DM Sans, sans-serif', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  CLEAR ALL
                </button>
              )}
            </div>

            {/* Render Grid or Empty Results */}
            {filtered.length > 0 ? (
              <ProductGrid products={filtered} columns={4} />
            ) : (
              <div style={{ padding: '4rem 1.5rem', textAlign: 'center', background: '#0a0a0a', border: '1px solid #1c1c1c' }}>
                <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.5rem', color: '#F0EBE0', marginBottom: '0.5rem', fontWeight: 400 }}>
                  NO FRAGRANCES FOUND
                </h3>
                <p style={{ color: '#7A7570', fontSize: '0.875rem', marginBottom: '1.5rem', fontFamily: 'DM Sans, sans-serif' }}>
                  Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={clearAllFilters}
                  style={{
                    background: '#B8973A', color: '#070707', border: 'none',
                    padding: '0.75rem 2rem', fontSize: '0.625rem',
                    letterSpacing: '0.18em', fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 500, cursor: 'pointer'
                  }}
                >
                  CLEAR FILTERS
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Panel */}
      {filterOpen && (
        <>
          <div onClick={() => setFilterOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 80, backdropFilter: 'blur(4px)' }} />
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#101010', border: '1px solid #1c1c1c', borderBottom: 'none', padding: '2rem 1.5rem 2.5rem', zIndex: 81, maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.625rem', letterSpacing: '0.22em', color: '#B8973A', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>FILTER FRAGRANCES</span>
              <button onClick={() => setFilterOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7A7570', display: 'flex' }}><X size={18} /></button>
            </div>
            <FilterContent />
            <button
              onClick={() => setFilterOpen(false)}
              style={{
                width: '100%', marginTop: '2rem', background: '#B8973A', border: 'none',
                color: '#070707', padding: '0.875rem', fontSize: '0.625rem',
                letterSpacing: '0.18em', fontFamily: 'DM Sans, sans-serif',
                fontWeight: 500, cursor: 'pointer'
              }}
            >
              APPLY FILTERS
            </button>
          </div>
        </>
      )}

      <style>{`
        .breadcrumb-link:hover { color: #F0EBE0 !important; }
        .category-tabs::-webkit-scrollbar { display: none; }
        @media (max-width: 1024px) {
          div[style*="grid-template-columns: 220px 1fr"] { grid-template-columns: 1fr !important; }
          #desktop-sidebar { display: none !important; }
          #mobile-filter-bar { display: block !important; }
        }
      `}</style>
    </div>
  )
}
