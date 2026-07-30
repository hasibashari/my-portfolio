'use client'

import { createContext, useContext, useState, useMemo, useEffect, ReactNode } from 'react'
import { ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material'
import { lightTheme, darkTheme } from '../lib/theme'

type ThemeContextType = {
  mode: 'light' | 'dark'
  toggleColorMode: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark',
  toggleColorMode: () => {},
})

export const useThemeContext = () => useContext(ThemeContext)

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedMode = localStorage.getItem('themeMode') as 'light' | 'dark'
    if (savedMode) {
      setMode(savedMode)
    }
  }, [])

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light'
          localStorage.setItem('themeMode', newMode)
          return newMode
        })
      },
    }),
    [mode],
  )

  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  )
}
