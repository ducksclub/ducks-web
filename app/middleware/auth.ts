export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuth()

  if (!auth.token.value) {
    return navigateTo('/login')
  }

  if (!auth.user.value) {
    const user = await auth.fetchMe()

    if (!user) {
      return navigateTo('/login')
    }
  }
})
