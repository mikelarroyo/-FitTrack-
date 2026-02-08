import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useWorkouts } from '../context/WorkoutContext'

export default function WorkoutEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { templates, addTemplate, updateTemplate } = useWorkouts()
  
  const [name, setName] = useState('')
  const [category, setCategory] = useState('pierna')
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    if (id) {
      const template = templates.find(t => t.id === id)
      if (template) {
        setName(template.name)
        setCategory(template.category)
        setExercises(template.exercises)
      }
    }
  }, [id, templates])

  const addExercise = () => {
    setExercises([...exercises, { 
      name: '', 
      series: 3, 
      reps: 10
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

  const handleSave = () => {
    if (!name.trim()) {
      alert('Por favor, ingresa un nombre para la plantilla')
      return
    }

    if (exercises.length === 0) {
      alert('Añade al menos un ejercicio')
      return
    }

    const template = {
      id: id || `template-${Date.now()}`,
      name,
      category,
      exercises: exercises.filter(ex => ex.name.trim() !== ''),
      isTemplate: true
    }

    if (id) {
      updateTemplate(template)
    } else {
      addTemplate(template)
    }

    navigate('/')
  }

  return (
    <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
        {id ? 'Editar Plantilla' : 'Nueva Plantilla'}
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Crea una plantilla de entrenamiento. Los pesos los añadirás cuando realices la sesión.
      </p>

      {/* Form Section */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
          Nombre de la plantilla
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

        <div>
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
          gridTemplateColumns: '2fr 1fr 1fr 60px',
          gap: '1rem',
          fontSize: '0.875rem',
          fontWeight: 'bold',
          fontFamily: 'monospace'
        }}>
          <div>Ejercicio</div>
          <div>Series</div>
          <div>Reps</div>
          <div></div>
        </div>

        {/* Exercise Rows */}
        {exercises.map((exercise, index) => (
          <div key={index} style={{
            padding: '1rem',
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 60px',
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
              min="1"
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
              min="1"
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

        {exercises.length === 0 && (
          <div style={{
            padding: '2rem',
            textAlign: 'center',
            color: 'var(--text-muted)'
          }}>
            No hay ejercicios. Añade el primero 👇
          </div>
        )}

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

      {/* Info Box */}
      <div style={{
        backgroundColor: '#fef3c7',
        border: '2px solid var(--accent-yellow)',
        borderRadius: '12px',
        padding: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ fontWeight: 'bold', color: '#92400e', marginBottom: '0.25rem' }}>
          💡 Recuerda
        </div>
        <div style={{ fontSize: '0.9375rem', color: '#92400e' }}>
          Esta es solo la plantilla. Cuando inicies el entrenamiento podrás añadir los pesos de cada serie.
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            flex: 1,
            padding: '1rem',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: '2px solid var(--border-color)',
            borderRadius: '12px',
            fontSize: '1.125rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Cancelar
        </button>
        
        <button
          onClick={handleSave}
          style={{
            flex: 2,
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
          ✓ Guardar Plantilla
        </button>
      </div>
    </div>
  )
}
