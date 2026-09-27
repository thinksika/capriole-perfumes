'use client'
import { useState, useMemo } from 'react'
import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react'
import ProductGrid from '@/components/product/ProductGrid'
import { Product } from '@/lib/products/types'
import { searchProducts } from '@/lib/search/searchProducts'

const FAMILIES = ['Floral', 'Woody', 'Oud', 'Musk', 'Amber', 'Fresh', 'Sweet']
const GENDERS = ['Women', 'Men', 'Unisex']
const CONCENTRATIONS = ['Eau de Parfum', 'Extrait de Parfum']

interface ShopClientProps { products: Product[] }

export default function ShopClient({ products }: ShopClientProps) {
  const [filters, setFilters] = useState({ gender: '', family: '', concentration: '', featured: false, newArrival: false, bestSeller: false })
  const [sort, setSort] = useState('featured')
  const [filterOpen, setFilterOpen] = useState(false)

  const filtered = useMemo(() => {
    let result = searchProducts(products, {
      gender: filters.gender || undefined,
      family: filters.family || undefined,
      concentration: filters.concentration || undefined,
      featured: filters.featured || undefined,
      newArrival: filters.newArrival || undefined,
      bestSeller: filters.bestSeller || undefined,
    })
    if (sort === 'price_asc') result = [...result].sort((a, b) => a.price - b.price)
    else if (sort === 'price_desc') result = [...result].sort((a, b) => b.price - a.price)
    else if (sort === 'newest') result = [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    return result
  }, [products, filters, sort])

  const clearFilter = (key: keyof typeof filters) => setFilters(f => ({ ...f, [key]: key === 'featured' || key === 'newArrival' || key === 'bestSeller' ? false : '' }))

  const FilterContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Gender */}
      <div>
        <div style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#B8973A', marginBottom: '1rem', fontFamily: 'DM Sans, sans-serif' }}>GENDER</div>
        {GENDERS.map(g => (
          <button key={g} onClick={() => setFilters(f => ({ ...f, gender: f.gender === g.toLowerCase() ? '' : g.toLowerCase() }))}
            style={{ display: 'flex', width: '100%', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem 0', fontSize: '0.8rem', color: filters.gender === g.toLowerCase() ? '#B8973A' : '#7A7570', transition: 'color 0.15s', fontFamily: 'DM Sans, sans-serif' }}>
            <span style={{ width: 14, height: 14, border: `1px solid ${filters.gender === g.toLowerCase() ? '#B8973A' : '#252525'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.6rem', color: '#B8973A' }}>{filters.gender === g.toLowerCase() ? '✓' : ''}</span>
            {g}
          </button>
        ))}
      </div>
      {/* Family */}
      <div>
        <div style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#B8973A', marginBottom: '1rem', fontFamily: 'DM Sans, sans-serif' }}>FRAGRANCE FAMILY</div>
        {FAMILIES.map(f => (
          <button key={f} onClick={() => setFilters(prev => ({ ...prev, family: prev.family === f ? '' : f }))}
            style={{ display: 'flex', width: '100%', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem 0', fontSize: '0.8rem', color: filters.family === f ? '#B8973A' : '#7A7570', transition: 'color 0.15s', fontFamily: 'DM Sans, sans-serif' }}>
            <span style={{ width: 14, height: 14, border: `1px solid ${filters.family === f ? '#B8973A' : '#252525'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.6rem', color: '#B8973A' }}>{filters.family === f ? '✓' : ''}</span>
            {f}
          </button>
        ))}
      </div>
      {/* Concentration */}
      <div>
        <div style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#B8973A', marginBottom: '1rem', fontFamily: 'DM Sans, sans-serif' }}>CONCENTRATION</div>
        {CONCENTRATIONS.map(c => (
          <button key={c} onClick={() => setFilters(f => ({ ...f, concentration: f.concentration === c ? '' : c }))}
            style={{ display: 'flex', width: '100%', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem 0', fontSize: '0.8rem', color: filters.concentration === c ? '#B8973A' : '#7A7570', transition: 'color 0.15s', fontFamily: 'DM Sans, sans-serif' }}>
            <span style={{ width: 14, height: 14, border: `1px solid ${filters.concentration === c ? '#B8973A' : '#252525'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.6rem', color: '#B8973A' }}>{filters.concentration === c ? '✓' : ''}</span>
            {c}
          </button>
        ))}
      </div>
      {/* Tags */}
      <div>
        <div style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#B8973A', marginBottom: '1rem', fontFamily: 'DM Sans, sans-serif' }}>FILTER BY</div>
        {[['Featured', 'featured'], ['New Arrivals', 'newArrival'], ['Best Sellers', 'bestSeller']].map(([label, key]) => (
          <button key={key} onClick={() => setFilters(f => ({ ...f, [key]: !f[key as keyof typeof f] }))}
            style={{ display: 'flex', width: '100%', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem 0', fontSize: '0.8rem', color: filters[key as keyof typeof filters] ? '#B8973A' : '#7A7570', transition: 'color 0.15s', fontFamily: 'DM Sans, sans-serif' }}>
            <span style={{ width: 14, height: 14, border: `1px solid ${filters[key as keyof typeof filters] ? '#B8973A' : '#252525'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.6rem', color: '#B8973A' }}>{filters[key as keyof typeof filters] ? '✓' : ''}</span>
            {label}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#070707' }}>
      {/* Page header */}
      <div style={{ borderBottom: '1px solid #1c1c1c', padding: '4rem 0 3rem' }}>
        <div className="container">
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>CAPRIOLE</div>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#F0EBE0', fontWeight: 400, marginBottom: '0.75rem' }}>THE COLLECTION</h1>
          <p style={{ color: '#7A7570', fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif' }}>Explore the Capriole fragrance library.</p>
        </div>
      </div>

      {/* Mobile filter bar */}
      <div style={{ display: 'none', borderBottom: '1px solid #1c1c1c', padding: '1rem 0' }} id="mobile-filter-bar">
        <div className="container" style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => setFilterOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: '1px solid #252525', color: '#B8B0A3', padding: '0.5rem 1rem', fontSize: '0.625rem', letterSpacing: '0.15em', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
            <SlidersHorizontal size={14} /> FILTER
          </button>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ flex: 1, background: '#101010', border: '1px solid #252525', color: '#B8B0A3', padding: '0.5rem', fontSize: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="container" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '4rem', padding: '3rem 2rem' }}>
        {/* Desktop Sidebar */}
        <aside style={{ position: 'sticky', top: 90, alignSelf: 'flex-start' }} id="desktop-sidebar">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#7A7570', fontFamily: 'DM Sans, sans-serif' }}>FILTERS</div>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{ background: 'transparent', border: 'none', color: '#7A7570', fontSize: '0.65rem', fontFamily: 'DM Sans, sans-serif', cursor: 'pointer' }}>
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price_asc">Price ↑</option>
              <option value="price_desc">Price ↓</option>
            </select>
          </div>
          <FilterContent />
        </aside>

        {/* Grid */}
        <div>
          {/* Result count + active filters */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#7A7570', fontFamily: 'DM Sans, sans-serif' }}>{filtered.length} fragrance{filtered.length !== 1 ? 's' : ''}</div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {filters.gender && <span className="filter-chip active" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>{filters.gender} <button onClick={() => clearFilter('gender')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', padding: 0 }}><X size={10} /></button></span>}
              {filters.family && <span className="filter-chip active" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>{filters.family} <button onClick={() => clearFilter('family')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', padding: 0 }}><X size={10} /></button></span>}
            </div>
          </div>
          <ProductGrid products={filtered} columns={3} />
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filterOpen && (
        <>
          <div onClick={() => setFilterOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 60 }} />
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#101010', border: '1px solid #1c1c1c', borderBottom: 'none', borderRadius: 0, padding: '2rem', zIndex: 61, maxHeight: '80vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#B8973A', fontFamily: 'DM Sans, sans-serif' }}>FILTER</span>
              <button onClick={() => setFilterOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7A7570', display: 'flex' }}><X size={18} /></button>
            </div>
            <FilterContent />
            <button onClick={() => setFilterOpen(false)} style={{ width: '100%', marginTop: '2rem', background: '#B8973A', border: 'none', color: '#070707', padding: '0.875rem', fontSize: '0.625rem', letterSpacing: '0.18em', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, cursor: 'pointer' }}>APPLY FILTERS</button>
          </div>
        </>
      )}

      <style>{`
        @media (max-width: 1024px) {
          div[style*="grid-template-columns: 220px 1fr"] { grid-template-columns: 1fr !important; padding: 2rem 1.25rem !important; }
          #desktop-sidebar { display: none !important; }
          #mobile-filter-bar { display: block !important; }
        }
      `}</style>
    </div>
  )
}
