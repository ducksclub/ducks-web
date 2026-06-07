import type {
  LoginPayload,
  LoginResponse,
  LoginViaTelegramPayload,
  MeResponse,
  RegisterPayload,
  RegisterResponse,
  TelegramAuthResponse,
  UpdateProfilePayload,
  UpdateProfileResponse,
} from '~/types/auth'

type AuthApiOptions<TBody = unknown> = {
  method?: 'GET' | 'POST' | 'PATCH'
  body?: TBody
  token?: string | null
}

function buildAuthApiUrl(path: string) {
  const config = useRuntimeConfig()
  const requestUrl = import.meta.server ? useRequestURL() : null
  const origin = import.meta.client ? window.location.origin : requestUrl?.origin || 'http://localhost'
  const baseUrl = config.public.apiUrl?.trim().replace(/\/$/, '')

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
    signIn(payload: LoginPayload) {
      return request<LoginResponse, LoginPayload>('/auth/signin', {
        method: 'POST',
        body: payload,
      })
    },

    signInWithTelegram(payload: LoginViaTelegramPayload) {
      return request<TelegramAuthResponse, LoginViaTelegramPayload>('/auth/signin-with-telegram', {
        method: 'POST',
        body: payload,
      })
    },

    signUp(payload: RegisterPayload) {
      return request<RegisterResponse, RegisterPayload>('/auth/signup', {
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
