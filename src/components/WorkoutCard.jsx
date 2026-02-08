import { Link } from 'react-router-dom'

export default function WorkoutCard({ workout }) {
  const accentColors = {
    pierna: 'var(--accent-orange)',
    torso: 'var(--accent-green)',
    fullbody: 'var(--accent-blue)'
  }

  const accentColor = accentColors[workout.category] || 'var(--accent-blue)'

  return (
    <Link to={`/detail/${workout.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{
        backgroundColor: 'var(--bg-primary)',
        border: '2px solid var(--border-color)',
        borderRadius: '16px',
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
      >
        {/* Accent Line */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '6px',
          height: '100%',
          backgroundColor: accentColor,
          borderRadius: '16px 0 0 16px'
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1, paddingLeft: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {workout.name}
            </h3>
            
            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
              📅 {new Date(workout.date).toLocaleDateString('es-ES', { 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric' 
              })} • {workout.time || '18:30'}
            </div>

            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: '1.6' }}>
              <div>{workout.exercises.length} ejercicios | ⏱️ {workout.duration || 60} min</div>
              <div>💪 Volumen: {workout.totalVolume.toLocaleString()}kg</div>
            </div>
          </div>

          {workout.completed && (
            <div style={{
              backgroundColor: '#dcfce7',
              color: '#15803d',
              padding: '0.375rem 0.75rem',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: 'bold'
            }}>
              ✓ Completo
            </div>
          )}

          {workout.draft && (
            <div style={{
              backgroundColor: '#fef3c7',
              color: '#92400e',
              padding: '0.375rem 0.75rem',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: 'bold'
            }}>
              🏗️ Borrador
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
