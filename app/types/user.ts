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

export type RatingUser = Pick<PublicUserProfile, 'id' | 'avatarUrl' | 'nickname'>
