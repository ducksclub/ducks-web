import type { EventGameType } from './event'

export type UserRating = {
  gameType: EventGameType | string
  points: number
}

export type PublicUserProfile = {
  id: string
  avatarUrl: string | null
  nickname: string
  role: string
  createdAt?: string
  updatedAt?: string
  ratings?: UserRating[]
}

export type AdminUser = PublicUserProfile & {
  email?: string | null
  phone?: string | null
  telegramId?: string | null
  sourceCode?: string | null
  sourceType?: string | null
}

export type GetUsersResponse =
  | AdminUser[]
  | {
      data: AdminUser[]
      meta?: { page: number; total: number; limit: number; pages: number }
    }

export type RatingUser = Pick<PublicUserProfile, 'id' | 'avatarUrl' | 'nickname'>
