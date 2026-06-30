import axios from 'axios'
import type { ApiErrorResponse } from '~~/shared/types/http'

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null
}

const getStringField = (value: unknown, key: string) => {
  if (!isRecord(value)) return ''

  const field = value[key]

  return typeof field === 'string' ? field : ''
}

const formatRetryAfter = (totalSeconds: number) => {
  const seconds = Math.ceil(totalSeconds)
  const minutes = Math.floor(seconds / 60)
  const restSeconds = seconds % 60

  if (minutes > 0 && restSeconds > 0) {
    return `${minutes} мин. ${restSeconds} сек.`
  }

  if (minutes > 0) {
    return `${minutes} мин.`
  }

  return `${seconds} сек.`
}

const getRetryAfterSeconds = (retryAfter?: string) => {
  if (!retryAfter) return 0

  const seconds = Number(retryAfter)

  if (Number.isFinite(seconds)) return seconds

  const retryAt = Date.parse(retryAfter)

  if (Number.isNaN(retryAt)) return 0

  return (retryAt - Date.now()) / 1000
}

const getRateLimitMessage = (retryAfter?: string) => {
  const seconds = getRetryAfterSeconds(retryAfter)

  if (Number.isFinite(seconds) && seconds > 0) {
    return `Слишком много запросов. Попробуйте снова через ${formatRetryAfter(seconds)}`
  }

  return 'Слишком много запросов. Подождите немного и попробуйте снова.'
}

export const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    if (error.response?.status === 429) {
      return getRateLimitMessage(error.response.headers?.['retry-after'])
    }

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
