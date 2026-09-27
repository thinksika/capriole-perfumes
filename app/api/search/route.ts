import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q')?.toLowerCase().trim() || ''

    if (!q) return NextResponse.json({ products: [] })

    const products = await prisma.product.findMany({
      where: {
        published: true,
        OR: [
          { name: { contains: q } },
          { fragranceFamily: { contains: q } },
          { description: { contains: q } },
          { shortDescription: { contains: q } },
          { topNotes: { contains: q } },
          { heartNotes: { contains: q } },
          { baseNotes: { contains: q } },
          { mainAccords: { contains: q } },
          { character: { contains: q } },
          { bestFor: { contains: q } },
          { collection: { contains: q } },
          { gender: { contains: q } },
        ],
      },
      include: { discounts: { include: { discount: true } } },
      take: 20,
    })

    return NextResponse.json({ products })
  } catch (error) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
