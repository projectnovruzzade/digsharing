import axios from 'axios'

const API_BASE_URL = 'http://localhost:8001/api/v1'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add the bearer token
api.interceptors.request.use((config) => {
  const storage = localStorage.getItem('swe-auth')
  if (storage) {
    try {
      const { state } = JSON.parse(storage)
      if (state?.token) {
        config.headers.Authorization = `Bearer ${state.token}`
      }
    } catch (e) {
      console.error('Failed to parse auth storage', e)
    }
  }
  return config
})

export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
