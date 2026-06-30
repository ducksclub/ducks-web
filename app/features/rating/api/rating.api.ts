import { apiRequest } from '~/shared/api/http-client'
import type { EventGameType } from '~/features/events/model/event'
import type { Rating } from '../model/rating'

export type RatingResponse = Rating[]

export const ratingApi = {
  getRating(gameType: EventGameType | string) {
    return apiRequest<RatingResponse>({
      url: `/ratings/${gameType}`,
      method: 'GET',
    })
  },
}
