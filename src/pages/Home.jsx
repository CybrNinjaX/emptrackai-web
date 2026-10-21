import Brand from '../components/common/Brand.jsx'

function SummaryCard({ label, value, detail, icon }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 grid h-10 w-10 place-items-center rounded-xl bg-sky-50 text-sky-700">{icon}</div>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-1 truncate text-xl font-semibold text-slate-900">{value || 'Not provided'}</p>
      <p className="mt-2 text-xs text-slate-400">{detail}</p>
    </section>
  )
}

export default function Home({ admin, onLogout }) {
  const initials = (admin.username || admin.email || 'A').slice(0, 1).toUpperCase()

  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-[#f5f8fc] text-slate-900">
      <header className="shrink-0 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
          <Brand header />
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block"><p className="text-xs font-semibold text-slate-800">{admin.username || admin.email}</p><p className="text-[10px] text-slate-500">{admin.role || 'Administrator'}</p></div>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-sky-100 text-sm font-semibold text-sky-800">{initials}</span>
            <button onClick={onLogout} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">Sign out</button>
          </div>
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center overflow-auto px-5 py-8 sm:px-8">
        <div className="home-welcome-enter mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">EmpTrackAI Workspace</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Welcome{admin.username ? `, ${admin.username}` : ''}</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">You’re signed in to your administrator workspace. Your account details are below.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SummaryCard label="Company" value={admin.company_name} detail="Your organization workspace" icon={<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 21h18M5 21V7l8-4v18m6 0V11l-6-4"/><path d="M8 9v.01M8 12v.01M8 15v.01M16 13v.01M16 16v.01"/></svg>} />
          <SummaryCard label="Signed in as" value={admin.email} detail="Administrator account" icon={<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/></svg>} />
          <SummaryCard label="Access role" value={admin.role || 'Administrator'} detail="Current account permissions" icon={<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m12 3 8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4Z"/><path d="m9 12 2 2 4-4"/></svg>} />
        </div>

        <section className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm text-emerald-900 sm:items-center">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700"><svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 12 4 4L19 6"/></svg></span>
          <div><p className="font-semibold">Login successful</p><p className="mt-0.5 text-xs text-emerald-800/75">Your administrator session is active in this browser.</p></div>
        </section>
      </section>

      <footer className="shrink-0 border-t border-slate-200 bg-white px-5 py-3 text-center text-[10px] text-slate-400">© {new Date().getFullYear()} EmpTrackAI</footer>
    </main>
  )
}
