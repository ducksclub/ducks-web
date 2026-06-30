import { ratingApi } from '../api/rating.api'
import type { Rating } from '../model/rating'

export function useRatingQuery(gameType: Ref<string>) {
  const rating = ref<Rating[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  let requestId = 0

  const fetchRating = async () => {
    const current = ++requestId

    try {
      isLoading.value = true
      error.value = null

      const res = await ratingApi.getRating(gameType.value)

      if (current !== requestId) return

      rating.value = res
    } catch {
      if (current !== requestId) return

      error.value = 'Ошибка загрузки рейтинга'
    } finally {
      if (current === requestId) {
        isLoading.value = false
      }
    }
  }

  watch(gameType, fetchRating, { immediate: true })

  return {
    rating,
    isLoading,
    error,
    fetchRating,
  }
}
