import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma/db'
import OrderDetailClient from './OrderDetailClient'

export const metadata: Metadata = { title: 'Order Detail' }

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let order: any = null
  try {
    order = await prisma.order.findUnique({ where: { id }, include: { items: true } })
  } catch {}
  if (!order) notFound()
  return <OrderDetailClient order={order} />
}
