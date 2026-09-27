import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.caprioleperfumes.com'),
  title: { default: 'Capriole Perfumes — The Art of Leaving an Impression', template: '%s | Capriole Perfumes' },
  description: 'Luxury French & Arabian fragrances curated for moments worth remembering. Shop Capriole Perfumes in Accra, Ghana.',
  keywords: ['perfumes', 'fragrances', 'Ghana', 'luxury perfumes', 'Arabic perfumes', 'French perfumes', 'Accra perfumes', 'Capriole Perfumes'],
  openGraph: {
    type: 'website',
    siteName: 'Capriole Perfumes',
    title: 'Capriole Perfumes — The Art of Leaving an Impression',
    description: 'Luxury French & Arabian fragrances curated for moments worth remembering.',
    images: [{ url: '/images/editorial/hero.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            '@id': 'https://www.caprioleperfumes.com',
            name: 'Capriole Perfumes',
            description: 'Luxury French & Arabian fragrances curated for moments worth remembering.',
            url: 'https://www.caprioleperfumes.com',
            telephone: '+233547151094',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Adabraka',
              addressLocality: 'Accra',
              addressCountry: 'GH',
            },
            openingHoursSpecification: [
              { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:30', closes: '18:00' },
              { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '14:00' },
            ],
            sameAs: ['https://www.instagram.com/capriole_perfumes.gh'],
            image: 'https://www.caprioleperfumes.com/images/editorial/hero.png',
            priceRange: 'GHS 1,000–GHS 1,800',
          }) }}
        />
      </head>
      <body style={{ background: '#070707' }}>
        <Header transparent={true} />
        <CartDrawer />
        <main style={{ paddingTop: 64 }}>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}

