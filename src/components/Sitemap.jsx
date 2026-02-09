import { Link } from 'react-router-dom'

export default function Sitemap() {
  const siteStructure = [
    {
      name: 'Inicio',
      path: '/',
      icon: '🏠',
      description: 'Página principal con lista de entrenamientos y estadísticas',
      children: []
    },
    {
      name: 'Nueva Plantilla',
      path: '/new',
      icon: '➕',
      description: 'Crear nueva plantilla de entrenamiento',
      children: []
    },
    {
      name: 'Detalle de Plantilla',
      path: '/template/:id',
      icon: '📝',
      description: 'Ver detalles de una plantilla e iniciar entrenamiento',
      children: [
        {
          name: 'Iniciar Entrenamiento',
          path: '/start/:templateId',
          icon: '▶️',
          description: 'Sesión de entrenamiento activa con registro de pesos'
        }
      ]
    },
    {
      name: 'Editar Plantilla',
      path: '/edit/:id',
      icon: '✏️',
      description: 'Modificar plantilla existente',
      children: []
    },
    {
      name: 'Detalle de Sesión',
      path: '/session/:id',
      icon: '✅',
      description: 'Ver histórico de una sesión completada',
      children: []
    },
    {
      name: 'Análisis',
      path: '/analysis',
      icon: '📊',
      description: 'Estudio de usabilidad, accesibilidad y responsive',
      children: []
    },
    {
      name: 'Sobre Nosotros',
      path: '/about',
      icon: '👨‍💻',
      description: 'Información del desarrollador y contexto del proyecto',
      children: []
    },
    {
      name: 'Mapa del Sitio',
      path: '/sitemap',
      icon: '🗺️',
      description: 'Estructura de navegación de la aplicación',
      children: []
    }
  ]

  return (
    <div className="fade-in" style={{ paddingBottom: '2rem' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--accent-orange), var(--accent-red))',
        padding: '2.5rem 2rem',
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
          fontSize: '2.5rem', 
          fontWeight: '800',
          marginBottom: '0.5rem',
          color: 'white',
          position: 'relative',
          zIndex: 1
        }}>
          🗺️ Mapa del Sitio
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: 'rgba(255, 255, 255, 0.95)',
          position: 'relative',
          zIndex: 1
        }}>
          Estructura completa de navegación de FitTrack
        </p>
      </div>

      {/* Introduction */}
      <div style={{
        backgroundColor: 'var(--card-bg)',
        borderRadius: '20px',
        padding: '2rem',
        border: '2px solid var(--border-color)',
        boxShadow: '0 4px 12px var(--shadow)',
        marginBottom: '2rem'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1rem',
          color: 'var(--text-primary)'
        }}>
          📋 Estructura de la Aplicación
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1rem',
          lineHeight: '1.6',
          marginBottom: '1.5rem'
        }}>
          FitTrack está organizada en <strong>{siteStructure.length} secciones principales</strong> que 
          permiten gestionar entrenamientos, analizar la usabilidad de la aplicación y conocer más sobre 
          el proyecto y su desarrollador.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          marginTop: '1.5rem'
        }}>
          {[
            { label: 'Páginas principales', value: siteStructure.length, icon: '📄', color: 'var(--accent-blue)' },
            { label: 'Rutas dinámicas', value: '4', icon: '🔀', color: 'var(--accent-purple)' },
            { label: 'Temas disponibles', value: '4', icon: '🎨', color: 'var(--accent-orange)' }
          ].map((stat, index) => (
            <div
              key={index}
              className="scale-in"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                padding: '1.25rem',
                borderRadius: '12px',
                textAlign: 'center',
                border: '2px solid var(--border-color)',
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
              <div style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: stat.color,
                marginBottom: '0.25rem'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                fontWeight: '600'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Sitemap */}
      <div style={{
        backgroundColor: 'var(--card-bg)',
        borderRadius: '20px',
        padding: '2rem',
        border: '2px solid var(--border-color)',
        boxShadow: '0 4px 12px var(--shadow)',
        marginBottom: '2rem'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '2rem',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          🌳 Arquitectura de Navegación
        </h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {siteStructure.map((page, index) => (
            <div
              key={index}
              className="slide-in"
              style={{
                animationDelay: `${index * 0.05}s`
              }}
            >
              {/* Parent Page */}
              <Link
                to={page.path}
                style={{
                  textDecoration: 'none',
                  display: 'block'
                }}
              >
                <div
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '2px solid var(--border-color)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(8px)'
                    e.currentTarget.style.borderColor = 'var(--accent-blue)'
                    e.currentTarget.style.boxShadow = '0 4px 12px var(--shadow)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)'
                    e.currentTarget.style.borderColor = 'var(--border-color)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    gap: '1rem'
                  }}>
                    <div style={{
                      fontSize: '2.5rem',
                      flexShrink: 0,
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'var(--bg-tertiary)',
                      borderRadius: '12px'
                    }}>
                      {page.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '0.5rem'
                      }}>
                        <h3 style={{
                          fontSize: '1.25rem',
                          fontWeight: '700',
                          color: 'var(--text-primary)',
                          margin: 0
                        }}>
                          {page.name}
                        </h3>
                        <code style={{
                          backgroundColor: 'var(--bg-tertiary)',
                          color: 'var(--accent-blue)',
                          padding: '0.25rem 0.625rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          {page.path}
                        </code>
                      </div>
                      <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.9375rem',
                        lineHeight: '1.6',
                        margin: 0
                      }}>
                        {page.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Child Pages */}
              {page.children.length > 0 && (
                <div style={{
                  marginLeft: '3rem',
                  marginTop: '1rem',
                  paddingLeft: '2rem',
                  borderLeft: '3px solid var(--border-color)'
                }}>
                  {page.children.map((child, childIndex) => (
                    <Link
                      key={childIndex}
                      to={child.path}
                      style={{ textDecoration: 'none', display: 'block' }}
                    >
                      <div
                        style={{
                          backgroundColor: 'var(--bg-tertiary)',
                          borderRadius: '12px',
                          padding: '1rem 1.25rem',
                          border: '2px solid var(--border-color)',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer',
                          marginBottom: childIndex < page.children.length - 1 ? '0.75rem' : 0
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateX(8px)'
                          e.currentTarget.style.borderColor = 'var(--accent-purple)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateX(0)'
                          e.currentTarget.style.borderColor = 'var(--border-color)'
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem'
                        }}>
                          <span style={{ fontSize: '1.5rem' }}>{child.icon}</span>
                          <div>
                            <div style={{
                              fontSize: '1rem',
                              fontWeight: '600',
                              color: 'var(--text-primary)',
                              marginBottom: '0.25rem'
                            }}>
                              {child.name}
                            </div>
                            <div style={{
                              fontSize: '0.875rem',
                              color: 'var(--text-secondary)'
                            }}>
                              {child.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Features Overview */}
      <div style={{
        backgroundColor: 'var(--card-bg)',
        borderRadius: '20px',
        padding: '2rem',
        border: '2px solid var(--border-color)',
        boxShadow: '0 4px 12px var(--shadow)'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: 'var(--text-primary)'
        }}>
          ⚡ Funcionalidades Principales
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem'
        }}>
          {[
            { icon: '📝', title: 'Gestión de Plantillas', desc: 'Crear, editar y organizar plantillas de entrenamiento' },
            { icon: '▶️', title: 'Sesiones en Tiempo Real', desc: 'Registrar pesos y series durante el entrenamiento' },
            { icon: '📊', title: 'Estadísticas', desc: 'Seguimiento de volumen total y entrenamientos completados' },
            { icon: '🎨', title: 'Sistema de Temas', desc: '4 temas visuales con persistencia' },
            { icon: '📱', title: 'Diseño Responsive', desc: 'Optimizado para móvil, tablet y escritorio' },
            { icon: '♿', title: 'Accesibilidad', desc: 'Cumple estándares WCAG de contraste y usabilidad' }
          ].map((feature, index) => (
            <div
              key={index}
              className="scale-in"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                padding: '1.25rem',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                animationDelay: `${index * 0.05}s`
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{feature.icon}</div>
              <h4 style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem'
              }}>
                {feature.title}
              </h4>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.5',
                margin: 0
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
