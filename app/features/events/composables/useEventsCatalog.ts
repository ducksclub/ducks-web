import { getApiErrorMessage } from '~/shared/api/api-error'
import { eventsApi } from '../api/events.api'
import { EventGameStatus, type Event } from '../model/event'
import { getNearestPublishedEvents } from '../model/event.helpers'

export const useEventsCatalog = () => {
  const events = ref<Event[]>([])
  const nearestEvents = ref<Event[]>([])
  const pending = ref(false)
  const notify = useNotify()

  const getEvent = (id: string) => eventsApi.getEvent(id)

  const getEventParticipants = (eventId: string) => eventsApi.getEventParticipants(eventId)

  const getMyEventSeat = (eventId: string) => eventsApi.getMyEventSeat(eventId)

  const getEvents = async () => {
    pending.value = true

    try {
      const data = await eventsApi.getPublishedEvents({ status: EventGameStatus.PUBLISHED })
      events.value = data
    } catch (error) {
      notify.error(getApiErrorMessage(error, 'Не удалось загрузить события'))
    } finally {
      pending.value = false
    }
  }

  const getNearestEvents = async (): Promise<Event[]> => {
    pending.value = true

    try {
      const data = await eventsApi.getPublishedEvents({ status: EventGameStatus.PUBLISHED })
      nearestEvents.value = getNearestPublishedEvents(data)
    } catch (error) {
      notify.error(getApiErrorMessage(error, 'Не удалось загрузить события'))
    } finally {
      pending.value = false
    }

    return nearestEvents.value
  }

  return {
    events,
    nearestEvents,
    pending,
    getEvent,
    getEventParticipants,
    getMyEventSeat,
    getEvents,
    getNearestEvents,
  }
}
