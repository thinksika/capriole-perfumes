import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma/db'

export async function GET() {
  try {
    const discounts = await prisma.discount.findMany({
      orderBy: { createdAt: 'desc' },
      include: { products: { include: { product: true } } },
    })
    return NextResponse.json({ discounts })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, type, value, scope, startDate, endDate, active } = body
    if (!name || !type || value == null) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    const discount = await prisma.discount.create({
      data: {
        name,
        type,
        value: parseFloat(value),
        scope: scope || 'all',
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        active: active ?? true,
      },
    })
    return NextResponse.json(discount, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 })
  }
}
