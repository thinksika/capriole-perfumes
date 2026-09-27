'use client'
import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ maxWidth: 360, width: '100%' }}>
        <p style={{ fontSize: '0.8rem', color: '#C5A15A', letterSpacing: '0.05em' }}>
          Thank you. You&apos;re now part of the house. ✓
        </p>
      </div>
    )
  }

  return (
    <form style={{ display: 'flex', gap: 0, maxWidth: 360, width: '100%' }} onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Your email address"
        required
        style={{
          flex: 1, background: '#101010', border: '1px solid #2a2a2a',
          borderRight: 'none', color: '#F4F0E8', padding: '0.75rem 1rem',
          fontSize: '0.8125rem', fontFamily: 'Inter, sans-serif',
        }}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          background: status === 'loading' ? '#9a7a3a' : '#C5A15A',
          color: '#070707', border: 'none',
          padding: '0.75rem 1.5rem', fontSize: '0.6rem', letterSpacing: '0.15em',
          fontFamily: 'Inter, sans-serif', fontWeight: 500,
          cursor: status === 'loading' ? 'wait' : 'pointer',
          transition: 'background 0.2s', whiteSpace: 'nowrap',
        }}
        className="newsletter-btn"
      >
        {status === 'loading' ? '...' : 'JOIN'}
      </button>
      {status === 'error' && (
        <p style={{ position: 'absolute', bottom: -20, fontSize: '0.7rem', color: '#e07070' }}>
          Something went wrong. Please try again.
        </p>
      )}
      <style>{`.newsletter-btn:hover { background: #D7BD80 !important; }`}</style>
    </form>
  )
}
