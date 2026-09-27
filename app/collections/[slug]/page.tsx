import { Metadata } from 'next'
import Link from 'next/link'
import ProductGrid from '@/components/product/ProductGrid'
import prisma from '@/lib/prisma/db'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const name = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  return {
    title: `${name} Collection — Capriole Perfumes`,
    description: `Explore the ${name} fragrance collection from Capriole Perfumes.`,
  }
}

async function getCollection(slug: string) {
  try {
    return await prisma.collection.findUnique({
      where: { slug },
      include: { products: { include: { product: { include: { discounts: { include: { discount: true } } } } } } },
    })
  } catch { return null }
}

async function getProductsByFamily(familyKeyword: string) {
  try {
    return await prisma.product.findMany({
      where: {
        published: true,
        OR: [
          { fragranceFamily: { contains: familyKeyword } },
          { description: { contains: familyKeyword } },
          { name: { contains: familyKeyword } },
        ],
      },
      include: { discounts: { include: { discount: true } } },
    })
  } catch { return [] }
}

async function getAllPublishedProducts() {
  try {
    return await prisma.product.findMany({
      where: { published: true },
      include: { discounts: { include: { discount: true } } },
      orderBy: [{ featured: 'desc' }],
    })
  } catch { return [] }
}

const FAMILY_MAP: Record<string, string> = {
  'floral': 'Floral',
  'musk': 'Musk',
  'amber': 'Amber',
  'musk-amber': 'Musk',
  'woody': 'Woody',
  'oud': 'Oud',
  'fresh': 'Fresh',
  'fresh-citrus': 'Fresh',
  'sweet': 'Sweet',
  'sweet-gourmand': 'Sweet',
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params
  const collection = await getCollection(slug)
  const familyKey = FAMILY_MAP[slug] || slug
  let familyProducts = await getProductsByFamily(familyKey)
  const collectionProducts = collection?.products.map(p => p.product) ?? []

  let allProducts = collectionProducts.length > 0 ? collectionProducts : familyProducts

  // Fallback: If no products matched the specific family, retrieve all published products so page is never empty
  if (allProducts.length === 0) {
    allProducts = await getAllPublishedProducts()
  }

  const displayName = collection?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

  return (
    <div style={{ background: '#070707', minHeight: '100vh', padding: '4rem 0 6rem' }}>
      <div className="container">
        <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.65rem', color: '#7A7570', letterSpacing: '0.1em', fontFamily: 'DM Sans, sans-serif' }}>
          <Link href="/collections" style={{ color: '#7A7570', transition: 'color 0.15s', textDecoration: 'none' }} className="breadcrumb-link">COLLECTIONS</Link>
          <span>/</span>
          <span style={{ color: '#B8973A' }}>{displayName.toUpperCase()}</span>
        </div>
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ fontSize: '0.5rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>COLLECTION</div>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#F0EBE0', fontWeight: 400, marginBottom: '0.75rem' }}>{displayName.toUpperCase()}</h1>
          {collection?.description && <p style={{ color: '#7A7570', fontSize: '0.875rem', maxWidth: 480, fontFamily: 'DM Sans, sans-serif' }}>{collection.description}</p>}
        </div>

        <ProductGrid products={allProducts as Parameters<typeof ProductGrid>[0]['products']} columns={3} />
      </div>
      <style>{`.breadcrumb-link:hover{color:#F0EBE0!important;}`}</style>
    </div>
  )
}
