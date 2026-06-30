import { apiRequest } from '~/services/client'
import type { SendContactPayload } from '~/types/contact'

export function useContactApi() {
  const sendContact = (payload: SendContactPayload) => {
    return apiRequest<unknown, SendContactPayload>({
      url: '/contact',
      method: 'POST',
      body: payload,
    })
  }

  return {
    sendContact,
  }
}
