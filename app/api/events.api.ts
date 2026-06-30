import { apiRequest } from '~/services/client'
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
  const getEvents = (params?: GetEventsParams) => {
    return apiRequest<EventsResponse>({
      url: '/events',
      method: 'GET',
      params,
    })
  }

  const getMyEvents = (params?: GetEventsParams) => {
    return apiRequest<EventsResponse>({
      url: '/events/me',
      method: 'GET',
      params,
    })
  }

  const getActiveEventsNow = (params?: GetEventsParams) => {
    return apiRequest<EventsResponse>({
      url: '/events/active-now',
      method: 'GET',
      params,
    })
  }

  const getEventParticipants = (eventId: string) => {
    return apiRequest<GetEventParticipantsResponse>({
      url: `/events/${eventId}/participants`,
      method: 'GET',
    })
  }

  const getEvent = (id: string) => {
    return apiRequest<EventResponse>({
      url: `/events/${id}`,
      method: 'GET',
    })
  }

  const getTemplates = () => {
    return apiRequest<TemplatesResponse>({
      url: '/events/templates',
      method: 'GET',
    })
  }

  const getMyEventSeat = (eventId: string) => {
    return apiRequest<MySeatResponse>({
      url: `/events/${eventId}/my-seat`,
      method: 'GET',
    })
  }

  const updateEvent = (params: UpdateEventParams, payload: UpdateEventPayload) => {
    return apiRequest<EventResponse, UpdateEventPayload>({
      url: `/events/${params.id}`,
      method: 'PATCH',
      body: payload,
    })
  }
  const deleteEvent = (params: UpdateEventParams) => {
    return apiRequest<EventResponse>({
      url: `/events/${params.id}`,
      method: 'DELETE',
    })
  }

  const reorderParticipants = (eventId: string, payload: ReorderParticipantsPayload) => {
    return apiRequest<unknown, ReorderParticipantsPayload>({
      url: `/events/${eventId}/participants/reorder`,
      method: 'PATCH',
      body: payload,
    })
  }

  const createEvent = (payload: CreateEventPayload) => {
    return apiRequest<EventResponse, CreateEventPayload>({
      url: '/events',
      method: 'POST',
      body: payload,
    })
  }

  const finalizeEvent = (eventId: string) => {
    return apiRequest<FinalizeEventResponse>({
      url: `/events/${eventId}/finalize`,
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
