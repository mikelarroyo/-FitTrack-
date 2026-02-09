import { useEffect, useState } from 'react'

const THEMES = {
  dark: {
    name: 'Dark',
    icon: '🌙',
    colors: {
      '--bg-primary': '#1e293b',
      '--bg-secondary': '#0f172a',
      '--bg-tertiary': '#334155',
      '--bg-hover': '#475569',
      '--text-primary': '#f1f5f9',
      '--text-secondary': '#cbd5e1',
      '--text-muted': '#94a3b8',
      '--border-color': '#334155',
      '--accent-green': '#10b981',
      '--accent-blue': '#3b82f6',
      '--accent-orange': '#f59e0b',
      '--accent-red': '#ef4444',
      '--accent-purple': '#a855f7',
      '--shadow': 'rgba(0, 0, 0, 0.3)',
      '--card-bg': '#1e293b',
      '--navbar-bg': '#0f172a'
    }
  },
  light: {
    name: 'Light',
    icon: '☀️',
    colors: {
      '--bg-primary': '#ffffff',
      '--bg-secondary': '#f8fafc',
      '--bg-tertiary': '#e2e8f0',
      '--bg-hover': '#f1f5f9',
      '--text-primary': '#0f172a',
      '--text-secondary': '#475569',
      '--text-muted': '#64748b',
      '--border-color': '#e2e8f0',
      '--accent-green': '#10b981',
      '--accent-blue': '#3b82f6',
      '--accent-orange': '#f59e0b',
      '--accent-red': '#ef4444',
      '--accent-purple': '#a855f7',
      '--shadow': 'rgba(0, 0, 0, 0.1)',
      '--card-bg': '#ffffff',
      '--navbar-bg': '#ffffff'
    }
  },
  ocean: {
    name: 'Ocean',
    icon: '🌊',
    colors: {
      '--bg-primary': '#0c4a6e',
      '--bg-secondary': '#075985',
      '--bg-tertiary': '#0e7490',
      '--bg-hover': '#06b6d4',
      '--text-primary': '#f0f9ff',
      '--text-secondary': '#e0f2fe',
      '--text-muted': '#bae6fd',
      '--border-color': '#0e7490',
      '--accent-green': '#10b981',
      '--accent-blue': '#06b6d4',
      '--accent-orange': '#fb923c',
      '--accent-red': '#f87171',
      '--accent-purple': '#c084fc',
      '--shadow': 'rgba(6, 182, 212, 0.2)',
      '--card-bg': '#0c4a6e',
      '--navbar-bg': '#075985'
    }
  },
  sunset: {
    name: 'Sunset',
    icon: '🌅',
    colors: {
      '--bg-primary': '#451a03',
      '--bg-secondary': '#7c2d12',
      '--bg-tertiary': '#9a3412',
      '--bg-hover': '#c2410c',
      '--text-primary': '#fff7ed',
      '--text-secondary': '#fed7aa',
      '--text-muted': '#fdba74',
      '--border-color': '#9a3412',
      '--accent-green': '#22c55e',
      '--accent-blue': '#60a5fa',
      '--accent-orange': '#fb923c',
      '--accent-red': '#f87171',
      '--accent-purple': '#e879f9',
      '--shadow': 'rgba(251, 146, 60, 0.3)',
      '--card-bg': '#451a03',
      '--navbar-bg': '#7c2d12'
    }
  }
}

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('fittrack-theme')
    return saved || 'dark'
  })

  useEffect(() => {
    const theme = THEMES[currentTheme]
    if (theme) {
      Object.entries(theme.colors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value)
      })
      localStorage.setItem('fittrack-theme', currentTheme)
    }
  }, [currentTheme])

  const changeTheme = (themeName) => {
    if (THEMES[themeName]) {
      setCurrentTheme(themeName)
    }
  }

  const cycleTheme = () => {
    const themeKeys = Object.keys(THEMES)
    const currentIndex = themeKeys.indexOf(currentTheme)
    const nextIndex = (currentIndex + 1) % themeKeys.length
    setCurrentTheme(themeKeys[nextIndex])
  }

  return {
    currentTheme,
    changeTheme,
    cycleTheme,
    themes: THEMES,
    themeConfig: THEMES[currentTheme]
  }
}
