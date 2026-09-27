import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const gender = searchParams.get('gender')
    const family = searchParams.get('family')
    const featured = searchParams.get('featured')
    const newArrival = searchParams.get('newArrival')
    const bestSeller = searchParams.get('bestSeller')
    const limit = parseInt(searchParams.get('limit') || '50')

    const where: Record<string, unknown> = { published: true }
    if (gender) where.gender = gender
    if (family) where.fragranceFamily = { contains: family }
    if (featured === 'true') where.featured = true
    if (newArrival === 'true') where.newArrival = true
    if (bestSeller === 'true') where.bestSeller = true

    const products = await prisma.product.findMany({
      where,
      include: { discounts: { include: { discount: true } } },
      take: limit,
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    })

    return NextResponse.json({ products })
  } catch (error) {
    console.error('Products fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, price, ...rest } = body

    if (!name || !price) {
      return NextResponse.json({ error: 'Name and price are required' }, { status: 400 })
    }

    // Generate slug from name
    const slug = rest.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    
    // Check for slug uniqueness
    const existing = await prisma.product.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json({ error: 'A product with this slug already exists' }, { status: 409 })
    }

    const product = await prisma.product.create({
      data: { name, price: parseFloat(price), slug, ...rest },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Product create error:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
