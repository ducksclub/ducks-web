import axios from 'axios'
import type { ApiErrorResponse } from '~/services/client.types'

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null
}

const getStringField = (value: unknown, key: string) => {
  if (!isRecord(value)) return ''

  const field = value[key]

  return typeof field === 'string' ? field : ''
}

export const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const data = error.response?.data
    const nestedMessage = data?.error?.message
    const directMessage = getStringField(data, 'message')

    return nestedMessage || directMessage || error.message || fallback
  }

  if (error instanceof Error) {
    return error.message || fallback
  }

  return getStringField(error, 'message') || getStringField(error, 'error') || fallback
}
