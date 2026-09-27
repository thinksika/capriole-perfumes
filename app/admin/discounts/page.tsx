import { Metadata } from 'next'
import prisma from '@/lib/prisma/db'
import DiscountsClient from './DiscountsClient'
export const metadata: Metadata = { title: 'Discounts' }
export default async function AdminDiscountsPage() {
  let discounts: any[] = []
  try {
    discounts = await prisma.discount.findMany({ orderBy: { createdAt: 'desc' } })
  } catch {}
  return <DiscountsClient discounts={discounts} />
}
