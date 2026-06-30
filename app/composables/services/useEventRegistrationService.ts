import { eventRegistrationService } from '~/services/event-registration/event-registration.service'

const registeredStatuses = new Set([
  'ACTIVE',
  'PARTICIPANT',
  'WAITING',
  'WAITLIST',
  'WAITING_LIST',
])

export const useEventRegistrationService = (eventId: Ref<string>) => {
  const isLoading = ref(false)
  const isRegistered = ref(false)
  const registrationStatus = ref<string | null>(null)

  const setRegistrationStatus = (status?: string | null) => {
    registrationStatus.value = status ?? null
    isRegistered.value = registeredStatuses.has(registrationStatus.value?.toUpperCase() ?? '')
  }

  const fetchStatus = async () => {
    const response = await eventRegistrationService.getStatus(eventId.value)
    setRegistrationStatus(response?.status)
  }

  const register = async () => {
    try {
      isLoading.value = true
      await eventRegistrationService.register(eventId.value)
      await fetchStatus()
    } finally {
      isLoading.value = false
    }
  }

  const unregister = async () => {
    try {
      isLoading.value = true
      await eventRegistrationService.unregister(eventId.value)
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
