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
      <div className="card-hover" style={{
        backgroundColor: 'var(--card-bg)',
        border: '2px solid var(--border-color)',
        borderRadius: '20px',
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 2px 8px var(--shadow)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)'
        e.currentTarget.style.boxShadow = '0 12px 32px var(--shadow)'
        e.currentTarget.style.borderColor = accentColor
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)'
        e.currentTarget.style.boxShadow = '0 2px 8px var(--shadow)'
        e.currentTarget.style.borderColor = 'var(--border-color)'
      }}
      >
        {/* Gradient Background Accent */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '6px',
          background: `linear-gradient(90deg, ${accentColor}, transparent)`,
          borderRadius: '20px 20px 0 0'
        }} />

        {/* Accent Circle */}
        <div style={{
          position: 'absolute',
          right: '-30px',
          top: '-30px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          backgroundColor: accentColor,
          opacity: '0.08',
          transition: 'all 0.3s ease'
        }} />

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem',
              marginBottom: '0.75rem'
            }}>
              <h3 style={{ 
                fontSize: '1.375rem', 
                fontWeight: '700',
                color: 'var(--text-primary)',
                margin: 0
              }}>
                {workout.name}
              </h3>
            </div>
            
            {!isTemplate && workout.date && (
              <div style={{ 
                color: 'var(--text-muted)', 
                fontSize: '0.875rem', 
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                flexWrap: 'wrap'
              }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.25rem 0.625rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: '8px'
                }}>
                  📅 {new Date(workout.date).toLocaleDateString('es-ES', { 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </span>
                {workout.time && (
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    padding: '0.25rem 0.625rem',
                    backgroundColor: 'var(--bg-tertiary)',
                    borderRadius: '8px'
                  }}>
                    🕐 {workout.time}
                  </span>
                )}
              </div>
            )}

            <div style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '0.9375rem', 
              lineHeight: '1.7',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '500'
              }}>
                <span style={{ 
                  color: accentColor,
                  fontSize: '1.25rem'
                }}>💪</span>
                <span>{workout.exercises.length} ejercicios</span>
                {!isTemplate && workout.duration && (
                  <>
                    <span style={{ color: 'var(--text-muted)' }}>•</span>
                    <span>⏱️ {workout.duration} min</span>
                  </>
                )}
              </div>
              
              {!isTemplate && workout.totalVolume > 0 && (
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.875rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: '10px',
                  fontWeight: '600',
                  width: 'fit-content',
                  fontSize: '1rem'
                }}>
                  <span style={{ fontSize: '1.25rem' }}>🏋️</span>
                  <span style={{ color: accentColor }}>
                    {workout.totalVolume.toLocaleString()}kg
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    volumen total
                  </span>
                </div>
              )}
              
              {isTemplate && (
                <div style={{ 
                  color: 'var(--text-muted)', 
                  fontSize: '0.875rem',
                  fontStyle: 'italic',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem'
                }}>
                  <span>✨</span>
                  Plantilla lista para usar
                </div>
              )}
            </div>
          </div>

          {isTemplate && (
            <div style={{
              background: 'linear-gradient(135deg, #818cf8, #6366f1)',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '12px',
              fontSize: '0.8125rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              📝 Plantilla
            </div>
          )}

          {!isTemplate && workout.completed && (
            <div style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '12px',
              fontSize: '0.8125rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              ✓ Completado
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
