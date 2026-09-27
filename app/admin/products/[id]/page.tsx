import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma/db'
import ProductForm from '../ProductForm'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = await prisma.product.findUnique({ where: { id } })
  return { title: product ? `Edit: ${product.name}` : 'Edit Product' }
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params
  let product: any = null
  try {
    product = await prisma.product.findUnique({ where: { id } })
  } catch {}
  if (!product) notFound()

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '0.5rem' }}>PRODUCTS</div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#F4F0E8', fontWeight: 300 }}>EDIT PRODUCT</h1>
      </div>
      <ProductForm product={product} />
    </div>
  )
}
