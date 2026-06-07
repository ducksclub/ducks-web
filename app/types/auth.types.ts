import type { EventGameType } from './event'

export type AuthUser = {
  id: string
  telegramId: string | null
  promoLinkId: string | null
  avatarHash: string | null
  avatarUrl: string | null
  username: string
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

export type SignUpPayload = {
  email: string
  password: string
  username: string
}

export type AuthResponse = {
  token: string
  user: AuthUser
}

export type MeResponse = {
  user: AuthUser
}
