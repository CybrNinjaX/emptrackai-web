import Brand from '../common/Brand.jsx'

function Icon({ children, className = 'h-4 w-4' }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
}

function ScreenPreview({ title, status, variant }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-300 bg-slate-950 shadow-sm">
      <div className="flex h-5 items-center justify-between bg-slate-800 px-2">
        <span className="flex gap-1"><i className="h-1.5 w-1.5 rounded-full bg-cyan-300"/><i className="h-1.5 w-1.5 rounded-full bg-slate-500"/><i className="h-1.5 w-1.5 rounded-full bg-slate-500"/></span>
        <span className="text-[7px] text-slate-400">{status}</span>
      </div>
      <div className={`preview-screen preview-screen-${variant} relative h-[74px] overflow-hidden p-2`}>
        <div className="absolute inset-x-2 top-2 flex gap-1"><i className="h-1 w-1/4 rounded bg-white/30"/><i className="h-1 w-1/6 rounded bg-cyan-300/70"/></div>
        <div className="absolute inset-x-2 bottom-2 grid grid-cols-3 gap-1">
          <i className="h-6 rounded-sm border border-white/20 bg-slate-950/55"/><i className="h-6 rounded-sm border border-white/20 bg-slate-950/35"/><i className="h-6 rounded-sm border border-white/20 bg-cyan-300/10"/>
        </div>
        <span className="absolute bottom-2 left-2 rounded bg-slate-950/75 px-1 py-0.5 text-[7px] font-medium text-cyan-100">LIVE</span>
      </div>
      <div className="flex items-center justify-between bg-white px-2 py-1.5 text-[9px] font-semibold text-slate-700"><span>{title}</span><span className="font-normal text-slate-400">{variant === 'three' ? '01:08' : '15:18'}</span></div>
    </div>
  )
}

function DashboardPreview() {
  return (
    <div className="dashboard-enter space-y-2.5" aria-label="Preview of the monitoring dashboard">
      <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
        <div className="mb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-800"><Icon className="h-3.5 w-3.5 text-sky-600"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/></Icon>Live Screen Feed</div>
          <span className="rounded-full bg-emerald-50 px-2 py-1 text-[8px] font-semibold text-emerald-700"><i className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"/>3 Monitored</span>
        </div>
        <p className="mb-2.5 text-[9px] text-slate-500">Active desktop sessions streaming securely</p>
        <div className="grid grid-cols-3 gap-2">
          <ScreenPreview title="VS Code" status="DEV-041" variant="one"/>
          <ScreenPreview title="Figma" status="DS-019" variant="two"/>
          <ScreenPreview title="Slack" status="OPS-102" variant="three"/>
        </div>
        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-slate-100 pt-2 text-[8px] text-slate-500">
          <span>Session focus <b className="text-slate-700">84%</b></span><span>Core time <b className="text-slate-700">7h 46m</b></span><span>Active <b className="text-slate-700">3 / 3</b></span>
        </div>
      </section>
      <div className="grid grid-cols-2 gap-2.5">
        <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="flex items-center justify-between text-[10px] font-semibold text-slate-800"><span className="flex items-center gap-1.5"><Icon className="h-3 w-3 text-blue-600"><path d="M4 18V6m0 12h16M7 15l4-5 3 3 5-7"/></Icon>Keystroke Cadence</span><span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[8px] text-emerald-700">Normal</span></div>
          <p className="mt-1 text-[8px] text-slate-500">Statistical behavior monitoring</p>
          <svg className="mt-2 h-10 w-full" viewBox="0 0 220 48" preserveAspectRatio="none" aria-label="Stable keystroke cadence chart"><path d="M0 38C18 36 16 30 30 32S46 41 59 30 77 27 88 31 103 20 116 25 133 33 145 19 162 21 175 23 194 10 220 12" fill="none" stroke="#148ee0" strokeWidth="2"/><path d="M0 47H220" stroke="#e2e8f0"/></svg>
          <div className="mt-1 flex justify-between text-[8px] text-slate-500"><span>Idle ratio <b className="text-slate-700">3.8%</b></span><span>Typing <b className="text-emerald-700">Normal</b></span></div>
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-800"><Icon className="h-3 w-3 text-violet-600"><path d="M12 3 20 7v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4Z"/><path d="m9 12 2 2 4-4"/></Icon>Telemetry Integrity</div>
          <p className="mt-1 text-[8px] text-slate-500">12,400+ captured events</p>
          <div className="mt-3 rounded-lg bg-sky-50 p-2.5"><div className="flex items-end justify-between"><b className="text-xl tracking-tight text-slate-800">99.99%</b><span className="text-[8px] text-slate-500">Uptime SLA</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sky-100"><i className="block h-full w-[96%] rounded-full bg-sky-500"/></div></div>
          <p className="mt-2 text-[8px] text-slate-500">Zero-knowledge PII masking enabled</p>
        </section>
      </div>
      <div className="flex flex-wrap gap-1.5 pt-0.5 text-[8px] font-medium text-slate-600">
        {['SOC-2 Type II Certified','GDPR Article 28 Compliant','256-Bit TLS End-to-End'].map((item) => <span key={item} className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1"><i className="h-1.5 w-1.5 rounded-full bg-emerald-500"/>{item}</span>)}
      </div>
    </div>
  )
}

export default function AuthLayout({ children }) {
  return (
    <main className="auth-page flex h-dvh flex-col overflow-hidden bg-[#f5f8fc] text-slate-900">
      <header className="topbar relative z-10 shrink-0 border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-10">
          <div className="flex items-center gap-5"><Brand header/><div className="hidden items-center gap-2 md:flex"><span className="rounded-full border border-sky-100 bg-sky-50 px-2.5 py-1 text-[10px] font-medium text-sky-700"><i className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-sky-500"/>AI Engine Online v2.4</span><span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-medium text-slate-600">SOC-2 Type II Certified</span></div></div>
          <nav className="hidden items-center gap-6 text-[10px] font-medium text-slate-500 sm:flex"><a href="#security" className="transition hover:text-sky-700">Help / Documentation</a><a href="#security" className="transition hover:text-sky-700">Security Whitepaper</a><span className="grid h-7 w-7 place-items-center rounded-full bg-sky-600 text-white"><Icon className="h-3.5 w-3.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></Icon></span></nav>
        </div>
      </header>
      <div className="auth-main mx-auto grid min-h-0 w-full max-w-[1440px] flex-1 items-center gap-4 overflow-hidden px-4 py-3 sm:grid-cols-[minmax(0,1.15fr)_minmax(270px,0.85fr)] sm:gap-5 sm:px-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.8fr)] lg:gap-8 lg:px-10 xl:gap-12 xl:px-14">
        <section className="marketing-column">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50/80 px-3 py-1.5 text-[9px] font-semibold tracking-wide text-sky-700"><span className="h-1.5 w-1.5 rounded-full bg-sky-500"/>SCREEN &amp; ACTIVITY INTELLIGENCE V2.4 <span className="text-slate-300">/</span><span className="font-normal text-slate-500">Real-Time Telemetry Node</span></div>
          <h1 className="max-w-3xl text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.04] tracking-[-0.045em] text-slate-950">Automated Real-Time <span className="text-sky-600">Screen Monitoring</span> &amp; AI Productivity Scoring</h1>
          <p className="mt-3 max-w-2xl text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">EmpTrackAI delivers continuous high-frequency visual telemetry, automated keystroke dynamics, and non-invasive zero-knowledge audit trails across distributed enterprise workforces.</p>
          <div className="mt-5"><DashboardPreview/></div>
        </section>
        <section className="login-column mx-auto w-full max-w-[440px] lg:mx-0 lg:justify-self-end">
          {children}
          <div id="security" className="mt-5 grid grid-cols-2 gap-3 text-[9px] leading-4 text-slate-500"><div className="flex gap-2"><Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-600"><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/></Icon><span><b className="text-slate-700">256-Bit SSL Telemetry</b><br/>Encrypted session transfer &amp; access logs</span></div><div className="flex gap-2"><Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-600"><path d="M12 3 20 7v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4Z"/></Icon><span><b className="text-slate-700">GDPR Compliant</b><br/>Automated PII masking by default</span></div></div>
        </section>
      </div>
      <footer className="shrink-0 border-t border-slate-200 bg-white px-4 py-2 text-[9px] text-slate-500 sm:px-6 lg:px-10"><div className="mx-auto flex max-w-[1440px] items-center justify-between gap-2"><span className="truncate">© {new Date().getFullYear()} EmpTrackAI Inc. All rights reserved.</span><nav className="flex shrink-0 gap-3"><a href="#security" className="hover:text-sky-700">Privacy</a><a href="#security" className="hidden hover:text-sky-700 sm:block">Terms</a><a href="#security" className="hidden hover:text-sky-700 md:block">Compliance</a></nav></div></footer>
    </main>
  )
}
