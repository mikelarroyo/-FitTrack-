const STORAGE_KEY = 'fittrack_workouts'

// Datos de ejemplo iniciales
const SAMPLE_DATA = [
  {
    id: '1',
    name: 'Torso Hipertrofia',
    category: 'torso',
    duration: 62,
    exercises: [
      { name: 'Press Banca', series: 4, reps: 10, weight: 60 },
      { name: 'Remo con Barra', series: 4, reps: 8, weight: 70 },
      { name: 'Press Militar', series: 3, reps: 12, weight: 40 },
      { name: 'Dominadas', series: 3, reps: 10, weight: 0 }
    ],
    totalVolume: 4500,
    date: new Date('2026-02-10T18:30:00').toISOString(),
    time: '18:30',
    completed: true,
    draft: false
  },
  {
    id: '2',
    name: 'Pierna Fuerza',
    category: 'pierna',
    duration: 75,
    exercises: [
      { name: 'Sentadilla', series: 5, reps: 5, weight: 100 },
      { name: 'Prensa', series: 4, reps: 10, weight: 180 },
      { name: 'Peso Muerto', series: 5, reps: 3, weight: 120 },
      { name: 'Zancadas', series: 3, reps: 12, weight: 20 },
      { name: 'Curl Femoral', series: 3, reps: 12, weight: 40 }
    ],
    totalVolume: 6200,
    date: new Date('2026-02-08T17:00:00').toISOString(),
    time: '17:00',
    completed: true,
    draft: false
  }
]

export function getWorkouts() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
    // Si no hay datos, devolver datos de ejemplo
    return SAMPLE_DATA
  } catch (error) {
    console.error('Error loading workouts:', error)
    return SAMPLE_DATA
  }
}

export function saveWorkouts(workouts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts))
  } catch (error) {
    console.error('Error saving workouts:', error)
  }
}

export function clearWorkouts() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing workouts:', error)
  }
}
