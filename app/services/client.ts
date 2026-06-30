import axios, { AxiosError } from 'axios'
import { ACCESS_TOKEN_KEY, PROFILE_KEY } from '~/composables/useSessionStorage'
import type { ApiErrorResponse, RequestOptions } from './client.types'

const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  const token = import.meta.client ? localStorage.getItem(ACCESS_TOKEN_KEY) : null

  const requiresAuth = config.headers?.['X-Requires-Auth'] !== 'false'

  if (token && requiresAuth) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const requiresAuth = error.config?.headers?.['X-Requires-Auth'] !== 'false'

    if (import.meta.client && error.response?.status === 401 && requiresAuth) {
      localStorage.removeItem(ACCESS_TOKEN_KEY)
      localStorage.removeItem(PROFILE_KEY)

      window.location.href = '/signin'
    }

    return Promise.reject(error)
  },
)

export async function apiRequest<TResponse, TBody = unknown>({
  method = 'GET',
  url,
  body,
  auth = true,
  params,
  config,
}: RequestOptions<TBody>): Promise<TResponse> {
  const runtimeConfig = useRuntimeConfig()

  const response = await axiosInstance.request<TResponse>({
    method,
    url,
    baseURL: String(runtimeConfig.public.apiBase || '/api'),
    data: body,
    params,
    ...config,
    headers: {
      ...config?.headers,
      'X-Requires-Auth': String(auth),
    },
  })

  return response.data
}
