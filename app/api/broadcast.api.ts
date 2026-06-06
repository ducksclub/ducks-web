import type { CreateBroadcastPayload, CreateBroadcastResponse } from '~/types/broadcast'

export function useBroadcastApi() {
  const api = useApi()

  const createBroadcast = (payload: CreateBroadcastPayload) => {
    return api.request<CreateBroadcastResponse>(`/broadcasts`, {
      method: 'POST',
      body: payload,
    })
  }

  return {
    createBroadcast,
  }
}
