import { eventService } from '~/services/event/event.service'
import { EventGameStatus, type Event } from '~/types/event.types'

export const useEventService = () => {
  const events = ref<Event[]>([])
  const nearestEvents = ref<Event[]>([])
  const pending = ref<boolean>(false)

  const notify = useNotify()

  const getEvent = (id: string) => {
    return eventService.getEvent(id)
  }

  const getEventParticipants = (eventId: string) => {
    return eventService.getEventParticipants(eventId)
  }

  const getMyEventSeat = (eventId: string) => {
    return eventService.getMyEventSeat(eventId)
  }

  const getEvents = async () => {
    pending.value = true

    try {
      events.value = await eventService.getEvents({ status: EventGameStatus.PUBLISHED })
    } catch (e) {
      notify.error(getApiErrorMessage(e, 'Не удалось загрузить события'))
    } finally {
      pending.value = false
    }
  }

  const getNearestEvents = async (): Promise<Event[]> => {
    pending.value = true

    try {
      const data = await eventService.getEvents({ status: EventGameStatus.PUBLISHED })

      const events = [...data]
        .sort((a, b) => {
          return new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
        })
        .slice(0, 2)

      nearestEvents.value = events
    } catch (e) {
      notify.error(getApiErrorMessage(e, 'Не удалось загрузить события'))
    } finally {
      pending.value = false
    }

    return nearestEvents.value
  }

  return {
    events,
    pending,
    nearestEvents,
    getEvent,
    getEventParticipants,
    getMyEventSeat,
    getEvents,
    getNearestEvents,
  }
}
