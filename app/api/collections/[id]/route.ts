import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma/db'

type Params = { params: Promise<{ id: string }> }

export async function GET(_: Request, { params }: Params) {
  const { id } = await params
  try {
    const collection = await prisma.collection.findUnique({
      where: { id },
      include: { products: { include: { product: true } } },
    })
    if (!collection) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(collection)
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params
  try {
    const body = await request.json()
    const collection = await prisma.collection.update({
      where: { id },
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        philosophy: body.philosophy,
        image: body.image,
        published: body.published,
        sortOrder: body.sortOrder ?? 0,
      },
    })
    // Update product memberships if provided
    if (Array.isArray(body.productIds)) {
      await prisma.collectionProduct.deleteMany({ where: { collectionId: id } })
      if (body.productIds.length > 0) {
        await prisma.collectionProduct.createMany({
          data: body.productIds.map((productId: string, i: number) => ({ collectionId: id, productId, sortOrder: i })),
        })
      }
    }
    return NextResponse.json(collection)
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params
  try {
    await prisma.collection.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
