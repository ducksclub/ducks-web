import { uploadService } from '~/services/upload/upload.service'

export const useUploadService = () => {
  const isUploading = ref(false)

  const uploadImage = async (file: File) => {
    isUploading.value = true

    try {
      return await uploadService.uploadImage(file)
    } finally {
      isUploading.value = false
    }
  }

  return {
    uploadImage,
    isUploading,
  }
}
