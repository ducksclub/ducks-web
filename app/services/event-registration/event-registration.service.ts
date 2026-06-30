import { apiRequest } from '../client'
import type { EventRegistrationStatusResponse } from './event-registration.types'

class EventRegistrationService {
  getStatus = async (eventId: string) => {
    return apiRequest<EventRegistrationStatusResponse>({
      url: `/events/${eventId}/registration`,
    })
  }

  register = async (eventId: string) => {
    return apiRequest<unknown>({
      url: `/events/${eventId}/register`,
      method: 'POST',
    })
  }

  unregister = async (eventId: string) => {
    return apiRequest<unknown>({
      url: `/events/${eventId}/register`,
      method: 'DELETE',
    })
  }
}

export const eventRegistrationService = new EventRegistrationService()
