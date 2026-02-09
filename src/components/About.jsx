export default function About() {
  return (
    <div className="fade-in" style={{ paddingBottom: '2rem' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--accent-green), var(--accent-blue))',
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
          👨‍💻 Sobre Nosotros
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: 'rgba(255, 255, 255, 0.95)',
          position: 'relative',
          zIndex: 1
        }}>
          Conoce al desarrollador y el contexto de esta aplicación
        </p>
      </div>

      {/* Main Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* Developer Card */}
        <div className="scale-in" style={{
          backgroundColor: 'var(--card-bg)',
          borderRadius: '20px',
          padding: '2rem',
          border: '2px solid var(--border-color)',
          boxShadow: '0 4px 12px var(--shadow)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
            margin: '0 auto 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '4rem',
            boxShadow: '0 8px 24px var(--shadow)'
          }}>
            👨‍💻
          </div>
          
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            marginBottom: '0.5rem',
            color: 'var(--text-primary)'
          }}>
            Mikel Arroyo Gomez
          </h2>
          
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--accent-blue)',
            fontWeight: '600',
            marginBottom: '1.5rem'
          }}>
            Desarrollador Web Full Stack
          </p>

          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1rem',
            textAlign: 'left'
          }}>
            <div style={{ 
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              fontWeight: '600',
              letterSpacing: '0.5px'
            }}>
              📧 Contacto
            </div>
            <a 
              href="mailto:mikelarroyogomez@gmail.com"
              style={{
                color: 'var(--accent-blue)',
                textDecoration: 'none',
                fontSize: '0.9375rem',
                wordBreak: 'break-all'
              }}
            >
              mikelarroyogomez@gmail.com
            </a>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '12px',
            padding: '1rem',
            textAlign: 'left'
          }}>
            <div style={{ 
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              fontWeight: '600',
              letterSpacing: '0.5px'
            }}>
              📍 Ubicación
            </div>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.9375rem',
              margin: 0
            }}>
              Getxo-Algorta, Bizkaia, España
            </p>
          </div>
        </div>

        {/* Education & Project Info */}
        <div className="scale-in" style={{
          backgroundColor: 'var(--card-bg)',
          borderRadius: '20px',
          padding: '2rem',
          border: '2px solid var(--border-color)',
          boxShadow: '0 4px 12px var(--shadow)',
          animationDelay: '0.1s'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🎓 Formación Académica
          </h3>

          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            borderLeft: '4px solid var(--accent-blue)'
          }}>
            <h4 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}>
              Técnico Superior en Desarrollo de Aplicaciones Web
            </h4>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.9375rem',
              marginBottom: '0.5rem'
            }}>
              I.E.S. Gregorio Prieto
            </p>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.875rem'
            }}>
              📅 10/09/2024 - Actualidad • Valdepeñas, España
            </p>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '12px',
            padding: '1.5rem',
            borderLeft: '4px solid var(--accent-purple)'
          }}>
            <h4 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '0.75rem'
            }}>
              Otras titulaciones relevantes
            </h4>
            <ul style={{
              color: 'var(--text-secondary)',
              fontSize: '0.9375rem',
              lineHeight: '1.8',
              paddingLeft: '1.25rem'
            }}>
              <li>Máster profesional en Alto Rendimiento (UB)</li>
              <li>Máster Universitario en Formación del Profesorado (VIU)</li>
              <li>Grado en Ciencias de la Actividad Física y del Deporte (UPV/EHU)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Project Info Card */}
      <div className="scale-in" style={{
        backgroundColor: 'var(--card-bg)',
        borderRadius: '20px',
        padding: '2rem',
        border: '2px solid var(--border-color)',
        boxShadow: '0 4px 12px var(--shadow)',
        animationDelay: '0.2s',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          📚 Sobre este Proyecto
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎯</div>
            <h4 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}>
              Propósito
            </h4>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.9375rem',
              lineHeight: '1.6'
            }}>
              FitTrack es una aplicación práctica desarrollada como proyecto del módulo de 
              <strong> Diseño de Interfaces Web</strong> del Técnico Superior en Desarrollo de Aplicaciones Web.
            </p>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔬</div>
            <h4 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}>
              Enfoque
            </h4>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.9375rem',
              lineHeight: '1.6'
            }}>
              Estudio de <strong>usabilidad</strong>, <strong>accesibilidad</strong> y 
              <strong> diseño responsive</strong>, comparando diferentes opciones de visualización 
              mediante un sistema de temas (skins).
            </p>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>⚙️</div>
            <h4 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}>
              Tecnologías
            </h4>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.9375rem',
              lineHeight: '1.6'
            }}>
              Desarrollado con <strong>React</strong>, <strong>React Router</strong>, 
              y <strong>CSS Variables</strong> para un sistema de temas dinámico. 
              Utiliza <strong>Vite</strong> como bundler y <strong>LocalStorage</strong> para persistencia.
            </p>
          </div>
        </div>
      </div>

      {/* Skills Card */}
      <div className="scale-in" style={{
        backgroundColor: 'var(--card-bg)',
        borderRadius: '20px',
        padding: '2rem',
        border: '2px solid var(--border-color)',
        boxShadow: '0 4px 12px var(--shadow)',
        animationDelay: '0.3s'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          💼 Competencias Digitales
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {[
            { name: 'HTML, CSS, JavaScript', icon: '🌐' },
            { name: 'React & React Router', icon: '⚛️' },
            { name: 'PHP & MySQL', icon: '🐘' },
            { name: 'Git & GitHub', icon: '🔀' },
            { name: 'Docker', icon: '🐳' },
            { name: 'Java (POO)', icon: '☕' },
            { name: 'Metodologías Ágiles', icon: '🔄' },
            { name: 'Diseño UI/UX', icon: '🎨' }
          ].map((skill, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                padding: '1rem',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                border: '1px solid var(--border-color)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.borderColor = 'var(--accent-blue)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'var(--border-color)'
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>{skill.icon}</span>
              <span style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9375rem',
                fontWeight: '500'
              }}>
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div style={{
        backgroundColor: 'var(--bg-tertiary)',
        borderRadius: '12px',
        padding: '1.5rem',
        marginTop: '2rem',
        textAlign: 'center',
        border: '2px solid var(--border-color)'
      }}>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.9375rem',
          lineHeight: '1.6',
          margin: 0
        }}>
          💡 <strong>Nota:</strong> FitTrack es un proyecto educativo desarrollado con fines de aprendizaje 
          en el contexto del módulo de <strong>Diseño de Interfaces Web</strong> del ciclo de 
          Desarrollo de Aplicaciones Web en el I.E.S. Gregorio Prieto.
        </p>
      </div>
    </div>
  )
}
