import { Metadata } from 'next'
import ShopClient from './ShopClient'
import { fetchAllProducts } from '@/lib/products/catalog'

export const metadata: Metadata = {
  title: 'The Collection — Shop | Capriole Perfumes',
  description: 'Explore the Capriole fragrance library. Shop all French and Arabian perfumes.',
}

export default async function ShopPage() {
  const products = await fetchAllProducts()
  return <ShopClient products={products} />
}
