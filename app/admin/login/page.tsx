'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Check if already authenticated
  useEffect(() => {
    const isAuth = document.cookie.includes('capriole-admin=1') ||
      sessionStorage.getItem('capriole-admin') === '1'
    if (isAuth) router.replace('/admin')
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (res.ok) {
        sessionStorage.setItem('capriole-admin', '1')
        router.replace('/admin')
      } else {
        const data = await res.json()
        setError(data.error || 'Invalid credentials')
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#070707',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            width: 56, height: 56, border: '1px solid #C5A15A',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1rem',
          }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#C5A15A' }}>C</span>
          </div>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: '#9A978F' }}>CAPRIOLE PERFUMES — ADMIN</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ background: '#101010', border: '1px solid #1e1e1e', padding: '2.5rem' }}>
            <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C5A15A', marginBottom: '2rem', textAlign: 'center' }}>
              SIGN IN
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label htmlFor="admin-email" style={{ display: 'block', fontSize: '0.55rem', letterSpacing: '0.15em', color: '#9A978F', marginBottom: '0.5rem' }}>
                EMAIL ADDRESS
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@caprioleperfumes.com"
                required
                autoComplete="email"
              />
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label htmlFor="admin-password" style={{ display: 'block', fontSize: '0.55rem', letterSpacing: '0.15em', color: '#9A978F', marginBottom: '0.5rem' }}>
                PASSWORD
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div style={{
                background: 'rgba(224,112,112,0.08)', border: '1px solid rgba(224,112,112,0.25)',
                padding: '0.75rem 1rem', marginBottom: '1.25rem',
                fontSize: '0.75rem', color: '#e07070',
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', background: loading ? '#9a7a3a' : '#C5A15A',
                border: 'none', color: '#070707', padding: '0.9rem 2rem',
                fontSize: '0.6rem', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif',
                fontWeight: 500, cursor: loading ? 'wait' : 'pointer',
                transition: 'background 0.2s',
              }}
              className="signin-btn"
            >
              {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </div>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.7rem', color: '#9A978F' }}>
          Return to{' '}
          <a href="/" style={{ color: '#C5A15A', textDecoration: 'none' }}>the store →</a>
        </p>
      </div>
      <style>{`.signin-btn:hover { background: #D7BD80 !important; }`}</style>
    </div>
  )
}
