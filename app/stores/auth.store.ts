import { defineStore } from 'pinia'
import type { AuthUser } from '~/features/auth/auth.types'

type SetSessionPayload = {
  token: string
  user: AuthUser
}

export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref<string | null>(null)
    const user = ref<AuthUser | null>(null)

    const isAuthenticated = computed(() => Boolean(token.value && user.value))

    function setSession(payload: SetSessionPayload) {
      token.value = payload.token
      user.value = payload.user
    }

    function setUser(payload: AuthUser | null) {
      user.value = payload
    }

    function expireSession() {
      token.value = null
      user.value = null
    }

    return {
      token,
      user,
      isAuthenticated,

      setSession,
      setUser,
      expireSession,
    }
  },
  {
    persist: {
      key: 'auth',
      storage: piniaPluginPersistedstate.localStorage(),
      pick: ['token', 'user'],
    },
  },
)
