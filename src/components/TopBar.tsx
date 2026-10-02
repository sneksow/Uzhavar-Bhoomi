import { Link, useNavigate } from '@tanstack/react-router'
import {
  Check,
  ChevronDown,
  Globe,
  LayoutDashboard,
  LogOut,
  Menu,
  Monitor,
  Moon,
  Settings2,
  Sun,
  Type,
  Volume2,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { fontScales, portalPath, useApp, type FontScale, type Theme } from '@/lib/app-context'
import { languages } from '@/lib/i18n'

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-leaf-600 text-white shadow-sm">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 21V11" />
          <path d="M12 11c0-4 3-7 8-7 0 4-3 7-8 7Z" fill="currentColor" fillOpacity=".25" />
          <path d="M12 14c0-3.5-2.5-6-7-6 0 3.5 2.5 6 7 6Z" fill="currentColor" fillOpacity=".25" />
          <path d="M5 21h14" />
        </svg>
      </span>
      {!compact && (
        <span className="leading-tight">
          <span className="block font-display text-lg font-semibold tracking-tight text-leaf-900 dark:text-leaf-50">
            Uzhavar Bhoomi
          </span>
          <span className="block text-[11px] font-medium text-leaf-600 dark:text-leaf-300">உழவர் பூமி</span>
        </span>
      )}
    </span>
  )
}

export function TopBar() {
  const { session, openAuth, signOut, t, hydrated } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-leaf-100/80 bg-soil-50/85 backdrop-blur-md dark:border-leaf-800 dark:bg-leaf-950/85">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
          <button
            onClick={() => setMenuOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-xl text-leaf-800 transition hover:bg-leaf-100 dark:text-leaf-100 dark:hover:bg-leaf-800"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="mr-auto">
            <Logo />
          </Link>

          {hydrated && session ? (
            <div className="flex items-center gap-2">
              <Link
                to={portalPath(session.role)}
                className="hidden items-center gap-2 rounded-full bg-leaf-100 px-3 py-1.5 text-sm font-medium text-leaf-800 sm:flex dark:bg-leaf-800 dark:text-leaf-100"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-leaf-600 text-xs font-bold text-white">
                  {session.name.charAt(0).toUpperCase()}
                </span>
                {session.name}
                <span className="text-xs capitalize text-leaf-600 dark:text-leaf-300">· {session.role}</span>
              </Link>
              <button
                onClick={() => {
                  signOut()
                  navigate({ to: '/' })
                }}
                className="grid h-10 w-10 place-items-center rounded-xl text-leaf-700 hover:bg-leaf-100 dark:text-leaf-200 dark:hover:bg-leaf-800"
                aria-label={t('logout')}
                title={t('logout')}
              >
                <LogOut className="h-4.5 w-4.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={() => openAuth('login')} className="btn-ghost hidden !py-2 sm:inline-flex">
                {t('signIn')}
              </button>
              <button onClick={() => openAuth('register')} className="btn-primary !py-2">
                {t('register')}
              </button>
            </div>
          )}
        </div>
      </header>
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

function SideMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { session, settings, updateSettings, t, openAuth, signOut } = useApp()
  const navigate = useNavigate()
  const [langOpen, setLangOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const currentLang = languages.find((l) => l.code === settings.language) ?? languages[0]

  const goDashboard = () => {
    onClose()
    if (session) navigate({ to: portalPath(session.role) })
    else openAuth('login')
  }

  const themes: { id: Theme; label: string; icon: typeof Sun }[] = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'Auto', icon: Monitor },
  ]

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-leaf-950/40 backdrop-blur-[2px] transition-opacity ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />
      <aside
        className={`fixed top-0 left-0 z-50 flex h-full w-[22rem] max-w-[90vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out dark:bg-leaf-900 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-leaf-100 px-5 py-4 dark:border-leaf-800">
          <Logo />
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg hover:bg-leaf-50 dark:hover:bg-leaf-800"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6">
          <button
            onClick={goDashboard}
            className="flex w-full items-center gap-3 rounded-xl bg-leaf-50 px-4 py-3.5 text-left font-semibold text-leaf-800 transition hover:bg-leaf-100 dark:bg-leaf-800 dark:text-leaf-50 dark:hover:bg-leaf-700"
          >
            <LayoutDashboard className="h-5 w-5 text-leaf-600 dark:text-leaf-300" />
            <span className="flex-1">{t('dashboard')}</span>
            {!session && <span className="text-xs font-medium text-leaf-500">{t('signIn')}</span>}
          </button>

          <section>
            <h3 className="eyebrow mb-3 flex items-center gap-2">
              <Settings2 className="h-3.5 w-3.5" /> {t('settings')}
            </h3>
            <div className="space-y-4 rounded-2xl border border-leaf-100 p-4 dark:border-leaf-800">
              <div>
                <p className="mb-2 text-sm font-medium">{t('theme')}</p>
                <div className="grid grid-cols-3 gap-1 rounded-xl bg-leaf-50 p-1 dark:bg-leaf-950">
                  {themes.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => updateSettings({ theme: id })}
                      className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition ${settings.theme === id ? 'bg-white text-leaf-800 shadow-sm dark:bg-leaf-700 dark:text-white' : 'text-leaf-600 dark:text-leaf-300'}`}
                    >
                      <Icon className="h-3.5 w-3.5" /> {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Type className="h-4 w-4 text-leaf-500" /> {t('fontSize')}
                </p>
                <div className="grid grid-cols-4 gap-1 rounded-xl bg-leaf-50 p-1 dark:bg-leaf-950">
                  {(Object.keys(fontScales) as FontScale[]).map((k) => (
                    <button
                      key={k}
                      onClick={() => updateSettings({ fontScale: k })}
                      className={`rounded-lg py-2 text-xs font-bold transition ${settings.fontScale === k ? 'bg-white text-leaf-800 shadow-sm dark:bg-leaf-700 dark:text-white' : 'text-leaf-600 dark:text-leaf-300'}`}
                    >
                      {fontScales[k].label}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex cursor-pointer items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <Volume2 className="h-4 w-4 text-leaf-500" /> {t('voice')}
                </span>
                <Toggle checked={settings.voice} onChange={(voice) => updateSettings({ voice })} />
              </label>
            </div>
          </section>

          <section>
            <h3 className="eyebrow mb-3 flex items-center gap-2">
              <Globe className="h-3.5 w-3.5" /> {t('language')}
            </h3>
            <button
              onClick={() => setLangOpen((o) => !o)}
              className="flex w-full items-center justify-between rounded-xl border border-leaf-200 px-4 py-3 text-sm font-medium dark:border-leaf-700"
              aria-expanded={langOpen}
            >
              <span>
                {currentLang.native} <span className="text-leaf-500">· {currentLang.name}</span>
              </span>
              <ChevronDown className={`h-4 w-4 transition ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            {langOpen && (
              <ul className="mt-2 max-h-72 overflow-y-auto rounded-xl border border-leaf-100 p-1 dark:border-leaf-800">
                {languages.map((l) => (
                  <li key={l.code}>
                    <button
                      onClick={() => {
                        updateSettings({ language: l.code })
                        setLangOpen(false)
                      }}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-leaf-50 dark:hover:bg-leaf-800"
                    >
                      <span>
                        <span className="font-medium">{l.native}</span>{' '}
                        <span className="text-leaf-500">{l.name}</span>
                      </span>
                      {l.code === settings.language && <Check className="h-4 w-4 text-leaf-600" />}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {session && (
          <div className="border-t border-leaf-100 p-4 dark:border-leaf-800">
            <button
              onClick={() => {
                signOut()
                onClose()
                navigate({ to: '/' })
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-chilli-500 hover:bg-red-50 dark:hover:bg-leaf-800"
            >
              <LogOut className="h-4 w-4" /> {t('logout')}
            </button>
          </div>
        )}
      </aside>
    </>
  )
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked ? 'bg-leaf-600' : 'bg-leaf-200 dark:bg-leaf-700'}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : ''}`}
      />
    </button>
  )
}
