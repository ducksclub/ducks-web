export type PromoLinkType = 'PUBLIC_SITE' | 'TELEGRAM_BOT' | 'TELEGRAM_MINI_APP'

export type PromoLink = {
  id: string
  name: string
  type: PromoLinkType
  code: string
  url: string
  targetUrl?: string | null
  clicksCount: number
  registrationsCount: number
  conversionRate: number
  isActive: boolean
  createdAt: string
}

export type CreatePromoLinkPayload = {
  name: string
  type: PromoLinkType
  code?: string
  targetUrl?: string
}

export type UpdatePromoLinkPayload = {
  name?: string
  type?: PromoLinkType
  targetUrl?: string
  isActive?: boolean
}

export type TrackPromoClickPayload = {
  code: string
  type: PromoLinkType
  telegramUserId?: number | string
}
