import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useWorkouts } from '../context/WorkoutContext'

export default function WorkoutSession() {
  const { templateId } = useParams()
  const navigate = useNavigate()
  const { templates, addSession } = useWorkouts()
  
  const template = templates.find(t => t.id === templateId)
  
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [exerciseData, setExerciseData] = useState([])
  const [currentWeights, setCurrentWeights] = useState([])
  const [currentNotes, setCurrentNotes] = useState('')
  const [startTime] = useState(new Date())

  useEffect(() => {
    if (template && template.exercises && template.exercises.length > 0) {
      // Inicializar datos para cada ejercicio
      const initialData = template.exercises.map(ex => ({
        ...ex,
        weights: Array(ex.series || 0).fill(0),
        notes: ''
      }))
      setExerciseData(initialData)
      setCurrentWeights(Array(template.exercises[0]?.series || 0).fill(0))
    }
  }, [template])

  if (!template) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Plantilla no encontrada</h2>
        <button onClick={() => navigate('/')} style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: 'var(--accent-blue)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          Volver al inicio
        </button>
      </div>
    )
  }

  if (exerciseData.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Cargando ejercicios...</h2>
      </div>
    )
  }

  const currentExercise = exerciseData[currentExerciseIndex]
  const isLastExercise = currentExerciseIndex === exerciseData.length - 1

  const handleWeightChange = (seriesIndex, value) => {
    const newWeights = [...currentWeights]
    newWeights[seriesIndex] = parseFloat(value) || 0
    setCurrentWeights(newWeights)
  }

  const handleNextExercise = () => {
    // Guardar datos del ejercicio actual
    const updatedData = [...exerciseData]
    updatedData[currentExerciseIndex] = {
      ...updatedData[currentExerciseIndex],
      weights: currentWeights,
      notes: currentNotes
    }
    setExerciseData(updatedData)

    if (isLastExercise) {
      // Finalizar entrenamiento
      finishWorkout(updatedData)
    } else {
      // Ir al siguiente ejercicio
      const nextIndex = currentExerciseIndex + 1
      setCurrentExerciseIndex(nextIndex)
      setCurrentWeights(updatedData[nextIndex].weights)
      setCurrentNotes(updatedData[nextIndex].notes)
    }
  }

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      // Guardar datos del ejercicio actual
      const updatedData = [...exerciseData]
      updatedData[currentExerciseIndex] = {
        ...updatedData[currentExerciseIndex],
        weights: currentWeights,
        notes: currentNotes
      }
      setExerciseData(updatedData)

      const prevIndex = currentExerciseIndex - 1
      setCurrentExerciseIndex(prevIndex)
      setCurrentWeights(updatedData[prevIndex].weights)
      setCurrentNotes(updatedData[prevIndex].notes)
    }
  }

  const finishWorkout = (finalData) => {
    const endTime = new Date()
    const duration = Math.round((endTime - startTime) / 60000) // minutos

    // Calcular volumen total
    const totalVolume = finalData.reduce((sum, ex) => {
      const exerciseVolume = ex.weights.reduce((exSum, weight, idx) => {
        return exSum + (weight * ex.reps)
      }, 0)
      return sum + exerciseVolume
    }, 0)

    const session = {
      id: `session-${Date.now()}`,
      templateId: template.id,
      name: template.name,
      category: template.category,
      exercises: finalData,
      totalVolume: Math.round(totalVolume),
      duration,
      date: new Date().toISOString(),
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      notes: '',
      completed: true
    }

    addSession(session)
    navigate('/')
  }

  const calculateCurrentVolume = () => {
    return currentWeights.reduce((sum, weight) => sum + (weight * currentExercise.reps), 0)
  }

  return (
    <div className="fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'var(--bg-dark)',
        color: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '1.5rem'
      }}>
        <div style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.5rem' }}>
          Entrenamiento en curso
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>
          {template.name}
        </h1>
        <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
          Ejercicio {currentExerciseIndex + 1} de {exerciseData.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{
        height: '8px',
        backgroundColor: 'var(--border-color)',
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '1.5rem'
      }}>
        <div style={{
          height: '100%',
          width: `${((currentExerciseIndex + 1) / exerciseData.length) * 100}%`,
          backgroundColor: 'var(--accent-green)',
          transition: 'width 0.3s'
        }} />
      </div>

      {/* Current Exercise */}
      <div style={{
        backgroundColor: 'var(--bg-primary)',
        border: '2px solid var(--border-color)',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          {currentExercise.name}
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '1rem',
          marginBottom: '1.5rem',
          padding: '1rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '8px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-blue)' }}>
              {currentExercise.series}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Series</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-orange)' }}>
              {currentExercise.reps}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Repeticiones</div>
          </div>
        </div>

        {/* Weight Inputs */}
        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Peso por serie (kg)
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {currentWeights.map((weight, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                minWidth: '80px',
                fontWeight: 'bold',
                color: 'var(--text-secondary)'
              }}>
                Serie {idx + 1}:
              </div>
              <input
                type="number"
                step="0.5"
                value={weight}
                onChange={(e) => handleWeightChange(idx, e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  fontSize: '1.125rem',
                  border: '2px solid var(--border-color)',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}
                placeholder="0"
              />
              <div style={{
                minWidth: '100px',
                color: 'var(--text-muted)',
                fontSize: '0.875rem'
              }}>
                Vol: {(weight * currentExercise.reps).toFixed(1)}kg
              </div>
            </div>
          ))}
        </div>

        {/* Volume Info */}
        <div style={{
          backgroundColor: '#eff6ff',
          border: '2px solid var(--accent-blue)',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.875rem', color: '#1e40af', marginBottom: '0.25rem' }}>
            Volumen de este ejercicio
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#1e40af' }}>
            {calculateCurrentVolume().toFixed(1)} kg
          </div>
        </div>

        {/* Notes */}
        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          Notas (opcional)
        </h3>
        <textarea
          value={currentNotes}
          onChange={(e) => setCurrentNotes(e.target.value)}
          placeholder="Ej: Buena técnica, aumentar peso la próxima..."
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '0.9375rem',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            minHeight: '80px',
            resize: 'vertical',
            fontFamily: 'inherit'
          }}
        />
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        {currentExerciseIndex > 0 && (
          <button
            onClick={handlePreviousExercise}
            style={{
              flex: 1,
              padding: '1rem',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: '2px solid var(--border-color)',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            ← Anterior
          </button>
        )}
        
        <button
          onClick={handleNextExercise}
          style={{
            flex: 2,
            padding: '1rem',
            backgroundColor: isLastExercise ? '#22c55e' : 'var(--accent-blue)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1.125rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {isLastExercise ? '✓ Finalizar Entrenamiento' : 'Siguiente →'}
        </button>
      </div>

      {/* Cancel Button */}
      <button
        onClick={() => {
          if (confirm('¿Seguro que quieres cancelar? Se perderá el progreso.')) {
            navigate('/')
          }
        }}
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: 'transparent',
          color: 'var(--accent-red)',
          border: '1px solid var(--accent-red)',
          borderRadius: '8px',
          fontSize: '0.9375rem',
          cursor: 'pointer'
        }}
      >
        Cancelar entrenamiento
      </button>
    </div>
  )
}
