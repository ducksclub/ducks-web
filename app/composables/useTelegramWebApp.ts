export const useTelegramWebApp = () => {
  const getWebApp = () => {
    if (!process.client) return null

    return window.Telegram?.WebApp ?? null
  }

  const getInitData = () => {
    return getWebApp()?.initData || ''
  }

  const hasInitData = () => Boolean(getInitData())

  return {
    getWebApp,
    getInitData,
    hasInitData,
  }
}
