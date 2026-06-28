import { apiRequest } from '../client'
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
}

export const eventService = new EventService()
