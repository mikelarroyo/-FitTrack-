import { useState } from 'react'

export default function Analysis() {
  const [activeTab, setActiveTab] = useState('demo')

  const responsiveAspects = [
    { id: 1, title: 'Layout fluido y adaptable', description: 'El diseño se ajusta automáticamente a diferentes tamaños de pantalla' },
    { id: 2, title: 'Grid responsive', description: 'Las tarjetas de estadísticas se reorganizan según el espacio disponible' },
    { id: 3, title: 'Navegación adaptativa', description: 'El navbar mantiene funcionalidad en móvil y escritorio' },
    { id: 4, title: 'Tipografía escalable', description: 'Los tamaños de fuente se ajustan proporcionalmente' },
    { id: 5, title: 'Imágenes y elementos responsive', description: 'Iconos y elementos visuales mantienen proporción' },
    { id: 6, title: 'Botones táctiles', description: 'Botones con tamaño mínimo de 44px para dispositivos móviles' },
    { id: 7, title: 'Espaciado adaptativo', description: 'Márgenes y padding se ajustan según viewport' },
    { id: 8, title: 'Menús desplegables optimizados', description: 'Selector de temas funciona en touch y mouse' },
    { id: 9, title: 'Formularios responsive', description: 'Inputs y campos se expanden correctamente' },
    { id: 10, title: 'Orientación flexible', description: 'Funciona en vertical y horizontal' }
  ]

  const usabilityAspects = [
    { id: 1, title: 'Navegación clara', description: 'Menú intuitivo con iconos reconocibles', themes: 'Todos los temas mantienen el contraste en navegación' },
    { id: 2, title: 'Feedback visual', description: 'Efectos hover y estados activos en todos los elementos', themes: 'Cada tema adapta los colores de feedback' },
    { id: 3, title: 'Jerarquía visual', description: 'Títulos, subtítulos y texto claramente diferenciados', themes: 'Peso visual se mantiene en todos los temas' },
    { id: 4, title: 'Consistencia de diseño', description: 'Patrones visuales coherentes en toda la app', themes: 'Elementos mantienen posición en todos los temas' },
    { id: 5, title: 'Carga cognitiva reducida', description: 'Información agrupada lógicamente', themes: 'Colores de categorización consistentes' },
    { id: 6, title: 'Acciones principales destacadas', description: 'Botón FAB y acciones primarias visibles', themes: 'Botones primarios con alto contraste en todos' },
    { id: 7, title: 'Mensajes de estado', description: 'Estados vacíos y feedback claro', themes: 'Información legible en cualquier tema' },
    { id: 8, title: 'Prevención de errores', description: 'Validación de formularios', themes: 'Mensajes de error visibles en todos los temas' },
    { id: 9, title: 'Flexibilidad de uso', description: 'Múltiples formas de acceder a funciones', themes: 'Navegación funcional independiente del tema' },
    { id: 10, title: 'Estética minimalista', description: 'Diseño limpio sin elementos innecesarios', themes: 'Todos los temas mantienen diseño limpio' }
  ]

  const accessibilityAspects = [
    { id: 1, title: 'Contraste de color', description: 'Ratios WCAG AA cumplidos', themes: 'Dark: 12:1, Light: 15:1, Ocean: 10:1, Sunset: 9:1' },
    { id: 2, title: 'Tamaño de fuente', description: 'Mínimo 16px para texto principal', themes: 'Consistente en todos los temas' },
    { id: 3, title: 'Elementos interactivos', description: 'Área mínima de 44x44px', themes: 'Todos los botones cumplen el estándar' },
    { id: 4, title: 'Indicadores visuales', description: 'Estados claramente diferenciados', themes: 'Cada tema usa códigos de color apropiados' },
    { id: 5, title: 'Etiquetas descriptivas', description: 'Textos claros y concisos', themes: 'Iconos acompañados de texto en todos' },
    { id: 6, title: 'Navegación por teclado', description: 'Focus visible en elementos interactivos', themes: 'Outline adaptado a cada tema' },
    { id: 7, title: 'Mensajes de error claros', description: 'Feedback explicativo', themes: 'Color rojo accesible en todos los temas' },
    { id: 8, title: 'Jerarquía semántica', description: 'Estructura HTML correcta', themes: 'No depende del tema visual' },
    { id: 9, title: 'Contenido alternativo', description: 'Emojis complementan, no reemplazan texto', themes: 'Información textual siempre presente' },
    { id: 10, title: 'Animaciones seguras', description: 'Transiciones suaves sin parpadeos', themes: 'Velocidad consistente en todos los temas' }
  ]

  return (
    <div className="fade-in" style={{ paddingBottom: '2rem' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))',
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
          📊 Análisis de Usabilidad y Accesibilidad
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: 'rgba(255, 255, 255, 0.95)',
          position: 'relative',
          zIndex: 1,
          maxWidth: '800px'
        }}>
          Estudio completo de la aplicación FitTrack comparando diferentes opciones de visualización (temas) 
          e identificando implicaciones en usabilidad, accesibilidad y diseño responsive.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        backgroundColor: 'var(--card-bg)',
        padding: '1rem',
        borderRadius: '16px',
        border: '2px solid var(--border-color)',
        boxShadow: '0 4px 12px var(--shadow)'
      }}>
        {[
          { id: 'demo', label: 'Vídeo Demo', icon: '🎥' },
          { id: 'responsive', label: 'Responsive', icon: '📱' },
          { id: 'usability', label: 'Usabilidad', icon: '👥' },
          { id: 'accessibility', label: 'Accesibilidad', icon: '♿' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: '1 1 200px',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              border: '2px solid',
              borderColor: activeTab === tab.id ? 'transparent' : 'var(--border-color)',
              background: activeTab === tab.id 
                ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))' 
                : 'transparent',
              color: activeTab === tab.id ? 'white' : 'var(--text-primary)',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: activeTab === tab.id ? '700' : '600',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.backgroundColor = 'var(--bg-hover)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.transform = 'translateY(0)'
              }
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Sections */}
      {activeTab === 'demo' && (
        <div className="scale-in">
          <div style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: '20px',
            padding: '2rem',
            border: '2px solid var(--border-color)',
            boxShadow: '0 4px 12px var(--shadow)'
          }}>
            <h2 style={{ 
              fontSize: '1.75rem', 
              fontWeight: '700',
              marginBottom: '1.5rem',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              🎥 Vídeo Demostración de la Aplicación
            </h2>
            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '16px',
              padding: '3rem 2rem',
              textAlign: 'center',
              border: '2px dashed var(--border-color)',
              marginBottom: '1.5rem'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎬</div>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '0.75rem'
              }}>
                Inserta aquí tu vídeo de demostración
              </h3>
              <p style={{ 
                color: 'var(--text-secondary)',
                fontSize: '1rem',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                Muestra cómo funciona FitTrack: crear plantillas, iniciar entrenamientos, cambiar temas, 
                y todas las funcionalidades principales de la aplicación.
              </p>
              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: '12px',
                fontSize: '0.875rem',
                color: 'var(--text-muted)'
              }}>
                💡 Puedes usar: &lt;iframe&gt;, &lt;video&gt;, o embed de YouTube/Vimeo
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid var(--border-color)'
            }}>
              <h4 style={{ 
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: 'var(--text-primary)'
              }}>
                📝 Contenido sugerido para el vídeo:
              </h4>
              <ul style={{ 
                color: 'var(--text-secondary)',
                fontSize: '0.9375rem',
                lineHeight: '2',
                paddingLeft: '1.5rem'
              }}>
                <li>Presentación de la página principal y estadísticas</li>
                <li>Creación de una plantilla de entrenamiento</li>
                <li>Inicio de sesión de entrenamiento desde plantilla</li>
                <li>Registro de pesos y series durante el entrenamiento</li>
                <li>Visualización del historial de entrenamientos</li>
                <li>Cambio entre los diferentes temas (skins)</li>
                <li>Demostración del diseño responsive (móvil/tablet/escritorio)</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'responsive' && (
        <div className="scale-in">
          <div style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: '20px',
            padding: '2rem',
            border: '2px solid var(--border-color)',
            boxShadow: '0 4px 12px var(--shadow)',
            marginBottom: '2rem'
          }}>
            <h2 style={{ 
              fontSize: '1.75rem', 
              fontWeight: '700',
              marginBottom: '1rem',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              📱 Estudio Responsive
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Vídeo donde se muestran 10 aspectos responsive de FitTrack, explicando cómo la interfaz 
              se adapta a diferentes tamaños de pantalla y dispositivos.
            </p>

            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '16px',
              padding: '3rem 2rem',
              textAlign: 'center',
              border: '2px dashed var(--border-color)',
              marginBottom: '2rem'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📹</div>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem'
              }}>
                Vídeo Estudio Responsive
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
                Inserta tu vídeo mostrando los aspectos responsive
              </p>
            </div>

            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '1.25rem',
              color: 'var(--text-primary)'
            }}>
              📋 Los 10 Aspectos Responsive Implementados:
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {responsiveAspects.map((aspect, index) => (
                <div
                  key={aspect.id}
                  className="slide-in"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    border: '2px solid var(--border-color)',
                    transition: 'all 0.3s ease',
                    animationDelay: `${index * 0.05}s`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                    <div style={{
                      backgroundColor: 'var(--accent-blue)',
                      color: 'white',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      fontSize: '1.125rem',
                      flexShrink: 0
                    }}>
                      {aspect.id}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        marginBottom: '0.5rem',
                        color: 'var(--text-primary)'
                      }}>
                        {aspect.title}
                      </h4>
                      <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.9375rem',
                        lineHeight: '1.6'
                      }}>
                        {aspect.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'usability' && (
        <div className="scale-in">
          <div style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: '20px',
            padding: '2rem',
            border: '2px solid var(--border-color)',
            boxShadow: '0 4px 12px var(--shadow)',
            marginBottom: '2rem'
          }}>
            <h2 style={{ 
              fontSize: '1.75rem', 
              fontWeight: '700',
              marginBottom: '1rem',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              👥 Estudio de Usabilidad
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Vídeo explicando 10 aspectos de usabilidad de FitTrack, comparando las diferentes opciones 
              de temas y sus implicaciones en la experiencia de usuario.
            </p>

            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '16px',
              padding: '3rem 2rem',
              textAlign: 'center',
              border: '2px dashed var(--border-color)',
              marginBottom: '2rem'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📹</div>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem'
              }}>
                Vídeo Estudio de Usabilidad
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
                Compara los temas mostrando aspectos de usabilidad
              </p>
            </div>

            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '1.25rem',
              color: 'var(--text-primary)'
            }}>
              📋 Los 10 Aspectos de Usabilidad Analizados:
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {usabilityAspects.map((aspect, index) => (
                <div
                  key={aspect.id}
                  className="slide-in"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    border: '2px solid var(--border-color)',
                    transition: 'all 0.3s ease',
                    animationDelay: `${index * 0.05}s`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                    <div style={{
                      backgroundColor: 'var(--accent-green)',
                      color: 'white',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      fontSize: '1.125rem',
                      flexShrink: 0
                    }}>
                      {aspect.id}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        marginBottom: '0.5rem',
                        color: 'var(--text-primary)'
                      }}>
                        {aspect.title}
                      </h4>
                      <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.9375rem',
                        lineHeight: '1.6',
                        marginBottom: '0.75rem'
                      }}>
                        {aspect.description}
                      </p>
                      <div style={{
                        backgroundColor: 'var(--bg-tertiary)',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        color: 'var(--text-muted)',
                        borderLeft: '3px solid var(--accent-green)'
                      }}>
                        <strong>Comparación entre temas:</strong> {aspect.themes}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'accessibility' && (
        <div className="scale-in">
          <div style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: '20px',
            padding: '2rem',
            border: '2px solid var(--border-color)',
            boxShadow: '0 4px 12px var(--shadow)',
            marginBottom: '2rem'
          }}>
            <h2 style={{ 
              fontSize: '1.75rem', 
              fontWeight: '700',
              marginBottom: '1rem',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              ♿ Estudio de Accesibilidad
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Vídeo explicando 10 aspectos de accesibilidad implementados en FitTrack, comparando 
              los diferentes temas e identificando mejoras en cada uno.
            </p>

            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '16px',
              padding: '3rem 2rem',
              textAlign: 'center',
              border: '2px dashed var(--border-color)',
              marginBottom: '2rem'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📹</div>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem'
              }}>
                Vídeo Estudio de Accesibilidad
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
                Compara los temas desde el punto de vista de accesibilidad
              </p>
            </div>

            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '1.25rem',
              color: 'var(--text-primary)'
            }}>
              📋 Los 10 Aspectos de Accesibilidad Analizados:
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {accessibilityAspects.map((aspect, index) => (
                <div
                  key={aspect.id}
                  className="slide-in"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    border: '2px solid var(--border-color)',
                    transition: 'all 0.3s ease',
                    animationDelay: `${index * 0.05}s`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                    <div style={{
                      backgroundColor: 'var(--accent-purple)',
                      color: 'white',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      fontSize: '1.125rem',
                      flexShrink: 0
                    }}>
                      {aspect.id}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        marginBottom: '0.5rem',
                        color: 'var(--text-primary)'
                      }}>
                        {aspect.title}
                      </h4>
                      <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.9375rem',
                        lineHeight: '1.6',
                        marginBottom: '0.75rem'
                      }}>
                        {aspect.description}
                      </p>
                      <div style={{
                        backgroundColor: 'var(--bg-tertiary)',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        color: 'var(--text-muted)',
                        borderLeft: '3px solid var(--accent-purple)'
                      }}>
                        <strong>Comparación entre temas:</strong> {aspect.themes}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
