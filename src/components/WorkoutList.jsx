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
        <div style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>📊 Resumen</div>
        <div style={{ fontSize: '1rem' }}>
          {sessions.length} entrenamientos completados | {totalVolume.toLocaleString()}kg total<br/>
          {templates.length} plantillas creadas
        </div>
      </div>

      {/* View Mode Chips */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {[
          { value: 'all', label: '📋 Todo', emoji: '' },
          { value: 'templates', label: '📝 Plantillas', emoji: '' },
          { value: 'sessions', label: '✅ Completados', emoji: '' }
        ].map(mode => (
          <button
            key={mode.value}
            onClick={() => setViewMode(mode.value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '16px',
              border: viewMode === mode.value ? 'none' : '1px solid var(--border-color)',
              backgroundColor: viewMode === mode.value ? 'var(--bg-dark)' : 'var(--bg-primary)',
              color: viewMode === mode.value ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: viewMode === mode.value ? 'bold' : 'normal'
            }}
          >
            {mode.label}
          </button>
        ))}
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
            {category === 'all' ? 'Todas' : category}
          </button>
        ))}
      </div>

      {/* Workout Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '100px' }}>
        {filteredItems.map(item => (
          <WorkoutCard key={item.id} workout={item} />
        ))}
        
        {filteredItems.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: 'var(--text-muted)',
            fontSize: '1.125rem'
          }}>
            {searchTerm || filter !== 'all' 
              ? 'No hay elementos que coincidan con tu búsqueda' 
              : '¡Comienza creando tu primera plantilla! 💪'}
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
