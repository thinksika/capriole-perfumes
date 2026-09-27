'use client'
import { useEffect, useState } from 'react'
import { CheckCircle } from 'lucide-react'

interface ToastProps {
  message: string
  duration?: number
  onClose?: () => void
}

export default function Toast({ message, duration = 3000, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onClose?.(), 300)
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div
      className="toast"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
      role="status"
      aria-live="polite"
    >
      <CheckCircle size={14} color="#C5A15A" />
      {message}
    </div>
  )
}
