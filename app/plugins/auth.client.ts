import { useAuthService } from '~/composables/services/useAuthService'

export default defineNuxtPlugin(() => {
  const auth = useAuthService()

  if (!auth.accessToken.value) {
    auth.restoreSession()
  }
})
