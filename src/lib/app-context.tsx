import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { languages, rtlLanguages, translate, type StringKey } from './i18n'

export type Role = 'customer' | 'farmer'
export type Theme = 'light' | 'dark' | 'system'
export type FontScale = 'sm' | 'md' | 'lg' | 'xl'

export interface Settings {
  theme: Theme
  fontScale: FontScale
  voice: boolean
  language: string
}

// Milestone 1 keeps the signed-in user in localStorage only.
// Real accounts (Netlify Identity) replace this in a later milestone.
export interface Session {
  name: string
  contact: string
  role: Role
}

export const fontScales: Record<FontScale, { label: string; value: string }> = {
  sm: { label: 'A-', value: '90%' },
  md: { label: 'A', value: '100%' },
  lg: { label: 'A+', value: '112.5%' },
  xl: { label: 'A++', value: '125%' },
}

const defaultSettings: Settings = { theme: 'light', fontScale: 'md', voice: true, language: 'en' }

export const portalPath = (role: Role): '/farmer-dashboard' | '/customer-portal' =>
  (role === 'farmer' ? '/farmer-dashboard' : '/customer-portal')

interface AuthModalState {
  open: boolean
  mode: 'login' | 'register'
  role: Role
}

interface AppContextValue {
  hydrated: boolean
  settings: Settings
  updateSettings: (patch: Partial<Settings>) => void
  session: Session | null
  signIn: (session: Session) => void
  signOut: () => void
  auth: AuthModalState
  openAuth: (mode: 'login' | 'register', role?: Role) => void
  closeAuth: () => void
  t: (key: StringKey) => string
  speechLang: string
}

const AppContext = createContext<AppContextValue | null>(null)

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback
  } catch {
    return fallback
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false)
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [session, setSession] = useState<Session | null>(null)
  const [auth, setAuth] = useState<AuthModalState>({ open: false, mode: 'login', role: 'customer' })

  useEffect(() => {
    setSettings(readJson('ub.settings', defaultSettings))
    const stored = localStorage.getItem('ub.session')
    if (stored) {
      try {
        setSession(JSON.parse(stored))
      } catch {
        localStorage.removeItem('ub.session')
      }
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem('ub.settings', JSON.stringify(settings))
    const root = document.documentElement
    const dark =
      settings.theme === 'dark' ||
      (settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    root.classList.toggle('dark', dark)
    root.style.setProperty('--ub-font-scale', fontScales[settings.fontScale].value)
    root.lang = settings.language
    root.dir = rtlLanguages.has(settings.language) ? 'rtl' : 'ltr'
  }, [settings, hydrated])

  const updateSettings = useCallback((patch: Partial<Settings>) => {
    setSettings((s) => ({ ...s, ...patch }))
  }, [])

  const signIn = useCallback((next: Session) => {
    localStorage.setItem('ub.session', JSON.stringify(next))
    setSession(next)
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('ub.session')
    setSession(null)
  }, [])

  const openAuth = useCallback((mode: 'login' | 'register', role: Role = 'customer') => {
    setAuth({ open: true, mode, role })
  }, [])
  const closeAuth = useCallback(() => setAuth((a) => ({ ...a, open: false })), [])

  const value = useMemo<AppContextValue>(
    () => ({
      hydrated,
      settings,
      updateSettings,
      session,
      signIn,
      signOut,
      auth,
      openAuth,
      closeAuth,
      t: (key) => translate(settings.language, key),
      speechLang: languages.find((l) => l.code === settings.language)?.speech ?? 'en-IN',
    }),
    [hydrated, settings, updateSettings, session, signIn, signOut, auth, openAuth, closeAuth],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}

export const img = (src: string, w: number, h?: number) =>
  `/.netlify/images?url=${encodeURIComponent(src)}&w=${w}${h ? `&h=${h}&fit=cover` : ''}&fm=webp`
