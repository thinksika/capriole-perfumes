import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma/db'

export async function GET() {
  try {
    const collections = await prisma.collection.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      include: { products: { include: { product: true } } },
    })
    return NextResponse.json({ collections })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, philosophy, image, published, sortOrder } = body
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    const slug = body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const existing = await prisma.collection.findUnique({ where: { slug } })
    if (existing) return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    const collection = await prisma.collection.create({
      data: { name, slug, description, philosophy, image, published: published ?? true, sortOrder: sortOrder ?? 0 },
    })
    return NextResponse.json(collection, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 })
  }
}
