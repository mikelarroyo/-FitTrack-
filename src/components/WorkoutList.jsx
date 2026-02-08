import { useWorkouts } from '../context/WorkoutContext'
import { Link } from 'react-router-dom'
import WorkoutCard from './WorkoutCard'
import { useState } from 'react'

export default function WorkoutList() {
  const { workouts } = useWorkouts()
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const completedWorkouts = workouts.filter(w => w.completed)
  const totalVolume = completedWorkouts.reduce((sum, w) => sum + w.totalVolume, 0)

  const filteredWorkouts = workouts.filter(w => {
    const matchesFilter = filter === 'all' || w.category.toLowerCase() === filter
    const matchesSearch = w.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="fade-in">
      {/* Search Bar */}
      <div style={{
        backgroundColor: 'var(--bg-primary)',
        padding: '1rem',
        borderRadius: '12px',
        marginBottom: '1.5rem',
        border: '1px solid var(--border-color)'
      }}>
        <input
          type="text"
          placeholder="🔍 Buscar entrenamientos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)'
          }}
        />
      </div>

      <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        Mis Entrenamientos
      </h1>

      {/* Stats Card */}
      <div style={{
        backgroundColor: 'var(--accent-blue)',
        color: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '1.5rem'
      }}>
        <div style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>📊 Esta semana</div>
        <div style={{ fontSize: '1rem' }}>
          {completedWorkouts.length} entrenamientos | {totalVolume.toLocaleString()}kg total
        </div>
      </div>

      {/* Filter Chips */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {['all', 'pierna', 'torso', 'fullbody'].map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '16px',
              border: filter === category ? 'none' : '1px solid var(--border-color)',
              backgroundColor: filter === category ? 'var(--bg-dark)' : 'var(--bg-primary)',
              color: filter === category ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: filter === category ? 'bold' : 'normal',
              textTransform: 'capitalize'
            }}
          >
            {category === 'all' ? 'Todos' : category}
          </button>
        ))}
      </div>

      {/* Workout Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '100px' }}>
        {filteredWorkouts.map(workout => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
        
        {filteredWorkouts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: 'var(--text-muted)',
            fontSize: '1.125rem'
          }}>
            {searchTerm || filter !== 'all' 
              ? 'No hay entrenamientos que coincidan con tu búsqueda' 
              : '¡Comienza creando tu primer entrenamiento! 💪'}
          </div>
        )}
      </div>

      {/* FAB Button */}
      <Link to="/new" style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: 'var(--bg-dark)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2.5rem',
        textDecoration: 'none',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        border: '3px solid var(--accent-blue)',
        transition: 'transform 0.2s'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        +
      </Link>
    </div>
  )
}
