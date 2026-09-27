import { Metadata } from 'next'
import ShopClient from '../ShopClient'
import { fetchAllProducts } from '@/lib/products/catalog'

type Props = { params: Promise<{ category: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const title = category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  return {
    title: `${title} — Shop | Capriole Perfumes`,
    description: `Browse ${title} fragrances from Capriole Perfumes.`,
  }
}

export default async function ShopCategoryPage({ params }: Props) {
  const { category } = await params
  const products = await fetchAllProducts()

  const initialFilters: Record<string, string> = {}
  const catLower = category.toLowerCase()

  if (['women', 'men', 'unisex'].includes(catLower)) {
    initialFilters.gender = catLower
  } else if (catLower === 'extraits' || catLower === 'extrait') {
    initialFilters.concentration = 'Extrait de Parfum'
  } else if (catLower === 'edp' || catLower === 'eau-de-parfum') {
    initialFilters.concentration = 'Eau de Parfum'
  }

  return <ShopClient products={products} initialFilters={initialFilters} />
}
