import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma/db'

type Params = { params: Promise<{ slug: string }> }

export async function GET(_: Request, { params }: Params) {
  const { slug } = await params
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { discounts: { include: { discount: true } } },
    })
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(product)
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: Params) {
  const { slug } = await params
  try {
    // slug here is actually the product id when called from admin
    const body = await request.json()
    const product = await prisma.product.update({
      where: { id: slug },
      data: {
        name: body.name,
        slug: body.slug,
        price: body.price,
        compareAtPrice: body.compareAtPrice,
        fragranceFamily: body.fragranceFamily,
        concentration: body.concentration,
        gender: body.gender,
        volume: body.volume,
        description: body.description,
        shortDescription: body.shortDescription,
        topNotes: body.topNotes,
        heartNotes: body.heartNotes,
        baseNotes: body.baseNotes,
        character: body.character,
        intensity: body.intensity,
        longevity: body.longevity,
        projection: body.projection,
        stockStatus: body.stockStatus,
        stockQuantity: body.stockQuantity,
        published: body.published,
        featured: body.featured,
        bestSeller: body.bestSeller,
        newArrival: body.newArrival,
        sampleAvailable: body.sampleAvailable,
      },
    })
    return NextResponse.json(product)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: Params) {
  const { slug } = await params
  try {
    await prisma.product.delete({ where: { id: slug } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
