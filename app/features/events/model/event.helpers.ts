import { EventGameStatus, EventGameType, type Event } from './event'

const registeredStatuses = new Set([
  'ACTIVE',
  'PARTICIPANT',
  'WAITING',
  'WAITLIST',
  'WAITING_LIST',
])

export const isRegisteredStatus = (status?: string | null) => {
  return registeredStatuses.has(status?.toUpperCase() ?? '')
}

export const getNearestPublishedEvents = (events: Event[], limit = 2) => {
  return [...events]
    .filter((event) => event.status === EventGameStatus.PUBLISHED)
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())
    .slice(0, limit)
}

export const isPokerEvent = (event?: Event | null) => event?.gameType === EventGameType.POKER

export const getSeatingTotalSeats = (event?: Event | null) => {
  if (!isPokerEvent(event) || !event?.seatsPerTable) return null

  return event.maxParticipants ?? event.participantLimit ?? null
}

export const getSeatingTableCount = (event?: Event | null) => {
  const totalSeats = getSeatingTotalSeats(event)

  if (!totalSeats || !event?.seatsPerTable) return null

  return event.tableCount ?? Math.ceil(totalSeats / event.seatsPerTable)
}

export const hasSeatingInfo = (event?: Event | null) => {
  return Boolean(isPokerEvent(event) && getSeatingTableCount(event) && event?.seatsPerTable)
}

export const getGameLabel = (type: string) => {
  return (
    {
      poker: 'Покер',
      pool: 'Бильярд',
      darts: 'Дартс',
      quiz: 'Квиз',
      mafia: 'Мафия',
    }[type] ?? type
  )
}

export const getStatusLabel = (type: string) => {
  return (
    {
      [EventGameStatus.DRAFT]: 'Черновик',
      [EventGameStatus.PUBLISHED]: 'Доступен',
      [EventGameStatus.CANCELLED]: 'Отменен',
      [EventGameStatus.COMPLETED]: 'Завершен',
    }[type] ?? type
  )
}

export const statusMap = {
  draft: {
    label: 'Черновик',
    class: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  },
  published: {
    label: 'Доступен',
    class: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  },
  cancelled: {
    label: 'Отменен',
    class: 'bg-red-500/10 text-red-400 border-red-500/20',
  },
  completed: {
    label: 'Завершен',
    class: 'bg-white/5 text-gray-400 border-white/10',
  },
}
