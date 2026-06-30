import { eventService } from '~/services/event/event.service'
import type { GetEventsParams } from '~/services/event/event.types'
import { EventGameStatus, type Event } from '~/types/event.types'

export const useEventService = () => {
  const events = ref<Event[]>([])
  const nearestEvents = ref<Event[]>([])
  const pending = ref<boolean>(false)

  const notify = useNotify()

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

  const getNearestEvents = async () => {
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

    return nearestEvents
  }

  return {
    events,
    pending,
    nearestEvents,
    getEvents,
    getNearestEvents,
  }
}
