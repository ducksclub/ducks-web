export const Role = {
  ADMIN: 'admin',
  USER: 'user',
} as const

export type Role = (typeof Role)[keyof typeof Role]

export type User = {
  id: string
  role: Role
  email: string
  nickname: string

  phone: string | null
  avatarUrl: string | null
  avatarHash: string | null
  telegramId: number | null

  createdAt: string
  updatedAt: string
}
