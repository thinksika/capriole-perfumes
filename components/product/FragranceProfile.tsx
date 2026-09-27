interface ProfileBar {
  label: string
  value: number
}

interface FragranceProfileProps {
  freshness?: number | null
  sweetness?: number | null
  warmth?: number | null
  woody?: number | null
  spicy?: number | null
  projection?: number | null
  longevity?: number | null
}

function ScaleBar({ label, value }: ProfileBar) {
  return (
    <div className="profile-bar">
      <span className="profile-bar-label">{label}</span>
      <div className="scale-bar-track">
        <div className="scale-bar-fill" style={{ width: `${value * 10}%` }} />
      </div>
      <span className="profile-bar-value">{value}/10</span>
    </div>
  )
}

export default function FragranceProfile({
  freshness, sweetness, warmth, woody, spicy, projection, longevity
}: FragranceProfileProps) {
  const bars = [
    { label: 'Freshness', value: freshness },
    { label: 'Sweetness', value: sweetness },
    { label: 'Warmth', value: warmth },
    { label: 'Woody', value: woody },
    { label: 'Spicy', value: spicy },
    { label: 'Projection', value: projection },
    { label: 'Longevity', value: longevity },
  ].filter(b => b.value != null) as ProfileBar[]

  if (!bars.length) return null

  return (
    <div style={{ padding: '1.5rem 0' }}>
      {bars.map(bar => (
        <ScaleBar key={bar.label} label={bar.label} value={bar.value} />
      ))}
    </div>
  )
}
