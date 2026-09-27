import { Metadata } from 'next'
import prisma from '@/lib/prisma/db'
import InventoryClient from './InventoryClient'
export const metadata: Metadata = { title: 'Inventory' }
export default async function AdminInventoryPage() {
  let products: any[] = []
  try {
    products = await prisma.product.findMany({
      select: { id: true, name: true, slug: true, stockQuantity: true, stockStatus: true, published: true },
      orderBy: { name: 'asc' },
    })
  } catch {}
  return <InventoryClient products={products} />
}
