import type {
  ForgotPasswordPayload,
  ResetPasswordPayload,
  SignInPayload,
  SignInWithTelegramPayload,
  SignUpPayload,
} from '~/services/auth/auth.types'
import type { UpdateProfilePayload } from '~/services/profile/profile.types'
import type { User } from './user.types'

export type AuthUser = Omit<User, 'ratings'>

export type AuthResponse = {
  token: string
  user: User
}

export type MessageResponse = {
  message: string
}

export type NicknameAvailabilityParams = {
  nickname: string
}

export type NicknameAvailabilityResponse = {
  available: boolean
}

export type MeResponse = User

export type {
  ForgotPasswordPayload,
  ResetPasswordPayload,
  SignInPayload,
  SignInWithTelegramPayload,
  SignUpPayload,
  UpdateProfilePayload,
}
