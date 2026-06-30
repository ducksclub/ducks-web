import type { AxiosError } from 'axios'
import type { ApiErrorResponse } from '~/services/client.types'

export const getApiErrorMessage = (error: unknown, fallback: string) => {
  const axiosError = error as AxiosError<ApiErrorResponse>

  return axiosError.response?.data?.error?.message || fallback
}
