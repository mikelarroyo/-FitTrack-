import { useNavigate, useParams, Link } from 'react-router-dom'
import { useWorkouts } from '../context/WorkoutContext'

export default function WorkoutDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { workouts, deleteWorkout } = useWorkouts()
  
  const workout = workouts.find(w => w.id === id)

  if (!workout) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Entrenamiento no encontrado</h2>
        <Link to="/" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>
          Volver al inicio
        </Link>
      </div>
    )
  }

  const handleDelete = () => {
    if (confirm('¿Estás seguro de eliminar este entrenamiento?')) {
      deleteWorkout(id)
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
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          {categoryEmojis[workout.category]} {workout.name}
        </h1>
        <div style={{ fontSize: '1rem', opacity: 0.9 }}>
          📅 {new Date(workout.date).toLocaleDateString('es-ES', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          })}, {workout.time}
        </div>
        <div style={{ fontSize: '1rem', opacity: 0.9 }}>
          ⏱️ Duración: {workout.duration} minutos
        </div>
      </div>

      {/* Stats Grid */}
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

      {/* Exercises List */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Ejercicios realizados
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
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: '1.6' }}>
              {exercise.series} series × {exercise.reps} reps × {exercise.weight}kg
              <br />
              <span style={{ color: 'var(--text-muted)' }}>
                Vol: {(exercise.series * exercise.reps * exercise.weight).toLocaleString()}kg
              </span>
            </div>
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

      {/* Notes Section (if needed) */}
      {workout.notes && (
        <div style={{
          backgroundColor: '#fefce8',
          border: '1px solid var(--accent-yellow)',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#854d0e' }}>
            📝 Notas:
          </div>
          <div style={{ color: '#854d0e', fontSize: '0.9375rem' }}>
            {workout.notes}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '1rem' }}>
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
          ✏️ Editar
        </Link>
        
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
