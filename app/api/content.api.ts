import { apiRequest } from '~/services/client'
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
  const getContents = (params: GetContentsParams) => {
    return apiRequest<GetContentsResponse>({
      url: `/content/by-key/${params.key}`,
      method: 'GET',
    })
  }

  const getContentById = (params: GetContentByIdParams) => {
    return apiRequest<GetContentByIdResponse>({
      url: `/content/${params.id}`,
      method: 'GET',
    })
  }

  const updateContent = (params: UpdateContentParams, payload: UpdateContentPayload) => {
    return apiRequest<UpdateContentResponse, UpdateContentPayload>({
      url: `/content/${params.id}`,
      method: 'PUT',
      body: payload,
    })
  }

  return { getContents, getContentById, updateContent }
}
