'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const QUESTIONS = [
  {
    id: 'family',
    question: 'What scent families appeal to you?',
    options: [
      { label: 'Fresh & Clean', value: 'fresh' },
      { label: 'Floral', value: 'floral' },
      { label: 'Woody', value: 'woody' },
      { label: 'Oud & Oriental', value: 'oud' },
      { label: 'Musk', value: 'musk' },
      { label: 'Amber & Warm', value: 'amber' },
      { label: 'Sweet & Gourmand', value: 'sweet' },
    ],
  },
  {
    id: 'occasion',
    question: 'When will you wear it most?',
    options: [
      { label: 'Every day', value: 'everyday' },
      { label: 'Office & work', value: 'office' },
      { label: 'Date nights', value: 'date' },
      { label: 'Evening events', value: 'events' },
      { label: 'Special occasions', value: 'special' },
    ],
  },
  {
    id: 'feel',
    question: 'How should your fragrance feel?',
    options: [
      { label: 'Clean & refined', value: 'clean' },
      { label: 'Elegant & sophisticated', value: 'elegant' },
      { label: 'Sensual & intimate', value: 'sensual' },
      { label: 'Bold & powerful', value: 'powerful' },
      { label: 'Mysterious & deep', value: 'mysterious' },
      { label: 'Playful & vibrant', value: 'playful' },
    ],
  },
  {
    id: 'intensity',
    question: 'How strong should it be?',
    options: [
      { label: 'Subtle & soft', value: 'soft' },
      { label: 'Balanced', value: 'moderate' },
      { label: 'Strong presence', value: 'strong' },
      { label: 'Intense & commanding', value: 'intense' },
    ],
  },
]

const PROFILES: Record<string, { title: string; slug: string; name: string; desc: string; image: string; price: string }> = {
  oud: { title: 'THE ROYAL SOPHISTICATE', slug: 'capriole-atlas-dubai', name: 'Capriole Atlas Dubai', desc: 'Arabian sophistication. Golden amber and oud with a velvety musk base.', image: '/images/products/atlas-dubai.png', price: 'GHS 1,800.00' },
  amber: { title: 'THE WARM SENSUALIST', slug: 'capriole-atlas-dubai', name: 'Capriole Atlas Dubai', desc: 'Warm, opulent and deeply sensual. A perfect match for your profile.', image: '/images/products/atlas-dubai.png', price: 'GHS 1,800.00' },
  floral: { title: 'THE ROMANTIC', slug: 'rose-kabuki', name: 'Rose Kabuki', desc: 'Elegant and refined. Fresh rose with a powdery, theatrical finish.', image: '/images/products/kabuki.png', price: 'GHS 1,020.00' },
  woody: { title: 'THE REFINED NATURALIST', slug: 'rose-kabuki', name: 'Rose Kabuki', desc: 'Understated sophistication. Floral and woody in perfect balance.', image: '/images/products/kabuki.png', price: 'GHS 1,020.00' },
  musk: { title: 'THE QUIET PRESENCE', slug: 'rose-kabuki', name: 'Rose Kabuki', desc: 'Soft, skin-close and intimate. Made for quiet confidence.', image: '/images/products/kabuki.png', price: 'GHS 1,020.00' },
  fresh: { title: 'THE FREE SPIRIT', slug: 'capriole-scandal', name: 'Capriole Scandal', desc: 'Bold, bright and unforgettable. For those who make an impression.', image: '/images/products/scandal.png', price: 'GHS 1,020.00' },
  sweet: { title: 'THE BOLD INDIVIDUALIST', slug: 'capriole-scandal', name: 'Capriole Scandal', desc: 'Playful and indulgent. A fragrance that knows how to have fun.', image: '/images/products/scandal.png', price: 'GHS 1,020.00' },
}

export default function DiscoverPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<typeof PROFILES[string] | null>(null)

  const currentQ = QUESTIONS[step]

  const select = (value: string) => {
    const newAnswers = { ...answers, [currentQ.id]: value }
    setAnswers(newAnswers)
    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep(s => s + 1), 300)
    } else {
      const family = newAnswers.family || 'oud'
      setResult(PROFILES[family] || PROFILES.oud)
    }
  }

  const restart = () => { setStep(0); setAnswers({}); setResult(null) }

  return (
    <div style={{ minHeight: '100vh', background: '#070707', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: 640, width: '100%' }}>
        {!result ? (
          <>
            {/* Progress */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '3.5rem' }}>
              {QUESTIONS.map((_, i) => (
                <div key={i} style={{ flex: 1, height: 1, background: i <= step ? '#B8973A' : '#1c1c1c', transition: 'background 0.3s' }} />
              ))}
            </div>
            <div style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#B8973A', marginBottom: '1rem', fontFamily: 'DM Sans, sans-serif' }}>0{step + 1} / 0{QUESTIONS.length}</div>
            <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.5rem, 4vw, 2.35rem)', color: '#F0EBE0', fontWeight: 400, lineHeight: 1.15, marginBottom: '2.5rem' }}>{currentQ.question}</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {currentQ.options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => select(opt.value)}
                  className={`quiz-option ${answers[currentQ.id] === opt.value ? 'selected' : ''}`}
                  style={{ textAlign: 'left', fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.05rem', fontWeight: 400 }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)} style={{ marginTop: '2rem', background: 'none', border: 'none', fontSize: '0.625rem', letterSpacing: '0.18em', color: '#7A7570', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', padding: 0 }}>← BACK</button>
            )}
          </>
        ) : (
          <div>
            <div style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: '#B8973A', marginBottom: '1.25rem', fontFamily: 'DM Sans, sans-serif' }}>YOUR FRAGRANCE PROFILE</div>
            <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: '#F0EBE0', fontWeight: 400, lineHeight: 1.1, marginBottom: '2rem' }}>{result.title}</h2>
            <div style={{ width: 32, height: 1, background: '#B8973A', opacity: 0.5, marginBottom: '2.5rem' }} />
            
            <div style={{ background: '#101010', border: '1px solid #1c1c1c', display: 'grid', gridTemplateColumns: '160px 1fr', gap: '2rem', padding: '1.5rem', marginBottom: '2rem', alignItems: 'center' }}>
              <div style={{ position: 'relative', aspectRatio: '3/4', background: '#131313', border: '1px solid #1c1c1c', overflow: 'hidden' }}>
                <Image src={result.image} alt={result.name} fill style={{ objectFit: 'cover' }} sizes="160px" />
              </div>
              <div>
                <div style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#B8973A', marginBottom: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>RECOMMENDED FOR YOU</div>
                <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.25rem', color: '#F0EBE0', fontWeight: 400, marginBottom: '0.25rem' }}>{result.name}</div>
                <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1rem', color: '#C9AA5A', marginBottom: '0.75rem' }}>{result.price}</div>
                <p style={{ color: '#7A7570', fontSize: '0.8125rem', lineHeight: 1.7, marginBottom: '1.5rem', fontFamily: 'DM Sans, sans-serif' }}>{result.desc}</p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <Link href={`/product/${result.slug}`} style={{ display: 'inline-flex', alignItems: 'center', background: '#B8973A', color: '#070707', padding: '0.75rem 1.5rem', fontSize: '0.625rem', letterSpacing: '0.18em', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, transition: 'background 0.2s' }} className="result-primary-btn">VIEW FRAGRANCE</Link>
                  <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', background: 'transparent', border: '1px solid #252525', color: '#B8B0A3', padding: '0.75rem 1.5rem', fontSize: '0.625rem', letterSpacing: '0.18em', fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s' }} className="result-secondary-btn">SHOP ALL</Link>
                </div>
              </div>
            </div>

            <button onClick={restart} style={{ background: 'none', border: 'none', fontSize: '0.625rem', letterSpacing: '0.18em', color: '#7A7570', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', padding: 0, transition: 'color 0.2s' }} className="restart-btn">START AGAIN</button>
          </div>
        )}
      </div>
      <style>{`
        .result-primary-btn:hover { background: #C9AA5A !important; }
        .result-secondary-btn:hover { border-color: #B8973A !important; color: #B8973A !important; }
        .restart-btn:hover { color: #F0EBE0 !important; }
        @media (max-width: 640px) {
          div[style*="grid-template-columns: 160px 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
