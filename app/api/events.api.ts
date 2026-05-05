import type { EventsResponse } from '~/types/events'

export type GetEventsParams = {
  gameType?: string
}

export function useEventsApi() {
  const api = useApi()

  const getEvents = (params?: GetEventsParams) => {
    return api.request<EventsResponse>('/events', {
      method: 'GET',
      query: params,
    })
  }

  return {
    getEvents,
  }
}
