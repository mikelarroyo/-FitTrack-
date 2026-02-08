import { createContext, useContext, useState, useEffect } from 'react'
import { getTemplates, saveTemplates, getSessions, saveSessions } from '../utils/storage'

const WorkoutContext = createContext()

export function WorkoutProvider({ children }) {
  const [templates, setTemplates] = useState([])
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    const loadedTemplates = getTemplates()
    const loadedSessions = getSessions()
    setTemplates(loadedTemplates)
    setSessions(loadedSessions)
  }, [])

  useEffect(() => {
    if (templates.length > 0) {
      saveTemplates(templates)
    }
  }, [templates])

  useEffect(() => {
    if (sessions.length > 0) {
      saveSessions(sessions)
    }
  }, [sessions])

  // Template operations
  const addTemplate = (template) => {
    setTemplates([template, ...templates])
  }

  const updateTemplate = (updatedTemplate) => {
    setTemplates(templates.map(t => t.id === updatedTemplate.id ? updatedTemplate : t))
  }

  const deleteTemplate = (id) => {
    setTemplates(templates.filter(t => t.id !== id))
  }

  // Session operations
  const addSession = (session) => {
    setSessions([session, ...sessions])
  }

  const updateSession = (updatedSession) => {
    setSessions(sessions.map(s => s.id === updatedSession.id ? updatedSession : s))
  }

  const deleteSession = (id) => {
    setSessions(sessions.filter(s => s.id !== id))
  }

  return (
    <WorkoutContext.Provider value={{ 
      templates, 
      sessions, 
      addTemplate, 
      updateTemplate, 
      deleteTemplate,
      addSession,
      updateSession,
      deleteSession
    }}>
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
