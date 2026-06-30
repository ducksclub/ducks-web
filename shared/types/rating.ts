import type { EventGameType } from '~~/shared/types/event'
import type { AuthUser } from '~~/shared/types/user'

export type Rating = {
  id: string
  userId: string
  gameType: EventGameType
  points: number
  createdAt: string
  updatedAt: string
  user: AuthUser
}
