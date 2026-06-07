export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return

  const auth = useAuthStore()
  const loginRoute = {
    path: '/login',
    query: to.query,
    hash: to.hash,
  }

  if (to.path === '/login') return

  if (!auth.token) {
    return navigateTo(loginRoute)
  }

  if (!auth.user) {
    try {
      await auth.fetchMe()
    } catch {
      return navigateTo(loginRoute)
    }
  }

  if (!auth.user) {
    return navigateTo(loginRoute)
  }
})
