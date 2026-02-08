import { Link } from 'react-router-dom'

export default function WorkoutCard({ workout }) {
  const accentColors = {
    pierna: 'var(--accent-orange)',
    torso: 'var(--accent-green)',
    fullbody: 'var(--accent-blue)'
  }

  const accentColor = accentColors[workout.category] || 'var(--accent-blue)'
  
  const isTemplate = workout.type === 'template'
  const linkPath = isTemplate ? `/template/${workout.id}` : `/session/${workout.id}`

  return (
    <Link to={linkPath} style={{ textDecoration: 'none', color: 'inherit' }}>
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
              {isTemplate && '📝 '}{workout.name}
            </h3>
            
            {!isTemplate && workout.date && (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                📅 {new Date(workout.date).toLocaleDateString('es-ES', { 
                  day: 'numeric', 
                  month: 'short', 
                  year: 'numeric' 
                })} • {workout.time || '18:30'}
              </div>
            )}

            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: '1.6' }}>
              <div>{workout.exercises.length} ejercicios {!isTemplate && workout.duration ? `| ⏱️ ${workout.duration} min` : ''}</div>
              {!isTemplate && workout.totalVolume > 0 && (
                <div>💪 Volumen: {workout.totalVolume.toLocaleString()}kg</div>
              )}
              {isTemplate && (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', marginTop: '0.25rem' }}>
                  Plantilla lista para usar
                </div>
              )}
            </div>
          </div>

          {isTemplate && (
            <div style={{
              backgroundColor: '#e0e7ff',
              color: '#3730a3',
              padding: '0.375rem 0.75rem',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: 'bold'
            }}>
              📝 Plantilla
            </div>
          )}

          {!isTemplate && workout.completed && (
            <div style={{
              backgroundColor: '#dcfce7',
              color: '#15803d',
              padding: '0.375rem 0.75rem',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: 'bold'
            }}>
              ✅ Completado
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
