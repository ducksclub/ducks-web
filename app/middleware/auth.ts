export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return

  const auth = useAuthStore()
  const loginRoute = {
    path: '/login',
    query: to.query,
    hash: to.hash,
  }

  if (to.path === '/login') return

  const isAllowed = await auth.requireAuth()

  if (!isAllowed) {
    return navigateTo(loginRoute)
  }
})
