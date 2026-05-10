import type { RatingResponse } from '~/types/rating'

export function useRatingApi() {
  const api = useApi()

  const getRating = (gameType: string) => {
    return api.request<RatingResponse>(`/ratings/${gameType}`, {
      method: 'GET',
    })
  }

  return {
    getRating,
  }
}
