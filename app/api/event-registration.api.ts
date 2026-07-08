export function useEventRegistrationApi(eventId: Ref<string>) {
  const api = useApi()

  const isLoading = ref(false)
  const isRegistered = ref(false)
  const registrationStatus = ref<string | null>(null)

  const registeredStatuses = new Set([
    'ACTIVE',
    'PARTICIPANT',
    'WAITING',
    'WAITLIST',
    'WAITING_LIST',
  ])

  const fetchStatus = async () => {
    const res = await api.request<{ status?: string }>(
      `/event-registrations/${eventId.value}/check`,
    )
    registrationStatus.value = res?.status ?? null
    isRegistered.value = registeredStatuses.has(registrationStatus.value?.toUpperCase() ?? '')
  }

  const register = async () => {
    try {
      isLoading.value = true
      await api.request(`/event-registrations/${eventId.value}/register`, {
        method: 'POST',
      })
      await fetchStatus()
    } finally {
      isLoading.value = false
    }
  }

  const unregister = async () => {
    try {
      isLoading.value = true
      await api.request(`/event-registrations/${eventId.value}/cancel`, {
        method: 'POST',
      })
      registrationStatus.value = null
      isRegistered.value = false
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
