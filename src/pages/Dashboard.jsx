import { useEffect, useState } from 'react'
import Brand from '../components/common/Brand.jsx'
import AdminProfilePanel from '../features/admin/AdminProfilePanel.jsx'
import DashboardOverview from '../features/dashboard/DashboardOverview.jsx'
import EmployeeCreateModal from '../features/employees/EmployeeCreateModal.jsx'
import EmployeesPanel from '../features/employees/EmployeesPanel.jsx'
import { listEmployees } from '../features/employees/employeeApi.js'

const TABS = [
  { key: 'overview', label: 'Dashboard', icon: <><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9M9 20v-6h6v6"/></> },
  { key: 'profile', label: 'My profile', icon: <><circle cx="12" cy="8" r="4"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/></> },
  { key: 'employees', label: 'Employees', icon: <><circle cx="9" cy="8" r="3"/><path d="M3 20v-1a6 6 0 0 1 12 0v1M16 5.5a3 3 0 0 1 0 5.8M18 14a5 5 0 0 1 3 4.5V20"/></> },
]

function NavButton({ item, active, onClick, mobile = false }) {
  return <button key={item.key} onClick={onClick} className={`flex ${mobile ? 'min-w-24 flex-1 flex-col justify-center gap-1 px-2 py-2 text-[11px]' : 'w-full gap-3 rounded-xl px-3 py-2.5 text-sm'} items-center font-semibold transition ${active ? 'bg-sky-50 text-sky-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}><svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{item.icon}</svg><span>{item.label}</span></button>
}

export default function Dashboard({ admin, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [employeeCount, setEmployeeCount] = useState(null)
  const [employeeRefreshVersion, setEmployeeRefreshVersion] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const initials = (admin.username || admin.email || 'A').slice(0, 1).toUpperCase()

  useEffect(() => {
    listEmployees().then((employees) => setEmployeeCount(employees.length)).catch(() => setEmployeeCount(null))
  }, [])

  async function employeeCreated() {
    const employees = await listEmployees()
    setEmployeeCount(employees.length)
    setEmployeeRefreshVersion((version) => version + 1)
    setDialogOpen(false)
    setNotice('Employee account created successfully.')
  }

  function selectTab(tab) {
    setActiveTab(tab)
    setNotice('')
  }

  return <main className="flex h-dvh overflow-hidden bg-[#f4f7fb] text-slate-900">
    <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-5 lg:flex">
      <div className="px-2"><Brand header/><p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Workspace</p></div>
      <nav aria-label="Admin dashboard" className="mt-3 space-y-1">{TABS.map((item) => <NavButton key={item.key} item={item} active={activeTab === item.key} onClick={() => selectTab(item.key)}/>)}</nav>
      <div className="mt-auto rounded-2xl border border-slate-100 bg-slate-50 p-3"><div className="flex items-center gap-2.5"><span className="grid h-9 w-9 place-items-center rounded-xl bg-sky-100 text-sm font-bold text-sky-800">{initials}</span><div className="min-w-0"><p className="truncate text-xs font-semibold text-slate-800">{admin.username || 'Admin'}</p><p className="truncate text-[10px] text-slate-500">{admin.company_name || admin.email}</p></div></div><button onClick={onLogout} className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:border-slate-300 hover:text-slate-900">Sign out</button></div>
    </aside>

    <div className="flex min-w-0 flex-1 flex-col">
      <header className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-7 lg:px-9"><div className="lg:hidden"><Brand header/></div><div className="hidden lg:block"><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">{admin.company_name || 'Company workspace'}</p><p className="mt-0.5 text-sm font-semibold text-slate-800">Administrator console</p></div><div className="flex items-center gap-3"><span className="hidden rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-700 sm:inline-flex"><i className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500"/>Workspace active</span><span className="grid h-9 w-9 place-items-center rounded-full bg-sky-100 text-sm font-bold text-sky-800">{initials}</span><button onClick={onLogout} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 lg:hidden">Sign out</button></div></header>

      <nav aria-label="Admin dashboard" className="flex shrink-0 border-b border-slate-200 bg-white px-2 lg:hidden">{TABS.map((item) => <NavButton key={item.key} item={item} active={activeTab === item.key} onClick={() => selectTab(item.key)} mobile/>)}</nav>

      <section className="flex-1 overflow-y-auto"><div className="mx-auto max-w-7xl px-4 py-6 sm:px-7 sm:py-8 lg:px-9">
        {notice && <p role="status" className="mb-5 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{notice}</p>}
        {activeTab === 'overview' && <DashboardOverview admin={admin} employeeCount={employeeCount} onOpenProfile={() => selectTab('profile')} onOpenEmployees={() => selectTab('employees')}/>}
        {activeTab === 'profile' && <AdminProfilePanel initialAdmin={admin}/>}
        {activeTab === 'employees' && <EmployeesPanel company={admin.company_name} onCreate={() => setDialogOpen(true)} refreshVersion={employeeRefreshVersion}/>}
      </div></section>
    </div>
    {dialogOpen && <EmployeeCreateModal company={admin.company_name} onClose={() => setDialogOpen(false)} onCreated={employeeCreated}/>}
  </main>
}
