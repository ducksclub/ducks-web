import type { EventGameType } from '~/types/event'

export type AuthUser = {
  id: string
  telegramId: string | null
  avatarHash: string | null
  avatarUrl: string | null
  nickname: string
  role: string
  email: string
  phone: string | null
  createdAt?: string
  updatedAt?: string | null

  ratings?: {
    gameType: EventGameType
    points: number
  }[]
}

export type SignInPayload = {
  email: string
  password: string
}

export type SignUpPayload = {
  email: string
  nickname: string
  password: string
  phone?: string
}

export type SignInWithTelegramPayload = {
  initData: string
}

export type ForgotPasswordPayload = {
  email: string
}

export type ResetPasswordPayload = {
  token: string
  password: string
}

export type NicknameAvailabilityParams = {
  nickname: string
}

export type AuthResponse = {
  token: string
  user: AuthUser
}

export type MessageResponse = {
  message: string
}

export type NicknameAvailabilityResponse = {
  available: boolean
}
