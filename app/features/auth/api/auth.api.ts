import { apiRequest } from '~/shared/api/http-client'
import type {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
  SignInPayload,
  SignInResponse,
  SignInWithTelegramPayload,
  SignInWithTelegramResponse,
  SignUpPayload,
  SignUpResponse,
} from '../model/auth.types'

export const authApi = {
  signIn(payload: SignInPayload) {
    return apiRequest<SignInResponse, SignInPayload>({
      url: '/auth/signin',
      method: 'POST',
      body: payload,
      auth: false,
    })
  },

  signUp(payload: SignUpPayload) {
    return apiRequest<SignUpResponse, SignUpPayload>({
      url: '/auth/signup',
      method: 'POST',
      body: payload,
      auth: false,
    })
  },

  signInWithTelegram(payload: SignInWithTelegramPayload) {
    return apiRequest<SignInWithTelegramResponse, SignInWithTelegramPayload>({
      url: '/auth/signin-with-telegram',
      method: 'POST',
      body: payload,
      auth: false,
    })
  },

  forgotPassword(payload: ForgotPasswordPayload) {
    return apiRequest<ForgotPasswordResponse, ForgotPasswordPayload>({
      url: '/auth/forgot-password',
      method: 'POST',
      body: payload,
      auth: false,
    })
  },

  resetPassword(payload: ResetPasswordPayload) {
    return apiRequest<ResetPasswordResponse, ResetPasswordPayload>({
      url: '/auth/reset-password',
      method: 'POST',
      body: payload,
      auth: false,
    })
  },
}
