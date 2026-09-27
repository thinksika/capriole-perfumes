import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { fetchCollectionsWithProducts } from '@/lib/products/catalog'

export const metadata: Metadata = {
  title: 'Collections — Capriole Perfumes',
  description: 'Explore Capriole fragrance collections by scent family — Oud, Floral, Musk & Amber and more.',
}

/* Map slug → atmosphere image */
const COLLECTION_IMAGES: Record<string, string> = {
  'oud':            '/images/collections/oud-atmosphere.png',
  'floral':         '/images/collections/floral-atmosphere.png',
  'musk-amber':     '/images/collections/musk-atmosphere.png',
  'woody':          '/images/collections/oud.png',
  'sweet-gourmand': '/images/collections/musk-amber.png',
  'fresh-citrus':   '/images/collections/floral.png',
}

export default async function CollectionsPage() {
  const collections = await fetchCollectionsWithProducts()

  return (
    <div className="coll-root">
      <div className="container">
        {/* Header */}
        <div className="coll-header">
          <div className="coll-eyebrow">CAPRIOLE</div>
          <h1 className="coll-title">COLLECTIONS</h1>
          <p className="coll-subtitle">Explore by scent.</p>
        </div>

        {/* Grid */}
        <div className="coll-grid">
          {collections.map(col => {
            const img = COLLECTION_IMAGES[col.slug] || '/images/editorial/about.png'
            return (
              <Link
                key={col.slug}
                href={`/collections/${col.slug}`}
                className="coll-tile"
                aria-label={`${col.name} collection — ${col.count} fragrance${col.count !== 1 ? 's' : ''}`}
              >
                <div className="coll-tile-img-wrap">
                  <Image
                    src={img}
                    alt={col.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    className="coll-tile-img"
                  />
                  <div className="coll-tile-overlay" />
                </div>
                <div className="coll-tile-body">
                  <div className="coll-tile-eyebrow">COLLECTION</div>
                  <h2 className="coll-tile-name">{col.name.toUpperCase()}</h2>
                  <span className="coll-tile-cta">EXPLORE →</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <style>{`
        .coll-root {
          background: #070707;
          min-height: 100vh;
          padding: 4rem 0 7rem;
        }
        .coll-header {
          margin-bottom: 3.5rem;
        }
        .coll-eyebrow {
          font-size: 0.55rem;
          letter-spacing: 0.25em;
          color: #B8973A;
          margin-bottom: 0.6rem;
          font-family: DM Sans, sans-serif;
          text-transform: uppercase;
        }
        .coll-title {
          font-family: Playfair Display, Georgia, serif;
          font-size: clamp(2rem, 4vw, 3.5rem);
          color: #F0EBE0;
          font-weight: 400;
          margin-bottom: 0.5rem;
          line-height: 1.1;
        }
        .coll-subtitle {
          color: #7A7570;
          font-size: 0.875rem;
          font-family: DM Sans, sans-serif;
          margin: 0;
        }

        /* Grid */
        .coll-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        /* Tile */
        .coll-tile {
          display: block;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          background: #101010;
        }
        .coll-tile-img-wrap {
          position: relative;
          aspect-ratio: 4/5;
          overflow: hidden;
        }
        .coll-tile-img {
          transition: transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          filter: brightness(0.6);
        }
        .coll-tile:hover .coll-tile-img {
          transform: scale(1.05);
          filter: brightness(0.75);
        }
        .coll-tile-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(7,7,7,0.92) 0%, rgba(7,7,7,0.15) 55%, transparent 100%);
          pointer-events: none;
        }
        .coll-tile-body {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.75rem 1.5rem;
        }
        .coll-tile-eyebrow {
          font-size: 0.45rem;
          letter-spacing: 0.22em;
          color: #B8973A;
          margin-bottom: 0.4rem;
          font-family: DM Sans, sans-serif;
          text-transform: uppercase;
        }
        .coll-tile-name {
          font-family: Playfair Display, Georgia, serif;
          font-size: clamp(1.2rem, 2.5vw, 1.75rem);
          color: #F0EBE0;
          font-weight: 400;
          margin-bottom: 0.75rem;
          line-height: 1.15;
        }
        .coll-tile-cta {
          font-size: 0.55rem;
          letter-spacing: 0.18em;
          color: #B8973A;
          border-bottom: 1px solid rgba(184,151,58,0.4);
          padding-bottom: 2px;
          font-family: DM Sans, sans-serif;
          text-transform: uppercase;
          transition: color 0.2s, border-color 0.2s;
        }
        .coll-tile:hover .coll-tile-cta {
          color: #F0EBE0;
          border-color: rgba(240,235,224,0.4);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .coll-grid { grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
        }
        @media (max-width: 640px) {
          .coll-root { padding: 3rem 0 5rem; }
          .coll-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
          .coll-tile-body { padding: 1.25rem 1rem; }
          .coll-tile-name { font-size: 1rem; }
        }
        @media (max-width: 400px) {
          .coll-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
