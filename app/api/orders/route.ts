import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma/db'
import { generateOrderNumber } from '@/lib/whatsapp/orderBuilder'

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ orders })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { customerName, customerPhone, customerEmail, deliveryMethod, address, city, region, notes, items, subtotal, discountAmount, deliveryFee, total } = body

    if (!customerName || !customerPhone || !items?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Get last order to generate sequential number
    const lastOrder = await prisma.order.findFirst({ orderBy: { createdAt: 'desc' } })
    const lastNum = lastOrder ? parseInt(lastOrder.orderNumber.replace('CP-', '')) : 1000
    const orderNumber = generateOrderNumber(lastNum)

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerPhone,
        customerEmail,
        deliveryMethod: deliveryMethod || 'delivery',
        address,
        city,
        region,
        notes,
        subtotal: parseFloat(subtotal),
        discountAmount: parseFloat(discountAmount || 0),
        deliveryFee: parseFloat(deliveryFee || 0),
        total: parseFloat(total),
        items: {
          create: items.map((item: { productId: string; name: string; price: number; quantity: number; total: number }) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            total: item.total,
          })),
        },
      },
      include: { items: true },
    })

    // Upsert customer
    try {
      await prisma.customer.upsert({
        where: { phone: customerPhone },
        update: { name: customerName, email: customerEmail },
        create: { name: customerName, phone: customerPhone, email: customerEmail },
      })
    } catch {}

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Order create error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
