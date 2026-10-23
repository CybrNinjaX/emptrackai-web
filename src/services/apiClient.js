const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''
const ACCESS_TOKEN_KEY = 'emptrack_access'

export async function apiRequest(path, options = {}, authenticated = false) {
  const headers = { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers }
  if (authenticated) {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY)
    if (token) headers.Authorization = `Bearer ${token}`
  }

  let response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers })
  } catch {
    throw new Error(`Could not reach ${path}. Confirm the backend is running and /api/ is proxied to it.`)
  }

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.error || data.detail || data.message || `Request failed (${response.status}).`)
  }
  return data
}
