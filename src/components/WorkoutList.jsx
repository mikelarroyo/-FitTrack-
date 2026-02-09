import { useWorkouts } from '../context/WorkoutContext'
import { Link } from 'react-router-dom'
import WorkoutCard from './WorkoutCard'
import { useState } from 'react'

export default function WorkoutList() {
  const { templates, sessions } = useWorkouts()
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('all') // 'all', 'templates', 'sessions'

  const totalVolume = sessions.reduce((sum, s) => sum + s.totalVolume, 0)

  // Combinar plantillas y sesiones para mostrar
  const allItems = [
    ...templates.map(t => ({ ...t, type: 'template' })),
    ...sessions.map(s => ({ ...s, type: 'session' }))
  ]

  const filteredItems = allItems.filter(item => {
    const matchesFilter = filter === 'all' || item.category?.toLowerCase() === filter
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesViewMode = viewMode === 'all' || 
                           (viewMode === 'templates' && item.type === 'template') ||
                           (viewMode === 'sessions' && item.type === 'session')
    return matchesFilter && matchesSearch && matchesViewMode
  })

  return (
    <div className="fade-in" style={{ paddingBottom: '2rem' }}>
      {/* Header with gradient */}
      <div style={{
        background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
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
          fontSize: '2.25rem', 
          fontWeight: '800',
          marginBottom: '0.5rem',
          color: 'white',
          position: 'relative',
          zIndex: 1
        }}>
          💪 Mis Entrenamientos
        </h1>
        <p style={{
          fontSize: '1rem',
          color: 'rgba(255, 255, 255, 0.9)',
          position: 'relative',
          zIndex: 1
        }}>
          Sigue tu progreso y alcanza tus objetivos
        </p>
      </div>

      {/* Search Bar */}
      <div style={{
        backgroundColor: 'var(--card-bg)',
        padding: '0.75rem',
        borderRadius: '16px',
        marginBottom: '1.5rem',
        border: '2px solid var(--border-color)',
        boxShadow: '0 4px 12px var(--shadow)',
        transition: 'all 0.2s ease'
      }}>
        <input
          type="text"
          placeholder="🔍 Buscar entrenamientos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '0.875rem 1rem',
            fontSize: '1rem',
            border: '2px solid var(--border-color)',
            borderRadius: '12px',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            transition: 'all 0.2s ease'
          }}
        />
      </div>

      {/* Stats Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div className="scale-in" style={{
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✅</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
            {sessions.length}
          </div>
          <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
            Entrenamientos completados
          </div>
        </div>

        <div className="scale-in" style={{
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(245, 158, 11, 0.3)',
          animationDelay: '0.1s'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💪</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
            {totalVolume.toLocaleString()}kg
          </div>
          <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
            Volumen total levantado
          </div>
        </div>

        <div className="scale-in" style={{
          background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)',
          animationDelay: '0.2s'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📝</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
            {templates.length}
          </div>
          <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
            Plantillas creadas
          </div>
        </div>
      </div>

      {/* View Mode Chips */}
      <div style={{ 
        display: 'flex', 
        gap: '0.75rem', 
        marginBottom: '1rem', 
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <span style={{ 
          color: 'var(--text-muted)', 
          fontSize: '0.875rem',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Vista:
        </span>
        {[
          { value: 'all', label: 'Todo', emoji: '📋' },
          { value: 'templates', label: 'Plantillas', emoji: '📝' },
          { value: 'sessions', label: 'Completados', emoji: '✅' }
        ].map(mode => (
          <button
            key={mode.value}
            onClick={() => setViewMode(mode.value)}
            style={{
              padding: '0.625rem 1.25rem',
              borderRadius: '12px',
              border: '2px solid',
              borderColor: viewMode === mode.value ? 'transparent' : 'var(--border-color)',
              background: viewMode === mode.value 
                ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))' 
                : 'var(--card-bg)',
              color: viewMode === mode.value ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '0.9375rem',
              fontWeight: viewMode === mode.value ? '700' : '500',
              transition: 'all 0.2s ease',
              boxShadow: viewMode === mode.value ? '0 4px 12px var(--shadow)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              if (viewMode !== mode.value) {
                e.currentTarget.style.backgroundColor = 'var(--bg-hover)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }
            }}
            onMouseLeave={(e) => {
              if (viewMode !== mode.value) {
                e.currentTarget.style.backgroundColor = 'var(--card-bg)'
                e.currentTarget.style.transform = 'translateY(0)'
              }
            }}
          >
            <span>{mode.emoji}</span>
            <span>{mode.label}</span>
          </button>
        ))}
      </div>

      {/* Filter Chips */}
      <div style={{ 
        display: 'flex', 
        gap: '0.75rem', 
        marginBottom: '2rem', 
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <span style={{ 
          color: 'var(--text-muted)', 
          fontSize: '0.875rem',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Categoría:
        </span>
        {[
          { value: 'all', label: 'Todas', emoji: '🏋️' },
          { value: 'pierna', label: 'Pierna', emoji: '🦵' },
          { value: 'torso', label: 'Torso', emoji: '💪' },
          { value: 'fullbody', label: 'Full Body', emoji: '🤸' }
        ].map(category => (
          <button
            key={category.value}
            onClick={() => setFilter(category.value)}
            style={{
              padding: '0.625rem 1.25rem',
              borderRadius: '12px',
              border: '2px solid',
              borderColor: filter === category.value ? 'transparent' : 'var(--border-color)',
              background: filter === category.value 
                ? 'var(--accent-orange)' 
                : 'var(--card-bg)',
              color: filter === category.value ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '0.9375rem',
              fontWeight: filter === category.value ? '700' : '500',
              transition: 'all 0.2s ease',
              boxShadow: filter === category.value ? '0 4px 12px rgba(245, 158, 11, 0.3)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              if (filter !== category.value) {
                e.currentTarget.style.backgroundColor = 'var(--bg-hover)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }
            }}
            onMouseLeave={(e) => {
              if (filter !== category.value) {
                e.currentTarget.style.backgroundColor = 'var(--card-bg)'
                e.currentTarget.style.transform = 'translateY(0)'
              }
            }}
          >
            <span>{category.emoji}</span>
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      {/* Workout Cards */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.25rem', 
        marginBottom: '100px' 
      }}>
        {filteredItems.map((item, index) => (
          <div 
            key={item.id}
            className="slide-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <WorkoutCard workout={item} />
          </div>
        ))}
        
        {filteredItems.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            backgroundColor: 'var(--card-bg)',
            borderRadius: '20px',
            border: '2px dashed var(--border-color)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
              {searchTerm || filter !== 'all' ? '🔍' : '💪'}
            </div>
            <div style={{
              color: 'var(--text-secondary)',
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>
              {searchTerm || filter !== 'all' 
                ? 'No hay elementos que coincidan' 
                : '¡Comienza tu viaje fitness!'}
            </div>
            <div style={{
              color: 'var(--text-muted)',
              fontSize: '1rem'
            }}>
              {searchTerm || filter !== 'all' 
                ? 'Intenta con otros términos de búsqueda' 
                : 'Crea tu primera plantilla de entrenamiento'}
            </div>
          </div>
        )}
      </div>

      {/* FAB Button */}
      <Link to="/new" style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2.5rem',
        textDecoration: 'none',
        boxShadow: '0 8px 24px var(--shadow)',
        border: 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 100
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.15) rotate(90deg)'
        e.currentTarget.style.boxShadow = '0 12px 32px var(--shadow)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
        e.currentTarget.style.boxShadow = '0 8px 24px var(--shadow)'
      }}
      >
        +
      </Link>
    </div>
  )
}
