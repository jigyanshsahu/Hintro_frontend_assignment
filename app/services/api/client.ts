



import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import { useAppStore } from '../../store/useAppStore'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://mock-backend-hintro.vercel.app'

function createApiClient(): AxiosInstance {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const { activeUserId } = useAppStore.getState()
    config.headers['x-user-id'] = activeUserId
    return config
  })

  
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      
      return Promise.reject(error)
    },
  )

  return instance
}

export const apiClient = createApiClient()
