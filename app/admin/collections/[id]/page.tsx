import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma/db'
import CollectionForm from '../CollectionForm'
export const metadata: Metadata = { title: 'Edit Collection' }
export default async function EditCollectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let collection: any = null
  let allProducts: any[] = []
  try {
    collection = await prisma.collection.findUnique({
      where: { id },
      include: { products: { include: { product: true } } },
    })
    allProducts = await prisma.product.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true, fragranceFamily: true } })
  } catch {}
  if (!collection) notFound()
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '0.5rem' }}>EDIT</div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#F4F0E8', fontWeight: 300 }}>{collection.name.toUpperCase()}</h1>
      </div>
      <CollectionForm collection={collection} allProducts={allProducts} />
    </div>
  )
}
