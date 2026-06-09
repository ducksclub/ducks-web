export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthProvider()

  if (!auth.token.value) {
    await auth.restoreSession()
  }
})
