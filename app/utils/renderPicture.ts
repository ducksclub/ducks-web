export const renderPicture = (url: string) => {
  const config = useRuntimeConfig()

  return config.public.mediaBase + url
}
