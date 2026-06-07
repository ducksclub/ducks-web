import { AuthError, getResponseStatus, toAuthError } from '~/utils/auth-error'
import { useAuthApi } from '~/services/authApi'
import type {
  AuthErrorCode,
  AuthMode,
  AuthStatus,
  AuthUser,
  LoginPayload,
  LoginResponse,
  LoginViaTelegramPayload,
  MeResponse,
  RegisterPayload,
  RegisterResponse,
  TelegramAuthResponse,
  UpdateProfilePayload,
} from '~/types/auth'

type SessionResponse = LoginResponse | RegisterResponse | TelegramAuthResponse

export const useAuthStore = defineStore(
  'auth-v2',
  () => {
    const api = useAuthApi()
    const promo = usePromoCode()
    const telegram = useTelegramWebApp()

    const token = ref<string | null>(null)
    const user = ref<MeResponse | AuthUser | null>(null)
    const status = ref<AuthStatus>('idle')
    const authMode = ref<AuthMode>('unknown')
    const authError = shallowRef<AuthError | null>(null)
    const isLoadingUser = ref(false)

    let initializePromise: Promise<MeResponse | AuthUser | null> | null = null
    let fetchMePromise: Promise<MeResponse | null> | null = null
    let telegramLoginPromise: Promise<TelegramAuthResponse> | null = null

    const isAuthenticated = computed(() => status.value === 'authenticated' && Boolean(token.value))
    const isAdmin = computed(() => user.value?.role === 'admin')

    function setAuthError(error: unknown, fallbackCode: AuthErrorCode = 'AUTH_REQUEST_FAILED') {
      authError.value = toAuthError(error, fallbackCode)
      status.value = 'error'

      return authError.value
    }

    function clearAuthError() {
      authError.value = null
    }

    function setSession(response: SessionResponse) {
      token.value = response.token

      if ('user' in response && response.user) {
        user.value = response.user
      }

      status.value = 'authenticated'
      clearAuthError()
    }

    function clearSession(nextStatus: AuthStatus = 'unauthenticated') {
      token.value = null
      user.value = null
      status.value = nextStatus
    }

    function expireSession() {
      clearSession()
      setAuthError(new AuthError('TOKEN_EXPIRED'))
    }

    async function updateProfile(payload: UpdateProfilePayload) {
      if (!token.value) {
        throw new AuthError('PROTECTED_ROUTE_UNAUTHENTICATED')
      }

      return await api.updateProfile(token.value, payload)
    }

    async function login(payload: LoginPayload) {
      status.value = 'loading'
      clearAuthError()

      try {
        const environment = telegram.getLaunchEnvironment()
        const initData = environment.mode === 'telegram' ? environment.initData : ''
        const response = await api.signIn({
          ...payload,
          ...(initData ? { initData } : {}),
        })

        authMode.value = environment.mode === 'telegram' ? 'telegram' : 'web'
        setSession(response)

        return response
      } catch (error) {
        setAuthError(error)
        throw error
      }
    }

    async function loginViaTelegram(initDataOverride?: string) {
      if (telegramLoginPromise) return telegramLoginPromise

      telegramLoginPromise = (async () => {
        status.value = 'loading'
        clearAuthError()

        const environment = telegram.getLaunchEnvironment()
        authMode.value = environment.mode

        if (environment.mode === 'web') {
          throw setAuthError(new AuthError('TELEGRAM_WEBAPP_UNAVAILABLE'))
        }

        const initData = initDataOverride || environment.initData

        if (!initData) {
          throw setAuthError(new AuthError('TELEGRAM_INIT_DATA_MISSING'))
        }

        try {
          const promoCode = promo.getSavedPromoCode()
          const body: LoginViaTelegramPayload = {
            initData,
            ...(promoCode ? { promoCode } : {}),
          }
          const response = await api.signInWithTelegram(body)

          setSession(response)
          promo.clearPromoCode()

          if (!user.value) {
            await fetchMe()
          }

          return response
        } catch (error) {
          const code =
            getResponseStatus(error) === 401 ? 'TELEGRAM_AUTH_REJECTED' : 'AUTH_REQUEST_FAILED'
          setAuthError(error, code)
          throw error
        }
      })()

      try {
        return await telegramLoginPromise
      } finally {
        telegramLoginPromise = null
      }
    }

    async function fetchMe() {
      if (fetchMePromise) return fetchMePromise

      fetchMePromise = (async () => {
        if (!token.value) {
          user.value = null
          status.value = 'unauthenticated'

          return null
        }

        isLoadingUser.value = true

        try {
          const response = await api.me(token.value)

          user.value = response
          status.value = 'authenticated'
          clearAuthError()

          return response
        } catch (error) {
          if (getResponseStatus(error) === 401) {
            expireSession()
          } else {
            clearSession()
            setAuthError(error)
          }

          return null
        } finally {
          isLoadingUser.value = false
          fetchMePromise = null
        }
      })()

      return fetchMePromise
    }

    async function register(payload: RegisterPayload) {
      status.value = 'loading'
      clearAuthError()

      try {
        const environment = telegram.getLaunchEnvironment()
        const promoCode = promo.getSavedPromoCode()
        const response = await api.signUp({
          ...payload,
          ...(environment.mode === 'telegram' ? { initData: environment.initData } : {}),
          ...(promoCode ? { promoCode } : {}),
        })

        authMode.value = environment.mode === 'telegram' ? 'telegram' : 'web'
        setSession(response)
        await fetchMe()
        promo.clearPromoCode()

        return response
      } catch (error) {
        setAuthError(error)
        throw error
      }
    }

    async function initializeAuth() {
      if (!import.meta.client) return null
      if (initializePromise) return initializePromise

      initializePromise = (async () => {
        status.value = 'loading'
        clearAuthError()

        const environment = telegram.getLaunchEnvironment()
        authMode.value = environment.mode

        if (token.value) {
          const me = await fetchMe()

          if (me) return me
        }

        if (environment.mode === 'telegram') {
          try {
            await loginViaTelegram(environment.initData)
          } catch {
            return null
          }

          return user.value
        }

        if (environment.mode === 'error') {
          setAuthError(new AuthError(environment.errorCode || 'AUTH_ENVIRONMENT_UNKNOWN'))

          return null
        }

        status.value = 'unauthenticated'

        return null
      })()

      try {
        return await initializePromise
      } finally {
        initializePromise = null
      }
    }

    async function requireAuth() {
      if (isAuthenticated.value && user.value) return true

      try {
        await initializeAuth()
      } catch {
        return false
      }

      if (isAuthenticated.value && user.value) return true

      setAuthError(new AuthError('PROTECTED_ROUTE_UNAUTHENTICATED'))

      return false
    }

    function logout() {
      clearSession()

      if (import.meta.client) {
        navigateTo('/login')
      }
    }

    return {
      token,
      user,
      status,
      authMode,
      authError,
      isLoadingUser,
      isAuthenticated,
      isAdmin,
      login,
      updateProfile,
      loginViaTelegram,
      fetchMe,
      initializeAuth,
      requireAuth,
      register,
      logout,
      expireSession,
      clearAuthError,
    }
  },

  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
      pick: ['token'],
    },
  },
)
