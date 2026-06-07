export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return

  const auth = useAuthStore()
  const loginRoute = {
    path: '/login',
    query: to.query,
    hash: to.hash,
  }

  const isAllowed = await auth.requireAuth()

  if (!isAllowed) {
    return navigateTo(loginRoute)
  }

  if (!auth.isAdmin) {
    return navigateTo('/')
  }
})
