import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma/db'

export async function GET() {
  try {
    let config = await prisma.homepageConfig.findFirst()
    if (!config) {
      config = await prisma.homepageConfig.create({
        data: {
          heroTitle: 'THE ART OF\nLEAVING AN\nIMPRESSION.',
          heroSubtitle: 'French & Arabian fragrances\nfor moments worth remembering.',
          heroVisible: true,
          heroCta1Text: 'SHOP THE COLLECTION',
          heroCta1Url: '/shop',
          heroCta2Text: 'DISCOVER YOUR SCENT',
          heroCta2Url: '/discover',
          featuredProductIds: '[]',
          collectionIds: '[]',
        },
      })
    }
    return NextResponse.json(config)
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    let config = await prisma.homepageConfig.findFirst()
    if (config) {
      config = await prisma.homepageConfig.update({
        where: { id: config.id },
        data: {
          heroTitle: body.heroTitle,
          heroSubtitle: body.heroSubtitle,
          heroImage: body.heroImage,
          heroVisible: body.heroVisible,
          heroCta1Text: body.heroCta1Text,
          heroCta1Url: body.heroCta1Url,
          heroCta2Text: body.heroCta2Text,
          heroCta2Url: body.heroCta2Url,
          featuredProductIds: body.featuredProductIds || '[]',
          collectionIds: body.collectionIds || '[]',
        },
      })
    } else {
      config = await prisma.homepageConfig.create({ data: body })
    }
    return NextResponse.json(config)
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}
