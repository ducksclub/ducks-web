import { useAuthSession } from '~/features/auth/composables/useAuthSession'

export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuthSession()

  if (!auth.accessToken.value) {
    auth.restoreSession()
  }

  if (!auth.accessToken.value) {
    return navigateTo('/signin')
  }

  if (!auth.isAdmin.value) {
    return navigateTo('/')
  }
})
