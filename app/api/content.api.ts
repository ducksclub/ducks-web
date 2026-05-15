import type {
  GetContentByIdParams,
  GetContentByIdResponse,
  GetContentsParams,
  GetContentsResponse,
  UpdateContentParams,
  UpdateContentPayload,
  UpdateContentResponse,
} from '~/types/api/content.types'

export function useContentApi() {
  const api = useApi()

  const getContents = (params: GetContentsParams) => {
    return api.request<GetContentsResponse>(`/content/by-key/${params.key}`, {
      method: 'GET',
    })
  }

  const getContentById = (params: GetContentByIdParams) => {
    return api.request<GetContentByIdResponse>(`/content/${params.id}`, {
      method: 'GET',
    })
  }

  const updateContent = (params: UpdateContentParams, payload: UpdateContentPayload) => {
    return api.request<UpdateContentResponse>(`/content/${params.id}`, {
      method: 'PUT',
      body: payload,
    })
  }

  return { getContents, getContentById, updateContent }
}
