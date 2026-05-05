export type Event = {
  id: string
  title: string
  description: string
  gameType: string
  startsAt: string
  endsAt: null
  location: string
  participantLimit: number
  pointsForParticipation: number
  status: string
  createdAt: string
  updatedAt: string
  _count: {
    registrations: 0
  }
}

export type EventsResponse = {
  data: Event[]
  meta: {
    page: number
    total: number
    limit: number
    pages: number
  }
}
