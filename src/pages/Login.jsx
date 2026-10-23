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
      <LoginForm onSubmit={handleLogin} onRegister={onRegister} error={error} loading={loading} />

    </AuthLayout>
  )
}
