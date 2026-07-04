import type {
  AuthMessageResponse,
  AuthResponse,
  ForgotPasswordPayload,
  MeResponse,
  ResetPasswordPayload,
  SignInPayload,
  SignInWithTelegramOidcPayload,
  SignInWithTelegramPayload,
  SignUpPayload,
  UpdateProfilePayload,
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

  async function signInWithTelegramOidc(payload: SignInWithTelegramOidcPayload) {
    try {
      isLoading.value = true
      errorMessage.value = null

      const response = await request<AuthResponse, SignInWithTelegramOidcPayload>(
        '/auth/telegram/oidc',
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

  async function forgotPassword(payload: ForgotPasswordPayload) {
    try {
      isLoading.value = true
      errorMessage.value = null

      return await request<AuthMessageResponse, ForgotPasswordPayload>('/auth/forgot-password', {
        method: 'POST',
        body: payload,
        auth: false,
      })
    } finally {
      isLoading.value = false
    }
  }

  async function resetPassword(payload: ResetPasswordPayload) {
    try {
      isLoading.value = true
      errorMessage.value = null

      return await request<AuthMessageResponse, ResetPasswordPayload>('/auth/reset-password', {
        method: 'POST',
        body: payload,
        auth: false,
      })
    } finally {
      isLoading.value = false
    }
  }

  async function restoreSession() {
    try {
      isLoading.value = true
      errorMessage.value = null

      const user = await request<MeResponse>('/users/me', {
        method: 'GET',
      })

      auth.setUser(user)

      return user
    } catch {
      auth.expireSession()
      return null
    } finally {
      isLoading.value = false
      isInitialized.value = true
    }
  }

  async function updateProfile(payload: UpdateProfilePayload) {
    try {
      isLoading.value = true
      errorMessage.value = null

      await request<null, UpdateProfilePayload>('/users/me', {
        method: 'PATCH',
        body: payload,
      })
    } finally {
      isLoading.value = false
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
    signInWithTelegramOidc,
    signUp,
    forgotPassword,
    resetPassword,
    signOut,
    restoreSession,
    updateProfile,
    clearError,
  }
}
