import { apiRequest } from '../../services/apiClient.js'

export async function getAdminProfile() {
  const data = await apiRequest('/api/profile/', {}, true)
  return data.admin
}
