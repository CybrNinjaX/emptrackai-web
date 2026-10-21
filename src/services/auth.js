// Use the website's origin by default. The web server proxies /api to Django,
// so the browser never needs direct access to the backend's loopback address.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

const STORAGE_KEYS = {
  access: 'emptrack_access',
  refresh: 'emptrack_refresh',
  admin: 'emptrack_admin',
}

export async function login({ email, password }) {
  let response

  try {
    response = await fetch(`${API_BASE_URL}/api/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
  } catch {
    throw new Error('Could not reach /api/login/. Confirm the backend is running and the web server proxies /api/ to it.')
  }

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.detail || data.message || 'Unable to sign in. Check your email and password.')
  }
  if (!data.access || !data.refresh) {
    throw new Error('The server response did not include login tokens.')
  }

  localStorage.setItem(STORAGE_KEYS.access, data.access)
  localStorage.setItem(STORAGE_KEYS.refresh, data.refresh)
  localStorage.setItem(STORAGE_KEYS.admin, JSON.stringify(data.admin || {}))
  return data.admin || {}
}

export function getCurrentAdmin() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.admin) || 'null')
  } catch {
    return null
  }
}

export function logout() {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key))
}
