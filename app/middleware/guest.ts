export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return

  const auth = useAuthStore()

  if (to.path === '/') return

  if (!auth.token) {
    await auth.initializeAuth()
  }

  if (!auth.token) {
    return
  }

  if (!auth.user) {
    await auth.fetchMe()
  }

  if (auth.isAuthenticated && auth.user) {
    return navigateTo('/')
  }
})
