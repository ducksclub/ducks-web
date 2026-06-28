import { apiRequest } from '../client'
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
} from './auth.types'

class AuthService {
  signIn = async (payload: SignInPayload) => {
    return apiRequest<SignInResponse, SignInPayload>({
      url: '/auth/signin',
      method: 'POST',
      body: payload,
      auth: false,
    })
  }

  signUp = async (payload: SignUpPayload) => {
    return apiRequest<SignUpResponse, SignUpPayload>({
      url: '/auth/signup',
      method: 'POST',
      body: payload,
      auth: false,
    })
  }

  signInWithTelegram = async (payload: SignInWithTelegramPayload) => {
    return apiRequest<SignInWithTelegramResponse, SignInWithTelegramPayload>({
      url: '/auth/signin-with-telegram',
      method: 'POST',
      body: payload,
      auth: false,
    })
  }

  forgotPassword = async (payload: ForgotPasswordPayload) => {
    return apiRequest<ForgotPasswordResponse, ForgotPasswordPayload>({
      url: '/auth/forgot-password',
      method: 'POST',
      body: payload,
      auth: false,
    })
  }

  resetPassword = async (payload: ResetPasswordPayload) => {
    return apiRequest<ResetPasswordResponse, ResetPasswordPayload>({
      url: '/auth/reset-password',
      method: 'POST',
      body: payload,
      auth: false,
    })
  }
}

export const authService = new AuthService()
