import { Product, parseNotes } from '../products/types'

interface SearchFilters {
  query?: string
  gender?: string
  family?: string
  collection?: string
  concentration?: string
  minPrice?: number
  maxPrice?: number
  featured?: boolean
  bestSeller?: boolean
  newArrival?: boolean
  stockStatus?: string
}

export function searchProducts(
  products: Product[],
  filters: SearchFilters
): Product[] {
  let results = products.filter(p => p.published)

  if (filters.query) {
    const q = filters.query.toLowerCase()
    results = results.filter(p => {
      const fields = [
        p.name,
        p.fragranceFamily,
        p.description,
        p.shortDescription,
        p.collection,
        p.character,
        p.bestFor,
        p.concentration,
        p.gender,
        ...parseNotes(p.topNotes),
        ...parseNotes(p.heartNotes),
        ...parseNotes(p.baseNotes),
        ...parseNotes(p.mainAccords),
      ]
      return fields.some(f => f?.toLowerCase().includes(q))
    })
  }

  if (filters.gender) {
    results = results.filter(p => p.gender?.toLowerCase() === filters.gender?.toLowerCase())
  }
  if (filters.family) {
    results = results.filter(p =>
      p.fragranceFamily?.toLowerCase().includes(filters.family!.toLowerCase())
    )
  }
  if (filters.collection) {
    results = results.filter(p =>
      p.collection?.toLowerCase().includes(filters.collection!.toLowerCase())
    )
  }
  if (filters.concentration) {
    results = results.filter(p =>
      p.concentration?.toLowerCase().includes(filters.concentration!.toLowerCase())
    )
  }
  if (filters.minPrice !== undefined) {
    results = results.filter(p => p.price >= filters.minPrice!)
  }
  if (filters.maxPrice !== undefined) {
    results = results.filter(p => p.price <= filters.maxPrice!)
  }
  if (filters.featured !== undefined) {
    results = results.filter(p => p.featured === filters.featured)
  }
  if (filters.bestSeller !== undefined) {
    results = results.filter(p => p.bestSeller === filters.bestSeller)
  }
  if (filters.newArrival !== undefined) {
    results = results.filter(p => p.newArrival === filters.newArrival)
  }
  if (filters.stockStatus) {
    results = results.filter(p => p.stockStatus === filters.stockStatus)
  }

  return results
}
