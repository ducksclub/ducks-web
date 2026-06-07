export const useTelegramWebApp = () => {
  const initDataStorageKey = 'telegram:init-data'
  const initDataParamName = 'tgWebAppData='
  const telegramLaunchParams = [
    'tgWebAppVersion',
    'tgWebAppPlatform',
    'tgWebAppThemeParams',
    'tgWebAppStartParam',
  ]

  const getWebApp = () => {
    if (!import.meta.client) return null
    return window.Telegram?.WebApp ?? null
  }

  const isWebAppAvailable = () => Boolean(getWebApp())

  const getInitDataFromUrl = () => {
    if (!import.meta.client) return ''

    const sources = [window.location.hash.replace(/^#/, ''), window.location.search.replace(/^\?/, '')]

    for (const source of sources) {
      if (!source) continue

      const initData = extractInitData(source)

      if (initData) return initData
    }

    return ''
  }

  const extractInitData = (source: string) => {
    const initDataStart = source.indexOf(initDataParamName)

    if (initDataStart === -1) return ''

    const valueStart = initDataStart + initDataParamName.length
    let initData = source.slice(valueStart)
    const nextTelegramParamIndex = telegramLaunchParams.reduce<number | null>((closestIndex, key) => {
      const index = initData.indexOf(`&${key}=`)

      if (index === -1) return closestIndex
      if (closestIndex === null) return index

      return Math.min(closestIndex, index)
    }, null)

    if (nextTelegramParamIndex !== null) {
      initData = initData.slice(0, nextTelegramParamIndex)
    }

    try {
      initData = decodeURIComponent(initData)
    } catch {
      return ''
    }

    return isValidInitData(initData) ? initData : ''
  }

  const isValidInitData = (initData: string) => {
    const params = new URLSearchParams(initData)

    return Boolean(params.get('auth_date') && params.get('hash'))
  }

  const getSavedInitData = () => {
    if (!import.meta.client) return ''

    const initData = window.sessionStorage.getItem(initDataStorageKey) || ''

    if (!initData) return ''
    if (isValidInitData(initData)) return initData

    window.sessionStorage.removeItem(initDataStorageKey)

    return ''
  }

  const saveInitData = (initData: string) => {
    if (!import.meta.client || !isValidInitData(initData)) return

    window.sessionStorage.setItem(initDataStorageKey, initData)
  }

  const getInitData = () => {
    const initData = getWebApp()?.initData || getInitDataFromUrl() || getSavedInitData()

    saveInitData(initData)

    return initData
  }

  const hasInitData = () => Boolean(getInitData())

  const getLaunchEnvironment = () => {
    if (!import.meta.client) {
      return {
        mode: 'unknown' as const,
        webApp: null,
        initData: '',
        errorCode: 'AUTH_ENVIRONMENT_UNKNOWN' as const,
      }
    }

    const webApp = getWebApp()

    if (!webApp) {
      return {
        mode: 'web' as const,
        webApp: null,
        initData: '',
      }
    }

    const initData = getInitData()

    if (!initData) {
      return {
        mode: 'error' as const,
        webApp,
        initData: '',
        errorCode: 'TELEGRAM_INIT_DATA_MISSING' as const,
      }
    }

    return {
      mode: 'telegram' as const,
      webApp,
      initData,
    }
  }

  return {
    getWebApp,
    isWebAppAvailable,
    getInitData,
    hasInitData,
    getLaunchEnvironment,
  }
}
