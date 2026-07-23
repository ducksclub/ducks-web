import type { EventGameType } from './event'

export type UserRating = {
  gameType: EventGameType | string
  points: number
  bounty?: number
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

export type AdminUserGameStats = {
  gameType: EventGameType
  points: number
  bounty: number
}

export type AdminUser = Omit<PublicUserProfile, 'ratings'> & {
  email?: string | null
  phone?: string | null
  telegramId?: string | null
  sourceCode?: string | null
  sourceType?: string | null
  ratings: AdminUserGameStats[]
}

export type UpdateUserGameStatsPayload =
  | { points: number; bounty?: number }
  | { points?: number; bounty: number }

export type UpdateUserGameStatsResponse = AdminUserGameStats & {
  userId: string
}

export type GetUsersResponse =
  | AdminUser[]
  | {
      data: AdminUser[]
      meta?: { page: number; total: number; limit: number; pages: number }
    }

export type RatingUser = Pick<PublicUserProfile, 'id' | 'avatarUrl' | 'nickname'>
