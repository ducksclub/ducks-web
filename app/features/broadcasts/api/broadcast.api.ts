import { apiRequest } from '~/shared/api/http-client'
import type { CreateBroadcastPayload, CreateBroadcastResponse } from '../model/broadcast'

export const broadcastApi = {
  createBroadcast(payload: CreateBroadcastPayload) {
    return apiRequest<CreateBroadcastResponse, CreateBroadcastPayload>({
      url: '/broadcasts',
      method: 'POST',
      body: payload,
    })
  },
}
