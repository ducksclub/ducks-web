import { apiRequest } from '~/utils/api/http-client'
import type { MySeatResponse } from '~~/shared/types/event-seat'
import type {
  CreateEventPayload,
  EventResponse,
  EventsResponse,
  FinalizeEventResponse,
  GetEventParticipantsResponse,
  GetEventsParams,
  ReorderParticipantsPayload,
  TemplatesResponse,
  UpdateEventParams,
  UpdateEventPayload,
} from '~~/shared/types/event'

export const eventsApi = {
  getEvents(params?: GetEventsParams) {
    return apiRequest<EventsResponse>({
      url: '/events',
      method: 'GET',
      params,
    })
  },

  getPublishedEvents(params?: GetEventsParams) {
    return apiRequest<EventResponse[]>({
      url: '/events',
      method: 'GET',
      params,
      auth: false,
    })
  },

  getMyEvents(params?: GetEventsParams) {
    return apiRequest<EventsResponse>({
      url: '/events/me',
      method: 'GET',
      params,
    })
  },

  getActiveEventsNow(params?: GetEventsParams) {
    return apiRequest<EventsResponse>({
      url: '/events/active-now',
      method: 'GET',
      params,
    })
  },

  getEvent(id: string) {
    return apiRequest<EventResponse>({
      url: `/events/${id}`,
      method: 'GET',
    })
  },

  getEventParticipants(eventId: string) {
    return apiRequest<GetEventParticipantsResponse>({
      url: `/events/${eventId}/participants`,
      method: 'GET',
    })
  },

  getTemplates() {
    return apiRequest<TemplatesResponse>({
      url: '/events/templates',
      method: 'GET',
    })
  },

  getMyEventSeat(eventId: string) {
    return apiRequest<MySeatResponse>({
      url: `/events/${eventId}/my-seat`,
      method: 'GET',
    })
  },

  updateEvent(params: UpdateEventParams, payload: UpdateEventPayload) {
    return apiRequest<EventResponse, UpdateEventPayload>({
      url: `/events/${params.id}`,
      method: 'PATCH',
      body: payload,
    })
  },

  deleteEvent(params: UpdateEventParams) {
    return apiRequest<EventResponse>({
      url: `/events/${params.id}`,
      method: 'DELETE',
    })
  },

  reorderParticipants(eventId: string, payload: ReorderParticipantsPayload) {
    return apiRequest<unknown, ReorderParticipantsPayload>({
      url: `/events/${eventId}/participants/reorder`,
      method: 'PATCH',
      body: payload,
    })
  },

  createEvent(payload: CreateEventPayload) {
    return apiRequest<EventResponse, CreateEventPayload>({
      url: '/events',
      method: 'POST',
      body: payload,
    })
  },

  finalizeEvent(eventId: string) {
    return apiRequest<FinalizeEventResponse>({
      url: `/events/${eventId}/finalize`,
      method: 'POST',
    })
  },
}
