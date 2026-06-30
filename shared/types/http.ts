import type { AxiosRequestConfig, Method } from 'axios'

export type ApiErrorResponse = {
  error?: {
    code?: string
    message?: string
  }
  message?: string
}

export type ApiRequestOptions<TBody = unknown> = {
  method?: Method
  url: string
  body?: TBody
  auth?: boolean
  params?: Record<string, unknown>
  config?: AxiosRequestConfig
}
