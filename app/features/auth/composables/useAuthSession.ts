import { authApi } from '../api/auth.api'
import type { SignInPayload, SignInWithTelegramPayload, SignUpPayload } from '../model/auth.types'
import {
  clearStoredSession,
  readStoredSession,
  writeStoredSession,
  type SessionData,
} from '../model/session'
import { Role, type User } from '../model/user'

export const useAuthSession = () => {
  const profile = useState<User | null>('profile', () => null)
  const accessToken = useState<string | null>('access_token', () => null)

  const isAuthenticated = computed(() => Boolean(accessToken.value))
  const isAdmin = computed(() => profile.value?.role === Role.ADMIN)

  const setSession = (data: SessionData) => {
    profile.value = data.user
    accessToken.value = data.token

    writeStoredSession(data)
  }

  const restoreSession = () => {
    const storedSession = readStoredSession()

    profile.value = storedSession.profile
    accessToken.value = storedSession.token

    return storedSession
  }

  const signIn = async (payload: SignInPayload) => {
    const response = await authApi.signIn(payload)
    setSession(response)

    return response
  }

  const signInWithTelegram = async (payload: SignInWithTelegramPayload) => {
    const response = await authApi.signInWithTelegram(payload)
    setSession(response)

    return response
  }

  const signUp = async (payload: SignUpPayload) => {
    const response = await authApi.signUp(payload)
    setSession(response)

    return response
  }

  const signOut = () => {
    profile.value = null
    accessToken.value = null

    clearStoredSession()
  }

  return {
    profile,
    accessToken,
    isAuthenticated,
    isAdmin,
    setSession,
    restoreSession,
    signIn,
    signInWithTelegram,
    signUp,
    signOut,
  }
}
