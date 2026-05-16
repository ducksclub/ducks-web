import { useEventsApi } from '~/api/events.api'
import type { MySeatResponse } from '~/types/event-seat'

const getSeatErrorMessage = (error: unknown) => {
  if (typeof error === 'object' && error !== null) {
    const apiError = error as {
      data?: { message?: string; error?: string }
      message?: string
      error?: string
    }

    return apiError.data?.message || apiError.data?.error || apiError.message || apiError.error
  }

  return ''
}

export function useEventSeat(eventId: Ref<string>) {
  const eventsApi = useEventsApi()

  const seatInfo = ref<MySeatResponse | null>(null)
  const isSeatLoading = ref(false)
  const seatError = ref<string | null>(null)
  const isSeatModalOpen = ref(false)

  const fetchMySeat = async () => {
    if (isSeatLoading.value) return

    try {
      isSeatLoading.value = true
      seatError.value = null
      seatInfo.value = await eventsApi.getMyEventSeat(eventId.value)
    } catch (error) {
      seatInfo.value = null
      seatError.value = getSeatErrorMessage(error) || 'Не удалось узнать место. Попробуйте позже.'
    } finally {
      isSeatLoading.value = false
    }
  }

  const openSeatModal = async () => {
    await fetchMySeat()
    isSeatModalOpen.value = true
  }

  const closeSeatModal = () => {
    isSeatModalOpen.value = false
  }

  return {
    seatInfo,
    isSeatLoading,
    seatError,
    isSeatModalOpen,
    openSeatModal,
    closeSeatModal,
    fetchMySeat,
  }
}
