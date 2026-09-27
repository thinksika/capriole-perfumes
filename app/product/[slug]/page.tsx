import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductPageClient from './ProductPageClient'
import { fetchProductBySlug, fetchAllProducts } from '@/lib/products/catalog'
import prisma from '@/lib/prisma/db'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await fetchProductBySlug(slug)
  if (!product) return { title: 'Product Not Found — Capriole Perfumes' }
  return {
    title: `${product.name} | Capriole Perfumes`,
    description: product.shortDescription || product.description?.substring(0, 155) || `Shop ${product.name} from Capriole Perfumes.`,
    openGraph: {
      title: `${product.name} | Capriole Perfumes`,
      description: product.shortDescription || undefined,
      images: product.thumbnail ? [{ url: product.thumbnail }] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await fetchProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const all = await fetchAllProducts()
  const related = all.filter(p => p.id !== product.id).slice(0, 3)

  let waNumber = '+233547151094'
  try {
    const settings = await prisma.storeSettings.findFirst()
    if (settings?.whatsappNumber) waNumber = settings.whatsappNumber
  } catch {}

  return <ProductPageClient product={product} related={related} waNumber={waNumber} />
}
