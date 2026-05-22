import type { AuthUser } from './auth'

export type Rating = {
  id: string
  userId: string
  gameType: string
  points: number
  createdAt: string
  updatedAt: string
  user: AuthUser
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
