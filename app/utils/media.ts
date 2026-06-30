export const renderPicture = (url?: string | null) => {
  const config = useRuntimeConfig()
  return config.public.mediaBase + url
}
