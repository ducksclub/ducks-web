export default defineNuxtPlugin(() => {
  const auth = useAuthStore()

  void auth.initializeAuth()
})
