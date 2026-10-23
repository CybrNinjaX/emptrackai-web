import { useEffect, useState } from 'react'
import { getAdminProfile } from './adminApi.js'

function ProfileField({ label, value }) {
  return <div className="rounded-xl border border-slate-100 bg-slate-50 p-4"><p className="text-xs font-medium text-slate-500">{label}</p><p className="mt-1 break-words text-sm font-semibold text-slate-900">{value || '—'}</p></div>
}

export default function AdminProfilePanel({ initialAdmin }) {
  const [admin, setAdmin] = useState(initialAdmin || {})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function refresh() {
    setLoading(true)
    setError('')
    try {
      setAdmin(await getAdminProfile())
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refresh() }, [])

  return <section>
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">Account</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">My profile</h1><p className="mt-2 text-sm text-slate-500">Your administrator and company details.</p></div><button disabled={loading} onClick={refresh} className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-60">{loading ? 'Refreshing…' : 'Refresh profile'}</button></div>
    {error && <p role="alert" className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
    <div className="mt-6 grid gap-4 sm:grid-cols-2">{[['Name', admin.username], ['Email', admin.email], ['Company', admin.company_name], ['Role', admin.role], ['Admin ID', admin.id], ['Created', admin.created_at ? new Date(admin.created_at).toLocaleString() : '—']].map(([label, value]) => <ProfileField key={label} label={label} value={value}/>)}</div>
  </section>
}
