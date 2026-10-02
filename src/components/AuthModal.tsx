import { useNavigate } from '@tanstack/react-router'
import { ArrowRight, Eye, EyeOff, Lock, Phone, ShoppingBasket, Sprout, User, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { portalPath, useApp, type Role } from '@/lib/app-context'
import { Logo } from './TopBar'

const phoneOrEmail = /^(\+?91[\s-]?)?[6-9]\d{9}$|^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function AuthModal() {
  const { auth, closeAuth, openAuth, signIn } = useApp()
  const navigate = useNavigate()
  const [role, setRole] = useState<Role>(auth.role)
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const isRegister = auth.mode === 'register'

  useEffect(() => {
    if (auth.open) {
      setRole(auth.role)
      setError(null)
      setSubmitting(false)
    }
  }, [auth.open, auth.role, auth.mode])

  useEffect(() => {
    if (!auth.open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeAuth()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [auth.open, closeAuth])

  if (!auth.open) return null

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = contact.trim()
    if (isRegister && name.trim().length < 2) return setError('Please enter your full name.')
    if (!phoneOrEmail.test(value.replace(/\s/g, ''))) return setError('Enter a valid 10-digit mobile number or email address.')
    if (password.length < 6) return setError('Password must be at least 6 characters.')
    setError(null)
    setSubmitting(true)
    // Sample sign-in: any valid details are accepted until real accounts are connected.
    setTimeout(() => {
      const displayName = isRegister
        ? name.trim()
        : value.includes('@')
          ? value.split('@')[0]
          : role === 'farmer'
            ? 'Murugan'
            : 'Priya'
      signIn({ name: displayName, contact: value, role })
      closeAuth()
      setPassword('')
      navigate({ to: portalPath(role) })
    }, 450)
  }

  const roles: { id: Role; label: string; hint: string; icon: typeof Sprout }[] = [
    { id: 'customer', label: 'Customer', hint: 'Buy fresh produce', icon: ShoppingBasket },
    { id: 'farmer', label: 'Farmer', hint: 'Sell & manage farm', icon: Sprout },
  ]

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto p-4" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <div onClick={closeAuth} className="absolute inset-0 bg-leaf-950/50 backdrop-blur-sm" />
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-leaf-900">
        <div className="relative bg-leaf-600 px-7 pt-6 pb-8 text-white">
          <button
            onClick={closeAuth}
            className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-full bg-white/15 hover:bg-white/25"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="[&_*]:!text-white">
            <Logo compact />
          </div>
          <h2 id="auth-title" className="mt-4 text-center text-2xl font-extrabold tracking-[0.3em]">
            {isRegister ? 'REGISTER' : 'LOGIN'}
          </h2>
          <p className="mt-1 text-center text-sm text-leaf-100">
            {isRegister ? 'Create your Uzhavar Bhoomi account' : 'Welcome back to Uzhavar Bhoomi'}
          </p>
        </div>

        <form onSubmit={submit} className="-mt-4 space-y-4 rounded-t-3xl bg-white px-7 pt-6 pb-7 dark:bg-leaf-900" noValidate>
          <fieldset>
            <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-leaf-500">I am a</legend>
            <div className="grid grid-cols-2 gap-2 rounded-2xl bg-leaf-50 p-1.5 dark:bg-leaf-950" role="radiogroup">
              {roles.map(({ id, label, hint, icon: Icon }) => (
                <button
                  type="button"
                  key={id}
                  role="radio"
                  aria-checked={role === id}
                  onClick={() => setRole(id)}
                  className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition ${role === id ? 'bg-white shadow-sm ring-1 ring-leaf-200 dark:bg-leaf-800 dark:ring-leaf-600' : 'opacity-70 hover:opacity-100'}`}
                >
                  <span className={`grid h-8 w-8 place-items-center rounded-lg ${role === id ? 'bg-leaf-600 text-white' : 'bg-leaf-100 text-leaf-600 dark:bg-leaf-800'}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{label}</span>
                    <span className="block text-[11px] text-leaf-500">{hint}</span>
                  </span>
                </button>
              ))}
            </div>
          </fieldset>

          {isRegister && (
            <Field icon={User} label="Full name">
              <input className="input !pl-11" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Murugan K." autoComplete="name" />
            </Field>
          )}
          <Field icon={Phone} label="Phone number / Email">
            <input
              className="input !pl-11"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="98765 43210 or you@example.com"
              autoComplete="username"
              inputMode="email"
            />
          </Field>
          <Field icon={Lock} label="Password">
            <input
              className="input !pr-11 !pl-11"
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              autoComplete={isRegister ? 'new-password' : 'current-password'}
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="absolute top-1/2 right-3 -translate-y-1/2 p-1 text-leaf-400 hover:text-leaf-600"
              aria-label={showPw ? 'Hide password' : 'Show password'}
            >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </Field>

          {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-chilli-500 dark:bg-red-950/40">{error}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full !py-3.5 !text-base">
            {submitting ? 'Please wait…' : isRegister ? 'Register Now' : 'Enter Portal'}
            {!submitting && <ArrowRight className="h-4 w-4" />}
          </button>

          <p className="text-center text-sm text-leaf-600 dark:text-leaf-300">
            {isRegister ? 'Already have an account?' : 'New to Uzhavar Bhoomi?'}{' '}
            <button
              type="button"
              onClick={() => openAuth(isRegister ? 'login' : 'register', role)}
              className="font-semibold text-leaf-700 underline-offset-4 hover:underline dark:text-leaf-100"
            >
              {isRegister ? 'Login' : 'Register'}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

function Field({ icon: Icon, label, children }: { icon: typeof User; label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <span className="relative block">
        <Icon className="pointer-events-none absolute top-1/2 left-4 z-10 h-4 w-4 -translate-y-1/2 text-leaf-400" />
        {children}
      </span>
    </label>
  )
}
