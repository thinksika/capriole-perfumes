interface FragrancePyramidProps {
  topNotes: string[]
  heartNotes: string[]
  baseNotes: string[]
}

const NoteList = ({ notes }: { notes: string[] }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', justifyContent: 'center' }}>
    {notes.map((note) => (
      <span
        key={note}
        style={{
          fontSize: '0.75rem',
          color: '#B8B0A3',
          padding: '0.25rem 0.625rem',
          border: '1px solid #252525',
          letterSpacing: '0.05em',
          fontFamily: 'DM Sans, sans-serif',
        }}
      >
        {note}
      </span>
    ))}
  </div>
)

export default function FragrancePyramid({ topNotes, heartNotes, baseNotes }: FragrancePyramidProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, padding: '1.5rem 0' }}>
      {/* TOP */}
      {topNotes.length > 0 && (
        <>
          <div className="pyramid-tier" style={{ width: '100%' }}>
            <div style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#B8973A', marginBottom: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>TOP NOTES</div>
            <NoteList notes={topNotes} />
            <div style={{ fontSize: '0.625rem', color: '#7A7570', letterSpacing: '0.12em', marginTop: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>First impression</div>
          </div>
          <div className="pyramid-connector" />
        </>
      )}

      {/* HEART */}
      {heartNotes.length > 0 && (
        <>
          <div className="pyramid-tier" style={{ width: '100%' }}>
            <div style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#B8973A', marginBottom: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>HEART NOTES</div>
            <NoteList notes={heartNotes} />
            <div style={{ marginTop: '0.75rem', fontSize: '0.625rem', color: '#7A7570', letterSpacing: '0.12em', fontFamily: 'DM Sans, sans-serif' }}>The character</div>
          </div>
          <div className="pyramid-connector" />
        </>
      )}

      {/* BASE */}
      {baseNotes.length > 0 && (
        <div className="pyramid-tier" style={{ width: '100%' }}>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: '#B8973A', marginBottom: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>BASE NOTES</div>
          <NoteList notes={baseNotes} />
          <div style={{ marginTop: '0.75rem', fontSize: '0.625rem', color: '#7A7570', letterSpacing: '0.12em', fontFamily: 'DM Sans, sans-serif' }}>The lasting impression</div>
        </div>
      )}
    </div>
  )
}
