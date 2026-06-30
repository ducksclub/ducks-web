import { apiRequest } from '~/services/client'
import type {
  CreateFeedbackPayload,
  CreateFeedbackResponse,
  GetFeedbackResponse,
} from '~/types/feedback'

export function useFeedbackApi() {
  const getFeedback = () => {
    return apiRequest<GetFeedbackResponse>({
      url: '/feedback',
      method: 'GET',
    })
  }

  const createFeedback = (payload: CreateFeedbackPayload) => {
    return apiRequest<CreateFeedbackResponse, CreateFeedbackPayload>({
      url: '/feedback',
      method: 'POST',
      body: payload,
    })
  }

  const deleteFeedback = (id: string) => {
    return apiRequest<unknown>({
      url: `/feedback/${id}`,
      method: 'DELETE',
    })
  }

  return {
    getFeedback,
    createFeedback,
    deleteFeedback,
  }
}
