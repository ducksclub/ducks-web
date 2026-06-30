import type {
  AuthMessageResponse,
  AuthResponse,
  ForgotPasswordPayload,
  MeResponse,
  ResetPasswordPayload,
  SignInPayload,
  SignInWithTelegramPayload,
  SignUpPayload,
  UpdateProfilePayload,
  UpdateProfileResponse,
} from '~/types/auth.types'

type AuthApiOptions<TBody = unknown> = {
  method?: 'GET' | 'POST' | 'PATCH'
  body?: TBody
  token?: string | null
}

function buildAuthApiUrl(path: string) {
  const config = useRuntimeConfig()
  const requestUrl = import.meta.server ? useRequestURL() : null
  const origin = import.meta.client
    ? window.location.origin
    : requestUrl?.origin || 'http://localhost'
  const baseUrl = config.public.apiBase?.trim().replace(/\/$/, '')

  if (!baseUrl) {
    throw new Error('API base URL is not configured')
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  return baseUrl.startsWith('http')
    ? new URL(`${baseUrl}${normalizedPath}`).toString()
    : new URL(`${baseUrl}${normalizedPath}`, origin).toString()
}

export function useAuthApi() {
  async function request<TResponse, TBody = unknown>(
    path: string,
    options: AuthApiOptions<TBody> = {},
  ) {
    return await $fetch<TResponse>(buildAuthApiUrl(path), {
      method: options.method || 'GET',
      body: options.body,
      timeout: 10000,
      headers: {
        ...(options.token
          ? {
              Authorization: `Bearer ${options.token}`,
            }
          : {}),
      },
    })
  }

  return {
    signIn(payload: SignInPayload) {
      return request<AuthResponse, SignInPayload>('/auth/signin', {
        method: 'POST',
        body: payload,
      })
    },

    signInWithTelegram(payload: SignInWithTelegramPayload) {
      return request<AuthResponse, SignInWithTelegramPayload>('/auth/signin-with-telegram', {
        method: 'POST',
        body: payload,
      })
    },

    signUp(payload: SignUpPayload) {
      return request<AuthResponse, SignUpPayload>('/auth/signup', {
        method: 'POST',
        body: payload,
      })
    },

    forgotPassword(payload: ForgotPasswordPayload) {
      return request<AuthMessageResponse, ForgotPasswordPayload>('/auth/forgot-password', {
        method: 'POST',
        body: payload,
      })
    },

    resetPassword(payload: ResetPasswordPayload) {
      return request<AuthMessageResponse, ResetPasswordPayload>('/auth/reset-password', {
        method: 'POST',
        body: payload,
      })
    },

    me(token: string) {
      return request<MeResponse>('/users/me', {
        method: 'GET',
        token,
      })
    },

    updateProfile(token: string, payload: UpdateProfilePayload) {
      return request<UpdateProfileResponse, UpdateProfilePayload>('/users/me', {
        method: 'PATCH',
        body: payload,
        token,
      })
    },
  }
}
