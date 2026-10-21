export default function Brand({ compact = false, header = false }) {
  const foreground = compact ? 'text-[#112b4a] lg:hidden' : header ? 'text-[#112b4a]' : 'text-white'
  const mark = compact || header ? 'bg-[#112b4a] text-cyan-300' : 'bg-cyan-400 text-[#112b4a]'
  const accent = compact || header ? 'text-cyan-600' : 'text-cyan-300'
  return (
    <a href="/" className={`flex items-center gap-2.5 font-semibold tracking-wide ${foreground}`}>
      <span className={`grid h-8 w-8 place-items-center rounded-full ${mark}`}>
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M4 19V9l4 3 4-7 4 7 4-3v10" /><path d="M4 19h16" /></svg>
      </span>
      <span className="text-sm">EmpTrack<span className={accent}>AI</span></span>
    </a>
  )
}
