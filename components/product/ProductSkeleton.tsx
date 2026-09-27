export default function ProductSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div className="skeleton" style={{ aspectRatio: '3/4', width: '100%' }} />
      <div className="skeleton" style={{ height: 8, width: '40%' }} />
      <div className="skeleton" style={{ height: 16, width: '80%' }} />
      <div className="skeleton" style={{ height: 10, width: '60%' }} />
      <div className="skeleton" style={{ height: 14, width: '35%' }} />
    </div>
  )
}
