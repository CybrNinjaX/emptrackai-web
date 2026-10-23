import { useEffect, useState } from 'react'
import { listEmployees } from './employeeApi.js'

export default function EmployeesPanel({ company, onCreate, refreshVersion }) {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function refresh() {
    setLoading(true)
    setError('')
    try {
      setEmployees(await listEmployees())
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refresh() }, [refreshVersion])

  return <section>
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">Your company</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Employees</h1><p className="mt-2 text-sm text-slate-500">{employees.length} {employees.length === 1 ? 'employee' : 'employees'} in {company || 'your company'}.</p></div><div className="flex gap-2"><button onClick={refresh} disabled={loading} className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-60">Refresh</button><button onClick={onCreate} className="rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-700">+ Create employee</button></div></div>
    {error && <p role="alert" className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">{loading ? <p className="p-8 text-center text-sm text-slate-500">Loading employees…</p> : employees.length === 0 ? <div className="p-10 text-center"><p className="font-semibold text-slate-800">No employees yet</p><p className="mt-1 text-sm text-slate-500">Create an employee account to see it listed here.</p><button onClick={onCreate} className="mt-4 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-700">Create first employee</button></div> : <div className="overflow-x-auto"><table className="w-full min-w-[640px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3 font-semibold">Employee</th><th className="px-5 py-3 font-semibold">Email</th><th className="px-5 py-3 font-semibold">Company</th><th className="px-5 py-3 font-semibold">Created</th></tr></thead><tbody className="divide-y divide-slate-100">{employees.map((employee) => <tr key={employee.id}><td className="px-5 py-4 font-semibold text-slate-800">{employee.username}</td><td className="px-5 py-4 text-slate-600">{employee.email}</td><td className="px-5 py-4 text-slate-600">{employee.company_name}</td><td className="px-5 py-4 text-slate-500">{employee.created_at ? new Date(employee.created_at).toLocaleDateString() : '—'}</td></tr>)}</tbody></table></div>}</div>
  </section>
}
