export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return

  const auth = useAuthStore()

  if (auth.token) {
    return navigateTo('/')
  }
})
