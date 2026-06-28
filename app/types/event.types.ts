export const EventGameType = {
  QUIZ: 'quiz',
  POOL: 'pool',
  MAFIA: 'mafia',
  POKER: 'poker',
  DARTS: 'darts',
} as const

export type EventGameType = (typeof EventGameType)[keyof typeof EventGameType]

export const EventGameStatus = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const

export type EventGameStatus = (typeof EventGameStatus)[keyof typeof EventGameStatus]

export type Event = {
  id: string
  imageUrl: string | null
  city: string
  title: string
  address: string
  features: string
  gameRules: string

  tableCount: number
  seatsPerTable: number
  participantLimit: number
  initialDepositAmount: number
  _count: {
    registrations: number
  }

  gameType: 'poker'
  status: 'published'

  endsAt: string | null
  startsAt: string
  createdAt: string
  updatedAt: string

  reminderSentNow: boolean
  reminderSent24h: boolean
  reminderSent2h: boolean
  reminderSent15m: boolean
}
