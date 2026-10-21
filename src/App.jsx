import { useEffect, useState } from 'react'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import { getCurrentAdmin, logout } from './services/auth.js'

export default function App() {
  const [pathname, setPathname] = useState(window.location.pathname)
  const [admin, setAdmin] = useState(getCurrentAdmin)

  useEffect(() => {
    function handlePopState() {
      setPathname(window.location.pathname)
      setAdmin(getCurrentAdmin())
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  function navigate(path) {
    window.history.pushState({}, '', path)
    setPathname(path)
  }

  function handleLoginSuccess(user) {
    setAdmin(user)
    navigate('/home')
  }

  function handleLogout() {
    logout()
    setAdmin(null)
    navigate('/')
  }

  if (pathname === '/home' && admin) {
    return <Home admin={admin} onLogout={handleLogout} />
  }

  return <Login onSuccess={handleLoginSuccess} />
}
