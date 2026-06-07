export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return

  const auth = useAuthProvider()

  if (!auth.token) {
    await auth.restoreSession()
  }
})
