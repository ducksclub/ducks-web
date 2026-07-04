export const renderPicture = (url: string) => {
  const config = useRuntimeConfig()

  if (url.startsWith('http')) return url
  return config.public.mediaBase + url
}
