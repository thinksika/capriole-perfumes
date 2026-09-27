import { Metadata } from 'next'
import ShopClient from './ShopClient'
import prisma from '@/lib/prisma/db'

export const metadata: Metadata = {
  title: 'The Collection',
  description: 'Explore the Capriole fragrance library. Shop all French and Arabian perfumes.',
}

async function getAllProducts() {
  try {
    return await prisma.product.findMany({
      where: { published: true },
      include: { discounts: { include: { discount: true } } },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    })
  } catch { return [] }
}

export default async function ShopPage() {
  const products = await getAllProducts()
  return <ShopClient products={products as any} />
}
