import { apiRequest } from '~/shared/api/http-client'
import type { SendContactPayload } from '../model/contact'

export const contactApi = {
  sendContact(payload: SendContactPayload) {
    return apiRequest<unknown, SendContactPayload>({
      url: '/contact',
      method: 'POST',
      body: payload,
    })
  },
}
