import type {
  AuthResponse,
  MeResponse,
  SignInPayload,
  SignInWithTelegramPayload,
  SignUpPayload,
} from '~/types/auth.types'

export function useAuthProvider() {
  const auth = useAuthStore()
  const { request } = useApi()

  const isLoading = ref(false)
  const isInitialized = ref(false)
  const errorMessage = ref<string | null>(null)

  async function signIn(payload: SignInPayload) {
    try {
      isLoading.value = true
      errorMessage.value = null

      const response = await request<AuthResponse, SignInPayload>('/auth/signin', {
        method: 'POST',
        body: payload,
        auth: false,
      })

      auth.setSession({
        token: response.token,
        user: response.user,
      })

      return response
    } finally {
      isLoading.value = false
    }
  }

  async function signInWithTelegram(payload: SignInWithTelegramPayload) {
    try {
      isLoading.value = true
      errorMessage.value = null

      const response = await request<AuthResponse, SignInWithTelegramPayload>(
        '/auth/signin-with-telegram',
        {
          method: 'POST',
          body: payload,
          auth: false,
        },
      )

      auth.setSession({
        token: response.token,
        user: response.user,
      })

      return response
    } finally {
      isLoading.value = false
    }
  }

  async function signUp(payload: SignUpPayload) {
    try {
      isLoading.value = true
      errorMessage.value = null

      const response = await request<AuthResponse, SignUpPayload>('/auth/signup', {
        method: 'POST',
        body: payload,
        auth: false,
      })

      auth.setSession({
        token: response.token,
        user: response.user,
      })

      return response
    } finally {
      isLoading.value = false
    }
  }

  async function restoreSession() {
    try {
      isLoading.value = true
      errorMessage.value = null

      const response = await request<MeResponse>('/users/me', {
        method: 'GET',
      })

      auth.setUser(response.user)

      return response.user
    } catch {
      auth.expireSession()
      return null
    } finally {
      isLoading.value = false
      isInitialized.value = true
    }
  }

  async function signOut() {
    auth.expireSession()

    await navigateTo('/signin')
  }

  function clearError() {
    errorMessage.value = null
  }

  return {
    user: computed(() => auth.user),
    token: computed(() => auth.token),
    isAuthenticated: computed(() => auth.isAuthenticated),

    isLoading: readonly(isLoading),
    isInitialized: readonly(isInitialized),
    errorMessage: readonly(errorMessage),

    signIn,
    signInWithTelegram,
    signUp,
    signOut,
    restoreSession,
    clearError,
  }
}
