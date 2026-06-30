import { ratingService } from '~/services/rating/rating.service'
import type { EventGameType } from '~/types/event.types'
import type { Rating } from '~/types/rating.types'

export const useRatingService = () => {
  const pending = ref<boolean>(true)
  const rating = ref<Rating[]>([])
  const error = ref<string>('')

  const getRating = async (gameType: EventGameType) => {
    pending.value = true

    try {
      rating.value = await ratingService.getRating(gameType)
    } catch (e) {
      error.value = getApiErrorMessage(e, 'Не удалось получить рейтинг')
    } finally {
      pending.value = false
    }
  }

  return { pending, rating, error, getRating }
}
