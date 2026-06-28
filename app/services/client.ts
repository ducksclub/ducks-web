import axios, { AxiosError } from 'axios'
import type { ApiErrorResponse, RequestOptions } from './client.types'

const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')

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

    if (error.response?.status === 401 && requiresAuth) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')

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
  const response = await axiosInstance.request<TResponse>({
    method,
    url,
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
