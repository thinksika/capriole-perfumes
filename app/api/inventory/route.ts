import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma/db'

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      select: { id: true, name: true, slug: true, stockQuantity: true, stockStatus: true, published: true },
      orderBy: { name: 'asc' },
    })
    return NextResponse.json({ products })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json() // { id, stockQuantity, stockStatus }
    const { id, stockQuantity, stockStatus } = body
    const product = await prisma.product.update({
      where: { id },
      data: { stockQuantity: parseInt(stockQuantity), stockStatus },
    })
    return NextResponse.json(product)
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}
