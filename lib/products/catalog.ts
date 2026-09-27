import { Product } from './types'
import prisma from '@/lib/prisma/db'

export const CAPRIOLE_MASTER_PRODUCTS: Product[] = [
  {
    id: 'prod-atlas-dubai',
    name: 'Capriole Atlas Dubai',
    slug: 'capriole-atlas-dubai',
    brand: 'Capriole',
    price: 1800,
    currency: 'GHS',
    volume: '100ml',
    gender: 'unisex',
    category: 'edp',
    collection: 'Oud',
    fragranceFamily: 'Oriental Woody Amber',
    concentration: 'Eau de Parfum',
    description: 'A rich, warm and luxurious blend that captures the essence of Arabian sophistication — golden amber and oud with a velvety musk base.',
    shortDescription: 'Arabian sophistication in a bottle. Golden amber and oud with a velvety musk base.',
    topNotes: JSON.stringify(['Saffron', 'Bergamot']),
    heartNotes: JSON.stringify(['Amber', 'Cedarwood']),
    baseNotes: JSON.stringify(['Oud', 'Musk', 'Tonka Bean']),
    mainAccords: JSON.stringify(['Royal', 'Deep', 'Opulent']),
    character: JSON.stringify(['Royal', 'Deep', 'Opulent']),
    bestFor: JSON.stringify(['Evenings', 'Events', 'Cooler weather', 'Special occasions']),
    intensity: 9,
    projection: 8,
    longevity: 9,
    freshness: 2,
    sweetness: 4,
    warmth: 9,
    woody: 8,
    spicy: 7,
    thumbnail: '/images/products/atlas-dubai.png',
    images: JSON.stringify(['/images/products/atlas-dubai.png']),
    stockQuantity: 20,
    stockStatus: 'in_stock',
    featured: true,
    bestSeller: true,
    newArrival: false,
    sampleAvailable: true,
    published: true,
    discounts: [],
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-03-01'),
  },
  {
    id: 'prod-scandal',
    name: 'Capriole Scandal',
    slug: 'capriole-scandal',
    brand: 'Capriole',
    price: 1200,
    currency: 'GHS',
    volume: '200ml',
    gender: 'women',
    category: 'edp',
    collection: 'Sweet Gourmand Floral',
    fragranceFamily: 'Floral Woody',
    concentration: 'Eau de Parfum',
    description: 'A bold honey-gourmand fragrance with a style reminiscent of Scandal by Jean Paul Gaultier. Sweet, playful and unapologetically bold.',
    shortDescription: 'Bold honey-gourmand. Sweet, playful and unforgettable.',
    topNotes: JSON.stringify(['Blood Orange', 'Mandarin']),
    heartNotes: JSON.stringify(['Honey', 'Gardenia', 'Jasmine', 'Orange Blossom', 'Peach']),
    baseNotes: JSON.stringify(['Beeswax', 'Caramel', 'Patchouli', 'Liquorice']),
    mainAccords: JSON.stringify(['Sweet', 'Honey', 'Floral', 'Patchouli']),
    character: JSON.stringify(['Sexy', 'Playful', 'Bold']),
    bestFor: JSON.stringify(['Nightlife', 'Parties', 'Clubbing']),
    intensity: 8,
    projection: 8,
    longevity: 8,
    freshness: 4,
    sweetness: 9,
    warmth: 6,
    woody: 3,
    spicy: 3,
    thumbnail: '/images/products/scandal.png',
    images: JSON.stringify(['/images/products/scandal.png']),
    stockQuantity: 15,
    stockStatus: 'in_stock',
    featured: true,
    bestSeller: false,
    newArrival: true,
    sampleAvailable: true,
    published: true,
    discounts: [{ discount: { type: 'percentage', value: 15, active: true } }],
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-03-01'),
  },
  {
    id: 'rose-kabuki',
    name: 'Rose Kabuki',
    slug: 'rose-kabuki',
    brand: 'Capriole',
    price: 1200,
    currency: 'GHS',
    volume: '100ml',
    gender: 'women',
    category: 'edp',
    collection: 'Floral',
    fragranceFamily: 'Floral Woody',
    concentration: 'Eau de Parfum',
    description: 'A soft, elegant fragrance that balances floral freshness with a powdery theatrical feel. Pure fragrance oil concentration of 15%. Ideal for daily wear in office settings.',
    shortDescription: 'Elegant and refined. Floral freshness with a powdery, theatrical character.',
    topNotes: JSON.stringify(['Cassis']),
    heartNotes: JSON.stringify(['Fresh Rose']),
    baseNotes: JSON.stringify(['Musk']),
    mainAccords: JSON.stringify(['Floral', 'Powdery', 'Rose']),
    character: JSON.stringify(['Elegant', 'Sophisticated', 'Refined']),
    bestFor: JSON.stringify(['Daytime', 'Office', 'Elegant occasions']),
    intensity: 5,
    projection: 5,
    longevity: 7,
    freshness: 7,
    sweetness: 4,
    warmth: 3,
    woody: 4,
    spicy: 1,
    thumbnail: '/images/products/kabuki.png',
    images: JSON.stringify(['/images/products/kabuki.png']),
    stockQuantity: 12,
    stockStatus: 'in_stock',
    featured: true,
    bestSeller: false,
    newArrival: false,
    sampleAvailable: true,
    published: true,
    discounts: [{ discount: { type: 'percentage', value: 15, active: true } }],
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-03-01'),
  },
]

export async function fetchAllProducts(): Promise<Product[]> {
  try {
    const dbProducts = await prisma.product.findMany({
      where: { published: true },
      include: { discounts: { include: { discount: true } } },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    })
    if (dbProducts && dbProducts.length > 0) {
      return dbProducts as any
    }
  } catch {}
  return CAPRIOLE_MASTER_PRODUCTS
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const dbProduct = await prisma.product.findUnique({
      where: { slug, published: true },
      include: { discounts: { include: { discount: true } } },
    })
    if (dbProduct) return dbProduct as any
  } catch {}
  
  const fallback = CAPRIOLE_MASTER_PRODUCTS.find(p => p.slug === slug)
  return fallback || null
}

export async function fetchProductsByCollection(slug: string): Promise<Product[]> {
  const all = await fetchAllProducts()
  const slugLower = slug.toLowerCase()

  if (slugLower === 'floral') {
    return all.filter(p => (p.collection || '').toLowerCase().includes('floral') || (p.fragranceFamily || '').toLowerCase().includes('floral'))
  }
  if (slugLower === 'oud') {
    return all.filter(p => (p.collection || '').toLowerCase().includes('oud') || (p.fragranceFamily || '').toLowerCase().includes('oud') || (p.name || '').toLowerCase().includes('dubai'))
  }
  if (slugLower === 'sweet' || slugLower === 'sweet-gourmand') {
    return all.filter(p => (p.collection || '').toLowerCase().includes('sweet') || (p.fragranceFamily || '').toLowerCase().includes('sweet') || (p.slug || '').includes('scandal'))
  }
  if (slugLower === 'woody') {
    return all.filter(p => (p.fragranceFamily || '').toLowerCase().includes('woody') || (p.collection || '').toLowerCase().includes('woody') || (p.slug || '').includes('atlas'))
  }
  if (slugLower === 'musk' || slugLower === 'musk-amber' || slugLower === 'amber') {
    return all.filter(p => (p.fragranceFamily || '').toLowerCase().includes('amber') || (p.fragranceFamily || '').toLowerCase().includes('musk') || (p.collection || '').toLowerCase().includes('musk'))
  }

  const filtered = all.filter(p => (p.collection || '').toLowerCase().includes(slugLower) || (p.fragranceFamily || '').toLowerCase().includes(slugLower))
  return filtered.length > 0 ? filtered : all
}
