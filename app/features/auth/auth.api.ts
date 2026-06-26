import type {
  AuthResponse,
  ForgotPasswordPayload,
  MessageResponse,
  NicknameAvailabilityParams,
  NicknameAvailabilityResponse,
  ResetPasswordPayload,
  SignInPayload,
  SignInWithTelegramPayload,
  SignUpPayload,
} from './auth.types'

export function useAuthApi() {
  const api = useApi()

  const signIn = (payload: SignInPayload) => {
    return api.request<AuthResponse, SignInPayload>('/auth/signin', {
      method: 'POST',
      body: payload,
      auth: false,
    })
  }

  const signUp = (payload: SignUpPayload) => {
    return api.request<AuthResponse, SignUpPayload>('/auth/signup', {
      method: 'POST',
      body: payload,
      auth: false,
    })
  }

  const forgotPassword = (payload: ForgotPasswordPayload) => {
    return api.request<MessageResponse, ForgotPasswordPayload>('/auth/forgot-password', {
      method: 'POST',
      body: payload,
      auth: false,
    })
  }

  const resetPassword = (payload: ResetPasswordPayload) => {
    return api.request<MessageResponse, ResetPasswordPayload>('/auth/reset-password', {
      method: 'POST',
      body: payload,
      auth: false,
    })
  }

  const signInWithTelegram = (payload: SignInWithTelegramPayload) => {
    return api.request<AuthResponse, SignInWithTelegramPayload>('/auth/signin-with-telegram', {
      method: 'POST',
      body: payload,
      auth: false,
    })
  }

  const checkNicknameAvailability = (params: NicknameAvailabilityParams) => {
    return api.request<NicknameAvailabilityResponse>('/auth/nickname/availability', {
      method: 'GET',
      query: params,
      auth: false,
    })
  }

  return {
    signIn,
    signUp,
    forgotPassword,
    resetPassword,
    signInWithTelegram,
    checkNicknameAvailability,
  }
}
