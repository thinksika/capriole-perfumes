import { Metadata } from 'next'
import ProductForm from '../ProductForm'

export const metadata: Metadata = { title: 'New Product' }

export default function NewProductPage() {
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '0.5rem' }}>PRODUCTS</div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#F4F0E8', fontWeight: 300 }}>NEW PRODUCT</h1>
      </div>
      <ProductForm />
    </div>
  )
}
