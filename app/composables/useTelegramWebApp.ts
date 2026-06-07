export function useTelegramWebApp() {
  const initDataStorageKey = 'telegram:init-data'

  function getWebApp() {
    if (!import.meta.client) return null

    return window.Telegram?.WebApp ?? null
  }

  function getStorage() {
    if (!import.meta.client) return null

    return window.localStorage
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

  function getStoredInitData() {
    const storage = getStorage()

    if (!storage) return ''

    const initData = storage.getItem(initDataStorageKey) || ''

    if (initData && isValidInitData(initData)) {
      return initData
    }

    storage.removeItem(initDataStorageKey)

    return ''
  }

  function saveInitData(initData: string) {
    const storage = getStorage()

    if (!storage || !isValidInitData(initData)) return

    storage.setItem(initDataStorageKey, initData)
  }

  function syncInitDataFromTelegram() {
    const initData = getWebApp()?.initData || getInitDataFromUrl()

    if (initData) {
      saveInitData(initData)
    }

    return initData
  }

  function getInitData() {
    syncInitDataFromTelegram()

    return getStoredInitData()
  }

  function hasInitData() {
    return Boolean(getInitData())
  }

  return {
    getWebApp,
    getStoredInitData,
    saveInitData,
    syncInitDataFromTelegram,
    getInitData,
    hasInitData,
  }
}
