import { getApiErrorMessage } from '~/utils/api/api-error'
import { eventsApi } from '~/utils/api/events'
import { EventGameStatus, type Event } from '~~/shared/types/event'
import { getNearestPublishedEvents } from '~/utils/event'

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
