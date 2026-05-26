export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()

  if (to.path === '/') return

  if (!auth.token) return

  if (!auth.user) {
    try {
      await auth.fetchMe()
    } catch {
      return
    }
  }

  if (auth.user) {
    return navigateTo('/')
  }
})
