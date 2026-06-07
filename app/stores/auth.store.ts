import { useAuthApi } from '~/services/authApi'
import type {
  AuthMode,
  AuthResponse,
  AuthStatus,
  LoginPayload,
  LoginViaTelegramPayload,
  MeResponse,
  RegisterPayload,
  UpdateProfilePayload,
} from '~/types/auth'

export const useAuthStore = defineStore(
  'auth-v2',
  () => {
    const api = useAuthApi()
    const promo = usePromoCode()
    const telegram = useTelegramWebApp()

    const token = ref<string | null>(null)
    const user = ref<MeResponse | null>(null)
    const status = ref<AuthStatus>('idle')
    const mode = ref<AuthMode>('web')
    const error = ref<string | null>(null)
    const isLoadingUser = ref(false)

    let fetchMePromise: Promise<MeResponse | null> | null = null

    const isAuthenticated = computed(() => Boolean(token.value))
    const isAdmin = computed(() => user.value?.role === 'admin')

    function setSession(response: AuthResponse) {
      token.value = response.token

      if (response.user) {
        user.value = response.user as MeResponse
      }

      status.value = 'authenticated'
      error.value = null
    }

    function clearSession(nextStatus: AuthStatus = 'unauthenticated') {
      token.value = null
      user.value = null
      status.value = nextStatus
    }

    function expireSession() {
      clearSession()
      error.value = 'Срок действия сессии истек. Войдите снова.'
    }

    function getOptionalInitData() {
      const initData = telegram.getInitData()

      if (initData) {
        mode.value = 'telegram'
      }

      return initData
    }

    async function login(payload: Omit<LoginPayload, 'initData'>) {
      status.value = 'loading'
      error.value = null

      try {
        const initData = getOptionalInitData()
        const response = await api.signIn({
          ...payload,
          ...(initData ? { initData } : {}),
        })

        setSession(response)

        if (!response.user) {
          await fetchMe()
        }

        return response
      } catch (loginError) {
        clearSession('error')
        error.value = 'Не удалось войти в аккаунт.'
        throw loginError
      }
    }

    async function register(payload: Omit<RegisterPayload, 'initData' | 'promoCode'>) {
      status.value = 'loading'
      error.value = null

      try {
        const initData = getOptionalInitData()
        const promoCode = promo.getSavedPromoCode()
        const response = await api.signUp({
          ...payload,
          ...(initData ? { initData } : {}),
          ...(promoCode ? { promoCode } : {}),
        })

        setSession(response)
        promo.clearPromoCode()

        if (!response.user) {
          await fetchMe()
        }

        return response
      } catch (registerError) {
        clearSession('error')
        error.value = 'Не удалось создать аккаунт.'
        throw registerError
      }
    }

    async function loginViaTelegram() {
      const initData = telegram.getInitData()

      if (!initData) {
        throw new Error('Telegram initData отсутствует')
      }

      status.value = 'loading'
      mode.value = 'telegram'
      error.value = null

      try {
        const promoCode = promo.getSavedPromoCode()
        const payload: LoginViaTelegramPayload = {
          initData,
          ...(promoCode ? { promoCode } : {}),
        }
        const response = await api.signInWithTelegram(payload)

        setSession(response)
        promo.clearPromoCode()

        if (!response.user) {
          await fetchMe()
        }

        return response
      } catch (telegramError) {
        clearSession('error')
        error.value = 'Не удалось войти через Telegram.'
        throw telegramError
      }
    }

    async function fetchMe() {
      if (fetchMePromise) return fetchMePromise

      fetchMePromise = (async () => {
        if (!token.value) {
          clearSession()

          return null
        }

        isLoadingUser.value = true

        try {
          const response = await api.me(token.value)

          user.value = response
          status.value = 'authenticated'

          return response
        } catch {
          expireSession()

          return null
        } finally {
          isLoadingUser.value = false
          fetchMePromise = null
        }
      })()

      return fetchMePromise
    }

    async function initializeAuth() {
      if (!token.value) {
        status.value = 'unauthenticated'

        return null
      }

      if (user.value) {
        status.value = 'authenticated'

        return user.value
      }

      return await fetchMe()
    }

    async function requireAuth() {
      const currentUser = await initializeAuth()

      return Boolean(token.value && currentUser)
    }

    async function updateProfile(payload: UpdateProfilePayload) {
      if (!token.value) {
        throw new Error('Unauthorized')
      }

      return await api.updateProfile(token.value, payload)
    }

    function logout() {
      clearSession()
      navigateTo('/login')
    }

    return {
      token,
      user,
      status,
      mode,
      error,
      isLoadingUser,
      isAuthenticated,
      isAdmin,
      login,
      register,
      loginViaTelegram,
      fetchMe,
      initializeAuth,
      requireAuth,
      updateProfile,
      logout,
      expireSession,
    }
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
      pick: ['token'],
    },
  },
)
