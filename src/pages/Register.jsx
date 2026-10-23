import { useState } from 'react'
import AuthLayout from '../components/layout/AuthLayout.jsx'
import { login, registerAdmin } from '../services/auth.js'

const inputClass = 'w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10'

export default function Register({ onSuccess, onLogin }) {
  const [form, setForm] = useState({ username: '', company_name: '', email: '', password: '', confirm_password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function submit(event) {
    event.preventDefault()
    setError('')
    if (form.password !== form.confirm_password) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    try {
      await registerAdmin(form)
      onSuccess(await login({ email: form.email, password: form.password }))
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-sky-700">Administrator setup</p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Create your account</h2>
        <p className="mt-1 text-xs leading-5 text-slate-500">Set up your company workspace to get started.</p>
        <form onSubmit={submit} className="mt-5 space-y-3">
          {[
            ['username', 'Your name', 'text', 'Alex Morgan'],
            ['company_name', 'Company name', 'text', 'Acme Corp'],
            ['email', 'Work email', 'email', 'you@company.com'],
            ['password', 'Password', 'password', 'Choose a password'],
            ['confirm_password', 'Confirm password', 'password', 'Enter it again'],
          ].map(([name, label, type, placeholder]) => (
            <label key={name} className="block text-xs font-semibold text-slate-700">
              {label}
              <input className={`${inputClass} mt-1.5 font-normal`} name={name} type={type} required autoComplete={name === 'password' ? 'new-password' : name === 'confirm_password' ? 'new-password' : 'on'} value={form[name]} onChange={update} placeholder={placeholder} />
            </label>
          ))}
          {error && <p role="alert" className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>}
          <button disabled={loading} className="w-full rounded-lg bg-sky-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-sky-700 disabled:opacity-60">
            {loading ? 'Creating account…' : 'Create admin account'}
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-slate-500">Already have an account?{' '}
          <button type="button" onClick={onLogin} className="font-semibold text-sky-700 hover:text-sky-800">Sign in</button>
        </p>
      </section>
    </AuthLayout>
  )
}
