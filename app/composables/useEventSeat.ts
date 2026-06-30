import { useEventService } from '~/composables/services/useEventService'
import type { MySeatResponse } from '~/types/event-seat'

export function useEventSeat(eventId: Ref<string>) {
  const eventService = useEventService()

  const seatInfo = ref<MySeatResponse | null>(null)
  const isSeatLoading = ref(false)
  const seatError = ref<string | null>(null)
  const isSeatModalOpen = ref(false)

  const fetchMySeat = async () => {
    if (isSeatLoading.value) return

    try {
      isSeatLoading.value = true
      seatError.value = null
      seatInfo.value = await eventService.getMyEventSeat(eventId.value)
    } catch (error) {
      seatInfo.value = null
      seatError.value = getApiErrorMessage(error, 'Не удалось узнать место. Попробуйте позже.')
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
