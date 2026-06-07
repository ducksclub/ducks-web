export type AuthUser = {
  id: string
  email: string
  avatarUrl: null
  avatarHash: null
  phone: string | null
  username: string
  role: 'user' | 'admin'
  updatedAt: string
  createdAt: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type LoginViaTelegramPayload = {
  initData: string
  promoCode?: string
}

export type LoginResponse = {
  token: string
  user: AuthUser
}

export type RegisterPayload = {
  email: string
  username: string
  password: string
  initData?: string
  promoCode?: string
}

export type RegisterResponse = {
  token: string
  user: AuthUser
}

export type MeResponse = AuthUser & {
  ratings: {
    gameType: string
    points: number
  }[]
}

export type TelegramAuthResponse = {
  token: string
  user?: AuthUser
}

export type TelegramAuthPayload = {
  initData: string
}

export type UpdateProfilePayload = {
  phone: string
  username: string
  avatarUrl: string
  avatarHash: string
}

export type UpdateProfileResponse = {}

export type AuthMode = 'telegram' | 'web' | 'unknown' | 'error'

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated' | 'error'

export type AuthErrorCode =
  | 'TELEGRAM_WEBAPP_UNAVAILABLE'
  | 'TELEGRAM_INIT_DATA_MISSING'
  | 'TELEGRAM_AUTH_REJECTED'
  | 'TOKEN_EXPIRED'
  | 'PROTECTED_ROUTE_UNAUTHENTICATED'
  | 'AUTH_ENVIRONMENT_UNKNOWN'
  | 'AUTH_REQUEST_FAILED'
