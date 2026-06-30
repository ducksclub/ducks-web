import { apiRequest } from '~/utils/api/http-client'

export type EventRegistrationStatusResponse = {
  status?: string
}

export const eventRegistrationApi = {
  getStatus(eventId: string) {
    return apiRequest<EventRegistrationStatusResponse>({
      url: `/events/${eventId}/registration`,
    })
  },

  register(eventId: string) {
    return apiRequest<unknown>({
      url: `/events/${eventId}/register`,
      method: 'POST',
    })
  },

  unregister(eventId: string) {
    return apiRequest<unknown>({
      url: `/events/${eventId}/register`,
      method: 'DELETE',
    })
  },
}
