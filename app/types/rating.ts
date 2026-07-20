import type { RatingUser } from './user'

export type Rating = {
  id: string
  userId: string
  gameType: string
  points: number
  bounty?: number | null
  createdAt: string
  updatedAt: string
  user: RatingUser
}

export type RatingResponse = {
  data: Rating[]
  meta: {
    page: number
    total: number
    limit: number
    pages: number
  }
}
