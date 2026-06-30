import { getApiErrorMessage } from '~/utils/api/api-error'
import { ratingApi } from '~/utils/api/rating'
import type { EventGameType } from '~~/shared/types/event'
import type { Rating } from '~~/shared/types/rating'

export const useRatingLeaderboard = () => {
  const pending = ref(true)
  const rating = ref<Rating[]>([])
  const error = ref('')

  const getRating = async (gameType: EventGameType) => {
    pending.value = true
    error.value = ''

    try {
      rating.value = await ratingApi.getRating(gameType)
    } catch (e) {
      error.value = getApiErrorMessage(e, 'Не удалось получить рейтинг')
    } finally {
      pending.value = false
    }
  }

  return { pending, rating, error, getRating }
}
