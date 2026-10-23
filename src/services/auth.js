import { apiRequest } from './apiClient.js'

const STORAGE_KEYS = {
  access: 'emptrack_access',
  refresh: 'emptrack_refresh',
  admin: 'emptrack_admin',
}

export async function login({ email, password }) {
  const data = await apiRequest('/api/login/', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  if (!data.access || !data.refresh) throw new Error('The server response did not include login tokens.')
  localStorage.setItem(STORAGE_KEYS.access, data.access)
  localStorage.setItem(STORAGE_KEYS.refresh, data.refresh)
  localStorage.setItem(STORAGE_KEYS.admin, JSON.stringify(data.admin || {}))
  return data.admin || {}
}

export function registerAdmin(values) {
  return apiRequest('/api/register/', { method: 'POST', body: JSON.stringify(values) })
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
