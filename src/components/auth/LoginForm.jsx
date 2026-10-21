import { useState } from 'react'

function Icon({ children }) {
  return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
}

export default function LoginForm({ onSubmit, error, loading }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit({ email, password })
  }

  return (
    <div className="login-card-enter overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_38px_-20px_rgba(15,35,60,0.32)]">
      <div className="flex items-start justify-between gap-4 px-5 pb-3 pt-5 sm:px-6 sm:pt-6">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-sky-700">Administrative Portal</p>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Welcome to Console</h2>
          <p className="mt-1 max-w-[260px] text-[10px] leading-4 text-slate-500">Authenticate to access live telemetry feeds.</p>
        </div>
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-sky-100 bg-sky-50 text-sky-700"><Icon><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/></Icon></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 px-5 pb-5 sm:px-6 sm:pb-6">
        <label className="block">
          <span className="mb-1.5 flex items-center justify-between text-[10px] font-semibold text-slate-700"><span>Work Email</span><span className="text-[8px] font-medium text-slate-400">Admin account</span></span>
          <span className="relative block">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Icon><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></Icon></span>
            <input required type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@company.com" className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10" />
          </span>
        </label>

        <label className="block">
          <span className="mb-1.5 flex items-center justify-between text-[10px] font-semibold text-slate-700"><span>Password</span><span className="text-[8px] font-medium text-slate-400">Private</span></span>
          <span className="relative block">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Icon><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3"/></Icon></span>
            <input required type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-14 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10" />
            <button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-[9px] font-semibold text-slate-500 transition hover:text-sky-700" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button>
          </span>
        </label>

        {error && <p role="alert" className="form-error rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-[10px] leading-4 text-red-700">{error}</p>}

        <p className="flex items-center gap-1.5 pt-0.5 text-[9px] text-slate-500"><Icon><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/></Icon>Your sign-in tokens are never shown on this page.</p>

        <button disabled={loading} type="submit" className="login-submit flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-3 text-[11px] font-bold text-white shadow-md shadow-sky-700/15 transition hover:bg-sky-700 disabled:cursor-wait disabled:opacity-70">
          {loading ? <><span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white"/>Signing in…</> : <>Sign in to Portal <span aria-hidden="true">→</span></>}
        </button>

        <div className="flex items-center gap-3 pt-0.5 text-[8px] font-semibold uppercase tracking-[0.1em] text-slate-400"><span className="h-px flex-1 bg-slate-100"/>Protected enterprise access<span className="h-px flex-1 bg-slate-100"/></div>
      </form>
    </div>
  )
}
