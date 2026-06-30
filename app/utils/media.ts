export const renderPicture = (url?: string | null) => {
  if (!url) return ''
  if (/^https?:\/\//i.test(url)) return url

  const config = useRuntimeConfig()
  const mediaBase = config.public.mediaBase || config.public.apiBase.replace(/\/api\/?$/, '')

  return mediaBase.replace(/\/$/, '') + url
}
