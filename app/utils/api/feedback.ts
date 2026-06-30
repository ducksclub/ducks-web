import { apiRequest } from '~/utils/api/http-client'
import type {
  CreateFeedbackPayload,
  CreateFeedbackResponse,
  GetFeedbackResponse,
} from '~~/shared/types/feedback'

export const feedbackApi = {
  getFeedback() {
    return apiRequest<GetFeedbackResponse>({
      url: '/feedback',
      method: 'GET',
    })
  },

  createFeedback(payload: CreateFeedbackPayload) {
    return apiRequest<CreateFeedbackResponse, CreateFeedbackPayload>({
      url: '/feedback',
      method: 'POST',
      body: payload,
    })
  },

  deleteFeedback(id: string) {
    return apiRequest<unknown>({
      url: `/feedback/${id}`,
      method: 'DELETE',
    })
  },
}
