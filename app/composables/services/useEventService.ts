import { eventService } from '~/services/event/event.service'
import { EventGameStatus, type Event } from '~/types/event.types'

export const useEventService = () => {
  const getNearestEvents = async () => {
    const data = await eventService.getEvents({ status: EventGameStatus.PUBLISHED })

    const nearestEvents = [...data]
      .sort((a, b) => {
        return new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
      })
      .slice(0, 2)

    return nearestEvents
  }

  return {
    getNearestEvents,
  }
}
