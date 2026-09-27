import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding Capriole Perfumes database...')

  // Store settings
  const existingSettings = await prisma.storeSettings.findFirst()
  if (!existingSettings) {
    await prisma.storeSettings.create({
      data: {
        businessName: 'Capriole Perfumes',
        tagline: 'The Art of Leaving an Impression.',
        phone: '+233547151094',
        whatsappNumber: '+233547151094',
        instagram: '@capriole_perfumes.gh',
        website: 'https://www.caprioleperfumes.com',
        address: 'Adabraka, Accra, Ghana',
        deliveryEnabled: true,
        pickupEnabled: true,
      },
    })
    console.log('Created store settings')
  }

  // Admin user
  const existingAdmin = await prisma.adminUser.findFirst()
  if (!existingAdmin) {
    const hashed = await bcrypt.hash('Capriole2026!', 12)
    await prisma.adminUser.create({
      data: {
        email: 'admin@caprioleperfumes.com',
        password: hashed,
        name: 'Capriole Admin',
      },
    })
    console.log('Created admin user: admin@caprioleperfumes.com / Capriole2026!')
  }

  // 15% discount for applicable products
  let discount15: { id: string } | null = await prisma.discount.findFirst({ where: { name: '15% Launch Discount' } })
  if (!discount15) {
    discount15 = await prisma.discount.create({
      data: {
        name: '15% Launch Discount',
        type: 'percentage',
        value: 15,
        scope: 'product',
        active: true,
      },
    })
    console.log('Created 15% discount')
  }

  // Products
  const productsData = [
    {
      name: 'Capriole Atlas Dubai',
      slug: 'capriole-atlas-dubai',
      brand: 'Capriole',
      price: 1800,
      currency: 'GHS',
      gender: 'unisex',
      category: 'edp',
      collection: 'Oud',
      fragranceFamily: 'Oriental Woody Amber',
      description: 'A rich, warm and luxurious blend that captures the essence of Arabian sophistication — golden amber and oud with a velvety musk base.',
      shortDescription: 'Arabian sophistication in a bottle. Golden amber and oud with a velvety musk base.',
      topNotes: JSON.stringify(['Saffron', 'Bergamot']),
      heartNotes: JSON.stringify(['Amber', 'Cedarwood']),
      baseNotes: JSON.stringify(['Oud', 'Musk', 'Tonka Bean']),
      mainAccords: JSON.stringify(['Royal', 'Deep', 'Opulent']),
      character: JSON.stringify(['Royal', 'Deep', 'Opulent']),
      bestFor: JSON.stringify(['Evenings', 'Events', 'Cooler weather', 'Special occasions']),
      intensity: 9,
      projection: 8,
      longevity: 9,
      freshness: 2,
      sweetness: 4,
      warmth: 9,
      woody: 8,
      spicy: 7,
      stockQuantity: 20,
      stockStatus: 'in_stock',
      featured: true,
      bestSeller: true,
      newArrival: false,
      sampleAvailable: true,
      published: true,
    },
    {
      name: 'Capriole Scandal',
      slug: 'capriole-scandal',
      brand: 'Capriole',
      price: 1200,
      currency: 'GHS',
      volume: '200ml',
      gender: 'women',
      category: 'edp',
      collection: 'Sweet Gourmand Floral',
      fragranceFamily: 'Floral Woody',
      description: 'A bold honey-gourmand fragrance with a style reminiscent of Scandal by Jean Paul Gaultier. Sweet, playful and unapologetically bold.',
      shortDescription: 'Bold honey-gourmand. Sweet, playful and unforgettable.',
      topNotes: JSON.stringify(['Blood Orange', 'Mandarin']),
      heartNotes: JSON.stringify(['Honey', 'Gardenia', 'Jasmine', 'Orange Blossom', 'Peach']),
      baseNotes: JSON.stringify(['Beeswax', 'Caramel', 'Patchouli', 'Liquorice']),
      mainAccords: JSON.stringify(['Sweet', 'Honey', 'Floral', 'Patchouli']),
      character: JSON.stringify(['Sexy', 'Playful', 'Bold']),
      bestFor: JSON.stringify(['Nightlife', 'Parties', 'Clubbing']),
      intensity: 8,
      projection: 8,
      longevity: 8,
      freshness: 4,
      sweetness: 9,
      warmth: 6,
      woody: 3,
      spicy: 3,
      stockQuantity: 15,
      stockStatus: 'in_stock',
      featured: true,
      bestSeller: false,
      newArrival: true,
      sampleAvailable: true,
      published: true,
    },
    {
      name: 'Rose Kabuki',
      slug: 'rose-kabuki',
      brand: 'Capriole',
      price: 1200,
      currency: 'GHS',
      gender: 'women',
      category: 'edp',
      collection: 'Floral',
      fragranceFamily: 'Floral Woody',
      concentration: 'Eau de Parfum',
      description: 'A soft, elegant fragrance that balances floral freshness with a powdery theatrical feel. Pure fragrance oil concentration of 15%. Ideal for daily wear in office settings.',
      shortDescription: 'Elegant and refined. Floral freshness with a powdery, theatrical character.',
      topNotes: JSON.stringify(['Cassis']),
      heartNotes: JSON.stringify(['Fresh Rose']),
      baseNotes: JSON.stringify(['Musk']),
      mainAccords: JSON.stringify(['Floral', 'Powdery', 'Rose']),
      character: JSON.stringify(['Elegant', 'Sophisticated', 'Refined']),
      bestFor: JSON.stringify(['Daytime', 'Office', 'Elegant occasions']),
      intensity: 5,
      projection: 5,
      longevity: 7,
      freshness: 7,
      sweetness: 4,
      warmth: 3,
      woody: 4,
      spicy: 1,
      stockQuantity: 12,
      stockStatus: 'in_stock',
      featured: true,
      bestSeller: false,
      newArrival: false,
      sampleAvailable: true,
      published: true,
    },
  ]

  for (const productData of productsData) {
    const existing = await prisma.product.findUnique({ where: { slug: productData.slug } })
    if (!existing) {
      const product = await prisma.product.create({ data: productData })
      console.log(`Created product: ${product.name}`)

      // Apply 15% discount to Scandal and Rose Kabuki
      if (['capriole-scandal', 'rose-kabuki'].includes(productData.slug) && discount15) {
        await prisma.productDiscount.create({
          data: { productId: product.id, discountId: discount15.id },
        })
        console.log(`Applied 15% discount to ${product.name}`)
      }
    }
  }

  // Collections
  const collectionsData = [
    { name: 'Floral', slug: 'floral', description: 'Light, romantic and feminine.', philosophy: 'Beauty in bloom.', image: '/images/collections/floral.png', sortOrder: 1 },
    { name: 'Musk & Amber', slug: 'musk-amber', description: 'Warm, sensual and enveloping.', philosophy: 'Warmth with depth.', image: '/images/collections/musk-amber.png', sortOrder: 2 },
    { name: 'Woody', slug: 'woody', description: 'Grounded, warm and sophisticated.', philosophy: 'Earthy timelessness.', image: '/images/collections/oud.png', sortOrder: 3 },
    { name: 'Oud', slug: 'oud', description: 'Rich, opulent and commanding.', philosophy: 'The sacred wood of the East.', image: '/images/collections/oud.png', sortOrder: 4 },
    { name: 'Fresh & Citrus', slug: 'fresh-citrus', description: 'Clean, crisp and energising.', philosophy: 'Clarity in motion.', image: '/images/editorial/hero.png', sortOrder: 5 },
    { name: 'Sweet & Gourmand', slug: 'sweet-gourmand', description: 'Playful, bold and indulgent.', philosophy: 'Life is sweet.', image: '/images/collections/musk-amber.png', sortOrder: 6 },
  ]

  for (const col of collectionsData) {
    const existing = await prisma.collection.findUnique({ where: { slug: col.slug } })
    if (!existing) {
      await prisma.collection.create({ data: col })
      console.log(`Created collection: ${col.name}`)
    }
  }

  // Journal placeholder posts
  const journalPosts = [
    {
      title: 'The Art of Choosing a Signature Scent',
      slug: 'art-of-choosing-signature-scent',
      excerpt: 'Your signature scent should feel like a second skin. Here is how to find the one that truly speaks for you.',
      content: 'A signature scent is more than a fragrance. It is an extension of your identity, a sensory signature that people associate with you long after you have left the room. The art of choosing one lies in understanding your own personality, lifestyle and the impression you wish to leave.\n\nBegin with the fragrance families that resonate with you instinctively. Are you drawn to warm, enveloping oud and amber, or do you prefer the crisp clarity of fresh and citrus? Neither is wrong — both are simply different expressions of the self.\n\nNext, consider the occasions you dress for most. A fragrance for the office should be refined and not overpowering. An evening fragrance can afford to be bolder, deeper, more theatrical.\n\nAt Capriole, we recommend sampling before committing. Our discovery sets allow you to explore over 40 scents in the comfort of your own home and routine, so your signature choice is truly yours.',
      author: 'Capriole Perfumes',
      published: true,
      publishedAt: new Date('2026-01-15'),
    },
    {
      title: 'Extrait vs Eau de Parfum — What is the Difference?',
      slug: 'extrait-vs-eau-de-parfum',
      excerpt: 'Understanding fragrance concentration changes how you wear, layer and purchase perfume.',
      content: 'The world of fragrance concentrations can feel like an exclusive language — Extrait de Parfum, Eau de Parfum, Eau de Toilette. Each term refers to the percentage of pure fragrance oil in the formula, and understanding this changes everything about how you experience a scent.\n\nExtrait de Parfum (Perfume Extract) contains the highest concentration of fragrance oil, typically 20–40%. Applied in small amounts, it lasts all day and often evolves beautifully on the skin through its dry-down phases.\n\nEau de Parfum (EDP) sits at 15–20% concentration — the sweet spot for most wearers. It delivers excellent longevity and projection without the intensity of a full extract.\n\nAt Capriole, our Rose Kabuki is formulated as a 15% pure fragrance oil concentration Eau de Parfum — powerful enough to last, refined enough for daily wear.',
      author: 'Capriole Perfumes',
      published: true,
      publishedAt: new Date('2026-02-10'),
    },
    {
      title: 'How to Make Your Fragrance Last Longer',
      slug: 'make-fragrance-last-longer',
      excerpt: 'Simple techniques that extend the life of your favourite scent throughout the day.',
      content: 'A beautiful fragrance deserves to last. Here are the techniques that make a real difference.\n\nApply to pulse points. The warmth of your skin at wrists, neck, behind the ears and at the inner elbows helps project and sustain the scent.\n\nMoisturise first. Fragrance lasts longer on hydrated skin. Apply an unscented lotion before your perfume for an extended wear time.\n\nDo not rub. After applying, resist the urge to rub your wrists together. This breaks down the fragrance molecules and shortens longevity.\n\nStore correctly. Keep your fragrances away from direct sunlight and extreme temperatures. A cool, dark drawer is ideal.\n\nLayer. Start with a matching body lotion or use complementary fragrance families to build a more complex, long-lasting effect.\n\nAt Capriole, our fragrances are formulated for high performance — long-lasting and genuine.',
      author: 'Capriole Perfumes',
      published: false,
    },
  ]

  for (const post of journalPosts) {
    const existing = await prisma.journalPost.findUnique({ where: { slug: post.slug } })
    if (!existing) {
      await prisma.journalPost.create({ data: post })
      console.log(`Created journal post: ${post.title}`)
    }
  }

  // Homepage config
  const existingHomepage = await prisma.homepageConfig.findFirst()
  if (!existingHomepage) {
    await prisma.homepageConfig.create({ data: {} })
    console.log('Created homepage config')
  }

  console.log('Seed complete.')
}

main().catch(console.error).finally(() => prisma.$disconnect())
