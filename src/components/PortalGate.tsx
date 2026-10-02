import { Link } from '@tanstack/react-router'
import { Lock, Loader2 } from 'lucide-react'
import { portalPath, useApp, type Role } from '@/lib/app-context'

/** Renders children only for a signed-in user with the required role. */
export function PortalGate({ role, children }: { role: Role; children: React.ReactNode }) {
  const { hydrated, session, openAuth } = useApp()

  if (!hydrated) {
    return (
      <div className="grid min-h-[60vh] place-items-center text-leaf-500">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (session?.role === role) return <>{children}</>

  const label = role === 'farmer' ? 'Farmer Portal' : 'Customer Portal'
  return (
    <div className="grid min-h-[70vh] place-items-center px-4">
      <div className="card max-w-md p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-leaf-100 text-leaf-700 dark:bg-leaf-800 dark:text-leaf-100">
          <Lock className="h-6 w-6" />
        </span>
        <h1 className="mt-5 font-display text-2xl font-semibold">Sign in to open the {label}</h1>
        {session ? (
          <>
            <p className="mt-2 text-sm text-leaf-600 dark:text-leaf-300">
              You're signed in as a <b className="capitalize">{session.role}</b>. This area is for{' '}
              {role === 'farmer' ? 'farmers' : 'customers'} only.
            </p>
            <Link to={portalPath(session.role)} className="btn-primary mt-6">
              Go to my portal
            </Link>
          </>
        ) : (
          <>
            <p className="mt-2 text-sm text-leaf-600 dark:text-leaf-300">
              Please log in or create a {role} account to continue.
            </p>
            <div className="mt-6 flex justify-center gap-2">
              <button className="btn-ghost" onClick={() => openAuth('login', role)}>
                Login
              </button>
              <button className="btn-primary" onClick={() => openAuth('register', role)}>
                Register
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
