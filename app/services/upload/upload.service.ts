import { apiRequest } from '../client'
import type { UploadImageResponse } from './upload.types'

class UploadService {
  uploadImage = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    return apiRequest<UploadImageResponse, FormData>({
      url: '/upload/image',
      method: 'POST',
      body: formData,
      config: {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    })
  }
}

export const uploadService = new UploadService()
