import { apiRequest } from '~/shared/api/http-client'
import type {
  CreatePromoLinkPayload,
  PromoLink,
  TrackPromoClickPayload,
  UpdatePromoLinkPayload,
} from '../model/promo-link'

export const promoLinksApi = {
  getPromoLinks() {
    return apiRequest<PromoLink[]>({
      url: '/admin/promo-links',
      method: 'GET',
    })
  },

  getPromoLink(id: string) {
    return apiRequest<PromoLink>({
      url: `/admin/promo-links/${id}`,
      method: 'GET',
    })
  },

  createPromoLink(payload: CreatePromoLinkPayload) {
    return apiRequest<PromoLink, CreatePromoLinkPayload>({
      url: '/admin/promo-links',
      method: 'POST',
      body: payload,
    })
  },

  updatePromoLink(id: string, payload: UpdatePromoLinkPayload) {
    return apiRequest<PromoLink, UpdatePromoLinkPayload>({
      url: `/admin/promo-links/${id}`,
      method: 'PATCH',
      body: payload,
    })
  },

  trackPromoClick(payload: TrackPromoClickPayload) {
    return apiRequest<void, TrackPromoClickPayload>({
      url: '/promo-links/track-click',
      method: 'POST',
      body: payload,
      auth: false,
    })
  },
}
