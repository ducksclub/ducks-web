import { apiRequest } from '~/services/client'
import type { Rating } from '~/types/rating.types'

export type RatingResponse = Rating[]

export function useRatingApi() {
  const getRating = (gameType: string) => {
    return apiRequest<RatingResponse>({
      url: `/ratings/${gameType}`,
      method: 'GET',
    })
  }

  return {
    getRating,
  }
}
