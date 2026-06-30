import axios, { AxiosError } from 'axios'
import type { ApiErrorResponse, ApiRequestOptions } from '~~/shared/types/http'
import { ACCESS_TOKEN_KEY, PROFILE_KEY } from '~/utils/session'

const AUTH_HEADER_FLAG = 'X-Requires-Auth'

const httpClient = axios.create({
  baseURL: '/api',
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

httpClient.interceptors.request.use((config) => {
  const token = import.meta.client ? localStorage.getItem(ACCESS_TOKEN_KEY) : null
  const requiresAuth = config.headers?.[AUTH_HEADER_FLAG] !== 'false'

  delete config.headers?.[AUTH_HEADER_FLAG]

  if (token && requiresAuth) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const requiresAuth = error.config?.headers?.[AUTH_HEADER_FLAG] !== 'false'

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
}: ApiRequestOptions<TBody>): Promise<TResponse> {
  const runtimeConfig = useRuntimeConfig()

  const response = await httpClient.request<TResponse>({
    method,
    url,
    baseURL: String(runtimeConfig.public.apiBase || '/api'),
    data: body,
    params,
    ...config,
    headers: {
      ...config?.headers,
      [AUTH_HEADER_FLAG]: String(auth),
    },
  })

  return response.data
}
