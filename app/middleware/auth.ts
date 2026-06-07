export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return

  const auth = useAuthProvider()

  if (!auth.token.value) {
    await auth.signOut()
  }

  if (!auth?.user.value) {
    await auth.restoreSession()
  }
})
