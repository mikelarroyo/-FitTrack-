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
    <div className="fade-in" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '2rem' }}>
      {/* Header with gradient */}
      <div style={{
        background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))',
        padding: '2rem',
        borderRadius: '20px',
        marginBottom: '2rem',
        boxShadow: '0 8px 32px var(--shadow)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        }} />
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: '800',
          marginBottom: '0.5rem',
          color: 'white',
          position: 'relative',
          zIndex: 1
        }}>
          {id ? '✏️ Editar Plantilla' : '✨ Nueva Plantilla'}
        </h1>
        <p style={{
          fontSize: '1rem',
          color: 'rgba(255, 255, 255, 0.9)',
          position: 'relative',
          zIndex: 1
        }}>
          {id ? 'Modifica tu plantilla de entrenamiento' : 'Crea una plantilla reutilizable. Los pesos los añadirás en cada sesión'}
        </p>
      </div>

      {/* Form Section */}
      <div style={{
        backgroundColor: 'var(--card-bg)',
        border: '2px solid var(--border-color)',
        borderRadius: '20px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 12px var(--shadow)'
      }}>
        <label style={{ 
          display: 'block', 
          fontWeight: '700', 
          marginBottom: '0.75rem', 
          color: 'var(--text-primary)',
          fontSize: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          📝 Nombre de la plantilla
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Pierna Fuerza - 5x5"
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1.125rem',
            border: '2px solid var(--border-color)',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
        />

        <div>
          <label style={{ 
            display: 'block', 
            fontWeight: '700', 
            marginBottom: '0.75rem', 
            color: 'var(--text-primary)',
            fontSize: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            🏷️ Categoría
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1.125rem',
              border: '2px solid var(--border-color)',
              borderRadius: '12px',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <option value="pierna">🦵 Pierna</option>
            <option value="torso">💪 Torso</option>
            <option value="fullbody">🏋️ Full Body</option>
          </select>
        </div>
      </div>

      {/* Exercises Section */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '700', 
          marginBottom: '1rem',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          💪 Ejercicios
          <span style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            backgroundColor: 'var(--accent-blue)',
            color: 'white',
            padding: '0.25rem 0.75rem',
            borderRadius: '12px'
          }}>
            {exercises.length}
          </span>
        </h2>

        <div style={{
          backgroundColor: 'var(--card-bg)',
          border: '2px solid var(--border-color)',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px var(--shadow)'
        }}>
          {/* Table Header */}
          <div style={{
            background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
            color: 'white',
            padding: '1rem 1.5rem',
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 80px',
            gap: '1rem',
            fontSize: '0.875rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            <div>Ejercicio</div>
            <div style={{ textAlign: 'center' }}>Series</div>
            <div style={{ textAlign: 'center' }}>Reps</div>
            <div style={{ textAlign: 'center' }}>Acción</div>
          </div>

          {/* Exercise Rows */}
          {exercises.map((exercise, index) => (
            <div key={index} className="scale-in" style={{
              padding: '1.25rem 1.5rem',
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 80px',
              gap: '1rem',
              alignItems: 'center',
              backgroundColor: index % 2 === 0 ? 'var(--bg-secondary)' : 'var(--card-bg)',
              borderBottom: index < exercises.length - 1 ? '1px solid var(--border-color)' : 'none',
              transition: 'all 0.2s ease',
              animationDelay: `${index * 0.05}s`
            }}>
              <input
                type="text"
                value={exercise.name}
                onChange={(e) => updateExercise(index, 'name', e.target.value)}
                placeholder="Nombre del ejercicio"
                style={{
                  padding: '0.75rem',
                  border: '2px solid var(--border-color)',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
              />
              <input
                type="number"
                value={exercise.series}
                onChange={(e) => updateExercise(index, 'series', parseInt(e.target.value) || 0)}
                min="1"
                style={{
                  padding: '0.75rem',
                  border: '2px solid var(--border-color)',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  textAlign: 'center',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
              />
              <input
                type="number"
                value={exercise.reps}
                onChange={(e) => updateExercise(index, 'reps', parseInt(e.target.value) || 0)}
                min="1"
                style={{
                  padding: '0.75rem',
                  border: '2px solid var(--border-color)',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  textAlign: 'center',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
              />
              <button
                onClick={() => removeExercise(index)}
                style={{
                  padding: '0.625rem',
                  backgroundColor: 'var(--accent-red)',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '1.25rem',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '44px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)'
                  e.currentTarget.style.backgroundColor = '#dc2626'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.backgroundColor = 'var(--accent-red)'
                }}
              >
                🗑️
              </button>
            </div>
          ))}

          {exercises.length === 0 && (
            <div style={{
              padding: '3rem',
              textAlign: 'center',
              color: 'var(--text-muted)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💪</div>
              <div style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                No hay ejercicios todavía
              </div>
              <div style={{ fontSize: '0.9375rem' }}>
                Añade tu primer ejercicio usando el botón de abajo
              </div>
            </div>
          )}

          {/* Add Exercise Button */}
          <button
            onClick={addExercise}
            style={{
              width: '100%',
              padding: '1.25rem',
              backgroundColor: 'var(--bg-tertiary)',
              border: '2px dashed var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '1.125rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-hover)'
              e.currentTarget.style.borderColor = 'var(--accent-blue)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'
              e.currentTarget.style.borderColor = 'var(--border-color)'
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>+</span>
            Añadir ejercicio
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div style={{
        backgroundColor: 'var(--card-bg)',
        border: '2px solid var(--accent-orange)',
        borderRadius: '16px',
        padding: '1.25rem',
        marginBottom: '2rem',
        display: 'flex',
        gap: '1rem',
        alignItems: 'start',
        boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)'
      }}>
        <div style={{ fontSize: '2rem' }}>💡</div>
        <div>
          <div style={{ fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.125rem' }}>
            Recuerda
          </div>
          <div style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Esta es solo la plantilla con la estructura del entrenamiento. Los pesos de cada serie los añadirás cuando inicies la sesión de entrenamiento.
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            flex: 1,
            minWidth: '200px',
            padding: '1.25rem',
            backgroundColor: 'var(--card-bg)',
            color: 'var(--text-primary)',
            border: '2px solid var(--border-color)',
            borderRadius: '16px',
            fontSize: '1.125rem',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-hover)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--card-bg)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Cancelar
        </button>
        
        <button
          onClick={handleSave}
          style={{
            flex: 2,
            minWidth: '200px',
            padding: '1.25rem',
            background: 'linear-gradient(135deg, var(--accent-green), #059669)',
            color: 'white',
            border: 'none',
            borderRadius: '16px',
            fontSize: '1.125rem',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(16, 185, 129, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(16, 185, 129, 0.3)'
          }}
        >
          ✓ Guardar Plantilla
        </button>
      </div>
    </div>
  )
}
