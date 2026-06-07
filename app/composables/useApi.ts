import axios, { AxiosError, type AxiosRequestConfig, type Method } from 'axios'

type QueryValue = string | number | boolean | null | undefined

type ApiRequestOptions<TBody = unknown> = {
  method?: Method
  body?: TBody
  query?: Record<string, QueryValue>
  auth?: boolean
}

function buildQuery(query?: Record<string, QueryValue>) {
  const params = new URLSearchParams()

  if (!query) return ''

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, String(value))
    }
  })

  const queryString = params.toString()

  return queryString ? `?${queryString}` : ''
}

export function useApi() {
  const config = useRuntimeConfig()
  const auth = useAuthStore()

  const apiUrl = config.public.apiUrl

  if (!apiUrl) {
    throw new Error('NUXT_PUBLIC_API_URL не найден')
  }

  async function request<TResponse, TBody = unknown>(
    path: string,
    options: ApiRequestOptions<TBody> = {},
  ): Promise<TResponse> {
    const normalizedApiUrl = apiUrl.replace(/\/$/, '')
    const normalizedPath = path.startsWith('/') ? path : `/${path}`
    const url = `${normalizedApiUrl}${normalizedPath}${buildQuery(options.query)}`

    const axiosConfig: AxiosRequestConfig<TBody> = {
      url,
      method: options.method || 'GET',
      data: options.body,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',

        ...(options.auth !== false && auth.token
          ? {
              Authorization: `Bearer ${auth.token}`,
            }
          : {}),
      },
    }

    const response = await axios.request<TResponse>(axiosConfig)
    return response.data
  }

  return {
    request,
  }
}
