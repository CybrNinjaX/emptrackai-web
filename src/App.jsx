import { useEffect, useState } from 'react'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import { getCurrentAdmin, logout } from './services/auth.js'

function getAllowedPath(pathname, admin) {
  if (admin) return '/home'
  return pathname === '/register' ? '/register' : '/'
}

export default function App() {
  const [pathname, setPathname] = useState(window.location.pathname)
  const [admin, setAdmin] = useState(getCurrentAdmin)

  useEffect(() => {
    function normalizeLocation(path, currentAdmin) {
      const allowedPath = getAllowedPath(path, currentAdmin)
      if (path !== allowedPath) window.history.replaceState({}, '', allowedPath)
      setPathname(allowedPath)
      setAdmin(currentAdmin)
    }

    normalizeLocation(window.location.pathname, getCurrentAdmin())

    function handlePopState() {
      normalizeLocation(window.location.pathname, getCurrentAdmin())
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  function navigate(path, { replace = false } = {}) {
    const method = replace ? 'replaceState' : 'pushState'
    window.history[method]({}, '', path)
    setPathname(path)
  }

  function handleSuccess(user) {
    setAdmin(user)
    navigate('/home', { replace: true })
  }

  function handleLogout() {
    logout()
    setAdmin(null)
    navigate('/', { replace: true })
  }

  // A persisted session always lands on the dashboard, including when the
  // user opens the login URL or navigates back to it.
  if (admin) return <Dashboard admin={admin} onLogout={handleLogout}/>
  if (pathname === '/register') return <Register onSuccess={handleSuccess} onLogin={() => navigate('/', { replace: true })}/>
  return <Login onSuccess={handleSuccess} onRegister={() => navigate('/register')}/>
}
