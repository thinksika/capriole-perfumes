import { Metadata } from 'next'
import CollectionForm from '../CollectionForm'
export const metadata: Metadata = { title: 'New Collection' }
export default function NewCollectionPage() {
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '0.5rem' }}>NEW</div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#F4F0E8', fontWeight: 300 }}>CREATE COLLECTION</h1>
      </div>
      <CollectionForm />
    </div>
  )
}
