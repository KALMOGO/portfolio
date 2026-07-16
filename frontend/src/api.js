const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
const TOKEN_KEY = 'admin_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined
  })

  if (auth && res.status === 401) {
    clearToken()
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new ApiError(data.error || `Request failed (${res.status})`, res.status)
  }

  if (res.status === 204) return null
  return res.json()
}

export const api = {
  getPublications: () => request('/api/publications'),
  getProjects: () => request('/api/projects'),

  login: (password) => request('/api/admin/login', { method: 'POST', body: { password } }),

  createPublication: (data) => request('/api/admin/publications', { method: 'POST', body: data, auth: true }),
  updatePublication: (id, data) => request(`/api/admin/publications/${id}`, { method: 'PUT', body: data, auth: true }),
  deletePublication: (id) => request(`/api/admin/publications/${id}`, { method: 'DELETE', auth: true }),

  createProject: (data) => request('/api/admin/projects', { method: 'POST', body: data, auth: true }),
  updateProject: (id, data) => request(`/api/admin/projects/${id}`, { method: 'PUT', body: data, auth: true }),
  deleteProject: (id) => request(`/api/admin/projects/${id}`, { method: 'DELETE', auth: true })
}
