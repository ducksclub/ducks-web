export function useEventRegistrationApi(eventId: Ref<string>) {
  const api = useApi()

  const isLoading = ref(false)
  const isRegistered = ref(false)

  const fetchStatus = async () => {
    const res = await api.request(`/events/${eventId.value}/registration`)
    isRegistered.value = res?.status === 'active'
  }

  const register = async () => {
    isLoading.value = true
    await api.request(`/events/${eventId.value}/register`, {
      method: 'POST',
    })
    isRegistered.value = true
    isLoading.value = false
  }

  const unregister = async () => {
    isLoading.value = true
    await api.request(`/events/${eventId.value}/register`, {
      method: 'DELETE',
    })
    isRegistered.value = false
    isLoading.value = false
  }

  return {
    isLoading,
    isRegistered,
    fetchStatus,
    register,
    unregister,
  }
}
