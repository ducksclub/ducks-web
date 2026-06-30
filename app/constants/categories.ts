import { EventGameStatus } from '~~/shared/types/event'
import { EventGameType } from '~~/shared/types/event'

export const categories = [
  { label: 'Все', value: '' },
  { label: 'Покер', value: EventGameType.POKER },
  { label: 'Дартс', value: EventGameType.DARTS },
  { label: 'Бильярд', value: EventGameType.POOL },
  { label: 'Квиз', value: EventGameType.QUIZ },
  { label: 'Мафия', value: EventGameType.MAFIA },
]

export const statuses = [
  { label: 'Все', value: '' },
  { label: 'Доступные', value: EventGameStatus.PUBLISHED },
  { label: 'Завершенные', value: EventGameStatus.COMPLETED },
  { label: 'Отмененные', value: EventGameStatus.CANCELLED },
  { label: 'Черновые', value: EventGameStatus.DRAFT },
]

export const gameTypeColors: Record<string, string> = {
  quiz: 'bg-violet-500/15 text-violet-300 border border-violet-500/20',
  mafia: 'bg-zinc-400/15 text-zinc-300 border border-zinc-400/20',
  poker: 'bg-red-500/15 text-red-300 border border-red-500/20',
  darts: 'bg-blue-500/15 text-blue-300 border border-blue-500/20',
  pool: 'bg-emerald-700/20 text-emerald-300 border border-emerald-600/20',
}
