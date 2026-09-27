export interface Product {
  id: string
  name: string
  slug: string
  brand: string
  price: number
  compareAtPrice?: number | null
  currency: string
  volume?: string | null
  gender?: string | null
  category?: string | null
  collection?: string | null
  fragranceFamily?: string | null
  concentration?: string | null
  description?: string | null
  shortDescription?: string | null
  topNotes?: string | null
  heartNotes?: string | null
  baseNotes?: string | null
  mainAccords?: string | null
  character?: string | null
  bestFor?: string | null
  intensity?: number | null
  projection?: number | null
  longevity?: number | null
  freshness?: number | null
  sweetness?: number | null
  warmth?: number | null
  woody?: number | null
  spicy?: number | null
  images?: string | null
  thumbnail?: string | null
  stockQuantity: number
  stockStatus: string
  featured: boolean
  bestSeller: boolean
  newArrival: boolean
  sampleAvailable: boolean
  published: boolean
  discounts?: Array<{ discount: { type: string; value: number; active: boolean } }>
  createdAt: Date
  updatedAt: Date
}

export function parseNotes(json?: string | null): string[] {
  if (!json) return []
  try { return JSON.parse(json) } catch { return [] }
}

export function parseImages(json?: string | null): string[] {
  if (!json) return []
  try { return JSON.parse(json) } catch { return [] }
}

export function getActiveDiscount(product: Product) {
  if (!product.discounts?.length) return null
  const active = product.discounts.find(pd => pd.discount.active)
  return active?.discount ?? null
}

export function getEffectivePrice(product: Product): number {
  const discount = getActiveDiscount(product)
  if (!discount) return product.price
  if (discount.type === 'percentage') return product.price * (1 - discount.value / 100)
  if (discount.type === 'fixed') return Math.max(0, product.price - discount.value)
  return product.price
}

export function getProductImage(product: { slug: string; images?: string | null }): string {
  const parsed = parseImages(product.images)
  if (parsed.length > 0 && parsed[0]) return parsed[0]
  if (product.slug === 'capriole-atlas-dubai') return '/images/products/atlas-dubai.png'
  if (product.slug === 'capriole-scandal') return '/images/products/scandal.png'
  if (product.slug === 'rose-kabuki') return '/images/products/kabuki.png'
  return '/images/products/atlas-dubai.png'
}

