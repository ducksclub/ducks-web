import { apiRequest } from '../client'
import type { MySeatResponse } from '~/types/event-seat'
import type { EventResponse, GetEventParticipantsResponse } from '~/types/event'
import type { GetEventsParams, GetEventsResponse } from './event.types'

class EventService {
  getEvents = async (params?: GetEventsParams) => {
    return apiRequest<GetEventsResponse>({
      url: '/events',
      method: 'GET',
      params,
      auth: false,
    })
  }

  getEvent = async (id: string) => {
    return apiRequest<EventResponse>({
      url: `/events/${id}`,
      method: 'GET',
    })
  }

  getEventParticipants = async (eventId: string) => {
    return apiRequest<GetEventParticipantsResponse>({
      url: `/events/${eventId}/participants`,
      method: 'GET',
    })
  }

  getMyEventSeat = async (eventId: string) => {
    return apiRequest<MySeatResponse>({
      url: `/events/${eventId}/my-seat`,
      method: 'GET',
    })
  }
}

export const eventService = new EventService()
