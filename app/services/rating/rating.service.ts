import { apiRequest } from '../client'
import type { EventGameType } from '~/types/event.types'
import type { GetRatingResponse } from './rating.types'

class RatingService {
  getRating = async (gameType: EventGameType) => {
    return apiRequest<GetRatingResponse>({
      url: `/ratings/${gameType}`,
      method: 'GET',
    })
  }
}

export const ratingService = new RatingService()
