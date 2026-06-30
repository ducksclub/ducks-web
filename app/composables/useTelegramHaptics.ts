export const useTelegramHaptics = () => {
  const getWebApp = () => (import.meta.client ? window.Telegram?.WebApp : null)

  const impact = (style: 'light' | 'medium' | 'heavy' = 'medium') => {
    getWebApp()?.HapticFeedback.impactOccurred(style)
  }

  const success = () => getWebApp()?.HapticFeedback.notificationOccurred('success')
  const error = () => getWebApp()?.HapticFeedback.notificationOccurred('error')
  const warning = () => getWebApp()?.HapticFeedback.notificationOccurred('warning')

  const select = () => getWebApp()?.HapticFeedback.selectionChanged()

  return { impact, success, error, warning, select }
}
