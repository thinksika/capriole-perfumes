import { Metadata } from 'next'
import { fetchProductsByCollection } from '@/lib/products/catalog'
import CollectionClient from './CollectionClient'

type Props = { params: Promise<{ slug: string }> }

const DISPLAY_NAMES: Record<string, string> = {
  'oud':            'Oud',
  'floral':         'Floral',
  'musk-amber':     'Musk & Amber',
  'woody':          'Woody',
  'sweet-gourmand': 'Sweet',
  'fresh-citrus':   'Fresh & Citrus',
}

function getDisplayName(slug: string): string {
  return DISPLAY_NAMES[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const name = getDisplayName(slug)
  return {
    title: `${name} — Capriole Perfumes`,
    description: `Explore the ${name} fragrance collection from Capriole Perfumes.`,
  }
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params
  const products = await fetchProductsByCollection(slug)
  const displayName = getDisplayName(slug)

  return (
    <CollectionClient
      products={products}
      displayName={displayName}
      slug={slug}
    />
  )
}
