export const useTelegramWebApp = () => {
  const initDataStorageKey = 'telegram:init-data'

  const getWebApp = () => {
    if (!process.client) return null
    return window.Telegram?.WebApp ?? null
  }

  const getInitDataFromUrl = () => {
    if (!process.client) return ''

    const sources = [window.location.hash.replace(/^#/, ''), window.location.search.replace(/^\?/, '')]

    for (const source of sources) {
      if (!source) continue

      const params = new URLSearchParams(source)
      const initData = params.get('tgWebAppData')

      if (initData) return initData
    }

    return ''
  }

  const getSavedInitData = () => {
    if (!process.client) return ''

    return window.sessionStorage.getItem(initDataStorageKey) || ''
  }

  const saveInitData = (initData: string) => {
    if (!process.client || !initData) return

    window.sessionStorage.setItem(initDataStorageKey, initData)
  }

  const getInitData = () => {
    const initData = getWebApp()?.initData || getInitDataFromUrl() || getSavedInitData()

    saveInitData(initData)

    return initData
  }

  const hasInitData = () => Boolean(getInitData())

  return {
    getWebApp,
    getInitData,
    hasInitData,
  }
}
