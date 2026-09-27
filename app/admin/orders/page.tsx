import { Metadata } from 'next'
import prisma from '@/lib/prisma/db'
import AdminOrdersClient from './OrdersClient'

export const metadata: Metadata = { title: 'Orders' }

export default async function AdminOrdersPage() {
  let orders: any[] = []
  try {
    orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: { items: true },
    })
  } catch {}
  return <AdminOrdersClient orders={orders} />
}
