export interface JournalArticle {
  id: string
  slug: string
  title: string
  category: string
  excerpt: string
  content: string
  coverImage: string
  publishedAt: string
  author: string
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: '1',
    slug: 'art-of-choosing-signature-scent',
    title: 'THE ART OF CHOOSING A SIGNATURE SCENT',
    category: 'FRAGRANCE GUIDE',
    excerpt: 'Your signature scent is your invisible aura. Discover how to select a fragrance that harmonises with your skin chemistry and personal aesthetic.',
    content: `A signature scent is more than a fragrance — it is a personal statement, a sensory impression that lingers in a room long after you leave. At Capriole, we view the choice of a signature scent as an intimate ritual of self-discovery.

### 1. Understand Olfactory Families
Fragrances are broadly grouped into main families: Oriental Oud & Amber, Floral & Rose, Woody & Earthy, Fresh & Citrus, and Sweet Gourmand. Begin by noticing which scents evoke comfort or confidence in your daily life.
- **Oud & Amber**: Command presence with warmth, resinous depth, and majestic spice.
- **Floral & Rose**: Evoke timeless elegance, romance, and fresh theatrical sophistication (e.g. *Rose Kabuki*).
- **Woody**: Offer grounded strength with cedar, sandalwood, and patchouli notes.

### 2. Test on Skin, Not Paper
Blotter strips provide an initial impression, but fragrance evolves uniquely when exposed to your body heat and natural skin oils. Always apply to pulse points — wrists, inner elbows, and neck — and allow 30 minutes for the heart and base notes to unfold.

### 3. Match Scent to Lifestyle & Occasion
Consider your routine. An everyday signature should feel effortless and refined, while an evening fragrance can embrace bolder projection and opulent intensity.

Explore Capriole's Discovery Quiz or Sample Sets to experience our scents in your own rhythm before making your final selection.`,
    coverImage: '/images/editorial/about-hero.png',
    publishedAt: '2026-03-15',
    author: 'Capriole Parfums',
  },
  {
    id: '2',
    slug: 'extrait-vs-eau-de-parfum',
    title: 'EXTRAIT VS EAU DE PARFUM',
    category: 'HAUTE PARFUMERIE',
    excerpt: 'Demystifying perfume concentration, oil ratios, longevity, and how to choose the right concentration for your daily ritual.',
    content: `When exploring fine fragrance, understanding concentration is essential. The distinction between Extrait de Parfum and Eau de Parfum defines not only longevity, but how the scent projects around you.

### Extrait de Parfum (20% – 40% Concentration)
Extrait de Parfum represents the pinnacle of perfume artistry. Formulated with the highest ratio of pure fragrance oils:
- **Longevity**: 10 to 14+ hours on skin.
- **Scent Trail**: Sits closer to the wearer, creating an intimate, opulent aura rather than a loud cloud.
- **Best For**: Special evening events, cold climates, and true connoisseurs.

### Eau de Parfum (15% – 20% Concentration)
Eau de Parfum delivers the ideal balance between projection and enduring wear:
- **Longevity**: 7 to 10 hours.
- **Scent Trail**: Radiates beautifully with excellent sillage.
- **Best For**: Versatile daily luxury, business settings, and social engagements.

At Capriole, every bottle is crafted with pure, uncompromised fragrance oils sourced from Grasse and Dubai to ensure exceptional depth regardless of concentration.`,
    coverImage: '/images/editorial/hero.png',
    publishedAt: '2026-03-01',
    author: 'Capriole Parfums',
  },
  {
    id: '3',
    slug: 'make-fragrance-last-longer',
    title: 'HOW TO MAKE YOUR FRAGRANCE LAST LONGER',
    category: 'FRAGRANCE RITUALS',
    excerpt: 'Master the art of fragrance application. Professional secrets to double the sillage and longevity of your favourite perfume.',
    content: `Unlocking maximum longevity from your fragrance requires subtle technique. Here are five essential practices used by master perfumers:

1. **Hydrate Your Skin First**: Fragrance molecules bind to lipids. Apply an unscented moisturiser or body oil prior to spraying your perfume.
2. **Target Pulse Points**: Focus on warm areas where blood vessels sit close to the skin: the neck, wrists, inner elbows, and behind the knees.
3. **Never Rub Your Wrists**: Rubbing creates friction and heat that breaks down top notes (like bergamot and saffron), distorting the opening development.
4. **Mist Hair and Garments**: Natural fabrics like wool, cashmere, and silk hold fragrance molecules for days.
5. **Store Away from Light and Heat**: Keep your fragrance bottles in a cool, dark drawer or display cabinet away from bathroom humidity to preserve essential oils.`,
    coverImage: '/images/collections/oud.png',
    publishedAt: '2026-02-20',
    author: 'Capriole Parfums',
  },
  {
    id: '4',
    slug: 'art-of-fragrance-layering',
    title: 'THE ART OF FRAGRANCE LAYERING',
    category: 'CUSTOM BLENDS',
    excerpt: 'Create a bespoke scent profile that is entirely your own by combining complementary notes and accords.',
    content: `Fragrance layering — known in French perfumery as *marriage d'effluves* — allows you to create a personalized olfactory signature.

### The Rule of Base Notes
When combining two fragrances, always apply the richer, heavier scent first. For example, spray a deep Oud or Amber base (*Capriole Atlas Dubai*), allow it to settle for two minutes, then layer a fresh floral (*Rose Kabuki*) on top.

### Complementary Combinations
- **Wood & Rose**: Sandalwood or cedarwood adds earthy structure to delicate rose petals.
- **Citrus & Musk**: Bright citrus top notes inject energy into warm, skin-like musk notes.
- **Vanilla & Oud**: Sweet vanilla softens the resinous smoke of natural agarwood.

Experiment in small amounts until you discover a combination that feels uniquely yours.`,
    coverImage: '/images/collections/floral.png',
    publishedAt: '2026-02-10',
    author: 'Capriole Parfums',
  },
  {
    id: '5',
    slug: 'french-arabian-fragrance-styles',
    title: 'FRENCH & ARABIAN FRAGRANCE STYLES',
    category: 'OLFACTORY CULTURE',
    excerpt: 'Exploring the fusion of French refinement and Arabian grandeur in modern luxury perfumery.',
    content: `The house of Capriole sits at the intersection of two legendary perfume traditions: French Haute Parfumerie and Arabian Oud culture.

### The French Tradition
French perfumery emphasizes light, delicate openings, intricate pyramid structures, and poetic floral bouquets. It is understated, polished, and structured.

### The Arabian Heritage
Arabian perfumery embraces opulent raw materials — Cambodian oud, Taif rose, saffron, ambergris, and frankincense. It is rich, enduring, and celebrated for powerful projection.

### The Capriole Harmony
By marrying French floral elegance with Arabian amber and oud foundations, Capriole creates modern fragrances that are both sophisticated and deeply captivating.`,
    coverImage: '/images/collections/musk-amber.png',
    publishedAt: '2026-01-28',
    author: 'Capriole Parfums',
  },
  {
    id: '6',
    slug: 'fragrance-for-every-occasion',
    title: 'FRAGRANCE FOR EVERY OCCASION',
    category: 'STYLE & WARDROBE',
    excerpt: 'Curating an essential fragrance wardrobe for daytime meetings, evening galas, and weekend escapes.',
    content: `Just as your wardrobe adapts to the environment and dress code, so too should your fragrance selection.

- **The Executive Meeting**: Choose a crisp, refined EDP with clean cedarwood or powdery rose that projects authority without overwhelming the room.
- **The Evening Gala**: Embrace an Extrait de Parfum featuring golden amber, dark oud, or rich honey notes (*Capriole Scandal*).
- **Weekend Relaxation**: Opt for fresh citrus, green tea, or soft white musk for effortless comfort.

Building a 3-bottle fragrance wardrobe ensures you are impeccably scented for every moment.`,
    coverImage: '/images/editorial/hero.png',
    publishedAt: '2026-01-12',
    author: 'Capriole Parfums',
  },
]
