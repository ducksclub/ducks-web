import type { EventGameType } from './event'

export type AuthUser = {
  id: string
  telegramId: string | null
  promoLinkId: string | null
  avatarHash: string | null
  avatarUrl: string | null
  nickname: string
  role: string
  email: string
  phone: string | null
  sourceCode: string | null
  sourceType: string | null
  updatedAt: string | null
  createdAt: string

  ratings?: {
    gameType: EventGameType
    points: number
  }[]
}

export type SignInPayload = {
  email: string
  password: string
}

export type ForgotPasswordPayload = {
  email: string
}

export type ResetPasswordPayload = {
  token: string
  password: string
}

export type SignInWithTelegramPayload = {
  initData: string
}

export type UpdateProfilePayload = {
  email: string
  phone: string
  nickname: string
  avatarUrl: string
  avatarHash: string
}

export type SignUpPayload = {
  email: string
  password: string
  nickname: string
}

export type AuthResponse = {
  token: string
  user: AuthUser
}

export type MeResponse = AuthUser

export type UpdateProfileResponse = AuthUser

export type AuthMessageResponse = {
  message: string
}
