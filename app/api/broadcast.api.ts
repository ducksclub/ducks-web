import { apiRequest } from '~/services/client'
import type { CreateBroadcastPayload, CreateBroadcastResponse } from '~/types/broadcast'

export function useBroadcastApi() {
  const createBroadcast = (payload: CreateBroadcastPayload) => {
    return apiRequest<CreateBroadcastResponse, CreateBroadcastPayload>({
      url: '/broadcasts',
      method: 'POST',
      body: payload,
    })
  }

  return {
    createBroadcast,
  }
}
