import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { THEME_KEY } from '../utils/constants'

export function useTheme() {
  const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  const [theme, setTheme] = useLocalStorage(THEME_KEY, prefersDark ? 'dark' : 'light')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  function toggleTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return [theme, toggleTheme]
}
