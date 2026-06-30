import type { EventGameType } from './event.types'
import type { User } from './user.types'

export type Rating = {
  id: string
  userId: string
  gameType: EventGameType
  points: number
  createdAt: string
  updatedAt: string
  user: Omit<User, 'ratings'>
}
