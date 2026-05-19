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

export function usePromoLinksApi() {
  const api = useApi()

  const getPromoLinks = () => {
    return api.request<PromoLink[]>('/admin/promo-links', {
      method: 'GET',
    })
  }

  const getPromoLink = (id: string) => {
    return api.request<PromoLink>(`/admin/promo-links/${id}`, {
      method: 'GET',
    })
  }

  const createPromoLink = (payload: CreatePromoLinkPayload) => {
    return api.request<PromoLink, CreatePromoLinkPayload>('/admin/promo-links', {
      method: 'POST',
      body: payload,
    })
  }

  const updatePromoLink = (id: string, payload: UpdatePromoLinkPayload) => {
    return api.request<PromoLink, UpdatePromoLinkPayload>(`/admin/promo-links/${id}`, {
      method: 'PATCH',
      body: payload,
    })
  }

  const trackPromoClick = (payload: TrackPromoClickPayload) => {
    return api.request<void, TrackPromoClickPayload>('/promo-links/track-click', {
      method: 'POST',
      body: payload,
      auth: false,
    })
  }

  return {
    getPromoLinks,
    getPromoLink,
    createPromoLink,
    updatePromoLink,
    trackPromoClick,
  }
}
