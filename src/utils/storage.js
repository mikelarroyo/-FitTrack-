const TEMPLATES_KEY = 'fittrack_templates'
const SESSIONS_KEY = 'fittrack_sessions'

// Plantillas de ejemplo (sin pesos)
const SAMPLE_TEMPLATES = [
  {
    id: 'template-1',
    name: 'Torso Hipertrofia',
    category: 'torso',
    exercises: [
      { name: 'Press Banca', series: 4, reps: 10 },
      { name: 'Remo con Barra', series: 4, reps: 8 },
      { name: 'Press Militar', series: 3, reps: 12 },
      { name: 'Dominadas', series: 3, reps: 10 }
    ],
    isTemplate: true
  },
  {
    id: 'template-2',
    name: 'Pierna Fuerza',
    category: 'pierna',
    exercises: [
      { name: 'Sentadilla', series: 5, reps: 5 },
      { name: 'Prensa', series: 4, reps: 10 },
      { name: 'Peso Muerto', series: 5, reps: 3 },
      { name: 'Zancadas', series: 3, reps: 12 }
    ],
    isTemplate: true
  }
]

// Sesiones completadas de ejemplo
const SAMPLE_SESSIONS = [
  {
    id: 'session-1',
    templateId: 'template-1',
    name: 'Torso Hipertrofia',
    category: 'torso',
    exercises: [
      { name: 'Press Banca', series: 4, reps: 10, weights: [60, 60, 62.5, 62.5], notes: 'Buena técnica' },
      { name: 'Remo con Barra', series: 4, reps: 8, weights: [70, 70, 70, 67.5], notes: '' },
      { name: 'Press Militar', series: 3, reps: 12, weights: [40, 40, 37.5], notes: '' },
      { name: 'Dominadas', series: 3, reps: 10, weights: [0, 0, 0], notes: 'Sin lastre' }
    ],
    totalVolume: 4455,
    duration: 62,
    date: new Date('2026-02-07T18:30:00').toISOString(),
    time: '18:30',
    notes: 'Excelente sesión',
    completed: true
  }
]

export function getTemplates() {
  try {
    const stored = localStorage.getItem(TEMPLATES_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
    return SAMPLE_TEMPLATES
  } catch (error) {
    console.error('Error loading templates:', error)
    return SAMPLE_TEMPLATES
  }
}

export function saveTemplates(templates) {
  try {
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates))
  } catch (error) {
    console.error('Error saving templates:', error)
  }
}

export function getSessions() {
  try {
    const stored = localStorage.getItem(SESSIONS_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
    return SAMPLE_SESSIONS
  } catch (error) {
    console.error('Error loading sessions:', error)
    return SAMPLE_SESSIONS
  }
}

export function saveSessions(sessions) {
  try {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions))
  } catch (error) {
    console.error('Error saving sessions:', error)
  }
}

export function clearAll() {
  try {
    localStorage.removeItem(TEMPLATES_KEY)
    localStorage.removeItem(SESSIONS_KEY)
  } catch (error) {
    console.error('Error clearing data:', error)
  }
}
