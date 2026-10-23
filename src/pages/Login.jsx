import { useState } from 'react'
import AuthLayout from '../components/layout/AuthLayout.jsx'
import LoginForm from '../components/auth/LoginForm.jsx'
import { login } from '../services/auth.js'

export default function Login({ onSuccess, onRegister }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(credentials) {
    setError('')
    setLoading(true)
    try {
      onSuccess(await login(credentials))
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <LoginForm onSubmit={handleLogin} error={error} loading={loading} />
      <p className="mt-4 text-center text-xs text-slate-500">New to EmpTrackAI?{' '}
        <button type="button" onClick={onRegister} className="font-semibold text-sky-700 hover:text-sky-800">Create an admin account</button>
      </p>
    </AuthLayout>
  )
}
