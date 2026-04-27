import axios from 'axios'

const DEFAULT_API_BASE_URL = import.meta.env.DEV
  ? 'http://127.0.0.1:8000/api/v1'
  : 'https://digsharing-production.up.railway.app/api/v1'

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/+$/, '') ||
  DEFAULT_API_BASE_URL

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
