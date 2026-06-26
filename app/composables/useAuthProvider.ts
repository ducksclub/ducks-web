import type { SignInPayload, SignInWithTelegramPayload, SignUpPayload } from '~/features/auth/auth.types'
import type { UpdateProfilePayload } from '~/features/profile/profile.types'
import { useAuthApi } from '~/features/auth/auth.api'
import { useProfileApi } from '~/features/profile/profile.api'

export function useAuthProvider() {
  const auth = useAuthStore()
  const authApi = useAuthApi()
  const profileApi = useProfileApi()

  const isLoading = ref(false)
  const isInitialized = ref(false)
  const errorMessage = ref<string | null>(null)

  async function signIn(payload: SignInPayload) {
    try {
      isLoading.value = true
      errorMessage.value = null

      const response = await authApi.signIn(payload)

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

      const response = await authApi.signInWithTelegram(payload)

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

      const response = await authApi.signUp(payload)

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

      const user = await profileApi.getMe()

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

      const user = await profileApi.updateMe(payload)
      auth.setUser(user)
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
    signUp,
    signOut,
    restoreSession,
    updateProfile,
    clearError,
  }
}
