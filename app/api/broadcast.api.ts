import type {
  BroadcastDetailResponse,
  BroadcastListResponse,
  CreateBroadcastPayload,
  CreateBroadcastResponse,
} from '~/types/broadcast'

export function useBroadcastApi() {
  const api = useApi()

  const createBroadcast = (payload: CreateBroadcastPayload) => {
    return api.request<CreateBroadcastResponse>(`/broadcasts`, {
      method: 'POST',
      body: payload,
    })
  }

  const getBroadcasts = (page = 1, limit = 20) => {
    return api.request<BroadcastListResponse>('/broadcasts', {
      query: { page, limit },
    })
  }

  const getBroadcast = (id: string) => {
    return api.request<BroadcastDetailResponse>(`/broadcasts/${id}`)
  }

  return {
    createBroadcast,
    getBroadcasts,
    getBroadcast,
  }
}
