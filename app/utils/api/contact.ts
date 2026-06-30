import { apiRequest } from '~/utils/api/http-client'
import type { SendContactPayload } from '~~/shared/types/contact'

export const contactApi = {
  sendContact(payload: SendContactPayload) {
    return apiRequest<unknown, SendContactPayload>({
      url: '/contact',
      method: 'POST',
      body: payload,
    })
  },
}
