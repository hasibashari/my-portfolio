'use client'

import { createContext, useContext, useState, useMemo, ReactNode, useSyncExternalStore } from 'react'
import { ThemeProvider as MUIThemeProvider } from '@mui/material'
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

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

function getClientSnapshot(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark'
  const saved = localStorage.getItem('themeMode')
  return saved === 'light' ? 'light' : 'dark'
}

function getServerSnapshot(): 'light' | 'dark' {
  return 'dark'
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const storeMode = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)
  const [localMode, setLocalMode] = useState<'light' | 'dark' | null>(null)

  const mode = localMode ?? storeMode

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        const newMode = mode === 'light' ? 'dark' : 'light'
        setLocalMode(newMode)
        try {
          localStorage.setItem('themeMode', newMode)
          window.dispatchEvent(new Event('storage'))
        } catch {
          // localStorage disabled/restricted
        }
      },
    }),
    [mode],
  )

  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode])

  return (
    <ThemeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  )
}
