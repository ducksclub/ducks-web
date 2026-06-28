import { authService } from '~/services/auth/auth.service'
import type {
  SignInPayload,
  SignInWithTelegramPayload,
  SignUpPayload,
} from '~/services/auth/auth.types'
import type { User } from '~/types/user.types'

export type SessionData = {
  user: User
  token: string
}

export const useAuthService = () => {
  const user = useState<User | null>('user:state', () => null)
  const accessToken = useState<string | null>('access_token:state', () => null)

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

  // helpers
  const setSession = (data: SessionData) => {
    user.value = data.user
    accessToken.value = data.token
  }

  return {
    signIn,
    signInWithTelegram,
    signUp,
  }
}
