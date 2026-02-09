import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useTheme } from '../hooks/useTheme'

export default function Navbar() {
  const [showThemeMenu, setShowThemeMenu] = useState(false)
  const { currentTheme, changeTheme, themes, themeConfig } = useTheme()
  const location = useLocation()

  return (
    <nav style={{
      backgroundColor: 'var(--navbar-bg)',
      color: 'var(--text-primary)',
      padding: '1rem 0',
      boxShadow: '0 2px 12px var(--shadow)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{
          fontSize: '1.75rem',
          fontWeight: 'bold',
          color: 'var(--text-primary)',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          💪 <span style={{ 
            background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>FitTrack</span>
        </Link>
        
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Navigation Links */}
          <Link
            to="/analysis"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: location.pathname === '/analysis' ? 'var(--bg-tertiary)' : 'transparent',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '0.9375rem',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'}
            onMouseLeave={(e) => {
              if (location.pathname !== '/analysis') {
                e.currentTarget.style.backgroundColor = 'transparent'
              } else {
                e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'
              }
            }}
          >
            <span>📊</span>
            <span style={{ display: window.innerWidth < 768 ? 'none' : 'inline' }}>Análisis</span>
          </Link>

          <Link
            to="/about"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: location.pathname === '/about' ? 'var(--bg-tertiary)' : 'transparent',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '0.9375rem',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'}
            onMouseLeave={(e) => {
              if (location.pathname !== '/about') {
                e.currentTarget.style.backgroundColor = 'transparent'
              } else {
                e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'
              }
            }}
          >
            <span>👨‍💻</span>
            <span style={{ display: window.innerWidth < 768 ? 'none' : 'inline' }}>Sobre Nosotros</span>
          </Link>

          <Link
            to="/sitemap"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: location.pathname === '/sitemap' ? 'var(--bg-tertiary)' : 'transparent',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '0.9375rem',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'}
            onMouseLeave={(e) => {
              if (location.pathname !== '/sitemap') {
                e.currentTarget.style.backgroundColor = 'transparent'
              } else {
                e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'
              }
            }}
          >
            <span>🗺️</span>
            <span style={{ display: window.innerWidth < 768 ? 'none' : 'inline' }}>Mapa</span>
          </Link>
          {/* Theme Selector */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              style={{
                padding: '0.625rem 1.25rem',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '2px solid var(--border-color)',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '0.9375rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px var(--shadow)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-hover)'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 4px 12px var(--shadow)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 8px var(--shadow)'
              }}
            >
              {themeConfig.icon} {themeConfig.name}
            </button>
            
            {showThemeMenu && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 0.5rem)',
                right: 0,
                backgroundColor: 'var(--card-bg)',
                border: '2px solid var(--border-color)',
                borderRadius: '12px',
                boxShadow: '0 8px 24px var(--shadow)',
                minWidth: '160px',
                overflow: 'hidden',
                zIndex: 1001,
                animation: 'scaleIn 0.2s ease-out'
              }}>
                {Object.entries(themes).map(([key, theme]) => (
                  <button
                    key={key}
                    onClick={() => {
                      changeTheme(key)
                      setShowThemeMenu(false)
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      backgroundColor: currentTheme === key ? 'var(--bg-tertiary)' : 'transparent',
                      color: 'var(--text-primary)',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '0.9375rem',
                      fontWeight: currentTheme === key ? '600' : '400',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--bg-hover)'
                      e.currentTarget.style.paddingLeft = '1.25rem'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = currentTheme === key ? 'var(--bg-tertiary)' : 'transparent'
                      e.currentTarget.style.paddingLeft = '1rem'
                    }}
                  >
                    {theme.icon} {theme.name}
                    {currentTheme === key && ' ✓'}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {location.pathname !== '/' && (
            <Link to="/" style={{
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontSize: '1.5rem',
              padding: '0.5rem',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-tertiary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-hover)'
              e.currentTarget.style.transform = 'translateX(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'
              e.currentTarget.style.transform = 'translateX(0)'
            }}
            >
              ←
            </Link>
          )}
        </div>
      </div>
      
      {/* Close menu when clicking outside */}
      {showThemeMenu && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999
          }}
          onClick={() => setShowThemeMenu(false)}
        />
      )}
    </nav>
  )
}
