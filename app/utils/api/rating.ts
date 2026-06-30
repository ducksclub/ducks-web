import { apiRequest } from '~/utils/api/http-client'
import type { EventGameType } from '~~/shared/types/event'
import type { Rating } from '~~/shared/types/rating'

export type RatingResponse = Rating[]

export const ratingApi = {
  getRating(gameType: EventGameType | string) {
    return apiRequest<RatingResponse>({
      url: `/ratings/${gameType}`,
      method: 'GET',
    })
  },
}
