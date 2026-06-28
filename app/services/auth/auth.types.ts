import type { User } from "~/types/user.types"

export type SignInPayload = {
  email: string
  password: string
}

export type SignInResponse = {
  token: string
  user: User
}

export type SignUpPayload = {
  email: string
  nickname: string
  password: string
}

export type SignUpResponse = SignInResponse

export type SignInWithTelegramPayload = {
  initData: string
}

export type SignInWithTelegramResponse = SignInResponse

export type ForgotPasswordPayload = {
  email: string
}

export type ForgotPasswordResponse = {
  message: string
}

export type ResetPasswordPayload = {
  token: string
  password: string
}

export type ResetPasswordResponse = {
  message: string
}
