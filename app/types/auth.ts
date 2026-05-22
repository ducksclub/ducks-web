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
}

export type TelegramAuthPaylaod = {
  initData: string
}

export type UpdateProfilePayload = {
  phone: string
  username: string
  avatarUrl: string
  avatarHash: string
}

export type UpdateProfileResponse = {}
