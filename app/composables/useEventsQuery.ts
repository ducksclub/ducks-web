import { ref, watch } from 'vue'
import type { Event } from '~/types/events'
import { useEventsApi } from '~/api/events.api'

export function useEventsQuery(category: Ref<string>) {
  const events = ref<Event[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const api = useEventsApi()

  let requestId = 0

  const fetchEvents = async () => {
    const current = ++requestId

    try {
      isLoading.value = true
      error.value = null

      const res = await api.getEvents({
        gameType: category.value || undefined,
      })

      if (current !== requestId) return

      events.value = res.data
    } catch {
      if (current !== requestId) return

      error.value = 'Ошибка загрузки событий'
    } finally {
      if (current === requestId) {
        isLoading.value = false
      }
    }
  }

  watch(category, fetchEvents, { immediate: true })

  return {
    events,
    isLoading,
    error,
    fetchEvents,
  }
}
