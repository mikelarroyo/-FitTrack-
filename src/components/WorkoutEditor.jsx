import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useWorkouts } from '../context/WorkoutContext'

export default function WorkoutEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { workouts, addWorkout, updateWorkout } = useWorkouts()
  
  const [name, setName] = useState('')
  const [category, setCategory] = useState('pierna')
  const [duration, setDuration] = useState(60)
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    if (id) {
      const workout = workouts.find(w => w.id === id)
      if (workout) {
        setName(workout.name)
        setCategory(workout.category)
        setDuration(workout.duration || 60)
        setExercises(workout.exercises)
      }
    }
  }, [id, workouts])

  const addExercise = () => {
    setExercises([...exercises, { 
      name: '', 
      series: 3, 
      reps: 10, 
      weight: 0 
    }])
  }

  const updateExercise = (index, field, value) => {
    const newExercises = [...exercises]
    newExercises[index][field] = value
    setExercises(newExercises)
  }

  const removeExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index))
  }

  const calculateTotalVolume = () => {
    return exercises.reduce((sum, ex) => {
      const volume = (ex.series || 0) * (ex.reps || 0) * (ex.weight || 0)
      return sum + volume
    }, 0)
  }

  const handleSave = (isDraft = false) => {
    if (!name.trim()) {
      alert('Por favor, ingresa un nombre para la rutina')
      return
    }

    const workout = {
      id: id || Date.now().toString(),
      name,
      category,
      duration,
      exercises,
      totalVolume: calculateTotalVolume(),
      date: new Date().toISOString(),
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      completed: !isDraft,
      draft: isDraft
    }

    if (id) {
      updateWorkout(workout)
    } else {
      addWorkout(workout)
    }

    navigate('/')
  }

  return (
    <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        {id ? 'Editar Rutina' : 'Nueva Rutina'}
      </h1>

      {/* Form Section */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
          Nombre de la rutina
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Pierna Fuerza - 5x5"
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            border: '2px solid var(--text-muted)',
            borderRadius: '8px',
            marginBottom: '1rem',
            backgroundColor: 'var(--bg-primary)'
          }}
        />

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
              Categoría
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                border: '2px solid var(--text-muted)',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-primary)'
              }}
            >
              <option value="pierna">🦵 Pierna</option>
              <option value="torso">💪 Torso</option>
              <option value="fullbody">🏋️ Full Body</option>
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
              Duración (min)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                border: '2px solid var(--text-muted)',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-primary)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Exercises Section */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Ejercicios
      </h2>

      <div style={{
        backgroundColor: 'var(--bg-primary)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '1rem'
      }}>
        {/* Table Header */}
        <div style={{
          backgroundColor: 'var(--bg-dark)',
          color: 'white',
          padding: '0.75rem 1rem',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 60px',
          gap: '1rem',
          fontSize: '0.875rem',
          fontWeight: 'bold',
          fontFamily: 'monospace'
        }}>
          <div>Ejercicio</div>
          <div>Series</div>
          <div>Reps</div>
          <div>Peso(kg)</div>
          <div></div>
        </div>

        {/* Exercise Rows */}
        {exercises.map((exercise, index) => (
          <div key={index} style={{
            padding: '1rem',
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 60px',
            gap: '1rem',
            alignItems: 'center',
            backgroundColor: index % 2 === 0 ? 'var(--bg-secondary)' : 'var(--bg-primary)',
            fontFamily: 'monospace'
          }}>
            <input
              type="text"
              value={exercise.name}
              onChange={(e) => updateExercise(index, 'name', e.target.value)}
              placeholder="Nombre ejercicio"
              style={{
                padding: '0.5rem',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                fontSize: '0.9375rem'
              }}
            />
            <input
              type="number"
              value={exercise.series}
              onChange={(e) => updateExercise(index, 'series', parseInt(e.target.value) || 0)}
              style={{
                padding: '0.5rem',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                fontSize: '0.9375rem',
                textAlign: 'center'
              }}
            />
            <input
              type="number"
              value={exercise.reps}
              onChange={(e) => updateExercise(index, 'reps', parseInt(e.target.value) || 0)}
              style={{
                padding: '0.5rem',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                fontSize: '0.9375rem',
                textAlign: 'center'
              }}
            />
            <input
              type="number"
              value={exercise.weight}
              onChange={(e) => updateExercise(index, 'weight', parseFloat(e.target.value) || 0)}
              style={{
                padding: '0.5rem',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                fontSize: '0.9375rem',
                textAlign: 'center'
              }}
            />
            <button
              onClick={() => removeExercise(index)}
              style={{
                padding: '0.5rem',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.25rem'
              }}
            >
              🗑️
            </button>
          </div>
        ))}

        {/* Add Exercise Button */}
        <button
          onClick={addExercise}
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: 'var(--bg-secondary)',
            border: '2px dashed var(--border-color)',
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--border-color)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
        >
          + Añadir ejercicio
        </button>
      </div>

      {/* Volume Info */}
      <div style={{
        backgroundColor: '#eff6ff',
        border: '2px solid var(--accent-blue)',
        borderRadius: '12px',
        padding: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ fontWeight: 'bold', color: '#1e40af', fontSize: '1rem' }}>
          📊 Volumen total estimado
        </div>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e40af', marginTop: '0.25rem' }}>
          {calculateTotalVolume().toLocaleString()} kg
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={() => handleSave(false)}
          style={{
            flex: 1,
            padding: '1rem',
            backgroundColor: '#22c55e',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1.125rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#22c55e'}
        >
          ✓ GUARDAR
        </button>
        
        <button
          onClick={() => handleSave(true)}
          style={{
            flex: 1,
            padding: '1rem',
            backgroundColor: 'var(--accent-orange)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1.125rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d97706'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-orange)'}
        >
          💾 Borrador
        </button>
      </div>
    </div>
  )
}
