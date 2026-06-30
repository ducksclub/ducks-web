import { useAuthService } from '~/composables/services/useAuthService'

export default defineNuxtRouteMiddleware(async (to) => {
  const router = useRouter()
  const auth = useAuthService()

  if (!auth.accessToken.value) {
    auth.restoreSession()
  }

  if (auth.accessToken.value) {
    return router.push('/')
  }
})
