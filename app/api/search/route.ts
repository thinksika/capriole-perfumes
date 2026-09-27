import { NextResponse } from 'next/server'
import { fetchAllProducts } from '@/lib/products/catalog'
import { searchProducts } from '@/lib/search/searchProducts'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q')?.trim() || ''

    if (!q) return NextResponse.json({ products: [] })

    const all = await fetchAllProducts()
    const products = searchProducts(all, { query: q })

    return NextResponse.json({ products })
  } catch (error) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
