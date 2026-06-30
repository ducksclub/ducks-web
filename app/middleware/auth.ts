import { useAuthSession } from '~/composables/useAuthSession'

export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthSession()

  if (!auth.accessToken.value) {
    auth.restoreSession()
  }

  if (!auth.accessToken.value) {
    return navigateTo('/signin')
  }
})
