import type { AuthErrorCode } from '~/types/auth'

const defaultAuthErrorMessages: Record<AuthErrorCode, string> = {
  TELEGRAM_WEBAPP_UNAVAILABLE: 'Telegram WebApp недоступен в текущем окружении.',
  TELEGRAM_INIT_DATA_MISSING: 'Telegram initData отсутствует.',
  TELEGRAM_AUTH_REJECTED: 'Backend отклонил авторизацию через Telegram.',
  TOKEN_EXPIRED: 'Срок действия токена истек.',
  PROTECTED_ROUTE_UNAUTHENTICATED: 'Для доступа к этой странице нужно войти.',
  AUTH_ENVIRONMENT_UNKNOWN: 'Не удалось определить окружение авторизации.',
  AUTH_REQUEST_FAILED: 'Ошибка авторизации. Попробуйте еще раз.',
}

export class AuthError extends Error {
  code: AuthErrorCode
  statusCode?: number
  cause?: unknown

  constructor(code: AuthErrorCode, message = defaultAuthErrorMessages[code], cause?: unknown) {
    super(message)
    this.name = 'AuthError'
    this.code = code
    this.cause = cause

    const statusCode = getResponseStatus(cause)

    if (statusCode) {
      this.statusCode = statusCode
    }
  }
}

export function toAuthError(error: unknown, fallbackCode: AuthErrorCode = 'AUTH_REQUEST_FAILED') {
  if (error instanceof AuthError) return error

  return new AuthError(fallbackCode, getResponseMessage(error) || defaultAuthErrorMessages[fallbackCode], error)
}

export function getResponseStatus(error: unknown) {
  if (typeof error !== 'object' || !error) return undefined

  const maybeError = error as {
    statusCode?: number
    status?: number
    response?: {
      status?: number
      statusCode?: number
    }
  }

  return maybeError.statusCode || maybeError.status || maybeError.response?.statusCode || maybeError.response?.status
}

function getResponseMessage(error: unknown) {
  if (typeof error !== 'object' || !error) return ''

  const maybeError = error as {
    message?: string
    data?: {
      message?: string
    }
    response?: {
      _data?: {
        message?: string
      }
    }
  }

  return maybeError.response?._data?.message || maybeError.data?.message || maybeError.message || ''
}
