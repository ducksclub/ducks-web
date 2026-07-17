export type CreateBroadcastPayload = {
  message: string
}

export type CreateBroadcastResponse = {
  message: string
  data: {
    id: string
    message: string
    totalUsers: number
    createdCount: number
    skippedCount: number
    createdAt: string
  }
}

export type BroadcastDelivery = {
  total: number
  sent: number
  notSent: number
}

export type BroadcastListItem = {
  id: string
  message: string
  totalUsers: number
  createdCount: number
  skippedCount: number
  createdAt: string
  delivery: BroadcastDelivery
}

export type BroadcastRecipient = {
  id: string
  telegramUserId: number
  deliveryStatus: 'sent' | 'not_sent'
  queueStatus: 'pending' | 'processing' | 'sent' | 'failed' | 'cancelled'
  attempts: number
  sentAt: string | null
  error: string | null
  user: {
    id: string
    nickname: string
    email: string
    phone: string | null
    avatarUrl: string | null
  } | null
}

export type BroadcastDetail = BroadcastListItem & {
  recipients: BroadcastRecipient[]
}

export type BroadcastListResponse = {
  data: BroadcastListItem[]
  meta: {
    total: number
    page: number
    limit: number
    pages: number
  }
}

export type BroadcastDetailResponse = {
  data: BroadcastDetail
}
