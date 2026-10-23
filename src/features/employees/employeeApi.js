import { apiRequest } from '../../services/apiClient.js'

export async function listEmployees() {
  const data = await apiRequest('/api/employees/', {}, true)
  return data.employees || []
}

export function createEmployee(values) {
  return apiRequest('/api/employees/', { method: 'POST', body: JSON.stringify(values) }, true)
}
