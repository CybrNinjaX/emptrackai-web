export default function SignedInCard({ admin, onLogout }) {
  return (
    <div className="login-card-enter rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 sm:p-10">
      <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>
      </div>
      <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">Signed in</p>
      <h2 className="mt-2 text-2xl font-semibold">Welcome{admin.username ? `, ${admin.username}` : ''}</h2>
      <p className="mt-2 text-slate-500">You are signed in to your EmpTrackAI account.</p>
      <button onClick={onLogout} className="mt-8 w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">Sign out</button>
    </div>
  )
}
