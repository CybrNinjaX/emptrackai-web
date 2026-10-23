import { useState } from 'react'
import { createEmployee } from './employeeApi.js'

const inputClass = 'w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10'

export default function EmployeeCreateModal({ company, onClose, onCreated }) {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm_password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function submit(event) {
    event.preventDefault()
    setError('')
    if (form.password !== form.confirm_password) return setError('Passwords do not match.')
    setLoading(true)
    try {
      await createEmployee(form)
      await onCreated()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  return <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/45 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section role="dialog" aria-modal="true" aria-labelledby="employee-dialog-title" className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-7">
      <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wider text-sky-700">Employee account</p><h2 id="employee-dialog-title" className="mt-1 text-xl font-bold text-slate-900">Add an employee</h2><p className="mt-1 text-sm text-slate-500">The employee will be assigned to {company || 'your company'}.</p></div><button type="button" onClick={onClose} aria-label="Close" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700">✕</button></div>
      <form onSubmit={submit} className="mt-5 space-y-4">
        <label className="block text-xs font-semibold text-slate-700">Company<input className={`${inputClass} mt-1.5 bg-slate-50 text-slate-500`} value={company || ''} readOnly /></label>
        <label className="block text-xs font-semibold text-slate-700">Employee name<input className={`${inputClass} mt-1.5`} name="username" value={form.username} onChange={update} required autoComplete="name" /></label>
        <label className="block text-xs font-semibold text-slate-700">Work email<input className={`${inputClass} mt-1.5`} type="email" name="email" value={form.email} onChange={update} required autoComplete="email" /></label>
        <div className="grid gap-4 sm:grid-cols-2"><label className="block text-xs font-semibold text-slate-700">Password<input className={`${inputClass} mt-1.5`} type="password" name="password" value={form.password} onChange={update} required autoComplete="new-password" /></label><label className="block text-xs font-semibold text-slate-700">Confirm password<input className={`${inputClass} mt-1.5`} type="password" name="confirm_password" value={form.confirm_password} onChange={update} required autoComplete="new-password" /></label></div>
        {error && <p role="alert" className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>}
        <div className="flex justify-end gap-2 pt-2"><button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button><button disabled={loading} className="rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-60">{loading ? 'Creating…' : 'Create employee'}</button></div>
      </form>
    </section>
  </div>
}
