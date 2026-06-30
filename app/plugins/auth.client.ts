import { useAuthSession } from '~/composables/useAuthSession'

export default defineNuxtPlugin(() => {
  const auth = useAuthSession()

  if (!auth.accessToken.value) {
    auth.restoreSession()
  }
})
