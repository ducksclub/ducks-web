import { authService } from '~/services/auth/auth.service'
import type {
  SignInPayload,
  SignInWithTelegramPayload,
  SignUpPayload,
} from '~/services/auth/auth.types'
import type { User } from '~/types/user.types'

export type SessionData = {
  user: User | null
  token: string | null
}

export const useAuthService = () => {
  const profile = useState<User | null>('profile', () => null)
  const accessToken = useState<string | null>('access_token', () => null)

  const session = useSessionStorage()

  // general
  const signIn = async (payload: SignInPayload) => {
    const response = await authService.signIn(payload)
    setSession(response)

    return response
  }

  const signInWithTelegram = async (payload: SignInWithTelegramPayload) => {
    const response = await authService.signInWithTelegram(payload)
    setSession(response)

    return response
  }

  const signUp = async (payload: SignUpPayload) => {
    const response = await authService.signUp(payload)
    setSession(response)

    return response
  }

  const signOut = () => {
    profile.value = null
    accessToken.value = null

    session.clearSession()
  }

  const restoreSession = () => {
    const storedSession = session.getSession()

    profile.value = storedSession.profile
    accessToken.value = storedSession.token

    return storedSession
  }

  // helpers
  const setSession = (data: SessionData) => {
    profile.value = data.user
    accessToken.value = data.token

    session.saveSession(data)
  }

  return {
    profile,
    accessToken,

    signIn,
    signInWithTelegram,
    signUp,
    signOut,
    restoreSession,
  }
}
