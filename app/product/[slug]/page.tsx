import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductPageClient from './ProductPageClient'
import prisma from '@/lib/prisma/db'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await prisma.product.findUnique({ where: { slug } })
  if (!product) return { title: 'Product Not Found' }
  return {
    title: product.name,
    description: product.shortDescription || product.description?.substring(0, 155) || `Shop ${product.name} from Capriole Perfumes.`,
    openGraph: {
      title: `${product.name} | Capriole Perfumes`,
      description: product.shortDescription || undefined,
      images: product.thumbnail ? [{ url: product.thumbnail }] : [],
    },
  }
}

async function getProduct(slug: string) {
  return prisma.product.findUnique({
    where: { slug, published: true },
    include: {
      discounts: { include: { discount: true } },
      collectionItems: { include: { collection: true } },
    },
  })
}

async function getRelated(product: { fragranceFamily?: string | null; id: string; collection?: string | null }) {
  return prisma.product.findMany({
    where: {
      published: true,
      id: { not: product.id },
      OR: [
        { fragranceFamily: { contains: (product.fragranceFamily || '').split(' ')[0] } },
        { collection: product.collection || undefined },
      ],
    },
    include: { discounts: { include: { discount: true } } },
    take: 3,
  })
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const related = await getRelated(product as any)
  const settings = await prisma.storeSettings.findFirst()
  const waNumber = settings?.whatsappNumber || '+233547151094'

  return <ProductPageClient product={product as any} related={related as any} waNumber={waNumber} />
}
