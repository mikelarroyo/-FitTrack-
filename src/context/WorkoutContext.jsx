import { createContext, useContext, useState, useEffect } from 'react'
import { getWorkouts, saveWorkouts } from '../utils/storage'

const WorkoutContext = createContext()

export function WorkoutProvider({ children }) {
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    const loadedWorkouts = getWorkouts()
    setWorkouts(loadedWorkouts)
  }, [])

  useEffect(() => {
    saveWorkouts(workouts)
  }, [workouts])

  const addWorkout = (workout) => {
    setWorkouts([workout, ...workouts])
  }

  const updateWorkout = (updatedWorkout) => {
    setWorkouts(workouts.map(w => w.id === updatedWorkout.id ? updatedWorkout : w))
  }

  const deleteWorkout = (id) => {
    setWorkouts(workouts.filter(w => w.id !== id))
  }

  return (
    <WorkoutContext.Provider value={{ workouts, addWorkout, updateWorkout, deleteWorkout }}>
      {children}
    </WorkoutContext.Provider>
  )
}

export function useWorkouts() {
  const context = useContext(WorkoutContext)
  if (!context) {
    throw new Error('useWorkouts must be used within a WorkoutProvider')
  }
  return context
}
