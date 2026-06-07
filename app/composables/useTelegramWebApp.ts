export function useTelegramWebApp() {
  const initDataStorageKey = 'telegram:init-data'

  function getWebApp() {
    if (!import.meta.client) return null

    return window.Telegram?.WebApp ?? null
  }

  function isValidInitData(initData: string) {
    const params = new URLSearchParams(initData)

    return Boolean(params.get('auth_date') && params.get('hash'))
  }

  function getInitDataFromUrl() {
    if (!import.meta.client) return ''

    const sources = [window.location.hash.replace(/^#/, ''), window.location.search.replace(/^\?/, '')]

    for (const source of sources) {
      const params = new URLSearchParams(source)
      const initData = params.get('tgWebAppData')

      if (initData && isValidInitData(initData)) {
        return initData
      }
    }

    return ''
  }

  function getSavedInitData() {
    if (!import.meta.client) return ''

    const initData = window.sessionStorage.getItem(initDataStorageKey) || ''

    if (initData && isValidInitData(initData)) {
      return initData
    }

    window.sessionStorage.removeItem(initDataStorageKey)

    return ''
  }

  function saveInitData(initData: string) {
    if (!import.meta.client || !isValidInitData(initData)) return

    window.sessionStorage.setItem(initDataStorageKey, initData)
  }

  function getInitData() {
    const initData = getWebApp()?.initData || getInitDataFromUrl() || getSavedInitData()

    if (initData) {
      saveInitData(initData)
    }

    return initData
  }

  function hasInitData() {
    return Boolean(getInitData())
  }

  return {
    getWebApp,
    getInitData,
    hasInitData,
  }
}
