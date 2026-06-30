import type { EventGameType } from '~/features/events/model/event'
import type { AuthUser } from '~/features/auth/model/user'

export type Rating = {
  id: string
  userId: string
  gameType: EventGameType
  points: number
  createdAt: string
  updatedAt: string
  user: AuthUser
}
