import type {
  CreateEventPayload,
  EventResponse,
  EventsResponse,
  FinalizeEventResponse,
  GetEventParticipantsResponse,
  ReorderParticipantsPayload,
  TemplatesResponse,
  UpdateEventParams,
  UpdateEventPayload,
} from '~/types/event'
import type { MySeatResponse } from '~/types/event-seat'

export type GetEventsParams = {
  gameType?: string
  status?: string
}

export function useEventsApi() {
  const api = useApi()

  const getEvents = (params?: GetEventsParams) => {
    return api.request<EventsResponse>('/events', {
      method: 'GET',
      query: params,
    })
  }

  const getMyEvents = (params?: GetEventsParams) => {
    return api.request<EventsResponse>('/my-events', {
      method: 'GET',
      query: params,
    })
  }

  const getActiveEventsNow = (params?: GetEventsParams) => {
    return api.request<EventsResponse>('/events/active-now', {
      method: 'GET',
      query: params,
    })
  }

  const getEventParticipants = (eventId: string) => {
    return api.request<GetEventParticipantsResponse>(`/event-results/${eventId}/participants`, {
      method: 'GET',
    })
  }

  const getEvent = (id: string) => {
    return api.request<EventResponse>(`/events/${id}`, {
      method: 'GET',
    })
  }

  const getTemplates = () => {
    return api.request<TemplatesResponse>(`/events/templates`, {
      method: 'GET',
    })
  }

  const getMyEventSeat = (eventId: string) => {
    return api.request<MySeatResponse>(`/event-registrations/${eventId}/seat/me`, {
      method: 'GET',
    })
  }

  const updateEvent = (params: UpdateEventParams, payload: UpdateEventPayload) => {
    return api.request<EventResponse>(`/events/${params.id}`, {
      method: 'PATCH',
      body: payload,
    })
  }
  const deleteEvent = (params: UpdateEventParams) => {
    return api.request<EventResponse>(`/events/${params.id}`, {
      method: 'DELETE',
    })
  }

  const reorderParticipants = (eventId: string, payload: ReorderParticipantsPayload) => {
    return api.request(`/event-results/${eventId}/participants/reorder`, {
      method: 'PATCH',
      body: payload,
    })
  }

  const createEvent = (payload: CreateEventPayload) => {
    return api.request<EventResponse>(`/events`, {
      method: 'POST',
      body: payload,
    })
  }

  const finalizeEvent = (eventId: string) => {
    return api.request<FinalizeEventResponse>(`/event-results/${eventId}/finalize`, {
      method: 'POST',
    })
  }

  return {
    getEvent,
    getTemplates,
    getMyEventSeat,
    getEvents,
    getMyEvents,
    getActiveEventsNow,
    getEventParticipants,
    reorderParticipants,
    updateEvent,
    createEvent,
    deleteEvent,
    finalizeEvent,
  }
}
