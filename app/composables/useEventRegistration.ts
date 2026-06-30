import { eventRegistrationApi } from '~/utils/api/event-registration'
import { isRegisteredStatus } from '~/utils/event'

export const useEventRegistration = (eventId: Ref<string>) => {
  const isLoading = ref(false)
  const isRegistered = ref(false)
  const registrationStatus = ref<string | null>(null)

  const setRegistrationStatus = (status?: string | null) => {
    registrationStatus.value = status ?? null
    isRegistered.value = isRegisteredStatus(registrationStatus.value)
  }

  const fetchStatus = async () => {
    const response = await eventRegistrationApi.getStatus(eventId.value)
    setRegistrationStatus(response?.status)
  }

  const register = async () => {
    try {
      isLoading.value = true
      await eventRegistrationApi.register(eventId.value)
      await fetchStatus()
    } finally {
      isLoading.value = false
    }
  }

  const unregister = async () => {
    try {
      isLoading.value = true
      await eventRegistrationApi.unregister(eventId.value)
      setRegistrationStatus(null)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    isRegistered,
    registrationStatus,
    fetchStatus,
    register,
    unregister,
  }
}
