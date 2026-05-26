export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return

  const auth = useAuthStore()

  if (to.path === '/login') return

  if (!auth.token) {
    return navigateTo('/login')
  }

  if (!auth.user) {
    try {
      await auth.fetchMe()
    } catch {
      return navigateTo('/login')
    }
  }

  if (!auth.user) {
    return navigateTo('/login')
  }
})
