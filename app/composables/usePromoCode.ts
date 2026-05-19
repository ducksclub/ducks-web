import { usePromoLinksApi, type PromoLinkType } from '~/api/promoLinksApi'

const PROMO_CODE_KEY = 'promoCode'
const PROMO_LINK_TYPE_KEY = 'promoLinkType'
const TRACKED_PROMO_CODE_KEY_PREFIX = 'trackedPromoCode:'
const PROMO_CODE_PATTERN = /^[a-zA-Z0-9_-]{2,64}$/

const normalizePromoCode = (value: unknown) => {
  let code = ''

  if (Array.isArray(value)) {
    code = typeof value[0] === 'string' ? value[0].trim() : ''
  } else {
    code = typeof value === 'string' ? value.trim() : ''
  }

  return PROMO_CODE_PATTERN.test(code) ? code : ''
}

const normalizeType = (value: unknown): PromoLinkType | undefined => {
  return value === 'PUBLIC_SITE' || value === 'TELEGRAM_BOT' || value === 'TELEGRAM_MINI_APP'
    ? value
    : undefined
}

export function usePromoCode() {
  const route = useRoute()
  const { trackPromoClick } = usePromoLinksApi()

  const getPromoCodeFromTelegram = () => {
    if (!process.client) return ''

    const initDataUnsafe = window.Telegram?.WebApp?.initDataUnsafe

    return normalizePromoCode(initDataUnsafe?.start_param || initDataUnsafe?.startParam)
  }

  const getPromoCodeFromUrl = () => {
    if (!process.client) return ''

    return normalizePromoCode(
      route.query.promo ||
        route.query.startapp ||
        route.query.start_param ||
        route.query.promoCode ||
        route.query.source ||
        route.query.utm_source,
    )
  }

  const savePromoCode = (code: string, type?: PromoLinkType) => {
    const normalizedCode = normalizePromoCode(code)

    if (!process.client || !normalizedCode) return

    localStorage.setItem(PROMO_CODE_KEY, normalizedCode)

    if (type) {
      localStorage.setItem(PROMO_LINK_TYPE_KEY, type)
    }
  }

  const getSavedPromoCode = () => {
    if (!process.client) return ''

    return normalizePromoCode(
      localStorage.getItem(PROMO_CODE_KEY) || sessionStorage.getItem(PROMO_CODE_KEY),
    )
  }

  const getSavedPromoLinkType = () => {
    if (!process.client) return undefined

    return normalizeType(
      localStorage.getItem(PROMO_LINK_TYPE_KEY) || sessionStorage.getItem(PROMO_LINK_TYPE_KEY),
    )
  }

  const clearPromoCode = () => {
    if (!process.client) return

    localStorage.removeItem(PROMO_CODE_KEY)
    localStorage.removeItem(PROMO_LINK_TYPE_KEY)
    sessionStorage.removeItem(PROMO_CODE_KEY)
    sessionStorage.removeItem(PROMO_LINK_TYPE_KEY)
  }

  const getPromoCode = () => {
    return getPromoCodeFromTelegram() || getPromoCodeFromUrl() || getSavedPromoCode()
  }

  const getPromoLinkType = (): PromoLinkType | undefined => {
    if (getPromoCodeFromTelegram()) return 'TELEGRAM_MINI_APP'
    if (getPromoCodeFromUrl() && window.Telegram?.WebApp) return 'TELEGRAM_MINI_APP'
    if (getPromoCodeFromUrl()) return 'PUBLIC_SITE'

    return getSavedPromoLinkType()
  }

  const trackPromoCodeOnce = async (code: string, type?: PromoLinkType) => {
    const normalizedCode = normalizePromoCode(code)

    if (!process.client || !normalizedCode) return

    const clickType = type ?? 'PUBLIC_SITE'
    const storageKey = `${TRACKED_PROMO_CODE_KEY_PREFIX}${clickType}:${normalizedCode}`

    if (sessionStorage.getItem(storageKey) === 'true') return

    try {
      await trackPromoClick({
        code: normalizedCode,
        type: clickType,
      })
      sessionStorage.setItem(storageKey, 'true')
    } catch (error) {
      console.warn('Promo click tracking failed', error)
    }
  }

  const initPromoCode = async () => {
    const promoCode = getPromoCode()

    if (!promoCode) return

    const type = getPromoLinkType()

    savePromoCode(promoCode, type)
    await trackPromoCodeOnce(promoCode, type)
  }

  return {
    initPromoCode,
    getPromoCodeFromUrl,
    getPromoCodeFromTelegram,
    savePromoCode,
    getSavedPromoCode,
    getSavedPromoLinkType,
    clearPromoCode,
    trackPromoCodeOnce,
  }
}
