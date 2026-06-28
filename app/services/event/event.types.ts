import type { Event, EventGameStatus, EventGameType } from '~/types/event.types'

export type GetEventsParams = {
  gameType?: EventGameType
  status?: EventGameStatus
}

export type GetEventsResponse = Event[]
