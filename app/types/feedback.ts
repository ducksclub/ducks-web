import type { AuthUser } from './auth.types'

export type Feedback = {
  id: string
  message: string
  createdAt: string
  user: AuthUser
}

export type GetFeedbackResponse = Feedback[]

export type CreateFeedbackPayload = {
  message: string
}

export type CreateFeedbackResponse = {}
