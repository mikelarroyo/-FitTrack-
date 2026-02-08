import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const [skin, setSkin] = useState('dark')
  const location = useLocation()

  const toggleSkin = () => {
    setSkin(skin === 'dark' ? 'light' : 'dark')
  }

  return (
    <nav style={{
      backgroundColor: 'var(--bg-dark)',
      color: 'white',
      padding: '1rem 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: 'white',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          💪 FitTrack
        </Link>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            onClick={toggleSkin}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'var(--bg-darker)',
              color: 'white',
              border: '1px solid var(--text-muted)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            🎨 Skin: {skin === 'dark' ? 'Dark' : 'Light'} ▾
          </button>
          
          {location.pathname !== '/' && (
            <Link to="/" style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '1.5rem'
            }}>
              ←
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
