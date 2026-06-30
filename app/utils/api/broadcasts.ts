import { apiRequest } from '~/utils/api/http-client'
import type { CreateBroadcastPayload, CreateBroadcastResponse } from '~~/shared/types/broadcast'

export const broadcastApi = {
  createBroadcast(payload: CreateBroadcastPayload) {
    return apiRequest<CreateBroadcastResponse, CreateBroadcastPayload>({
      url: '/broadcasts',
      method: 'POST',
      body: payload,
    })
  },
}
