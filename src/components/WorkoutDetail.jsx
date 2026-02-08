import { useNavigate, useParams, Link } from 'react-router-dom'
import { useWorkouts } from '../context/WorkoutContext'

export default function WorkoutDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { templates, sessions, deleteTemplate, deleteSession } = useWorkouts()
  
  // Determinar si es template o session basado en el path
  const isTemplate = window.location.pathname.includes('/template/')
  const workout = isTemplate 
    ? templates.find(t => t.id === id)
    : sessions.find(s => s.id === id)

  if (!workout) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
          {isTemplate ? 'Plantilla no encontrada' : 'Sesión no encontrada'}
        </h2>
        <Link to="/" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>
          Volver al inicio
        </Link>
      </div>
    )
  }

  const handleDelete = () => {
    const mensaje = isTemplate 
      ? '¿Eliminar esta plantilla? Las sesiones completadas se mantendrán.'
      : '¿Eliminar este entrenamiento completado?'
    
    if (confirm(mensaje)) {
      if (isTemplate) {
        deleteTemplate(id)
      } else {
        deleteSession(id)
      }
      navigate('/')
    }
  }

  const accentColors = {
    pierna: 'var(--accent-orange)',
    torso: 'var(--accent-green)',
    fullbody: 'var(--accent-blue)'
  }

  const categoryEmojis = {
    pierna: '🦵',
    torso: '💪',
    fullbody: '🏋️'
  }

  return (
    <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        backgroundColor: accentColors[workout.category] || 'var(--accent-blue)',
        color: 'white',
        padding: '2rem',
        borderRadius: '16px',
        marginBottom: '1.5rem'
      }}>
        <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>
          {isTemplate ? '📝 Plantilla' : '✅ Entrenamiento Completado'}
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          {categoryEmojis[workout.category]} {workout.name}
        </h1>
        
        {!isTemplate && workout.date && (
          <>
            <div style={{ fontSize: '1rem', opacity: 0.9 }}>
              📅 {new Date(workout.date).toLocaleDateString('es-ES', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}, {workout.time}
            </div>
            {workout.duration && (
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>
                ⏱️ Duración: {workout.duration} minutos
              </div>
            )}
          </>
        )}
      </div>

      {/* Stats Grid - Solo para sesiones completadas */}
      {!isTemplate && (
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              💪 {workout.totalVolume.toLocaleString()} kg
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              Volumen total
            </div>
          </div>
          <div style={{ borderLeft: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              🏋️ {workout.exercises.length}
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              Ejercicios
            </div>
          </div>
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              🔥 {Math.round(workout.totalVolume * 0.08)} kcal
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              Estimadas
            </div>
          </div>
        </div>
      )}

      {/* Start Button - Solo para plantillas */}
      {isTemplate && (
        <Link to={`/start/${workout.id}`} style={{
          display: 'block',
          padding: '1.5rem',
          backgroundColor: '#22c55e',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          textAlign: 'center',
          fontSize: '1.25rem',
          fontWeight: 'bold',
          boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          🚀 Comenzar Entrenamiento
        </Link>
      )}

      {/* Exercises List */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        {isTemplate ? 'Ejercicios de la plantilla' : 'Ejercicios realizados'}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {workout.exercises.map((exercise, index) => (
          <div key={index} style={{
            backgroundColor: 'var(--bg-primary)',
            border: '2px solid var(--border-color)',
            borderRadius: '12px',
            padding: '1.25rem'
          }}>
            <div style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {index + 1}. {exercise.name || 'Sin nombre'}
            </div>
            
            {isTemplate ? (
              // Vista de plantilla
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
                {exercise.series} series × {exercise.reps} reps
              </div>
            ) : (
              // Vista de sesión completada
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: '1.6' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  {exercise.series} series × {exercise.reps} reps
                </div>
                
                {/* Pesos por serie */}
                {exercise.weights && exercise.weights.length > 0 && (
                  <div style={{
                    backgroundColor: 'var(--bg-secondary)',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                      Pesos por serie:
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {exercise.weights.map((weight, idx) => (
                        <span key={idx} style={{
                          padding: '0.25rem 0.5rem',
                          backgroundColor: 'var(--bg-primary)',
                          borderRadius: '4px',
                          fontSize: '0.875rem',
                          fontFamily: 'monospace'
                        }}>
                          S{idx + 1}: {weight}kg
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Volumen del ejercicio */}
                <div style={{ color: 'var(--text-muted)' }}>
                  Vol: {exercise.weights 
                    ? exercise.weights.reduce((sum, w) => sum + (w * exercise.reps), 0).toFixed(1)
                    : 0}kg
                </div>
                
                {/* Notas del ejercicio */}
                {exercise.notes && (
                  <div style={{
                    marginTop: '0.5rem',
                    padding: '0.5rem',
                    backgroundColor: '#fefce8',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    color: '#854d0e'
                  }}>
                    💭 {exercise.notes}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {workout.exercises.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            color: 'var(--text-muted)',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '12px'
          }}>
            No hay ejercicios registrados
          </div>
        )}
      </div>

      {/* Notes Section - Solo para sesiones */}
      {!isTemplate && workout.notes && (
        <div style={{
          backgroundColor: '#fefce8',
          border: '1px solid var(--accent-yellow)',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#854d0e' }}>
            📝 Notas de la sesión:
          </div>
          <div style={{ color: '#854d0e', fontSize: '0.9375rem' }}>
            {workout.notes}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        {isTemplate && (
          <Link to={`/edit/${id}`} style={{
            flex: 1,
            padding: '1rem',
            backgroundColor: 'var(--accent-blue)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1.125rem',
            fontWeight: 'bold',
            textAlign: 'center',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-blue)'}
          >
            ✏️ Editar Plantilla
          </Link>
        )}
        
        <button
          onClick={handleDelete}
          style={{
            flex: 1,
            padding: '1rem',
            backgroundColor: 'var(--accent-red)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1.125rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-red)'}
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  )
}
